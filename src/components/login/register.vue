<template>
<div>

  <div class="register" @click.stop.prevent='dismiss'></div>
   <div class="register-container">
      <el-form :model="form" class="login-form"  :rules="loginRules" ref="ruleForm">
      <h1 class="title">用户注册</h1>
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
          <el-button type="primary" @click.stop="onRegister('ruleForm')">注册</el-button>
          <el-button @click.stop="resetForm('ruleForm')">重填</el-button>
        </el-form-item>
      </div>
    </el-form>
    </div>
</div>
</template>

<script>
export default {
  name: 'register',
  methods: {
    dismiss () {
      this.$emit('dismiss')
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    onRegister(){

    }
  },
  data() {
    return {
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
  }
}
</script>

<style lang="scss">
.register{
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.3);
  height: 100%;
  width: 100%;
  color:#fff;

}
.register-container{
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -150px;
    width: 300px;
    transform: translateY(100px);
    .title{
      color:azure;
    }
  }
</style>
