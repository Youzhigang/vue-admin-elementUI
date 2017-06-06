<template>
  <div class="header-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/client'}">客户列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/question'}">问题列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/archive'}">查看档案</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/system'}">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item @click.native='loginOut'>退出</el-breadcrumb-item>

    </el-breadcrumb>
  </div>
</template>


<script>
export default {
  name: 'headerNav',
  methods: {
    loginOut () {
      // console.log(123);
      this.$router.push('/')
      // 退出 删除登录用户信息
    }
  }
}
</script>


<style lang="scss" scoped>
  .header-nav{
    width: 100%;
    // border: 1px solid black;

    padding-left: 10px;
    height: 50px;
    background-color: #fefeee;
    // vertical-align: middle;
    display: flex;
    align-items: center;
    // border-bottom: 1px solid #ccc;
    box-shadow: 0px 0px 5px 1px #333;
    .el-breadcrumb{
      font-size: 16px;
    }
  }
</style>
