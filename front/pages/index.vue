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
      <Users />
      <Chat />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: this.$socket.get(),
      selfUser: { pos: null, marker: null },
      destination: { time: null, pos: null },
      otherUsers: [],
    };
  },
  mounted() {
    // @initData
    this.$socket.onInitData(this.socket, (data) => {
      console.info("@initData");
      this.destination = data.destination;
      this.otherUsers = data.users;
    });

    // @userConnected
    this.$socket.onUserConnected(this.socket, (newUser) => {
      console.info("@userConnected");
      this.otherUsers.push(newUser);
    });

    // @userDisconnected
    this.$socket.onUserDisconnected(this.socket, (oldUser) => {
      console.info("@userDisconnected");
      this.otherUsers = this.otherUsers.filter((u) => u.id != oldUser.id);
    });

    // @userChange
    this.$socket.onUserChanged(this.socket, (user) => {
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
    this.$socket.onDestinationChanged(this.socket, (destination) => {
      console.info("@destinationChanged");
      this.destination = destination;
    });
  },
};
</script>
