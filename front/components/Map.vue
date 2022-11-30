<template>
  <div class="relative h-screen">
    <l-map
      v-if="selfUser.pos"
      :zoom="zoom"
      :center="[selfUser.pos.lat, selfUser.pos.lng]"
      class="z-0"
      @click="changeDestination"
    >
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

      <l-marker
        v-if="selfUser.pos"
        :lat-lng="[selfUser.pos.lat, selfUser.pos.lng]"
      />

      <l-marker
        v-if="selfUser.marker && selfUser.marker.pos"
        :lat-lng="[selfUser.marker.pos.lat, selfUser.marker.pos.lng]"
      />

      <l-marker
        v-if="destination.pos"
        :lat-lng="[destination.pos.lat, destination.pos.lng]"
      />

      <div v-for="(user, index) in otherUsers" :key="index">
        <l-marker v-if="user.lat && user.lng" :lat-lng="[user.lat, user.lng]" />
      </div>
    </l-map>
    <MapAlert
      class="absolute top-0 z-40"
      :selfUser="selfUser"
      :destination="destination"
    />
  </div>
</template>

<script>
import { INTERVAL_EMIT_POSITION } from "@/constants/settings";

export default {
  data() {
    return {
      socket: this.$socket.get(),
      zoom: 20,
      destination: { time: null, pos: null },
      selfUser: { pos: null, marker: null },
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
      const userIndex = this.otherUsers.findIndex((u) => u.id == user.id);
      this.otherUsers[userIndex] = {
        ...this.otherUsers[userIndex],
        ...user,
      };
    });

    // @destinationChanged
    this.$socket.onDestinationChanged(this.socket, (destination) => {
      console.info("@destinationChanged");
      this.destination = destination;
    });

    // Send position every X secondes
    this.sendPosition();
    setInterval(this.sendPosition, INTERVAL_EMIT_POSITION);
  },
  methods: {
    sendPosition() {
      navigator.geolocation.getCurrentPosition((result) => {
        this.selfUser.pos = {
          lat: result.coords.latitude,
          lng: result.coords.longitude,
        };
        this.$socket.changeSelf(this.socket, { pos: this.selfUser.pos });
      });
    },
    changeDestination(event) {
      this.destination.pos = {
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      };
      this.$socket.changeDestination(this.socket, this.destination);
    },
  },
};
</script>
