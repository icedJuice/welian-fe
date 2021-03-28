<template>
  <div class="__layout__container" :class="{'_is_web_': !mobileLayout, '_is_mobile_': mobileLayout }">
    <layout-header v-if="isLayoutPanel"></layout-header>
    <nuxt></nuxt>
  </div>
</template>
<script>
import './style.scss';
import layoutHeader from '~/components/layout/header.vue';

export default {
  name: 'company-adress',

  components: {
    layoutHeader,
  },

  // fetch({ store, route: { path } }) {
  //   return new Promise(r => {
  //     Promise.all([
  //       store.dispatch('options/setLayoutPanel', {isLayoutPanel: true}),
  //       store.dispatch('global/getUserInfo'),
  //     ]).then(r).catch(r);
  //   });
  // },

  created() {

  },
  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },
    isLayoutPanel () {
      return this.$store.state.options.isLayoutPanel
    }
  }
};
</script>