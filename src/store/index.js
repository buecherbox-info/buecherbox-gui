import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import BookStorage from './BookStorage';
import User from './User';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    BookStorage,
    User
  },
  plugins: [
    createPersistedState({
      key: 'buecherbox',
      paths: [
        'User.isLoggedIn',
        'User.userId',
        'User.username',
        'User.token'
      ]
    })
  ],
  strict: debug
});
