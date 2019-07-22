<template>
  <div class="listManager-container">
    <div class="handler-container">
      <el-button type="primary" icon="el-icon-plus" plain @click="addTetails" size="small">新增请假</el-button>
      <el-button
        type="primary"
        plain
        @click="lookTetails"
        :disabled="status"
        size="small"
        icon="el-icon-if-see"
      >查看</el-button>
      <el-button type="primary" icon="el-icon-refresh" plain @click="getDataList" size="small">刷新</el-button>
      <el-form :inline="true" class="right">
        <el-form-item>
          <el-input
            placeholder="请输入关键字"
            v-model="search.fuzzy"
            @keyup.enter.native.prevent="searchDatalist(search.fuzzy)"
            size="small"
          >
            <i class="el-icon-search el-input__icon" slot="suffix"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="advanced-query">
          <el-button type="primary" icon="el-icon-if-query" plain size="small">高级查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="singleTable"
      :data="dataList"
      highlight-current-row
      border
      fit
      stripe
      :height="heightGateLog"
      @current-change="currentRow"
    >
      <el-table-column type="index" align="center" width="80" label="序号" />
      <el-table-column
        property="validateStatus"
        align="center"
        width="140"
        label="审核状态"
        :formatter="formatAuditStatusEnum"
      ></el-table-column>
      <el-table-column property="code" align="center" width="140" label="单据编码" />
      <el-table-column
        property="version"
        align="center"
        width="140"
        label="请假类型"
        :formatter="formatHolidayType"
      ></el-table-column>
      <el-table-column property="beginTime" align="center" width="160" label="开始时间" />
      <el-table-column property="endTime" align="center" width="160" label="截止时间" />
      <el-table-column property="duration" align="center" width="120" label="请假时长(小时)" />
      <el-table-column property="reason" align="center" label="请假事由" show-overflow-tooltip />
      <el-table-column
        property="inputPerson"
        align="center"
        label="请假人员"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        property="inputTime"
        align="center"
        label="登记时间"
        width="160"
        show-overflow-tooltip
      />
    </el-table>
    <pagination
      :total="total"
      :page.sync="search.page"
      :limit.sync="limit"
      @pagination="getDataList"
    />
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";

export default {
  name: "askForLeave",
  components: { pagination },
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      heightGateLog: "0",
      dataList: [],
      currentPage: 10,
      row: null,
      status: true,

      total: 0,
      limit: 10,
      search: {
        page: 1,
        fuzzy: "",
        fuzzyKeys: "",
        selectOwn: 1
      }
    };
  },
  created() {
    //初始化数据字典
    this.getEnumData(["GetAuditStatusEnum", "GetHolidayTypeData"]);
    let _self = this;
    this.$nextTick(() => {
      _self.heightInit(_self.getInnerHeight());
    });
  },
  watch: {
    screenHeight(innerHeight) {
      this.heightInit(innerHeight);
    }
  },
  activated() {
    this.getDataList();
  },
  methods: {
    /**
     * 高度初始化
     * @param innerHeight
     */
    heightInit(innerHeight) {
      const offsetTopGateLog = this.$refs.singleTable.$el.getBoundingClientRect()
        .top;
      this.heightGateLog = innerHeight - offsetTopGateLog - 66;
    },
    /*获取请假列表*/
    getDataList() {
      this.$store
        .dispatch("GetHolidayList", this.search)
        .then(response => {
          this.dataList = response.data.rows;
          this.total = response.data.total;
        })
        .catch(() => {
          console.log(23);
        });
    },
    /*获取当前行对象*/
    currentRow(row) {
      this.row = row;
      if (this.row && this.row.id) {
        this.status = false;
      }
    },
    /*切换至详情*/
    addTetails() {
      this.$store.dispatch("cacheId", "0");
      this.$router.push({ name: "askForLeaveDetails", params: { id: 0 } });
    },
    lookTetails() {
      this.$store.dispatch("cacheId", "0");
      this.$router.push({
        name: "askForLeaveDetails",
        params: { id: this.row.id },
        query: { id: this.row.id }
      });
    },
    /*分页查询*/
    searchDatalist(fuzzy) {
      this.search.fuzzy = fuzzy;
      this.getDataList();
    }
  }
};
</script>

<style scoped>
</style>
