<template>
  <div class="navs">
    <div class="nav-wraps fir-nav">
      <div class="nav-inner">
        <div class="nav-list">
          <div class="nav-slider">
            <nuxt-link
              class="nav-item"
              v-for="(nav, index) in navs"
              :key="nav.value"
              :class="{ active: index === mainNavIdx }"
              :to="`/${nav.value}`"
            >
              <span>{{ nav.label }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-wraps sec-nav" :class="{show: mainNavIdx === 0}">
      <div class="nav-inner">
        <div class="nav-list">
          <div class="nav-slider">
            <div
              class="nav-item"
              v-for="(nav, index) in navs[0].children"
              :key="index"
              :class="{ active: index === mainSecNavIdx }"
              @click="() => onSecNavClick(nav, index)"
            >
              <span>{{ nav.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const mainTypes = {
  label: '首页',
  value: '',
  hasSec: true,
  children: [
    {
      value: '',
      label: '推荐',
      href: '/',
    },
    {
      value: 'hot',
      label: '最热',
    },
    {
      value: 'new',
      label: '最新',
    }
  ]

};

export default {
  name: 'main-nav',

  data() {
    return {
    };
  },

  mounted() {
    if (window) {
          // window.window.addEventListener('pushState', function(e) {
          //   console.log('change pushState');
          // });
    }
  },

  methods: {
    onNavClick(nav, index) {
      this.$store.dispatch('global/onNavClick', { mainNavIdx: index });
      const path = this.$route.path;
      if (path != '/') {
        this.$router.push('/');
      }
    },
    onSecNavClick(nav, index) {
      this.$store.dispatch('global/onNavClick', { mainSecNavIdx: index });
      const path = this.$route.path;
      if (path != '/') {
        this.$router.push('/');
      }
    }
  },

  computed: {
    navs() {
      const qrList = this.$store.state.global.qrTypes || [];
      const navList = [mainTypes, ...qrList];
      return navList;
    },
    mainNavIdx() {
      return this.$store.state.global.mainNavIdx;
    },
    mainSecNavIdx() {
      return this.$store.state.global.mainSecNavIdx;
    },
  }
};
</script>

<style lang="scss" scoped>
.navs {
  position: relative;
  z-index: 99;
}
.nav-wraps {
  height: 31px;
  color: #fff;
  .nav-inner {
    position: fixed;
    left: 0;
    height: 30px;
    width: 100%;
    border-top: 1px solid #13a85a;
    background: linear-gradient(180deg, #12d36f 0%, #07c160 100%);
  }
  .nav-list {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 40px;
    margin: 0 auto;
    overflow: hidden;
    max-width: 1080px;
  }
  .nav-slider {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .nav-item {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    flex-shrink: 0;
    padding: 0 10px;
    margin-right: 10px;
    cursor: pointer;
    transition: all .2s;
  }

  &.sec-nav {
      display: none;
      &.show {
          display: flex;
      }
    .nav-inner {
      border-top: none;
      background-image: none;
      background-color: #fff;
      color: #333;
    }
    .nav-list {
        justify-content: center;
    }
    .nav-slider {
      justify-content: center;
    }
    .nav-item {
      padding: 0 10px;
      margin: 0 10px;
      &.active,
      &:hover {
          color: #07C160;
      }
    }
  }

  &.fir-nav {
    .nav-item {
      &.active,
      &:hover {
        background: #169452;
      }
    }
  }
}

@media screen and (max-width: 768px) {
    .nav-wraps{
      .nav-list {
        padding: 0 16px;
      }
      &.sec-nav {
        .nav-list {
          margin-left: -10px;
          justify-content: flex-start;
        }
        .nav-item {

        }
      }
    }
}
</style>
