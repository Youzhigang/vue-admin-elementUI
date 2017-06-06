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

  </div>
</div>
</template>


<script>
export default {
  name: 'system',
  methods: {
      handleIconClick (ev) {
        console.log(ev);
      }
  }
}
</script>

<style lang="scss" scoped>
.system{
  width: 100%;
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
    margin: 20px 20px 0 0;
  }
}
</style>
