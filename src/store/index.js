import { createStore } from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';

import airports from './modules/airports.js';
import aircraft from './modules/aircraft.js';
import flightplans from './modules/flightplans.js';

export default createStore({
  state: {
    selectedFlightPlanName: null,
  },
  getters: {
    selectedFlightPlan(state) {
      return state.flightplans[state.selectedFlightPlanName];
    },
    selectedAirport(state, getters) {
      let flightplan = getters.selectedFlightPlan;
      if (flightplan) {
        return state.airports[getters.selectedFlightPlan.foreignAirportCode];
      } else {
        return undefined;
      }
    },
    selectedAircraft(state, getters) {
      let flightplan = getters.selectedFlightPlan;
      if (flightplan) {
        return state.aircraft[getters.selectedFlightPlan.aircraftID];
      } else {
        return undefined;
      }
    },
  },
  mutations,
  actions,
  modules: {
    airports,
    aircraft,
    flightplans,
  },
  strict: process.env.NODE_ENV !== 'production',
});
