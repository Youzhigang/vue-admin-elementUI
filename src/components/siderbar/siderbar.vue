<template>
    <div class="siderbar">
      <el-col>
        <div class="logo">
          <img src="../../../static/xiong.jpg" alt="logo" width="100" height="100">
        </div>
        <el-menu default-active="/index/" class="el-menu-vertical-demo" theme="dark" :router='true'
         @open="handleOpen"
         @close="handleClose"
         @select="handleSelect" >
          <!--<el-submenu index="1">
            <template slot="title">
            <i class="el-icon-menu"></i>客户</template>
            <el-menu-item-group title="分组一">
              <el-menu-item index="/hello">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>-->
          <el-menu-item index="/index/" ><i class="el-icon-menu"></i>首页</el-menu-item>
          <!--<el-menu-item index="/index/client" ><i class="el-icon-picture"></i>客户</el-menu-item>-->
        <el-submenu index="/index/client">
            <template slot="title"><i class="el-icon-picture"></i>客户</template>
            <el-menu-item index="/index/client">客户列表</el-menu-item>
            <el-menu-item index="/index/client/renew">续费情况</el-menu-item>
          </el-submenu>

          <el-menu-item index="/index/question"><i class="el-icon-document"></i>问题</el-menu-item>
          <el-menu-item index="/index/service"><i class="el-icon-information"></i>文档</el-menu-item>
          <el-menu-item index="/index/system"><i class="el-icon-setting"></i>系统</el-menu-item>
        </el-menu>
      </el-col>
    </div>
</template>
<script>
  import {bus} from '../../store/index.js'


  export default {
    name: 'siderbar',
    data () {
      return {
        t: {
          to: 'hello'
        }
      }
    },
    created () {

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath){
        // console.log(key, keyPath);
        bus.$emit('routeChange', key)
      }
    }
  }
</script>

<style lang="scss" scoped>
.siderbar{
  // float: left;
  // position: fixed;
  // left:0;
  // bottom: 0;
  // width: 800px;

  height: 100%;
  .el-col{
    height: 100%;
    // width: 200px;

    background-color: #283443;
    .logo{
      text-align: center;
      margin: 40px 20px;
      img{
        display: inline-block;
        border-radius: 50%;
      }
    }
  }
}
</style>
