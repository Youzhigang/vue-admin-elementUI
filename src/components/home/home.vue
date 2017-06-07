<template>
  <div class="home">
    <!--<h1>home</h1>-->
    <div class="panel">
      <div class="panel-item panel-client" @click='goPage("/index/client")'>
        <div class="number">1</div>
        <div class="title">企业(客户)</div>
      </div>
      <div class="panel-item panel-question" @click='goPage("/index/question")'>
        <div class="number">1</div>
        <div class="title">问题</div>
      </div>
      <div class="panel-item panel-archive" @click='goPage("/index/archive")'>
        <div class="number">1</div>
        <div class="title">文档</div>
      </div>
      <div class="panel-item panel-system" @click='goPage("/index/system")'>
        <div class="number">1</div>
        <div class="title">系统管理</div>
      </div>
    </div>
    <div class="list-group">
      <div class="question-list">
        <div class="question-table">
          <el-table :data="tableData" height="300" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </div>
        <div class="page-footer">
          <el-pagination layout="prev, pager, next" :total="50" small></el-pagination>
        </div>

      </div>
      <div class="archive-list">
        <div class="archive-table">
        <el-table :data="tableData" height="300" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
        </div>
        <div class="page-footer">
          <el-pagination layout="prev, pager, next" :total="50" small></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
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
    },
    methods: {
      goPage(path) {
        this.$router.push(path)
      }
    }
  }

</script>

<style lang="scss" scoped>
  .home {
    width: 100%;
    //height: 100%; // overflow: hidden;
    height: calc(100% - 80px);
    margin: 10px 10px 5px 10px;
    // border: 1px solid black;
    background-color: #fefefe;
    display: flex; // align-items: center;
    flex-direction: column;
    .panel {
      flex: 0 200px;
      // min-width: 200px;
      display: flex; // height: 300px;
      box-sizing: border-box;
      padding: 10px 20px;
      margin-right: 10px;
      &-item {
        flex: 1;
        position: relative;
        margin-right: 30px;
        border-radius: 2px;
        &:hover {
          cursor: pointer;
        }
        &:last-child {
          margin-right: 0px;
        }
      }
      &-client {
        background-color: #dfa1ef;
      }
      &-question {
        background-color: #ab4345;
      }
      &-archive {
        background-color: #45acde;
      }
      &-system {
        background-color: #a1ecfc;
      }
      .number {
        font-size: 60px;
        color: #ede;
        position: absolute;
        left: 50%;
        top: 50%;
        font-weight: 500;
        transform: translate(-50%, -50%);
      }
      .title {
        font-size: 14px;
        position: absolute;
        bottom: 5px;
        right: 10px;
        color: #ccc;
        font-weight: 600;
      }
    }
    .list-group {
      // flex: 1;
      padding: 10px 20px;
      margin-right: 10px;
      display: flex; // width: 100%;
      height: calc(100% - 80px);
      // border: 1px solid black;
      .question-list {
        width: 50%; // flex: 1;
        flex: 1;
        display: flex;
        flex-direction: column;
        .question-table{
          flex: 1;
          height: 700px;;
        }
        .page-footer{

        }
      }
      .archive-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 50%;
        margin-left: 20px;
        .archive-table{
          flex: 1;
          height: 700px;;
        }
        .page-footer{

        }
      }
    }
  }

</style>
