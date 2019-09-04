const BookBox = require('../lib/BookBox');

// initial state
const state = {
  targets: [],
  favorites: []
};

// getters
const getters = {
  created: (state) => (userId) => {
    return state.targets.filter((target) => target.userid === userId);
  },
  userFavorites (state) {
    const favs = [];

    state.favorites.forEach((target) => {
      const box = state.targets.find(el => el.id === target.id);
      if (box) {
        favs.push(box);
      }
    });

    return favs;
  }
};

// actions
const actions = {
  async getBookBoxInfos (context) {
    const targets = await BookBox.getBookBoxInfos();
    context.commit('setTargets', targets);
  },
  async getBookBoxInfosByUser (context, user) {
    const created = await BookBox.getBookBoxInfosByUser(user.userId, user.token);
    context.commit('setCreated', created);
  },
  async getBookBoxFavoritesByUser (context, user) {
    const created = await BookBox.getBookBoxFavoritesByUser(user.userId, user.token);
    context.commit('setFavorites', created);
  },
  async addFavorite (context, favorite) {
    const fav = await BookBox.addFavorite(favorite.userId, favorite.token, favorite.bookboxId);
    if (fav) {
      context.commit('addFavorite', fav);
    }
  },
  async deleteFavorite (context, favorite) {
    await BookBox.deleteFavorite(favorite.userId, favorite.token, favorite.bookboxId);
    context.commit('deleteFavorite', favorite.bookboxId);
  }
};

// mutations
const mutations = {
  setTargets (state, targets) {
    state.targets = targets;
  },
  setCreated (state, created) {
    state.created = created;
  },
  addTarget (state, target) {
    state.targets.push(target);
  },
  updateTarget (state, target) {
    const targets = [
      ...state.targets.filter(el => el.id !== target.id),
      target
    ];
    state.targets = targets.sort((prev, next) => prev.id - next.id);
  },
  setFavorites (state, favorites) {
    state.favorites = favorites;
  },
  addFavorite (state, favorite) {
    state.favorites.push(favorite);
  },
  deleteFavorite (state, bookboxId) {
    state.favorites = state.favorites.filter(el => el.id !== bookboxId);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
