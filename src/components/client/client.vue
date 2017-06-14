<template>
  <div class="client">

    <!--客户列表-->
    <div class="top">
      <el-button :plain="true"  icon="plus" @click='addHandler'>新增</el-button >
      <el-button :plain="true"  icon="edit" @click='editHandler'>编辑</el-button >
      <el-button :plain="true"  icon="share" @click='renewHandler'>续费</el-button >
      <el-button :plain="true"  icon="delete" @click='disableHandler'>禁用</el-button >
      <!--<el-button :plain="true"  icon="search">搜索</el-button >-->
      <el-button :plain="true" >服务<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
    <div class="table-container">
        <el-table :data="tableData"  border stripe @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
          <el-table-column prop="person" label="联系人" width="280">
            <template scope="scope">
              <span v-for="(p, index) in scope.row.person" style="margin-right:10px">
                <el-popover trigger="hover" placement="top">
                    <p>姓名: {{p.name}}</p>
                    <p>QQ: {{p.qq }}</p>
                    <p>WeChat: {{p.wx}}</p>
                    <p>Tel: {{p.tel}}</p>
                    <p>职务: {{p.type}}</p>
                    <span slot="reference" class="name-wrapper"

                    @dblclick='editContactHandle(scope.$index, p, index)'
                    >
                      <el-tag :type="typeMap[index]" style="font-size:14px"  :closable="true" @close='handleClose(scope.row.person, index)'> {{ p.name }}
                        <!--<el-icon  name="del"></el-icon>-->
                        <!--<el-icon  name="edit"></el-icon>-->
                      </el-tag>
                    </span>
                </el-popover>
              </span>

                 <i class="el-icon-plus" @click='addContact(scope.$index, scope.row.person)' v-show="scope.row.person.length && scope.row.person.length <3" style="color:#B04"></i>
                 <!--<el-icon name="plus" style="size:10px" v-show="scope.row.person.length && scope.row.person.length <3" @click='addContact'>123</el-icon>-->
              </template>
          </el-table-column>
           <el-table-column prop="address" label="地址" width="180"></el-table-column>
           <el-table-column  label="状态" width="80">
              <template scope="scope">
                <span  v-text="scope.row.status? '有效' : '无效' "></span>
              </template>
           </el-table-column>
          <el-table-column prop="date1" label="开始日期" width="150"></el-table-column>
          <el-table-column prop="date2" label="结束日期" width="150"></el-table-column>
          <el-table-column prop="observer" label="观察者"  ></el-table-column>
        </el-table>
    </div>
    <div class="page-footer">
        <el-pagination layout="prev, pager, next" :total="510" small></el-pagination>
    </div>

    <!--add contact-->
    <el-dialog title='新增联系人' :visible.sync='isShowContactCard'>
      <el-form :model='newContact' label-width='80px'>
         <el-form-item label="姓名"  prop='name'>
            <el-input auto-complete="off"  v-model='newContact.name'></el-input>
          </el-form-item>
          <el-form-item label="QQ"  prop='qq'>
            <el-input auto-complete="off"  v-model='newContact.qq'></el-input>
          </el-form-item>
          <el-form-item label="微信"  prop='wx'>
            <el-input auto-complete="off"  v-model='newContact.wx'></el-input>
          </el-form-item>
          <el-form-item label="电话"  prop='tel'>
            <el-input auto-complete="off"  v-model='newContact.tel'></el-input>
          </el-form-item>
           <el-form-item label="职务"  prop='type'>
            <el-input auto-complete="off"  v-model='newContact.type'></el-input>
          </el-form-item>
           <div class="button-wrapper">
            <el-form-item>
              <el-button type="primary" @click="addContactItem">确定</el-button>
            </el-form-item>
          </div>
      </el-form>
    </el-dialog>

    <!--edit contact-->
    <el-dialog title='编辑联系人' :visible.sync='isShowEditContactCard'>
      <el-form :model='editContact' label-width='80px'>
         <el-form-item label="姓名"  prop='name'>
            <el-input auto-complete="off"  v-model='editContact.name'></el-input>
          </el-form-item>
          <el-form-item label="QQ"  prop='qq'>
            <el-input auto-complete="off"  v-model='editContact.qq'></el-input>
          </el-form-item>
          <el-form-item label="微信"  prop='wx'>
            <el-input auto-complete="off"  v-model='editContact.wx'></el-input>
          </el-form-item>
          <el-form-item label="电话"  prop='tel'>
            <el-input auto-complete="off"  v-model='editContact.tel'></el-input>
          </el-form-item>
           <el-form-item label="职务"  prop='type'>
            <el-input auto-complete="off"  v-model='editContact.type'></el-input>
          </el-form-item>
           <div class="button-wrapper">
            <el-form-item>
              <el-button type="primary" @click="editContactItem">确定</el-button>
            </el-form-item>
          </div>
      </el-form>
    </el-dialog>

    <!--add-->
    <el-dialog title="新增" :visible.sync="showAddDialog" width='40%' >
        <el-form :model="formData"  :rules='formRules' ref="addForm" label-width="80px">
          <el-form-item label="客户名称"  prop='name'>
            <el-input auto-complete="off"  v-model='formData.name'></el-input>
          </el-form-item>
          <el-form-item label="客户地址" prop='address'>
          <el-input auto-complete="off" v-model='formData.address'></el-input>
        </el-form-item>
        <el-form-item label="客户简称" prop='shortName'>
          <el-input auto-complete="off" v-model='formData.shortName'></el-input>
        </el-form-item>
        <!--<el-form-item label="客户编码" prop='person'>
          <el-input auto-complete="off" v-model='formData.person'></el-input>
        </el-form-item>-->
        <el-form-item label="服务律师" prop='observer'>
          <el-input auto-complete="off" v-model='formData.observer'></el-input>
        </el-form-item>
        <el-form-item label="到期时间"  prop='date'>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </el-form-item>
          <div class="button-wrapper">
            <el-form-item>
              <el-button type="primary" @click="addItem">保存</el-button>
              <el-button @click="resetForm('addForm')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
    </el-dialog>

    <!--edit -->
    <el-dialog title="编辑" :visible.sync="showEditDialog">
        <el-form  label-width="80px" :model = 'selectRow'>
          <el-form-item label="客户名称"  prop='name' >
            <el-input auto-complete="off" v-model='selectRow.name'></el-input>
          </el-form-item>
          <el-form-item label="客户地址" prop='address'>
          <el-input auto-complete="off" v-model='selectRow.address'></el-input>
        </el-form-item>
        <el-form-item label="客户简称" prop='shortName'>
          <el-input auto-complete="off" v-model='selectRow.shortName'></el-input>
        </el-form-item>
        <!--<el-form-item label="客户编码" prop='person'>
          <el-input auto-complete="off" v-model='selectRow.person' ></el-input>
        </el-form-item>-->
        <el-form-item label="服务律师" prop='observer'>
          <el-input auto-complete="off" v-model='selectRow.observer' ></el-input>
        </el-form-item>
        <el-form-item label="到期时间"  prop='date2'>
          <el-date-picker
            v-model="selectRow.date2"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </el-form-item>
          <div class="button-wrapper">
            <el-form-item>
              <el-button type="primary" @click="saveItem">保存</el-button>
              <!--<el-button @click="resetForm('addForm')">重置</el-button>-->
            </el-form-item>
          </div>
        </el-form>
    </el-dialog>

    <!--续费-->
    <el-dialog title="续费" :visible.sync="showRenewDialog">
        <el-form  label-width="80px" :model = 'selectRow'>
          <el-form-item label="客户名称"  prop='name' >
            <el-input auto-complete="off" :value='selectRow.name'></el-input>
          </el-form-item>
          <el-form-item label="客户地址" prop='address'>
          <el-input auto-complete="off" :value='selectRow.address'></el-input>
        </el-form-item>
        <!--<el-form-item label="客户简称" prop='shortName'>
          <el-input auto-complete="off" :value='selectRow.shortName'></el-input>
        </el-form-item>-->
        <!--<el-form-item label="客户编码" prop='person'>
          <el-input auto-complete="off" :value='selectRow.person' ></el-input>
        </el-form-item>-->
        <el-form-item label="服务律师" prop='observer'>
          <el-input auto-complete="off" :value='selectRow.observer' ></el-input>
        </el-form-item>
        <el-form-item label="到期时间"  prop='date2'>
          <el-date-picker
            v-model="selectRow.date2"
            type="daterange"
             align="right"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
          <div class="button-wrapper">
            <el-form-item>
              <el-button type="primary" @click="renewItem">续费</el-button>
              <!--<el-button @click="resetForm('addForm')">重置</el-button>-->
            </el-form-item>
          </div>
        </el-form>
    </el-dialog>
  </div>
</template>


<script>
// import modalBox from '../../common/component/modal'
import {deepClone} from '../../common/js/util.js'
import contact from './contact'

export default {
  name: 'client',
  created (){
    this.typeMap = ['danger', 'primary', 'success']
  },
  components: {
    contact
  },
  methods: {
    addContactItem() {
      // this.selectIndex
      this.tableData[this.selectIndex].person.push(this.newContact)
      this.isShowContactCard = ! this.isShowContactCard
    },
    editContactItem() {

      /**
       * ajax
       */
      this.isShowEditContactCard = !this.isShowEditContactCard
    },
    // rowClick() {
    //   console.log(123);
    // },
    handleClose(item, index) {
        this.$confirm('删除该联系人, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          item.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      console.log(item, index);
      console.log('delete tag');
    },
    addContact(index1,data) {
      console.log('addHandler')
      console.log(index1,data)
      this.isShowContactCard = ! this.isShowContactCard
      this.selectIndex = index1
    },
    // editContact(ev, item, index) {
    //   const h = this.$createElement;
    //   console.log(123);
    //   console.log(item)
    //   this.$msgbox({
    //     title: '修改联系人',
    //     message: h(
    //       'div', null, [
    //         h('label', null, '联系人'+ (index + 1)),
    //         h('el-input',{attrs:{id:'contact_name'+ (index +1) ,value:item.name}}),
    //         h('label', null, 'QQ'),
    //         h('el-input',{attrs:{id:'contact_qq'+ (index +1) ,value:item.qq}}),
    //         h('label', null, 'WeChat'),
    //         h('el-input',{attrs:{id:'contact_wechat'+ (index +1) ,value:item.wechat}}),
    //         h('label', null, 'Tel'),
    //         h('el-input',{attrs:{id:'contact_tel'+ (index +1) ,value:item.tel}}),
    //       ],

    //     )
    //   })

    // },
    editContactHandle (index1, item, index2) {
      this.editContact = item
      this.isShowEditContactCard = !this.isShowEditContactCard
    },
    addHandler () {
      this.showAddDialog = !this.showAddDialog
    },
    editHandler () {
      if (this.multipleSelection.length === 0 ){
        this.$alert('At least select one row!!!')
      } else if (this.multipleSelection.length > 1) {
        this.$alert('You select to many rows!!!')
      } else {

        this.showEditDialog = !this.showEditDialog
      }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    saveItem() {
        // ajax

        if (typeof this.selectRow.date === 'string') {
          this.selectRow.date2 = new Date(this.selectRow.date2).toLocaleDateString()
        } else {
          this.selectRow.date2 = this.selectRow.date2.toLocaleDateString();
        }
        this.showEditDialog = false
    },
    renewItem() {
        if (typeof this.selectRow.date2[1] === 'object'){
          this.selectRow.date2[1] = this.selectRow.date2[1].toLocaleDateString()
        }else if (typeof this.selectRow.date2[1] === 'string') {
          this.selectRow.date2[1] = new Date(this.selectRow.date2[1]).toLocaleDateString()
        } else {
          this.selectRow.date2[1] = this.selectRow.date2[1].toLocaleDateString();
        }
        this.showRenewDialog = false
    },
    addItem() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) {
          this.$alert('字段不能为空')
        } else if (this.date === '') {
          this.$alert('时间不能为空')
        } else {
          console.log('ok');
          this.$set(this.formData,'date2', this.date.toLocaleDateString() )
          this.tableData.push(deepClone(this.formData))
          this.showAddDialog = false
        }
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    renewHandler() {
      if (this.multipleSelection.length === 0 ){
        this.$alert('At least select one row!!!')
      } else {
        // this.multipleSelection.forEach( i => {
        //   i.status = true
        // })
        this.showRenewDialog = !this.showRenewDialog
      }
    },
    disableHandler () {
      if (this.multipleSelection.length === 0 ){
        this.$alert('At least select one row!!!')
      } else {

        this.multipleSelection.forEach( i => {
          i.status = false
        })
      }
    }
  },
  computed: {
    selectRow () {
      return this.multipleSelection[0] || {}
    }
  },
   data() {
      return {
        date: '',
        selectIndex: -1,
        showRenewDialog: false,
        isShowEditContactCard:false,
        isShowContactCard: false,
        multipleSelection: [],
        showAddDialog: false,
        showEditDialog: false,
        pickerOptions0 : {
          disableDate(time) {
            return time.getTime() < Date.now() -8.64e7
          }
        },
       formRules: {
          name:[{required: true,message: '不能为空',trigger: 'blur'}],
          address: [{required: true,message: '不能为空',trigger: 'blur'}],
          shortName: [{required: true,message: '不能为空',trigger: 'blur'}],
          person: [{required: true,message: '不能为空',trigger: 'blur'}],
          observer: [{required: true,message: '不能为空',trigger: 'blur'}],
          // date: [{required: true,message: '不能为空',trigger: 'blur'}]
        },
        formData: {
          name:'托尔斯泰',
          address: 'America',
          shortName: 'leifu',
          person: [{show:false,type:'法务',name:'9527',qq:'123',tel:'',wx:'456'}],
          observer: 'Jack Mao',
          status: true
         },
         editContact: {},
         newContact:{
            name: '熊大',
            type: '法务',
            qq: '123456',
            wx: 'wx122312',
            tel: '54525451'
         },
        tableData: [{
          date1: '2016-5-2',
          date2: '2017-5-2',
          name: '常熟英迈',
          person: [{show:false,type:'法务',name:'赵五',qq:'123',tel:'',wx:'456'},{show:false,type:'主管',name:'阿Q',qq:'',wx:'',tel:''}],
          address: 'xxxxx',
          observer:"李四",
          status: true
        }, {
          date1: '2016-5-4',
          date2: '2017-5-4',
          name: '常熟英迈',
          person: [{show:false,name:'李四',type:'联系人',qq:'',wx:'test',tel:'110'},{show:false,type:'法务',name:'赵五',qq:'123',tel:'',wx:'456'},{show:false,type:'主管',name:'阿Q',qq:'',wx:'',tel:''}],
          address: 'xxxxx',
          observer:"李四",
          status: true
        }, {
          date1: '2016-5-1',
          date2: '2017-5-1',
          name: '常熟英迈',
          person: [{show:false,type:'法务',name:'赵五',qq:'123',tel:'',wx:'456'},{show:false,type:'主管',name:'阿Q',qq:'',wx:'',tel:''}],
          address: 'xxxxx',
          observer:"李四",
          status: true
        }, {
          date1: '2016-5-3',
          date2: '2017-5-3',
          name: '常熟英迈',
          person: [{show:false,name:'李四',type:'联系人',qq:'',wx:'test',tel:'110'},{show:false,type:'法务',name:'赵五',qq:'123',tel:'',wx:'456'},{show:false,type:'主管',name:'阿Q',qq:'',wx:'',tel:''}],
          address: 'xxxxx',
          observer:"李四",
          status: true
        },
         {
          date1: '2016-5-3',
          date2: '2017-5-3',
          name: '常熟英迈',
          person: [{show:false,name:'李四',type:'联系人',qq:'',wx:'test',tel:'110'},{show:false,type:'法务',name:'赵五',qq:'123',tel:'',wx:'456'},{show:false,type:'主管',name:'阿Q',qq:'',wx:'',tel:''}],
          address: 'xxxxx',
          observer:"李四123",
          status: false
        }],
         pickerOptions1: {
          shortcuts: [{
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    }
}
</script>


<style lang="scss" scoped>

 .client {

    width: 100%;
    // height: calc(100% - 100px);
    height: calc(100vh - 100px);
    margin: 20px 20px 5px 20px; // border: 1px solid black;
    background-color: #fefefe;
    display: flex;
    flex-direction: column;
    .top {
      font-size: 0px;
      button{
        font-size: 12px;
        // margin-right: 15px;
      }
    }
    .table-container {
      flex:1;
      // height: 100vh;
      // max-width: 100%;
      // overflow: hidden;
      // overflow-x: hidden;
      // padding: 20px 20px 0 0;
      margin: 20px 20px 0 0;
      // margin-right: 50px;
    }
    .page-footer{

    }
    .el-form{
      width: 500px;
      margin: 0 auto;
    }
  }
</style>







