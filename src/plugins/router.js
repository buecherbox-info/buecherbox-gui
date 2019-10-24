import Vue from 'vue';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';

import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import Favorites from '../pages/Favorites';
import Index from '../pages/Index';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';

Vue.use(VueRouter);
Vue.use(VueMeta);

const router = [
  { path: '/', component: Index, props: true },
  { path: '/about', component: About, props: true },
  { path: '/dashboard', component: Dashboard, props: true },
  { path: '/favorites', component: Favorites, props: true },
  { path: '/login', component: Login, props: true },
  { path: '/profile', component: Profile, props: true },
  { path: '/register', component: Register, props: true }
];

export default new VueRouter({
  routes: router
});
