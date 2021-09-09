<template>
  <navbar />
  <div class="container mt-4">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import toastr from 'toastr';

import Navbar from './components/Navbar.vue';

toastr.options = {
  positionClass: 'toast-bottom-right',
  timeOut: '7000',
  progressBar: true,
  closeButton: true,
};

export default {
  name: 'App',
  data() {
    return {
      messages: [],
    };
  },
  computed: mapState('selected', ['flightPlanName']),
  methods: {
    createMessage(event, message, type) {
      this.messages.push({
        message,
        class: `alert-${type}`,
      });
    },
  },
  components: {
    Navbar,
  },
};
</script>
