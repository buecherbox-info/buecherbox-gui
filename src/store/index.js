import Vue from 'vue';
import Vuex from 'vuex';

import BookStorage from './BookStorage';
import User from './User';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    BookStorage,
    User
  },
  strict: debug
});
