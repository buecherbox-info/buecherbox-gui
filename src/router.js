import Vue from 'vue';
import VueRouter from 'vue-router';

import Map from './components/Map';

Vue.use(VueRouter);

const router = [
  { path: '/', component: Map}
];


export default new VueRouter({
  routes: router
});
