const http= require('http');
const socketIo= require('socket.io');
const express= require('express');
const cors = require('cors');

const app = express();
const port = 4500 || process.env.PORT;
const server = http.createServer(app);

const io = socketIo(server);
const users = [{}];
app.use(cors());

app.get("/", (req, res) => {
    res.send("This is a server");
})

io.on('connection', (socket) => {
    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        socket.broadcast.emit('userJoined', {user: 'Admin', message:`${ user } has joined the chat`});
        socket.emit('welcome', {user: 'Admin', message: `Welcome to the chat, ${ user }`});
    })

    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', {user: users[id], message, id});
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', {user: "Admin", message: `${users[socket.id]} has leave the chat`});
    })
})

server.listen(port, () => {
    console.log("Server is working");
})