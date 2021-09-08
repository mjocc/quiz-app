<template>
  <h1 @click="$emit('message', 'test message', 'primary')">Flightplans</h1>
</template>

<script>
export default {
  emits: ['message'],
};
</script>
