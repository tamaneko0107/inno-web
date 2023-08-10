from flask import Flask, request, redirect, url_for, render_template, send_from_directory, make_response, session
import os
import configs as CONFIG

app = Flask(__name__, static_folder='static')
app.config.from_object(CONFIG)
# STATIC_FLODER = os.path.join(app.root_path, 'static')
# CSS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'css'))
# JS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'js'))

@app.route('/')
def index():
    STATIC_FLODER = os.path.join(app.root_path, 'static')
    CSS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'css'))
    JS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'js'))
    return render_template('index.html', css_files=CSS_FILES, js_files=JS_FILES)

@app.route('/register')
def register():
    STATIC_FLODER = os.path.join(app.root_path, 'static')
    CSS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'css'))
    JS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'js'))
    return render_template('register.html', css_files=CSS_FILES, js_files=JS_FILES)

@app.route('/teacher')
def teacher():
    STATIC_FLODER = os.path.join(app.root_path, 'static')
    CSS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'css'))
    JS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'js'))
    return render_template('teacher.html', css_files=CSS_FILES, js_files=JS_FILES)

@app.route('/student')
def student():
    STATIC_FLODER = os.path.join(app.root_path, 'static')
    CSS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'css'))
    JS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'js'))
    return render_template('student.html', css_files=CSS_FILES, js_files=JS_FILES)

if __name__ == '__main__':
    app.run()
