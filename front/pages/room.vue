<template>
  <div class="flex h-screen">
    <Restaurants class="w-1/4" @changeSelfMarker="selfUser.marker = $event" />
    <Map
      class="flex-1"
      :selfUser="selfUser"
      :destination="destination"
      :otherUsers="otherUsers"
      @changeSelfPosition="selfUser.pos = $event"
      @changeDestination="destination = $event"
      @changeSelfMarker="selfUser.marker = $event"
    />
    <div class="w-1/4">
      <Users :selfUser="selfUser" :otherUsers="otherUsers" />
      <Chat :messages="messages" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selfUser: { pos: null, marker: null },
      destination: { time: null, pos: null },
      otherUsers: [],
      messages: [],
    };
  },
  mounted() {
    // Connect socket
    this.$socket.connect(this.$route.query.r, this.$route.query.n);

    // @initData
    this.$socket.onInitData((data) => {
      console.info("@initData");
      this.destination = data.destination;
      this.otherUsers = data.users;
      this.messages = data.messages;
    });

    // @userConnected
    this.$socket.onUserConnected((newUser) => {
      console.info("@userConnected");
      this.otherUsers.push(newUser);
    });

    // @userDisconnected
    this.$socket.onUserDisconnected((oldUser) => {
      console.info("@userDisconnected");
      this.otherUsers = this.otherUsers.filter((u) => u.id != oldUser.id);
    });

    // @userChange
    this.$socket.onUserChanged((user) => {
      console.info("@userChanged");
      let localUsers = [...this.otherUsers];
      const userIndex = localUsers.findIndex((u) => u.id == user.id);
      localUsers[userIndex] = {
        ...localUsers[userIndex],
        ...user,
      };
      this.otherUsers = localUsers;
    });

    // @destinationChanged
    this.$socket.onDestinationChanged((destination) => {
      console.info("@destinationChanged");
      this.destination = destination;
    });

    // @messageSent
    this.$socket.onMessageSent((message) => {
      console.info("@messageSent");
      this.messages.push(message);
    });
  },
};
</script>
