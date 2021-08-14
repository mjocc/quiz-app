import { createStore } from "vuex";

import mutations from "./mutations.js";
import actions from "./actions.js";

import airports from "./modules/airports.js";
import aircraft from "./modules/aircraft.js";
import flightplans from "./modules/flightplans.js";

export default createStore({
  state: {},
  mutations,
  actions,
  modules: {
    airports,
    aircraft,
    flightplans,
  },
  strict: process.env.NODE_ENV !== "production",
});
