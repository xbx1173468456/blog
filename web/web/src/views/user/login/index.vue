<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="off" label-position="left"
             label-width="0px" class="card-box login-form">
      <h3 class="title">智慧工程管理系统</h3>
      <div v-show="isShowLogin" class="login-layout shade">
        <div class="projection left"></div>
        <div class="projection right"></div>
        <div class="qr-code-right">
          <div class="qr-code-login">扫码登录<i class="fa fa-caret-right fa-lg"/></div>
          <img src="../../../assets/img/user/login/qr_code_small.png" @click="handleQRCodeShow(false)">
        </div>
        <h4>密码登录</h4>
        <!--<div class="form-error" v-show="isShowError">请输入手机号码和密码</div>-->
        <div class="form-empty"/>
        <el-form-item prop="username" :class="isChangeColorUserName?'border-blue':''">
          <span class="svg-container"><i class="ka ka-mobile"/></span>
          <el-input clearable size="small" v-model="loginForm.username" name="username" type="text" auto-complete="off" autocomplete="off"
                    placeholder="请输入手机号码" @blur="changeColorUserName(false)" @focus="changeColorUserName(true)"/>
        </el-form-item>
        <el-form-item prop="password" :class="isChangeColorPassword?'border-blue':''">
          <span class="svg-container pwd"><i class="ka ka-unlock"/></span>
          <el-input clearable size="small" v-model="loginForm.password" name="password" type="password" auto-complete="off" autocomplete="off"
                    placeholder="请输入登录密码" @keyup.enter.native.prevent="handleLogin"  @blur="changeColorPassword(false)" @focus="changeColorPassword(true)"/>
        </el-form-item>
        <el-form-item class="form-check">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <div class="forget-password">
            <router-link to="/re">忘记密码</router-link>
          </div>
        </el-form-item>
        <el-form-item class="form-button">
          <el-button  type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            立即登录
          </el-button>
        </el-form-item>
        <el-form-item class="form-register">
          <div class="login-register">
            <router-link to="/register">免费注册</router-link>
          </div>
        </el-form-item>
      </div>
      <div v-show="!isShowLogin" class="login-qr-code shade">
        <div class="projection left"></div>
        <div class="projection right"></div>
        <div class="qr-code-right">
          <div class="qr-code-login">密码登录<i class="fa fa-caret-right fa-lg"/></div>
          <img src="../../../assets/img/user/login/qr_code_com.png" @click="handleQRCodeShow(true)">
        </div>
        <h4>扫码登录</h4>
        <div class="qr-code-scan">
          <img width="140" height="140" src="../../../assets/img/user/login/qr_code_big.png">
          <div class="qr-code-scan-data">
            <img src="../../../assets/img/user/login/qr_code_scan.png">
            <div class="scan">
              <div>打开管理APP</div>
              <div>扫一扫登录</div>
            </div>
          </div>
        </div>
        <div class="upload-register">
          <router-link to="#">下载APP</router-link>&nbsp;&nbsp;&nbsp;&nbsp;<router-link to="/">免费注册</router-link>
        </div>
      </div>
    </el-form>
    <basic-dialog v-el-drag-dialog :visible.sync="showDialog" title="第三方验证">
      邮箱登录成功,请选择第三方验证
      <social-sign/>
    </basic-dialog>
    <footer>
      <div>名称：成都起步传奇科技公司 网址：www.epmsoft.cn | 地址：四川省成都市武侯区成科3号（计算机研究院）A座4楼</div>
      <div>电话：028-8508-7963 | 手机：189-8008-9737</div>
      <div><img width="74" height="74" src="../../../assets/img/user/login/qr_code_big.png">
        <div class="qr-code">扫码下载</div>
      </div>
    </footer>
  </div>
</template>

<script>
  import ElForm from 'element-ui/packages/form/src/form'
  import ElFormItem from 'element-ui/packages/form/src/form-item'
  import {Message} from 'element-ui'
  import {validatePhone, validateLength} from "../../../utils/validate";
  import {addClass} from "@/utils/index";

  export default {
    name: 'Login',
    components: {
      ElFormItem,
      ElForm
    },
    mounted() {
      let username = localStorage.getItem('username');
      let password = localStorage.getItem('password');
      if (username) {
        this.checked = true;
        this.loginForm.username = username;
        this.loginForm.password = password;
      } else {
        this.checked = false;
        this.loginForm.username = '';
        this.loginForm.password = '';
      }
    },
    data() {
      return {
        // 记住密码
        checked: false,
        // 是否显示登录
        isShowLogin: true,
        loginForm: {
          username: '',//12345678964
          password: ''//123456
        },
        loginRules: {
          username: [{
            required: true,
            validator: (rule, value, callback) => {
              validatePhone(rule, value, callback, true, ['手机号']);
            },
            trigger: 'blur'
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['密码',6,30]);
            },
          }]
        },

        showDialog: false,
        redirect: undefined,
        isChangeColorUserName:false,
        isChangeColorPassword:false
      }
    },
    watch: {
      // $route: {
      //   handler: function(route) {
      //     this.redirect = route.query && route.query.redirect
      //   },
      //   immediate: true
      // },
      $route: {
        handler: function(route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      let body = document.getElementsByTagName("body")[0];
      addClass('login-body',body)
      // window.addEventListener('hashchange', this.afterQRScan);
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan);
    },
    methods: {
      changeColorUserName(isColor) {
        this.isChangeColorUserName = isColor;
      },
      changeColorPassword(isColor) {
        this.isChangeColorPassword = isColor;
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('LoginByPhone', this.loginForm).then((response) => {
              if (response.status === 200) {
                if (this.checked) {
                  localStorage.setItem('username', this.loginForm.username);
                  localStorage.setItem('password', this.loginForm.password);
                } else {
                  localStorage.setItem('username', '');
                  localStorage.setItem('password', '');
                }
                this.$router.push({ path: this.redirect || '/', query: this.otherQuery });
              } else {
                localStorage.setItem('username', '');
                localStorage.setItem('password', '');
                Message({
                  message: response.message,
                  type: 'error'
                })
              }
            }).catch(error => {
              localStorage.setItem('username', '');
              localStorage.setItem('password', '');
            })
          } else {
            return false
          }
        })
      },
      afterQRScan() {
        // const hash = window.location.hash.slice(1);
        // const hashObj = getQueryObject(hash);
        // const originUrl = window.location.origin;
        // history.replaceState({}, '', originUrl);
        // const codeMap = {
        //   wechat: 'code',
        //   tencent: 'code'
        // };
        // const codeName = hashObj[codeMap[this.auth_type]];
        // if (!codeName) {
        //   alert('第三方登录失败');
        // } else {
        //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
        //     this.$router.push({ path: '/' });
        //   });
        // }
      },
      handleQRCodeShow(isShowLogin) {
        if (isShowLogin) {
          this.isShowLogin = true
        } else {
          this.isShowLogin = false
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../../styles/mixin.scss";

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }
  .border-blue{
    border-color: #409EFF !important;
  }

  .login-body {
    height: 100%;
    background-color: #ebf4ff;
  }
  .login-container {
    height: 100%;
    background: url(../../../assets/img/user/login/bg.jpg) no-repeat;
    background-size: 100% 55%;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset !important;
      margin-left: 15px;
      margin-top: 1px;
      width:240px;
      padding-left: 0;
    }
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 16px;
      color: #161b26;
      height: 40px !important;
      line-height: 40px !important;
    }
    .el-input {
      display: inline-block;
      height: 42px;
      width: 88%;
      margin-left: 18px;
      line-height: 42px;
    }
    .svg-container {
      padding: 6px 5px 6px 12px;
      color: #4287ff;
      &.pwd {
        margin-right: 2px;
      }
      i {
        position: absolute;
        top: 7px;
        &.ka-mobile {
          background: url("../../../assets/img/user/login/user.png") no-repeat;
        }
        &.ka-unlock {
          background: url("../../../assets/img/user/login/password.png") no-repeat;
        }
      }
    }
    .title {
      font-size: 42px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0 auto 40px;
      text-align: center;
      font-weight: bold;
    }
    .qr-code-right {
      position: absolute;
      right: 32px;
      top: 32px;
      .qr-code-login {
        position: absolute;
        top: 0px;
        right: 46px;
        width: 70px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        font-size: 12px;
        border: 1px solid #8eb7ff;
        color: #4287ff;
        background-color: #f4f8ff;
        i {
          position: absolute;
          top: 4px;
          right: -9px;
          font-size: 24px;
          color: #7fafff;
        }
      }
      img {
        cursor: pointer;
      }
    }
    h4 {
      padding-top: 64px;
      padding-left: 97px;
      font-size: 20px;
      color: #161b26;
      margin-bottom: 6px;
    }
    .login-layout {
      background: #fff;
      height: 444px;
      position: relative;
      .form-error {
        background: #ffe5eb url("../../../assets/img/user/login/tips.png") no-repeat 10px 4px;
        margin-left: 10px;
        padding-left: 39px;
        line-height: 28px;
        font-size: 12px;
        color: #454e67;
        margin-bottom: 10px;
        width: 320px;
        margin-left: 97px;
      }
      .form-empty {
        height: 28px;
      }
    }
    .login-qr-code {
      position: relative;
      background: #fff;
      width: 514px;
      height: 444px;
      text-align: center;
      h4 {
        text-align: left;
      }
      .qr-code-scan {
        margin-top: 48px;
      }
      .qr-code-scan-data {
        margin-top: 20px;
        img {
          + div {
            display: inline-block;
            > div {
              height: 20px;
              font-size: 14px;
              color: #9ba3b9;
              text-align: left;
            }
          }
        }
      }
      .upload-register {
        margin-top: 30px;
        font-size: 14px;
        color: #454e67;
        text-align: right;
        padding-right: 100px;
      }
    }
    .login-form {
      /*position: relative;*/
      /*left: 0;*/
      /*right: 0;*/
      width: 514px;
      margin: auto;
      padding-top: 120px;
    }
    .el-form-item {
      border: 1px solid #9ba3b9;
      background: #fff;
      border-radius: 0;
      color: #454545;
      width: 320px;
      margin-left: 97px;
      margin-bottom: 26px;
      &.form-button, &.form-check {
        border-width: 0;
        margin-top: -10px;
      }
      &.form-check {
        .el-checkbox__label {
          color: #9ba3b9;
          font-size: 14px;
        }
        .forget-password {
          display: inline-block;
          float: right;
          color: #454e67;
        }
      }
      &.form-register {
        border-width: 0;
        margin-top: -18px;
        .login-register {
          float: right;
        }
      }
    }
    .el-button--primary {
      background-color: #4287ff;
      border-color: #4287ff;
    }
    .el-button {
      line-height: 42px;
      padding: 0 12px;
      border-width: 0;
      font-size: 16px;
    }
    footer {
      text-align: center;
      width: 100%;
      font-size: 14px;
      color: #8d96af;
      line-height: 28px;
      padding-top: 50px;
      margin-bottom: 50px;
      .qr-code {
        line-height: 12px;
        padding-bottom: 10px;
      }
    }
    .shade .projection{
      position: absolute;
      width:45px ;
      height:165px ;
      bottom: 0;
      &.left{
        left: -42px;
        background: url("../../../assets/img/user/login/left.png") no-repeat;
      }
      &.right{
        right: -42px;
        background: url("../../../assets/img/user/login/right.png") no-repeat;
      }
    }
  }

  @media screen and(max-height: 768px) {
    body {
      min-height: 700px;
      overflow: auto;
      background-size: 100% 60%;
    }
    .login-container {
      .login-form {
        padding-top: 30px;
      }
      .title {
        margin: 0 auto 18px;
      }
      .login-layout, .login-qr-code {
        height: 405px;
      }
      .login-qr-code {
        .qr-code-scan {
          margin-top: 28px;
        }
      }
      footer {
        padding-top: 20px;
      }
    }
  }
</style>
