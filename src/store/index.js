import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';

import mutations from './mutations.js';
import actions from './actions.js';

const vuexLocal = new VuexPersistence({
  storage: localForage,
  key: 'quizzes',
  asyncStorage: true,
});

export default createStore({
  plugins: [vuexLocal.plugin],
  getters: {},
  state: {
    quizzes: {
      first_quiz: {
        name: 'first_quiz',
        created: new Date('2021-10-23T22:28:23'),
        questions: {
          'What is 5 + 9?': {
            order: 0,
            text: 'What is 5 + 9?',
            options: {
              14: { order: 0, option: '14', correct: true },
              9: { order: 1, option: '9', correct: false },
              17: { order: 2, option: '17', correct: false },
            },
          },
          'What is 5 + 10?': {
            order: 1,
            text: 'What is 5 + 10?',
            options: {
              15: { order: 0, option: '15', correct: true },
              9: { order: 1, option: '9', correct: false },
              17: { order: 2, option: '17', correct: false },
            },
          },
          'What is 5 + 11?': {
            order: 2,
            text: 'What is 5 + 11?',
            options: {
              16: { order: 0, option: '16', correct: true },
              9: { order: 1, option: '9', correct: false },
              17: { order: 2, option: '17', correct: false },
            },
          },
        },
      },
    },
  },
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
});
