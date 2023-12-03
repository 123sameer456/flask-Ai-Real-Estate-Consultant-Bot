// script.js

var avatarMoving = false; // Variable to track if avatar is moving

function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    var chatHistory = document.getElementById('chat-history');
    chatHistory.innerHTML += '<div class="message user-message">' + userInput + '</div>';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/process_message', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                var botResponse = JSON.parse(xhr.responseText).bot_response;
                chatHistory.innerHTML += '<div class="message bot-message">' + botResponse + '</div>';
                startAvatarMovement();
                document.getElementById('user-input').value = '';
                chatHistory.scrollTop = chatHistory.scrollHeight;

                // Stop avatar movement
                stopAvatarMovement();
            } else {
                // Handle errors here, e.g., display an error message to the user.
                console.error('Error:', xhr.status, xhr.statusText);
            }
        }
    };
    xhr.send('user_input=' + userInput);
    setTimeout(() => {
        // avatar movement executed after 2.5 seconds
        startAvatarMovement();
      }, 200);
}

// Function to start avatar movement
function startAvatarMovement() {
    if (!avatarMoving) {
        // Start avatar movement animation
        document.getElementById('avatargif').style.display = 'block';
        document.querySelector(".avatarimg").style.display = "none";
        avatarMoving = true;
    }
}

// Function to stop avatar movement
function stopAvatarMovement() {
    if (avatarMoving) {
        // Stop avatar movement animation
        document.getElementById('avatargif').style.display = 'none';
        document.querySelector(".avatarimg").style.display = "block";
        avatarMoving = false;
    }
}

// Handle bot response
function handleBotResponse(botResponse) {
    // Display bot's response in the chat history
    chatHistory.innerHTML += '<div class="message bot-message">' + botResponse + '</div>';
    document.getElementById('user-input').value = '';
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Stop avatar movement when the bot responds
    stopAvatarMovement();
}

document.addEventListener('DOMContentLoaded', function() {
    const chatIcon = document.getElementById('chat-icon');
    const chatContainer = document.querySelector('.chat-container');

    chatIcon.addEventListener('click', function() {
        if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
            chatContainer.style.display = 'block';
        } else {
            chatContainer.style.display = 'none';
        }
    });

    // Button to generate voice
    const generateVoiceButton = document.getElementById('generate-voice-button');
    generateVoiceButton.addEventListener('click', function() {
        // Generate voice and play it here
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

