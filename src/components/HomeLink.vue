<template>
  <router-link class="btn btn-dark my-2" :to="{ name: to }"
    ><slot></slot
  ></router-link>
</template>

<script>
export default {
  name: 'home-link',
  props: ['to'], // page name of destination page
};
</script>
