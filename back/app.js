require('dotenv').config()
const express = require('express');
const api = express();
const server = require('http').Server(api)

/* 
 SETUP
*/
server.listen(process.env.PORT, () => {
    console.log(`Server start on port ${process.env.PORT}`);
});


/* 
 API
*/
api.all('/*', (req, res, next) => {
    res.header("Content-Type", "application/json");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "*");
    res.header("Access-Control-Allow-Headers", "*");
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
// Socket router
io.on('connection', (socket) => {
    console.log(`[+] ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`[-] ${socket.id}`)
    });
});