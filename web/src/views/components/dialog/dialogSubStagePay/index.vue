<!-- 分包阶段结算单 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refSubStagePayTableData" @selection-change="selectionChangeSubStagePay"
  :dataTable="subStagePay.tableData" :columns="subStagePay.tableColumns"
  @current-change="currentChangeSubStagePay" :pagination="modelSearchFilter" @pagination="getGoodslist">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectableSubStagePay" />
    </template>

    <template slot-scope="obj" slot="price">
      {{formatToThousands(obj.scope.row.price)}}
    </template>
    <template slot-scope="obj" slot="shouldPayScale">
      {{formatToThousands(obj.scope.row.shouldPayScale)}}
    </template>
    <template slot-scope="obj" slot="shouldPayPrice">
      {{formatToThousands(obj.scope.row.shouldPayPrice)}}
    </template>
    <template slot-scope="obj" slot="handleDate">
      {{formatMonth(obj.scope.row.handleDate)}}
    </template>
    <template slot-scope="obj" slot="shouldPayDate">
      {{formatDate(obj.scope.row.shouldPayDate)}}
    </template>
    <template slot-scope="obj" slot="ifPay">
      {{formatIfPay(obj.scope.row)}}
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
    getAllSubPay, 
  } from '@/api/common/dialog/dialogSubStagePay'
  import pagination from '@/components/Pagination'
  export default {
    name: "dialogSubStagePay",
    mixins: [computed, methods, formatEnum,formatBasic],
    components: {pagination},
    props:{
      subStagePayData: {
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
        subStagePay: {
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
              text: '款项名称',
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
              text: '分包单位',
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
            },{
              text: '本次结算总额',
              value: 'price',
              width: '140',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: '应付进度款比例',
              value: 'shouldPayScale',
              width: '120',
              align: "center",
              showOverflowTooltip: true
            },{
              text: '应付进度款金额',
              value: 'shouldPayPrice',
              width: '140',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: '经办人员',
              value: 'handlePerson',
              width: '100',
              align: "center",
              showOverflowTooltip: true
            },{
              text: '所属年月',
              value: 'handleDate',
              width: '100',
              align: "center",
              showOverflowTooltip: true
            },{
              text: '应付日期',
              value: 'shouldPayDate',
              width: '130',
              align: "center",
              showOverflowTooltip: true
            },{
              text: '是否结算',
              value: 'ifPay',
              width: '100',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '补充说明',
              value: 'remark',
              width: '140',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            }
          ],
          selectedRows: [],
          subStagePaySelectedIdArray:[]
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
        this.getSubStagePay();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getSubStagePay();
      }
    },
    watch: {
      proId(newVal) {
        this.$set(this.modelSearchFilter,'proId',newVal)
        //this.getSubStagePay()
      },
      enterpriseId(newVal){
        this.$set(this.modelSearchFilter,'enterpriseId',newVal)
        this.getSubStagePay()
      },
      contractId(newVal){
        this.$set(this.modelSearchFilter,'contractId',newVal)
        this.getSubStagePay()
      },
      isNull(newVal){
        this.$set(this.modelSearchFilter,'isNull',newVal)
        this.getSubStagePay()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refSubStagePayTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getSubStagePay()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getSubStagePay();
      },
      clickRefresh() {
        this.getSubStagePay();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getSubStagePay() {
        this.tableShow = true
        getAllSubPay(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.subStagePay.tableData.total = response.data.total
          
          if (this.filterValid) {
            response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
            response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
          }
          if (this.filterUnit) {
            response.data.rows = this.filterData(response.data.rows, 'type', 1)
          }
          this.subStagePay.tableData.data = response.data.rows;
          if(!this.isShowChecked){
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refSubStagePayTableData.setCurrentRow(this.subStagePayData[0], true);
            });
          }else {
            if(this.subStagePayData&&this.subStagePayData.length>0){
              let subStagePayData = this.subStagePayData;
              this.subStagePay.subStagePaySelectedIdArray = subStagePayData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      selectionChangeSubStagePay(selection) {
        this.subStagePay.selectedRows = selection;
        this.$emit('selectionChange',this.subStagePay);
      },
      currentChangeSubStagePay(selection){
        this.subStagePay.selectedRow = selection;
        this.$emit('selectionChange',this.subStagePay);
      },
      selectableSubStagePay(row, index) {
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
