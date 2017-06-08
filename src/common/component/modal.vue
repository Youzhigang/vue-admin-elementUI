<template>
  <div class="bg" ref="bgDom">
    <div class="wrapper">
      <div class="title" @click.stop='test'> <slot name='title'></slot><i @click.stop = 'close' class="el-icon-close"></i></div>
      <div class="content">123</div>
      <div class="footer">
         <el-button size='small'>取消</el-button >
         <el-button size='small' type="primary">确认</el-button >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modalBox',
  methods: {
    close () {
      console.log('close');
      // this.$refs['bgDom'].style.display = 'none'
      this.$emit('close')
    },
    test () {
      console.log('object');
    }
  }
}
</script>

<style lang="scss" scoped>
$titleHeight: 40px;

.bg{
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(7,17,27,0.5);
  z-index: 100;
  top: 0;
  left: 0;
  .wrapper{
    width: 30%;
    height: 50%;
    position: absolute;
    background-color: #eee;
    border-radius: 5px;
    z-index: 150;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    .title{
      // border-bottom: 1px solid #000;
      height: $titleHeight;
      line-height: $titleHeight;
      display: inline-block;
      i{
        position: absolute;
        right: 20px;
        top: 10px;
        display: inline-block;
        // padding: 10px;
        &:hover{
          cursor: pointer;
        }
      }
    }
    .content{
      flex: 1;
      // border-bottom: 1px solid #000;
    }
    .footer{
      // border-bottom: 1px solid #000;
      height: $titleHeight;
      line-height: $titleHeight;
      text-align: right;
      padding-right: 20px;
      // padding-bottom: 30px;
      margin-bottom: 10px;
    }
  }
}
</style>
