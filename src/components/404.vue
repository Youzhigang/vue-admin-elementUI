<template>
<div>
    <div class="error">

      <img src="../../static/404.png" alt="404">
      <router-link to='login'>

      <img src='../../static/click.png' alt="click">
      </router-link>
    </div>
</div>
</template>

<script>
export default {
  name: 'ErrorCompoent',
  data() {
    return {
      time: 3,
    }
  },
  mounted () {
    this.autoLink()
  },
  methods: {
    autoLink () {
      let timer = setInterval (()=> {
        // console.log(this.time)
        this.time -= 1
        if ( this.time <= 0) {
          clearInterval(timer)
          this.$router.push({name: 'login'})
        }
      }, 1000)
    }
  }
}
</script>


<style lang="scss">
.error{

    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
}
</style>
