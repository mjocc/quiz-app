import _ from 'lodash';
import { createRouter, createWebHistory } from 'vue-router';
import localForage from 'localforage';
import toastr from 'toastr';

import store from '@/store/index.js';

function lazyLoad(view) {
  return () => import(`../views/${view}.vue`);
}

const routes = [
  {
    path: '/',
    redirect: '/play/',
  },
  {
    path: '/manage/quizzes/',
    name: 'ManageQuizzes',
    component: lazyLoad('Quizzes'),
  },
  {
    path: '/manage/questions/',
    name: 'ManageQuestions',
    component: lazyLoad('Questions'),
    props: (route) => ({ quiz: route.query.quiz }),
  },
  {
    path: '/play/',
    name: 'PlayQuizzes',
    component: lazyLoad('Play'),
    props: (route) => ({
      quiz: route.query.quiz,
    }),
  },
  {
    path: '/results/',
    name: 'DisplayResults',
    component: lazyLoad('Results'),
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
