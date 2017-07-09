<template>
  <div class="system">
    <div class="top">
      <Button icon="plus" @click.stop='addHandler'>创建</Button>
      <Button icon="edit" @click='disableHandler'>禁用</Button>
      <!--<Button icon="ios-trash" @click='deleteHandler'>删除</Button>-->

      <div class="search-wrapper">
        <Input icon="search" @on-click="handleIconClick" v-model="kw"></Input>
      </div>
    </div>
    <div class="table-container">
      <Table :data='showList' :columns='columns'></Table>
    </div>
    <div class="page-footer">
       <Page :total="tableData3.length" @on-change='changePage' show-total></Page>
    </div>


    <addModal v-show="showAddDialog" @toggle='toggle' :action='action' :editRow='selectRow'></addModal>
  </div>
</template>


<script>
  import addModal from './addModal.vue'

  const PAGE_SIZE = 8

  export default {
    name: 'system',

    components: {
      addModal
    },

    mounted() {
      console.log(this.Validate)
      this.axios.get(this.Validate).then(
        res => {
          if (res.data.errcode !== '0') {
            this.$message({
              message: '登录失效, 请重新登录',
              type: 'error'
            })
            // this.$router.replace({path:'login'})
            this.$router.replace({name: 'login'})
          } else {
            return this.axios.post(this.api + 'User/load',{})
          }
        }
      ).then(res => {
        this.tableData3 = res.data.resdata
      })

    },
    computed: {
      searchData () {
        if (this.kw !== '') {
          return this.tableData3.filter( i => {
            return i.userName.indexOf(this.kw) !== -1 || i.loginCode.indexOf(this.kw) !== -1
          })
        } else {
          return this.tableData3
        }
      },
      showList () {
        return this.searchData.slice((this.page - 1) * PAGE_SIZE, this.page * PAGE_SIZE)
        // return this.tableData3
      },

    },
    methods: {
      changePage(v) {
        this.page = v
      },
      toggle() {
        this.showAddDialog = ! this.showAddDialog;
      },
      addHandler() {
        this.toggle()
        this.action = 'add'
      },
      saveItem() {
        if (typeof this.editRow.date === 'string') {
          this.editRow.date = new Date(this.editRow.date).toLocaleDateString()
        } else {
          this.editRow.date = this.editRow.date.toLocaleDateString();
        }
        this.showEditDialog = false
      },
      addItem() {
        if (this.newRow.userName && this.newRow.roleType) {

          this.newRow = {
            createDate: new Date().toLocaleDateString(),
            userName: '',
            roleType: '',
            enabled: '1',
            // creator: 'admin'
          }
          this.axios(this.Validate).then(
            res => {
            if (res.data.errcode !== '0') {
              this.$message({
                message: '登录失效, 请重新登录',
                type: 'error'
              })
              this.$router.replace({path:'login'})
            } else {
              return this.axios.get(this.api + 'User/modify',
              {
                params: {
                  'strOperate': 'add'
                }
              })
            }
          }
        ).then(res => {
          // this.tableData3 = res.data.resdata
          // console.log(res)
          // new
        })

          this.tableData3.push(this.newRow)
          this.showAddDialog = false
        } else {
          this.$alert('必填项目不能为空')
          return
        }
      },
      handleIconClick(ev) {

      },

      handleEdit(index, row) {
        console.log(index, row);
        this.editRow = row
        this.showEditDialog = true
      },
      deleteHandler(id) {
        this.$confirm('删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
          return this.axios.get(this.Validate)
        }).then((res) => {
          if (res.data.errcode !== '0') {
            this.$message({
              message: '登录失效, 请重新登录',
              type: 'error'
            })
            // this.$router.replace({path:'login'})
            this.$router.replace({name: 'login'})
          } else {
            return this.axios.get( this.api + 'User/delete', { params: { IDList: id}})
          }
        }).then(res => {
          if (res.data.errcode === '0'){
            this.$message({
              type: 'info',
              message: '删除成功'
            });

          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      disableHandler() {
        this.multipleSelection.forEach(i => {
          i.status = !i.status
        })
      }
    },
    data() {
      return {
        page: 1,
        kw: '',
        action: '',
        selectRow: {},
        showAddDialog: false,
        editRow: {},
        tableData3: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '创建日期',
            key: 'createDate',
            render: (h, params) => {
              return h('span', null, new Date(params.row.createDate).toLocaleDateString())
            }
          },
          {
            title:'姓名',
            key: 'userName'
          },
          {
            title:'登录账号',
            key: 'loginCode'
          },
          {
            title:'角色',
            key: 'roleType'
          },
          {
            'title':'状态',
            'key': 'enabled',
            render: (h, params) => {
              return h('span',{
                props: {},
                style: {},
                on: {
                  click: ()=> {
                    console.log(params)
                  }
                }
              },
              params.row.enabled === 1 ? '有效': '无效'
              )
            }
          },
          {
            title:'操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {marginRight: '5px'},
                  on: {
                    click: ()=> {
                      this.selectRow = params.row
                      this.action = 'edit'
                      this.toggle()
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {marginRight: '5px'},
                  on: {
                    click: ()=> {
                      this.deleteHandler(params.row.id)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ]
      }
    }
  }

</script>

<style lang="scss" scoped>
  .system {
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    .top {
      // width: 100%;
      margin: 20px 20px 5px 20px; // border: 1px solid black;
      background-color: #fefefe;
      .search-wrapper {
        margin-left: 15px;
        display: inline-block;
        width: 200px;
      }
    }
    .table-container {
      flex: 1;
      margin: 20px 20px 0 20px;
    }
    .el-form {
      width: 500px;
      margin: 0 auto;
    }
  }

</style>
