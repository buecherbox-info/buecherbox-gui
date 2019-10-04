import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import BookStorage from './BookStorage';
import Dashboard from './Dashboard';
import User from './User';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    BookStorage,
    Dashboard,
    User
  },
  plugins: [
    createPersistedState({
      key: 'buecherbox',
      storage: window.localStorage,
      paths: [
        'User.username',
        'User.locale',
        'User.refreshToken'
      ]
    }),
    createPersistedState({
      key: 'buecherbox',
      storage: window.sessionStorage,
      paths: [
        'User.isLoggedIn',
        'User.userId',
        'User.token',
        'User.role'
      ]
    })
  ],
  strict: debug
});
