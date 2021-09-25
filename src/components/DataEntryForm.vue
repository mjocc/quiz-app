<template>
  <form @submit.prevent="handleFormSubmit">
    <slot></slot>
    <button class="btn btn-dark my-2 me-1">Submit</button>
    <router-link class="btn btn-dark my-2" :to="{ name: 'HomePage' }"
      >Cancel</router-link
    >
  </form>
</template>

<script>
export default {
  name: 'data-entry-form',
  emits: ['submit'],
  data() {
    return {
      showErrors: false,
    };
  },
  methods: {
    handleFormSubmit(event) {
      this.$emit('submit', event);
    },
  },
};
</script>
