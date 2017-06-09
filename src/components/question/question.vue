<template>
  <div class="question">
    <!--客户列表-->
    <!--<div class="top">-->
    <div class="top">
      <el-radio-group v-model="radio" @change='changeHandler'>
        <el-radio :label="1" >已答复</el-radio>
        <el-radio :label="2">未答复</el-radio>
        <el-radio :label="3">所有</el-radio>
      </el-radio-group>
      <div class="search-wrapper">
        <el-input icon="search" :on-icon-click="handleIconClick" v-model='kw' placeholder='根据名称和描述搜索'></el-input>
      </div>
    </div>
    <!--</div>-->
   <div class="table-container">
        <el-table :data="showData" border stripe >
          <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
          <el-table-column prop="desc" label="问题描述" width="180"></el-table-column>
          <el-table-column prop="date" label="提问时间" width="180"></el-table-column>
          <el-table-column label="状态" width='180'>
            <template scope="scope">
              <span v-text="scope.row.status? '已答复': '未答复'"></span>
            </template>
          </el-table-column>
          <el-table-column  label="操作">
             <template scope="scope">
              <el-button size="small" @click="replyHandler(scope.$index, scope.row)">答复</el-button>
              <!--<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="page-footer">
        <el-pagination layout="prev, pager, next" :total="510" small></el-pagination>
    </div>
     <el-dialog title="答复" :visible.sync="showReplyDialog" >
        <el-form  label-width="80px" :model='replyData'>
          <el-form-item label="问题描述"  >
            <span>{{replyData.desc}}</span>
          </el-form-item>
          <el-form-item label="具体内容">
            <!--<el-input auto-complete="off" ></el-input>-->
            <span>{{replyData.content}}</span>
          </el-form-item>

          <el-form-item label="答复内容"  >
            <el-input type="textarea" :rows="2" ref="replyContent"></el-input>
          </el-form-item>

          <div class="button-wrapper">
            <el-form-item>
              <el-button type="primary" @click='replySave'>回复</el-button>
              <!--<el-button @click="resetForm('addForm')">重置</el-button>-->
            </el-form-item>
          </div>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'question',
    data() {
      return {
        showReplyDialog: false,
        kw: '',
        radio: 3,
        replyData: {},
        tableData:[
          {name: '常熟英迈a', desc: '严重问题1', date: '2017-6-6',content: "青少年游戏问题很严重啊", 'status': false },
          {name: '常熟英迈b', desc: '严重问题2', date: '2017-6-6',content: "年轻人玩手机问题很严重啊", 'status': false },
          {name: '常熟英迈c', desc: '严重问题3', date: '2017-6-6',content: "青少年游戏问题很严重啊", 'status': true },
          {name: '常熟英迈d', desc: '严重问题4', date: '2017-6-6',content: "青少年游戏问题很严重啊", 'status': false },
          {name: '常熟英迈e', desc: '严重问题5', date: '2017-6-6',content: "年轻人玩手机问题很严重啊", 'status': true },
          {name: '常熟英迈f', desc: '严重问题6', date: '2017-6-6',content: "年轻人玩手机问题很严重啊", 'status': true },
          {name: '常熟英迈g', desc: '严重问题7', date: '2017-6-6',content: "年轻人玩手机问题很严重啊", 'status': true },
          {name: '常熟英迈h', desc: '严重问题8', date: '2017-6-6',content: "青少年游戏问题很严重啊", 'status': false },
          {name: '常熟英迈i', desc: '严重问题9', date: '2017-6-6',content: "青少年游戏问题很严重啊", 'status': false }
        ]
      }
    },
    methods: {
      replyHandler (index, data) {
        // console.log(index, data);
        // this.showdata[index].status = ! this.showdata[index].status
        // console.log(this.showData.status);
        this.showReplyDialog = !this.showReplyDialog
        this.replyData = data
        // data.status = !data.status
      },
      replySave () {
        // console.log(this.replyData);
        this.$alert(this.$refs.replyContent.$data.currentValue, '回复内容: ')
        this.replyData.status = ! this.replyData.status
        this.showReplyDialog = false
      },
      handleIconClick (ev) {
        // console.log(ev);
        console.log(this.kw);
        this.showData = this.tableData

      },
      changeHandler(){
        console.log(this.radio);
      },

    },
    computed: {
      showData () {
        if (this.kw !== '') {
          return this.tableData.filter( i => {
            return i.desc.indexOf(this.kw) !== -1 || i.name.indexOf(this.kw) !== -1
          })
        } else {
          switch (this.radio) {
            case 1:
              return this.tableData.filter( i => i.status)
            case 2:
              return this.tableData.filter( i => !i.status)
            case 3:
              return this.tableData
            default:
              break
          }
        }
      }
    }
}
</script>



<style lang="scss" scoped>
.question {
    width: 100%;
    height: calc(100vh - 80px);
    // height: 100%;
    display: flex;
    flex-direction: column;
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
      flex:1;
      // max-width: 100%;
      // overflow: hidden;
      // overflow-x: hidden;
      // padding: 20px 20px 0 0;
      margin: 20px 20px 0 0;
      // margin-right: 50px;
    }
    .el-form{
      width: 500px;
      margin: 0 auto;
    }
  }
</style>
