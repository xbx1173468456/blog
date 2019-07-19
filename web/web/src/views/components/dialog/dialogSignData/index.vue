<!-- 签证资料 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refSignDataTableData"
  :dataTable="signData.tableData" :columns="signData.tableColumns"
  @current-change="currentChangeSignData" :pagination="modelSearchFilter" @pagination="getGoodslist">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectablePersonType" />
    </template>
    <template slot-scope="obj" slot="beginDate">
      {{obj.scope.row.beginDate ? obj.scope.row.beginDate.split(' ')[0] : ''}}
    </template>
    <template slot-scope="obj" slot="finishDate">
      {{obj.scope.row.finishDate ? obj.scope.row.finishDate.split(' ')[0] : ''}}
    </template>
    <template slot-scope="obj" slot="handleDate">
      {{obj.scope.row.handleDate ? obj.scope.row.handleDate.split(' ')[0] : ''}}
    </template>
    <template slot-scope="obj" slot="ifFinish">
      {{formatIsOrNot(obj.scope.row.ifFinish)}}
    </template>
  </basic-table>
</div>
</template>

<script>
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import {
    getValueVisafileMasters,
  } from '@/api/common/dialog/dialogSignData'
  import pagination from '@/components/Pagination'
  import formatEnum from '@/utils/mixins/formatEnum.js'
  export default {
    name: "dialogSignData",
    mixins: [computed, methods, formatEnum],
    components: {pagination},
    props:{
      personTypeData: {
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
          fuzzyKeys: '',
          fuzzy: ''
        },
        tableShow: false,
        signData: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              expand: true,
              text:'单据编码',
              value:'code',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'资料名称',
              value:'name',
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
              text:'合同名称',
              value:'contractName',
              align: "left",
              minWidth: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'计划开始日期',
              value:'beginDate',
              align: "center",
              minWidth: 110,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'计划完成日期',
              value:'finishDate',
              align: "center",
              minWidth: 110,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'计划日历天',
              value:'days',
              align: "left",
              minWidth: 100,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'承办人员',
              value:'handlePerson',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'承办日期',
              value:'handleDate',
              align: "center",
              minWidth: 110,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'是否完成',
              value:'ifFinish',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            }
          ],
          selectedRows: [],
          personTypeSelectedIdArray:[]
        },
      }
    },
    created(){
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetIsOrNotData'])
      this.modelSearchFilter.contractId = this.contractId
      this.modelSearchFilter.proId = this.proId
      this.getGoodslist()
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getValueVisafileMasters();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getValueVisafileMasters();
      }
    },
    watch: {
      contractId() {
        this.getValueVisafileMasters()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refSignDataTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getValueVisafileMasters()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getValueVisafileMasters();
      },
      clickRefresh() {
        this.getValueVisafileMasters();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getValueVisafileMasters() {
        if (!this.contractId || !this.proId) return
        this.tableShow = true
        getValueVisafileMasters(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.signData.tableData.total = response.data.total
          // response.data.rows = response.data.rows.map(item => {
          //   item.beginDate = item.beginDate.split(' ')[0]
          //   item.finishDate = item.finishDate.split(' ')[0]
          //   item.handleDate = item.handleDate.split(' ')[0]
          //   item.ifFinish = this.dataEnum.isOrNot.filter(result => result.code == item.ifFinish)[0].name
          //   return item
          // })
          if (this.filterValid) {
            response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
            response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
          }
          if (this.filterUnit) {
            response.data.rows = this.filterData(response.data.rows, 'type', 1)
          }
          this.signData.tableData.data = response.data.rows;
          if(!this.isShowChecked){
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refSignDataTableData.setCurrentRow(this.personTypeData[0], true);
            });
          }else {
            if(this.personTypeData&&this.personTypeData.length>0){
              let personTypeData = this.personTypeData;
              this.signData.personTypeSelectedIdArray = personTypeData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      selectionChangePersonType(selection) {
        this.signData.selectedRows = selection;
        this.$emit('selectionChange',this.signData);
      },
      currentChangeSignData(selection){
        this.signData.selectedRow = selection;
        this.$emit('selectionChange',this.signData);
      },
      selectablePersonType(row, index) {
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
