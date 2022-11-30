<template>
  <div class="flex flex-col gap-3 p-5">
    <h2 class="text-xl font-bold">Chat</h2>

    <div v-for="(message, index) in messages" :key="index">
      <h2 class="font-bold">{{ message.user }}</h2>
      <p>{{ message.content }}</p>
    </div>

    <form @submit.prevent="sendMessage()">
      <input type="text" v-model="content" class="bg-gray-100 w-full p-1" />
      <button hidden type="submit"></button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    messages: [],
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.content != "") {
        this.$emit("messageSent", { user: "moi", content: this.content });
        this.$socket.sendMessage(this.content);
        this.content = "";
      }
    },
  },
};
</script>
