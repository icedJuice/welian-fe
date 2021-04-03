/**
 *
 * option
 */

import service from '../api';

import _ from '~/utils/underscore';

export const state = () => {
  return {
    // 是否有侧栏
    isAsidePage: false,

    // 是否有顶部通栏
    isLayoutPanel: true,

    // 搜索栏
    searchBar: true,

    // 错误页面
    isError: false,

    // 是否为移动端
    mobileLayout: false,

    // 移动端侧边栏
    mobileSidebar: false,

    // ua
    userAgent: '',

    // 移动端页面标题
    pageTitle: '',

    // 网站信息
    option: {},

    pageLoading: false,

    // 移动端底部
    hideBottom: false
  };
};

export const mutations = {
  SET_STATE(state, data) {
    for (let k in data) {
      state[k] = data[k];
    }
  },
  // 页面title
  SET_PAGE_TITLE(state, data) {
    state.pageTitle = data;
  },

  // 侧栏
  CHANGE_ASIDE_PAGE(state, data) {
    state.isAsidePage = data;
  },

  // 设置UA
  SET_USER_AGENT(state, action) {
    state.userAgent = action;
  },

  // 设置是否移动端状态
  SET_MOBILE_LAYOUT(state, action) {
    state.mobileLayout = action;
  },

  // 设置是否移动端状态
  SET_MOBILE_SIDEBAR(state, action) {
    state.mobileSidebar = action;
  },

  // 网站信息
  SET_WEB_OPTION(state, data) {
    state.option = data;
  },

  // 错误页面
  SET_ERROR_PAGE(state, data) {
    state.isError = data;
  },

  LOADING_CHANGE(state, status) {
    state.pageLoading = status;
  }
};

export const actions = {
  async getTDK({ commit }, { indexId, id } = {}) {
   
  },

  async setLayoutPanel({commit}, {isLayoutPanel}) {
    commit('SET_STATE', { isLayoutPanel });
  },

  async setPageTitle({ commit }, data) {
    commit('SET_PAGE_TITLE', data);
  },

  async updateState({ commit }, data) {
    commit('SET_STATE', data);
  },

  async setSearchBar({ commit }, searchBar) {
    commit('SET_STATE', { searchBar });
  }
};
