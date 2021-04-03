<template>
  <div class="sort-sheet">
    <div class="header">
      <h6 class="title">热门频道</h6>
      <nuxt-link class="nav-all" :to="`/${navs.value}`">全部</nuxt-link>
    </div>
    <div class="sort-wrap">
      <nuxt-link class="sort-item" v-for="nav in navs.children" :key="nav.value" :to="`/${navs.value}/${nav.value}`">
        <span class="sort-item-text">{{ nav.label }}</span>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sort-sheet',

  computed: {
    navs() {
      const mainNavIdx = this.$store.state.global.mainNavIdx;
      if (mainNavIdx > 0) {
        return this.$store.state.global.qrTypes[mainNavIdx - 1];
      }
      return {
        value: '/',
        children: []
      };
    },

    mainSecNavIdx() {
      return this.$store.state.global.mainSecNavIdx;
    }
  }
};
</script>

<style lang="scss" scoped>
.sort-sheet {
  padding: 20px 16px;
  background-color: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .title {
    font-size: 14px;
    line-height: 20px;
    color: #333;
    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 26px;
      position: absolute;
      left: -20px;
      top: 0px;
      background-color: #07c160;
    }
  }
  .nav-all {
    padding-left: 6px;
    font-size: 14px;
    color: #07c160;
  }
  .sort-wrap {
    display: flex;
    flex-wrap: wrap;
    padding-top: 7px;
    font-size: 0px;
    margin: 0 -4px;
  }
  .sort-item {
    display: flex;
    font-size: 12px;
    color: #07c160;
    width: 33.33%;
    margin-top: 8px;
  }
  .sort-item-text {
    display: flex;
    height: 27px;
    line-height: 27px;
    margin: 0 4px;
    justify-content: center;
    align-self: stretch;
    flex-grow: 1;
    cursor: pointer;
    background: #f1f1f1;
  }
}
@media screen and (max-width: 768px) {
  .sort-sheet {
    .title::before {
      display: none;
    }
    .nav-all {
      display: block;
    }
  }
}
</style>