<template>
  <button class="btn btn-dark my-2 me-1" @click="onSubmit($event)">Submit
    
  </button>
  <router-link class="btn btn-dark my-2" :to="{ name: 'HomePage' }"
    >Cancel</router-link
  >
</template>

<script>
export default {
  name: 'form-buttons',
  emits: ['submitForm'],
  methods: {
    onSubmit(value) {
      this.$emit('submitForm', value);
    }
  },
};
</script>
