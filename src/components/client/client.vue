<template>
  <div class="client">
    <!--客户列表-->
    <div class="top">
      <el-button :plain="true"  icon="plus">新增</el-button >
      <el-button :plain="true"  icon="edit">编辑</el-button >
      <el-button :plain="true"  icon="share">分享</el-button >
      <el-button :plain="true"  icon="delete">删除</el-button >
      <!--<el-button :plain="true"  icon="search">搜索</el-button >-->
      <el-button :plain="true" >上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
    <div class="table-container">
        <el-table :data="tableData"  border stripe>
          <el-table-column prop="name" label="简称" width="180"></el-table-column>
          <el-table-column prop="address" label="联系人" width="180"></el-table-column>
          <el-table-column prop="date" label="有效期" width="180"></el-table-column>
          <el-table-column prop="address" label="观察者"  ></el-table-column>
        </el-table>
    </div>
    <div class="page-footer">
        <el-pagination layout="prev, pager, next" :total="510" small></el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  name: 'client',
   data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
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
  }
</style>







