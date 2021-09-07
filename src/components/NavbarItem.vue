<template>
  <li class="nav-item">
    <router-link class="nav-link mx-xl-1" :to="{ name: to }"
      ><slot></slot
    ></router-link>
  </li>
</template>

<script>
export default {
  name: 'navbar-item',
  props: ['to'], // page name of destination page
};
</script>
