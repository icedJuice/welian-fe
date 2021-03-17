<template>
  <div class="user-sec-page qrcode-page">
    <div class="search-bar">
      <div class="input-box">
        <input class="input" type="text" />
      </div>
      <div class="btn btn-all">
        <span>全部</span>
      </div>
      <div class="btn btn-select">
        <span>查询</span>
      </div>
    </div>

    <div class="lif-list">
      <div class="card-item">
        <div class="qrcode-box">
          <img class="qrcode-img" src="~static/images/qrcode.png" alt="" />
        </div>
        <div class="qrcode-info">
          <div class="info-box">
            <div class="code-title">
              <h2 class="title">微信视频号：达芬奇百科备份</h2>
              <span class="status">审核通过</span>
            </div>
            <div class="code-view">
              <div class="view-item">
                <i class="icon icon-see"></i>
                <span>2379</span>
              </div>
              <div class="view-item">
                <i class="icon icon-zan"></i>
                <span>786</span>
              </div>
              <div class="view-item">
                <span>编号10001</span>
              </div>
            </div>
            <div class="code-tag">
              <span class="tag-item">原创</span>
              <span class="tag-item">特别</span>
              <span class="tag-item">开心</span>
            </div>
          </div>
          <div class="func-box">
            <div class="func-btn">上架</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-qrcode'
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
  }
  .btn-all {
    background: #ffffff;
    border: 1px solid #979797;
    border-left: none;
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
  }
  .card-item {
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
    .info-box,
    .func-box {
      align-self: stretch;
    }
    .info-box {
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
        border: 1px solid #07c160;
        color: #07c160;
      }
    }
  }
}
</style>