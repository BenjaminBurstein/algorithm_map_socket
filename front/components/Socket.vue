<template>
  <button @click="sendPosition()">TEST send position</button>
</template>

<script>
import { INTERVAL_EMIT_POSITION } from "@/constants/settings";

export default {
  data() {
    return {
      socket: this.$socket.connect({}),
    };
  },
  mounted() {
    this.$socket.onUserConnected(this.socket, (user) => {
      console.log("@userConnected");
    });

    this.$socket.onUserDisconnected(this.socket, (user) => {
      console.log("@userDisconnected");
    });

    this.$socket.onUserMooved(this.socket, (user) => {
      console.log("@userMooved");
    });

    this.$socket.onDestinationChanged(this.socket, (destination) => {
      console.log("@destinationChanged");
    });

    // Send position every X secondes
    setInterval(this.sendPosition, INTERVAL_EMIT_POSITION);
  },
  methods: {
    sendPosition() {
      navigator.geolocation.getCurrentPosition((result) => {
        this.$socket.sendPosition(
          this.socket,
          result.coords.latitude,
          result.coords.longitude
        );
      });
    },
    changeDestination(time, lat, lng) {
      this.$socket.changeDestination(this.socket, time, lat, lng);
    },
  },
};
</script>
