<template>
  <div class="flex flex-col gap-3 p-5">
    <h2 class="text-xl font-bold">Users</h2>

    <div
      class="text-black rounded p-2 shadow-lg bg-gray-200 overflow-hidden flex"
    >
      <div
        class="rounded-full w-2 h-full mr-2"
        :style="`background: ${selfColor}`"
      />
      <p class="capitalize">{{ selfUser.name }}</p>
    </div>

    <div
      v-for="(user, index) in otherUsers"
      :key="user.id"
      class="text-black rounded p-2 shadow-lg bg-gray-200 overflow-hidden flex"
    >
      <div
        class="rounded-full w-2 h-full mr-2"
        :style="`background: ${othersColors[[index % othersColors.length]]}`"
      />
      <p class="capitalize">{{ user.name }}</p>
    </div>
  </div>
</template>

<script>
import { SELF_USER_COLOR, OTHER_USERS_COLORS } from "@/constants/settings";

export default {
  props: {
    selfUser: null,
    otherUsers: null,
  },
  data() {
    return {
      othersColors: OTHER_USERS_COLORS,
      selfColor: SELF_USER_COLOR,
    };
  },
};
</script>
