<template>
  <h1>Aircraft</h1>
  <data-entry-form>
    <form-select
      id="aircraft-type"
      name="aircraft-type"
      label="Aircraft Type"
      options=""
      autofocus
    ></form-select>
  </data-entry-form>
</template>

<script>
import { mapState } from 'vuex';

import DataEntryForm from '../components/DataEntryForm.vue';
import FormSelect from '../components/FormSelect.vue';

export default {
  components: {
    DataEntryForm,
    FormSelect,
  },
  computer: {
    ...mapState([]),
  },
};
</script>
