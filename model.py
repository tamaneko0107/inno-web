from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash,generate_password_hash

db = SQLAlchemy

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column('id', db.Integer, primary_key = True)
    username = db.Column(db.String(100),unique=True)
    _password = db.Column(db.String(50))
    mail = db.Column(db.String(200),unique=True)
    courses = db.relationship('Course',backref='user')

    def __init__(self, username, password, mail):
        self.username = username
        self._password = generate_password_hash(password)
        self.mail = mail

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self._password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self._password, password)
    

class Course(db.Model):
    __tablename__ = 'Course'
    classID = db.Column(db.String(16),primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.username'))