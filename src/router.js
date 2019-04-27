import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './pages/Index';

Vue.use(VueRouter);

const router = [
  { path: '/', component: Index, props: true}
];


export default new VueRouter({
  routes: router
});
