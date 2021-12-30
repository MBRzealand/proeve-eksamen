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

mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(cors());
app.use(Router);

io.on('connection', (socket) => {

    socket.on('setSocketId', function(data) {
        let userName = data.name;
        io.emit('chat message',`${userName} connected`);
        console.log(`${userName} connected`)
    });

    socket.on('disconnect', function(data) {
        let userName = data.name;
        io.emit('chat message',`${userName} disconnected`);
        console.log(`${userName} disconnected`)
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });


});

app.get('/', function(req, res){
    res.sendFile('./Client/index.html');
});


server.listen(process.env.PORT, () => {
    console.log('listening on port: 3000');
});