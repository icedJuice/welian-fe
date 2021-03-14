<template>
  <div class="login-page">
    <div class="login-body">
      <div class="mode-sign" :class="{ show: isSign, ani: ani }">
        <div class="header">
          <nuxt-link to="/" class="logo">
            <img class="logo-img" src="~static/images/logo-dark.png" alt="WELIAN.PUB" />
          </nuxt-link>
          <div class="sign-func">
            <span class="tip"> 已有账号，</span>
            <span class="color-green" @click="changeModeLogin">立即登陆</span>
            <i class="line"></i>
            <nuxt-link class="color-green" to="/">返回微链接</nuxt-link>
          </div>
        </div>
        <div class="login-form">
          <h2 class="form-title">
            <span>欢迎注册</span>
            <nuxt-link class="link-main" to="/">返回微链接</nuxt-link>
          </h2>
          <div class="form-inner">
            <div class="input-box">
              <el-input placeholder="邮箱" v-model="login_email" size="medium"></el-input>
              <p class="err-tip">请输入正确的邮箱</p>
            </div>
            <div class="input-box error">
              <el-input placeholder="昵称" v-model="login_nick" size="medium"></el-input>
              <p class="err-tip">请输入昵称</p>
            </div>
            <div class="input-box">
              <el-input placeholder="密码" v-model="login_pw" size="medium" show-password></el-input>
              <p class="err-tip">请输入密码</p>
            </div>
            <div class="input-box verification">
              <el-input placeholder="验证码" v-model="login_ident" size="medium"></el-input>
              <div class="verification-box">
                <span>1456</span>
                <span>缓一缓</span>
              </div>
              <p class="err-tip">请输入验证码</p>
            </div>

            <p class="frag-wrap wap">
              <i class="select-flag active"></i>
              <span>
                我已阅读并接受
                <nuxt-link class="color-green" to="/1">用户协议</nuxt-link>
                和
                <nuxt-link class="color-green" to="/">隐私政策</nuxt-link>
              </span>
            </p>

            <div class="submit-btn disable">
              <span>注册</span>
            </div>

            <p class="frag-wrap web">
              <i class="select-flag active"></i>
              <span>
                我已阅读并接受
                <nuxt-link class="color-green" to="/1">用户协议</nuxt-link>
                和
                <nuxt-link class="color-green" to="/">隐私政策</nuxt-link>
              </span>
            </p>
            <div class="addi-wrap">
              <span class="tip"> 已有账号，</span>
              <span class="color-green" @click="changeModeLogin">立即登陆</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mode-login" :class="{ show: !isSign, ani: ani }">
        <div class="header">
          <nuxt-link to="/" class="logo">
            <img class="logo-img" src="~static/images/logo-dark.png" alt="WELIAN.PUB" />
          </nuxt-link>
          <div class="sign-func">
            <span class="tip"> 没有账号？请 </span>
            <span class="color-green" @click="changeModeSignin">注册</span>
            <i class="line"></i>
            <nuxt-link class="color-green" to="/">返回微链接</nuxt-link>
          </div>
        </div>
        <div class="login-form">
          <h2 class="form-title">
            <span>登陆</span>
            <nuxt-link class="link-main" to="/">返回微链接</nuxt-link>
          </h2>
          <div class="form-inner">
            <div class="input-box">
              <el-input placeholder="邮箱" v-model="login_email" size="medium"></el-input>
              <p class="err-tip">请输入正确的邮箱</p>
            </div>
            <div class="input-box">
              <el-input placeholder="密码" v-model="login_pw" size="medium" show-password></el-input>
              <p class="err-tip">请输入密码</p>
            </div>

            <nuxt-link class="color-green forgot-btn" to="/forgot">忘记密码</nuxt-link>

            <div class="submit-btn disable">
              <span>登陆</span>
            </div>

            <div class="addi-wrap">
              <span class="tip"> 没有账号？请 </span>
              <span class="color-green" @click="changeModeSignin">注册</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'session',
  scrollToTop: true,

  head: {
    title: '登陆'
  },

  data() {
    return {
      isSign: false,
      ani: false,
      login_email: '',
      login_nick: '',
      login_pw: '',
      login_ident: ''
    };
  },

  fetch({ store, route: { path } }) {
    return new Promise(r => {
      Promise.all([
        store.dispatch('options/getTDK', { path, id: 101 }),
        store.dispatch('options/setLayoutPanel', { isLayoutPanel: false })
      ])
        .then(([head]) => {
          // this.head = head;
          r();
        })
        .catch(() => {
          r();
        });
    });
  },

  mounted() {},

  methods: {
    changeModeLogin() {
      this.isSign = false;
      this.ani = true;
    },
    changeModeSignin() {
      this.isSign = true;
      this.ani = true;
    }
  },

  computed: {
    lawyerData() {
      return this.$store.state.global.mainLawyerData;
    },
    mobileLayout() {
      return this.$store.state.options.mobileLayout;
    }
  }
};
</script>

<style lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .mode-sign,
  .mode-login {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    &.ani {
      animation: rotateOut 0.3s linear both;
    }
    &.show {
      opacity: 1;
      z-index: 2;
      &.ani {
        animation: rotateIn 0.3s linear both;
      }
    }
  }
  .color-green {
    padding: 4px 0;
    color: #07c160;
    cursor: pointer;
  }
  .tip,
  .color-green {
    font-size: 12px;
  }
  .line {
    display: inline-block;
    width: 1px;
    height: 10px;
    background-color: #bbbbbb;
    margin: 0 12px;
  }
  .sign-func {
    display: flex;
    align-items: center;
  }
  .login-body {
    position: relative;
    width: 408px;
    height: 548px;
    margin: 0 auto 10vh;
    padding-top: 40px;
    perspective: 1000;
    -webkit-perspective: 1000; /* Safari 和 Chrome */
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .logo {
    display: block;
  }
  .logo-img {
    display: block;
    height: 18px;
    width: auto;
  }
  .login-form {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
  }
  .form-title {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    color: #fff;
    height: 60px;
    background: linear-gradient(90deg, #12d36f 0%, #07c160 100%);
  }
  .link-main {
      display: none;
      position: absolute;
      right: 11px;
      top: 12px;
      font-size: 14px;
      line-height: 20px;
      color: #FEFFFE;
      font-weight: 400;
      opacity: 0.9;
    }
  .form-inner {
    padding: 50px 60px 70px;
    display: flex;
    flex-direction: column;
  }
  .input-box {
    position: relative;
    margin-top: 20px;
    &:first-of-type {
      margin-top: 0;
    }
    .el-input {
      position: relative;
    }
    .err-tip {
      position: absolute;
      left: 0;
      top: 100%;
      font-size: 20px;
      transform-origin: left top;
      padding-left: 30px;
      transform: scale(0.5, 0.5);
      color: #ff5f5f;
    }
    &.error .el-input {
      .el-input__inner {
        border-color: #ff5f5f;
      }
    }
  }
  .input-box.verification {
    input {
      padding-right: 132px;
    }
  }
  input {
    width: 100%;
    border: 1px solid #fff;
    border-radius: 4px;
    -webkit-appearance: none;
    background-color: #fff;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    &:focus {
      border-color: #07c160;
    }
  }
  .verification-box {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
  }
  .submit-btn {
    height: 36px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    background: linear-gradient(90deg, #12d36f 0%, #07c160 100%);
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    &.disable {
      opacity: 0.4;
    }
  }
  .forgot-btn {
    display: block;
    padding: 4px 10px;
    margin: 24px auto 30px;
  }
  .frag-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px auto;
    font-size: 12px;
    color: #333;
    &.wap {
      display: none;
      margin: 20px 0 5px;
      justify-content: flex-start;
    }
    &.web {
      display: flex;
    }
    .select-flag {
      position: relative;
      display: block;
      width: 14px;
      height: 14px;
      padding: 4px;
      cursor: pointer;
      &::before {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        background: #ffffff;
        border-radius: 2px;
        border: 1px solid #bbbbbb;
      }
      &.active::after {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 1px;
        background-color: #07c160;
      }
    }
  }
  .mode-login .input-box {
    margin-top: 34px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  .addi-wrap {
    margin: 20px auto;
    color: #333333;
  }
}

@keyframes rotateIn {
  0% {
    opacity: 0;
    transform: rotateY(-180deg);
  }
  49% {
    opacity: 0;
    transform: rotateY(-90deg);
  }
  51% {
    opacity: 1;
    transform: rotateY(-90deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}

@keyframes rotateOut {
  0% {
    opacity: 1;
    transform: rotateY(0);
  }
  49% {
    opacity: 1;
    transform: rotateY(90deg);
  }
  51% {
    opacity: 0;
    transform: rotateY(90deg);
  }
  100% {
    opacity: 0;
    transform: rotateY(180deg);
  }
}

@media screen and (min-width: 640px) {
  .login-page {
    background-image: url('~static/images/login-bg.jpg');
    background-size: cover;
    background-position: center top;
  }
}
@media screen and (max-width: 640px) {
  .login-page {
    display: block;
    background-color: #fff;
    .login-body {
      width: unset;
    }
    .form-inner {
      padding: 30px;
    }
    .header {
      display: none;
    }
    .form-title {
      height: 44px;
      font-size: 16px;
    }
    .link-main {
      display: block;
    }
    input {
      border-color: #dddddd;
    }
    .el-input--medium .el-input__inner {
      height: 40px;
    }
    .frag-wrap {
   
      &.wap {
        display: flex;
      }
      &.web {
        display: none;
      }
    }
  }
}
</style>