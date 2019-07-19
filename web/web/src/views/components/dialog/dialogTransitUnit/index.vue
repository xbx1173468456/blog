<!-- 往来单位 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refTransitUnitTableData"
  :dataTable="transitUnit.tableData" :columns="transitUnit.tableColumns"
  @current-change="currentChangeTableData" :pagination="modelSearchFilter" @pagination="getGoodslist">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectablePersonType" />
    </template>
  </basic-table>
</div>
</template>

<script>
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import {
    getUnitInfoList,
  } from '@/api/common/dialog/dialogTransitUnit'
  import pagination from '@/components/Pagination'
  export default {
    name: "dialogTransitUnit",
    mixins: [computed, methods],
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
      filterUnit: Boolean
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
        },
        tableShow: false,
        transitUnit: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              expand: true,
              text:'单位编码',
              value:'code',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'单位名称',
              value:'name',
              align: "left",
              minWidth: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'信用代码',
              value:'creditCode',
              align: "left",
              minWidth: 120,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'单位类型',
              value:'typeName',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'法人代表',
              value:'legalPerson',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'成立日期',
              value:'foundTime',
              align: "left",
              minWidth: 100,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'官方网站',
              value:'website',
              align: "left",
              minWidth: 120,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'补充说明',
              value:'remark',
              align: "left",
              minWidth: 140,
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
      this.getGoodslist();
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getUnitInfoList();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getUnitInfoList();
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refTransitUnitTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getUnitInfoList()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getUnitInfoList();
      },
      clickRefresh() {
        this.getUnitInfoList();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getUnitInfoList() {
        this.tableShow = true
        getUnitInfoList(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.transitUnit.tableData.total = response.data.total
          response.data.rows = response.data.rows.map(item => {
            item.foundTime = item.foundTime.split(' ')[0]
            return item
          })
          if(response.data&&response.data.rows.length>0){
            if (this.filterValid) {
              response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
              response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
            }
            if (this.filterUnit) {
              response.data.rows = this.filterData(response.data.rows, 'type', 1)
            }
            this.transitUnit.tableData.data = response.data.rows;
            if(!this.isShowChecked){
              this.defaultExpandAll = true;
              this.$nextTick(() => {
                this.$refs.refTransitUnitTableData.setCurrentRow(this.personTypeData[0], true);
              });
            }else {
              if(this.personTypeData&&this.personTypeData.length>0){
                let personTypeData = this.personTypeData;
                this.transitUnit.personTypeSelectedIdArray = personTypeData.map(row => {
                  return row.id;
                });
              }
            }
          }
        })
      },
      selectionChangePersonType(selection) {
        this.transitUnit.selectedRows = selection;
        this.$emit('selectionChange',this.transitUnit);
      },
      currentChangeTableData(selection){
        this.transitUnit.selectedRow = selection;
        this.$emit('selectionChange',this.transitUnit);
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
