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

io.on('connection', (socket) => {

    socket.on('setSocketId',function(data) {
        socket.name = data.username;
        let msg = socket.name + " connected"
        io.emit('setSocketId', msg);
    });

    socket.on('disconnect', ()=> {
        let msg = socket.name + " disconnected"
        io.emit('disconnect', msg);
    });

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });


});

server.listen(process.env.PORT || 3000);