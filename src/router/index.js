import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index.js';

import Home from '../views/Home.vue';
import ManageFlightplans from '../views/ManageFlightplans.vue';
import AirportDetails from '../views/Airport.vue';
import AircraftDetails from '../views/Aircraft.vue';
import PricingDetails from '../views/Pricing.vue';
import ProfitInformation from '../views/Profit.vue';
import Export from '../views/Export.vue';
import NotFound from '../views/NotFound.vue';

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
    component: AircraftDetails,
  },
  {
    path: '/pricing/',
    name: 'PricingDetails',
    component: PricingDetails,
  },
  {
    path: '/profit/',
    name: 'ProfitInformation',
    component: ProfitInformation,
  },
  {
    path: '/export/',
    name: 'Export',
    component: Export,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  if (store.state.selectedFlightPlanName === null && to.name !== 'ManageFlightplans')
    next({ name: 'ManageFlightplans' });
  else next();
});

export default router;
