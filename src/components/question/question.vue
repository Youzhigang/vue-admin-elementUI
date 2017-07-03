<template>
  <div class="question">

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
       <Table :columns="columns" :data="showData" border ></Table>

    </div>
    <div class="page-footer">
        <Page :total="tableData.length" @on-change='changePage'></Page>
    </div>

    <!--答复-->
    <Modal
        v-model="showReplyDialog"
        title="普通的Modal对话框标题"
        >
        <p>对话框内容</p>
        <p>对话框内容</p>
        <p>对话框内容</p>
    </Modal>
     <!--<el-dialog title="答复" :visible.sync="showReplyDialog" >
        <el-form  label-width="80px" :model='replyData'>
          <el-form-item label="情况描述"  >
            <span>{{replyData.desc}}</span>
          </el-form-item>

          <el-form-item label="问题类别">
            <span>{{replyData.class}}</span>
          </el-form-item>
          <el-form-item label="具体内容">

            <span>{{replyData.content}}</span>
          </el-form-item>

          <el-form-item label="答复内容"  >
            <el-input type="textarea" :rows="2" ref="replyContent"></el-input>
          </el-form-item>

          <div class="button-wrapper">
            <el-form-item>
              <el-button type="primary" @click='replySave'>回复</el-button>

            </el-form-item>
          </div>
        </el-form>
    </el-dialog>-->
  </div>
</template>

<script>

const PAGE_SIZE = 10

export default {
  name: 'question',
    created() {
      console.log('question created')
    },
    mounted() {
      this.axios(this.Validate).then(
      res => {
        if (res.data.errcode !== '0') {
              this.$message({
                message: '登录失效, 请重新登录',
                type: 'error'
              })
              this.$router.replace({path:'login'})
            } else {
              return this.axios.post(this.api + 'Reply/load', {qusarg: ""})
            }
      }).then(res => {
        console.log(res.data.resData)
        this.tableData = res.data.resData
      })

    },
    data() {
      return {
        page: 1,
        showReplyDialog: false,
        kw: '',
        radio: 3,
        replyData: {},
        tableData:[],
        columns: [
          {type: 'index', width: 60, align: 'center'},
          { title:'问题名称', key: 'questionDesc'},
          { title:'问题描述', key: 'questionContent'},
          { title:'问题类别', key: 'questionType'},
          { title:'提问时间', key: 'createDate',
            render: (h, params) => {
              return h('span', null, new Date(params.row.createDate).toLocaleDateString())
            }
          },
          { title:'状态', key: 'questionStatus',
             render: (h, params) => {
              return h('span',{},
              params.row.questionStatus === 1 ? '已答复': '未答复'
              )
            }
          },
          { title:'操作', key: 'action',
            render: (h, params) => {
              return h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {marginRight: '5px'},
                  on: {
                    click: (e)=> {
                      //e.cancelBubble = true
                      //e.stopPropagation()
                      this.showReplyDialog = !this.showReplyDialog
                      //console.log(e)
                    }
                  }
                }, '回复')
            }
          },
        ]
      }
    },
    methods: {
      changePage(v) {
        this.page = v
      },
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
        // this.showData = this.tableData

      },
      changeHandler(){
        console.log(this.radio);
      },

    },
    computed: {
      searchData () {
        if (this.kw !== '') {
          return this.tableData.filter( i => {
            return i.questionDesc.indexOf(this.kw) !== -1 || i.questionContent.indexOf(this.kw) !== -1
          })
        } else {
          switch (this.radio) {
            case 1:
              return this.tableData.filter( i => i.questionStatus)
            case 2:
              return this.tableData.filter( i => !i.questionStatus)
            case 3:
              return this.tableData
            default:
              break
          }
        }
      },
      showData () {
        return this.searchData.slice( (this.page -1)* PAGE_SIZE, this.page * PAGE_SIZE )
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
