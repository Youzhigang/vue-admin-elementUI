<template>
  <div class="archive">
    <div class="left-section">
      <el-input icon="search" :on-icon-click="searchIconClick"></el-input>
      <ul class="list">
        <li v-for="item in listData">{{item}}</li>

      </ul>
    </div>
    <div class="right-section">
      <div class="btn-group">
        <el-button :plain="true" icon="plus" @click='addHandler'>创建</el-button>
        <el-button :plain="true" icon="edit" @click='disableHandler'>禁用</el-button>
        <el-button :plain="true" icon="delete" @click='multiDel'>删除</el-button>
        <el-button :plain="true"  icon="share" >分发</el-button >
      </div>
      <div class="table-container">
        <el-table ref="multipleTable" :data="tableData3"
        border tooltip-effect="dark" style="width: 100%"
         @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="80"></el-table-column>
          <el-table-column type="index" width="80"></el-table-column>
          <el-table-column label="上传日期" width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="名称" width="120">
          </el-table-column>
          <el-table-column prop="address" label="保存地址" show-overflow-tooltip></el-table-column>
          <el-table-column  label="状态" show-overflow-tooltip width='80'>
            <template scope="scope">
              <span v-text="scope.row.status? '有效': '无效'"></span>
            </template>
          </el-table-column>
          <el-table-column label='操作'>
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-footer">
        <el-pagination layout="prev, pager, next" :total="510" small></el-pagination>
    </div>
    </div>
    <!--edit-->
    <el-dialog title="编辑" :visible.sync="showEditDialog">
        <el-form  label-width="80px" :model = 'editRow'>
          <el-form-item label="名称"  prop='name' >
            <el-input auto-complete="off" v-model='editRow.name'></el-input>
          </el-form-item>
          <el-form-item label="地址" prop='address'>
          <el-input auto-complete="off" v-model='editRow.address'></el-input>
        </el-form-item>
        <el-form-item label="时间"  prop='date'>
          <el-date-picker
            v-model="editRow.date"
            type="date"
            placeholder="选择日期"
            >
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

    <!--add-->
    <el-dialog title="新增" :visible.sync="showAddDialog">
        <el-form  label-width="80px" :model = 'newRow'>
          <el-form-item label="名称"  prop='name' >
            <el-input auto-complete="off" v-model='newRow.name'></el-input>
          </el-form-item>
          <el-form-item label="地址" prop='address'>
          <el-input auto-complete="off" v-model='newRow.address'></el-input>
        </el-form-item>
        <el-form-item label="时间"  prop='date'>
          <el-date-picker
            v-model="newRow.date"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
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
    name: 'archive',
    methods: {
      multiDel(){
        this.multipleSelection.forEach( (i, index) => {
          if (this.tableData3.indexOf(i) !== -1) {
            this.tableData3.splice(index, 1)
          }
        })
        this.multipleSelection = []
      },
      disableHandler() {
        this.multipleSelection.forEach(i => {
          i.status = false
        })
      },
      addHandler() {
        this.showAddDialog = true;
      },
      searchIconClick() {
        console.log('search');
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        this.showEditDialog = true
        console.log(index, row);
        const h = this.$createElement;
        this.editRow = row
      },
      addItem() {
        this.newRow.date = this.newRow.date.toLocaleDateString()
        this.tableData3.push(this.newRow)
        this.newRow ={date: '', name:'' ,status: false, address: ''}
        this.showAddDialog = false
      },
      saveItem() {
        if (typeof this.editRow.date === 'string') {
          this.editRow.date = new Date(this.editRow.date).toLocaleDateString()
        } else {
          this.editRow.date = this.editRow.date.toLocaleDateString();
        }
        this.showEditDialog = false
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm(`第${index+1}条项目`, '确定删除吗', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData3.splice(index, 1)
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
      }
    },

    data() {
      return {
        showEditDialog:false,
        showAddDialog: false,
        editRow: {},
        newRow: {date: '', name:'' ,status: false, address: ''},
        listData: [
          "常熟英迈","三菱电机","三菱电机","三菱电机","三菱电机","三菱电机","三菱电机"
        ],
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          status:true,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小2',
          status:true,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          status:true,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          status:true,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          status:true,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          status:true,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          status:true,
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    }
  }

</script>


<style lang="scss" scoped>
  .archive {
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    .left-section {
      // width: 100%;
      flex: 0 200px;
      margin: 20px 20px 5px 20px; // border: 1px solid black;
      background-color: #fefefe; // .search-wrapper{
      //   margin-left: 15px;
      //   display: inline-block;
      //   width: 200px;
      // }
      .list {
        box-shadow: 0px 0px 2px 0px #000;
        border-radius: 4px;
        height: calc(100% - 100px);
        margin-top: 20px; // border:1px solid black;
        padding: 15px 15px 0px 15px;
        li {
          font-size: 15px;
          margin-left: 10px;
          letter-spacing: 1px;
          padding: 0;
          margin-top: 10px;
          list-style: none;

          &:after{
            display: block;
            content: '';
            border: none;
            margin-top: 5px;
            height: 1px;
            background-color: #bbb;
            max-width: 400px;
            background-image: -webkit-linear-gradient(0deg, blue, #bbb, #fff);
          }
          &:hover{
            cursor: pointer;
            color: blue;
          }
        }
      }
    }
    .right-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      .btn-group{
        margin: 20px 20px 0 0;

      }
      .table-container {
        // margin: 20px 20px 0 0;
        flex:1;
        margin-top: 20px;
        width: calc(100% - 50px);
      }
    }
  }

</style>
