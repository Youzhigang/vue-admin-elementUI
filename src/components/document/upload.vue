<template>

  <div>
      <vmodal @toggle='toggle'></vmodal>
      <div class="form-container">
      <div class="title">
          <span class="title-item">上传文件</span>
          <span class="title-close" @click="toggle"><Icon  type="close" ></Icon></span>
      </div>
      <Form ref="newUser" :label-width="80" style="min-height:150px;max-height:1000px">
        <Form-item>
          <Upload
          :on-success="handleSuccess"
          multiple
          action="//jsonplaceholder.typicode.com/posts/">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="toggle">关闭</Button>
        </Form-item>
    </Form>
  </div>
  </div>
</template>


<script>
import vmodal from '../../common/component/vmodal'

export default {
  name: 'upModal',
  components: {
    vmodal
  },
  methods: {
    toggle() {
      console.log(1234444)
      this.$emit('toggle')
    },
    handleSuccess() {
      this.$message({message:'上传成功', type:'success'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('../../common/css/modal.scss')

</style>
