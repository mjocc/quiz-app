import { createStore } from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';

import airports from './modules/airports.js';
import aircraft from './modules/aircraft.js';
import flightplans from './modules/flightplans.js';
import selected from './modules/selected.js';

export default createStore({
  state: {
    selectedFlightPlanName: null,
  },
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
