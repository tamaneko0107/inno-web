import os
import json

DEBUG = True
SECERT_KEY = os.urandom(24)
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'data.sqlite')
TTS_CONFIG_LIST = ['English(US)-AnaNeural', 'English(US)-AriaNeural', 'English(US)-ChristopherNeural', 'English(US)-EricNeural', 'English(US)-GuyNeural', 'English(US)-JennyNeural', 'English(US)-MichelleNeural', 'English(US)-RogerNeural', 'English(US)-SteffanNeural', '简体中文-XiaoxiaoNeural', '简体中文-XiaoyiNeural', '简体中文-YunjianNeural', '简体中文-YunxiNeural', '简体中文-YunxiaNeural', '简体中文-YunyangNeural', '粵語-HiuGaaiNeural', '粵語-HiuMaanNeural', '粵語-WanLungNeural', '繁體中文(台灣)-HsiaoChenNeural', '繁體中文(台灣)-HsiaoYuNeural', '繁體中文(台灣)-YunJheNeural']
# LANG_JSON = json.load(open('lang.json', 'r'))