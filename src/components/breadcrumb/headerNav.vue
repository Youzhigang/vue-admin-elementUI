<template>
  <div class="header-nav">
    <!--<el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/client'}">客户列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/question'}">问题列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/archive'}">查看档案</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/system'}">系统管理</el-breadcrumb-item>
    </el-breadcrumb>-->
  <!--<el-tabs v-model="activeName" type="card" @click="handleClick">
        <el-tab-pane label="首页" name="/index/"></el-tab-pane>
        <el-tab-pane label="客户列表" name="/index/client"></el-tab-pane>
        <el-tab-pane label="问题列表" name="/index/question"></el-tab-pane>
        <el-tab-pane label="查看档案" name="/index/archive"></el-tab-pane>
        <el-tab-pane label="系统管理" name="/index/system"></el-tab-pane>
  </el-tabs>-->
    <ul class="tabs">
      <li class="tabs-item" v-for="item in tabs" :class="{active: item.path === activeName}">{{item.key}}</li>
    </ul>
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
import bus from '../../store/index.js'

const notifyType = ['success', 'warning', 'info', 'error']


export default {
  name: 'headerNav',

  // watch: {
  //    $route: function (to, from) {

  //       console.log('to', to); // to.name, to.path
  //       console.log('from', from);
  //     }
  // },
  mounted() {
    bus.$on('routeChange', (msg) => {
        // console.log('nopw', msg);
        this.activeName = msg
    })
  },
  data () {
    return {
      activeName: '/index/',
      tabs: [{key:'首页', path: '/index/'},
              {key:'客户列表', path: '/index/client'},
              {key: '问题列表',path: '/index/question'},
              {key:'查看档案',path: '/index/archive'} ,
              {key:'系统管理', path: '/index/system'}
              ]
    }
  },
  methods: {
    handleClick(tab, event) {

      return false
    },
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
    height: 46px;
    // background-color: #fefeee;
    // vertical-align: middle;
    display: flex;
    align-items: center;
    // border-bottom: 1px solid #ccc;
    box-shadow: 0px 0px 5px 1px #333;
    position: relative;
    user-select: none;
    .tabs{
      line-height: 46px;
      height: 46px;
      display: inline-block;
      margin-left:-10px;
      &-item{
        font-size: 14px;
        list-style: none;
        display: inline-block;
        margin-right: 15px;
        &.active{
          color:#50BFFF;
        }
        &:not(:last-child)::after{
          content: '/';
          display: inline-block;
          margin-left: 5px;
        }
      }
    }
    // .el-tabs{
    //   font-size: 16px;
    //   padding-top: 16px;
    //   line-height: 46px;

    // }
    // .el-breadcrumb{
    //   font-size: 16px;
    //   line-height: 46px;
    // }
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
