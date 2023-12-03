# app.py

from flask import Flask, render_template, request, jsonify
import openai
import pyttsx3

app = Flask(__name__)

# Initialize chat history as an empty list
chat_history = []

# Set up OpenAI API credentials (Uncomment and add your API key)
openai.api_key = 'your api key is here'

def generate_voice_for_text(text):
    # Generate voice for the provided text
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

@app.route('/')
def index():
    response_text = "Hi! This is Sameer. I'm not available right now. I will contact you soon."
    return render_template('index.html', chat_history=chat_history, success=True, response=response_text)

@app.route('/process_message', methods=['POST'])
def process_message():
    user_input = request.form['user_input'].strip()  # Remove leading/trailing whitespace
    chat_history.append({'role': 'user', 'message': user_input})

    if openai.api_key is None:
        # If API key is not attached, respond with the default message
        bot_response = "Hi! This is Sameer. I'm not available right now. I will contact you soon." 
    else:
        # Process the user's message using OpenAI GPT-3.5
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "your system message is here"},
                {"role": "user", "content": user_input}
            ],
            max_tokens=30
        )

        bot_response = completion['choices'][0]['message']['content']
        
    chat_history.append({'role': 'bot', 'message': bot_response})

    # Generate the voice for the response after setting the bot_response
    generate_voice_for_text(bot_response)
    
    return jsonify({'bot_response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)