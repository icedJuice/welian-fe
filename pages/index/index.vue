<template>
  <div class="main-page-container">
    <div class="page-body" v-if="isHor">
      <div class="lif-list">
        <card-item
          :isHor="true"
          v-for="(item, index) in codeList"
          :key="(item && item.id) || index"
          :item="item"
        ></card-item>
      </div>
      <div class="page-body-right-side">
        <sort-sheet></sort-sheet>
      </div>
    </div>
    <div class="lif-list" v-else>
      <card-item
        :isHor="false"
        v-for="(item, index) in codeList"
        :key="(item && item.id) || index"
        :item="item"
      ></card-item>
    </div>
  </div>
</template>

<script>
import cardItem from '~/components/card-item';
import sortSheet from '~/components/sort-sheet';

export default {
  name: 'index-index',
  data() {
    return {};
  },

  components: {
    cardItem,
    sortSheet
  },
  computed: {
    isHor() {
      return this.$store.state.global.mainNavIdx !== 0;
    },
    codeList() {
      return this.$store.state.global.codeList.filter(e => e) || [];
    }
  }
};
</script>

<style lang="scss" scoped>
.main-page-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;
}
.lif-list {
  position: relative;
  flex-grow: 1;
  font-size: 0px;
  margin-bottom: 40px;
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
    padding: 0 6px;
  }
  .page-body {
    padding-right: 0;
  }
  .page-body-right-side {
    display: none;
  }
}
</style>