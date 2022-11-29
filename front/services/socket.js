import { io } from "socket.io-client";

const socket = io(process.env.SOCKET_ENDPOINT, {autoConnect: false});

export default socket;  