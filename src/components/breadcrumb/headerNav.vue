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
  <!--
    <ul class="tabs">
      <li class="tabs-item" v-for="item in tabs" :key='item' :class="{active: activeName === item.path || activeName.indexOf(item.path) !== -1}">{{item.key}}</li>
    </ul>
    -->
    <!--<el-tabs type="card" v-model="$route.name" class="tabs-nopadding"  closable >
      <el-tab-pane v-for="(item,index) in options" :key='index' @click.native='test'
      :label="item.name"
      :name="item.route">

    </el-tab-pane>-->
  <ul class="tabs">

    <li class="tabs-item"
      v-for="(item,index) in options"
      :key='index'
      :class="{active: activeName === item.path }"
      @click.stop='onTabClick(item)'>
      &nbsp;
      {{item.name}}
      <i style="color:#ccc"
        class="el-icon-circle-cross"
        @click.stop='onDelClick(index,item)'>
      </i>
    </li>
  </ul>

    </el-tabs>
    <div class="message-wrapper">
      <el-badge :value="12" class="item">
        <el-button :plain="true" type="warning" size="mini" icon="message"
        @click='autoCloseNotify'
        ></el-button>
      </el-badge>
      <el-button size="mini" @click='showMsg' >查看</el-button>
      <el-button size="mini" @click.native='loginOut' >退出</el-button>
    </div>
  </div>
</template>


<script>
import { USER_LOGINOUT } from '../../store/index.js'
import { mapActions } from 'vuex'


const notifyType = ['success', 'warning', 'info', 'error']


export default {
  name: 'headerNav',
  mounted() {
    // bus.$on('routeChange', (msg) => {
    //     console.log('nopw', msg);
    //     this.activeName = msg
    // })
  },
  data () {
    return {
      showDelIcon: false,

      tabs: [{key:'首页', path: '/index/'},
              {key:'客户列表', path: '/index/client'},
              {key: '问题列表',path: '/index/question'},
              {key:'律师文档',path: '/index/service'} ,
              {key:'系统管理', path: '/index/system'}
              ]
    }
  },
  computed: {
      options(){
          return this.$store.state.options;
      },
      activeName () {
          return this.$store.getters.activeItem
      }
  },
  methods: {
    ...mapActions([USER_LOGINOUT,'RemoveOption']),
    handleClick(tab, event) {

      return false
    },
    // enter () {
    //   this.showDelIcon = true;
    // },
    loginOut () {
      // console.log(123);
      this.$router.push('/')
      // 退出 删除登录用户信息
      this.USER_LOGINOUT()
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

    onTabClick (item) {
      console.log(item.path)
      this.activeName = item.path
      this.$router.push(item.path)
    },
    onDelClick (index,name){
      console.log(index, name)

      if (this.$store.state.options.length !== 1) {
        this.RemoveOption(name)
        let routeList = this.$store.state.options.slice()
        this.$router.push(routeList.pop().path)
      }
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
        box-sizing: border-box;
        font-size: 16px;
        list-style: none;
        display: inline-block;
        margin-right: 15px;
        height: 43px;
        margin-top: 3px;
        transition: all .5s;
        &.active{
          color:#50BFFF;
          //background: #efefef;
          background-image: linear-gradient(to top, #50BFFF, #50BFFF 2px, transparent 1px);
        }
        &:hover{
          cursor: pointer;
        }
        //&:not(:last-child)::after{
          &::after{
          content: '';
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
