<template>
<div>
        <Row class="expand-row">
            <div>
                <!--<span class="expand-key">联系人：</span>-->
                <!--<Tag type="border" color="blue" class="expand-key">联系人</Tag>-->
                <Tag type="border" closable color="blue" class="expand-value" @on-close='delContact(1)' click.native='test'>
                  联系人：{{row.contactPerson1|empty}}
                </Tag>
                  <Button icon="ios-plus-empty" type="dashed" size="small"   @click.native="addContact(1)" >{{!row.contactPerson1 ? '添加': '修改'}}</Button>
            </div>
            <div>
                <!--<Tag type="border" color="blue" class="expand-key">法务：</Tag>-->
                <Tag type="border" closable color="green" class="expand-value" @on-close='delContact(2)'>
                  法务：{{ row.contactPerson2|empty }}
                </Tag>
                   <Button  icon="ios-plus-empty" type="dashed" size="small" @click.native="addContact(2)" >{{!row.contactPerson2 ? '添加': '修改'}}</Button>

            </div>
            <div>
                <!--<Tag type="border" color="blue" class="expand-key">主管：</Tag>-->
                <Tag type="border" closable color="red" class="expand-value" @on-close='delContact(3)'>
                  主管：{{ row.contactPerson3|empty }}
                </Tag>
                    <Button  icon="ios-plus-empty" type="dashed" size="small" @click.native="addContact(3)">{{!row.contactPerson3 ? '添加': '修改'}}</Button>
                <!--<span class="expand-key" >主管：</span>
                <span class="expand-value">{{ row.contactPerson3|empty }}</span>-->
            </div>
        </Row>
        <contact v-if='modal2' :index='index' :customerID='row.id' :contactStr='row["contactPerson"+index]' @toggle='toggle' @addContact='addContactCb' ></contact>
    </div>
</template>

<script>
import contact from './addContact'

export default {
  name: 'expandRow',
  props: {
    row: Object
  },
  components: {
    contact
  },
  data(){
    return {
      modal2: false,
      index: ''
    }
  },

  filters: {
    empty(v){
      return v? v: '无'
    }
  },
  methods: {
    test() {
      console.log(123)
    },
    toggle(){
      this.modal2 = !this.modal2
    },
    delContact(index){
      let k =''
      if (index === 1) {
         k ='contactPerson1'
      } else if (index === 2) {
         k = 'contactPerson2'
      } else if (index ===3) {
         k = 'contactPerson3'
      }
      if (!this.row[k]) {
        this.$message({
          type: 'info',
          message: '暂无该联系人, 请先添加'
      });
        return
      }
      this.$confirm('删除该联系人, 是否继续?', '提示', {
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
            return this.axios.get( this.api + 'Customer/contract', { params: { cusid: this.row.id, contract: " ",argindex: index }})
        }
      }).then(res => {
          this.$message({
            type: 'info',
            message: res.data.resData
        });
        this.row[k] = ''
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addContactCb(str, index) {
      this.row['contactPerson' +index] = str
    },
    addContact(v){
      console.log(v),
      this.index = v
      this.toggle()
    }
  }
}
</script>
