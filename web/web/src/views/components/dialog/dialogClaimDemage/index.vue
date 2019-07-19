<!-- 索赔取证 -->
<template>
  <div class="dialog-container">
    <basic-handler>
      <el-button @click="clickRefresh" icon="el-icon-refresh" plain size="small" type="primary">刷新</el-button>
      <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
    </basic-handler>
    <basic-table ref="refClaimDemageTableData"
    :dataTable="claimDemage.tableData" :columns="claimDemage.tableColumns"
    @current-change="currentChangePersonType" :pagination="modelSearchFilter" @pagination="getGoodslist">
      <template slot="selection">
        <el-table-column :selectable="selectablePersonType" align="center" type="selection" v-if="isShowChecked"
                         width="55"/>
      </template>
    </basic-table>
  </div>
</template>

<script>
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  import {
    getValueClaimEvidenceMasters
  } from '@/api/common/dialog/dialogClaimDemage'
  import pagination from '@/components/Pagination'
  export default {
    name: 'dialogClaimDemage',
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
      filterValid: Boolean,
      filterUnit: Boolean,
      proId: [Number, String],
      contractId: [Number, String]
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
          fuzzyKeys: '',
          fuzzy: ''
        },
        tableShow: false,
        claimDemage: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              text: '单据编码',
              value: 'code',
              align: 'left',
              minWidth: 140,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '证据名称',
              value: 'name',
              align: 'left',
              minWidth: 200,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '项目名称',
              value: 'proName',
              align: 'left',
              minWidth: 200,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '合同名称',
              value: 'contractName',
              align: 'left',
              minWidth: 200,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '证据介质',
              value: 'evidenceMediumName',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '取证人员',
              value: 'handlePerson',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '所属年月',
              value: 'handleDate',
              align: 'center',
              minWidth: 100,
              headerAlign: 'center',
              showOverflowTooltip: true
            }
          ],
          selectedRows: [],
          personTypeSelectedIdArray: []
        }
      }
    },
    created() {
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetIsOrNotData'])
      this.$set(this.modelSearchFilter, 'proId', this.proId)
      this.$set(this.modelSearchFilter, 'contractId', this.contractId)
      this.getGoodslist()
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getValueClaimEvidenceMasters()
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getValueClaimEvidenceMasters()
      }
    },
    watch: {
      contractId() {
        this.getValueClaimEvidenceMasters()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refClaimDemageTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getValueClaimEvidenceMasters()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false
        } else {
          this.defaultExpandAll = true
        }
        this.getValueClaimEvidenceMasters()
      },
      clickRefresh() {
        this.getValueClaimEvidenceMasters()
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getValueClaimEvidenceMasters() {
        if (!this.contractId || !this.proId) return
        this.tableShow = true
        getValueClaimEvidenceMasters(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.claimDemage.tableData.total = response.data.total
          response.data.rows = response.data.rows.map(item => {
            item.handleDate = item.handleDate ? item.handleDate.split(' ')[0] : ''
            return item
          })
          if (this.filterValid) {
            response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
            response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
          }
          if (this.filterUnit) {
            response.data.rows = this.filterData(response.data.rows, 'type', 1)
          }
          this.claimDemage.tableData.data = response.data.rows
          if (!this.isShowChecked) {
            this.defaultExpandAll = true
            this.$nextTick(() => {
              this.$refs.refClaimDemageTableData.setCurrentRow(this.personTypeData[0], true)
            })
          } else {
            if (this.personTypeData && this.personTypeData.length > 0) {
              let personTypeData = this.personTypeData
              this.claimDemage.personTypeSelectedIdArray = personTypeData.map(row => {
                return row.id
              })
            }
          }
        })
      },
      selectionChangePersonType(selection) {
        this.claimDemage.selectedRows = selection
        this.$emit('selectionChange', this.claimDemage)
      },
      currentChangePersonType(selection) {
        this.claimDemage.selectedRow = selection
        this.$emit('selectionChange', this.claimDemage)
      },
      selectablePersonType(row, index) {
        let lock = this.dataEnum.isOrNot.some(item => {
          if (item.code == row.ifLastLevel && item.name == '是') {
            return true
          }
        })
        if (lock) {
          return 1
        }//不可勾选
        else {
          return 0
        }//可勾选
      },
      formatter(val) {
        console.log(val)
      }
    }
  }
</script>
