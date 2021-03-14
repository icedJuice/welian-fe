<template>
  <section class="error-page">
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      返回首页
    </nuxt-link>
  </section>
</template>
<script>
import './style.scss';
export default {
  props: ['error'],

  transition: 'fade',

  mounted () {
    if (this.error.statusCode === 404) {
      this.$router.replace('/');
    } else {
      this.$store.commit('options/SET_ERROR_PAGE', true)
    }
  },

  beforeDestroy () {
    this.$store.commit('options/SET_ERROR_PAGE', false)
  }
}
</script>