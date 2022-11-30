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
ROOMS = {}
api.get('/rooms', (req, res) => {
    res.status(200).json(ROOMS)
});

// Socket router
io.on('connection', (socket) => {
    // onConnection
    console.info(`[+] ${socket.id}`)
    socket.room = socket.handshake.auth.room
    socket.name = socket.handshake.auth.name
    if (!ROOMS[socket.room]) {
        ROOMS[socket.room] = {
            destination: { time: null, pos: null },
            users: [],
            messages: []
        }
    }
    socket.emit("initData", ROOMS[socket.room]);
    newUser = {
        id: socket.id,
        name: socket.name,
        pos: null
    }
    ROOMS[socket.room].users.push(newUser)
    io.to(socket.room).emit('userConnected', newUser)
    socket.join(socket.room)

    // onChangeSelf
    socket.on('changeSelf', (newUser) => {
        console.info(`[changeSelf] ${socket.id}`)
        userIndex = ROOMS[socket.room].users.findIndex(u => u.id == socket.id)
        ROOMS[socket.room].users[userIndex] = { ...ROOMS[socket.room].users[userIndex], ...newUser }
        io.to(socket.room).emit("userChanged", ROOMS[socket.room].users[userIndex])
    });

    // onChangeDestination
    socket.on('changeDestination', (newDestination) => {
        console.info(`[changeDestination] ${socket.id}`)
        ROOMS[socket.room].destination = newDestination
        io.to(socket.room).emit("destinationChanged", newDestination)
    });

    // onSendMessage
    socket.on('sendMessage', (content) => {
        console.info(`[sendMessage] ${socket.id}`)
        const newMessage = {
            user: socket.name,
            content: content
        }
        ROOMS[socket.room].messages.push(newMessage)
        io.to(socket.room).emit("messageSent", newMessage)
    });

    // onDisconnect
    socket.on('disconnect', () => {
        console.info(`[-] ${socket.id}`)
        ROOMS[socket.room].users = ROOMS[socket.room].users.filter(u => u.id != socket.id)
        io.to(socket.room).emit('userDisconnected', { id: socket.id })
        if (ROOMS[socket.room].users.length == 0) {
            delete ROOMS[socket.room]
        }
    });
});