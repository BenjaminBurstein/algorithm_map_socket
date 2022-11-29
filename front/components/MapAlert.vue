<template>
  <div class="text-center w-full">
    <p>{{ selfDistance }}</p>
  </div>
</template>

<script>
export default {
  props: {
    selfPosition: null,
    selfMarker: null,
    destination: null,
  },
  computed: {
    selfDistance() {
      const distance1 = this.$helpers.getDistance(
        this.selfPosition.lat,
        this.selfPosition.lng,
        this.selfMarker.lat,
        this.selfMarker.lng
      );
      const distance2 = this.$helpers.getDistance(
        this.selfMarker.lat,
        this.selfMarker.lng,
        this.destination.lat,
        this.destination.lng
      );
      return distance1 + distance2;
    },
  },
};
</script>
