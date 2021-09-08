export default {
  namespaced: true,
  mutations: {
    create(state, name) {
      state[name] = {
        name: name,
        UKAirportCode: null,
        foreignAirportCode: null,
        aircraftId: null,
        numFirstClass: null,
        standardClassPrice: null,
        firstClassPrice: null,
      };
    },
  },
  actions: {
    create({ commit, state }, name) {
      if (!(name in state)) {
        commit('create', name);
      }
    },
  },
  getters: {
    count(state) {
      return Object.keys(state).length;
    },
  },
};

/*
Test data:
{
  "first":{
    "name":"first",
    "foreignAirportCode":"JFK",
    "UKAirportCode":"LPL",
    "aircraftID":3
  },
  "second":{
    "name":"second",
    "foreignAirportCode":"ORY",
    "aircraftID":2
  },
  "third":{
    "name":"third",
    "aircraftID":1,
    "foreignAirportCode":"MAD"
  }
}
*/

/* 
Each flight plan must be a seperate object in the 
flightplans module state with the following schema:

name: {
  name, (must be unique and must match the key of the object)
  UKAirportCode,
  foreignAirportCode,
* distance, // distance between airports, km
  aircraftID,
  numFirstClass,
* numStandardClass,
  standardClassPrice,
  firstClassPrice,
* costPerSeat, // running cost per seat for whole distance
* runningCost, // total running cost
* income,
* profit,
}
(an asterisk indicates that the property is auto-generated 
  from entered data and is a getter, not a state property)

For example:
"First": {
  name: "First",
  UKAirportCode: "LPL",
  foreignAirportCode: "JFK",
  distance: 5462,
  aircraftID: 3,
  numFirstClass: 30,
  numStandardClass: 200,
  standardClassPrice: 100,
  firstClassPrice: 300,
  costPerSeat: 50,
  runningCost: 5000,
  income: 20000,
  profit: 15000,
}
(made up example - values may not be accurate)

*/
