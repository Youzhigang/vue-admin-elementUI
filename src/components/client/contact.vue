<template>
<!--<div class="contact">
  {{name}}
  {{wx}}
  {{tel}}
  {{title}}
</div>-->
<div>
  <el-dialog
  title="提示"
  :visible.sync="show"
  size="tiny"
  >
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

</div>
</template>

<script>
export default {
    name: 'contact',
    props: {
      dislogVisible: {
        type:Boolean
      },
      name: {
        type: String
      },
      wx: {
        type: String
      },
      tel: {
        type: String
      },
      title: {
        type: String
      }
    },
    created(){
      this.show = this.dislogVisible
    }
}
</script>

<style lang="scss">
.contact{
  background-color: yellowgreen;
  width: 150px;
  height: 100px;
  position: absolute;
  left:500px;
  top: 0px;
  z-index:10000000;
}
</style>
