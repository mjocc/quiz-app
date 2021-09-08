<template>
  <navbar />
  <div class="container mt-4">
    <router-view @message="createMessage" />
    <div
      v-for="msg in messages"
      :key="msg.message"
      :class="message.class"
      class="alert"
      role="alert"
    >
      {{ msg.message }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  data() {
    return {
      dbName: 'profitcalculatordb',
      storeName: 'flightplans',
      version: 1,
      db: undefined,
      messages: [],
    };
  },
  computed: mapState(['selectedFlightPlanName']),
  methods: {
    createMessage(event, message, type) {
      this.messages.push({
        message,
        class: `alert-${type}`,
      });
    },
  },
  watch: {
    selectedFlightPlanName() {
      localStorage.setItem(
        'selectedFlightPlanName',
        this.selectedFlightPlanName
      );
    },
  },
  components: {
    Navbar,
  },
};
</script>
