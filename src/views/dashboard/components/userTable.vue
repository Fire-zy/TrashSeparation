<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    fit
    :default-sort="{ prop: 'sourceName', order: 'ascending' }"
  >
    <el-table-column prop="userId" label="ID" sortable width="200px">
    </el-table-column>
    <el-table-column prop="userName" label="用户名"> </el-table-column>
    <el-table-column prop="phoneNumber" label="电话" width="250">
    </el-table-column>
    <el-table-column prop="email" label="邮箱" width="250px"> </el-table-column>
    <el-table-column prop="caozuo" label="操作" width="250px">
      <template slot-scope="scope">
        <el-button
          v-waves
          icon="el-icon-edit"
          circle
          @click="handleEdit(scope.$index, scope.row)"
        ></el-button>
        <!-- <el-button v-waves icon="el-icon-refresh-right" circle></el-button> -->
        <el-button
          v-waves
          icon="el-icon-delete"
          circle
          @click.native.prevent="
            removeId(scope.$index, tableData, scope.row.userId)
          "
        ></el-button>

        <!-- 修改用户 -->
        <el-dialog top="8vh" title="添加用户" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item
              label="用户名"
              prop="userName"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="电话"
              prop="phoneNumber"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="form.phoneNumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="邮箱"
              prop="email"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="editUser('form')" type="primary">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { queryUser, deleteUser,updateUser } from "@/api/user";

export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      userId: "",
      form: {
        userName: "",
        phoneNumber: "",
        email: "",
        //   delivery: false,
      },
      formLabelWidth: "120px",
    };
  },
  directives: {
    waves,
  },
  created() {
    this.getList();
  },
  methods: {
    // 查询列表
    getList() {
      queryUser().then((res) => {
        this.tableData = res;
      });
    },
    // 按指定id删除数据
    removeId(index, rows, id) {
      console.log(index);
      event.stopPropagation(); //不再派发事件。

      this.$confirm("此操作将永久删除该数据源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rows.splice(index, 1);
          deleteUser({ userId: id }).then((resp) => {
            if (resp.code == 200) {
              this.getList(),
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleEdit(index, row) {
      this.dialogFormVisible = true,
      this.form = Object.assign({}, row);
    },
// 修改用户
    editUser(){
      updateUser(this.form).then(res=>{
        this.dialogFormVisible = false,
        this.getList(),
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    }
  },
};
</script>


<style scoped>
</style>