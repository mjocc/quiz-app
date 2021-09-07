export default {
  importFlightPlans(state, flightplans) {
    for (let flightplan of flightplans) {
      state.flightplans[flightplan.name] = flightplan;
    }
  },
};
