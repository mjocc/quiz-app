<template>
  <h1>Export data</h1>
  <data-entry-form @submit.prevent="downloadFile">
    <div class="form-group my-2">
      <span>File type</span>
      <div class="form-check">
        <input
          v-model="fileType"
          class="form-check-input"
          type="radio"
          id="json-file-option"
          value="json"
          required
        />
        <label class="form-check-label" for="json-file-option">JSON</label>
      </div>
      <div class="form-check">
        <input
          v-model="fileType"
          class="form-check-input"
          type="radio"
          id="yaml-file-option"
          value="yaml"
          required
        />
        <label class="form-check-label" for="yaml-file-option">YAML</label>
      </div>
      <div class="form-check">
        <input
          v-model="fileType"
          class="form-check-input"
          type="radio"
          id="csv-file-option"
          value="csv"
          required
        />
        <label class="form-check-label" for="csv-file-option">CSV</label>
      </div>
    </div>
  </data-entry-form>
</template>

<script>
import _ from 'lodash';
import download from 'downloadjs';
import YAML from 'json-to-pretty-yaml';
import { Parser as CSVParser } from 'json2csv';
import { mapState } from 'vuex';

import DataEntryForm from '../components/DataEntryForm.vue';

export default {
  components: { DataEntryForm },
  data() {
    return {
      fileType: null,
    };
  },
  computed: {
    ...mapState(['flightplans']),
    flightplansArray() {
      let fp = _.cloneDeep(this.flightplans);
      return Object.values(fp);
    },
  },
  methods: {
    downloadFile() {
      switch (this.fileType) {
        case 'json': {
          download(
            JSON.stringify(this.flightplansArray),
            'flightplans.json',
            'application/json'
          );
          break;
        }
        case 'yaml': {
          let fpArr = _.cloneDeep(this.flightplansArray);
          fpArr.map((flightplan) => {
            flightplan.date = flightplan.date.toString();
            return flightplan;
          });
          download(YAML.stringify(fpArr), 'flightplans.yaml', 'text/yaml');
          break;
        }
        case 'csv': {
          const parser = new CSVParser();
          download(
            parser.parse(this.flightplansArray),
            'flightplans.csv',
            'text/csv'
          );
          break;
        }
      }
    },
  },
};
</script>
