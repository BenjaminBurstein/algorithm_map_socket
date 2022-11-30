<template>
  <div class="flex flex-col gap-5 p-5">
    <h2 class="text-xl font-bold">Restaurants</h2>
    <div
      v-for="(restaurant, index) in restaurants"
      :key="index"
      class="text-black rounded p-3 shadow-lg cursor-pointer"
    >
      {{ restaurant.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: this.$socket.get(),
      restaurants: this.$restaurants.get(),
    };
  },
  methods: {
    /* changeDestination(event) {
      this.destination.pos = {
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      };
      this.$socket.changeDestination(this.socket, this.destination);
    }, */
  },
};
</script>
