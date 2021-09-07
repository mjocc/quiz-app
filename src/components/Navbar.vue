<template>
  <nav class="navbar navbar-expand-xl navbar-dark bg-dark px-2">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
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
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse"
      id="navbar-collapsed-section"
      ref="navbarCollapse"
      v-if="showNavbar"
    >
      <ul class="navbar-nav mx-2 mx-xl-0">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li>
          <router-link class="nav-link" :to="{ name: 'Flightplans' }"
            >Manage flightplans</router-link
          >
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            :class="{ active: dataEntryDropdownActive }"
            href="#"
            id="navbar-forms-dropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            ref="dataEntryDropdown"
            >Data entry forms</a
          >
          <ul
            class="dropdown-menu dropdown-menu-dark"
            aria-labelledby="navbar-forms-dropdown"
          >
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'AirportDetails' }"
                >Airport details</router-link
              >
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'AircraftDetails' }"
                >Aircraft details</router-link
              >
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'PricingDetails' }"
                >Pricing details</router-link
              >
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'ProfitInformation' }"
            >Profit information</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Export' }"
            >Import/export data</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import bootstrap from '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { mapState } from 'vuex';

export default {
  name: 'navbar',
  data() {
    return {
      dataEntryDropdown: null,
      navbarCollapse: null,
    };
  },
  computed: {
    ...mapState(['selectedFlightPlanName']),
    dataEntryDropdownActive() {
      return ['AirportDetails', 'AircraftDetails', 'PricingDetails'].includes(
        this.$route.name
      );
    },
    showNavbar() {
      return !(
        this.selectedFlightPlanName === null &&
        this.$route.name === 'Flightplans'
      );
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.dataEntryDropdown.hide();
    this.navbarCollapse.hide();
    next();
  },
  mounted() {
    this.dataEntryDropdown = new bootstrap.Dropdown(
      this.$refs.dataEntryDropdown
    );
    this.navbarCollapse = new bootstrap.Collapse(this.$refs.navbarCollapse);
  },
};
</script>
