<template>
  <div class="navs">
    <div class="nav-wraps fir-nav">
      <div class="nav-inner">
        <div class="nav-list">
          <div class="nav-slider">
            <div
              class="nav-item"
              v-for="(nav, index) in navs.navList"
              :key="index"
              :class="{ active: nav.type === actNav.type }"
              @click="
                () => {
                  onNavClick(nav);
                }
              "
            >
              <span>{{ nav.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-wraps sec-nav" :class="{show: actNav.hasSec}">
      <div class="nav-inner">
        <div class="nav-list">
          <div class="nav-slider">
            <div
              class="nav-item"
              v-for="(nav, index) in navs.secNavList"
              :key="index"
              :class="{ active: nav.type === secActNav.type }"
              @click="
                () => {
                  onSecNavClick(nav);
                }
              "
            >
              <span>{{ nav.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navs from './navs';

export default {
  name: 'main-nav',

  data() {
    return {
      navs,
      actNav: navs.navList[0],
      secActNav: navs.secNavList[0]
    };
  },

  mounted() {
    if (window) {
          window.window.addEventListener('pushState', function(e) {
            console.log('change pushState');
          });
    }
  },

  methods: {
    onNavClick(nav) {
      this.actNav = nav;
    },
    onSecNavClick(nav) {
      this.secActNav = nav;
    }
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
