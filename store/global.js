import Cookies from 'js-cookie';

import API from '../api';
// import cloneDeep from 'lodash/cloneDeep';
import _ from '../utils/underscore';

export const state = () => ({
  // 面包屑导航，PC, [{ name:, href }]
  bradeList: [],
  routePath: null,
  userInfo: null,
  // 验证码
  registerInfo: null
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

  async setNavActive({ commit }, { path }) {
    commit('SET_STATE', { routePath: path });
  },

  async signIn({ commit, dispatch }, payload) {
    try {
      const userInfo = await API.signIn(payload);
      console.log(userInfo);
      const status = (userInfo && userInfo.status) || null;
      if (status && status.status === 0) {
        commit('SET_STATE', { userInfo });
        dispatch('authUser', { userInfo });
      } else {
        let message = status.message || '登录异常';
        switch (status && status.status) {
          case 401:
            message = '账号与密码不匹配';
          case 404:
            message = '您还没有注册，请先注册';
        }
        throw new Error(message);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async signUp({ commit, dispatch }, payload) {
    const userInfo = await API.signUp(payload);
    const status = userInfo && userInfo.status;
    if (status && status.status === 0) {
      const { authToken } = userInfo;
      commit('SET_STATE', { userInfo });
      Cookies.set('WeLink', authToken, { expires: 14 });
    } else {
      let message = '注册失败，请重试';
      switch (status && status.status) {
        case 401: // 验证码错误
          dispatch('getRegisterInfo', true);
          message = '验证码输入错误';
          break;
      }
      throw new Error(message);
    }
    // authToken: "lYA9fATL20114nDqOnBgjApekh4BZVASHfpun4BBSeA="
    // authTokenExpired: "2021-04-03T10:18:04Z"
    // email: "111@qq.com"
    // gamerId: 10000
    // mobile: null
    // nickName: "达芬奇"
    // status: {status: 0, message: "ok"}
    // userId: "110750f7-adde-4468-980f-5faf97c5b46b"
  },

  async getRegisterInfo({ commit, state }, forceUpdate) {
    try {
      const needUpdate = forceUpdate || !state.registerInfo;
      if (needUpdate) {
        const registerInfo = await API.getRegisterInfo();
        if (registerInfo) {
          commit('SET_STATE', { registerInfo });
          return registerInfo;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async getUserInfo({state, commit}) {
    if (!state.userInfo) {
      const WeLink = Cookies.get('WeLink');
      if (WeLink) {
        const userInfo = await API.getUserInfo();
        if (userInfo && userInfo.status && userInfo.status.status === 0) {
          dispatch('authUser', { userInfo });
        } else {
          throw new Error('未登陆');
        }
      } else {
        throw new Error('未登陆');
      }
    }
  },

  authUser({ commit }, { userInfo }) {
    const { authToken } = userInfo;
    commit('SET_STATE', { userInfo });
    Cookies.set('WeLink', authToken, { expires: 14 });
  },

  unAuthUser() {
    commit('SET_STATE', { userInfo: null });
    Cookies.set('WeLink', '', { expires: 0 });
  }
};
