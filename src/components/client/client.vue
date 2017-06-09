<template>
  <div class="client">

    <!--客户列表-->
    <div class="top">
      <el-button :plain="true"  icon="plus" @click='addHandler'>新增</el-button >
      <el-button :plain="true"  icon="edit" @click='editHandler'>编辑</el-button >
      <el-button :plain="true"  icon="share" @click='enableHandler'>续费</el-button >
      <el-button :plain="true"  icon="delete" @click='disableHandler'>禁用</el-button >
      <!--<el-button :plain="true"  icon="search">搜索</el-button >-->
      <el-button :plain="true" >服务<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
    <div class="table-container">
        <el-table :data="tableData"  border stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
          <el-table-column prop="person" label="联系人" width="180"></el-table-column>
           <el-table-column prop="address" label="地址" width="180"></el-table-column>
           <el-table-column  label="状态" width="180">
              <template scope="scope">
                <span  v-text="scope.row.status? '有效' : '无效' "></span>
              </template>
           </el-table-column>
          <el-table-column prop="date" label="有效期" width="180"></el-table-column>
          <el-table-column prop="observer" label="观察者"  ></el-table-column>
        </el-table>
    </div>
    <div class="page-footer">
        <el-pagination layout="prev, pager, next" :total="510" small></el-pagination>
    </div>

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
        <el-form-item label="客户编码" prop='person'>
          <el-input auto-complete="off" v-model='formData.person'></el-input>
        </el-form-item>
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
        <el-form-item label="客户编码" prop='person'>
          <el-input auto-complete="off" v-model='selectRow.person' ></el-input>
        </el-form-item>
        <el-form-item label="服务律师" prop='observer'>
          <el-input auto-complete="off" v-model='selectRow.observer' ></el-input>
        </el-form-item>
        <el-form-item label="到期时间"  prop='date'>
          <el-date-picker
            v-model="selectRow.date"
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

  </div>
</template>


<script>
// import modalBox from '../../common/component/modal'
import {deepClone} from '../../common/js/util.js'

export default {
  name: 'client',

  methods: {
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
          this.selectRow.date = new Date(this.selectRow.date).toLocaleDateString()
        } else {
          this.selectRow.date = this.selectRow.date.toLocaleDateString();
        }
        this.showEditDialog = false
    },
    addItem() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) {
          this.$alert('字段不能为空')
        } else if (this.date === '') {
          this.$alert('时间不能为空')
        } else {
          console.log('ok');
          this.$set(this.formData,'date', this.date.toLocaleDateString() )
          this.tableData.push(deepClone(this.formData))
          this.showAddDialog = false
        }
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    enableHandler() {
      if (this.multipleSelection.length === 0 ){
        this.$alert('At least select one row!!!')
      } else {
        this.multipleSelection.forEach( i => {
          i.status = true
        })
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
          person: '9527',
          observer: 'Jack Mao',
          status: true
         },
        tableData: [{
          date: '2016-5-2',
          name: '常熟英迈',
          person: '张三2222',
          address: 'xxxxx',
          observer:"李四",
          status: true
        }, {
          date: '2016-5-4',
          name: '常熟英迈',
          person: '张三',
          address: 'xxxxx',
          observer:"李四",
          status: true
        }, {
          date: '2016-5-1',
          name: '常熟英迈',
          person: '张三',
          address: 'xxxxx',
          observer:"李四",
          status: true
        }, {
          date: '2016-5-3',
          name: '常熟英迈',
          person: '张三',
          address: 'xxxxx',
          observer:"李四",
          status: true
        },
         {
          date: '2016-5-3',
          name: '常熟英迈',
          person: '张三',
          address: 'xxxxx',
          observer:"李四123",
          status: false
        }]
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







