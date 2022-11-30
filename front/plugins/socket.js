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
        changeSelf(user) {
            this.get().emit("changeSelf", user);
        },
        changeDestination(destination) {
            this.get().emit("changeDestination", destination);
        },
        sendMessage(content) {
            this.get().emit("sendMessage", content);
        },

        // Receive events
        onInitData(callback) {
            this.get().on("initData", (data) => { callback(data) });
        },
        onUserConnected(callback) {
            this.get().on("userConnected", (user) => { callback(user) });
        },
        onUserDisconnected(callback) {
            this.get().on("userDisconnected", (user) => { callback(user) });
        },
        onUserChanged(callback) {
            this.get().on("userChanged", (user) => { callback(user) });
        },
        onDestinationChanged(callback) {
            this.get().on("destinationChanged", (destination) => { callback(destination) });
        },
        onMessageSent(callback) {
            this.get().on("messageSent", (message) => { callback(message) });
        }
    });
};
