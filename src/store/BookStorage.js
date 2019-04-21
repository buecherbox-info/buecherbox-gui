// initial state
const state = {
  targets: [
    {
      name: 'Test 1',
      imgSrc: '',
      hint: '420',
      location: 'Amsterdam',
      coord: {
        lng: 12.259568217916211,
        lat: 50.599617329304294
      }
    },
    {
      name: 'Test 2',
      imgSrc: '',
      hint: '',
      location: 'Chemnitz',
      coord: {
        lng: 12.86608547341038,
        lat: 50.85812957593282
      }
    },
    {
      name: 'Test 3',
      imgSrc: '',
      hint: '',
      location: 'New York',
      coord: {
        lng: 12.829225087508064,
        lat: 50.79433207522962
      }
    },
    {
      name: 'Test 4',
      imgSrc: '',
      hint: 'Bunt',
      location: 'Berlin',
      coord: {
        lng: 13.082087334814588,
        lat: 50.83858048449676
      }
    },
    {
      name: 'Test 5',
      imgSrc: '',
      hint: 'Versteckt',
      location: 'Sydney',
      coord: {
        lng: 12.96929455394428,
        lat: 50.782680788490666
      }
    }
  ]
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
