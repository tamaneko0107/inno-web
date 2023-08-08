from flask import Flask, request, redirect, url_for, render_template, send_from_directory, make_response, session
import os
import configs as CONFIG

app = Flask(__name__, static_folder='static')
app.config.from_object(CONFIG)

@app.route('/')
def index():
    static_folder = os.path.join(app.root_path, 'static')
    css_files = [f for f in os.listdir(static_folder) if f.endswith('.css')]
    js_files = [f for f in os.listdir(static_folder) if f.endswith('.js')]
    return render_template('index.html', css_files=css_files, js_files=js_files)

if __name__ == '__main__':
    app.run()
