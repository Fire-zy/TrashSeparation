<template>
  <div class="btn-container">
    <el-input
      class="userInput"
      v-model="input"
      placeholder="请输入内容"
    ></el-input>
    <el-button type="primary">查询</el-button>
    <el-button @click="dialogFormVisible = true" type="primary">新增</el-button>

    <!-- 添加用户 -->
    <el-dialog top="8vh" title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
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
        <el-button type="primary" @click="adduser">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { addUser } from "@/api/user";

export default {
  data() {
    return {
      dataSourceId: "",
      input: "",
      dialogFormVisible: false,
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
  created() {},
  methods: {
    adduser() {
      addUser(this.form).then((res) => {
        this.dialogFormVisible = false;
        this.$emit('fatherMethod')
      });
      
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style scoped>
.btn-container {
  display: flex;
}
.userInput {
  width: 280px;
  margin-right: 10px;
}
</style>