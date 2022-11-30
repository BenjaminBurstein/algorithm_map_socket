require('dotenv').config()
const express = require('express');
const api = express();
const server = require('http').Server(api)

/* 
 SETUP
*/
server.listen(process.env.PORT, () => {
    console.info(`Server start on port ${process.env.PORT}`);
});


/* 
 API
*/
api.all('/*', (req, res, next) => {
    res.header("Content-Type", "application/json");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", '*');
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method == "OPTIONS") {
        return res.status(200).end();
    }
    next();
});
// Api router
api.use('/', require('./api/index'));


/*
 SOCKET
*/
const io = require("socket.io")(server, {
    cors: {
        origin: process.env.FRONT_ENDPOINT,
        methods: ["GET", "POST"],
    },
});
// Socket data
USERS = []
DESTINATION = { time: null, pos: null }
MESSAGES = []
api.get('/data', (req, res) => {
    res.status(200).json({ users: USERS, destination: DESTINATION })
});

// Socket router
io.on('connection', (socket) => {
    // onConnection
    console.info(`[+] ${socket.id}`)
    socket.emit("initData", {
        users: USERS,
        destination: DESTINATION,
        messages: MESSAGES
    });
    newUser = {
        id: socket.id,
        name: null,
        pos: null
    }
    USERS.push(newUser)
    socket.broadcast.emit('userConnected', newUser)

    // onChangeSelf
    socket.on('changeSelf', (newUser) => {
        console.info(`[changeSelf] ${socket.id}`)
        userIndex = USERS.findIndex(u => u.id == socket.id)
        USERS[userIndex] = { ...USERS[userIndex], ...newUser }
        socket.broadcast.emit("userChanged", USERS[userIndex])
    });

    // onChangeDestination
    socket.on('changeDestination', (newDestination) => {
        console.info(`[changeDestination] ${socket.id}`)
        DESTINATION = newDestination
        socket.broadcast.emit("destinationChanged", DESTINATION)
    });

    // onSendMessage
    socket.on('sendMessage', (content) => {
        console.info(`[sendMessage] ${socket.id}`)
        const newMessage = {
            user: socket.id,
            content: content
        }
        MESSAGES.push(newMessage)
        socket.broadcast.emit("messageSent", newMessage)
    });

    // onDisconnect
    socket.on('disconnect', () => {
        console.info(`[-] ${socket.id}`)
        USERS = USERS.filter(u => u.id != socket.id)
        socket.broadcast.emit('userDisconnected', { id: socket.id })
    });
});