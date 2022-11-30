<template>
  <div class="flex flex-col gap-3 p-5">
    <h2 class="text-xl font-bold">Users</h2>

    <div class="text-black rounded p-2 shadow-lg bg-gray-200">Moi</div>

    <div
      v-for="user in otherUsers"
      :key="user.id"
      class="text-black rounded p-2 shadow-lg bg-gray-200 overflow-hidden"
    >
      {{ user.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selfUser: null,
    otherUsers: null,
  },
};
</script>
