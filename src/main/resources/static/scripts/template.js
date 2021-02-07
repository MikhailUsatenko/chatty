let $chatHistory;
let $button;
let $textarea;
let $chatHistoryList;

function init() {
    cacheDOM();
    bindEvents();
    fetchAll();
    connectToChat();
}

function bindEvents() {
    $button.on('click', addMessage.bind(this));
    $textarea.on('keyup', addMessageEnter.bind(this));
}

function cacheDOM() {
    $chatHistory = $('.chat-history');
    $button = $('#sendBtn');
    $textarea = $('#message-to-send');
    $chatHistoryList = $chatHistory.find('ul');
}

function render(message, userName) {

    // responses
    var templateResponse = Handlebars.compile($("#message-response-template").html());
    var contextResponse = {
        response: message,
        time: getCurrentTime(),
        userName: userName
    };

    setTimeout(function () {
        $chatHistoryList.append(templateResponse(contextResponse));

    }.bind(this), 1500);
}

function sendMessage(message) {
    let username = $('#userName').val();
    console.log(username)
    sendMsg(username, message);
    console.log(message);
    if (message.trim() !== '') {
        var template = Handlebars.compile($("#message-template").html());
        var context = {
            messageOutput: message,
            time: getCurrentTime(),
            toUserName: selectedUser
        };

        $chatHistoryList.append(template(context));

        $textarea.val('');
    }
}


function getCurrentTime() {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
}

function addMessage() {
    sendMessage($textarea.val());
}

function addMessageEnter(event) {
    // enter was pressed
    if (event.keyCode === 13) {
        addMessage();
    }
}

init();
