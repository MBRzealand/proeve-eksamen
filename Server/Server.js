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
    "mongodb+srv://Mikkel:ADMIN@cluster0.4wseh.mongodb.net/ProeveEksamen?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

io.on('connection', (socket) => {

    socket.on('setSocketId', function(data) {
        socket.username = data.username;
        io.emit('chat message',`${socket.username} connected`);
    });

    socket.on('disconnect', function() {
        io.emit('chat message',`${socket.username} disconnected`);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });


});


server.listen(3000, () => {
    console.log('listening on port: 3000');
});