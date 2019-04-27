const User = require('../lib/User');

// initial state
const state = {
  isLoggedIn: false,
  username: '',
  password: '',
  token: ''
};

// getters
const getters = {};

// actions
const actions = {
  async login (context) {
    const result = await User.login(context.state.username, context.state.password);

    const token = result.token;
    if (token) {
      context.commit('login', token);
    }
  }
};

// mutations
const mutations = {
  login (state, token) {
    state.token = token;
    state.isLoggedIn = true;
  },
  logout (state) {
    state.token = '';
    state.username = '';
    state.password = '';
    state.isLoggedIn = false;
  },
  setIsLoggedIn (state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  setUsername (state, username) {
    state.username = username;
  },
  setPassword (state, password) {
    state.password = password;
  },
  setToken (state, token) {
    state.token = token;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
