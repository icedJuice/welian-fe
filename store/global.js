// import service from '../api';
// import cloneDeep from 'lodash/cloneDeep';
import _ from '../utils/underscore';

export const state = () => ({
  // 面包屑导航，PC, [{ name:, href }]
  bradeList: [],
  routePath: null,
});

export const mutations = {
  FETCH_STATE(state, key) {
    return state[key];
  },

  SET_STATE(state, data) {
    for (let k in data) {
      state[k] = data[k];
    }
  }
};

export const actions = {
  async setBradeList({ commit }, { bradeList = [] } = {}) {
    const defalutList = [{ name: '首页', href: '/' }];
    commit('SET_STATE', { bradeList: [...defalutList, ...bradeList] });
  },

  async setNavActive({commit}, { path }) {
    commit('SET_STATE', { routePath: path})
  },
};
