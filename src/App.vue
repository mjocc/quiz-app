<template>
  <navbar />
  <div class="container mt-4">
    <router-view />
  </div>
</template>

<script>
import toastr from 'toastr';

import Navbar from './components/Navbar.vue';

toastr.options = {
  positionClass: 'toast-bottom-right',
};

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>
