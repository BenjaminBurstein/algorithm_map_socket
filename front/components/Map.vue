<template>
  <div class="relative h-screen">
    <l-map class="z-0" :zoom="zoom" :center="[destination.lat, destination.lng]">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-marker
        v-for="(pos, index) in othersPositions"
        :key="index"
              :lat-lng="[pos.lat, pos.lng]"
      />
    </l-map>
     <div class="absolute top-0 z-40 text-center w-full">
        <p>{{ selfDistance }}</p>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      zoom: 13,
      destination: {lat: 48.8935717, lng: 2.2243825 },
      selfPosition: {lat: 48.8927042, lng: 2.2368843},
      selfMarker: { lat: 48.8935717, lng: 2.2243825 },
      othersPositions: [
        { lat: 48.8935717, lng: 2.2243825 },
        { lat: 48.8927042, lng: 2.2368843 },
      ],

    };
  },
  computed: {
      selfDistance() {
        const position = this.selfPosition;
        const marker = this.selfMarker;
        const destination = this.destination;
        const distance1 = this.$helpers.getDistance(position.lat, position.lng, marker.lat, marker.lng);
        const distance2 = this.$helpers.getDistance(marker.lat, marker.lng, destination.lat, destination.lng);
        return distance1 + distance2;
      }
  },
};
</script>
