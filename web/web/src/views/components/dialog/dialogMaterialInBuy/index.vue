<!-- 采购入库单 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refMaterialInBuyTableData" @selection-change="selectionChangeMaterialInBuy"
  :dataTable="materialInBuy.tableData" :columns="materialInBuy.tableColumns"
  @current-change="currentChangeMaterialInBuy" :pagination="modelSearchFilter" @pagination="getGoodslist">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectableMaterialInBuy" />
    </template>

    <template slot-scope="obj" slot="buySum">
      {{formatToThousandsFour(obj.scope.row.buySum)}}
    </template>
    <template slot-scope="obj" slot="buyUnitPrice">
      {{formatToThousandsFour(obj.scope.row.buyUnitPrice)}}
    </template>
    <template slot-scope="obj" slot="buyTotalPrice">
      {{formatToThousands(obj.scope.row.buyTotalPrice)}}
    </template>

  </basic-table>
</div>
</template>

<script>
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";
  import {
    getMaterialInBuy,
  } from '@/api/common/dialog/dialogMaterialInBuy'
  import pagination from '@/components/Pagination'
  export default {
    name: "dialogMaterialInBuy",
    mixins: [computed, methods, formatEnum,formatBasic],
    components: {pagination},
    props:{
      materialInBuyData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
      filterValid: Boolean,
      filterUnit: Boolean,
      proId: [Number, String],
      offerEnterpriseId: [Number, String],
      contractId: [Number, String]
    },
    data(){
      return {
        defaultExpandAll: false,
        filterText: '',
        modelSearchFilter: {
          page: 1,
          limit: 10,
          enable: 1,
          validateStatus: 1,
          // ifPay:2,
          fuzzyKeys: '',
          fuzzy: '',
          ifPay: 2
        },
        tableShow: false,
        materialInBuy: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              expand: true,
              text:'单据编码',
              value:'masterCode',
              align: "center",
              width: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '单据名称',
              value: 'masterName',
              align: "left",
              width: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },{
              text: '物资编码',
              value: 'code',
              align: "center",
              width: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '物资名称',
              value: 'name',
              minWidth: '200',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'规格型号',
              value:'model',
              align: "center",
              width: 100,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '计量单位',
              value: 'unit',
              width: '100',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '入库数量',
              value: 'buySum',
              width: '100',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '入库单价',
              value: 'buyUnitPrice',
              width: '100',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },{
              text: '入库总价',
              value: 'buyTotalPrice',
              width: '100',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            }
          ],
          selectedRows: [],
          materialInBuySelectedIdArray:[]
        },
      }
    },
    async created(){
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetIsOrNotData', 'GetSiginStatusData'])
      this.modelSearchFilter.proId = this.proId
      this.modelSearchFilter.contractId = this.contractId
      this.modelSearchFilter.offerEnterpriseId = this.offerEnterpriseId
      this.getGoodslist()
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getMaterialInBuy();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getMaterialInBuy();
      }
    },
    watch: {
      proId() {
        this.getMaterialInBuy()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refMaterialInBuyTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getMaterialInBuy()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getMaterialInBuy();
      },
      clickRefresh() {
        this.getMaterialInBuy();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getMaterialInBuy() {
        this.tableShow = true
        getMaterialInBuy(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.materialInBuy.tableData.total = response.data.total
          if (this.filterValid) {
            response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
            response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
          }
          if (this.filterUnit) {
            response.data.rows = this.filterData(response.data.rows, 'type', 1)
          }
          this.materialInBuy.tableData.data = response.data.rows;
          if(!this.isShowChecked){
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refMaterialInBuyTableData.setCurrentRow(this.materialInBuyData[0], true);
            });
          }else {
            if(this.materialInBuyData&&this.materialInBuyData.length>0){
              let materialInBuyData = this.materialInBuyData;
              this.materialInBuy.materialInBuySelectedIdArray = materialInBuyData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      selectionChangeMaterialInBuy(selection) {
        this.materialInBuy.selectedRows = selection;
        this.$emit('selectionChange',this.materialInBuy);
      },
      currentChangeMaterialInBuy(selection){
        this.materialInBuy.selectedRow = selection;
        this.$emit('selectionChange',this.materialInBuy);
      },
      selectableMaterialInBuy(row, index) {
        // return 1
        let lock = this.materialInBuyData.some(item => item.billId == row.detailId)
        if (lock)
          return 0;//不可勾选
        else
          return 1;//可勾选
      },
      formatter(val) {
        console.log(val)
      }
    }
  }
</script>
