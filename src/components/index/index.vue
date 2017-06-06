<template>
  <div class="container">
    <div class="left">
      <siderbar></siderbar>
    </div>

    <div class="middle">
      <headerNav></headerNav>

      <transition name="fade" mode="out-in">
        <transition name= "slide-left">
          <router-view class="child-router"></router-view>
        </transition>
      </transition>
    </div>

  </div>


  </el-row>
</template>

<script>
  import siderbar from '../siderbar/siderbar'
  import headerNav from '../breadcrumb/headerNav.vue'

  export default {
    name: 'index',
    components: {
      siderbar, headerNav
    },
    data () {
      return {

      }
    },
    created(){
      console.log(this.$route.name);
    },
    watch: {
      $route: function (to, from) {
        // console.log('to', to);
        // console.log('from', from);
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  }

</script>

<style lang="scss" scoped>

.container{
  display: flex;
  height: 100%;
  .left{
    flex:0 200px;
    // box-shadow: 1px 0px 1px 1px #283443;
  }
  .middle{
    flex: 1;
    margin-left: 5px;
    box-shadow: 1px 0px 1px 2px #283443;
    .fade-enter{
      opacity: 0;
    }
    .fade-enter-active{
      transition: 0.5s ease;
    }
    .fade-leave{

    }
    .fade-leave-active{
      opacity: 0;
      transition: 0.5s ease;
    }
    // .fade-enter-active, .fade-leave-active {
    //   transition: opacity .5s ease;
    // }
    // .fade-enter, .fade-leave-active {
    //   opacity: 0
    // }
    .child-router {
      // position: absolute;
      transition: all .5s cubic-bezier(.55,0,.1,1);
    }
    .slide-left-enter{
      opacity: 0;
      transform: translateX(300px);
    }
    .slide-left-enter-active{
      // transition: all .5s cubic-bezier(.55,0,.1,1);
    }
    .slide-left-leave{
      opacity: 0;
    }
    .slide-left-leave-active{

    }
    .slide-right-enter{
      opacity: 0;
    }
    // .slide-left-enter, .slide-right-leave-active {
    //   opacity: 0;
    //   -webkit-transform: translate(300px, 0);// 一开始的时候向右偏移
    //   transform: translate(300px, 0);
    // }
    // .slide-left-leave-active, .slide-right-enter {
    //   opacity: 0;
    //   -webkit-transform: translate(-300px, 0);
    //   transform: translate(-300px, 0);
    // }
  }
}


</style>
