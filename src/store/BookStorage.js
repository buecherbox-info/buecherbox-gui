const BookBox = require('../lib/BookBox');

// initial state
const state = {
  targets: []
};

// getters
const getters = {
};

// actions
const actions = {
  async getBookBoxInfos () {
    const targets = await BookBox.getBookBoxInfos();
    this.commit('BookStorage/setTargets', targets);
  }
};

// mutations
const mutations = {
  setTargets (state, targets) {
    state.targets = targets;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
