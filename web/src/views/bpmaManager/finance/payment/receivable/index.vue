<template>
  <basic-container class="repayBill-container-list ">
    <div class="splitPane-container" ref="refSplitPane">
      <basic-split-pane class="bpmaManager-container-list" :default-percent='75' :min-percent='25'>
        <template slot="leftContainer">
          <div class="left-container">
            <basic-handler>
              <el-form :inline="true" class="form-inline-search left">
                <el-form-item label="合同名称">
                  <el-input size="small" placeholder="请输入合同名称" v-model="listQuery.contractName"></el-input>
                </el-form-item>
                <el-form-item label="款项名称">
                  <el-input size="small" placeholder="请输入款项名称" v-model="listQuery.billName"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker size="small" :picker-options="pickerOptions1" placeholder="选择日期"
                    v-model="listQuery.startTime" type="datetime" default-time="00:00:00"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="截止时间">
                  <el-date-picker size="small" :picker-options="pickerOptions" placeholder="选择日期"
                    v-model="listQuery.endTime" type="datetime" default-time="23:59:59"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" @click="search" icon="el-icon-search" type="primary">搜索</el-button>
                  <el-button size="small" @click="reSet" icon="el-icon-minus" type="primary" plain>重置</el-button>
                </el-form-item>
              </el-form>
            </basic-handler>
            <div class="table-row table-container">
              <el-table ref="refUserManager" :height="heightUserManager" :data="data" border highlight-current-row
                stripe>
                <el-table-column header-align="center" align="center" label="序号" type="index" width="60">
                </el-table-column>
                <el-table-column header-align="center" align="center" label="来源单号" prop="billCode" width="140">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="cellClick(scope.row)">
                      {{ scope.row.billCode }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" :align="item.align" :formatter="format" :key="item.id"
                  :label="item.name" :prop="item.prop" :width="item.width" show-overflow-tooltip
                  v-for="item in tableTitle">
                </el-table-column>
              </el-table>
              <pagination :limit.sync="modelSearchFilter.limit" :page.sync="modelSearchFilter.page" :total="total"
                @pagination="getGoodslist" />
            </div>
          </div>
        </template>
        <template slot="rightContainer">
          <div class="right-container">
            <page-select-filter :data="contractData" :selectData="selectData" @change="contractChange"
              v-model="selectValue" @refreshData="getProjectList">
            </page-select-filter>
          </div>
        </template>
      </basic-split-pane>
    </div>
  </basic-container>
</template>

<script>
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  import { getProjectList, getFinanceShouldPayQuery } from '@/api/bpmaManager/finance/payment/receivable.js'
  import pagination from '@/components/Pagination'
  import tableTitle from './tableTitle.json'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'receivable',
    mixins: [computed, methods, formatBasic],
    components: {
      pagination
    },
    data() {
      const that = this
      return {
        data: [],
        selectData: {
          data: [],
          key: 'id'
        },
        contractData: {
          name: 'name',
          key: 'stageId',
          data: []
        },
        selectValue: [],
        listQuery: {},
        tableTitle: tableTitle,
        heightUserManager: 0,
        modelSearchFilter: {
          page: 1,
          limit: 10
        },
        tableShow: false,
        total: 0,
        pickerOptions: {
          disabledDate(time) {
            if (!that.listQuery.startTime) return
            const startTime = that.listQuery.startTime.replace(/([\d\D]{4})([\d\D]{2})([\d\D]{2})/, '$1-$2-$3')
            return time.getTime() < new Date(startTime).getTime()
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            if (!that.listQuery.endTime) return
            const endTime = that.listQuery.endTime.replace(/([\d\D]{4})([\d\D]{2})([\d\D]{2})/, '$1-$2-$3')
            return time.getTime() > new Date(endTime).getTime()
          }
        }
      }
    },
    computed: {
      windowHeight() {
        return {
          height: this.$store.state.app.screenHeight - 120 + 'px'
        }
      }
    },
    watch: {
      screenHeight(innerHeight) {
        this.heightInit(innerHeight);
      }
    },
    async created() {
      this.getEnumData(['GetShouldPayOrderTypeData'])
      const selectData = await getDictionaryDataByTypeFilter('SYS_PRO_STAGE')
      const contractData = await getProjectList({ page: 1, limit: 10000 })
      this.contractData.data = contractData.data.rows
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
      getData() {
        this.tableShow = true
        if(!this.modelSearchFilter.proId) return
        getFinanceShouldPayQuery(this.modelSearchFilter).then(res => {
          this.tableShow = false
          if (res.status == 200) {
            this.data = res.data.rows
            this.total = res.data.total
          }
        })
      },
      getGoodslist() {
        this.getData()
      },
      contractChange(row) {
        if (!row) return
        this.modelSearchFilter.proId = row.id
        this.modelSearchFilter.proName = row.name
        this.getData()
      },
      search() {
        this.modelSearchFilter.page = 1
        this.modelSearchFilter = Object.assign(this.modelSearchFilter, this.listQuery)
        this.getData()
      },
      reSet() {
        const pagnation = {
          page: this.modelSearchFilter.page,
          limit: this.modelSearchFilter.limit
        }
        this.modelSearchFilter = pagnation
        this.listQuery = {}
      },
      format(row, column, cellValue, index) {
        let money = Number(row.beforeTaxPrice)
        let invrate = Number(row.invoiceTaxRate)
        switch (column.property) {
          case 'date':
            return row.date ? row.date.split(' ')[0] : ''
          case 'price':
            return this.$utilsBasic.toThousands(row.price)
          case 'billType':
            let data = this.dataEnum.shouldPayOrderType.filter(result => result.code == row.billType)[0]
            return data ? data.name : row.billName
          default:
            return cellValue
        }
      },
      cellClick(row) {
        const query = {
          name: row.proName,
          id: row.proId,
          code: row.proCode
        }
        switch (row.billType) {
          case 1:
            this.$router.push({
              path: `/bpmaManager/finance/payment/registration/id/0/${row.billId}`,
              query
            })
            break
          case 2:
            this.$router.push({
              path: `/bpmaManager/subpackage/subcontractManagement/subPay/id/${row.billId}`,
              query
            })
            break
          case 3:
            this.$router.push({
              path: `/bpmaManager/subpackage/subcontractManagement/completionPay/id/${row.billId}`,
              query
            })
            break
          case 4:
            this.$router.push({
              path: '/bpmaManager/goods/purchase/purchaseSettlementDetail',
              name: 'PurchaseSettlementDetail',
              params: {
                id: row.billId
              }
            })
            break
        }
      }
    }
  }
</script>

<style scoped>
</style>
