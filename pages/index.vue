<template>
  <div class="main-page">
    <main-nav @navClick="onNavClick"></main-nav>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import mainNav from '~/components/main-nav';

export default {
  name: 'index-page',

  scrollToTop: true,

  head: {
    title: 'WELINK'
  },

  data() {
    return {
    };
  },

  mounted() {
    if (window) {
      // window.addEventListener('hashchange', handleHashBack);
    }
  },

  methods: {
    onNavClick({ nav, secNav }) {
      // console.log({ nav, secNav });
    }
  },

  computed: {
    lawyerData() {
      return this.$store.state.global.mainLawyerData;
    },
    mobileLayout() {
      return this.$store.state.options.mobileLayout;
    }
  },

  components: {
    mainNav,
  }
};
</script>

<style lang="scss" scoped>
.main-page {
  background: #f4f4f4;
}

</style>
