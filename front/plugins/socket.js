import { io } from "socket.io-client";
const socket = io(process.env.SOCKET_ENDPOINT, { autoConnect: false });

export default ({ store }, inject) => {
    inject("socket", {
        connect(auth = {}) {
            socket.auth = auth
            socket.connect()
            store.commit('socket/set', socket)
            return socket
        },
        get() {
            return store.state.socket.socket ?? this.connect()
        },

        // Emit events
        changeSelf(socket, user) {
            socket.emit("changeSelf", user);
        },
        changeDestination(socket, destination) {
            socket.emit("changeDestination", destination);
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
