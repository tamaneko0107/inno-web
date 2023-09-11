from flask import Flask,render_template,request,request
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch


tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_msg', methods=['POST']) 
def send_msg():
    message = request.form['message']
    return chat(message)

def chat(userMSG):
    for step in range(5):
        new_user_input_ids = tokenizer.encode(str(userMSG) + tokenizer.eos_token, return_tensors='pt')
        bot_input_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1) if step > 0 else new_user_input_ids
        chat_history_ids = model.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)
        return tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)
        

if __name__ =='__main__':
    app.config.from_object('config')
    app.run()