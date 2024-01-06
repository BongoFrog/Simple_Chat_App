const { Server } = require('engine.io');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(__dirname));
io.on("connection",(socket)=>{
console.log("new user connected");


socket.on('chat message',(msg)=>{
    io.emit('chat message',msg);
    });

socket.on('disconnect',()=>{
console.log('A user disconnected')
    });

});
app.get("/", (req,res) =>{
res.sendFile(__dirname +'/index.html');
})

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT,HOST,()=>{
console.log(`Server is running on http://${HOST}:${PORT}`)
});