<template>
  <div>
    <el-table
      ref="singleTable"
      :data="tableData"
      tooltip-effect="dark"
      border
      v-loading="loading"
      stripe
      :height="heightUserManager"
      :highlight-current-row="highlight"
      @row-dblclick="dblclick"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column :type="type" label="序号" width="60" align="center"></el-table-column>
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
          <div>{{formatter(scope,col)}}</div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="page.total>0"
      :total="page.total"
      :page.sync="page.currentPage"
      :limit.sync="page.pageSize"
      @pagination="currentPage"
    />
  </div>
</template>
<script>
import pagination from "@/components/Pagination";
import { getEnumData } from "utils";
export default {
  name: "logTable",
  data() {
    return {
      heightUserManager: "0",
      dictionary: ""
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
            this.$emit("Theight", this.heightUserManager);
        } else {
          this.heightUserManager =
            document.documentElement.clientHeight - 204 ||
            document.body.clientHeight - 204;
        }
      });
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
      if (col.value == "validateStatus") {
        for (let obj of this.dictionary.validateStatus) {
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
    getEnumData(this, ["GetValidateStatusData"]);
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


