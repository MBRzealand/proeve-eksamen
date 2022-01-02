let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');

let connectionOptions =  {
    "withCredentials" : true,
    "force new connection" : true,
    "reconnectionAttempts": "Infinity",
    "timeout" : 10000,
    "transports" : ["websocket"]
};

const socket = io.connect('https://tallboye.herokuapp.com:3000', connectionOptions);

function getCookie(name){

    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    else{
        console.log('--something went wrong---');
    }
}

let data = {username:getCookie("username")};
socket.emit('setSocketId', data);


form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', data.username + ": " + input.value);
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
