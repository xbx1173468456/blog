<template>
  <basic-split-pane class="bpmaManager-container-list purchaseSettlement-container" :default-percent='75'
    :min-percent='25'>
    <template slot="leftContainer">
      <div class="left-container">
        <basic-handler>
          <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
            @click="addClick('add')">新增结算单</el-button>
          <el-button v-if="viewBtnShowFlag" type="primary" plain icon="el-icon-if-see" size="small"
            :disabled="viewBtnDisabledFlag" @click="addClick">查看</el-button>
          <template slot="search">
            <basic-search ref="refBasicSearch" :isAdvancedQuery="true" :modelSearchFilter="modelSearchFilter"
              @clickSearchFilter="clickSearchFilter"></basic-search>
          </template>
        </basic-handler>
        <basic-table ref="refMaterialBuyPayTableData" :dataTable="materialBuyPayTableData" :columns="columns"
          @current-change="handleCurrentChange" :pagination="modelSearchFilter" @pagination="getAllMaterialBuyPayData">
          <template slot-scope="obj" slot="validateStatus">
            {{formatValidateStatus(obj.scope.row)}}
          </template>
          <template slot-scope="obj" slot="price">
            {{formatToThousands(obj.scope.row.price)}}
          </template>
          <template slot-scope="obj" slot="handleDate">
            {{formatDate(obj.scope.row.handleDate)}}
          </template>
          <template slot-scope="obj" slot="ifPay">
            {{formatIfPay(obj.scope.row)}}
          </template>
        </basic-table>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container">
        <page-select-filter :selectData="selectData" :data="materialBuyPayData" v-model="selectValue"
          @change="contractChange" @refreshData="refreshData"></page-select-filter>
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
    getAllMaterialBuyPay,
    getAllMaterialBuyPayItem
  } from "@/api/bpmaManager/goods/purchase/purchaseSettlement/index"
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  export default {
    name: 'PurchaseSettlement',
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
          fuzzy: '',
          fuzzyKeys: '',
          proId: undefined,
        },
        materialBuyPayTableData: {
          data: [],
          total: 0
        },
        currentRow: null, //表格当前行
        columns: [ //表格列
          {
            text: '审核状态',
            value: 'validateStatus',
            width: '80',
            align: "center",
          },
          {
            text: '单据编码',
            value: 'code',
            width: '130',
            align: "center",
            showOverflowTooltip: true
          },
          {
            text: '单据名称',
            value: 'name',
            minWidth: 100,
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          },
          {
            text: '项目名称',
            value: 'proName',
            width: '100',
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          },
          {
            text: '单位名称',
            value: 'enterpriseName',
            width: '100',
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          },
          {
            text: '合同名称',
            value: 'contractName',
            width: '100',
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          }, {
            text: '本次结算总额',
            value: 'price',
            width: '140',
            align: "right",
            headerAlign: "center",
            showOverflowTooltip: true
          }, {
            text: '结算人员',
            value: 'handlePerson',
            width: '120',
            align: "center",
            showOverflowTooltip: true
          }, {
            text: '结算日期',
            value: 'handleDate',
            width: '140',
            align: "center",
            showOverflowTooltip: true
          }, {
            text: '是否结算',
            value: 'ifPay',
            width: '100',
            align: "center",
            headerAlign: "center",
            showOverflowTooltip: true
          }, {
            text: '补充说明',
            value: 'remark',
            width: '140',
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          }
        ],
        proData: {},
        selectData: {
          data: [],
          key: 'id',
          name: 'name'
        },
        materialBuyPayData: {
          name: 'name',
          key: 'stageId',
          data: []
        },
        selectValue: [],
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetIsOrNotData'
      ]);
      this.getAllItem();
      this.getStage();
    },
    activated() {
      this.refreshData()
    },
    computed: {
      viewBtnDisabledFlag() {
        return !(this.currentRow && this.currentRow.id);
      }
    },
    methods: {
      contractChange(data) {

        this.proData = data;
        if (!data) {
          return this.materialBuyPayTableData.data = []
        }
        this.modelSearchFilter.proId = data.id;
        this.modelSearchFilter.proName = data.name;
        this.modelSearchFilter.proCode = data.code;
        this.getAllMaterialBuyPayData();
      },

      addClick(param) {
        if (param === 'add') {
          if (!this.$utils.isEmpty(this.proData)) {
            this.$store.dispatch("cacheId", '0')
            this.$router.push({
              name: 'PurchaseSettlementDetail',
              params: {
                id: 0
              },
              query: {
                name: this.modelSearchFilter.proName,
                proId: this.modelSearchFilter.proId,
                proCode: this.modelSearchFilter.proCode
              }
            })
          } else {
            this.$message({ message: '当前无项目，无法新增结算单!', type: 'warning' })
          }
        } else {
          this.$router.push({ name: 'PurchaseSettlementDetail', params: { id: this.currentRow.id } })
        }
      },
      /**
       * 获取采购结算列表所有数据
       * */
      getAllMaterialBuyPayData() {
        if(!this.modelSearchFilter.proId) return
        getAllMaterialBuyPay(this.modelSearchFilter).then((res) => {
          if (res.status && res.status === 200) {

            this.materialBuyPayTableData.data = res.data.rows;
            this.materialBuyPayTableData.total = res.data.total;
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      refreshData() {
        this.getAllMaterialBuyPayData()
      },
      /**
       * 获取采购结算项目所有数据
       * */
      getAllItem() {
        getAllMaterialBuyPayItem().then((res) => {

          if (res.status && res.status === 200) {
            this.$set(this.materialBuyPayData, 'data', res.data.rows)
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 当前行
       * */
      handleCurrentChange(row) {
        this.currentRow = row
      },
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refMaterialBuyPayTableData, this.modelSearchFilter, () => {
          this.getAllMaterialBuyPayData();
        });
      },
      /**
       * 前 中 后期
       * */
      getStage() {
        getDictionaryDataByTypeFilter('SYS_PRO_STAGE')
          .then((res) => {
            if (res.status && res.status === 200) {
              this.selectData.data = res.data;
              this.selectValue = this.selectData.data.map(item => item.id)
            } else {
              this.$message({ message: res.message, type: 'warning' })
            }
          })
      },
    }
  }
</script>

<style scoped>

</style>