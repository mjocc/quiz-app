import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';

import mutations from './mutations.js';
import actions from './actions.js';

import airports from './modules/airports.js';
import aircraft from './modules/aircraft.js';
import flightplans from './modules/flightplans.js';
import selected from './modules/selected.js';

const vuexLocal = new VuexPersistence({
  storage: localForage,
  key: 'flightplans',
  modules: ['flightplans', 'selected'],
  asyncStorage: true,
});

export default createStore({
  plugins: [vuexLocal.plugin],
  getters: {},
  mutations,
  actions,
  modules: {
    airports,
    aircraft,
    flightplans,
    selected,
  },
  strict: process.env.NODE_ENV !== 'production',
});
