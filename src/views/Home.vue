<template>
  <div class="d-flex flex-column">
    <home-link to="Flightplans">Manage flightplans</home-link>
    <hr />
    <home-link to="AirportDetails">Airport Details</home-link>
    <home-link to="AircraftDetails">Aircraft Details</home-link>
    <home-link to="PricingDetails">Pricing Details</home-link>
    <hr />
    <home-link to="ProfitInformation">Pricing Details</home-link>
    <home-link to="Export">Import/export data</home-link>
  </div>
</template>

<script>
import HomeLink from '../components/HomeLink.vue';
export default {
  components: {
    HomeLink,
  },
};
</script>
