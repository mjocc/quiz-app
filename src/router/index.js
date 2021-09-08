import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index.js';

import Home from '../views/Home.vue';
import ManageFlightplans from '../views/ManageFlightplans.vue';
import AirportDetails from '../views/Airport.vue';

function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/manage/',
    name: 'ManageFlightplans',
    component: ManageFlightplans,
  },
  {
    path: '/airport/',
    name: 'AirportDetails',
    component: AirportDetails,
  },
  {
    path: '/aircraft/',
    name: 'AircraftDetails',
    component: lazyLoad('AircraftDetails'),
  },
  {
    path: '/pricing/',
    name: 'PricingDetails',
    component: lazyLoad('PricingDetails'),
  },
  {
    path: '/profit/',
    name: 'ProfitInformation',
    component: lazyLoad('ProfitInformation'),
  },
  {
    path: '/export/',
    name: 'Export',
    component: lazyLoad('Export'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
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
    to.name !== 'ManageFlightplans'
  )
    next({ name: 'ManageFlightplans' });
  else next();
});

export default router;
