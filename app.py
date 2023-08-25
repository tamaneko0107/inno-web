from flask import Flask, request, redirect, url_for, render_template, send_from_directory, make_response, session
import os
import configs as CONFIG
from flask_restx import Api, Resource, fields, reqparse
from werkzeug.datastructures import FileStorage


app = Flask(__name__, static_folder='static')
# api = Api(app, version='1.0', title='Face Recognition API', prefix='/api', doc='/docs')
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
    # html_files = os.listdir(os.path.join('templates'))
    IMAGE_FILES = [i[:-4] for i in os.listdir(os.path.join(STATIC_FLODER, 'test_img')) ]
    
    return render_template('teacher.html', css_files=CSS_FILES, js_files=JS_FILES,faces=IMAGE_FILES)

@app.route('/student')
def student():
    STATIC_FLODER = os.path.join(app.root_path, 'static')
    CSS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'css'))
    JS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'js'))
    return render_template('student.html', css_files=CSS_FILES, js_files=JS_FILES)

@app.route('/register')
def index_register():
    return render_template('register.html')

upload_parser = reqparse.RequestParser()
# upload_parser.add_argument("subject_name", type=str, required=True, default="string")
# upload_parser.add_argument("chapter_name", type=str, required=False, default="string")
# upload_parser.add_argument("author", type=str, required=True, default="string")
# upload_parser.add_argument("language", type=str, required=False)
upload_parser.add_argument(
    "uploadfile",
    type=FileStorage,
    location="files",
    required=True,
)
upload_parser.add_argument('face_box', type=str, required=True)
# upload_parser.add_argument("url", type=str, required=False)
# upload_parser.add_argument(
#     "keypoint_type",
#     type=str,
#     required=False,
#     choices=["abstract", "lectureNote"],
#     default="abstract",
#     help="abstract: generate keypoint as abstract, lectureNote: generate keypoint as lectureNote",
# )

# @api.route('/test')
# class Api(Resource):
#     @api.expect(upload_parser)
#     def post(self):
#         print(request.files)
#         parser = upload_parser.parse_args()
#         print(parser)

# @app.route('/api', methods=['POST'])
# def api():
#     print(request.files)
#     return dict(
#         status="sad,",
#         content=dict(message='amogus', keypoint_content='sus')
#     )
if __name__ == '__main__':
    app.run()
