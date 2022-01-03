require('dotenv').config({path:"./.env"})
const cors = require("cors");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const mongoose = require("mongoose");
const Router = require("./routes/routes");

app.use(express.json());
app.use(cors());
app.use(Router);

mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

let connectedClients = [];

io.on('connection', (socket) => {

    socket.on('setSocketId',function(data) {
        let username = data.username
        connectedClients.push(username)
        let msg = username + " connected"
        io.emit('chat message', msg);
        io.emit('setSocketId', connectedClients)

        socket.on('disconnect', ()=> {
            let msg = username + " disconnected"

            const index = connectedClients.indexOf(username);
            if (index > -1) {
                connectedClients.splice(index, 1);
            }
            io.emit('user left', username)
            io.emit('chat message', msg);
        });
    });

    socket.on('user left', user => {
        io.emit('user left', user)
    })

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });


});

server.listen(process.env.PORT || 3000);