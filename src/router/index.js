import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index.js';

import Home from '../views/Home.vue';
import Flightplans from '../views/Flightplans.vue';

function lazyLoad(view) {
  return () => import(`../views/${view}.vue`);
}

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
  },
  {
    path: '/manage/',
    name: 'ManageFlightplans',
    component: Flightplans,
  },
  {
    path: '/airport/',
    name: 'AirportDetails',
    component: lazyLoad('Airport'),
  },
  {
    path: '/aircraft/',
    name: 'AircraftDetails',
    component: lazyLoad('Aircraft'),
  },
  {
    path: '/pricing/',
    name: 'PricingDetails',
    component: lazyLoad('Pricing'),
  },
  {
    path: '/profit/',
    name: 'ProfitInformation',
    component: lazyLoad('Profit'),
  },
  {
    path: '/export/',
    name: 'ExportPage',
    component: lazyLoad('Export'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFoundPage',
    component: lazyLoad('NotFound'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  if (
    store.state.selectedFlightPlanName === null &&
    localStorage.getItem('selectedFlightPlanName') === null &&
    to.name !== 'ManageFlightplans'
  )
    next({ name: 'ManageFlightplans' });
  else next();
});

export default router;
