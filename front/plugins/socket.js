import { io } from "socket.io-client";
const socket = io(process.env.SOCKET_ENDPOINT, { autoConnect: false });

export default ({ }, inject) => {
    inject("socket", {
        connect(auth = {}) {
            socket.auth = auth
            socket.connect()
            return socket
        },
        sendPosition(socket, lat, lng) {
            socket.emit("sendPosition", { lat: lat, lng: lng });
        }
    });
};
