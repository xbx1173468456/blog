<!-- 阶段结算 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refStageSettlementTableData" @selection-change="selectionChangeStageSettlement"
  :dataTable="stageSettlement.tableData" :columns="stageSettlement.tableColumns"
  @current-change="currentChangeStageSettlement" :pagination="modelSearchFilter" @pagination="getGoodslist">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectableStageSettlement" />
    </template>
  </basic-table>
</div>
</template>

<script>
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import {
    getValueStagePayMaster,
  } from '@/api/common/dialog/dialogStageSettlement'
  import pagination from '@/components/Pagination'
  export default {
    name: "dialogStageSettlement",
    mixins: [computed, methods],
    components: {pagination},
    props:{
      myContractData: {
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
      contractId: [Number, String],
      linkData: Array,
      filterIfPay: Boolean
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
          fuzzyKeys: '',
          fuzzy: '',
          ifPay: 2
        },
        tableShow: false,
        stageSettlement: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              expand: true,
              text:'单据编号',
              value:'code',
              align: "center",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'款项名称',
              value:'name',
              align: "left",
              minWidth: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'合同名称',
              value:'contractName',
              align: "left",
              minWidth: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'项目名称',
              value:'proName',
              align: "left",
              minWidth: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'本次结算总额',
              value:'totalPrice',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 110
            },
            {
              text:'应收进度款比例',
              value:'payScale',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 120
            },
            {
              text:'应收进度款金额',
              value:'payPrice',
              minWidth: 120,
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            }
          ],
          selectedRows: [],
          myContractSelectedIdArray:[]
        },
      }
    },
    async created(){
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetIsOrNotData', 'GetSiginStatusData'])
      this.modelSearchFilter.proId = this.proId
      this.modelSearchFilter.contractId = this.contractId
      this.getGoodslist()
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getValueStagePayMaster();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getValueStagePayMaster();
      }
    },
    watch: {
      proId() {
        this.getValueStagePayMaster()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refStageSettlementTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getValueStagePayMaster()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getValueStagePayMaster();
      },
      clickRefresh() {
        this.getValueStagePayMaster();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getValueStagePayMaster() {
        this.tableShow = true
        getValueStagePayMaster(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.stageSettlement.tableData.total = response.data.total
          response.data.rows = response.data.rows.map(item => {
            item.totalPrice = this.$utilsBasic.toThousands(item.totalPrice)
            item.payScale = this.$utilsBasic.toMoney(item.payScale)
            item.payPrice = this.$utilsBasic.toThousands(item.payPrice)
            return item
          })
          if (this.filterValid) {
            response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
            response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
          }
          if(this.filterIfPay) {
            let sum = 0
            response.data.rows = response.data.rows.filter(item => {
              if(item.ifPay == 1) {
                sum++
                return
              }
              return true
            })
            this.stageSettlement.tableData.total = this.stageSettlement.tableData.total - sum
          }
          if (this.filterUnit) {
            response.data.rows = this.filterData(response.data.rows, 'type', 1)
          }
          this.stageSettlement.tableData.data = response.data.rows;
          if(!this.isShowChecked){
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refStageSettlementTableData.setCurrentRow(this.myContractData[0], true);
            });
          }else {
            if(this.myContractData&&this.myContractData.length>0){
              let myContractData = this.myContractData;
              this.stageSettlement.myContractSelectedIdArray = myContractData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      selectionChangeStageSettlement(selection) {
        this.stageSettlement.selectedRows = selection;
        this.$emit('selectionChange',this.stageSettlement);
      },
      currentChangeStageSettlement(selection){
        this.stageSettlement.selectedRow = selection;
        this.$emit('selectionChange',this.stageSettlement);
      },
      selectableStageSettlement(row, index) {
        let lock = this.linkData.some(item => {
          if (item.billId == row.id) {
            return true
          }
        })
        if (lock)
          return 0;//可勾选
        else
          return 1;//不可勾选
      },
      formatter(val) {
        console.log(val)
      }
    }
  }
</script>
