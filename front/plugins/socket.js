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
            socket.emit("sendPosition", { lat: lat, lng: lng });
        },
        changeDestination(socket, lat, lng) {
            socket.emit("changeDestination", { lat: lat, lng: lng });
        },

        // Receive events
        onUserConnected(socket, callback) {
            socket.on("userConnected", (user) => { callback(user) });
        },
        onUserDisconnected(socket, callback) {
            socket.on("userDisconnected", (user) => { callback(user) });
        },
        onUserMooved(socket, callback) {
            socket.on("userMooved", (user) => { callback(user) });
        },
        onDestinationChanged(socket, callback) {
            socket.on("destinationChanged", (destination) => { callback(destination) });
        }
    });
};
