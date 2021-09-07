<template>
  <navbar />
  <div class="container mt-4">
    <router-view @message="createMessage" />
    <div
      v-for="msg in messages"
      :key="msg.message"
      :class="message.class"
      class="alert"
      role="alert"
    >
      {{ msg.message }}
    </div>
  </div>
</template>

<script>
import { openDB } from 'idb';
import { diff } from 'just-diff';
import { mapState } from 'vuex';

import * as types from './store/mutation-types.js';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  data() {
    return {
      dbName: 'profitcalculatordb',
      storeName: 'flightplans',
      version: 1,
      db: undefined,
      messages: [],
    };
  },
  computed: mapState(['selectedFlightPlanName']),
  methods: {
    createMessage(event, message, type) {
      this.messages.push({
        message,
        class: `alert-${type}`,
      });
    },
  },
  watch: {
    selectedFlightPlanName() {
      localStorage.setItem(
        'selectedFlightPlanName',
        this.selectedFlightPlanName
      );
    },
  },
  async mounted() {
    this.db = await openDB(this.dbName, this.version, {
      upgrade(db) {
        db.createObjectStore(this.storeName);
      },
    });

    const selectedFlightPlanName = localStorage.getItem(
      'selectedFlightPlanName'
    );
    this.$store.commit(
      types.IMPORT_SELECTED_FLIGHTPLAN,
      selectedFlightPlanName
    );

    const initialFlightPlans = await this.db
      .transaction(this.storeName)
      .objectStore(this.storeName)
      .getAll();
    this.$store.commit(types.IMPORT_FLIGHTPLANS, initialFlightPlans);

    this.$store.watch(
      (state) => {
        return Object.assign({}, state.flightplans);
      },
      async (newFlightPlans, oldFlightPlans) => {
        const tx = this.db.transaction(this.storeName, 'readwrite');
        const store = await tx.objectStore(this.storeName);
        const makeChange = async (change) => {
          const key = change.path[0];
          if (
            (change.op === 'add' || change.op === 'replace') &&
            change.path.length === 1
          ) {
            const value = Object.assign({}, change.value);
            await store.put(value, key);
          } else if (
            (change.op === 'add' || change.op === 'replace') &&
            change.path.length === 2
          ) {
            let value = await store.get(key);
            value[change.path[1]] = change.value;
            await store.put(value, key);
          } else if (change.op === 'remove') {
            await store.delete(key);
          }
        };
        for (let change of diff(oldFlightPlans, newFlightPlans)) {
          await makeChange(change);
        }
      },
      { deep: true }
    );
  },
  components: {
    Navbar,
  },
};
</script>
