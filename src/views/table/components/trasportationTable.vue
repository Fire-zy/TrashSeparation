<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    fit
    :default-sort="{ prop: 'sourceName', order: 'ascending' }"
  >
    <el-table-column prop="id" label="ID" sortable ></el-table-column>
    <el-table-column prop="userName" label="用户名"> </el-table-column>
    <el-table-column prop="trashSeparationPrice" label="收费价格" ></el-table-column>
    <el-table-column prop="trashStationNumber" label="运输数量" > </el-table-column>
    <el-table-column prop="trashSeparationType" label="垃圾种类"> </el-table-column>
    <el-table-column prop="transportStatus" label="运输状态" >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.transportStatus === '运输成功' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.transportStatus}}</el-tag>
      </template>
    </el-table-column>
    
    
    <el-table-column prop="caozuo" label="操作">
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
            removeId(scope.$index, tableData, scope.row.id)
          "
        ></el-button>

        <!-- 修改用户 -->
        <el-dialog top="8vh" title="修改用户" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item
              label="用户名"
              prop="userName"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="收费价格"
              prop="trashSeparationPrice"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="form.trashSeparationPrice"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="运输数量"
              prop="trashStationNumber"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.trashStationNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="运输时间"
              prop="transportationTime"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.transportationTime" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="垃圾种类"
              prop="trashSeparationType"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.trashSeparationType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="运输状态"
              prop="transportStatus"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.transportStatus" autocomplete="off"></el-input>
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
import { queryTransportation, deleteTransportation,updateTransportation } from "@/api/transportation";

export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      userId: "",
      form: {
        userName: "",
        trashSeparationPrice: "",
        trashStationNumber: "",
        trashSeparationType: "",
        transportStatus: "",
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
      queryTransportation().then((res) => {
        this.tableData = res;
      });
    },
    // 按指定id删除数据
    removeId(index, rows, id) {
      console.log(id);
      event.stopPropagation(); //不再派发事件。

      this.$confirm("此操作将永久删除该数据源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rows.splice(index, 1);
          deleteTransportation({ id: id }).then((resp) => {
              this.getList(),
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
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
      updateTransportation(this.form).then(res=>{
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