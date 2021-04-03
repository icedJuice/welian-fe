<template>
  <div class="detail-outer">
    <div class="bread-container">
      <bread-crumb></bread-crumb>
    </div>

    <div class="detail-page">
      <div class="left-side">
        <h2 class="title">{{ codeDetail.title }}</h2>
        <div class="qrcode-box">
          <img class="qrcode-img" :src="codeDetail.qrImageUrl" alt="" />
        </div>
        <div class="infos">
          <div class="info-item">
            <span class="name">所属地区：</span>
            <span class="cont">{{ codeDetail.province }}{{ codeDetail.city }}</span>
          </div>
          <div class="info-item">
            <span class="name">发布时间：</span>
            <span class="cont">{{ dayjs(codeDetail.updatedAt).format('YYYY-MM-DD') }}</span>
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
              {{ codeDetail.description }}
            </p>
          </div>
        </div>
        <div class="tag-wrap">
          <span
            class="tag-item"
            v-for="label in (codeDetail.labels && codeDetail.labels.split(/\s+/)) || []"
            :key="label"
            >{{ label }}</span
          >
        </div>

        <i class="hair-line"></i>
        <div class="btn-zan" @click="onZanClick">
          <i class="icon-zan"></i>
          <span> {{ codeDetail.prizes + zan }} </span>
        </div>
      </div>
      <div class="right-side">
        <ads-swiper></ads-swiper>
      </div>
    </div>
  </div>
</template>
<script>
import adsSwiper from '~/components/ads-swiper';
import dayjs from 'dayjs';
import breadCrumb from '~/components/bread-crumb';

export default {
  name: 'index-detail-id',

  data() {
    return {
      zan: 0,
      zaned: false,
      dayjs
    };
  },

  fetch({ store, route }) {
    const id = route.params.id;
    return new Promise(r => {
      Promise.all([store.dispatch('global/getQrDetail', { id })])
        .then(r)
        .catch(r);
    });
  },
  components: {
    adsSwiper,
    breadCrumb
  },

  methods: {
    onZanClick() {
      if (this.zaned) {
        this.zan = Number(!this.zan);
        return;
      }
      this.zaned = true;
      const id = this.$route.params.id;
      this.$store
        .dispatch('global/priseQr', { id })
        .then(() => {
          this.zan = 1;
        })
        .catch(error => {
          console.warn(error.message);
          this.zan = 1;
        });
    }
  },
  computed: {
    codeDetail() {
      return this.$store.state.global.codeDetail || {};
    }
  }
};
</script>

<style lang="scss" scoped>

.detail-outer {
  max-width: 1080px;
  
}
.detail-page {
  display: flex;
  padding: 20px 40px 0;
}
.bread-container {
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
  color: #07c160;
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
  border: 1px solid #07c160;
  color: #07c160;
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
  min-width: 40%;
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
  background: #f7f8fa;
  border-radius: 2px;
  margin: 0 10px 20px;
  font-size: 10px;
}
.hair-line {
  display: block;
  align-self: stretch;
  height: 1px;
  background-color: #eeeeee;
}
.btn-zan {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 54px;
  margin-top: 20px;
  background-color: #12d36f;
  background-image: linear-gradient(90deg, #12d36f 0%, #07c160 100%);
  border-radius: 27px;
  color: #fff;
  cursor: pointer;
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
  .bread-container {
    display: none;
  }
}
</style>