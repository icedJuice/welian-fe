<template>
  <div class="card-item" :class="{ 'card-item-hor': isHor, 'card-item-col': !isHor }">
    <nuxt-link :to="`/detail/${item.id}`" class="card-hor-box" v-if="isHor">
      <div class="qrcode-box">
        <img class="qrcode-img" :src="item.qrImageUrl" alt="" />
      </div>
      <div class="info">
        <h3 class="code-name">{{item.title}}</h3>
        <div class="act-sheet">
          <div class="see">
            <i class="icon-see"></i>
            <span class="num">1679</span>
          </div>
          <div class="zan">
            <i class="icon-zan"></i>
            <span class="num">8901</span>
          </div>
        </div>
        <p class="code-desc">
          {{item.description}}
        </p>
        <div class="tag-wrap">
          <span class="tag" v-for="label in (item.labels && item.labels.split(/\s+/) || [])" :key="label">{{label}}</span>
        </div>
      </div>
    </nuxt-link>
    <nuxt-link  :to="`/detail/${item.id}`" class="card-col-box" v-else>
      <div class="card-img">
        <img class="col-qrcode" :src="item.qrImageUrl" />
      </div>
      <h6 class="col-name">{{item.title}}</h6>
      <div class="zan-slot">
        <div class="see">
          <i class="icon-see"></i>
          <span class="num">4987</span>
        </div>
        <div class="zan">
          <i class="icon-zan zaned"></i>
          <span class="num">862</span>
        </div>
      </div>
      <div class="tag" :class="item.typeCategory">
        <span>{{item.typeCategoryName}}</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>

export default {
  name: 'card-item',
  props: ['isHor', 'item'],
  data() {
    return {
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.card-item-col {
  display: inline-block;
  max-width: 200px;
  width: 16.66%;
  box-sizing: border-box;
  padding: 20px 10px 0;
  .card-col-box {
    display: block;
    position: relative;
    padding: 10px 10px 15px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
  }
  .card-img {
    display: block;
    position: relative;
    background-color: #eee;
    &::before {
      content: '';
      display: block;
      position: relative;
      height: 0;
      padding-top: 100%;
    }
    .col-qrcode {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .col-name {
    max-width: 100%;
    font-size: 12px;
    margin-top: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    color: #333333;
  }
  .zan-slot {
    color: #b1b2b1;
    display: flex;
    margin-top: 2px;
    font-size: 10px;
    .zan,
    .see {
      display: flex;
      align-items: center;
      padding: 5px 0;
    }
    .zan {
      margin-right: 10px;
    }
    .num {
      display: inline-block;
      min-width: 32px;
      line-height: 1.2em;
    }
    .icon-see,
    .icon-zan {
      display: block;
      width: 12px;
      height: 12px;
      margin-right: 4px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .icon-see {
      background-image: url('~assets/icon/icon-see.png');
    }
    .icon-zan {
      background-image: url('~assets/icon/icon-zan.png');
      &.zaned {
        background-image: url('~assets/icon/icon-zan-act.png');
      }
    }
  }
  .tag {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 42px;
    height: 22px;
    padding: 0 5px;
    font-size: 10px;
    border-radius: 8px 0 8px 0;
    color: #fff;
    background-color: #12d36f;
    &.GongZhongHao {
      background-color: #2781D7;
    }
    &.ShiPinHao {
      background-color: #FA9D3B;

    }
  }
}

.card-item-hor {
  .card-hor-box {
    display: flex;
    margin-top: 20px;
    padding: 20px 30px;
    background-color: #fff;
  }
  .qrcode-box {
    display: block;
    position: relative;
    width: 140px;
    height: 140px;
    flex-shrink: 0;
    .qrcode-img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .info {
    margin-left: 16px;
    max-width: calc(100% - 140px);
    .code-name {
      font-size: 20px;
      color: #07c160;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 500;
    }
    .act-sheet {
      margin-top: 5px;
      font-size: 10px;
      color: #b1b2b1;
      display: flex;
    }
    .see,
    .zan {
      display: flex;
      align-items: center;
      margin-right: 10px;
      min-width: 30px;
      padding: 5px 0;
    }
    .icon-see,
    .icon-zan {
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
      &.zaned {
        background-image: url('~assets/icon/icon-zan-act.png');
      }
    }
    .code-desc {
      display: block;
      font-size: 14px;
      line-height: 20px;
      margin-top: 10px;
      color: #333333;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .tag-wrap {
      margin-top: 18px;
      font-size: 0px;
    }
    .tag {
      display: inline-block;
      height: 18px;
      font-size: 10px;
      padding: 0 6px;
      margin-right: 8px;
      background: #f7f8fa;
      border-radius: 2px;
      color: #333;
    }
  }
}

@media screen and (max-width: 1024px) {
  .card-item-col {
    width: 20%;
  }
}
@media screen and (max-width: 875px) {
  .card-item-col {
    width: 25%;
  }
  .card-item-hor {
    .qrcode-box {
      width: 126px;
      height: 126px;
    }
    .info {
        max-width: calc(100% - 126px);
        .code-name{
            font-size: 18px;
        }
        .code-desc {
            margin-top: 6px;
            font-size: 12px;
            line-height: 17px;
            max-height: 34px;
            overflow: hidden;
            text-overflow: unset;
            white-space: unset;
            text-align: justify;
        }
        .tag-wrap {
            margin-top: 10px;
        }
    }
  }
}
@media screen and (max-width: 768px) {
  .card-item-hor {
    .card-hor-box {
      border-radius: 12px;
    }
  }
}
@media screen and (max-width: 692px) {
  .card-item-col {
    width: 33.33%;
  }
}

@media screen and (max-width: 640px) {
  .card-item-hor {
    .card-hor-box {
      padding: 10px;
    }
  }
}
@media screen and (max-width: 480px) {
  .card-item-hor {
    .card-hor-box {
      padding: 10px 10px 30px;
    }
    .qrcode-box {
            width: 90px;
            height: 90px;
        }
    .info {
        position: relative;
        max-width: calc(100% - 100px);
        margin-left: 10px;
        .act-sheet{
            position: absolute;
            right: -10px;
            bottom: -30px;
        }
        .code-name {
            font-size: 16px;
        }
        .code-desc {
            font-size: 12px;
        }
    }
  }
}
@media screen and (max-width: 440px) {
  .card-item-col {
    width: 50%;
  }
}
</style>
