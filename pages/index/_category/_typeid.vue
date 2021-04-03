<template>
  <div class="main-page-container">
    <div class="bread-container">
      <bread-crumb></bread-crumb>
    </div>
    <div class="page-body">
      <inf-list @loadMore="loadMore" :loading="homePayload.loading" :done="homePayload.done">
        <div class="lif-list">
          <div class="card-outer" v-for="(item, index) in codeList" :key="(item && item.id) || index">
            <div class="line-nav" v-if="item && item.isNav">
              <sort-sheet></sort-sheet>
            </div>
            <card-item v-if="item && item.id" :item="item" :isHor="true"></card-item>
          </div>
        </div>
      </inf-list>
      <div class="page-body-right-side">
        <sort-sheet></sort-sheet>
      </div>
    </div>
  </div>
</template>

<script>
import cardItem from '~/components/card-item';
import sortSheet from '~/components/sort-sheet';
import breadCrumb from '~/components/bread-crumb';
import infList from '~/components/infList';

export default {
  name: 'index-category-typeid',
  data() {
    return {};
  },

  fetch({ store, route: { path, params } }) {
    return new Promise(r => {
      Promise.all([
        store.dispatch('options/setLayoutPanel', { isLayoutPanel: true }),
        store.dispatch('global/initQrPage', params)
      ])
        .then(r)
        .catch(r);
    });
  },

  components: {
    cardItem,
    sortSheet,
    breadCrumb,
    infList
  },
  methods: {
    loadMore() {
      if (this.homePayload.loading || this.homePayload.done) {
        return;
      }
      this.$store.dispatch('global/getQrCodes');
    }
  },
  computed: {
    isHor() {
      return true;
    },
    codeList() {
      return this.$store.state.global.codeList.filter(e => e) || [];
    },
    homePayload() {
      return this.$store.state.global.homePayload;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-page-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 30px 40px;
}
.bread-container {
  max-width: 1080px;
  padding: 0 10px 20px;
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
.card-outer {
  margin-bottom: 20px;
}
.page-body-right-side {
  position: absolute;
  right: 0;
  top: 0;
  width: 276px;
  margin-left: 20px;
  background-color: #fff;
}
.line-nav {
  display: none;
}

@media screen and (max-width: 768px) {
  .main-page-container {
    padding: 20px 6px 40px;
  }
  .page-body {
    padding-right: 0;
    display: flex;
    flex-direction: column-reverse;
  }
  .page-body-right-side {
    position: relative;
    margin-left: 0;
    width: unset;
    margin-bottom: 20px;
      border-radius: 12px;
    display: none;
    .sort-sheet {
      border-radius: 12px;
    }
  }
  .line-nav {
    display: block;
  }
  .card-outer {
    margin-bottom: 10px;
    .sort-sheet {
      border-radius: 12px;
    }
  }
  .bread-container {
    display: none;
  }
}
</style>