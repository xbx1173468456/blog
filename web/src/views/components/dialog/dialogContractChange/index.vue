<!-- 我方合同变更 -->
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
    <template slot-scope="obj" slot="handleDate">
      {{obj.scope.row.handleDate ? obj.scope.row.handleDate.split(' ')[0] : ''}}
    </template>
  </basic-table>
</div>
</template>

<script>
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import {
    getContractReviews,
  } from '@/api/common/dialog/dialogContractChange'
  import pagination from '@/components/Pagination'
  export default {
    name: "dialogContractChange",
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
      proId: [Number, String]
    },
    data(){
      return {
        defaultExpandAll: false,
        filterText: '',
        modelSearchFilter: {
          page: 1,
          limit: 10,
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
              text:'单据编号',
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
              value:'contractName',
              align: "left",
              minWidth: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'变更名称',
              value:'name',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 200
            },
            {
              text:'原变更单号',
              value:'orignalCode',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 110
            },
            {
              text:'变更人员',
              value:'handlePerson',
              align: "left",
              minWidth: 120,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'变更日期',
              value:'handleDate',
              align: "center",
              minWidth: 120,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'登记人员',
              value:'inputPerson',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 120
            },
            {
              text:'登记时间',
              value:'inputTime',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 160
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
      this.getGoodslist()
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getContractReviews();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getContractReviews();
      }
    },
    watch: {
      proId() {
        this.getContractReviews()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refMyContractTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getContractReviews()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getContractReviews();
      },
      clickRefresh() {
        this.getContractReviews();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getContractReviews() {
        this.tableShow = true
        getContractReviews(this.modelSearchFilter).then((response) => {
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
