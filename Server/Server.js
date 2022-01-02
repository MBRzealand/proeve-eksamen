require('dotenv').config({path:"./.env"})
const cors = require("cors");
const express = require('express');

const app = express();
app.use(cors());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const mongoose = require("mongoose");
const Router = require("./routes/routes");

app.use(express.json());

app.use(Router);

mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

io.on('connection', (socket) => {

    socket.on('setSocketId', data => {
        socket.username = data.username;
        io.emit('chat message',`${socket.username} connected`);
    });

    socket.on('disconnect', function() {
        io.emit('chat message',`${socket.username} disconnected`);
    });

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });


});


server.listen(process.env.PORT || 3000);