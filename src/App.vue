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

import { IMPORT_SELECTED_FLIGHTPLAN } from './store/mutation-types.js';

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
  mounted() {
    const selectedFlightPlanName = localStorage.getItem(
      'selectedFlightPlanName'
    );
    this.$store.commit(IMPORT_SELECTED_FLIGHTPLAN, selectedFlightPlanName);
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
