<template>
  <div class="comp-infi-container">
    <div :class="className">
      <slot></slot>
    </div>
    <div class="comp-infi-bottom-text" :id="id">
      <p  class="tip" :class="{show: showText && (loading || done)}">{{loading ? '加载中...' : '没有更多了'}}</p>
    </div>
  </div>
</template>
<script>

const eventList = ['load', 'touchstart', 'touchmove', 'scroll'];
let ticking = false;
let tickTimer = null;
const step = 50;

export default {
  name: 'inf-list',
  data() {
      return {
          timer: null,
          bottomEl: null,
          delay: 300,
          id: '--',
          showText: false,
      }
  },

  props: ['loading', 'done', 'className'],

  mounted() {
      if (process.browser) {
          this.id = 'infinit-list-id-' + Math.floor(Math.random() * 100000);
          this.bottomEl = document.getElementById(this.id);
          eventList.forEach(e => {
              window.addEventListener(e, this.onTick);
          });
          this.onTick();
      }
  },
  beforeDestroy() {
      if (process.browser) {
          eventList.forEach(e => {
              window.removeEventListener(e, this.onTick);
          });
      }
  },
  methods: {
    onTick() {
        if (this.loading || this.done) {
            return false;
        }
        if (ticking) {
            clearTimeout(tickTimer);
            tickTimer = setTimeout(() => this.tickLoad(), step + 20);
            return false;
        }
        ticking = true;
        this.tickLoad();
        setTimeout(() => {
            ticking = false;
        }, step);
    },
    tickLoad() {

        if (!this.bottomEl) {
            this.bottomEl = document.getElementById(this.id);
        }
        if (this.bottomEl) {
            const rect = this.bottomEl.getBoundingClientRect();
            const distance = rect.bottom - document.documentElement.clientHeight;
            if ( distance <= 50) {
                this.$emit('loadMore');
            } else {
                  if (!this.showText) {
                    this.showText = true;
                }
            }
        }
    },

  }
}
</script>
<style lang="scss" scoped>
.comp-infi-container {
  .comp-infi-bottom-text {
    font-size: 12px;
    & > p {
      text-align: center;
      color: #999999;
      opacity: 0;
      &.show {
        opacity: 1;
      }
    }
  }
}
</style>