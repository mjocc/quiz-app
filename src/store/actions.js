import * as types from '../store/mutation-types.js';

function getSelectedFlightPlan(state) {
  return state.flightplans[state.selectedFlightPlanName];
}

export default {
  enterAirportDetails({ state, commit }, payload) {
    const flightplan = getSelectedFlightPlan(state);
    commit(types.ENTER_AIRPORT_DETAILS, { flightplan, ...payload });
  },
  enterAircraftDetails({ state, commit }, payload) {
    const flightplan = getSelectedFlightPlan(state);
    commit(types.ENTER_AIRCRAFT_DETAILS, { flightplan, ...payload });
  },
  enterPricingDetails({ state, commit }, payload) {
    const flightplan = getSelectedFlightPlan(state);
    commit(types.ENTER_PRICING_DETAILS, { flightplan, ...payload });
  },
};
