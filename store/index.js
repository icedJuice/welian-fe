/* eslint-disable require-await */
export const actions = {
  nuxtServerInit(store, { req, route }) {
    const isServer = process && process.server;
    // 设备检查类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent;
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/gi.test(userAgent);
    store.commit('options/SET_MOBILE_LAYOUT', isMobile);
    store.commit('options/SET_USER_AGENT', userAgent);

    const initAppData = [
      // 网站信息
      store.dispatch('global/setNavActive', { path: route.path })
    ];
    return Promise.all(initAppData);
  }
};
