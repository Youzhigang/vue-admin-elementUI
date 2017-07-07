<template>
  <div class="renew">
    <div class="top">
     <div class="search-wrapper">
        <el-input icon="search" :on-icon-click="handleIconClick" v-model="kw"></el-input>
      </div>
      <!--<el-button :plain="true"  icon="d-arrow-right" @click='expandHandle' >{{expands.length===0 ? '展开': '关闭'}}</el-button >-->
      <el-button :plain="true"  icon="share" @click='renewHandle'>续费</el-button >
    </div>
    <div class="table-container">
      <div class="customer">
          <h2>客户列表</h2>
          <Table  highlight-row border :columns="columns" :data="showList"
          @on-selection-change='selectChange'
           @on-current-change='current'
           ></Table>
      </div>
      <div class="service">
        <h2>服务详情</h2>
      </div>
    </div>

    <div class="page-footer">
      <Page :total="tableData.length" @on-change='changePage'></Page>
    </div>

  </div>

</template>

<script>
// beginDate
// :
// "2017-06-27T00:00:00"
// createDate
// :
// "2017-07-04T13:56:25"
// createUser
// :
// "admin"
// cusID
// :
// "1"
// endDate
// :
// "2017-07-13T00:00:00"
// id
// :
// "1"
// serviceMoney
// :
// 123
// serviceType
// :
// "1"
  const PAGE_SIZE = 10

  export default {
    name: 'renew',
    created(){
      console.log('created!!!!!!!!!!!')
    },
    mounted () {
      // Array.prototype.forEach.call(this.tableData5, a => this.expands.push(a.id))

      console.log('renew mounted')
      this.fetchData()
    },
    filters: {
      test (val) {
        if (val) {
          return val + '￥'
        }
         return
      }
    },
    computed: {
      searchData () {
        if (this.kw !== '') {
          return this.tableData.filter( i => {
            return i.customName.indexOf(this.kw) !== -1 || i.customAddress.indexOf(this.kw) !== -1 || i.serviceLawyer.indexOf(this.kw)!== -1
          })
        } else {
          return this.tableData
        }
      },
      showList () {
        return this.searchData.slice( (this.page - 1) * PAGE_SIZE, this.page * PAGE_SIZE)
      }
    },
    methods: {
      selectChange(){

      },
      changePage(v) {
        this.page = v
      },
      current(newVal, oldVal){
        this.axios.get(this.Validate).then(res => {
          if (res.data.errcode !== '0') {
              this.$message({message: '登录失效, 请重新登录', type: 'error' })
              this.$router.replace({path:'/login'})
          } else {
            return this.axios.post(this.api + "Customer/loadservice",
            {
              cusid: newVal.id
            })
          }
        }).then(res => {
          console.log(res)
        })
        .catch(err => {
          this.$message({message: '获取失败', type: 'error' })
        })

      },
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
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleIconClick () {

      },

      renewHandle () {
        // this.currentRow
        if (Object.keys(this.currentRow).length === 0) {
          this.$alert('没有选择行', '警告')
        } else {
          this.showRenewDialog = !this.showRenewDialog
          this.$set(this.currentRow, 'date2', this.currentRow.period[0])
          // this.currentRow.date2 = this.currentRow.period[0]
        }

      },
      renewItem () {
        if (this.currentRow.date2) {
          this.currentRow.period.unshift(this.currentRow.date2.map(i => i.toLocaleDateString().replace(/-/g,'.')).join('-'))
        }
        this.showRenewDialog = !this.showRenewDialog
      }
    },
    data() {
      return {
        page: 1,
        kw: '',
        options: ['云服务','律师咨询'],
        showRenewDialog:false,
        currentRow: {},
        getRowKeys(row) {
          return row.id
        },
        expands: [],
        tableData: [],
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
          title: '姓名',
          key: 'customName'
        },
        {
            title: '地址',
            key: 'customAddress'
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
        }


        ],
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


<style lang='scss' scoped>

  .renew {
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
           margin-right: 20px;
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
      display: flex;
      // flex-direction: column;
      .customer{
        flex: 0 750px;
        // background: #211355;
        margin-right: 20px;
      }
      .service{
        flex: 1;
        // background: #213452;

      }
      ul{
        padding:0px;
        margin:0px;
        float: right;
          margin-right: 100px;
        .period-item{
        // height: 40px;
          padding-top: 10px;
          list-style: none;
        // float: right;
        }
      }
    }
    .el-form{
      width: 500px;
      margin: 0 auto;
    }
  }
</style>
