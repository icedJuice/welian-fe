<template>
  <div class="detail-page">
    <div class="left-side">
        <h2 class="title">达芬奇绘本第二次阅读会</h2>
        <div class="qrcode-box">
            <img class="qrcode-img" src="~static/images/qrcode.png" alt="">
        </div>
        <div class="infos">
            <div class="info-item">
                <span class="name">所属地区：</span>
                <span class="cont">中国</span>
            </div>
            <div class="info-item">
                <span class="name">发布时间：</span>
                <span class="cont">2021-03-08</span>
            </div>
            <div class="info-item">
                <span class="name">浏览量：</span>
                <span class="cont">27383</span>
            </div>
        </div>

        <div class="code-descs">
            <div class="desc-title"><span>描述信息</span></div>
            <div class="desc-text">
                <p class="text-indent">
                    很久以前，在充满奇幻色彩的龙佑之邦，人类很久以前，在充满奇幻色彩的龙佑之邦，人类很久以前，在充满奇幻色彩的龙佑之邦，人类很久以前，在充满奇幻色彩的龙佑之邦，人类很久以前，在充满奇幻色彩的龙佑之邦，人类
                </p>
            </div>
        </div>
        <div class="tag-wrap">
            <span class="tag-item">奇思妙想</span>
            <span class="tag-item">阅读</span>
            <span class="tag-item">原创</span>
            <span class="tag-item">语言</span>
        </div>

        <i class="hair-line"></i>
        <div class="btn-zan">
            <i class="icon-zan"></i>
            <span>
                7986
            </span>
        </div>
    </div>
    <div class="right-side">
        <ads-swiper ></ads-swiper>
    </div>
  </div>
</template>
<script>

import adsSwiper from '~/components/ads-swiper';

export default {
  name: 'index-detail-id',
  fetch({ store, route }) {
      const id = route.params.id;
      console.log(id);
    return new Promise(r => {
      r();
      // Promise.all([
      //   store.dispatch('options/getTDK', { path, id: 101 }),
      // ]).then(([head]) => {
      //   this.head = head;
      //   r();
      // }).catch(() => {r();});
    });
  },
  components: {
      adsSwiper,
  }
};
</script>

<style lang="scss" scoped>
.detail-page {
    display: flex;
    max-width: 1080px;
    padding: 20px 40px 0;
}
.left-side {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 40px 60px 30px;
}
.title {
    font-size: 22px;
    line-height: 33px;
    color: #07C160;
    font-weight: 500;
}
.qrcode-box {
    width: 200px;
    height: 200px;
    margin-top: 20px;
}
.qrcode-img {
    display: block;
    width: 100%;
    height: 100%;
}
.infos {
    margin-top: 10px;
    font-size: 12px;
    color: #333;
}
.info-item {
    margin-top: 6px;
    &:first-of-type {
        margin-top: 0;
    }
}
.code-descs {
    margin-top: 20px;
    max-width: 306px;
}
.desc-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 68px;
    height: 21px;
    border-radius: 1px;
    border: 1px solid #07C160;
    color: #07C160;
    font-size: 12px;
    font-weight: 500;
    margin: 0 auto;
}
.desc-text {
    margin-top: 10px;
    font-size: 12px;
    line-height: 17px;
    font-weight: 500;
    color: #333;
}
.text-indent {
    text-indent: 2em;
    text-align: justify;
}
.tag-wrap {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 306px;
    padding: 0 16px;
}
.tag-item {
    display: flex;
    padding: 5px 10px;
    background: #F7F8FA;
    border-radius: 2px;
    margin: 0 10px 20px;
    font-size: 10px;
}
.hair-line {
    display: block;
    align-self: stretch;
    height: 1px;
    background-color: #EEEEEE;
}
.btn-zan {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 54px;
    margin-top: 20px;
    background-color: #12D36F;
    background-image: linear-gradient(90deg, #12D36F 0%, #07C160 100%);
    border-radius: 27px;
    color: #fff;
}
.icon-zan {
    display: block;
    width: 20px;
    height: 20px;
    margin-bottom: 3px;
    background-image: url('~assets/icon/icon-zan-blank.png');
    background-size: 100% 100%;
}
.right-side {
    width: 210px;
    flex-shrink: 0;
    margin-left: 20px;
}

@media screen and (max-width: 768px) {
    .detail-page {
        display: flex;
        flex-direction: column-reverse;
        padding: 0;
    }
    .right-side {
        box-sizing: border-box;
        width: 100%;
        margin-left: 0;
        padding: 0 16px;
    }
      .title {
    font-size: 20px;
    line-height: 28px;
    text-align: center;
  }
  .left-side {
    padding: 30px 0 40px;
  }
  .qrcode-box {
      width: 160px;
      height: 160px;
  }
}

</style>