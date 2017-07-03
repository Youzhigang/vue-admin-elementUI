<template>
  <div class="system">
    <div class="top">
      <Button icon="plus" @click.stop='addHandler'>创建</Button>
      <Button icon="edit" @click='disableHandler'>禁用</Button>
      <Button icon="ios-trash" @click='deleteHandler'>删除</Button>

      <div class="search-wrapper">
        <el-input icon="search" :on-icon-click="handleIconClick"></el-input>
      </div>
    </div>
    <div class="table-container">
      <Table :data='tableData3' :columns='columns'></Table>
    </div>
    <div class="page-footer">
      <el-pagination layout="prev, pager, next" :total="510" small></el-pagination>
    </div>

    <!--edit-->
    <!--<el-dialog title="编辑" :visible.sync="showEditDialog">
      <el-form label-width="80px" :model='editRow'>
        <el-form-item label="创建日期" prop='date'>
          <el-date-picker v-model="editRow.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop='name'>
          <el-input auto-complete="off" v-model='editRow.name'></el-input>
        </el-form-item>
        <el-form-item label="角色" prop='role'>
          <el-select v-model='editRow.role' placeholder="请选择角色">
            <el-option v-for="item in options" :key='item.value' :label='item.label' :value='item.value'></el-option>
          </el-select>
        </el-form-item>
        <div class="button-wrapper">
          <el-form-item>
            <el-button type="primary" @click="saveItem">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>-->
    <!--add-->
    <!--<el-dialog title="新增" :visible.sync="showAddDialog">
      <el-form label-width="80px" :model='newRow'>

        <el-form-item label="*姓名" prop='name'>
          <el-input auto-complete="off" v-model='newRow.userName'></el-input>
        </el-form-item>
        <el-form-item label="*角色" prop='role'>

          <el-select v-model='newRow.roleType' placeholder="请选择角色">
            <el-option v-for="item in options" :key='item.value' :label='item.label' :value='item.value'></el-option>
          </el-select>
        </el-form-item>
        <div class="button-wrapper">
          <el-form-item>
            <el-button type="primary" @click="addItem">保存</el-button>

          </el-form-item>
        </div>
      </el-form>
    </el-dialog>-->
  </div>
</template>


<script>


  export default {
    name: 'system',

    mounted() {
      console.log(this.Validate)
      this.axios.get(this.Validate).then(
        res => {
          if (res.data.errcode !== '0') {
            this.$message({
              message: '登录失效, 请重新登录',
              type: 'error'
            })
            this.router.replace({path:'login'})
          } else {
            return this.axios.post(this.api + 'User/load',{})
          }
        }
      ).then(res => {
        this.tableData3 = res.data.resdata
      })

    },
    methods: {
      addHandler() {
        this.showAddDialog = true;
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
        })

          this.tableData3.push(this.newRow)
          this.showAddDialog = false
        } else {
          this.$alert('必填项目不能为空')
          return
        }
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.editRow = row
        this.showEditDialog = true
      },
      deleteHandler() {
        this.multipleSelection.forEach((i, index) => {
          if (this.tableData3.indexOf(i) !== -1) {
            this.tableData3.splice(index, 1)
          }
        })
      },
      disableHandler() {
        this.multipleSelection.forEach(i => {
          i.status = !i.status
        })
      }
    },
    data() {
      return {
        multipleSelection: [],
        showEditDialog: false,
        showAddDialog: false,
        editRow: {},
        newRow: {
          createDate: '',
          userName: '',
          enabled: '1',
          roleType: ''

        },

        options: [{
            value: 'administrator',
            label: '管理员'
          },
          {
            value: 'guest',
            'label': '普通用户'
          }
        ],
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
                    clicl: ()=> {

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
