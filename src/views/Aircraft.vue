<template>
  <h1>Aircraft</h1>
  <data-entry-form @submit="print">
    <form-select
      id="aircraft-type-field"
      v-model.number="aircraftType"
      label="Aircraft Type"
      :options="aircrafts"
      :error="aircraftFieldError && displayErrors"
      autofocus
      required
    />
    <form-input
      id="num-first-class-field"
      v-model.number="numFirstClass"
      label="Number of First Class Seats"
      type="number"
      :error="firstClassFieldError && displayErrors"
      :disabled="disableFirstClassField"
      required
    />
  </data-entry-form>
</template>

<script>
import toastr from 'toastr';
import { mapGetters, mapActions } from 'vuex';

import DataEntryForm from '../components/DataEntryForm.vue';
import FormSelect from '../components/FormSelect.vue';
import FormInput from '../components/FormInput.vue';

export default {
  components: {
    DataEntryForm,
    FormSelect,
    FormInput,
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
    print: console.log
  },
  computed: {
    ...mapGetters('selected', ['flightplan', 'aircraft']),
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
      return (
        this.numFirstClass === '' ||
        isNaN(this.numFirstClass) ||
        this.numFirstClass < this.aircraft.minFirstClass ||
        this.numFirstClass >
          this.aircraft.maxStandardClass - this.numFirstClass * 2
      );
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
