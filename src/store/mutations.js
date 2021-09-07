export default {
  importSelectedFlightPlanName(state, flightPlanName) {
    state.selectedFlightPlanName = flightPlanName;
  },
  enterAirportDetails(state, payload) {
    payload.flightplan.UKAirportCode = payload.UKAirportCode;
    payload.flightplan.foreignAirportCode = payload.foreignAirportCode;
  },
  enterAircraftDetails(state, payload) {
    payload.flightplan.aircraftID = payload.aircraftID;
    payload.flightplan.numFirstClass = payload.numFirstClass;
  },
  enterPricingDetails(state, payload) {
    payload.flightplan.standardClassPrice = payload.standardClassPrice;
    payload.flightplan.firstClassPrice = payload.firstClassPrice;
  },
};
