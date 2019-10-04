import App from './App.vue';
import I18n from './plugins/i18n';
import Routes from './plugins/router';
import Store from './store';
import Vue from 'vue';
import './plugins/validation';

Vue.config.productionTip = false;

new Vue({
  i18n: I18n,
  render: h => h(App),
  router: Routes,
  store: Store
}).$mount('#app');
