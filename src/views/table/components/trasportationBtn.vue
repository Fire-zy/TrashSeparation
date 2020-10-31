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
        <el-form-item label="收费价格" :label-width="formLabelWidth">
          <el-input v-model="form.trashSeparationPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="运输数量" :label-width="formLabelWidth">
          <el-input v-model="form.trashStationNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="运输时间" :label-width="formLabelWidth">
          <el-input v-model="form.transportationTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="垃圾种类" :label-width="formLabelWidth">
          <el-input v-model="form.trashSeparationType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="运输状态" :label-width="formLabelWidth">
          <el-input v-model="form.transportStatus" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addtransportation">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { addTransportation } from "@/api/transportation";

export default {
  data() {
    return {
      dataSourceId: "",
      input: "",
      dialogFormVisible: false,
      form: {
        userName: "",
        trashSeparationPrice: "",
        trashStationNumber: "",
        transportationTime: "",
        trashSeparationType: "",
        transportStatus: "",
      },
      formLabelWidth: "120px",
    };
  },
  directives: {
    waves,
  },
  created() {},
  methods: {
    addtransportation() {
      addTransportation(this.form).then((res) => {
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