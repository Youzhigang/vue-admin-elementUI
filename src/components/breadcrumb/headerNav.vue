<template>
  <div class="header-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/client'}">客户列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/question'}">问题列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/archive'}">查看档案</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/system'}">系统管理</el-breadcrumb-item>
      <!--<el-breadcrumb-item @click.native='loginOut'>退出</el-breadcrumb-item>-->

    </el-breadcrumb>
    <div class="message-wrapper">
      <el-badge :value="12" class="item">
        <el-button :plain="true" type="warning" size="mini" icon="message"
        @click='autoCloseNotify'
        ></el-button>
      </el-badge>
      <el-badge :value="12" class="item">
        <el-button :plain="true" type="danger" size="mini" icon="information"
        @click="notAutoCloseNotify"></el-button>
      </el-badge>
      <el-button size="mini" @click='showMsg' >查看</el-button>
      <el-button size="mini" @click.native='loginOut' >退出</el-button>
    </div>
  </div>
</template>


<script>
const notifyType = ['success', 'warning', 'info', 'error']

export default {
  name: 'headerNav',

  methods: {
    loginOut () {
      // console.log(123);
      this.$router.push('/')
      // 退出 删除登录用户信息
    },
    autoCloseNotify () {
      let type = Math.round(Math.random() * 3)

      this.$notify[notifyType[type]]({
          title: '消息',
          message: '这是一条会自动关闭的提示消息',
          offset: 50
      })
    },
    notAutoCloseNotify () {
      let type = Math.round(Math.random() * 3)

      this.$notify[notifyType[type]]({
          title: '消息',
          message: '这是一条不会自动关闭消息的提示消息',
          offset: 50,
          duration: 0
      })
    },
    showMsg () {

      this.$alert('这是一段内容','标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `点击了: ${ action }`
          })
        }
      })
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
    position: relative;
    .el-breadcrumb{
      font-size: 16px;
      line-height: 50px;
    }
    .message-wrapper{

      // float: right;
      position: absolute;
      right: 30px;
      .item{
        margin-right: 25px;
      }
    }
  }
</style>
