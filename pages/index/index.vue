<template>
  <div class="main-page-container">
    <inf-list @loadMore="loadMore" :loading="homePayload.loading" :done="homePayload.done">
    <div class="lif-list">
        <card-item
          :isHor="false"
          v-for="(item, index) in codeList"
          :key="(item && item.id) || index"
          :item="item"
        ></card-item>
      </div>
    </inf-list>
  </div>
</template>

<script>
import cardItem from '~/components/card-item';
import infList from '~/components/infList';

export default {
  name: 'index-index',
  data() {
    return {};
  },

  fetch({ store, route: { path, params } }) {
    return new Promise(r => {
      Promise.all([
        store.dispatch('options/setLayoutPanel', {isLayoutPanel: true}),
        store.dispatch('global/initQrPage', params),
      ]).then(r).catch(r);
    });
  },

  components: {
    cardItem,
    infList,
  },
  methods: {
    loadMore() {
      if (this.homePayload.loading || this.homePayload.done) {
        return;
      }
      this.$store.dispatch('global/getQrCodes');
    },
  },
  computed: {
    isHor() {
      return this.$store.state.global.mainNavIdx !== 0;
    },
    codeList() {
      return this.$store.state.global.codeList.filter(e => e) || [];
    },
    homePayload() {
      return this.$store.state.global.homePayload;
    },
  }
};
</script>

<style lang="scss" scoped>
.main-page-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 30px 40px;
}
.lif-list {
  position: relative;
  flex-grow: 1;
  font-size: 0px;
  padding-bottom: 20px;
}
.page-body {
  position: relative;
  max-width: 784px;
  padding-right: 296px;
  margin: 0 10px;
}
.page-body-right-side {
  position: absolute;
  right: 0;
  top: 0;
  width: 276px;
  margin-left: 20px;
  background-color: #fff;
}

@media screen and (max-width: 768px) {
  .main-page-container {
    padding: 20px 6px 40px;
  }
  .page-body {
    padding-right: 0;
  }
  .page-body-right-side {
    display: none;
  }
}
</style>