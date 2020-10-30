<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    fit
    :default-sort = "{prop: 'sourceName', order: 'ascending'}"
    >
    <el-table-column
      prop="userId"
      label="ID"
      sortable
      width="200px"
      >
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户名"
      >
    </el-table-column>
    <el-table-column
      prop="phoneNumber"
      label="电话"
      width="250"
      >
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="250px"
      >
    </el-table-column>
    <el-table-column
      prop="caozuo"
      label="操作"
      width="250px">
      <template slot-scope="scope">
        <el-button v-waves  icon="el-icon-edit" circle></el-button>
        <el-button v-waves  icon="el-icon-refresh-right" circle></el-button>
        <el-button v-waves  icon="el-icon-delete" circle @click.native.prevent="removeId(scope.$index, tableData,scope.row.userId)"></el-button>
      </template>
    </el-table-column>


    <!-- 修改用户 -->
    <el-dialog top="8vh" title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="tableData">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="">确 定</el-button>
      </div>
    </el-dialog>
  </el-table>
</template>

<script>
import waves from '@/directive/waves/index.js' // 水波纹指令
import {queryUser,deleteUser} from '@/api/user'

export default {
    data() {
      return {
        dialogFormVisible: false,
        tableData: [],
        userId:'',
        form: {
          userName: "",
          phoneNumber: "",
          email: "",
          //   delivery: false,
        },
        formLabelWidth: "120px",
      }
    },
    directives: {
    waves
  },
  created() {
    this.getList()
  },
  methods: {
    // 查询列表
    getList(){
      queryUser().then(res=>{
        this.tableData=res
      })
    },
    // 按指定id删除数据
    removeId(index, rows, id) {
      event.stopPropagation()//不再派发事件。

      this.$confirm('此操作将永久删除该数据源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1)
        deleteUser({'userId':id}).then(resp => {

          if (resp.code == 200) {
            this.getList(),
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
  }
}
</script>


<style scoped>
  
</style>