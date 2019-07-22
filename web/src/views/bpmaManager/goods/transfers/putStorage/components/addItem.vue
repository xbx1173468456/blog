<template>
  <div class="personDialog">
    <basic-dialog v-el-drag-dialog :title="title" :visible.sync="dialogTableVisible">
      <div v-if="this.type ==2">
        <tableItem
          :columns="columns"
          :tableData="tableData"
          :page="page"
          :highlight="true"
          :selection="selection"
          @handleCurrentChange="handleCurrentChange"
          :typeTable="true"
          @currentPage="currentPage"
        ></tableItem>
      </div>
      <div v-if="this.type ==3">
        <tableItem2
              :columns="columns"
              :tableData="tableData"
              :page="page"
              :highlight="true"
              @handleCurrentChange="handleCurrentChange"
              @handleSelectionChange="handleSelectionChange"
              :typeTable="true"
              :selection="selection2"
              @currentPage="currentPage"
              @Theight="Theight"
            ></tableItem2>
      </div>
      <div class="btnPerson">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>
<script>
import tableItem from "./logTable";
import tableItem2 from "./logTable2";
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";
export default {
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      columns: [],
      treeColumns: [],
      type: "",
      selection:'index',
      selection2:'selection',
      expandAll: true,
      title: "",
      h: 0,
      dialogTableVisible: false,
      tableData: [],
      treeTableData: [],
      items: {},
      pagination: {},
      Th: {},
      defaultExpandAll: false,
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  methods: {
    rowClick(e) {
      // console.log(e,'eee')
      this.$emit("getCheckTree", e, this.pagination);
    },
    Theight(h) {
      this.h = h + 44;
      this.Th = {
        height: `${h + 43}px`,
        overflow: "auto",
        "border-bottom": "1px solid #ebeef5"
      };
    },
    handleCurrentChange(o) {
      this.items = o;
    },
    handleSelectionChange(o) {
      this.items = o;
    },
    currentPage(pages) {
      this.$emit("currentPage", pages, this.type);
    },
    save() {
      //inDetailId
      if (this.type == 3) {
        let arr = this.$store.getters.getselectP.concat(this.items);
        var result = [];
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
          console.log(arr[i], "i");
          if (!obj[arr[i].code]) {
            result.push(arr[i]);
            obj[arr[i].code] = true;
          }
        }
        this.$store.dispatch("setSelectP", result);
        this.$emit("getItem", [result, this.type]);
      } else {
        this.$emit("getItem", [this.items, this.type]);
      }
      // return
      this.closeDialog();
    },
    closeDialog() {
      this.dialogTableVisible = false;
    },
    openDialog() {
      this.dialogTableVisible = true;
    },
    checkTreeOne(num) {
      this.$refs.MaterialTableTree.setCurrentRow(num, true);
    }
  },
  components: {
    tableItem,
    tableItem2
  }
};
</script>
<style>
.basic-dialog {
  width: 80%;
}
.mt10 {
  margin-top: 10px;
}
.pdr10 {
  padding-right: 10px;
}
.btnPerson {
  text-align: right;
  margin-top: 10px;
}
</style>

