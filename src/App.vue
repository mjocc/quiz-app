<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
import { openDB } from 'idb';
import { diff } from 'just-diff';
import { IMPORT_FLIGHTPLANS } from './store/mutation-types.js';

export default {
  name: 'App',
  data() {
    return {
      dbName: 'profitcalculatordb',
      storeName: 'flightplans',
      version: 1,
      db: undefined,
    };
  },
  async mounted() {
    this.db = await openDB(this.dbName, this.version, {
      upgrade(db) {
        db.createObjectStore(this.storeName);
      },
    });
    const initialFlightPlans = await this.db
      .transaction(this.storeName)
      .objectStore(this.storeName)
      .getAll();
    this.$store.commit(IMPORT_FLIGHTPLANS, initialFlightPlans);
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
            change.op === 'add' ||
            (change.op === 'replace' && change.path.length === 1)
          ) {
            const value = Object.assign({}, change.value);
            await store.put(value, key);
          } else if (change.op === 'replace' && change.path.length === 2) {
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
};
</script>

<style>
body {
  background: gray;
}
</style>
