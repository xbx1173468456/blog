<template>
  <div>
    <el-table
      ref="singleTable"
      :data="tableData"
      tooltip-effect="dark"
      border
      :height="heightUserManager"
      stripe
      v-loading="loading"
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
import methods from '@/utils/mixins/methods'
import computed from '@/utils/mixins/computed'
export default {
  name: "logTable",
  mixins: [computed, methods],
  data() {
    return {
      heightUserManager: "0",
      dictionary: []
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
  watch: {
    screenHeight(innerHeight) {
      this.heightInit(innerHeight)
    }
  },
  components: {
    pagination
  },
  methods: {
    heightInit(innerHeight) {
      const offsetTopUserManager = this.$refs.singleTable.$el.getBoundingClientRect().top;
      this.heightUserManager = innerHeight - offsetTopUserManager - 65;
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
      if (col.value == "reinput") {
        if (this.dictionary.isOrNot) {
          for (let obj of this.dictionary.isOrNot) {
            if (scope.row[col.value] == obj.code) {
              return obj.name;
            }
          }
        }
      } else if (col.value == "validateStatus") {
        for (let obj of this.dictionary.validateStatus) {
          if (scope.row[col.value] == obj.code) {
            return obj.name;
          }
        }
      } else if(col.value == 'workDay') {
        return scope.row.workDay ? scope.row.workDay.split(' ')[0] : ''
      }else {
        return scope.row[col.value];
      }
    }
  },
  created() {
    //初始化数据字典
    getEnumData(this, ["GetValidateStatusData", "GetIsOrNotData"]);
    this.dictionary = this.$store.state.common.dataEnum;
  },
  mounted() {
    this.$nextTick(() => {
      this.heightInit(this.getInnerHeight());
    })
  }
};
</script>


