import App from './App.vue';
import I18n from './plugins/i18n';
import Routes from './plugins/router';
import Store from './store';
import Validation from './plugins/validation';
import VeeValidate from 'vee-validate';
import Vue from 'vue';

Vue.config.productionTip = false;

Vue.use(VeeValidate, Validation);

new Vue({
  i18n: I18n,
  render: h => h(App),
  router: Routes,
  store: Store
}).$mount('#app');
