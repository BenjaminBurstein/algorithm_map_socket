<template>
  <div class="relative h-screen">
    <l-map
      v-if="selfPosition.lat && selfPosition.lng"
      :zoom="zoom"
      :center="[selfPosition.lat, selfPosition.lng]"
      class="z-0"
    >
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

      <l-marker
        v-if="selfPosition.lat && selfPosition.lng"
        :lat-lng="[selfPosition.lat, selfPosition.lng]"
      />

      <l-marker
        v-if="selfMarker.lat && selfMarker.lng"
        :lat-lng="[selfMarker.lat, selfMarker.lng]"
      />

      <l-marker
        v-if="destination.lat && destination.lng"
        :lat-lng="[destination.lat, destination.lng]"
      />

      <div v-for="(user, index) in otherUsers" :key="index">
        <l-marker v-if="user.lat && user.lng" :lat-lng="[user.lat, user.lng]" />
      </div>
    </l-map>
    <MapAlert
      class="absolute top-0 z-40"
      :selfPosition="selfPosition"
      :selfMarker="selfMarker"
      :destination="destination"
    />
  </div>
</template>

<script>
import { INTERVAL_EMIT_POSITION } from "@/constants/settings";

export default {
  data() {
    return {
      socket: this.$socket.connect({}),
      zoom: 13,
      destination: { time: "13:00", lat: null, lng: null },
      selfPosition: { lat: null, lng: null },
      selfMarker: { lat: null, lng: null },
      otherUsers: [],
    };
  },
  mounted() {
    // @initData
    this.$socket.onInitData(this.socket, (data) => {
      console.log("@initData", data);
      this.destination = data.destination;
      this.otherUsers = data.users;
    });

    // @userConnected
    this.$socket.onUserConnected(this.socket, (newUser) => {
      console.log("@userConnected");
      this.otherUsers.push(newUser);
    });

    // @userDisconnected
    this.$socket.onUserDisconnected(this.socket, (oldUser) => {
      console.log("@userDisconnected");
      this.otherUsers = this.otherUsers.filter((u) => u.id != oldUser.id);
    });

    // @userChange
    this.$socket.onUserChanged(this.socket, (user) => {
      console.log("@userChange");
      const userIndex = this.otherUsers.findIndex((u) => u.id == user.id);
      this.otherUsers[userIndex] = {
        ...this.otherUsers[userIndex],
        ...user,
      };
    });

    // @destinationChanged
    this.$socket.onDestinationChanged(this.socket, (destination) => {
      this.destination = destination;
    });

    // Send position every X secondes
    this.sendPosition();
    setInterval(this.sendPosition, INTERVAL_EMIT_POSITION);
  },
  methods: {
    sendPosition() {
      navigator.geolocation.getCurrentPosition((result) => {
        this.selfPosition.lat = result.coords.latitude;
        this.selfPosition.lng = result.coords.longitude;
        this.$socket.sendPosition(
          this.socket,
          this.selfPosition.lat,
          this.selfPosition.lng
        );
      });
    },
    changeDestination(time, lat, lng) {
      this.$socket.changeDestination(this.socket, time, lat, lng);
    },
  },
};
</script>
