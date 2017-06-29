<template>
  <div class="home">
    <!--<h1>home</h1>-->
    <div class="panel">
      <div class="panel-item panel-client" @click='goPage("/index/client")'>
        <div class="number">1</div>
        <div class="title">企业(客户)</div>
      </div>
      <div class="panel-item panel-question" @click='goPage("/index/question")'>
        <div class="number">7</div>
        <div class="title">问题</div>
      </div>
      <div class="panel-item panel-archive" @click='goPage("/index/service")'>
        <div class="number">8</div>
        <div class="title">文档</div>
      </div>
      <div class="panel-item panel-system" @click='goPage("/index/system")'>
        <div class="number">1</div>
        <div class="title">系统管理</div>
      </div>
    </div>
    <div class="list-group">
      <div class="question-list">
        <div class="title">问题列表</div>
        <div class="question-table">
          <!--<el-table :data="tableData"  border style="width: 95%" :show-header='false'>
            <el-table-column prop="date" width='120' >
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>

          </el-table>-->
        </div>
        <div class="page-footer">
          <el-pagination layout="prev, pager, next" :total="50" small></el-pagination>
        </div>
      </div>
      <div class="archive-list">
        <div class="title">文档列表</div>
        <div class="archive-table">
          <el-table :data="tableData"  border  :show-header='false'>
            <el-table-column prop="date" width='120' ></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
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
    mounted() {
    console.log(1234566)
  },
    data() {
      return {
        tableData: [{
          date: '大金空调',
          name: '王小虎',
          address: '1518 弄'
        }, {
          date: '大金空调',
          name: '王小虎',
          address: '1517 弄'
        }, {
          date: '大金空调',
          name: '王小虎',
          address: '1519 弄'
        }, {
          date: '大金空调',
          name: '王小虎',
          address: '1516 弄'
        },{
          date: '大金空调',
          name: '王小虎',
          address: '1516 弄'
        },{
          date: '大金空调',
          name: '王小虎',
          address: '1516 弄'
        }]
      }
    },
    methods: {
      goPage(path) {
        // bus.$emit('routeChange', path)
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

.title{
  margin-top: 10px;
  color:#333;
  font-weight: 600;
  // font-family: "Mircrosoft Yahei";
  font-size: 15px;
  margin-bottom: 13px;
  &:after{
    display: block;
    content: '';
    border: none;
    margin-top: 2px;
    height: 1px;
    background-color: #bbb;
    max-width: 400px;
    background-image: -webkit-linear-gradient(0deg, #ccc, #bbb, #fff);
  }
}
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
