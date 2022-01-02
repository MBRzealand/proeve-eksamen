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

const socket = io.connect('https://tallboye.herokuapp.com/',connectionOptions ); /*"http://localhost:3000/"*/

function getCookie(name){

    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    else{
        console.log('--something went wrong---');
    }
}

data = {username:getCookie("username")};
socket.emit('setSocketId', data);

let updateUsers = async () => {
    let getRequest = await fetch("https://tallboye.herokuapp.com/brugere").then(response => response.json());

    for (let i = 0; i < getRequest.length; i++) {
        let navn = getRequest[i].Navn
        let user = document.createElement('div');
        user.className = "user"
        user.id = navn.toString()
        let status = document.createElement("div")
        status.className = "status"
        user.appendChild(status)
        user.appendChild(document.createTextNode(navn))

        document.getElementById("usersContainer").appendChild(user)
    }
}

updateUsers()


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

socket.on('setSocketId', function(connectedClients) {

    for (let i = 0; i < connectedClients.length; i++) {

        let userDiv = document.getElementById(connectedClients[i]);
        userDiv.querySelector(".status").style.backgroundColor = "green";
    }

});

socket.on('setSocketId', function() {
    let statuses = document.getElementsByClassName("status")

    for (let i = 0; i < statuses.length; i++) {
        statuses[i].style.backgroundColor = "red";
    }
});


