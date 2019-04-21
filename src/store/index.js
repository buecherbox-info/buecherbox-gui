import Vue from 'vue';
import Vuex from 'vuex';

import BookStorage from './BookStorage';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    BookStorage
  },
  strict: debug
});
