import _ from 'lodash';
import { createRouter, createWebHistory } from 'vue-router';
import localForage from 'localforage';
import toastr from 'toastr';

import store from '@/store/index.js';

import Quizzes from '@/views/Quizzes.vue';
import Questions from '@/views/Questions.vue';
import Play from '@/views/Play.vue';
import Results from '@/views/Results.vue';

const routes = [
  {
    path: '/',
    name: 'ManageQuizzes',
    component: Quizzes,
  },
  {
    path: '/questions/',
    name: 'ManageQuestions',
    component: Questions,
    props: (route) => ({ quiz: route.query.quiz }),
  },
  {
    path: '/play/',
    name: 'PlayQuizzes',
    component: Play,
    props: (route) => ({
      quiz: route.query.quiz,
    }),
  },
  {
    path: '/results/',
    name: 'DisplayResults',
    component: Results,
    props: (route) => ({
      digest: route.query.digest,
      propAnswers: route.query.answers,
      propQuizTitle: route.query.quizTitle,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

router.beforeEach(async (to) => {
  let fail = (message) => {
    toastr.error(message);
    return { name: 'ManageQuizzes' };
  };
  if (['ManageQuestions'].includes(to.name)) {
    if (!('quiz' in to.query)) {
      return fail('Quiz name parameter required');
    }
    let localQuizzes = await localForage.getItem('quizzes');
    if (
      !(
        to.query.quiz in store.state.quizzes ||
        to.query.quiz in localQuizzes.quizzes
      )
    ) {
      return fail(`Invalid quiz name parameter (${_.escape(to.query.quiz)})`);
    }
  }
});

router.beforeEach(async (to) => {
  if (['PlayQuizzes'].includes(to.name)) {
    if (!('quiz' in to.query)) {
      return true;
    }
    let localQuizzes = await localForage.getItem('quizzes');
    if (
      !(
        to.query.quiz in store.state.quizzes ||
        to.query.quiz in localQuizzes.quizzes
      )
    ) {
      return { name: 'PlayQuizzes' };
    }
  }
});

export default router;
