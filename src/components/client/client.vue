<template>
  <div class="client">

    <!--客户列表-->
    <div class="top">
      <el-button :plain="true"  icon="plus" @click='addHandler'>新增</el-button >
      <!--<el-button :plain="true"  icon="edit" @click='editHandler'>编辑</el-button >-->
      <!--<el-button :plain="true"  icon="share" @click='renewHandler'>续费</el-button >-->
      <!--<el-button :plain="true"  icon="delete" @click='disableHandler'>禁用</el-button >-->
      <!--<el-button :plain="true"  icon="search">搜索</el-button >-->
      <!--<el-button :plain="true" >服务<i class="el-icon-upload el-icon--right"></i></el-button>-->
    </div>
    <div class="table-container">
        <Table  highlight-row border :columns="columns" :data="showList"  @on-current-change='current' ></Table>
    </div>
    <div class="page-footer">
        <Page :total="tableData.length" @on-change='changePage'></Page>
    </div>

    <addCustomer
    v-if="showAddDialog"
    @toggle='toggle'
    @addCus = 'addCusCb'

    :editCustomer='selectRow'
    :action='action'>
    </addCustomer>




  </div>
</template>


<script>
// import modalBox from '../../common/component/modal'
import { deepClone } from '../../common/js/util.js'
// import contact from './AddContact'
import expandRow from './expand';
import addCustomer from './addCustomer'


const PAGE_SIZE = 10

export default {
  name: 'client',
  created (){
    console.log('client created')
  },
  components: {
    // contact,
    expandRow,
    addCustomer
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
       this.axios.get(this.Validate).then(
        res => {
          if (res.data.errcode !== '0') {
            this.$message({
              message: '登录失效, 请重新登录',
              type: 'error'
            })
            this.$router.replace({path:'/login'})
          } else {
            return this.axios.post(this.api + 'Customer/load',{})
          }
        }
      ).then(res => {
        console.log(res.data)
        this.tableData = res.data.resData.sort((a,b) => ~~(a.id) - ~~(b.id) )
      })
    },
    addCusCb (obj) {
      this.fetchData()
    },

    current(newVal, oldVal) {
      console.log(newVal, oldVal)
      // this.newVal
      // this.$set(newVal, '_checked', true)
      this.selectRow = newVal
    },

    toggle() {
      this.showAddDialog = !this.showAddDialog
    },
    changePage(v) {
      this.page = v
    },
    editContactHandle (index1, item, index2) {
      this.editContact = item
      this.isShowEditContactCard = !this.isShowEditContactCard
    },
    addHandler () {
      this.action = 'add'
      this.toggle()
    },
    editHandler () {
      if (this.multipleSelection.length === 0 ){
        this.$alert('At least select one row!!!')
      } else if (this.multipleSelection.length > 1) {
        this.$alert('You select to many rows!!!')
      } else {

        this.showEditDialog = !this.showEditDialog
      }
    },
    renewHandler() {
      if (this.multipleSelection.length === 0 ){
        this.$alert('At least select one row!!!')
      } else {
        // this.multipleSelection.forEach( i => {
        //   i.status = true
        // })
        this.showRenewDialog = !this.showRenewDialog
      }
    },
    disableHandler () {
      if (this.multipleSelection.length === 0 ){
        this.$alert('At least select one row!!!')
      } else {

        this.multipleSelection.forEach( i => {
          i.status = false
        })
      }
    },
    _delCustomer (id) {
      this.$confirm('删除该客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        return this.axios(this.Validate)
      }).then((res) => {
        if (res.data.errcode !== '0') {
            this.$message({
              message: '登录失效, 请重新登录',
              type: 'error'
            })
            // this.$router.replace({path:'login'})
            this.$router.replace({name: 'login'})
          } else {
            return this.axios.get( this.api + 'Customer/remove', { params: { cusid: id}})
        }
      }).then(res => {
        console.log(res)
          this.$message({
            type: 'info',
            message: res.data.resData
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  computed: {
    showList () {
      return this.tableData.slice( (this.page - 1) * PAGE_SIZE, this.page * PAGE_SIZE)
    }

  },
   data() {
      return {
        page: 1,
        selectRow: '',
        action: '',
        // date: '',

        // multipleSelection: [],
        showAddDialog: false,
        showEditDialog: false,
        pickerOptions0 : {
          disableDate(time) {
            return time.getTime() < Date.now() -8.64e7
          }
        },
        columns:[
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center'
        // },
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
            type: 'expand',
            title: '联系人',
            width: 50,
            render: (h, params) => {
                return h(expandRow, {
                    props: {
                        row: params.row
                    },
                    on: {}
                })
            }
        },
        {
          title: '姓名',
          key: 'customName'
        },
        {
            title: '地址',
            key: 'customAddress'
        },
        {
            title: '简码',
            key: 'customCode'
        },
        {
          title: '状态',
          key: 'serviceStatus',
          // width: 100,
          render: (h, params) => {
            return h('div', {}, params.row.serviceStatus === '1' ? '有效': '无效')
          }
        },
        {
          title: '律师',
          key: 'serviceLawyer',
        },
        {
          title: '修改时间',
          width: '150',
          key: 'modifyDate',
          render: (h, params) => {
            return h('div', {}, new Date(params.row.modifyDate).toLocaleDateString())
          }
        },
        {
          title: '操作',
           render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'default',
                    size: 'small'
                  },
                  style: {marginRight: '5px'},
                  on: {
                    click: ()=> {
                      this.action = 'edit'
                      this.toggle()
                      console.log(12333333333)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {marginRight: '5px'},
                  on: {
                    click: ()=> {
                      this._delCustomer(params.row.id)
                      //console.log(params.row.id)
                    }
                  }
                }, '删除')
              ])
            }
        }
        ],
        tableData: [],
         pickerOptions1: {
          shortcuts: [{
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
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
    .el-form{
      width: 500px;
      margin: 0 auto;
    }
  }
</style>







