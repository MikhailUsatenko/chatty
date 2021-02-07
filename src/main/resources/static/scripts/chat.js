const url = 'http://localhost:8080';
let stompClient;
let selectedUser;
let newMessages = new Map();

function connectToChat(userName) {
    console.log("connecting to chat...")
    let socket = new SockJS(url + '/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("connected to: " + frame);
        stompClient.subscribe("/topic/messages/" + userName, function (response) {
            let data = JSON.parse(response.body);
            if (selectedUser === data.fromLogin) {
                console.log("if");
                render(data.message, data.fromLogin);
            } else {
                console.log("else");
                newMessages.set(data.fromLogin, data.message);
                $('#userNameAppender_' + data.fromLogin).append('<span id="newMessage_' + data.fromLogin + '" style="color: red">+1</span>');
            }
        });
    });
}

function sendMsg(from, text) {

    stompClient.send("/chat/" + selectedUser, {}, JSON.stringify({
        fromLogin: from,
        message: text
    }));
}

function registration() {
    let userName = document.getElementById("userName").value;
    $.get(url + "/registration/" + userName, function (response) {
        connectToChat(userName);
        fetchAll();
    }).fail(function (error) {
        if (error.status === 400) {
            alert("Login is already busy!")
        }
    })
}

function selectUser(userName) {
    console.log("selecting users: " + userName);
    selectedUser = userName;
    let isNew = document.getElementById("newMessage_" + userName) !== null;
    if (isNew) {
        let element = document.getElementById("newMessage_" + userName);
        element.parentNode.removeChild(element);
        render(newMessages.get(userName), userName);
    }
    $('#selectedUserId').html('');
    $('#selectedUserId').append('Chat with ' + userName);
}

function fetchAll() {
    $.get(url + "/fetchAllUsers", function (response) {
        let users = response;
        let usersTemplateHTML = "";
        for (let i = 0; i < users.length; i++) {
            usersTemplateHTML = usersTemplateHTML + `<a href="#"  onclick="selectUser(\'${users[i]}\')"><li class="active">
                            <div class="d-flex bd-highlight">
                                <div class="img_cont">
                                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                                         class="rounded-circle user_img">
                                    <span class="online_icon"></span>
                                </div>
                                <div class="user_info">
                                    <span>${users[i]}</span>
                                </div>
                            </div>
                        </li></a>`;
        }
        $('#usersList').html(usersTemplateHTML);
        console.log(users);
    });
}
