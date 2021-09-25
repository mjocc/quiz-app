<template>
  <h1>Airport details</h1>
  <data-entry-form @submit.prevent="updateAirportData">
    <div class="form-group my-3">
      <label class="mb-1" for="uk-airport-field">UK airport</label>
      <select
        v-model="UKAirport"
        class="form-select"
        id="uk-airport-field"
        required
        autofocus
      >
        <option value="default" disabled selected hidden>
          Select an option
        </option>
        <option value="LPL">Liverpool John Lennon (LPL)</option>
        <option value="BOH">Bournemouth International Airport (BOH)</option>
      </select>
    </div>
    <div class="form-group my-3">
      <label class="mb-1" for="foreign-airport-field">Foreign airport</label>
      <select
        v-model="foreignAirport"
        class="form-select"
        id="foreign-airport-field"
        required
      >
        <option value="default" disabled selected hidden>
          Select an option
        </option>
        <option
          v-for="airport in selectAirports"
          :key="airport.value"
          :value="airport.value"
        >
          {{ airport.text }}
        </option>
      </select>
    </div>
  </data-entry-form>
</template>

<script>
import toastr from 'toastr';
import { mapState, mapGetters, mapActions } from 'vuex';

import DataEntryForm from '../components/DataEntryForm.vue';

export default {
  components: {
    DataEntryForm,
  },
  data() {
    return {
      UKAirport: null,
      foreignAirport: null,
    };
  },
  methods: {
    ...mapActions(['enterAirportDetails']),
    updateAirportData() {
      this.enterAirportDetails({
        UKAirportCode: this.UKAirport,
        foreignAirportCode: this.foreignAirport,
      });
      this.$router.push({ name: 'HomePage' });
      toastr.success('Airport data submitted');
      if (this.aircraftDetailsExist && !this.inRange) {
        toastr.warning(
          'The distance between the selected airports is greater than the range of the selected aircraft'
        );
      }
    },
  },
  computed: {
    ...mapState(['airports']),
    ...mapGetters('selected', [
      'flightplan',
      'aircraftDetailsExist',
      'inRange',
    ]),
    selectAirports() {
      return Object.values(this.airports).map((airport) => {
        return {
          value: airport.code,
          text: airport.name,
        };
      });
    },
  },
  mounted() {
    if (this.flightplan.UKAirportCode !== null) {
      this.UKAirport = this.flightplan.UKAirportCode;
    } else {
      this.UKAirport = 'default';
    }
    if (this.flightplan.foreignAirportCode !== null) {
      this.foreignAirport = this.flightplan.foreignAirportCode;
    } else {
      this.foreignAirport = 'default';
    }
  },
};
</script>
