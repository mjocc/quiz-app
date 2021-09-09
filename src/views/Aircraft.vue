<template>
  <h1>Aircraft</h1>
  <data-entry-form>
    <form-select
      id="aircraft-type"
      v-model="aircraftType"
      label="Aircraft Type"
      :options="aircrafts"
      autofocus
      >Aircraft Type</form-select
    >
    <form-input>
    Number of First Class Seats
    </form-input>
    <form-buttons @submitForm="updateAircraftData()" />
  </data-entry-form>
</template>

<script>
import { ENTER_AIRCRAFT_DETAILS } from '../store/mutation-types.js';

import DataEntryForm from '../components/DataEntryForm.vue';
import FormSelect from '../components/FormSelect.vue';
import FormInput from '../components/FormInput.vue';
import FormButtons from '../components/FormButtons.vue';

export default {
  components: {
    DataEntryForm,
    FormSelect,
    FormInput
    FormButtons,
  },
  data() {
    return {
      aircraftType: 'default',
      numFirstClass: 'default',
    };
  },
  methods: {
    updateAircraftData() {
      if (this.aircraftType !== 'default' && this.numFirstClass !== 'default') {
        this.$store.commit(ENTER_AIRCRAFT_DETAILS, {
          aircraftID: this.aircraftType,
          numFirstClass: this.numFirstClass,
        });
      }
    },
  },
  computed: {
    aircrafts() {
      return Object.values(this.$store.state.aircraft).map((aircraft) => {
        return {
          value: aircraft.id,
          text: aircraft.type,
        };
      });
    },
  },
};
</script>
