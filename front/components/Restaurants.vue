<template>
  <div class="flex flex-col gap-5 p-5">
    <h2 class="text-xl font-bold">Restaurants</h2>
    <div
      v-for="(restaurant, index) in restaurants"
      :key="index"
      class="text-black rounded p-3 shadow-lg cursor-pointer"
      :class="'bg-gray-200 hover:bg-gray-100'"
      @click="changeSelfMarker(restaurant)"
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
    changeSelfMarker(restaurant) {
      this.$emit("changeSelfMarker", restaurant);
      this.$socket.changeSelf(this.socket, { marker: restaurant });
    },
  },
};
</script>
