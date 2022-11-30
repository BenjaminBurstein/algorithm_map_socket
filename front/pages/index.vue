<template>
  <form @submit.prevent="login()">
    <label for="room">Room</label>
    <input id="room" type="text" v-model="room" />

    <label for="name">Name</label>
    <input id="name" type="text" v-model="name" />

    <button type="submit">Join</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      room: "",
      name: "",
    };
  },
  methods: {
    login() {
      if (this.room != "" && this.name != "") {
        this.$router.push(`/room?r=${this.room}&n=${this.name}`);
      }
    },
  },
};
</script>
