<template>
  <div class="question">
    <!--客户列表-->
    <!--<div class="top">-->
    <div class="top">
      <el-radio-group v-model="radio">
        <el-radio :label="3">已修复</el-radio>
        <el-radio :label="6">未修复</el-radio>
        <
      </el-radio-group>
      <div class="search-wrapper">
        <el-input icon="search" :on-icon-click="handleIconClick"></el-input>
      </div>
    </div>
    <!--</div>-->
   <div class="table-container">
        <el-table :data="tableData" height="340" border stripe>
          <el-table-column prop="name" label="客户" width="180"></el-table-column>
          <el-table-column prop="address" label="问题描述" width="180"></el-table-column>
          <el-table-column prop="date" label="提问时间" width="180"></el-table-column>
          <el-table-column prop="address" label="状态" ></el-table-column>
          <el-table-column prop="address" label="操作" />
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question',
    data() {
      return {
        radio: '1',
        tableData:[]
      }
    },
    methods: {
      handleIconClick (ev) {
        console.log(ev);
      }
    }
}
</script>



<style lang="scss" scoped>
.question {
    width: 100%;
    // height: 100%;
    margin: 20px 20px 5px 20px; // border: 1px solid black;
    background-color: #fefefe;
    .top {
         width: 100%;
         .search-wrapper{
           display: inline-block;
           margin-left: 50px;
         }
    }
    .table-container {
      // max-width: 100%;
      // overflow: hidden;
      // overflow-x: hidden;
      // padding: 20px 20px 0 0;
      margin: 20px 20px 0 0;
      // margin-right: 50px;
    }
  }
</style>
