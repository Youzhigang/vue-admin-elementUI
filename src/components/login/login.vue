<template>
  <div class="login-container">
    <el-form :model="form" class="login-form" :rules="loginRules" ref="ruleForm">
      <h1 class="title">系统登录</h1>
      <el-form-item prop='username'>
        <el-input placeholder="请输入用户名" prop="username" v-model="form.username">
          <template slot="prepend">用户名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input placeholder="请输入密码" prop="password" type='password' v-model="form.password">
          <template slot="prepend">密　码</template>
        </el-input>
      </el-form-item>
      <div class="button-wrapper">
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

      </div>
      <div class="tips">
        tips 首次登录 注册 忘记密码........
      </div>
    </el-form>
  </div>
</template>


<script>
  import { mapActions } from 'vuex';
  import { USER_LOGIN } from '../../store/index.js'


  export default {
    mounted() {
      // console.log(bus.user.username)
    },
    data() {
      return {
        isSubmit: false,
        form: {
          id: 'test',
          username: 'administrator',
          password: '1'
        },
        loginRules: {
          username: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      ...mapActions([USER_LOGIN]),
      onSubmit(formName) {
        // console.log(this.$refs[formName]);
        this.$refs[formName].validate((valid) => {
          // console.log(valid);
          if (valid) {
            console.log('submit!');
            // this.$http('')  // 请求后台
            this.isSubmit = true
            // if (!this.form.id || !this.form.name) return
            this.USER_LOGIN(this.form)
            this.$router.push('/index')
            // this.$router.replace({path: '/index'})
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>


<style lang="scss" scoped>
  .login-container {
    position: relative;
    width: 100%;
    height: 100%;
    height: 100vh;
    background-color: #2d3a4b;
    .login-form {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-100%);
      width: 300px;
      .title {
        text-align: center;
        font-size: 26px;
        color: #eee;
        margin: 0px auto 40px auto;
      }
      .el-input {
        background-color: #283443;
        outline: 1px solid #454;
      }
      .el-input-group__prepend {
        // background-color: #eee;
        background-color: #283443;
        border: 1px solid #454;
      }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
        -webkit-text-fill-color: #eee !important;
      }
      input {
        background: transparent;
        border: 1px;
        -webkit-appearance: none;
        // font-size: 16px;
        // padding: 12px 5px 12px 15px;
        color: #fff;
        height: 40px;
      }
      .button-wrapper {
        width: 100%;
        text-align: center;
        button {
          width: 140px;
        }
      }
      .tips {
        color: #eee; // text-align: center;
        padding-top: 20px;
      }
    }
  }

</style>
