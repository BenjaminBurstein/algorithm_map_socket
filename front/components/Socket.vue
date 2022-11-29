<template>
  <button @click="sendPosition()">TEST send position</button>
</template>

<script>
export default {
  data() {
    return {
      socket: this.$socket.connect({}),
    };
  },
  mounted() {
    this.socket.on("userConnected", (user) => {
      console.log("userConnected");
    });

    this.socket.on("userMooved", (user) => {
      console.log(user);
    });
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
  },
};
</script>
