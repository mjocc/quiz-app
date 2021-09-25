<template>
  <div class="d-flex flex-column">
    <home-link to="ManageFlightplans">Manage flightplans</home-link>
    <hr />
    <home-link to="AirportDetails">Airport details</home-link>
    <home-link to="AircraftDetails">Aircraft details</home-link>
    <home-link to="PricingDetails">Pricing details</home-link>
    <hr />
    <home-link to="ProfitInformation" :disabled="!complete"
      >Profit information</home-link
    >
    <home-link to="ExportPage">Export data</home-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import HomeLink from '../components/HomeLink.vue';

export default {
  components: {
    HomeLink,
  },
  computed: {
    ...mapGetters('selected', ['complete']),
  },
};
</script>
