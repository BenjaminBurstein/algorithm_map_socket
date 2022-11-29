import { io } from "socket.io-client";
const socket = io(process.env.SOCKET_ENDPOINT, { autoConnect: false });

export default ({ }, inject) => {
    inject("socket", {
        connect(auth = {}) {
            socket.auth = auth
            socket.connect()
            return socket
        },

        // Emit events
        sendPosition(socket, lat, lng) {
            socket.emit("changeSelf", { lat: lat, lng: lng });
        },
        changeDestination(socket, time, lat, lng) {
            socket.emit("changeDestination", { time: time, lat: lat, lng: lng });
        },

        // Receive events
        onInitData(socket, callback) {
            socket.on("initData", (data) => { callback(data) });
        },
        onUserConnected(socket, callback) {
            socket.on("userConnected", (user) => { callback(user) });
        },
        onUserDisconnected(socket, callback) {
            socket.on("userDisconnected", (user) => { callback(user) });
        },
        onUserChanged(socket, callback) {
            socket.on("userChanged", (user) => { callback(user) });
        },
        onDestinationChanged(socket, callback) {
            socket.on("destinationChanged", (destination) => { callback(destination) });
        }
    });
};
