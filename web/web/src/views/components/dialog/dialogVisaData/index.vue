<!-- 签证资料 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refVisaDataTableData" @selection-change="selectionChangeVisaData"
  :dataTable="visaData.tableData" :columns="visaData.tableColumns"
  @current-change="currentChangeVisaData" :pagination="modelSearchFilter" @pagination="getGoodslist">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectableVisaData" />
    </template>
  </basic-table>
</div>
</template>

<script>
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import {
    getValueVisaMaster,
  } from '@/api/common/dialog/dialogVisaData'
  import pagination from '@/components/Pagination'
  export default {
    name: "dialogVisaData",
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
        visaData: {
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
              text:'签证名称',
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
              text:'原签证单号',
              value:'orignalCode',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'内部核定金额',
              value:'approvePrice',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 110
            },
            {
              text:'签证上报金额',
              value:'applyPrice',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 110
            },
            {
              text:'签证批复金额',
              value:'payPrice',
              minWidth: 110,
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'签证资料单号',
              value:'visafileMasterCode',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 110
            },
            {
              text:'签证人员',
              value:'handlePerson',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'签证日期',
              value:'handleDate',
              align: "left",
              minWidth: 100,
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
        this.getValueVisaMaster();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getValueVisaMaster();
      }
    },
    watch: {
      proId() {
        this.getValueVisaMaster()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refVisaDataTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getValueVisaMaster()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getValueVisaMaster();
      },
      clickRefresh() {
        this.getValueVisaMaster();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getValueVisaMaster() {
        this.tableShow = true
        getValueVisaMaster(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.visaData.tableData.total = response.data.total
          response.data.rows = response.data.rows.map(item => {
            item.approvePrice = this.$utilsBasic.toThousands(item.approvePrice)
            item.applyPrice = this.$utilsBasic.toThousands(item.applyPrice)
            item.payPrice = this.$utilsBasic.toThousands(item.payPrice)
            item.handleDate = item.handleDate ? item.handleDate.split(' ')[0] : ''
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
            this.visaData.tableData.total = this.visaData.tableData.total - sum
          }
          if (this.filterUnit) {
            response.data.rows = this.filterData(response.data.rows, 'type', 1)
          }
          this.visaData.tableData.data = response.data.rows;
          if(!this.isShowChecked){
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refVisaDataTableData.setCurrentRow(this.myContractData[0], true);
            });
          }else {
            if(this.myContractData&&this.myContractData.length>0){
              let myContractData = this.myContractData;
              this.visaData.myContractSelectedIdArray = myContractData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      selectionChangeVisaData(selection) {
        this.visaData.selectedRows = selection;
        this.$emit('selectionChange',this.visaData);
      },
      currentChangeVisaData(selection){
        this.visaData.selectedRow = selection;
        this.$emit('selectionChange',this.visaData);
      },
      selectableVisaData(row, index) {
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
