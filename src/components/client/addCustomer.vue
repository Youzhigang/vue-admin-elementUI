<template>
  <div style="position:relative">
    <vmodal @toggle='toggle'></vmodal>
    <div class="form-container">
      <div class="title">
          <span class="title-item">客户详情</span>
          <span class="title-close" @click="toggle"><Icon  type="close" ></Icon></span>
      </div>

      <!--add form-->
      <Form v-if="action=='add'" ref="addCustom" :rules='formRules' :model="newCustomer"  :label-width="80">
        <Form-item label="客户名称" prop="customName">
          <Input v-model="newCustomer.customName"></Input>
        </Form-item>
        <Form-item label="客户地址" prop="customAddress">
          <Input v-model="newCustomer.customAddress"></Input>
        </Form-item>
        <Form-item label="客户简码" prop="customCode">
          <Input v-model="newCustomer.customCode"></Input>
        </Form-item>
        <Form-item label="服务律师" prop="serviceLawyer">
          <Input v-model="newCustomer.serviceLawyer"></Input>
        </Form-item>
        <Form-item label="服务状态" >
          <Select v-model="newCustomer.serviceStatus" style="width:100px">
              <Option v-for="item in options" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="confirmAdd('addCustom')">添加</Button>
        </Form-item>
      </Form>

        <!--edit form-->
       <Form v-if="action=='edit'" ref="editCustom" :rules='formRules' :model="editCustomer"  :label-width="80">
        <Form-item label="客户名称" prop="customName">
          <Input v-model="editCustomer.customName"></Input>
        </Form-item>
        <Form-item label="客户地址" prop="customAddress">
          <Input v-model="editCustomer.customAddress"></Input>
        </Form-item>
        <Form-item label="客户简码" prop="customCode">
          <Input v-model="editCustomer.customCode"></Input>
        </Form-item>
        <Form-item label="服务律师" prop="serviceLawyer">
          <Input v-model="editCustomer.serviceLawyer"></Input>
        </Form-item>
        <Form-item label="服务状态">
          <!--<Input v-model="editCustomer.serviceStatus"></Input>-->
            <Select v-model="editCustomer.serviceStatus" style="width:100px">
              <Option v-for="item in options" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="confirmEdit('editCustom')">确定</Button>
        </Form-item>
      </Form>

    </div>
  </div>
</template>


<script>
import vmodal from '../../common/component/vmodal'

export default {
  name: 'addCustomer',
  components: {
    vmodal
  },
  props: {
    action: {
      type: String,
      required: true
    },
    editCustomer: {
      type:Object,
      // required:true
      default(){
        return {
           id: '',
          customName: '',
          customAddress: '',
          customCode: '',
          serviceStatus: '',
          serviceLawyer: '',
        }
      }
    }
  },
  methods: {
    toggle (){
      console.log(123)
      this.$emit('toggle')
    },
    confirmAdd(name) {
      this.$refs[name].validate((valid) => {
          if (valid && this.newCustomer.serviceStatus !== '') {
               this.axios(this.Validate).then( res => {
                if (res.data.errcode !== '0') {
                  this.$message({ message: '登录失效, 请重新登录', type: 'error' })
                  this.$router.replace({name: 'login'})
                } else {
                  return this.axios.post(this.api + 'Customer/modify', {
                    customCode: this.newCustomer.customCode,
                    customName: this.newCustomer.customName,
                    customAddress: this.newCustomer.customAddress,
                    serviceStatus: this.newCustomer.serviceStatus,
                    serviceLawyer: this.newCustomer.serviceLawyer
                  })
                }
              }).then(res => {
                // console.log(res)
                this.$message({ message: res.data.resData, type: 'success' })
                setTimeout(()=>{
                  this.$emit('toggle')
                  this.$emit('addCus')
                }, 500)
              }).catch(err => {
                console.log(err)
                this.$message({ message: '操作失败', type: 'error' })
              })
          } else {
              this.$message({ message: '表单验证失败', type: 'error' })
          }
      })
    },
    confirmEdit(name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.axios(this.Validate).then( res => {
                if (res.data.errcode !== '0') {
                  this.$message({ message: '登录失效, 请重新登录', type: 'error' })
                  this.$router.replace({name: 'login'})
                } else {
                  return this.axios.post(this.api + 'Customer/modify', {
                    id: this.editCustomer.id,
                    customCode: this.editCustomer.customCode,
                    customName: this.editCustomer.customName,
                    customAddress: this.editCustomer.customAddress,
                    serviceStatus: this.editCustomer.serviceStatus,
                    serviceLawyer: this.editCustomer.serviceLawyer
                  })
                }
              }).then(res => {
                // console.log(res)
                this.$message({ message: res.data.resData, type: 'success' })
                setTimeout(()=>{
                  this.$emit('toggle')
                  this.$emit('addCus')
                },
                   500)
              }).catch(err => {
                console.log(err)
                this.$message({ message: '操作失败', type: 'error' })
              })
          } else {
              this.$message({ message: '表单验证失败', type: 'error' })
          }
      })
    }
  },
  data(){
    return {
      options: [
        {value: 1, label: '有效'},
        {value: 0,  label: '无效'}
      ],

      newCustomer: {
        id: '',
        customName: '',
        customAddress: '',
        serviceStatus: '',
        serviceLawyer: '',
        modifyDate: new Date()
      },
      formRules: {
        customName:[{required: true,message: '不能为空',trigger: 'blur'}],
        customAddress: [{required: true,message: '不能为空',trigger: 'blur'}],
        customCode: [{required: true,message: '不能为空',trigger: 'blur'}],
        shortName: [{required: true,message: '不能为空',trigger: 'blur'}],
        serviceStatus: [{required: true,message: '不能为空',trigger: 'blur'}],
        serviceLawyer: [{required: true,message: '不能为空',trigger: 'blur'}],
      },
    }
  }
}
</script>

<style lang="scss">
@import url('../../common/css/index.scss')
</style>

