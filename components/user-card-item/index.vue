<template>
  <div class="card-item">
    <div class="qrcode-box">
      <img class="qrcode-img" :src="item.qrImageUrl" alt="" />
    </div>
    <div class="qrcode-info">
      <div class="info-box">
        <div class="code-title">
          <h2 class="title">{{ item.typeCategoryName }}-{{ item.typeName }}: {{ item.title }}</h2>
          <span class="status" v-if="item.state === 0">审核中</span>
          <span class="status" v-if="item.state === 1">审核通过</span>
          <span class="status fail" v-if="item.state === 2">被拒绝</span>
        </div>
        <div class="code-view">
          <div class="view-item">
            <i class="icon icon-see"></i>
            <span>{{ item.displays || 0 }}</span>
          </div>
          <div class="view-item">
            <i class="icon icon-zan"></i>
            <span>{{ item.prizes || 0 }}</span>
          </div>
          <div class="view-item">
            <span>编号{{ item.qrNumber }}</span>
          </div>
        </div>
        <div class="code-tag">
          <span class="tag-item" v-for="label in (item.labels && item.labels.split(/\s+/)) || []" :key="label">{{
            label
          }}</span>
        </div>
        <div class="func-box">
          <div class="detail-btn">查看详情</div>
          <el-button class="status-btn" size="mini" type="success" :loading="loading" @click="puhlishQr">{{
            (puhlish === null ? item.isPublished : puhlish) ? '下架' : '上架'
          }}</el-button>
          <!-- <div class="status-btn" @click="puhlishQr">
            <span>{{ (puhlish === null ? item.isPublished : puhlish) ? '下架' : '上架' }}</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-card-item',
  props: ['item'],
  data() {
    return {
      puhlish: null,
      loading: false
    };
  },
  methods: {
    puhlishQr() {
        if (this.loading) {
            return;
        }
        this.loading = true;
      const isPublished = this.item.isPublished;

      if (this.puhlish === null) {
        this.puhlish = !isPublished;
      } else {
        this.puhlish = !this.puhlish;
      }

      const payload = {
        id: this.item.id,
        isPublished: this.puhlish
      };

      this.$store.dispatch('user/publishQr', payload).then((res) => {
          this.$message({
              type: 'success',
              message: this.puhlish ? '上架成功' : '下架成功'
          });
          this.loading = false;
      }).catch((error) => {
          this.$message({
              type: 'error',
              message: error.message || '操作失败'
          });
          this.loading = false;
      });
    }
  }
};
</script>