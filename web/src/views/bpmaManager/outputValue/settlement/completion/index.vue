<template>
  <basic-container class="bpmaManagerOutputValueSettlementStage-container-list ">
    <div class="splitPane-container" ref="refSplitPane">
      <basic-split-pane class="bpmaManager-container-list" :default-percent='75' :min-percent='25'>
        <template slot="leftContainer">
          <div class="left-container">
            <basic-handler>
              <el-button @click="addClick(true)" icon="el-icon-plus" plain size="small" type="primary">新增完工结算单</el-button>
              <el-button :disabled="allowSee" @click="addClick(false)" icon="el-icon-if-see" plain size="small"
                type="primary">查看
              </el-button>
              <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
                @clickSearchFilter="clickSearchFilter"></basic-search>
            </basic-handler>
            <div class="table-row table-container">
              <el-table ref="refUserManager" :height="heightUserManager" :data="tableData" @row-click="rowClick"
                highlight-current-row border stripe>
                <el-table-column header-align="center" align="center" label="序号" type="index" width="60">
                </el-table-column>
                <el-table-column :align="item.align" :formatter="format" header-align="center" :key="item.id"
                  :label="item.name" :prop="item.prop" :width="item.width" show-overflow-tooltip
                  v-for="item in tableTitle"></el-table-column>
              </el-table>
              <pagination :limit.sync="modelSearchFilter.limit" :page.sync="modelSearchFilter.page" :total="total"
                @pagination="getGoodslist" />
            </div>
          </div>
        </template>
        <template slot="rightContainer">
          <div class="right-container">
            <page-select-filter :data="contractData" :selectData="selectData" @change="contractChange" v-model="selectValue"
              @refreshData="getProjectList"></page-select-filter>
          </div>
        </template>
      </basic-split-pane>
    </div>
  </basic-container>
</template>

<script>
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import tableTitle from './tableTitle.json'
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  import { getProjectList, getValueFinishPayMaster } from '@/api/bpmaManager/outputValue/settlement/completion'
  import pagination from '@/components/Pagination'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'stage',
    mixins: [computed, methods, formatBasic],
    components: {
      pagination
    },
    data() {
      const that = this
      return {
        selectData: {
          data: [],
          key: 'id'
        },
        contractData: {
          name: 'name',
          key: 'stageId',
          data: []
        },
        tableTitle,
        tableShow: false,
        tableData: [],
        formData: {},
        proData: {},
        dialogFormVisible: false,
        invoiceTypeSelectData: [],
        selectValue: [],
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzyKeys: '',
          fuzzy: ''
        },
        total: 0,
        heightUserManager: 0,

      }
    },
    computed: {
      allowSee() {
        return Object.keys(this.formData).length === 0
      }
    },
    watch: {
      screenHeight(innerHeight) {
        this.heightInit(innerHeight);
      }
    },
    async created() {
      this.getEnumData(['GetValidateStatusData'])
      const contractData = await getProjectList({ page: 1, limit: 10000 })
      const invoiceTypeSelectData = await getDictionaryDataByTypeFilter('SYS_INVOICE_TYPE')
      const selectData = await getDictionaryDataByTypeFilter('SYS_PRO_STAGE')
      this.contractData.data = contractData.data.rows
      this.invoiceTypeSelectData = invoiceTypeSelectData.data
      this.selectData.data = selectData.data
      this.selectValue = selectData.data.map(item => item.id)
    },
    activated() {
      this.getGoodslist()
    },
    mounted() {
      this.$nextTick(() => {
        this.heightInit(this.getInnerHeight());
      })
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refUserManager, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      async getProjectList() {

        const contractData = await getProjectList({ page: 1, limit: 10000 })
        const selectData = await getDictionaryDataByTypeFilter('SYS_PRO_STAGE')
        this.contractData.data = contractData.data.rows
        this.selectData.data = selectData.data
        this.selectValue = selectData.data.map(item => item.id)

      },
      heightInit(innerHeight) {
        const offsetTopUserManager = this.$refs.refUserManager.$el.getBoundingClientRect().top;
        this.heightUserManager = innerHeight - offsetTopUserManager - 55;
      },
      getValueFinishPayMaster() {
        this.tableShow = true
        if(!this.modelSearchFilter.proId) return
        getValueFinishPayMaster(this.modelSearchFilter).then(res => {
          this.formData = {}
          this.tableShow = false
          this.tableData = res.data.rows
          this.total = res.data.total
        })
      },
      contractChange(data) {
        if (!data) return this.tableData = [], this.modelSearchFilter.page = 1, this.proData = {}
        this.modelSearchFilter.proId = data.id
        this.modelSearchFilter.proName = data.name
        this.modelSearchFilter.proCode = data.code
        this.proData = data
        this.modelSearchFilter.page = 1
        this.getValueFinishPayMaster()
      },
      addClick(lock) {
        if (!this.proData.id) return this.$message.warning('当前无项目，无法新增结算单！')
        this.dialogFormVisible = true
        let { formData } = this
        this.$store.dispatch("cacheId", '0')
        if (lock) {
          this.$router.push({
            path: `/bpmaManager/outputValue/settlement/completion/id/0/detail`,
            query: this.proData
          })
        } else {
          this.$router.push({
            path: `/bpmaManager/outputValue/settlement/completion/id/0/${formData.id}`,
            query: this.proData
          })
        }
      },
      format(row, column, cellValue, index) {
        let money = Number(row.beforeTaxPrice)
        let invrate = Number(row.invoiceTaxRate)
        switch (column.property) {
          case 'validateStatus':
            return this.dataEnum.validateStatus.filter(item => row.validateStatus == item.code)[0].name
          case 'totalPrice':
            return this.$utilsBasic.toThousands(row.totalPrice)
          case 'payScale':
            return this.$utilsBasic.toThousands(row.payScale)
          case 'payPrice':
            return this.$utilsBasic.toThousands(row.payPrice)
          case 'unincomePrice':
            return this.$utilsBasic.toThousands(row.unincomePrice)
          case 'shouldIncomePriced':
            return this.$utilsBasic.toThousands(row.shouldIncomePriced)
          case 'shouldIncomeDate':
            return row.shouldIncomeDate ? row.shouldIncomeDate.split(' ')[0] : ''
          case 'qualityAssuranceDate':
            return row.qualityAssuranceDate ? row.qualityAssuranceDate.split(' ')[0] : ''
          case 'qualityAssurancePrice':
            return this.$utilsBasic.toThousands(row.qualityAssurancePrice)
          default:
            return cellValue
        }
      },
      rowClick(row, column, event) {
        this.formData = row
      },
      getGoodslist() {
        this.getValueFinishPayMaster()
      }
    }
  }
</script>

<style scoped>
</style>
