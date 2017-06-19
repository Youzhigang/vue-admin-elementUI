<template>
  <div class="renew">
    <div class="top">
     <div class="search-wrapper">
        <el-input icon="search" :on-icon-click="handleIconClick"></el-input>
      </div>
      <el-button :plain="true"  icon="d-arrow-right" @click='expandHandle' >{{expands.length===0 ? '展开': '关闭'}}</el-button >
      <el-button :plain="true"  icon="share" @click='renewHandle'>续费</el-button >
    </div>
    <div class="table-container">
    <el-table
    :data="tableData5"
    :row-key="getRowKeys"
    :expand-row-keys="expands" border
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 95%">
    <el-table-column type="expand">
      <template scope="props">
        <ul>
          <li v-for="(t,i) in props.row.period" class="period-item">
              <el-tag type='gray'>{{i+1}}</el-tag>

              <el-tag :type = "typeMap[i%5]">{{ t }}</el-tag>
          </li>
        </ul>

      </template>
    </el-table-column>
    <!--<el-table-column type="selection" width="45"></el-table-column>-->
    <el-table-column type="index" width="40"></el-table-column>
    <el-table-column label="订单号" prop="id"></el-table-column>
    <el-table-column label="客户名称" prop="name"></el-table-column>
     <el-table-column label="服务" width='200'>
      <template scope='scope'>
        <span v-for="s in scope.row.service" style="margin-right:15px">{{s}}</span>
      </template>
     </el-table-column>
    <el-table-column label="状态" width='80' prop="status"></el-table-column>
     <el-table-column label="最近服务时间" width='280'>
      <template scope='scope'>
          <span>
            <el-icon name="time"></el-icon>
            {{scope.row.period[0]}}
          </span>

      </template>
     </el-table-column>
  </el-table>
    </div>

    <div class="page-footer">
        <el-pagination layout="prev, pager, next" :total="510" small></el-pagination>
    </div>



      <!--续费-->
    <el-dialog title="续费" :visible.sync="showRenewDialog">
        <el-form  label-width="80px" :model = 'currentRow'>
          <el-form-item label="客户名称"  prop='name' >
            <el-input auto-complete="off" :value='currentRow.name'></el-input>
          </el-form-item>
          <el-form-item label="客户地址" prop='address'>
          <el-input auto-complete="off" :value='currentRow.address'></el-input>
        </el-form-item>
        <!--<el-form-item label="客户简称" prop='shortName'>
          <el-input auto-complete="off" :value='currentRow.shortName'></el-input>
        </el-form-item>-->
        <!--<el-form-item label="客户编码" prop='person'>
          <el-input auto-complete="off" :value='currentRow.person' ></el-input>
        </el-form-item>-->
        <!--<el-form-item label="服务律师" prop='observer'>
          <el-input auto-complete="off" :value='currentRow.observer' ></el-input>
        </el-form-item>-->
         <el-form-item label="服务费用" prop='price'>
          <el-input auto-complete="off" :value='currentRow.price|test'></el-input>
        </el-form-item>
        <el-form-item label='服务类型' prop='service'>
         <el-select v-model="currentRow.service" placeholder="请选择服务" clearable multiple  >
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
          </el-form-item>
        <el-form-item label="服务时间"  prop='date2'>
          <el-date-picker
            v-model="currentRow.date2"
            type="daterange"
             align="right"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
          <div class="button-wrapper">
            <el-form-item>
              <el-button type="primary" @click="renewItem">续费</el-button>
              <!--<el-button @click="resetForm('addForm')">重置</el-button>-->
            </el-form-item>
          </div>
        </el-form>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'renew',
    mounted () {
      // Array.prototype.forEach.call(this.tableData5, a => this.expands.push(a.id))
      this.typeMap = ['gray','primary','success','warning', 'danger'].reverse()
    },
    filters: {
      test (val) {
        if (val) {
          return val + '￥'
        }
         return
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleIconClick () {

      },
      expandHandle() {
        this.expands.length === 0 ? Array.prototype.forEach.call(this.tableData5, a => this.expands.push(a.id)) :this.expands = []
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
        options: ['云服务','律师咨询'],
        showRenewDialog:false,
        currentRow: {},
        getRowKeys(row) {
          return row.id
        },
        expands: [],
        tableData5: [{
          id: '12987122',
          name: '常熟大金化工',
          service: ['云服务','律师咨询'],
          status: '有效',
          period:['2016.9-2017.9','2015.9-2016.8','2012.9-2015.9'],
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          price:100000,
        }, {
          id: '12987123',
          name: '常熟大金化工',
          service: ['云服务','律师咨询'],
          status: '有效',
          period:['2016.9-2017.9','2015.9-2016.8','2012.9-2015.9'],
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          price:100000,
        }, {
          id: '12987125',
          name: '常熟大金化工',
          service: ['律师咨询'],
          status: '有效',
          period:['2016.9-2017.9','2015.9-2016.8','2012.9-2015.9'],
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          price:100000,
        }, {
          id: '12987126',
          name: '常熟大金化工',
          service: ['云服务'],
          status: '有效',
          period:['2016.9-2017.9','2015.9-2016.8','2012.9-2015.9'],
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          price:100000,
        }],
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
  /*.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }*/

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
