<template>
  <div class="form">
    <slot></slot>
    <input class="btn btn-dark my-2 me-1" type="submit" />
    <router-link class="btn btn-dark my-2" :to="{ name: 'Home' }"
      >Cancel</router-link
    >
  </div>
</template>

<script>
export default {
  name: 'data-entry-form',
};
</script>
