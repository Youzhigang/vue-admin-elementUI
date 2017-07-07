<template>
  <div class="question">

    <!--<div class="top">-->
    <div class="top">
      <Radio-group v-model="radio" @on-change='changeHandler'>
        <Radio :label="1" >已答复</Radio>
        <Radio :label="2">未答复</Radio>
        <Radio :label="3">所有</Radio>
      </Radio-group>
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
    <transition name='fade'>
    <replyModal v-if="showReplyDialog" @toggle='toggle' @changeStatus='changeStatus' :replyData='replyData'></replyModal>
    </transition>
  </div>
</template>

<script>
import replyModal from './modal';

const PAGE_SIZE = 10

export default {
  name: 'question',
  components: {
    replyModal
  },
    created() {
      console.log('question created!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    },
    mounted() {
      this.axios(this.Validate).then(
      res => {
        if (res.data.errcode !== '0') {
              this.$message({
                message: '登录失效, 请重新登录',
                type: 'error'
              })
              // this.$router.replace({path:'login'})
               this.$router.replace({name: 'login'})
            } else {
              return this.axios.post(this.api + 'Reply/load', {qusarg: ""})
            }
      }).then(res => {
        console.log(res)
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
          { title:'提问时间', width:100, key: 'createDate',
            render: (h, params) => {
              return h('span', null, new Date(params.row.createDate).toLocaleDateString())
            }
          },
          { title:'状态', key: 'questionStatus', width:100,
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
                      // console.log(params)
                      this.replyData = Object.assign({}, params.row)
                      this.toggle()
                    }
                  }
                }, params.row.questionStatus === 1? '查看': '回复')
            }
          },
        ]
      }
    },
    methods: {
      changeStatus(id) {
        this.tableData.find(item => item.id === id).questionStatus =1
      },

      changePage(v) {
        this.page = v
      },
      toggle () {
        this.showReplyDialog = !this.showReplyDialog
      },
      replyHandler (index, data) {
        // console.log(index, data);
        // this.showdata[index].status = ! this.showdata[index].status
        // console.log(this.showData.status);
        this.showReplyDialog = !this.showReplyDialog
        this.replyData = data
        // data.status = !data.status
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
      // selectedData () {},

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
// .fade-enter-active, .fade-leave-active{  //状态结束会被移除
//       transition: 5s;
// }
// .fade-enter-active {
//   transform: translateY(100px);
// }
// .fade-enter, .fade-leave-active{
//   transform: translateY(0);
//   opacity: 0;
// }
// .fade-leave{
//   opacity: 0;
// }


</style>
