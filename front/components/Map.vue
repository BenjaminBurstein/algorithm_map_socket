<template>
  <div class="relative h-screen">
    <l-map
      v-if="selfUser && selfUser.pos"
      :zoom="zoom"
      :center="[selfUser.pos.lat, selfUser.pos.lng]"
      class="z-0"
      @click="changeDestination"
    >
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

      <!-- SelfPos -->
      <l-marker
        v-if="selfUser && selfUser.pos"
        :lat-lng="[selfUser.pos.lat, selfUser.pos.lng]"
      />

      <!-- SelfMarker -->
      <l-marker
        v-if="selfUser && selfUser.marker && selfUser.marker.pos"
        :lat-lng="[selfUser.marker.pos.lat, selfUser.marker.pos.lng]"
      />

      <!-- Destination -->
      <l-marker
        v-if="destination && destination.pos"
        :lat-lng="[destination.pos.lat, destination.pos.lng]"
      />

      <!-- OthersPos and OthersMarkers -->
      <div v-for="(user, index) in otherUsers" :key="index">
        <l-marker v-if="user.pos" :lat-lng="[user.pos.lat, user.pos.lng]" />
        <l-marker
          v-if="user.marker && user.marker.pos"
          :lat-lng="[user.marker.pos.lat, user.marker.pos.lng]"
        />
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
  props: {
    selfUser: null,
    destination: null,
    otherUsers: [],
  },
  data() {
    return {
      socket: this.$socket.get(),
      zoom: 20,
    };
  },
  mounted() {
    // Send position every X secondes
    this.sendPosition();
    setInterval(this.sendPosition, INTERVAL_EMIT_POSITION);
  },
  methods: {
    sendPosition() {
      navigator.geolocation.getCurrentPosition((result) => {
        const newPos = {
          lat: result.coords.latitude,
          lng: result.coords.longitude,
        };
        this.$emit("changeSelfPosition", newPos);
        this.$socket.changeSelf(this.socket, { pos: newPos });
      });
    },
    changeDestination(event) {
      const newDest = {
        ...this.destination,
        pos: {
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        },
      };
      this.$emit("changeDestination", newDest);
      this.$socket.changeDestination(this.socket, newDest);
    },
  },
};
</script>
