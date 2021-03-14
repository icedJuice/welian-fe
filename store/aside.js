/**
 *
 *  右侧导航栏数据，
 */
import cloneDeep from 'lodash/cloneDeep';
import service from '../api';

export const state = () => ({
  winCaseData: null,
  zixunData: {},
  evalData: {}
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
// mainWinCaseList
export const actions = {
  async initAsideData({ commit, rootState, state, dispatch }, params) {
    if (!state.winCaseData) {
    }
  }
};
