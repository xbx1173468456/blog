<!-- 我方合同 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refMyContractTableData"
  :dataTable="myContract.tableData" :columns="myContract.tableColumns"
  @current-change="currentChangeMyContract" :pagination="modelSearchFilter" @pagination="getGoodslist">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectableMyContract" />
    </template>
    <template slot-scope="obj" slot="signStatus">
      {{formatIsOrNot(obj.scope.row.signStatus)}}
    </template>
    <template slot-scope="obj" slot="invoiceTaxRate">
      {{formatToMoney(obj.scope.row.invoiceTaxRate)}}
    </template>
    <template slot-scope="obj" slot="beforeTaxPrice">
      {{formatToThousands(obj.scope.row.beforeTaxPrice)}}
    </template>
    <template slot-scope="obj" slot="afterTaxPrice">
      {{formatToThousands(obj.scope.row.afterTaxPrice)}}
    </template>
    <template slot-scope="obj" slot="tax">
      {{formatToMoney(obj.scope.row.tax)}}
    </template>
  </basic-table>
</div>
</template>

<!-- let money = Number(item.beforeTaxPrice)
let invrate = Number(item.invoiceTaxRate)
item.signStatus = this.dataEnum.siginStatus.filter(result => result.code == item.signStatus)[0]
item.signStatus = item.signStatus ? item.signStatus.name : ''
item.invoiceTaxRate = item.invoiceTaxRate.toFixed(2)
item.beforeTaxPrice = this.$utilsBasic.toThousands(item.beforeTaxPrice.toFixed(2))
item.afterTaxPrice = this.$utilsBasic.toThousands(isNaN(money / (1 + invrate)) ? '0.00' : (money / (1 + invrate)).toFixed(2))
item.tax = this.$utilsBasic.toThousands(isNaN(money / (1 + invrate) * invrate) ? '0.00' : (money / (1 + invrate) * invrate).toFixed(2)) -->
<script>
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import {
    getRegistrationList,
  } from '@/api/common/dialog/dialogMyContract'
  import pagination from '@/components/Pagination'
  import formatEnum from '@/utils/mixins/formatEnum.js'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: "dialogMyContract",
    mixins: [computed, methods, formatBasic, formatEnum],
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
      oppositeEnterpriseId: [Number, String]
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
          fuzzy: ''
        },
        tableShow: false,
        myContract: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              expand: true,
              text:'评审单号',
              value:'code',
              align: "center",
              minWidth: 140,
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
              text:'合同名称',
              value:'name',
              align: "left",
              minWidth: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'价税合计金额',
              value:'beforeTaxPrice',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 110
            },
            {
              text:'税后合计金额',
              value:'afterTaxPrice',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 110
            },
            {
              text:'发票类型',
              value:'invoiceType',
              align: "left",
              minWidth: 120,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'发票税率',
              value:'invoiceTaxRate',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'应交税额',
              value:'tax',
              minWidth: 110,
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'我方机构',
              value:'ourEnterpriseName',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'对方单位',
              value:'oppositeEnterpriseName',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'三方单位',
              value:'thirdEnterpriseName',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'签约状态',
              value:'signStatus',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'签约日期',
              value:'signDate',
              align: "center",
              minWidth: 100,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'原始合同号',
              value:'orignalCode',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 140
            },
            {
              text:'计价方式',
              value:'computeMode',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'进度款支付比例',
              value:'progressPricePayScale',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 120
            },
            {
              text:'质保金比例',
              value:'qualityAssurancePriceScale',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 100
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
      this.modelSearchFilter.oppositeEnterpriseId = this.oppositeEnterpriseId
      this.getGoodslist()
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getRegistrationList();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getRegistrationList();
      }
    },
    watch: {
      proId() {
        this.getRegistrationList()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refMyContractTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getRegistrationList()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getRegistrationList();
      },
      clickRefresh() {
        this.getRegistrationList();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getRegistrationList() {
        this.tableShow = true
        getRegistrationList(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.myContract.tableData.total = response.data.total
          // response.data.rows = response.data.rows.map(item => {
          //   let money = Number(item.beforeTaxPrice)
          //   let invrate = Number(item.invoiceTaxRate)
          //   item.signStatus = this.dataEnum.siginStatus.filter(result => result.code == item.signStatus)[0]
          //   item.signStatus = item.signStatus ? item.signStatus.name : ''
          //   item.invoiceTaxRate = item.invoiceTaxRate.toFixed(2)
          //   item.beforeTaxPrice = this.$utilsBasic.toThousands(item.beforeTaxPrice.toFixed(2))
          //   item.afterTaxPrice = this.$utilsBasic.toThousands(isNaN(money / (1 + invrate)) ? '0.00' : (money / (1 + invrate)).toFixed(2))
          //   item.tax = this.$utilsBasic.toThousands(isNaN(money / (1 + invrate) * invrate) ? '0.00' : (money / (1 + invrate) * invrate).toFixed(2))
          //   return item
          // })
          if (this.filterValid) {
            response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
            response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
          }
          if (this.filterUnit) {
            response.data.rows = this.filterData(response.data.rows, 'type', 1)
          }
          this.myContract.tableData.data = response.data.rows;
          if(!this.isShowChecked){
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refMyContractTableData.setCurrentRow(this.myContractData[0], true);
            });
          }else {
            if(this.myContractData&&this.myContractData.length>0){
              let myContractData = this.myContractData;
              this.myContract.myContractSelectedIdArray = myContractData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      selectionChangeMyContract(selection) {
        console.log(selection)
        this.myContract.selectedRows = selection;
        this.$emit('selectionChange',this.myContract);
      },
      currentChangeMyContract(selection){
        this.myContract.selectedRow = selection;
        this.$emit('selectionChange',this.myContract);
      },
      selectableMyContract(row, index) {
        let lock = this.dataEnum.isOrNot.some(item => {
          if (item.code == row.ifLastLevel && item.name == '是') {
            return true
          }
        })
        if (lock)
          return 1;//不可勾选
        else
          return 0;//可勾选
      },
      formatter(val) {
        console.log(val)
      }
    }
  }
</script>
