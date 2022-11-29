<template>
  <div class="relative h-screen">
    <l-map
      class="z-0"
      :zoom="zoom"
      :center="[destination.lat, destination.lng]"
    >
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

      <l-marker :lat-lng="[selfPosition.lat, selfPosition.lng]" />
      <l-marker :lat-lng="[selfMarker.lat, selfMarker.lng]" />

      <!-- <l-marker
        v-for="(pos, index) in othersPositions"
        :key="index"
        :lat-lng="[pos.lat, pos.lng]"
      /> -->
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
export default {
  data() {
    return {
      zoom: 13,
      destination: { time: "13:00", lat: 48.8935717, lng: 2.2243825 },
      selfPosition: { lat: 48.8927042, lng: 2.2368843 },
      selfMarker: { lat: 48.8935717, lng: 2.2243825 },
      /* othersPositions: [
        { lat: 48.8935717, lng: 2.2243825 },
        { lat: 48.8927042, lng: 2.2368843 },
      ], */
    };
  },
};
</script>
