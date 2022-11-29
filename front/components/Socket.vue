<template>
  <div  class="h-screen">
    <p>Socket</p>
  </div>
</template>

<script>
import socket from '@/services/socket'
export default {
  mounted() {
    console.log('hello world')
    socket.auth = {token: 'test'}
    socket.connect();
  },
}
</script>
