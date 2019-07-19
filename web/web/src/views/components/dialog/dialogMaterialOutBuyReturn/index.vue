<!-- 采购退货单 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refMaterialOutBuyReturnTableData" @selection-change="selectionChangeMaterialOutBuyReturn"
  :dataTable="materialOutBuyReturn.tableData" :columns="materialOutBuyReturn.tableColumns"
  @current-change="currentChangeMaterialOutBuyReturn" :pagination="modelSearchFilter" @pagination="getGoodslist">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectableMaterialOutBuyReturn" />
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
    getMaterialOutBuyReturn,
  } from '@/api/common/dialog/dialogMaterialOutBuyReturn'
  import pagination from '@/components/Pagination'
  export default {
    name: "dialogMaterialOutBuyReturn",
    mixins: [computed, methods, formatEnum,formatBasic],
    components: {pagination},
    props:{
      materialOutBuyReturnData: {
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
          ifPay:2,
          fuzzyKeys: '',
          fuzzy: ''
        },
        tableShow: false,
        materialOutBuyReturn: {
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
          materialOutBuyReturnSelectedIdArray:[]
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
        this.getMaterialOutBuyReturn();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getMaterialOutBuyReturn();
      }
    },
    watch: {
      proId() {
        this.getMaterialOutBuyReturn()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refMaterialOutBuyReturnTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getMaterialOutBuyReturn()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getMaterialOutBuyReturn();
      },
      clickRefresh() {
        this.getMaterialOutBuyReturn();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getMaterialOutBuyReturn() {
        this.tableShow = true
        getMaterialOutBuyReturn(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.materialOutBuyReturn.tableData.total = response.data.total
          if (this.filterValid) {
            response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
            response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
          }
          if (this.filterUnit) {
            response.data.rows = this.filterData(response.data.rows, 'type', 1)
          }
          this.materialOutBuyReturn.tableData.data = response.data.rows;
          if(!this.isShowChecked){
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refMaterialOutBuyReturnTableData.setCurrentRow(this.materialOutBuyReturnData[0], true);
            });
          }else {
            if(this.materialOutBuyReturnData&&this.materialOutBuyReturnData.length>0){
              let materialOutBuyReturnData = this.materialOutBuyReturnData;
              this.materialOutBuyReturn.materialOutBuyReturnSelectedIdArray = materialOutBuyReturnData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      selectionChangeMaterialOutBuyReturn(selection) {
        this.materialOutBuyReturn.selectedRows = selection;
        this.$emit('selectionChange',this.materialOutBuyReturn);
      },
      currentChangeMaterialOutBuyReturn(selection){
        this.materialOutBuyReturn.selectedRow = selection;
        this.$emit('selectionChange',this.materialOutBuyReturn);
      },
      selectableMaterialOutBuyReturn(row, index) {
        // return 1
        let lock = this.materialOutBuyReturnData.some(item => item.billId == row.detailId)
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
