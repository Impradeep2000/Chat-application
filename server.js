const express = require("express");
const app = express();

const http = require("http");

const server = http.createServer(app);

const {Server} = require("socket.io");


const io = new Server(server);
const PORT = 8888;

io.on("connection", (socket)=>{
    socket.on("msg", (data)=>{
        io.emit("msg",data);
    })
});



app.use(express.static('public'));


server.listen(PORT);