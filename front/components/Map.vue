<template>
  <div class="h-screen">
    <l-map :zoom="zoom" :center="[center.lat, center.lng]">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-marker
        v-for="(marker, index) in markers"
        :key="index"
        :lat-lng="[marker.lat, marker.lng]"
      />
    </l-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: 13,
      center: { lat: 48.8935717, lng: 2.2243825 },
      markers: [
        { lat: 55.9464418, lng: 8.1277591 },
        { lat: 48.8935717, lng: 2.2243825 },
        { lat: 48.8927042, lng: 2.2368843 },
      ],
    };
  },
};
</script>
