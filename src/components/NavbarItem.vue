<template>
  <li class="nav-item">
    <router-link
      class="nav-link mx-xl-1"
      :class="{ disabled: disabled }"
      :to="{ name: to }"
      ><slot></slot
    ></router-link>
  </li>
</template>

<script>
export default {
  name: 'navbar-item',
  props: {
    to: {
      // page name of destination page
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>
