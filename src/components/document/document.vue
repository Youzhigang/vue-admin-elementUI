<template>
  <div class="archive">
    <div class="left-section">
      <el-input icon="search" :on-icon-click="searchIconClick"></el-input>
      <ul class="list">
        <li v-for="item in listData" :key='item'>{{item}}</li>

      </ul>
    </div>
    <div class="right-section">
      <div class="btn-group">
        <Button icon="plus" @click='toggle'>上传文件</Button>
        <Button icon="edit" @click='disableHandler'>禁用</Button>
        <Button icon="delete" @click='multiDel'>删除</Button>
        <Button  icon="share" >分发</Button >
        <!--<Upload
          multiple
          action="//jsonplaceholder.typicode.com/posts/">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>-->

      </div>
      <div class="table-container">

      </div>
      <div class="page-footer">
          <!--<Page :total="tableData.length" @on-change='changePage' show-total></Page>-->
      </div>
    </div>
    <!--edit-->
    <!--<el-dialog title="编辑" :visible.sync="showEditDialog">
        <el-form  label-width="80px" :model = 'editRow'>
          <el-form-item label="名称"  prop='name' >
            <el-input auto-complete="off" v-model='editRow.name'></el-input>
          </el-form-item>
          <el-form-item label="地址" prop='address'>
          <el-input auto-complete="off" v-model='editRow.address'></el-input>
        </el-form-item>
        <el-form-item label="时间"  prop='date'>
          <el-date-picker
            v-model="editRow.date"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
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
        <el-form  label-width="80px" :model = 'newRow'>
          <el-form-item label="名称"  prop='name' >
            <el-input auto-complete="off" v-model='newRow.name'></el-input>
          </el-form-item>
          <el-form-item label="地址" prop='address'>
          <el-input auto-complete="off" v-model='newRow.address'></el-input>
        </el-form-item>
        <el-form-item label="时间"  prop='date'>
          <el-date-picker
            v-model="newRow.date"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
        </el-form-item>
          <div class="button-wrapper">
            <el-form-item>
              <el-button type="primary" @click="addItem">保存</el-button>
            </el-form-item>
          </div>
        </el-form>
    </el-dialog>-->
    <upModal v-if="showAddDialog" @toggle='toggle'></upModal>
  </div>
</template>


<script>
  import upModal from './upload.vue'


  export default {
    name: 'document',
    components: {
      upModal
    },
    mounted() {
      console.log(new Date)
      this.fetchDocList()
      // this.axios.get(this.api + 'User/get').then(res => console.log(res))
    },
    methods: {
      fetchDocList(){
        // this.axios.get()
         this.axios.get(this.Validate).then( res => {
            if (res.data.errcode !== '0') {
                this.$message({
                  message: '登录失效, 请重新登录',
                  type: 'error'
                })
                this.$router.replace({name: 'login'})
            } else {
              return this.axios.post(this.api + 'Document/loadList', {})
            }
         }).then(
          res => {
            console.log(res)
          }
        )
      },

      toggle(){
        console.log(123)
        this.showAddDialog = !this.showAddDialog
      },

      searchIconClick() {
        console.log('search');
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        this.showEditDialog = true
        console.log(index, row);
        const h = this.$createElement;
        this.editRow = row
      },
      addItem() {
        this.newRow.date = this.newRow.date.toLocaleDateString()
        this.tableData3.push(this.newRow)
        this.newRow ={date: '', name:'' ,status: false, address: ''}
        this.showAddDialog = false
      },
      saveItem() {
        if (typeof this.editRow.date === 'string') {
          this.editRow.date = new Date(this.editRow.date).toLocaleDateString()
        } else {
          this.editRow.date = this.editRow.date.toLocaleDateString();
        }
        this.showEditDialog = false
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm(`第${index+1}条项目`, '确定删除吗', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData3.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },

    data() {
      return {
        showAddDialog: false,
        editRow: {},
        newRow: {date: '', name:'' ,status: false, address: ''},
        listData: [
          "常熟英迈","三菱电机","三菱电机","三菱电机","三菱电机","三菱电机","三菱电机"
        ],
        tableData: [],
      }
    }
  }

</script>


<style lang="scss" scoped>
  .archive {
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    .left-section {
      // width: 100%;
      flex: 0 200px;
      margin: 20px 20px 5px 20px; // border: 1px solid black;
      background-color: #fefefe; // .search-wrapper{
      //   margin-left: 15px;
      //   display: inline-block;
      //   width: 200px;
      // }
      .list {
        box-shadow: 0px 0px 2px 0px #000;
        border-radius: 4px;
        height: calc(100% - 100px);
        margin-top: 20px; // border:1px solid black;
        padding: 15px 15px 0px 15px;
        li {
          font-size: 15px;
          margin-left: 10px;
          letter-spacing: 1px;
          padding: 0;
          margin-top: 10px;
          list-style: none;

          &:after{
            display: block;
            content: '';
            border: none;
            margin-top: 5px;
            height: 1px;
            background-color: #bbb;
            max-width: 400px;
            background-image: -webkit-linear-gradient(0deg, blue, #bbb, #fff);
          }
          &:hover{
            cursor: pointer;
            color: blue;
          }
        }
      }
    }
    .right-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      .btn-group{
        margin: 20px 20px 0 0;

      }
      .table-container {
        // margin: 20px 20px 0 0;
        flex:1;
        margin-top: 20px;
        width: calc(100% - 50px);
      }
    }
    .el-form{
      width: 500px;
      margin: 0 auto;
    }
  }

</style>
