<template>
  <div class="container">
    <div class="left">
      <siderbar></siderbar>
    </div>

    <div class="middle">
      <router-view></router-view>
      middlelorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia consequuntur aperiam quos illum, ducimus
      et cupiditate odit, ea voluptatibus veritatis repudiandae repellat vel amet soluta maxime fuga rerum saepe molestiae.
    </div>

  </div>


  </el-row>
</template>

<script>
  import siderbar from '../siderbar/siderbar'

  export default {
    name: 'index',
    components: {
      siderbar
    }
  }

</script>

<style lang="scss" scoped>

.container{
  display: flex;
  height: 100%;
  .left{
    flex:0 200px;
  }
  .middle{
    flex: 1;
  }
}
</style>
