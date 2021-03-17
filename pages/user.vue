<template>
  <div class="user-page">
    <div class="left-side">
      <div class="user-nav">
        <h1 class="page-title">个人中心</h1>
        <div class="nav-wrap">
          <nuxt-link
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            class="nav-item"
            :class="{ active: route.path === currentRoute.path }"
          >
            {{ route.name }}
          </nuxt-link>
        </div>
      </div>

      <div class="ads-wrap">
        <ads-swiper></ads-swiper>
      </div>
    </div>
    <div class="right-side">
      <h1 class="page-title">{{ currentRoute.name || '个人中心' }}</h1>
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
import adsSwiper from '~/components/ads-swiper';

const routes = [
  {
    name: '个人资料',
    path: '/user'
  },
  {
    name: '发布二维码',
    path: '/user/publish'
  },
  {
    name: '二维码列表',
    path: '/user/qrcode'
  },
  {
    name: '审核推荐',
    path: '/user/adds'
  }
];

export default {
  name: 'user-page',

  data() {
    return {
      routes,
      currentRoute: ''
    };
  },

  fetch({ state, route: { path } }) {
    return new Promise(r => {
      r();
      // Promise.all([
      //   store.dispatch('options/getTDK', { path, id: 101 }),
      // ]).then(([head]) => {
      //   this.head = head;
      //   r();
      // }).catch(() => {r();});
    });
  },

  mounted() {
    if (window) {
      const pathname = window.location.pathname;
      this.setCurrentPath(pathname);
    }
  },

  watch: {
    $route(route) {
      this.currentRoute = route;
      this.setCurrentPath(route.path);
    }
  },

  methods: {
    setCurrentPath(path) {
      const route = this.routes.find(route => route.path == path);
      this.currentRoute = route || {name: '个人中心'};
    }
  },

  components: {
    adsSwiper
  }
};
</script>
<style lang="scss" scoped>
.user-page {
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 40px;
  padding-top: 40px;
  min-height: 100hv;
}
.left-side {
  width: 210px;
  flex-shrink: 0;
  margin-right: 20px;
}
.user-nav {
  color: #333;
  background-color: #fff;
  padding-bottom: 60px;
  margin-bottom: 20px;
}
.page-title {
  padding: 20px 30px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #eeeeee;
}
.nav-item {
  display: block;
  padding: 14px 30px;
  font-size: 12px;
  line-height: 17px;
  background-color: #fff;
  transition: all 0.2s ease;
  &:hover,
  &.active {
    background: #07c160;
    color: #fff;
  }
}
.right-side {
  flex-shrink: 1;
  flex-grow: 1;
  background-color: #fff;
}
.page-title {
  color: #333;
  font-size: 16px;
  line-height: 22px;
  padding: 20px 20px 20px 43px;
  border-bottom: 1px solid #eeeeee;
}
</style>