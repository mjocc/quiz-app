import { createApp } from 'vue';

import 'bootstrap';
import 'jquery';
import 'toastr';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';

import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).mount('#app');
