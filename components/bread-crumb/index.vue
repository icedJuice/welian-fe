<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(bread, i) in breadList" :key="i + bread.value" :to="{ path: bread.value }">{{
      bread.label
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'bread-crumb',

  computed: {
    breadList() {
      const mainNavIdx = this.$store.state.global.mainNavIdx;
      const mainSecNavIdx = this.$store.state.global.mainSecNavIdx;
      const qrTypes = this.$store.state.global.qrTypes;
      const { path, params } = this.$route;
      if (mainNavIdx < 1) {
          return [];
      }
      const first = qrTypes[mainNavIdx - 1];
      const second = first.children[mainSecNavIdx];
      const { category, typeid } = params;

      const mainNav = {
        value: '/',
        label: '首页'
      };

      const firstNav = {
        value: `/${first.value}`,
        label: first.label
      };
      const secondNav = {
        value: `${firstNav.value}/${second.value}`,
        label: second.label
      };
      const mainAll = {
        value: firstNav.value,
        label: '所有'
      };

      const navList = [mainNav, firstNav];

      if (/\/detail/i.test(path)) {
        // 详情页
        return [
          ...navList,
          secondNav,
          {
            value: '',
            label: '二维码'
          }
        ];
      } else {
        // 列表页
        return [...navList, typeid ? secondNav : mainAll];
      }
    }
  }
};
</script>
<style lang="scss">
.el-breadcrumb {
  .el-breadcrumb__separator {
    display: inline-block;
    width: 14px;
  }
}
</style>