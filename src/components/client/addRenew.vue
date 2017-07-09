<template>
  <div style="position:relative">
    <vmodal @toggle='toggle'></vmodal>
    <div class="form-container" style="width:600px;top:40%">
      <div class="title">
          <span class="title-item">服务续费</span>
          <span class="title-close" @click="toggle"><Icon  type="close" ></Icon></span>
      </div>

      <!--add form-->
      <Form  ref="addRenew"  :model="selectRow" :label-width="80" style="width:70%;margin:0 auto;">
        <Form-item label="客户名称: " prop='customName'>
          <div style="border-bottom:1px solid #333" v-text = "selectRow.customName"></div>
        </Form-item>
        <Form-item label="客户地址: " prop='customAddress'>
          <div style="border-bottom:1px solid #333" v-text = "selectRow.customAddress"></div>
        </Form-item>
        <Form-item label="客户简码: " prop='customCode'>
          <div style="border-bottom:1px solid #333" v-text = "selectRow.customCode"></div>
        </Form-item>
        <Form-item label="服务律师: " prop='serviceLawyer'>
          <div style="border-bottom:1px solid #333" v-text = "selectRow.serviceLawyer"></div>
        </Form-item>
        <Form-item label="服务费用: " >
          <Input v-model="serviceMoney"></Input>
        </Form-item>
        <!--<Form-item label="服务状态" >
          <Select v-model="newCustomer.serviceStatus" style="width:100px">
              <Option v-for="item in options" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
        </Form-item>-->
        <Form-item label="服务类型:"  >
           <Select v-model="serviceSelected" multiple style="width:260px">
            <Option v-for="item in serviceList" :value="item.value" :key="item">{{ item.label }}</Option>
          </Select>
        </Form-item>
         <Form-item label="选择日期">
            <Row>
                <Col span="11">
                    <Form-item prop="beginDate">
                        <Date-picker type="date" placeholder="选择开始日期" v-model="beginDate"></Date-picker>
                    </Form-item>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <Form-item prop="endDate">
                        <Date-picker type="date" placeholder="选择结束日期" v-model="endDate"></Date-picker>
                    </Form-item>
                </Col>
            </Row>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="confirmAdd('addRenew')">续费</Button>
        </Form-item>
      </Form>


    </div>
  </div>
</template>


<script>
import vmodal from '../../common/component/vmodal'




export default {
  name: 'addRenew',
  components: {
    vmodal
  },
  props: {

    selectRow: {
      type:Object,
      required:true,
      default(){
        return {}
      }
    }
  },
  methods: {
    toggle (){
      this.$emit('toggle')
    },
    confirmAdd(name) {
      if (this.serviceSelected.length === 0 ||
          this.beginDate ==='' ||
          this.endDate === '') {
            this.$message({ message: '表单验证失败, 必填项不能为空', type: 'error' })
            return
      } else if (this.beginDate > this.endDate) {
          this.$message({ message: '结束时间不能小于开始时间', type: 'error' })
          return
      } else {
           this.axios(this.Validate).then( res => {
             if (res.data.errcode !== '0') {
                  this.$message({ message: '登录失效, 请重新登录', type: 'error' })
                  this.$router.replace({name: 'login'})
                } else {
                  return this.axios.post(this.api + 'Customer/service', {
                    cusID: this.selectRow.id,
                    serviceType: this.serviceSelected.reduce((a,b) => a + b),
                    beginDate: this.beginDate,
                    endDate: this.endDate,
                    serviceMoney: this.serviceMoney
                  } )
                }
           }).then( res => {
             console.log(res)
           })
      }
      //this.$refs[name].validate((valid) => {
          //if (valid) {
              //  this.axios(this.Validate).then( res => {
              //   if (res.data.errcode !== '0') {
              //     this.$message({ message: '登录失效, 请重新登录', type: 'error' })
              //     this.$router.replace({name: 'login'})
              //   } else {
              //     return this.axios.post(this.api + 'Customer/modify', {
              //       customCode: this.newCustomer.customCode,
              //       customName: this.newCustomer.customName,
              //       customAddress: this.newCustomer.customAddress,
              //       serviceStatus: this.newCustomer.serviceStatus,
              //       serviceLawyer: this.newCustomer.serviceLawyer
              //     })
              //   }
              // }).then(res => {
              //   // console.log(res)
              //   this.$message({ message: res.data.resData, type: 'success' })
              //   setTimeout(()=>{
              //     this.$emit('toggle')
              //     this.$emit('addCus')
              //   }, 500)
              // }).catch(err => {
              //   console.log(err)
              //   this.$message({ message: '操作失败', type: 'error' })
              // })
              //this.$message({ message: '操作失败', type: 'error' })
          //} else {
             // this.$message({ message: '表单验证失败', type: 'error' })
          //}
      //})
    },

  },
  data(){
    return {
      serviceList: [
        {value: 1, label: '律师咨询'},
        {value: 2,  label: '云服务'}
      ],
      serviceMoney: 0,
      serviceSelected: [],
      beginDate: '',
      endDate: '',
      formRules: {
        beginDate:[{required: true,message: '不能为空',trigger: 'blur'}],
        endDate: [{required: true,message: '不能为空',trigger: 'blur'}],
        serviceSelected: [{required: true,message: '不能为空',trigger: 'blur'}],
      },
    }
  }
}
</script>

<style lang="scss">
@import url('../../common/css/index.scss')
</style>

