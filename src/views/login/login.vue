<template>
  <div class="login-container">
    <el-form class="login-from"
             ref="formref"
             :model="loginForm"
             :rules="rule">
      <img class="logoImg"
           :src="logoImg"
           alt="">
      <h3 class="login-title">vue-admin-template</h3>
      <el-form-item prop="userName">
        <el-input v-model="loginForm.userName"
                  placeholder="请输入用户名"
                  @keydown.native.enter="submitForm"></el-input>
      </el-form-item>
      <el-form-item prop="passWords">
        <el-input type="passWords"
                  v-model="loginForm.passWords"
                  placeholder="请输入密码"
                  show-password
                  @keydown.native.enter="submitForm"></el-input>
      </el-form-item>
      <el-form-item class="mt40 submitFormbtns">
        <el-button type="primary"
                   @click="submitForm"
                   :loading="logining">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import { postLogin } from "@/api/api"
import jsencrypt from '@/api/jsencrypt'
export default {
  data () {
    return {
      logining: false,
      logoImg: require('@/assets/loginBg.png'),
      rule: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        passWords: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      loginForm: {
        userName: 'admin',
        passWords: '123456',
      },
    }
  },
  mounted () { },
  methods: {
    encryptData (getPublicKey, data) {
      let encrypt = new jsencrypt();
      encrypt.setPublicKey(getPublicKey);
      return encrypt.encrypt(data);
    },
    // 点击登录按钮登录
    submitForm () {
      let that = this
      this.logining = true
      let keys = 'MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAZ6fWmvB3y4TDZnlQEt62ig7A565VTC09eqs27NVMP8WvmH2j1pUG3hanJ+JHd5/Mj12KmYlDs7ENGsTHp7P0awIDAQAB'
      const name = that.loginForm.userName
      const pwd = that.encryptData(keys, that.loginForm.passWords)
      if (that.loginForm.userName === "" || that.loginForm.passWords === "") {
        that.$message({
          showClose: true,
          message: "账号或密码不能为空",
          type: "error",
          offset: 400
        })
        this.logining = false;
        return false
      } else {
        that.$store.dispatch('setToken', that.loginForm.userName).then(() => {
          that.$router.push({ path: '/' })
        }).catch(res => {
          that.$message({
            showClose: true,
            message: res,
            type: 'error'
          })
        })

        // postLogin({ Name: name, Pwd: pwd }).then((res) => {
        //   if (res.data.StatusCode == 'Ok') {
        //     that.$store.dispatch("setToken", res.data.Data).then(res => {
        //       that.$router.push({ path: "/" })
        //     })
        //     localStorage.setItem('userName', that.loginForm.userName)
        //     this.logining = false;
        //   } else {
        //     that.$message({
        //       showClose: true,
        //       message: res.data.Message,
        //       type: "error",
        //       offset: 400
        //     })
        //   }
        // }).catch(() => {
        //   this.logining = false;
        // })

      }
    },
    // 表单重置按钮
    resetForm () {
      this.$refs.formref.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-message--error {
  top: 100px !important;
}
$colorf: #fff;
#app {
  padding: 0px;
  margin: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: hidden;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background: #333333;
  // background-image: url(../../assets/loginbg.png);
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  padding-top: 10%;
  overflow: hidden;
  .login-from {
    width: 470px;
    margin: 0 auto;
    padding: 30px 40px 40px 40px;
    border: 1px solid $colorf;
    max-width: 100%;
    background: #fff;
    text-align: center;
    .submitFormbtns {
      .el-button {
        width: 140px;
      }
    }
    .logoImg {
      width: 100px;
      height: 100px;
    }
    .login-title {
      text-align: center;
      margin-bottom: 50px;

      font-size: 24px;
      font-weight: 100;
      font-family: Arial;
    }
    .el-input {
      margin-bottom: 10px;
      // width: 85%;
    }
  }
}
</style>
