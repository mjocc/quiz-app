<template>
  <h1>Pricing Details</h1>
  <data-entry-form @submit.prevent="updatePricingData">
    <div class="form-group my-3">
      <label class="mb-1" for="standard-class-price-field"
        >Price of a standard class seat</label
      >
      <div class="input-group">
        <div class="input-group-text">£</div>
        <input
          v-model="standardClassPrice"
          type="number"
          step="0.01"
          min="0"
          class="form-control"
          id="standard-class-price-field"
          required
          autofocus
        />
      </div>
    </div>
    <div class="form-group my-3">
      <label class="mb-1" for="first-class-price-field"
        >Price of a first class seat</label
      >
      <div class="input-group">
        <div class="input-group-text">£</div>
        <input
          v-model="firstClassPrice"
          type="number"
          step="0.01"
          min="0"
          class="form-control"
          id="first-class-price-field"
          required
        />
      </div>
    </div>
  </data-entry-form>
</template>

<script>
import toastr from 'toastr';
import { mapGetters, mapActions } from 'vuex';

import DataEntryForm from '../components/DataEntryForm.vue';

export default {
  components: { DataEntryForm },
  data() {
    return {
      standardClassPrice: null,
      firstClassPrice: null,
    };
  },
  methods: {
    ...mapActions(['enterPricingDetails']),
    updatePricingData() {
      this.enterPricingDetails({
        standardClassPrice: this.standardClassPrice,
        firstClassPrice: this.firstClassPrice,
      });
      this.$router.push({ name: 'HomePage' });
      toastr.success('Pricing data submitted');
    },
  },
  computed: {
    ...mapGetters('selected', ['flightplan']),
  },
  mounted() {
    if (this.flightplan.standardClassPrice !== null) {
      this.standardClassPrice = this.flightplan.standardClassPrice;
    }
    if (this.flightplan.firstClassPrice !== null) {
      this.firstClassPrice = this.flightplan.firstClassPrice;
    }
  },
};
</script>
