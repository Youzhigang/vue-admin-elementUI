<template>
  <div class="archive">
    <div class="left-section">
      <el-input icon="search" :on-icon-click="searchIconClick"></el-input>
      <ul class="list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
      </ul>
    </div>
    <div class="right-section">
      <div class="btn-group">
        <el-button :plain="true" icon="plus">创建</el-button>
        <el-button :plain="true" icon="edit">禁用</el-button>
        <el-button :plain="true" icon="delete">删除</el-button>
      </div>
      <div class="table-container">
        <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="日期" width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" show-overflow-tooltip>
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
  </div>
</template>


<script>
  export default {
    name: 'archive',
    methods: {
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
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },

    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
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
      box-shadow: 0px 0px 2px 0px #000;
      background-color: #fefefe; // .search-wrapper{
      //   margin-left: 15px;
      //   display: inline-block;
      //   width: 200px;
      // }
      .list {
        margin-top: 20px; // border:1px solid black;
        padding: 0;
        li {
          margin-left: 10px;
          ;
          padding: 0;
          margin-top: 10px;
          list-style: none;
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
