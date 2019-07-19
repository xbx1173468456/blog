<!-- 项目列表 -->
<template>
  <div class="dialog-container">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
      <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
    </basic-handler>
    <basic-table ref="refProjectTableData"
    :dataTable="project.tableData" :columns="project.tableColumns"
    @current-change="currentChangeProject" :pagination="modelSearchFilter" @pagination="getGoodslist">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" type="selection" align="center" width="55"
          :selectable="selectablePersonType" />
      </template>
    </basic-table>
  </div>
</template>

<script>
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import {
    getProjectList,
  } from '@/api/common/dialog/dialogProject'
  import pagination from '@/components/Pagination'
  export default {
    name: "dialogProject",
    mixins: [computed, methods],
    components: { pagination },
    props: {
      personTypeData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
      filterValid: Boolean
    },
    data() {
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
        project: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              expand: true,
              text: '系统编码',
              value: 'code',
              align: "left",
              width: 140,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '名称',
              value: 'name',
              align: "left",
              minWidth: 240,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '项目全称',
              value: 'fullName',
              align: "left",
              minWidth: 240,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '原始编码',
              value: 'orignalCode',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '项目类型',
              value: 'typeName',
              align: "left",
              minWidth: 240,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '年度批次',
              value: 'year',
              align: "center",
              width: 100,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '建设性质',
              value: 'nature',
              align: "center",
              width: 100,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '项目阶段',
              value: 'stage',
              align: "center",
              width: 100,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '业务区域',
              value: 'area',
              align: "center",
              width: 200,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '行政区划',
              value: 'district',
              align: "left",
              width: 160,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '建设单位',
              value: 'buildEnterprise',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '设计单位',
              value: 'designEnterprise',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '监理单位',
              value: 'superviseEnterprise',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip: true
            }
          ],
          selectedRows: [],
          personTypeSelectedIdArray: []
        },
      }
    },
    created() {
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetIsOrNotData'])
      this.getGoodslist();
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getProjectList();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getProjectList();
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refProjectTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getProjectList()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getProjectList();
      },
      clickRefresh() {
        this.getProjectList();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getProjectList() {
        this.tableShow = true
        getProjectList(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.project.tableData.total = response.data.total
          if (response.data && response.data.rows.length > 0) {
            if (this.filterValid) {
              response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
              response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
            }
            this.project.tableData.data = response.data.rows
            if (!this.isShowChecked) {
              this.defaultExpandAll = true;
              this.$nextTick(() => {
                this.$refs.refProjectTableData.setCurrentRow(this.personTypeData[0], true);
              });
            } else {
              if (this.personTypeData && this.personTypeData.length > 0) {
                let personTypeData = this.personTypeData;
                this.project.personTypeSelectedIdArray = personTypeData.map(row => {
                  return row.id;
                });
              }
            }
          }
        })
      },
      selectionChangePersonType(selection) {
        console.log(selection)
        this.project.selectedRows = selection;
        this.$emit('selectionChange', this.project);
      },
      currentChangeProject(selection) {
        this.project.selectedRow = selection;
        this.$emit('selectionChange', this.project);
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
