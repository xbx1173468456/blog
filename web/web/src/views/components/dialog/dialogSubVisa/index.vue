<!-- 分包签证单 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refSubVisaTableData" @selection-change="selectionChangeSubVisa"
  :dataTable="subVisa.tableData" :columns="subVisa.tableColumns"
  @current-change="currentChangeSubVisa" :pagination="modelSearchFilter" @pagination="getGoodslist">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectableSubVisa" />
    </template>

    <template slot-scope="obj" slot="applyPrice">
      {{formatToThousands(obj.scope.row.applyPrice)}}
    </template>
    <template slot-scope="obj" slot="approvePrice">
      {{formatToThousands(obj.scope.row.approvePrice)}}
    </template>
    <template slot-scope="obj" slot="payPrice">
      {{formatToThousands(obj.scope.row.payPrice)}}
    </template>
    <template slot-scope="obj" slot="handleDate">
      {{formatDate(obj.scope.row.handleDate)}}
    </template>
    <template slot-scope="obj" slot="ifPay">
      {{formatIfPay(obj.scope.row)}}
    </template>
    <template slot-scope="obj" slot="payedPrice">
      {{formatToThousands(obj.scope.row.payedPrice)}}
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
    getAllVisa,
  } from '@/api/common/dialog/dialogSubVisa'
  import pagination from '@/components/Pagination'
  export default {
    name: "dialogSubVisa",
    mixins: [computed, methods, formatEnum,formatBasic],
    components: {pagination},
    props:{
      subVisaData: {
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
      enterpriseId: [Number, String],
      contractId: [Number, String],
      isNull:String
    },
    data(){
      let _this = this
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
          fuzzy: '',
          isNull:_this.isNull
        },
        tableShow: false,
        subVisa: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              expand: true,
              text:'单据编码',
              value:'code',
              align: "center",
              width: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '签证名称',
              value: 'name',
              align: "left",
              width: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },{
              text: '项目名称',
              value: 'proName',
              align: "left",
              width: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '分包单位',
              value: 'enterpriseName',
              width: '100',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '合同名称',
              value: 'contractName',
              width: '100',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '签证上报金额',
              value: 'applyPrice',
              width: '120',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '内部核定金额',
              value: 'approvePrice',
              width: '120',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '签证批复金额',
              value: 'payPrice',
              width: '120',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },{
              text: '签证人员',
              value: 'handlePerson',
              width: '100',
              align: "center",
              showOverflowTooltip:true
            },{
              text: '签证日期',
              value: 'handleDate',
              width: '100',
              align: "center",
              showOverflowTooltip:true
            },{
              text: '原签证单号',
              value: 'orignalCode',
              width: '130',
              align: "center",
              showOverflowTooltip:true
            },
            {
              text: '是否结算',
              value: 'ifPay',
              width: '100',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },{
              text: '结算金额',
              value: 'payedPrice',
              width: '100',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '结算单号',
              value: 'payedCode',
              width: '130',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '签证内容',
              value: 'content',
              width: '140',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text: '补充说明',
              value: 'remark',
              width: '140',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },{
              text: '登记人员',
              value: 'inputPerson',
              width: '100',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },{
              text: '登记时间',
              value: 'inputTime',
              width: '160',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
          ],
          selectedRows: [],
          subVisaSelectedIdArray:[]
        },
      }
    },
    async created(){
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetIsOrNotData', 'GetSiginStatusData'])
      this.modelSearchFilter.proId = this.proId
      this.modelSearchFilter.contractId = this.contractId
      this.modelSearchFilter.enterpriseId = this.enterpriseId
      this.getGoodslist()
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getSubVisa();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getSubVisa();
      }
    },
    watch: {
      proId(newVal) {
        this.$set(this.modelSearchFilter,'proId',newVal)
        //this.getSubVisa()
      },
      enterpriseId(newVal){
        this.$set(this.modelSearchFilter,'enterpriseId',newVal)
        this.getSubVisa()
      },
      contractId(newVal){
        this.$set(this.modelSearchFilter,'contractId',newVal)
        this.getSubVisa()
      },
      isNull(newVal){
        this.$set(this.modelSearchFilter,'isNull',newVal)
        this.getSubVisa()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refSubVisaTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getSubVisa()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getSubVisa();
      },
      clickRefresh() {
        this.getSubVisa();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getSubVisa() {
        this.tableShow = true
        getAllVisa(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.subVisa.tableData.total = response.data.total
          /*response.data.rows = response.data.rows.map(item => {
            item.applyPrice = this.$utilsBasic.toThousands(item.applyPrice)
            item.approvePrice = this.$utilsBasic.toThousands(item.approvePrice)
            item.payPrice = this.$utilsBasic.toThousands(item.payPrice)
            item.handleDate = item.handleDate ? item.handleDate.split(' ')[0] : ''
            return item
          })*/
          if (this.filterValid) {
            response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
            response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
          }
          if (this.filterUnit) {
            response.data.rows = this.filterData(response.data.rows, 'type', 1)
          }
          this.subVisa.tableData.data = response.data.rows;
          if(!this.isShowChecked){
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refSubVisaTableData.setCurrentRow(this.subVisaData[0], true);
            });
          }else {
            if(this.subVisaData&&this.subVisaData.length>0){
              let subVisaData = this.subVisaData;
              this.subVisa.subVisaSelectedIdArray = subVisaData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      selectionChangeSubVisa(selection) {
        this.subVisa.selectedRows = selection;
        this.$emit('selectionChange',this.subVisa);
      },
      currentChangeSubVisa(selection){
        this.subVisa.selectedRow = selection;
        this.$emit('selectionChange',this.subVisa);
      },
      selectableSubVisa(row, index) {
        // return 1
        let lock = this.dataEnum.isOrNot.some(item => {
          if (item.code == row.ifLastLevel && item.name == '是') {
            return true
          }
        })
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
