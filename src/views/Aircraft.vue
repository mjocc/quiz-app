<template>
  <h1>Aircraft</h1>
  <data-entry-form>
    <form-select
      id="aircraft-type-field"
      v-model.number="aircraftType"
      label="Aircraft Type"
      :options="aircrafts"
      :error="aircraftFieldError && displayErrors"
      autofocus
    />
    <form-input
      id="num-first-class-field"
      v-model.number="numFirstClass"
      label="Number of First Class Seats"
      type="number"
      :error="firstClassFieldError && displayErrors"
      :disabled="disableFirstClassField"
    />
    <form-buttons @submitForm="updateAircraftData()" />
  </data-entry-form>
</template>

<script>
import toastr from 'toastr';
import { mapGetters, mapActions } from 'vuex';

import DataEntryForm from '../components/DataEntryForm.vue';
import FormSelect from '../components/FormSelect.vue';
import FormInput from '../components/FormInput.vue';
import FormButtons from '../components/FormButtons.vue';

export default {
  components: {
    DataEntryForm,
    FormSelect,
    FormInput,
    FormButtons,
  },
  data() {
    return {
      aircraftType: 'default',
      numFirstClass: '',
      displayErrors: false,
    };
  },
  methods: {
    ...mapActions(['enterAircraftDetails']),
    updateAircraftData() {
      if (!this.aircraftFieldError && !this.firstClassFieldError) {
        this.enterAircraftDetails({
          aircraftID: this.aircraftType,
          numFirstClass: this.numFirstClass,
        });
        this.$router.push({ name: 'HomePage' });
        toastr.success('Aircraft data submitted');
      } else {
        this.displayErrors = true;
      }
    },
  },
  computed: {
    ...mapGetters('selected', ['flightplan']),
    aircrafts() {
      return Object.values(this.$store.state.aircraft).map((aircraft) => {
        return {
          value: aircraft.id,
          text: aircraft.type,
        };
      });
    },
    disableFirstClassField() {
      return this.aircraftType === 'default';
    },
    aircraftFieldError() {
      return this.aircraftType === 'default';
    },
    firstClassFieldError() {
      return this.numFirstClass === '' || isNaN(this.numFirstClass);
    },
  },
  mounted() {
    if (this.flightplan.aircraftID !== undefined) {
      this.aircraftType = this.flightplan.aircraftID;
    }
    if (this.flightplan.numFirstClass !== undefined) {
      this.numFirstClass = this.flightplan.numFirstClass;
    }
  },
};
</script>
