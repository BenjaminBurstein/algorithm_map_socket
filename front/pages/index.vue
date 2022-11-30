<template>
  <div class="h-screen flex bg-gray-400">
    <div class="w-full max-w-xs m-auto">
      <form @submit.prevent="login()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text">
          <p id="nameError" class="text-red-500 hidden text-xs italic">Veuillez choisir un pseudo</p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="room">
            Room
          </label>
          <input v-model="room" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="room" type="text" placeholder="Room name">
          <p id="roomError" class="text-red-500 hidden text-xs italic">Veuillez entrez un nom de room</p>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Join
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: "",
      name: "",
    };
  },
  methods: {
    login() {
      const roomInput =  document.getElementById('room');
      const roomError =  document.getElementById('roomError');
      const nameInput =  document.getElementById('name');
      const nameError =  document.getElementById('nameError');
      if (this.room != "" && this.name != "") {
        this.$router.push(`/room?r=${this.room}&n=${this.name}`);
      }
      if (this.room === "") {
          roomInput.classList.add('border-red-500')
          roomError.classList.remove('hidden')
      } else {
        roomInput.classList.remove('border-red-500')
        roomError.classList.add('hidden')
      }
      if (this.name === "") {
          nameInput.classList.add('border-red-500')
          nameError.classList.remove('hidden')
      } else {
        nameInput.classList.remove('border-red-500')
        nameError.classList.add('hidden')
      }

    },
  },
};
</script>
