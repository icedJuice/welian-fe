<template>
  <div class="layout-header-container">
    <div class="header-wrap">
      <div class="header-inner">
        <div class="left-side" :class="{graw: !searchBar}">
          <nuxt-link to="/">
            <img class="logo" v-if="searchBar" src="~/static/images/logo-blank.png" alt="" />
            <i class="logo-icon" v-else></i>
          </nuxt-link>
          
          <div class="search-wrap" v-if="searchBar">
            <div class="input-box">
              <input class="input-search" placeholder="中国人大14次大会" type="text" />
            </div>
            <div class="search-btn">
              <img class="icon-search" src="~/assets/icon/icon-search.png" alt="" />
              <span>搜索</span>
            </div>
          </div>
        </div>
        <div class="title-text" v-if="!searchBar">
          {{title}}
        </div>

        <div class="auth-wrap">
          <div class="user-info" v-if="userInfo">
            <nuxt-link @click="() => jump('/user')" class="user-name" to="/user">{{ userInfo.nickName }}</nuxt-link>
            <i class="line"></i>
            <span class="exit" @click="unAuthUser" >退出</span>
          </div>

          <div class="login-info" v-else>
            <nuxt-link class="login" :to="`/session?refer=${pathname}`">登陆</nuxt-link>
            <i class="line"></i>
            <nuxt-link class="sign" :to="`/session?refer=${pathname}`">注册</nuxt-link>
          </div>
        </div>
        <div class="nav-wrap" :class="{ open: open }">
          <i class="mask"></i>
          <div class="btn" @click="toggleNav"></div>
          <div class="nav-list">
            <i class="nav-mask" @click="toggleNav"></i>
            <div class="nav-list-inner">
              <nuxt-link to="/" class="nav-item">
                <i class="icon icon-back-home"></i>
                <span>首页</span>
              </nuxt-link>
              <nuxt-link to="/session" class="nav-item" v-if="!userInfo">
                <i class="icon icon-login"></i>
                <span>登陆注册</span>
              </nuxt-link>
              <nuxt-link to="/user" class="nav-item" v-else>
                <i class="icon icon-back-home"></i>
                <span>个人中心</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-header',

  data() {
    return {
      open: false,
      pathname: '',
      title: ''
    };
  },

  mounted() {
    if (window) {
      this.pathname = this.$route.path;
      window.addEventListener('resize', this.listenWidth);
      this.listenRoute(this.pathname);
    }
  },

  watch: {
    $route(route) {
      this.open = false;
      this.currentRoute = route;
      this.listenRoute(route.path);
    }
  },

  methods: {

    listenRoute(_path) {
      const path = _path || this.$route.path;
      if (/^\/user/.test(path)) {
        this.title = '个人中心';
      } else if(/^\/detail/.test(path)) {
        this.title = '二维码';
      } else if (/^\/session/.test(path)) {
        this.title = '登陆注册';
      } else {
        this.title = '';
      }
      const showSearch = !/^\/(user|detail|session)/.test(path);
      this.$store.dispatch('options/setSearchBar', showSearch);
    },

    listenWidth() {
      if (document.documentElement.clientWidth > 640 && this.open) {
        this.open = false;
        document.body.classList.remove('disable-scroll');
      }
    },
    toggleNav(event) {
      event.stopPropagation();
      event.preventDefault();
      if (this.open) {
        document.body.classList.remove('disable-scroll');
      } else {
        document.body.classList.add('disable-scroll');
      }
      this.open = !this.open;
    },

    closeNav() {
      this.navOpen = false;
    },

    unAuthUser() {
      this.$store.dispatch('global/unAuthUser');
      this.$router.replace(`/session?refer=${encodeURI(this.$route.path)}`);
    },
    jump(path) {
      this.$router.push(path);
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.global.userInfo;
    },
    searchBar() {
      return this.$store.state.options.searchBar;
    }
  }
};
</script>

<style lang="scss">
.layout-header-container {
  position: relative;
  z-index: 999;
  width: 100%;
  --height: 70px;
  --padding: 40px;
  height: var(--height);

  .header-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: var(--height);
    background: linear-gradient(180deg, #12d36f 0%, #07c160 100%);
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 var(--padding);
  }
  .left-side {
    display: flex;
    align-items: center;
    flex-grow: 1;
    &.graw {
      flex-grow: 0;
    }
  }
  .logo {
    display: block;
    height: 18px;
    width: auto;
  }
  .title-text {
    font-size: 16px;
    color: #fff;
    font-weight: 500;
  }
  .logo-icon {
    display: block;
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('~assets/icon/icon-main-blank.png');
  }
  .search-wrap {
    display: flex;
    margin-left: var(--padding);
    height: 28px;
    width: 40%;
    max-width: 368px;
    .input-box {
      flex-grow: 1;
      display: flex;
      background-color: #fff;
      padding: 0 10px;
      border-radius: 4px 0px 0px 4px;
    }
    .input-search {
      flex-grow: 1;
      font-size: 12px;
      flex-grow: 1;
      color: #bbbbbb;
    }
    .search-btn {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 68px;
      height: 28px;
      background: #169452;
      border-radius: 0px 4px 4px 0px;
      font-size: 14px;
      color: #fff;
    }
    .icon-search {
      display: block;
      width: 14px;
      height: 14px;
      margin-right: 4px;
    }
  }

  .auth-wrap {
    color: #fff;
    flex-shrink: 0;
    flex-grow: 0;
    .line {
      width: 2px;
      height: 12px;
      background-color: #fff;
    }
    .user-name {
      flex-grow: 0;
      max-width: 120px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    a {
      display: inline-block;
      padding: 0 10px;
    }
    .exit {
      padding-left: 10px;
      cursor: pointer;
    }
    .sign {
      padding-right: 0;
    }
  }
  .login-info,
  .user-info {
    display: flex;
    align-items: center;
  }

  .nav-wrap {
    display: none;
    // user-select: none;
    .mask {
      display: none;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .btn {
      position: relative;
      width: 22px;
      height: 22px;
      background-size: 20px 18px;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url('~assets/icon/icon-sheet.png');
    }

    .nav-list {
      display: none;
      position: absolute;
      width: 100%;
      height: calc(100vh - var(--height));
      left: 0;
      top: var(--height);
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .nav-mask {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .nav-list-inner {
      position: relative;
      padding: 10px 24px;
      background-color: #fff;
    }

    &.open {
      .btn {
        background-image: url('~assets/icon/icon-close.png');
      }
      .nav-list {
        display: block;
      }
      .mask {
        display: block;
      }
    }

    .nav-item {
      padding: 10px 0;
      font-size: 12px;
      font-weight: 500;
      color: #333;
      display: flex;
      align-items: center;
    }
    .icon {
      display: block;
      width: 16px;
      height: 16px;
      margin-right: 10px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .icon-back-home {
      background-image: url('~assets/icon/icon-main.png');
    }
    .icon-login {
      background-image: url('~assets/icon/icon-main.png');
    }
  }
}
@media screen and (max-width: 768px) {
  .layout-header-container {
    --height: 60px;
    --padding: 16px;
    .title-text {
      display: block;
    }
  }
}

@media screen and (max-width: 640px) {
  .layout-header-container {
    --height: 60px;
    --padding: 16px;
    .left-side {
      justify-content: space-between;
      padding-right: 20px;
    }

    .search-wrap {
      width: unset;
      .input-box {
        display: none;
      }
      .search-btn {
        display: flex;
        padding: 0 6px;
        justify-content: space-between;
        width: 58px;
        height: 24px;
        border-radius: 12px;
        border: 1px solid rgba(#fff, 0.6);
        background-color: transparent;
        font-size: 14px;
      }
    }
    .auth-wrap {
      display: none;
    }
    .nav-wrap {
      display: block;
    }
  }
}
</style>
