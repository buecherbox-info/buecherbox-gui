import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '../pages/Index';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Login from '../pages/Login';

Vue.use(VueRouter);

const router = [
  { path: '/', component: Index, props: true },
  { path: '/favorites', component: Favorites, props: true },
  { path: '/profile', component: Profile, props: true },
  { path: '/about', component: About, props: true },
  { path: '/login', component: Login, props: true }
];

export default new VueRouter({
  routes: router
});
