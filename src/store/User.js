const JwtDecode = require('jwt-decode');
const User = require('../lib/User');

// initial state
const state = {
  isLoggedIn: false,
  userId: -1,
  email: '',
  username: '',
  password: '',
  passwordConfirmation: '',
  passwordOld: '',
  token: '',
  role: '',
  locale: 'en'
};

// getters
const getters = {
  accessDashboard: (state) => {
    return state.role && state.role === 'admin';
  }
};

// actions
const actions = {
  async login (context) {
    const result = await User.login(context.state.username, context.state.password);

    if (result.token && result.refreshToken) {
      context.commit('login', result);
      context.commit('setUser', result.user);
      context.commit('resetPassword')
    }
  },
  async register (context) {
    const result = await User.register(context.state.email, context.state.username, context.state.password);

    const user = {
      user: {
        id: result.id
      },
      token: result.token
    };

    context.commit('login', user);
    context.commit('resetPassword')
  },
  async getProfile (context) {
    const result = await User.getProfile(context.state.userId, context.state.token);
    context.commit('setUser', result);
  },
  async changePassword (context) {
    await User.changePassword(context.state.userId, context.state.token, context.state.passwordOld, context.state.password);
    context.commit('resetPassword')
  }
};

// mutations
const mutations = {
  login (state, user) {
    state.token = user.token;
    state.refreshToken = user.refreshToken;
    state.isLoggedIn = true;

    const decoded = JwtDecode(user.token);
    state.role = decoded.role;
  },
  logout (state) {
    state.token = '';
    state.refreshToken = '';
    state.role = '';
    state.userId = -1;
    state.email = '';
    state.username = '';
    state.password = '';
    state.passwordConfirmation = '';
    state.passwordOld = '';
    state.isLoggedIn = false;
  },
  setIsLoggedIn (state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  setUserId (state, userId) {
    state.userId = userId;
  },
  setEmail (state, email) {
    state.email = email;
  },
  setUsername (state, username) {
    state.username = username;
  },
  setPassword (state, password) {
    state.password = password;
  },
  setPasswordConfirmation (state, passwordConfirmation) {
    state.passwordConfirmation = passwordConfirmation;
  },
  setPasswordOld (state, passwordOld) {
    state.passwordOld = passwordOld;
  },
  resetPassword (state) {
    state.password = '';
    state.passwordConfirmation = '';
    state.passwordOld = '';
  },
  setToken (state, token) {
    state.token = token;
  },
  setLocale (state, locale) {
    state.locale = locale;
  },
  setUser (state, user) {
    state.userId = user.id;
    state.email = user.email;
    state.username = user.username;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
