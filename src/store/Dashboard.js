const Dashboard = require('../lib/Dashboard');

// initial state
const state = {
  targets: [],
  users: []
};

// getters
const getters = {
};

// actions
const actions = {
  async getBookBoxInfos (context, token) {
    const targets = await Dashboard.getBookBoxInfos(token);
    context.commit('setTargets', targets);
  },
  async getUserInfos (context, token) {
    const users = await Dashboard.getUserInfos(token);
    context.commit('setUsers', users);
  }
};

// mutations
const mutations = {
  setTargets (state, targets) {
    state.targets = targets;
  },
  setUsers (state, users) {
    state.users = users;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
