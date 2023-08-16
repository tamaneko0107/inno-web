import os

DEBUG = True
SECERT_KEY = os.urandom(24)
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'data.sqlite')