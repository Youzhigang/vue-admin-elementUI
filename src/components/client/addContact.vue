<template>
   <div style="position:relative">

  <vmodal @toggle='toggle'></vmodal>
  <div class="form-container">
      <div class="title">
          <span class="title-item">修改{{ this.index == 1 ? '联系人': this.index == 2 ? '法务' : '主管' }}{{customerID}}</span>
          <span class="title-close" @click="toggle"><Icon  type="close" ></Icon></span>
          <input type="hidden" :value="this.index">
      </div>

    <Form style="margin-right:50px;margin-top:30px" ref="formContact" :model="newContact" :rules="ruleValidate" :label-width="80">
        <Form-item label="姓名" prop="name">
          <Input v-model="newContact.name"></Input>
        </Form-item>
        <Form-item label="电话" prop="tel">
          <Input v-model="newContact.tel"></Input>
        </Form-item>
        <Form-item label="微信" prop="wx">
          <Input v-model="newContact.wx"></Input>
        </Form-item>
        <Form-item label="QQ" prop="qq">
          <Input v-model="newContact.qq"></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="add('formContact')">添加</Button>
        </Form-item>
    </Form>
    </div>
  </div>
</template>


<script>
import vmodal from '../../common/component/vmodal'

export default {
  name: 'contact',
  props: {
    index: {
      type: String,
      required: true,
    },
    customerID: {
      type: String,
      required: true,
    },
    contactStr: {
      type: String,
      default: ''
    }
  },
  mounted() {
//    "联系人,通天塔,wx:12321312,qq:12312312,tel:12312312"

    // console.log(this.nextTick)
    // console.log(this.$nextTick)
    this.$nextTick(()=> {
      // console.log(this.contactStr)
      if (this.contactStr && this.contactStr !== '') {
        let t = this.contactStr.split(',')
        this.newContact.name = t[0] || ''
        this.newContact.wx = t[1].split(':')[1] || ''
        this.newContact.qq = t[2].split(':')[1] || ''
        this.newContact.tel = t[3].split(':')[1] || ''
      }
    })
  },
  methods: {
    toggle(){
      console.log(21312)
      this.$emit('toggle')
    },
    add(name){
      let cstr = '';
      //this.index == '1' ? cstr += '联系人,' : this.index == '2' ?  cstr += '法务,' : cstr += '主管,'
      cstr += this.newContact.name.trim()
      let wxstr = this.newContact.wx.trim() ? 'wx:'+this.newContact.wx.trim(): ''
      let qqstr = this.newContact.wx.trim() ? 'qq:'+this.newContact.qq.trim(): ''
      let telstr =  this.newContact.tel.trim() ? 'tel:'+this.newContact.tel.trim(): ''
      let contactstr = [cstr, wxstr, qqstr, telstr].join(",")
       this.$refs[name].validate((valid) => {
        if (valid) {
                        // this.$Message.success('提交成功!');
          this.axios.get(this.Validate).then( res => {
            if (res.data.errcode !== '0') {
                this.$message({
                  message: '登录失效, 请重新登录',
                  type: 'error'
                })
                // this.$router.replace({path:'login'})
                this.$router.replace({name: 'login'})
              } else {
                return this.axios.get( this.api + 'Customer/contract',
                { params: { cusid: this.customerID, contract: contactstr,argindex: this.index }})
            }
          }).then( res => {
            console.log(res)
            this.$Message.info(res.data.resData);
            this.$emit('addContact', contactstr, this.index)
            setTimeout(()=>{this.$emit('toggle'), 500})
          } )
        } else {
            this.$Message.error('表单验证失败!');
            return
        }
    })


    }
  },
  components: {
    vmodal
  },
   data(){
    return {
      newContact: {
        name: '',
        wx:'',
        qq: '',
        tel: ''
      },
      ruleValidate: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur'}],
        // wx:[{ required: true, message: '不能为空', trigger: 'blur'}],
        // qq: [{ required: true, message: '不能为空', trigger: 'blur'}],
        tel: [{ required: true, message: '电话不能为空', trigger: 'blur'}],
      }
    }
  },
}
</script>

<style lang="scss">
@import url('../../common/css/index.scss')
</style>

