const BookBox = require('../lib/BookBox');

// initial state
const state = {
  targets: [],
  created: []
};

// getters
const getters = {
};

// actions
const actions = {
  async getBookBoxInfos (context) {
    const targets = await BookBox.getBookBoxInfos();
    context.commit('setTargets', targets);
  },
  async getBookBoxInfosByUser (context, token) {
    const created = await BookBox.getBookBoxInfosByUser(token);
    context.commit('setCreated', created);
  }
};

// mutations
const mutations = {
  setTargets (state, targets) {
    state.targets = targets;
  },
  setCreated (state, created) {
    state.created = created;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
