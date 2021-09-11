export default {
  namespaced: true,
  mutations: {
    create(state, name) {
      state[name] = {
        name: name,
        date: new Date(),
        UKAirportCode: null,
        foreignAirportCode: null,
        aircraftId: null,
        numFirstClass: null,
        standardClassPrice: null,
        firstClassPrice: null,
      };
    },
    update(state, names) {
      let fp = state[names.oldName];
      fp.name = names.newName;
      state[names.newName] = fp;
      delete state[names.oldName];
    },
    delete(state, name) {
      delete state[name];
    },
  },
  actions: {
    async create({ commit, state }, name) {
      if (!(name in state)) {
        await commit('create', name);
        return [true, 'Flight plan created successfully'];
      } else {
        return [false, 'Name already exists'];
      }
    },
    async update({ commit, state }, names) {
      if (!(names.newName in state)) {
        await commit('update', names);
        return [true, 'Flight plan name update successful'];
      } else if (names.oldName === names.newName) {
        return [true, 'Flight plan name update successful'];
      } else {
        return [false, 'New name already exists'];
      }
    },
    async delete({ commit }, name) {
      await commit('delete', name);
      return [true, 'Flight plan deleted successfully'];
    },
  },
  getters: {
    count(state) {
      return Object.keys(state).length;
    },
  },
  state: {
    first: {
      name: 'first',
      date: new Date('2021-09-11T18:12:20.008Z'),
      foreignAirportCode: 'JFK',
      UKAirportCode: 'LPL',
      aircraftID: 3,
    },
    second: {
      name: 'second',
      date: new Date('2021-09-11T18:12:20.008Z'),
      foreignAirportCode: 'ORY',
      aircraftID: 2,
    },
    third: {
      name: 'third',
      date: new Date('2021-09-11T18:12:20.008Z'),
      aircraftID: 1,
      foreignAirportCode: 'MAD',
    },
  },
};

/* 
Each flight plan must be a seperate object in the 
flightplans module state with the following schema:

name: {
  name, (must be unique and must match the key of the object)
  date, // date created (date object)
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
  date: 2021-09-11T18:12:20.008Z,
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
