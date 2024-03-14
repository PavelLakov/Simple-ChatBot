$(document).ready(function () {
    // Initially display user choices and current time
    displayCurrentTime();
    displayOptions();

    // Hide chat interface initially
    $('.chat-bar-collapsible').hide();

    // Show initial chat icon
    $('#chat-icon-initial').show();

    // Event listener for initial chat icon to open the chat interface
    $('#chat-icon-initial').click(function () {
        toggleChatInterface();
    });

    // Setup collapsible chat interface and other event listeners
    setupCollapsibleChat();

    // Event listener for the send icon
    $(".fa-send").click(function () {
        sendMessage();
    });

    // Event listener for the 'Enter' key in the input box
    $("#textInput").keypress(function (e) {
        if (e.which == 13) {
            sendMessage();
            e.preventDefault(); // Prevent the Enter key from submitting the form
        }
    });

    // Event listener for the search icon
    $(".fa-search").click(function () {
        openLocalPage();
    });
});

function setupCollapsibleChat() {
    var coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                setTimeout(() => {
                    $('#chat-icon-initial').show();
                    $('.chat-bar-collapsible').hide();
                }, 200);
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                $('#chat-icon-initial').hide();
                $('.chat-bar-collapsible').show();
            }
        });
    }
}

function toggleChatInterface() {
    var chatInterface = $('.chat-bar-collapsible');
    var chatIcon = $('#chat-icon-initial');

    chatInterface.toggle();
    chatIcon.toggle();
}

function displayCurrentTime() {
    // Display current time
    var currentTimeHtml = '<div id="current-time" class="current-time">Current Time: ' + getCurrentTime() + '</div>';
    $("#chatbox").html(currentTimeHtml);
}

function displayOptions() {
    // Append user choices
    var optionsHtml = '<div id="user-options"><p><a href="../login/login.html" target="_blank">Login</a></p>' +
        '<p><a href="../login/registration.html" target="_blank">Register</a></p>' +
        '<p><a href="../login/Logout.html" target="_blank">Logout</a></p>' +
        '<p><a href="../login/PasswordChange.html" target="_blank">Change Password</a></p></div>';
    $("#chatbox").append(optionsHtml);
}

function sendMessage() {
    let userText = $("#textInput").val();
    if (userText.trim() !== "") {
        displayUserMessage(userText);
        $("#textInput").val(""); // Clear the input field
        setTimeout(function () {
            getHardResponse();
        }, 500); // Delayed response for realism
    }
}

function getHardResponse() {
    var botMessage = "I'm a chatbot and cannot answer your questions directly. If you have any, simply hit the search, and you'll discover your answers.";
    displayBotMessage(botMessage);
    displayOptions(); // Display user choices again after bot message
    scrollToBottom();
}

function openLocalPage() {
    let userText = $("#textInput").val();
    if (userText.trim() !== "") {
        let searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(userText);
        window.open(searchUrl, '_blank');
    }
}

function displayUserMessage(message) {
    $("#chatbox").append('<p class="userText"><span>' + message + '</span></p>');
}

function displayBotMessage(message) {
    $("#chatbox").append('<p class="botText"><span>' + message + '</span></p>');
}

function getCurrentTime() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes;
}

function scrollToBottom() {
    var chatBox = $('#chatbox');
    chatBox.scrollTop(chatBox.prop("scrollHeight"));
}
