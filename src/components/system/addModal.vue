<template>
  <div>
      <vmodal @toggle='toggle'></vmodal>
      <div class="form-container">
      <div class="title">
          <span class="title-item">{{action=='add' ? '添加用户': '修改用户'}}</span>
          <span class="title-close" @click="toggle"><Icon  type="close" ></Icon></span>
      </div>
      <!--add-->
    <Form v-if="action=='add'" ref="newUser" :model="newUser" :rules="ruleValidate" :label-width="80">
        <Form-item label="用户姓名" prop="userName">
            <Input v-model="newUser.userName"></Input>
          </Form-item>
          <Form-item label="登录账号" prop="loginCode">
            <Input v-model="newUser.loginCode"></Input>
          </Form-item>
          <Form-item label="登录密码" prop="loginPwd">
            <Input v-model="newUser.loginPwd" type='password'></Input>
          </Form-item>
          <Form-item label="重复密码" prop="loginPwd2">
            <Input v-model="newUser.loginPwd2" type='password'></Input>
          </Form-item>

          <Form-item label="用户角色" prop='roleType'>
            <Select v-model="newUser.roleType" style="width:200px">
              <Option v-for="item in options" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
           <Form-item>
            <Button type="primary" @click="handleSubmit1('newUser')">提交</Button>
          </Form-item>
      </Form>
        <!--edit-->
    <Form v-if="action=='edit'" ref="editRow" :model="editRow" :rules="ruleValidate" :label-width="80">
        <Form-item label="用户姓名" prop="userName">
            <span>{{editRow.userName}}</span>
          </Form-item>
          <Form-item label="登录账号" prop="loginCode">
            <span>{{editRow.loginCode}}</span>
          </Form-item>
          <Form-item label="登录密码" prop="loginPwd">
            <Input v-model="editRow.loginPwd" type='password'></Input>
          </Form-item>
          <Form-item label="重复密码" prop="loginPwd2">
            <Input v-model="editRow.loginPwd2" type='password'></Input>
          </Form-item>
          <Form-item label="用户角色" prop='roleType'>
            <Select v-model="editRow.roleType" style="width:200px">
              <Option v-for="item in options" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
           <Form-item>
            <Button type="primary" @click="handleSubmit2('editRow')">提交</Button>
        </Form-item>
    </Form>
  </div>
  </div>
</template>


<script>
import vmodal from '../../common/component/vmodal'


export default {

  name: 'addModal',
  props: {
    action:{
      type:String,
      required:true,
    },
    editRow: {
      type: Object,
      required:true
    }
  },
  components: {
    vmodal
  },
  methods: {
    test(){console.log(213)},
    toggle() {
      this.$emit('toggle')
    },
    handleSubmit1(name) {
      console.log(name)
      this.$refs[name].validate((valid) => {
            if (valid && this.newUser.loginPwd === this.newUser.loginPwd2) {
                // this.$Message.success('提交成功!');
              this.axios.get(this.api + 'User/modify',
                      {params:{
                        strOperate: 'add',
                        UserName: this.newUser.userName,
                        LoginCode: this.newUser.loginCode,
                        RoleType: this.newUser.roleType,
                        LoginPwd: this.newUser.loginPwd
                     }}).then(res => {
                       console.log(res)
                     })
            } else {
                this.$Message.error('表单验证失败!');
            }
      })
    },
    handleSubmit2(name) {
      this.$refs[name].validate((valid) => {
            if (valid && this.newUser.loginPwd === this.newUser.loginPwd2) {
                // this.$Message.success('提交成功!');
              this.axios.get(this.api + 'User/modify',
                      {params:{
                        id: this.editRow.id,
                        userName: this.newUser.userName,
                        loginCode: this.newUser.loginCode,
                        roleType: this.newUser.roleType,
                        loginPwd: this.newUser.loginPwd
                     }}).then(res => {
                       console.log(res)
                     })
            } else {
                this.$Message.error('表单验证失败!');
            }
      })
    }
  },
   data () {
      return {
        options: [{
            value: 'admin',
            label: '管理员'
          },
          {
            value: 'guest',
            'label': '普通用户'
          }
        ],
        newUser: {
                userName: '',
                loginCode: '',
                loginPwd: '',
                loginPwd2: '',
                roleType: ''
            },
            ruleValidate: {
            userName: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
            loginCode: [{required: true, message: '用户名不能为空', trigger: 'blur' }],
            loginPwd: [{required: true, message: '密码不能为空', trigger: 'blur' }],
            loginPwd2: [{required: true, message: '密码不能为空', trigger: 'blur' }],
            roleType: [{required: true, message: '角色不能为空', trigger: 'blur' }]

            }
        }
    },

}
</script>



<style lang="scss" scoped>
@import url('../../common/css/index.scss')

</style>
