<template>
  <router-link
    class="btn btn-dark my-2"
    :class="{ disabled: disabled }"
    :to="{ name: to }"
    ><slot></slot
  ></router-link>
</template>

<script>
export default {
  name: 'home-link',
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
