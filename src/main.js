import App from './App.vue';
import Axios from 'axios';
import Config from '../config';
import I18n from './i18n';
import Routes from './router';
import Store from './store';
import Vue from 'vue';

Axios.defaults.baseURL = Config.api.baseUrl;

Vue.config.productionTip = false;

new Vue({
  i18n: I18n,
  render: h => h(App),
  router: Routes,
  store: Store
}).$mount('#app');
