<template>
  <data-entry-form>
    <div class="form-group my-3">
      <label class="mb-1" for="uk-airport-field">UK Airport</label>
      <select v-model="UKAirport" class="form-select" id="uk-airport-field" required autofocus>
          <option value="default" disabled selected hidden>Select an option</option>
          <option value="LPL">Liverpool John Lennon (LPL)</option>
          <option value="BOH">Bournemouth International Airport (BOH)</option>
      </select>
    </div>
    <div class="form-group my-3">
      <label class="mb-1" for="foreign-airport-field">Foreign Airport</label>
      <select
        v-model="foreignAirport"
        class="form-select"
        id="foreign-airport-field"
        required
      >
        <option value="default" disabled selected hidden>Select an option</option>
        <option
          v-for="airport in airports"
          :key="airport.value"
          :value="airport.value"
        >
          {{ aircraft.text }}
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
      UKAirport: 'default',
      foreignAirport: 'default',
    };
  },
  computed: {
    ...mapState(['airport']),
    ...mapGetters('selected', ['flightplan']),
    airports() {
      return Object.values(this.airport).map((airport) => {
        return {
          value: airport.code,
          text: airport.name,
        };
      });
    },
  },
  mounted() {
    if (this.flightplan.UKAirportCode !== undefined) {
      this.UKAirport = this.flightplan.UKAirportCode;
    }
    if (this.flightplan.foreignAirportCode !== undefined) {
      this.foreignAirport = this.flightplan.foreignAirportCode;
    }
  },
}
</script>