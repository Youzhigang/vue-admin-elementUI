<template>
  <div style="position:relative">
  <!--<div class="modal" @click="toggle()" ref="modal-hook"></div>-->
  <vmodal @toggle='toggle'></vmodal>
  <div class="form-container">
      <div class="title">
          <span class="title-item">答复问题</span>
          <span class="title-close" @click="toggle"><Icon  type="close" ></Icon></span>
      </div>

      <Form ref="formCustom" :model="replyData"  :label-width="80">
        <Form-item label="情况描述" prop="questionDesc">
          <span>{{replyData.questionDesc}}</span>
        </Form-item>
        <Form-item label="问题类别" prop="questionType">
          <span>{{replyData.questionType}}</span>
        </Form-item>
        <Form-item label="具体内容" prop="questionContent">
          <span>{{replyData.questionContent}} </span>

        </Form-item>


        <Form-item label="答复内容" prop="questionContent">
            <Input v-model='reconten' type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item>

            <Button type="primary" @click="replySave()">回复</Button>
        </Form-item>
    </Form>

    </div>
  </div>


</template>

<script>
import vmodal from '../../common/component/vmodal'


export default {
  name: 'replyModal',
  components: {
    vmodal
  },
  props: {
    replyData: {
      type:Object,
      default(){
        return {}
      }
    }
  },
  mounted (){

    this.axios.get(this.Validate).then(
      res => {
        if (res.data.errcode !== '0') {
          this.$message({
            message: '登录失效, 请重新登录',
            type: 'error'
          })
        // this.$router.replace({path:'login'})
          this.$router.replace({name: 'login'})
        } else {
          return this.axios.get(this.api + 'Reply/loadone', { params: {'qusid': this.replyData.id}} )
        }
      }
    ).then(res => {
      console.log(res)
      this.reconten = res.data.resReply
    })
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },
    replySave() {
      // console.log(1231231231231)
      // console.log(this.replyData.questionStatus,1231231231231231)
      if (this.replyData.questionStatus === 1) {
        this.$Message.error('该问题已经回复, 不能重复打复!')
        return false
      }
      if (this.reconten.trim() !== '') {
        this.axios.get(this.Validate).then(
        res => {
          if (res.data.errcode !== '0') {
            this.$message({
              message: '登录失效, 请重新登录',
              type: 'error'
            })
          // this.$router.replace({path:'login'})
            this.$router.replace({name: 'login'})
          } else {
            return this.axios.get(this.api + 'Reply/reply', { params: {'qusid': this.replyData.id, reconten: this.reconten }} )
          }
        }
      ).then(res => {
          console.log(res)
          this.$message({
              message: res.data.resMsg || '回复成功',
              type: 'success'
          })
          this.reconten = ''
          this.$emit('changeStatus', this.replyData.id)
          setTimeout(
            ()=> {
              this.$emit('toggle')
            },800
          )
        }).catch(
          err => {
            this.$message({
              message: '回复失败',
              type: 'error'
          })
          }
        )
      } else {
         this.$message({
              message: '回复内容不能为空',
              type: 'error'
            })
        return
      }
    }
  },
  data() {
    return {
      reconten: ''
    }
  }
}
</script>

<style lang="scss" >
@import url('../../common/css/index.scss')

</style>
