<template>

  <div style="position:relative">
    <div class="modal" @click="toggle()" ref="modal-hook"></div>
  </div>

</template>

<script>
export default {
  name: 'vmodal',
  methods: {
    toggle() {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="scss">
.modal {
  font-size: 14px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0,0,0,0.3);

}
</style>
