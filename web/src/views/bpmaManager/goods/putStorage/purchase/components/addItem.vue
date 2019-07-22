<template>
  <div class="personDialog">
    <basic-dialog v-el-drag-dialog :title="title" :visible.sync="dialogTableVisible">
      <div v-if="this.type !=1">
        <basic-handler>
          <el-button type="primary" size="small" icon="el-icon-refresh" plain>刷新</el-button>
          <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"></basic-search>
        </basic-handler>
        <tableItem
          :columns="columns"
          :tableData="tableData"
          :page="page"
          :highlight="true"
          @handleCurrentChange="handleCurrentChange"
          :typeTable="true"
          @currentPage="currentPage"
        ></tableItem>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="8" class="pdr10">
            <basic-table-tree
              :default-expand-all="defaultExpandAll"
              :data="treeTableData"
              :columns="treeColumns"
              border
              :height="h"
              ref="MaterialTableTree"
              @current-change="rowClick"
            >
              <template
                slot-scope="treeObj"
                slot="validateStatus"
              >{{formatValidateStatus(treeObj.scope.row)}}</template>
              <template
                slot-scope="treeObj"
                slot="ifLastLevel"
              >{{formatIfLastLevel(treeObj.scope.row)}}</template>
              <template slot-scope="treeObj" slot="enable">{{formatEnable(treeObj.scope.row)}}</template>
            </basic-table-tree>
          </el-col>
          <el-col :span="16">
            <tableItem
              :columns="columns"
              :tableData="tableData"
              :page="page"
              :highlight="true"
              @handleCurrentChange="handleCurrentChange"
              @handleSelectionChange="handleSelectionChange"
              :typeTable="true"
              :type="selection"
              @currentPage="currentPage"
              @Theight="Theight"
            ></tableItem>
          </el-col>
        </el-row>
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
      expandAll: true,
      selection: "selection",
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
      },
      modelSearchFilter: {
        page: 1,
        limit: 10,
        enable: 1,
        validateStatus: 1,
      },
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
      if (this.type == 1) {
        let arr = this.$store.getters.getselectP.concat(this.items);
        var result = [];
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
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
    tableItem
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

