import Cookies from 'js-cookie';

import API from '../api';
// import cloneDeep from 'lodash/cloneDeep';
import _ from '../utils/underscore';

const defaultPageSize = 20;

export const state = () => ({
  searchStr: '',
  userCodeList: [],
  loading: false,
  done: false,
  currentPage: 0
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

    search({ commit, dispatch }, { value = '' } = {}) {
        commit('SET_STATE', {searchStr: value, userCodeList: [], loading: false, done: 0, currentPage: 0 });
        dispatch('getUserCodes');
    },

  async getUserCodes({ commit, state }, { search } = {}) {
    const { searchStr, userCodeList, loading, done, currentPage } = state;
    
    if (loading || done) {
        return;
    }

    commit('SET_STATE', {loading: true});

    const payload = {
        currentPage,
        pageSize: defaultPageSize,
    };
    const res = await API.getMyQrCodes(payload);
    console.log(res);
    const data = res.data;
    const newUserCodeList = [...userCodeList];
    newUserCodeList.splice(defaultPageSize * currentPage, data.length, ...data);

    commit('SET_STATE', { userCodeList: newUserCodeList, loading: false, done: !res.hasNextPage });
  },
};
