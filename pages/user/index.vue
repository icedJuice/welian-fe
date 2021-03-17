<template>
  <div class="user-sec-page user-info-page">
    <div class="form">
      <div class="form-item">
        <span class="form-item-label">邮箱</span>
        <el-input type="text" size="medium" v-model="email" autocomplete="off"></el-input>
      </div>
      <div class="form-item">
        <span class="form-item-label">昵称</span>
        <el-input type="text" size="medium" v-model="nick" autocomplete="off"></el-input>
      </div>
    </div>

    <div class="btn-group">
      <div class="save-btn">
        <span>保存</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-index',
  data() {
    return {
      email: 'abcekfjnwef@qq.com',
      nick: '猪小明'
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.user-sec-page.user-info-page {
  padding: 40px 60px 40px 40px;
  color: #333;
  .form-item {
    display: flex;
    margin-top: 24px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  .form-item-label {
    display: block;
    flex-shrink: 0;
    width: 40px;
    padding-right: 8px;
    line-height: 40px;
    font-size: 12px;
  }
  .el-input--medium .el-input__inner {
    background: #f4f4f4;
    border-radius: 4px;
    border: 1px solid #dddddd;
    max-width: 190px;
  }
  .btn-group {
    margin: 20px 20px 40px 50px;
  }
  .save-btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 76px;
    height: 28px;
    background: #07c160;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
  }
}
</style>