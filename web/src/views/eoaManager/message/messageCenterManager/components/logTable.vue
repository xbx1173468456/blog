<template>
  <div class="mtb">
    <el-table
      ref="singleTable"
      :data="tableData"
      v-loading="loading"
      tooltip-effect="dark"
      :height="heightUserManager"
      border
      stripe
      :highlight-current-row="highlight"
      @row-dblclick="dblclick"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column :type="type" label="序号" width="70" align="center"></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        v-for="(col,i) in columns"
        :label="col.text"
        :key="i"
        :width="col.width"
        :class-name="col.align"
      >
        <template slot-scope="scope">
          <div v-if="col.value != 'messageCode'">{{formatter(scope,col)}}</div>
          <div v-else="col.value == 'messageCode'">
            <el-button type="text" @click="showDetail(scope.row)">{{formatter(scope,col)}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination mt10">
      <pagination
        v-show="page.total>0"
        :total="page.total"
        :page.sync="page.currentPage"
        :limit.sync="page.pageSize"
        @pagination="currentPage"
      />
    </div>
  </div>
</template>
<script>
import pagination from "@/components/Pagination";
import { getEnumData } from "utils";
export default {
  name: "logTable",
  data() {
    return {
      dictionary: [],
      heightUserManager: "0"
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: []
    },
    tableData: {
      type: Array,
      default: []
    },
    page: {
      type: Object,
      default: {}
    },
    type: {
      type: String,
      default: "index"
    },
    highlight: {
      type: Boolean,
      default: true
    },
    typeTable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    pagination
  },
  methods: {
    heightInit() {
      this.$nextTick(() => {
        if (this.typeTable) {
          this.heightUserManager =
            document.documentElement.clientHeight - 300 ||
            document.body.clientHeight - 300;
        } else {
          this.heightUserManager =
            document.documentElement.clientHeight - 285 ||
            document.body.clientHeight - 300;
        }
      });
    },
    showDetail(a) {
      this.$emit("dblclick", a);
    },
    currentPage(pages) {
      this.$emit("currentPage", pages);
    },
    handleCurrentChange(o) {
      if (o) {
        this.$emit("handleCurrentChange", o.id);
      }
    },
    handleSelectionChange(v) {
      this.$emit("handleSelectionChange", v);
    },
    dblclick(row) {
      this.$emit("dblclick", row);
    },
    formatter(scope, col) {
      if (col.value == "readStatus") {
        for (let obj of this.dictionary.readStatus) {
          if (scope.row[col.value] == obj.code) {
            return obj.name;
          }
        }
      } else {
        return scope.row[col.value];
      }
    }
  },
  created() {
    //初始化数据字典
    getEnumData(this, ["GetReadStatus"]);
    this.dictionary = this.$store.state.common.dataEnum;
  },
  mounted() {
    this.heightInit();
    let that = this;
    window.onresize = function() {
      that.heightInit();
    };
  }
};
</script>
<style scoped>
.mt10 {
  margin-top: 15px;
}
.pagination {
  text-align: right;
}
.el-table td.is-center.left {
  text-align: left !important;
}
.mtb >>> .el-table--medium td {
  padding: 5px 0 !important;
}
</style>


