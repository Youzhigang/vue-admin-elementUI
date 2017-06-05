<template>

    <div class="siderbar">

      <el-col>
        <div class="logo">
          <img src="https://imgsa.baidu.com/baike/w%3D268/sign=f0e254ed6e224f4a5799741531f69044/37d3d539b6003af3789efeab362ac65c1138b6d0.jpg" alt="logo" width="150" height="150">
        </div>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark" :router='true'>
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
          <el-menu-item index="index/hello" ><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-menu-item index="1" ><i class="el-icon-menu"></i>客户</el-menu-item>
          <el-menu-item index="2"><i class="el-icon-menu"></i>问题</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-menu"></i>档案</el-menu-item>
          <el-menu-item index="4"><i class="el-icon-menu"></i>系统</el-menu-item>
        </el-menu>
      </el-col>

    </div>




</template>
<script>
  export default {
    name: 'siderbar',
    data () {
      return {
        t: {
          to: 'hello'
        }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
