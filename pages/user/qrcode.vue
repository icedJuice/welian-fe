<template>
  <div class="user-sec-page qrcode-page">
    <div class="search-bar">
      <!-- <div class="input-box">
        <input class="input" type="text" v-model="searchValue" />
      </div>
      <div class="btn btn-all" @click="searchAll">
        <span>全部</span>
      </div>
      <div class="btn btn-select" @click="search">
        <span>查询</span>
      </div> -->
    </div>

    <inf-list @loadMore="loadMore" :loading="loading" :done="done">
      <div class="lif-list">
        <user-item-card  v-for="item in userCodeList" :item="item" :key="item.id"></user-item-card>
      </div>
    </inf-list>
  </div>
</template>

<script>
import userItemCard from '~/components/user-card-item';
import infList from '~/components/infList';

export default {
  name: 'user-qrcode',
  data() {
    return {
      searchValue: ''
    };
  },
  components: {
    infList,
    userItemCard,
  },

  fetch({ store, route: { path } }) {
    return new Promise(r => {
      Promise.all([]).then(r).catch(r);
    });
  },
  mounted() {
    if (window) {
      this.$store.dispatch('user/getUserCodes');
    }
  },

  methods: {
    search() {
      this.$store.dispatch('user/search', { value: this.searchValue });
    },

    searchAll() {
      this.$store.dispatch('user/search');
    },

    loadMore() {
      if (this.loading || this.done) {
        return;
      }
      this.$store.dispatch('user/getUserCodes');
    }
  },

  computed: {
    userCodeList() {
      // item.state
      // 0: 未审核
      // 1: 通过
      // 2: 拒绝
      return this.$store.state.user.userCodeList || [];
    },
    loading() {
      return this.$store.state.user.loading;
    },
    done() {
      return this.$store.state.user.done;
    }
  }
};
</script>
<style lang="scss">
.user-sec-page.qrcode-page {
  background-color: #fff;
  color: #333;
  padding: 40px 0;
  .search-bar {
    display: flex;
    margin: 0 60px 0 40px;
  }
  .input-box {
    display: flex;
    flex-grow: 1;
    height: 30px;
    border-radius: 4px 0px 0px 4px;
    border: 1px solid #979797;
  }
  .input {
    flex-grow: 1;
    height: 100%;
    border: none;
    border-radius: 4px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 88px;
    height: 30px;
    cursor: pointer;
    user-select: none;
  }
  .btn-all {
    background: #ffffff;
    border: 1px solid #979797;
    border-left: none;
    border-right: none;
  }
  .btn-select {
    color: #fff;
    height: 30px;
    background: #07c160;
    border: 1px solid #07c160;
    border-left: none;
    border-radius: 0px 4px 4px 0px;
  }

  .lif-list {
    margin-top: 20px;
  }
  .card-item {
    position: relative;
    display: flex;
    padding: 24px 60px 24px 40px;
    border-bottom: 1px solid #eeeeee;
    .qrcode-box {
      width: 115px;
      height: 115px;
      flex-shrink: 0;
      margin-right: 24px;
    }
    .qrcode-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .qrcode-info {
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
    }
    .info-box {
      position: relative;
      align-self: stretch;
      flex-grow: 1;
    }
    .func-box {
      flex-grow: 0;
      flex-shrink: 0;
    }
    .code-title {
      display: flex;
      align-items: center;
      .title {
        max-width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        line-height: 22px;
        font-weight: 500;
      }
      .status {
        display: block;
        font-size: 10px;
        padding: 1px 4px;
        margin-left: 8px;
        text-align: center;
        border-radius: 1px;
        border: 1px solid;
        color: #07c160;
        flex-shrink: 0;
        &.fail {
          color: #d63636;
        }
      }
    }
  }
  .code-view {
    display: flex;
    margin-top: 10px;
    font-size: 10px;
    line-height: 1.2em;
    color: #b1b2b1;
    .view-item {
      display: flex;
      align-items: center;
      min-width: 50px;
      margin-right: 10px;
    }
    .icon {
      display: block;
      width: 12px;
      height: 12px;
      margin-right: 4px;
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .icon-see {
      background-image: url('~assets/icon/icon-see.png');
    }
    .icon-zan {
      background-image: url('~assets/icon/icon-zan.png');
    }
  }
  .code-tag {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    .tag-item {
      display: block;
      padding: 2px 6px;
      font-size: 10px;
      line-height: 1.4em;
      background: #f7f8fa;
      border-radius: 2px;
      margin-right: 8px;
      align-self: flex-start;
    }
  }
  .func-box {
    margin-top: 10px;
    .detail-btn {
      padding: 2px 0;
      font-size: 14px;
      line-height: 20px;
      color: #07c160;
      cursor: pointer;
    }
    .status-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 112px;
      height: 28px;
      color: #fff;
      font-size: 14px;
      background: linear-gradient(90deg, #12d36f 0%, #07c160 100%);
      border-radius: 4px;
      &.disable {
        opacity: 0.4;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .user-sec-page.qrcode-page {
    .search-bar {
      margin-right: 40px;
    }
    .card-item {
      padding: 24px 40px 24px;
    }
  }
}

@media screen and (max-width: 875px) {
  .user-sec-page.qrcode-page {
    .search-bar {
      margin: 0 16px;
    }
    .card-item {
      padding: 24px 16px 24px;
      .qrcode-box {
        width: 104px;
        height: 104px;
        margin-right: 10px;
      }
      .status-btn {
        width: 90px;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .user-sec-page.qrcode-page {
    background-color: unset;
    padding: 0 16px;
    .search-bar {
      margin: 20px 0 16px;
    }
    .btn {
      width: 60px;
    }
    .card-item {
      .info-box {
        position: unset;
      }
      padding: 42px 10px 10px;
      background-color: #fff;
      border-radius: 12px;
      border-bottom: none;
      margin-bottom: 10px;
      .qrcode-box {
        width: 104px;
        height: 104px;
      }

      .status-btn {
        width: 90px;
      }
      .code-title {
        justify-content: space-between;
        position: absolute;
        left: 0;
        width: 100%;
        top: 10px;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .code-tag {
        min-height: 36px;
      }
      .func-box {
        position: relative;
      }
    }
  }
}
</style>