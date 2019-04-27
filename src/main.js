import Axios from 'axios';
import Config from '../config';
import Vue from 'vue';
import App from './App.vue';
import Routes from './router';
import Store from './store';

Axios.defaults.baseURL = Config.api.baseUrl;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: Routes,
  store: Store
}).$mount('#app');
