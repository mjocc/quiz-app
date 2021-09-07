<template>
  <div class="home">
    <img
      alt="Plane logo"
      src="../assets/plane.svg"
      @click="$emit('test', { value: 'test-value' })"
    />
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
