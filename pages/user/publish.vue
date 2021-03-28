<template>
  <div class="user-sec-page publish-page">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="分类">
        <el-cascader
          v-model="form.typeId"
          :options="qrTypes"
          :props="{ expandTrigger: 'hover' }"
          @change="handleTypeChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.title" placeholder="请填写名称"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="form.labels" placeholder="不超过20个字符，使用空格分离"></el-input>
      </el-form-item>
      <div class="flex-cont">
        <el-form-item label="省份">
          <el-select v-model="form.province" placeholder="省份" @change="onProvinceChange">
            <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="form.city" placeholder="城市">
            <el-option
              v-for="item in cityList[provinceIndex] ? cityList[provinceIndex].children : []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="flex-cont">
        <el-form-item label="头像">
          <el-upload
            drag
            class="avatar-uploader"
            name="files"
            action="/"
            :multiple="false"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :http-request="file => uploadFile(file, 'avatar')"
          >
            <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
            <i v-else class="icon icon-img"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="二维码">
          <el-upload
            drag
            class="avatar-uploader"
            action="/"
            :multiple="false"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :http-request="file => uploadFile(file)"
          >
            <img v-if="qrUrl" :src="qrUrl" class="avatar" />
            <i v-else class="icon icon-qr"></i>
          </el-upload>
        </el-form-item>
      </div>

      <el-form-item label="描述">
        <el-input
          type="textarea"
          placeholder="描述"
          v-model="form.description"
          maxlength="500"
          :autosize="{ minRows: 3, maxRows: 5 }"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <div class="submit-btn" @click="submit">
        <span>提交</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

const isEmpty = str => str === '' || str == null;

const initForm = {
  typeId: '',
  title: '',
  labels: '',
  description: '',
  province: '',
  city: '',
  qrId: '',
  avatarId: ''
};

export default {
  name: 'user-publish',
  data() {
    return {
      form: { ...initForm },
      avatarUrl: '',
      qrUrl: '',
      provinceIndex: -1
    };
  },

  mounted() {
    if (window) {
      this.$nextTick(() => {
        this.$store.dispatch('global/getCitiesInfo');
        this.getQrTypes();
      });
      this.authToken = Cookies.get('WeLink');
    }
  },
  methods: {
    onProvinceChange(provinceIndex) {
      this.provinceIndex = provinceIndex;
      this.form.city = '';
    },
    getQrTypes() {
      this.$store.dispatch('global/getQrTypes');
    },
    handleTypeChange(value) {
      console.log(value);
    },
    handleUploadSuccess(aa) {
      console.log('handleAvatarSuccess', aa);
    },
    beforeUpload(file) {
      console.log(file);
      const accept = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const isJPG = accept.findIndex(e => e === file.type) >= 0;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    uploadFile(file, type) {
      console.log(type);
      const payload = new FormData();
      payload.append('authToken', Cookies.get('WeLink'));
      payload.append('files', file.file);

      this.$store
        .dispatch('global/uploadFile', payload)
        .then(res => {
          const id = (res && res[0] && res[0].id) || '';
          if (type === 'avatar') {
            this.form.avatarId = id;
          } else {
            console.log(this.avatarUrl);
            this.form.qrId = id;
          }
        })
        .catch(error => {
          console.log('catch', error);
          this.$message({
            type: 'error',
            message: error.message || '上传失败'
          });
          if (type === 'avatar') {
            this.form.avatarId = '';
            this.avatarUrl = '';
          } else {
            this.form.qrId = '';
            this.qrUrl = '';
          }
        });
      const reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = e => {
        if (type === 'avatar') {
          this.avatarUrl = e.target.result;
        } else {
          this.qrUrl = e.target.result;
        }
      };
    },
    submit() {
      console.log(this.form);
      const { typeId, title, description, province, city, qrId, avatarId } = this.form;
      let message = '';
      if (isEmpty(typeId)) {
        message = '请选择分类';
      } else if (isEmpty(title)) {
        message = '请填写名称';
      } else if (isEmpty(province)) {
        message = '请选择省份';
      } else if (isEmpty(city)) {
        message = '请选择城市';
      } else if (isEmpty(qrId)) {
        message = '请上传二维码';
      } else if (isEmpty(avatarId)) {
        message = '请上传头像';
      } else if (isEmpty(description)) {
        message = '请填写描述';
      }
      if (message) {
        this.$message({
          type: 'wraning',
          message
        });
        return;
      }
      this.createQr();
    },
    createQr() {
      const payload = { ...this.form };
      payload.typeId = this.form.typeId[1];
      payload.province = this.cityList[payload.province].label;
      this.$store
        .dispatch('global/createQrCode', payload)
        .then(res => {
          console.log('create', res);
          this.$message({
            type: 'success',
            message: '提交成功'
          });
          this.resetForm();
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: '提交失败: ' + (error.message || '未知错误')
          });
        });
    },
    resetForm() {
      this.form = { ...initForm };
      this.avatarUrl = '';
      this.qrUrl = '';
      this.provinceIndex = -1;
    }
  },
  computed: {
    cityList() {
      return this.$store.state.global.cityList || [];
    },
    qrTypes() {
      console.log(this.$store.state.global.qrTypes);
      return this.$store.state.global.qrTypes || [];
    }
  }
};
</script>

<style lang="scss">
.user-sec-page.publish-page {
  background-color: #fff;
  padding: 40px 60px 40px 0;
  input,
  .el-select .el-input.is-focus .el-input__inner,
  .el-cascader .el-input.is-focus .el-input__inner {
    background-color: #f4f4f4;
    border: 1px solid #dddddd;
    &:focus {
      border-color: #07c160;
    }
  }
  .el-form-item--small .el-form-item__label {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .flex-cont {
    display: flex;
  }
  .avatar-uploader {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
    border-radius: 4px;
    .el-upload,
    .el-upload-dragger {
      width: 100%;
      height: 100%;
      background-color: transparent;
    }
    .el-upload-dragger {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .avatar {
      width: 100%;
      height: 100%;
      display: block;
    }
    .icon {
      display: block;
      width: 30px;
      height: 30px;
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
      background-color: transparent;
      &.icon-img {
        background-image: url('~assets/icon/icon-img.png');
      }
      &.icon-qr {
        background-image: url('~assets/icon/icon-qr.png');
      }
    }
  }
  .submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 76px;
    height: 28px;
    border-radius: 4px;
    margin: 20px 60px 20px 80px;
    background: #07c160;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    &.disable {
      opacity: 0.4;
    }
  }
}
.el-cascader-node.in-active-path,
.el-cascader-node.is-active,
.el-cascader-node.is-selectable.in-checked-path {
  color: #07c160;
}
</style>