<template>
<div class="system">
  <div class="top">


      <el-button :plain="true"  icon="plus">创建</el-button >
      <el-button :plain="true"  icon="edit">禁用</el-button >
      <el-button :plain="true"  icon="delete">删除</el-button >

     <div class="search-wrapper">
        <el-input icon="search" :on-icon-click="handleIconClick"></el-input>
      </div>
  </div>
  <div class="table-container">
    <el-table
    ref="multipleTable"
    :data="tableData3"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column label='操作'>
     <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <div class="page-footer">
        <el-pagination layout="prev, pager, next" :total="510" small></el-pagination>
    </div>
</div>
</template>


<script>
export default {
  name: 'system',
  methods: {
      handleIconClick (ev) {
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
}
</style>
