<template>
  <basic-split-pane
    class="bpmaManager-container-list contractRegistration-container"
    :default-percent="75"
    :min-percent="25"
  >
    <template slot="leftContainer">
      <div class="left-container">
        <basic-handler>
          <el-button
            v-if="addBtnShowFlag"
            type="primary"
            plain
            icon="el-icon-plus"
            size="small"
            @click="addClick('add')"
          >新增</el-button>
          <el-button
            v-if="viewBtnShowFlag"
            type="primary"
            plain
            icon="el-icon-if-see"
            size="small"
            :disabled="viewBtnDisabledFlag"
            @click="addClick"
          >查看</el-button>

          <template slot="search">
            <basic-search
              ref="refBasicSearch"
              :modelSearchFilter="modelSearchFilter"
              @clickSearchFilter="clickSearchFilter"
            ></basic-search>
          </template>
        </basic-handler>

        <basic-table
          ref="refCompletionPayTableData"
          :dataTable="completionPayTableData"
          :columns="columns"
          @current-change="handleCurrentChange"
          :pagination="modelSearchFilter"
          @pagination="getAllCompletionPayData"
        >
          <template slot-scope="obj" slot="validateStatus">{{formatValidateStatus(obj.scope.row)}}</template>
          <template
            slot-scope="obj"
            slot="unpayPrice"
          >{{formatToThousands(obj.scope.row.unpayPrice)}}</template>
          <template
            slot-scope="obj"
            slot="shouldPayPriced"
          >{{formatToThousands(obj.scope.row.shouldPayPriced)}}</template>
          <template
            slot-scope="obj"
            slot="shouldPayDate"
          >{{formatDate(obj.scope.row.shouldPayDate)}}</template>
          <template
            slot-scope="obj"
            slot="qualityAssuranceScale"
          >{{formatToThousands(obj.scope.row.qualityAssuranceScale)}}</template>
          <template
            slot-scope="obj"
            slot="qualityAssurancePrice"
          >{{formatToThousands(obj.scope.row.qualityAssurancePrice)}}</template>
          <template
            slot-scope="obj"
            slot="qualityAssuranceDate"
          >{{formatDate(obj.scope.row.qualityAssuranceDate)}}</template>
          <template slot-scope="obj" slot="ifPay">{{formatIfPay(obj.scope.row)}}</template>
        </basic-table>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container">
        <page-select-filter
          :selectData="selectData"
          :data="completionPayData"
          v-model="selectValue"
          @change="contractChange"
          @refreshData="getAllItem"
        ></page-select-filter>
      </div>
    </template>
  </basic-split-pane>
</template>

<script>
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";
import formatBasic from "@/utils/mixins/formatBasic";

/**
 * api
 * */

import {
  getAllCompletionPay,
  getAllCompletionPayItem
} from "@/api/bpmaManager/subpackage/subcontractManagement/completionPay/index.js";
import { getDictionaryDataByTypeFilter } from "@/api/common/dataDictionary.js";
export default {
  name: "contractRegistration",
  // components: {
  //   pagination
  // },
  mixins: [computed, methods, formatEnum, formatBasic],
  data() {
    return {
      addBtnShowFlag: true, //待系统菜单配置
      viewBtnShowFlag: true,

      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: "",
        fuzzyKeys: "",
        proId: undefined
      },
      completionPayTableData: {
        data: [],
        total: 0
      },
      currentRow: null, //表格当前行
      columns: [
        //表格列
        {
          text: "审核状态",
          value: "validateStatus",
          width: "80",
          align: "center"
        },
        {
          text: "单据编码",
          value: "code",
          width: "130",
          align: "center",
          showOverflowTooltip: true
        },
        {
          text: "单据名称",
          value: "name",
          minWidth: 200,
          align: "left",
          headerAlign: "center",
          showOverflowTooltip: true
        },
        {
          text: "项目名称",
          value: "proName",
          width: "200",
          align: "left",
          headerAlign: "center",
          showOverflowTooltip: true
        },
        {
          text: "单位名称",
          value: "contractName",
          width: "200",
          align: "left",
          headerAlign: "center",
          showOverflowTooltip: true
        },
        {
          text: "合同名称",
          value: "contractNames",
          width: "200",
          align: "left",
          headerAlign: "center",
          showOverflowTooltip: true
        },
        {
          text: "单据金额",
          value: "unpayPrices",
          width: "150",
          align: "right",
          headerAlign: "center",
          showOverflowTooltip: true
        },
        {
          text: "业务人员",
          value: "ssssssss",
          width: "150",
          align: "right",
          headerAlign: "center",
          showOverflowTooltip: true
        },
        {
          text: "业务日期",
          value: "shouldPayDate",
          width: "140",
          align: "center",
          showOverflowTooltip: true
        },
        {
          text: "登记人员",
          value: "ssssss",
          width: "150",
          align: "right",
          headerAlign: "center",
          showOverflowTooltip: true
        },
        {
          text: "登记时间",
          value: "qualityAssuranceDate",
          width: "130",
          align: "center",
          showOverflowTooltip: true
        }
      ],

      proData: {},
      selectData: {
        data: [],
        key: "id",
        name: "name"
      },
      completionPayData: {
        name: "name",
        key: "stageId",
        data: []
      },
      selectValue: []
    };
  },
  activated() {
    this.getAllCompletionPayData();
  },
  created() {
    //初始化数据字典
    this.getEnumData(["GetValidateStatusData", "GetIsOrNotData"]);

    this.getAllItem();
    this.getStage();
  },
  computed: {
    viewBtnDisabledFlag() {
      return !(this.currentRow && this.currentRow.id);
    }
  },
  methods: {
    contractChange(data) {
      this.proData = data;
      console.log("data", data);
      if (!data) {
        return (this.completionPayTableData.data = []);
      }
      this.modelSearchFilter.proId = data.id;
      this.modelSearchFilter.proName = data.name;
      this.modelSearchFilter.proCode = data.code;
      this.getAllCompletionPayData();
    },

    addClick(param) {
      this.$store.dispatch("cacheId", "0");
      if (param === "add") {
        if (!this.$utils.isEmpty(this.proData)) {
          this.$router.push({
            name: "contractRegistrationDetail",
            params: { id: 0 },
            query: {
              name: this.modelSearchFilter.proName,
              proId: this.modelSearchFilter.proId,
              proCode: this.modelSearchFilter.proCode
            }
          });
        } else {
          this.$message({
            message: "当前无项目，无法新增结算单!",
            type: "warning"
          });
        }
      } else {
        this.$router.push({
          name: "contractRegistrationDetail",
          params: { id: this.currentRow.id }
        });
      }
    },
    /**
     * 获取完工结算列表所有数据
     * */
    getAllCompletionPayData() {
      // console.log('this.modelSearchFilter',this.modelSearchFilter)
      getAllCompletionPay(this.modelSearchFilter)
        .then(res => {
          if (res.status && res.status === 200) {
            this.completionPayTableData.data = res.data.rows;
            this.completionPayTableData.total = res.data.total;
            console.log("获取完工结算列表所有数据", res);
          } else {
            this.$message({ message: res.message, type: "warning" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * 获取完工结算项目所有数据
     * */
    getAllItem() {
      getAllCompletionPayItem({ page: 1, limit: 10000 })
        .then(res => {
          if (res.status && res.status === 200) {
            console.log("获取完工结算项目所有数据", res);

            //this.subContractChangeData.data = res.data.rows;
            this.$set(this.completionPayData, "data", res.data.rows);
            console.log("completionPayData", this.completionPayData.data);
          } else {
            this.$message({ message: res.message, type: "warning" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * 当前行
     * */
    handleCurrentChange(row) {
      console.log(row);
      this.currentRow = row;
    },
    /**
     * 关键字搜索
     */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(
        this.$refs.refCompletionPayTableData,
        this.modelSearchFilter,
        () => {
          this.getAllCompletionPayData();
        }
      );
    },
    /**
     * 前 中 后期
     * */
    getStage() {
      getDictionaryDataByTypeFilter("SYS_PRO_STAGE").then(res => {
        if (res.status && res.status === 200) {
          this.selectData.data = res.data;
          console.log("this.selectData.data", this.selectData.data);
          this.selectValue = this.selectData.data.map(item => item.id);
          console.log(this.selectValue);
        } else {
          this.$message({ message: res.message, type: "warning" });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
