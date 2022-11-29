<template>
  <div class='h-screen' >
    <l-map :zoom=13 :center="[55.9464418,8.1277591]">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker :lat-lng="[55.9464418,8.1277591]"></l-marker>
    </l-map>
  </div>
</template>

<script>
export default {
  mounted() {},
}
</script>
