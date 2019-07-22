<template>
  <div class="bpmaManagerUndertakeContractReview-container-list">
    <div class="splitPane-container" ref="refSplitPane">
      <basic-split-pane class="bpmaManager-container-list" :default-percent='75' :min-percent='25'>
        <template slot="leftContainer">
          <div class="left-container">
            <basic-handler>
              <el-button @click="addClick(true)" icon="el-icon-plus" plain size="small" type="primary">新增物资合同评审单</el-button>
              <el-button :disabled="allowSee" @click="addClick(false)" icon="el-icon-if-see" plain size="small" type="primary">查看</el-button>
            </basic-handler>
            <div class="table-row table-container">
              <el-table
                :data="tableData"
                @row-click="rowClick"
                highlight-current-row
                :height="heightUserManager"
                border
                stripe
                ref="refUserManager"
              >
                <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
                <el-table-column
                  :align="item.align"
                  :formatter="format"
                  :key="item.id"
                  :label="item.name"
                  :prop="item.prop"
                  :width="item.width"
                  show-overflow-tooltip
                  v-for="item in tableTitle"
                ></el-table-column>
              </el-table>
              <pagination :limit.sync="modelSearchFilter.limit" :page.sync="modelSearchFilter.page" :total="total" @pagination="getGoodslist" />
            </div>
          </div>
        </template>
        <template slot="rightContainer">
          <div class="right-container">
            <page-select-filter :data="contractData" :selectData="selectData" @change="contractChange" v-model="selectValue" @refreshData="getGoodslist"></page-select-filter>
          </div>
        </template>
      </basic-split-pane>
    </div>
  </div>
</template>

<script>
  import splitPane from 'vue-splitpane'
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import tableTitle from './tableTitle.json'
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import { getProjectList, getBpmaMaterialContractReviews } from '@/api/bpmaManager/goods/goodsContract/review/index.js'
  import { getSysConfigDataDictionaryDetail } from '@/api/sysManager/sysBaseSet/dataDictionary'
  import pagination from '@/components/Pagination'
  import formatEnum from '@/utils/mixins/formatEnum.js'
  export default {
    name: 'review',
    mixins: [computed, methods, formatEnum],
    components: {
      splitPane,
      pagination
    },
    async created() {
      this.getEnumData(['GetAuditStatusEnum'])
      const contractData = await getProjectList({page:1, limit: 10000})
      const invoiceTypeSelectData = await getDictionaryDataByTypeFilter('SYS_INVOICE_TYPE')
      const selectData = await getDictionaryDataByTypeFilter('SYS_PRO_STAGE')
      this.contractData.data = contractData.data.rows
      this.invoiceTypeSelectData = invoiceTypeSelectData.data
      this.selectData.data = selectData.data
      this.selectValue = selectData.data.map(item => item.id)
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
        data1: [],
        showTableData: [],
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
        heightUserManager: 0
      }
    },
    computed: {
      allowSee() {
        return Object.keys(this.formData).length === 0
      }
    },
    activated() {
      this.getGoodslist()
    },
    watch: {
      screenHeight(innerHeight) {
        this.heightInit(innerHeight)
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.heightInit(this.getInnerHeight());
      })
    },
    methods: {
      heightInit(innerHeight) {
        const offsetTopUserManager = this.$refs.refUserManager.$el.getBoundingClientRect().top;
        this.heightUserManager = innerHeight - offsetTopUserManager - 55;
      },
      contractChange(data) {
        if(!data || !data.id) return
        this.data1 = data
        if (!data) return this.tableData = [];
        this.proData = data;
        this.tableShow = true;
        getBpmaMaterialContractReviews({
          ...this.modelSearchFilter,
          proId: data.id
        }).then(res => {
          this.formData = {};
          this.tableShow = false;
          this.tableData = res.data.rows;
          this.total = res.data.total;
          this.modelSearchFilter = {
            page: 1,
            limit: 10
          };
          // this.getGoodslist();
        })
      },
      addClick(lock) {
        if (!this.proData.id) return this.$message.error('当前无项目，无法新增合同！')
        this.dialogFormVisible = true
        let { formData } = this
        this.$store.dispatch("cacheId", '0')
        if (lock) {
          formData = {
            validateStatus: 2,
            beforeTaxPrice: '0.00',
            invoiceTaxRate: '0.00',
            progressPricePayScale: '1.00',
            qualityAssurancePriceScale: '0.00',
            signStatus: 2,
            proName: this.proData.name,
            proId: this.proData.id,
            proCode: this.proData.code,
            ifContract: 2
          }
        }
        formData = JSON.stringify(formData)
        this.$router.push({
          path: `review/id/${this.formData.id || 0}`,
          query: {
            formData
          }
        })
      },
      refreshData() {
        this.getProjectList()
      },
      format(row, column, cellValue, index) {
        let money = Number(row.beforeTaxPrice)
        let invrate = Number(row.invoiceTaxRate)
        switch(column.property) {
          case 'validateStatus':
            return this.formatAuditStatusEnum(row.validateStatus)
          case 'beforeTaxPrice':
            return this.$utilsBasic.toThousands(row.beforeTaxPrice)
          case 'afterTaxPrice':
            return this.$utilsBasic.toThousands(isNaN(money / (1 + invrate)) ? '0.00' : (money / (1 + invrate)))
          case 'tax':
            return this.$utilsBasic.toThousands(isNaN(money / (1 + invrate) * invrate) ? '0.00' : (money / (1 + invrate) * invrate))
          default:
            return cellValue
        }
      },
      rowClick(row, column, event) {
        this.formData = row
      },
      formatToThousands(num) {
        num = num.replace(/,/g, '')
        const sum = num.split('.')
        num = sum[0]
        let result = ''
        while(num.length > 3) {
          result = `,${num.slice(-3)}${result}`
          num = num.slice(0, num.length - 3)
        }
        result = num + result
        sum[0] = result
        result = sum.join('.')
        return result
      },
      getGoodslist() {
        this.contractChange(this.proData)
        // const start = (this.modelSearchFilter.page - 1) * this.modelSearchFilter.limit
        // const end = start + this.modelSearchFilter.limit
        // this.showTableData = this.tableData.slice(start, end)
        // this.contractChange(this.data1)
      }
    }
  }
</script>

<style scoped>
</style>
