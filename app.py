from flask import Flask, request, redirect, url_for, render_template, send_from_directory, make_response, session
import os
import configs as CONFIG
import json
from flask_restx import Api, Resource, fields, reqparse
import requests
from werkzeug.datastructures import FileStorage


# from model import Course

# def generate_TTS_sample(overwrite=False):
#     sample_dir = "static/sample"
#     if os.path.exists(sample_dir) and overwrite is False:
#         return
#     os.makedirs(sample_dir, exist_ok=True)
#     for language in CONFIG.TTS_CONFIG_LIST:
#         locale = CONFIG.LANG_JSON["locale"][language.split("-")[0]]
#         voice = f'{locale}-{language.split("-")[-1]}'
#         asyncio.run(
#             text2voice("Hello World", voice, sample_dir, f"sample_{language}.mp3")
#         )

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

    JS_FILES.remove('jstree.js')
    JS_FILES.remove('output_jstree.js')
    JS_FILES.remove('teacher_StepLine.js')
    # JS_FILES.remove('teacher.js')

    return render_template('index.html', css_files=CSS_FILES, js_files=JS_FILES)

@app.route('/register')
def register():
    STATIC_FLODER = os.path.join(app.root_path, 'static')
    CSS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'css'))
    JS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'js'))

    JS_FILES.remove('jstree.js')
    JS_FILES.remove('output_jstree.js')
    JS_FILES.remove('teacher_StepLine.js')
    JS_FILES.remove('role_open.js')

    return render_template('register.html', css_files=CSS_FILES, js_files=JS_FILES)

@app.route('/teacher')
def teacher():
    STATIC_FLODER = os.path.join(app.root_path, 'static')
    CSS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'css'))
    JS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'js'))
    # html_files = os.listdir(os.path.join('templates'))
    IMAGE_FILES = [i[:-4] for i in os.listdir(os.path.join(STATIC_FLODER, 'test_img')) ]

    JS_FILES.remove('output_jstree.js')
    JS_FILES.remove('role_open.js')

    # voices = requests.get(f'http://c8763yee.mooo.com:7414/api/list/voice').json()['voices']
    voices = ['us']


    return render_template('teacher.html', css_files=CSS_FILES, js_files=JS_FILES,faces=IMAGE_FILES, voices=voices, mp3=voices)

@app.route('/teacher/output')
def teacher_output():
    STATIC_FLODER = os.path.join(app.root_path, 'static')
    CSS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'css'))
    JS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'js'))
    # html_files = os.listdir(os.path.join('templates'))
    IMAGE_FILES = [i[:-4] for i in os.listdir(os.path.join(STATIC_FLODER, 'test_img')) ]

    # JS_FILES.remove('teacher.js')
    JS_FILES.remove('jstree.js')
    JS_FILES.remove('role_open.js')
    
    return render_template('output.html', css_files=CSS_FILES, js_files=JS_FILES,faces=IMAGE_FILES)

@app.route('/student')
def student():
    STATIC_FLODER = os.path.join(app.root_path, 'static')
    CSS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'css'))
    JS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'js'))
    
    JS_FILES.remove('jstree.js')
    JS_FILES.remove('role_open.js')

    return render_template('student.html', css_files=CSS_FILES, js_files=JS_FILES)

@app.route('/register')
def index_register():
    
    return render_template('register.html')

# @app.route('/video')
# def video():
#     token = request.args.get('token')
#     query = Course.query.filter_by(token=token)
#     if query.first():
#         return jsonify(
#             url=query.first().video_path
#         )

@app.route('/chatbot')
def chatbot():
    STATIC_FLODER = os.path.join(app.root_path, 'static')
    CSS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'css'))
    JS_FILES = os.listdir(os.path.join(STATIC_FLODER, 'js'))

    JS_FILES.remove('jstree.js')
    JS_FILES.remove('output_jstree.js')
    JS_FILES.remove('role_open.js')

    return render_template('chatbot.html', css_files=CSS_FILES, js_files=JS_FILES)

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
    app.run(port=80)
