<template>
  <nav class="navbar navbar-expand-xl navbar-dark bg-dark px-2">
    <router-link class="navbar-brand" :to="{ name: 'HomePage' }">
      <img
        src="../assets/plane.svg"
        width="30"
        height="30"
        class="d-inline-block align-top mx-1"
        alt="Plane logo"
      />
      Flight Plan Profitability Calculator
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbar-collapsed-section"
      aria-controls="navbar-collapsed-section"
      aria-expanded="false"
      aria-label="Toggle navigation"
      v-if="showNavbar"
      ref="navbarCollapseButton"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse"
      id="navbar-collapsed-section"
      v-if="showNavbar"
    >
      <ul class="navbar-nav mx-2 mx-xl-0">
        <navbar-item to="HomePage">Home</navbar-item>
        <navbar-item to="ManageFlightplans">Manage flightplans</navbar-item>
        <span
          style="border-color: rgba(255, 255, 255, 0.25) !important"
          class="d-none d-xl-inline border-start border-1 my-2"
        ></span>
        <hr class="d-xl-none text-white m-0" />
        <navbar-item to="AirportDetails">Airport details</navbar-item>
        <navbar-item to="AircraftDetails">Aircraft details</navbar-item>
        <navbar-item to="PricingDetails">Pricing details</navbar-item>
        <span
          style="border-color: rgba(255, 255, 255, 0.25) !important"
          class="d-none d-xl-inline border-start border-1 my-2"
        ></span>
        <hr class="d-xl-none text-white m-0" />
        <navbar-item to="ProfitInformation" :disabled="!complete"
          >Profit information</navbar-item
        >
        <navbar-item to="ExportPage">Import/export data</navbar-item>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import $ from 'jquery';

import NavbarItem from './NavbarItem.vue';

export default {
  name: 'navbar',
  components: {
    NavbarItem,
  },
  computed: {
    ...mapState('selected', ['flightPlanName']),
    ...mapGetters('selected', ['complete']),
    dataEntryDropdownActive() {
      return ['AirportDetails', 'AircraftDetails', 'PricingDetails'].includes(
        this.$route.name
      );
    },
    showNavbar() {
      return !(
        this.flightPlanName === null && this.$route.name === 'ManageFlightplans'
      );
    },
  },
  watch: {
    $route: function () {
      if ($(this.$refs.navbarCollapseButton).attr('aria-expanded') === 'true') {
        $(this.$refs.navbarCollapseButton).click();
      }
    },
  },
};
</script>
