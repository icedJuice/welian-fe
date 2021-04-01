import Cookies from 'js-cookie';

import API from '../api';
// import cloneDeep from 'lodash/cloneDeep';
import _ from '../utils/underscore';

const defaultPageSize = 20;

const defaultHomePayload = {
  currentPage: 1,
  pageSize: defaultPageSize,
  loading: false,
  done: false
};

export const state = () => ({
  // 面包屑导航，PC, [{ name:, href }]
  bradeList: [],
  routePath: null,
  userInfo: null,
  // 验证码
  registerInfo: null,

  // 城市
  cityList: [],

  //  二维码分类
  qrTypes: [],

  // 首页主导航选中
  mainNavIdx: 0,
  // 首页附导航选中
  mainSecNavIdx: 0,
  // 首页接口
  homePayload: {
    ...defaultHomePayload
  },
  codeList: [],

  codeDetail: {}
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

  async onNavClick({ commit, dispatch, state }, { mainNavIdx, mainSecNavIdx }) {
    const newState = {
      codeList: []
    };
    const homePayload = { ...defaultHomePayload };

    // 主导航被点击
    if (typeof mainNavIdx === 'number') {
      newState.mainNavIdx = mainNavIdx;
      newState.mainSecNavIdx = 0;
      if (mainNavIdx !== 0) {
        homePayload.category = state.qrTypes[mainNavIdx - 1].value;
        homePayload.typeId = '';
      }
    }
    // 附导航被点击
    if (typeof mainSecNavIdx === 'number') {
      const _mainNavIdx = state.mainNavIdx;
      newState.mainSecNavIdx = mainSecNavIdx;

      if (_mainNavIdx !== 0) {
        homePayload.typeId = state.qrTypes[_mainNavIdx - 1].children[mainSecNavIdx].value;
      }
    }
    newState.homePayload = homePayload;
    commit('SET_STATE', newState);
    await dispatch('getQrCodes');
  },

  async signIn({ commit, dispatch }, payload) {
    try {
      const userInfo = await API.signIn(payload);
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
  async getUserInfo({ state, dispatch }, { authToken }) {
    if (!state.userInfo) {
      const token = authToken || Cookies.get('WeLink');
      if (token) {
        const userInfo = await API.getUserInfo({ authToken: token });
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

  unAuthUser({ commit }) {
    commit('SET_STATE', { userInfo: null });
    Cookies.set('WeLink', '', { expires: 0 });
  },
  async getCitiesInfo({ state, commit }) {
    if (state.cityList.length) {
      return;
    }
    const citys = await API.GetCitiesInfo();
    const cityList = [];
    citys.forEach(city => {
      const currIndex = cityList.findIndex(p => p.label === city.province);
      if (currIndex < 0) {
        const currCity = {
          value: cityList.length,
          label: city.province,
          children: [
            {
              value: city.name,
              label: city.name
            }
          ]
        };
        cityList.push(currCity);
      } else {
        cityList[currIndex].children.push({
          value: city.name,
          label: city.name
        });
      }
    });
    commit('SET_STATE', { cityList });
  },

  async getQrTypes({ state, commit }) {
    if (state.qrTypes && state.qrTypes.length) {
      return state.qrTypes;
    }
    const res = await API.getQrTypes();
    const resorce = res.data;
    const qrTypes = [];
    resorce.forEach(r => {
      const currIndex = qrTypes.findIndex(q => q.value === r.category);
      if (currIndex < 0) {
        const currType = {
          value: r.category,
          label: r.categoryName,
          children: [
            {
              value: r.id,
              label: r.name
            }
          ]
        };
        qrTypes.push(currType);
      } else {
        qrTypes[currIndex].children.push({
          value: r.id,
          label: r.name
        });
      }
    });
    commit('SET_STATE', { qrTypes });
    return qrTypes;
  },

  async uploadFile(_, payload) {
    const res = await API.uploadFile(payload);
    return res;
  },

  async createQrCode(_, payload) {
    const res = await API.createQrCode(payload);
    const status = res.status || {};
    if (status.status === 0) {
      return res;
    }
    throw new Error(status.message || '接口异常');
  },

  async initQrPage({ state, dispatch }, payload) {
    const { category, typeid } = payload;
    let qrTypes = state.qrTypes.length ? state.qrTypes : await dispatch('getQrTypes');
    if (!qrTypes.length) {
      qrTypes = [];
    }
    let mainNavIdx = 0;
    let mainSecNavIdx = '';
    if (category == '' || category == 'hot' || category === 'new') {
      // 首页的 推荐 最热 最新
      if (category == '') {
        mainSecNavIdx = 0;
      } else if (category == 'hot') {
        mainSecNavIdx = 1;
      } else if (category == 'new') {
        mainSecNavIdx = 2;
      }
    } else {
      // 锁定分类
      qrTypes.forEach((e1, i1) => {
        if (category == e1.value) {
          mainNavIdx = i1 + 1;
          e1.children.forEach((e2, i2) => {
            if (e2.value == Number(typeid)) {
              mainSecNavIdx = i2;
            }
          });
        }
      });
    }

    await dispatch('onNavClick', { mainNavIdx, mainSecNavIdx });
  },

  // 拉取二维码列表
  async getQrCodes({ state, commit }) {
    const { mainNavIdx, mainSecNavIdx, homePayload, codeList } = state;
    const { loading, done, pageSize, currentPage, category, typeId } = homePayload;

    if (loading || done) {
      return;
    }

    const payload = {
      pageSize,
      currentPage
    };
    let api = API.getQrCodes;
    if (mainNavIdx === 0) {
      // 首页列表
      if (mainSecNavIdx === 0) {
        // 推荐
        api = API.getTopQrCodes;
      } else if (mainSecNavIdx === 1) {
        // 最热
        api = API.getHotQrCodes;
      } else {
        // 最新
        api = API.getQrCodes;
      }
    } else {
      payload.category = category;
      payload.typeId = typeId;
    }

    const res = await API.getQrCodes(payload);
    const data = res.data;
    const newCodeList = [...codeList];
    newCodeList.splice(pageSize * currentPage, data.length, ...data);

    const newHomePayload = {
      ...homePayload,
      loading: false,
      done: !res.hasNextPage,
      currentPage: currentPage + 1
    };

    commit('SET_STATE', {
      codeList: newCodeList,
      homePayload: newHomePayload
    });
  },

  // 按分类拉列表
  async getQrCodesByType({ commit, state }) {
    const { mainNavIdx, mainSecNavIdx, homePayload, codeList } = state;
    const { loading, done, pageSize, currentPage, category, typeId } = homePayload;

    if (loading || done) {
      return;
    }
    const payload = {
      pageSize,
      currentPage,
      category,
      typeId
    };
    const res = await API.getQrCodes(payload);
    const data = res.data;
    const newCodeList = [...codeList];
    newCodeList.splice(pageSize * currentPage, data.length, ...data);

    const newHomePayload = {
      ...homePayload,
      loading: false,
      done: !res.hasNextPage,
      currentPage: currentPage + 1
    };

    commit('SET_STATE', {
      codeList: newCodeList,
      homePayload: newHomePayload
    });
  },

  async getQrDetail({ state, commit, dispatch }, payload) {
    try {
      const res = await API.getCodeDetail(payload);
      const status = res.status;
      let qrTypes = state.qrTypes.length ? state.qrTypes : await dispatch('getQrTypes');
      if (!qrTypes.length) {
        qrTypes = [];
      }

      if (status && status.status === 0) {
        commit('SET_STATE', { codeDetail: res });
        const { typeCategory, typeId } = res;

        let mainNavIdx = 0;
        let mainSecNavIdx = '';
        // 锁定分类
        qrTypes.forEach((e1, i1) => {
          if (typeCategory == e1.value) {
            mainNavIdx = i1 + 1;
            e1.children.forEach((e2, i2) => {
              if (e2.value == Number(typeId)) {
                mainSecNavIdx = i2;
              }
            });
          }
        });
        commit('SET_STATE', { mainNavIdx, mainSecNavIdx});
        await dispatch('displayQr', payload);
      }
    } catch (error) {
      console.log('error', error);
    }
  },
  // 二维码被查看
  async displayQr(_, payload) {
    const res = await API.displayCode(payload);
    return res;
  },
  // 二维码点赞
  async priseQr(_, payload) {
    const res = await API.priseQr(payload);
    return res;
  }
};
