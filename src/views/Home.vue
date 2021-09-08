<template>
  <div class="d-flex flex-column">
    <home-link to="ManageFlightplans">Manage flightplans</home-link>
    <hr />
    <home-link to="AirportDetails">Airport Details</home-link>
    <home-link to="AircraftDetails">Aircraft Details</home-link>
    <home-link to="PricingDetails">Pricing Details</home-link>
    <hr />
    <home-link to="ProfitInformation">Profit Information</home-link>
    <home-link to="ExportPage">Import/export data</home-link>
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
