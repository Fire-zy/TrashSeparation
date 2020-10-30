<template>
  <div class="tab-container">
    <el-tabs style="margin: 30px 0px" type="border-card">
      <!-- 添加的按钮 -->
      <user-btn @fatherMethod="fatherMethod"></user-btn>
      <!-- 调用userTable -->
      <user-table ref='child'></user-table>
      <!-- <source-table  ref='child'></source-table> -->
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </el-tabs>
  </div>
</template>

<script>
import userTable from './components/userTable';
import userBtn from './components/userBtn';
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "DashBoard",
  components:{userTable,userBtn},
  directives: {
    waves,
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        sourceName: "zytest",
        dataSourceType: "mysql",
        username: "root",
        password: "1lLsuiB9S6w6tvCxQVq9Pi1tzLcZsLTP3fPWiaSVBvekADGgePX881qnI6Lp",
        driverClassName: "com.mysql.cj.jdbc.Driver",
        dataSourceUrl: "jdbc:mysql://39.96.79.148:3308/data_governance?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai&useSSL=false",
      },
      
      formLabelWidth: "120px",
    };
  },
  watch: {},
  created() {},
  methods: {
    // 调用getlist()
    fatherMethod(){
      this.$refs.child.getList()
    }
    
  },
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}


.ceshi{
  margin-left: 120px;
}

.header {
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.icon-class {
  color: black;
}

.el-pagination {
  margin-top: 20px;
  margin-left: -10px;
}
</style>
