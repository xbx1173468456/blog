<!-- 分包奖励单 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refSubRewardTableData" @selection-change="selectionChangeSubReward"
  :dataTable="subReward.tableData" :columns="subReward.tableColumns"
  @current-change="currentChangeSubReward" :pagination="modelSearchFilter" @pagination="getGoodslist">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectableSubReward" />
    </template>

    <template slot-scope="obj" slot="handleDate">
      {{formatDate(obj.scope.row.handleDate)}}
    </template>
    <template slot-scope="obj" slot="price">
      {{formatToThousands(obj.scope.row.price)}}
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
    getAllAward,
  } from '@/api/common/dialog/dialogSubReward'
  import pagination from '@/components/Pagination'
  export default {
    name: "dialogSubReward",
    mixins: [computed, methods, formatEnum,formatBasic],
    components: {pagination},
    props:{
      subRewardData: {
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
        subReward: {
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
              text: '奖励名称',
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
            },
            {
              text: '经办人员',
              value: 'handlePerson',
              width: '100',
              align: "center",
              showOverflowTooltip: true
            }, {
              text: '奖励日期',
              value: 'handleDate',
              width: '100',
              align: "center",
              showOverflowTooltip: true
            },
            {
              text: '奖励金额',
              value: 'price',
              width: '100',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            }, {
              text: '是否结算',
              value: 'ifPay',
              width: '100',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip: true
            }, {
              text: '结算金额',
              value: 'payedPrice',
              width: '140',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '结算单号',
              value: 'payedCode',
              width: '130',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '奖励事由',
              value: 'reason',
              width: '140',
              align: "left",
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
            }, {
              text: '登记人员',
              value: 'inputPerson',
              width: '100',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip: true
            }, {
              text: '登记时间',
              value: 'inputTime',
              width: '160',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip: true
            },
          ],
          selectedRows: [],
          subRewardSelectedIdArray:[]
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
        this.getSubReward();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getSubReward();
      }
    },
    watch: {
      proId(newVal) {
        this.$set(this.modelSearchFilter,'proId',newVal)
        //this.getSubReward()
      },
      enterpriseId(newVal){
        this.$set(this.modelSearchFilter,'enterpriseId',newVal)
        this.getSubReward()
      },
      contractId(newVal){
        this.$set(this.modelSearchFilter,'contractId',newVal)
        this.getSubReward()
      },
      isNull(newVal){
        this.$set(this.modelSearchFilter,'isNull',newVal)
        this.getSubReward()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refSubRewardTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getSubReward()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getSubReward();
      },
      clickRefresh() {
        this.getSubReward();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getSubReward() {
        this.tableShow = true
        getAllAward(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.subReward.tableData.total = response.data.total
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
          this.subReward.tableData.data = response.data.rows;
          if(!this.isShowChecked){
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refSubRewardTableData.setCurrentRow(this.subRewardData[0], true);
            });
          }else {
            if(this.subRewardData&&this.subRewardData.length>0){
              let subRewardData = this.subRewardData;
              this.subReward.subRewardSelectedIdArray = subRewardData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      selectionChangeSubReward(selection) {
        this.subReward.selectedRows = selection;
        this.$emit('selectionChange',this.subReward);
      },
      currentChangeSubReward(selection){
        this.subReward.selectedRow = selection;
        this.$emit('selectionChange',this.subReward);
      },
      selectableSubReward(row, index) {
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
