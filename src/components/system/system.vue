<template>
<div class="system">
  <div class="top">
      <el-button :plain="true"  icon="plus" @click='addHandler'>创建</el-button >
      <el-button :plain="true"  icon="edit" @click='disableHandler'>禁用</el-button >
      <el-button :plain="true"  icon="delete" @click='deleteHandler'>删除</el-button >
     <div class="search-wrapper">
        <el-input icon="search" :on-icon-click="handleIconClick"></el-input>
      </div>
  </div>
  <div class="table-container">
    <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column type="index" width="70"></el-table-column>
    <el-table-column label="创建日期" width="150">
      <template scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120"></el-table-column>
    <el-table-column prop="role" label="角色" width="120"></el-table-column>
    <el-table-column
      prop="creator"
      label="创建者" width="100"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="状态" width="100">
      <template scope='scope' >
        <span v-text="scope.row.status? '启用': '禁用'"></span>
      </template>
    </el-table-column>
    <el-table-column label='操作'>
     <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <!--<el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
      </template>
    </el-table-column>
  </el-table>
  </div>
  <div class="page-footer">
    <el-pagination layout="prev, pager, next" :total="510" small></el-pagination>
  </div>

    <!--edit-->
   <el-dialog title="编辑" :visible.sync="showEditDialog">
        <el-form  label-width="80px" :model = 'editRow'>
        <el-form-item label="创建日期"  prop='date'>
          <el-date-picker
            v-model="editRow.date"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
        </el-form-item>
          <el-form-item label="姓名"  prop='name' >
            <el-input auto-complete="off" v-model='editRow.name'></el-input>
          </el-form-item>
          <el-form-item label="角色" prop='role'>
          <!--<el-input auto-complete="off" v-model='editRow.role'></el-input>-->
          <el-select v-model='editRow.role' placeholder="请选择角色">
              <el-option v-for="item in options" :key='item.value' :label='item.label' :value='item.value'></el-option>
            </el-select>
        </el-form-item>
          <div class="button-wrapper">
            <el-form-item>
              <el-button type="primary" @click="saveItem">保存</el-button>
              <!--<el-button @click="resetForm('addForm')">重置</el-button>-->
            </el-form-item>
          </div>
        </el-form>
    </el-dialog>
    <!--add-->
     <el-dialog title="新增" :visible.sync="showAddDialog">
        <el-form  label-width="80px" :model = 'newRow'>
        <el-form-item label="创建日期"  prop='date'>
          <el-date-picker
            v-model="newRow.date"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
        </el-form-item>
          <el-form-item label="*姓名"  prop='name' >
            <el-input auto-complete="off" v-model='newRow.name'></el-input>
          </el-form-item>
          <el-form-item label="*角色" prop='role'>
          <!--<el-input auto-complete="off" v-model='newRow.role'></el-input>-->
            <el-select v-model='newRow.role' placeholder="请选择角色">
              <el-option v-for="item in options" :key='item.value' :label='item.label' :value='item.value'></el-option>
            </el-select>
          </el-form-item>
          <div class="button-wrapper">
            <el-form-item>
              <el-button type="primary" @click="addItem">保存</el-button>
              <!--<el-button @click="resetForm('addForm')">重置</el-button>-->
            </el-form-item>
          </div>
        </el-form>
    </el-dialog>
</div>
</template>


<script>
export default {
  name: 'system',
  mounted() {
    console.log(this.api + 'get')
    this.axios.get(this.api + 'User/get').then(res => console.log(res))
  },
  methods: {
      addHandler() {
        this.showAddDialog = true;
      },
      saveItem() {
         if (typeof this.editRow.date === 'string') {
          this.editRow.date = new Date(this.editRow.date).toLocaleDateString()
        } else {
          this.editRow.date = this.editRow.date.toLocaleDateString();
        }
        this.showEditDialog =false
      },
      addItem() {
        if (this.newRow.date && this.newRow.name && this.newRow.role) {
          this.newRow.date = this.newRow.date.toLocaleDateString()
          this.tableData3.push(this.newRow)
          this.newRow ={date: '', name:'' ,status: false, role: '',creator: 'admin'}
          this.showAddDialog = false
        } else {
          this.$alert('必填项目不能为空')
          return
        }
      },
      handleIconClick (ev) {
        console.log(ev);
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },
       handleEdit(index, row) {
        console.log(index, row);
        this.editRow = row
        this.showEditDialog = true
      },
      deleteHandler() {
        this.multipleSelection.forEach( (i, index) => {
          if (this.tableData3.indexOf(i) !== -1) {
            this.tableData3.splice(index, 1)
          }
        })
      },
       disableHandler() {
        this.multipleSelection.forEach( i => {
          i.status = !i.status
        })
      }
  },
  data() {
      return {
        multipleSelection: [],
        showEditDialog:false,
        showAddDialog: false,
        editRow: {},
        newRow: {date: '', name:'' ,status: false, creator: 'admin', role: ''},

        options: [
          {value: 'administrator', label: '管理员'},
          {value: 'guest', 'label': '普通用户'}
        ],
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          creator:'admin',
          role: '管理员'
          ,status: true
        }, {
          date: '2016-05-02',
          name: '王小虎',
          creator:'admin',
          role: '普通用户'
          ,status: true
        }, {
          date: '2016-05-04',
          name: '王小虎',
          creator:'admin',
          role: '普通用户'
          ,status: true
        }, {
          date: '2016-05-01',
          name: '王小虎',
          creator:'admin',
          role: '管理员'
          ,status: true
        }, {
          date: '2016-05-08',
          name: '王小虎',
          creator:'admin',
          role: '管理员'
          ,status: true
        }, {
          date: '2016-05-06',
          name: '王小虎',
          creator:'admin',
          role: '普通用户'
          ,status: true
        }, {
          date: '2016-05-07',
          name: '王小虎',
          creator:'admin',
          role: '管理员'
          ,status: true
        }],
      }
    }
}
</script>

<style lang="scss" scoped>
.system{
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  .top{
    // width: 100%;

    margin: 20px 20px 5px 20px; // border: 1px solid black;
    background-color: #fefefe;
    .search-wrapper{
      margin-left: 15px;
      display: inline-block;
      width: 200px;
    }

  }
  .table-container{
    flex:1;
    margin: 20px 20px 0 20px;
  }
  .el-form{
      width: 500px;
      margin: 0 auto;
    }
}
</style>
