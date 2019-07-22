<template>
  <basic-container class="bpmaManagerOutputValueSettlementStage-container-list ">
    <div class="splitPane-container" ref="refSplitPane">
      <basic-split-pane class="bpmaManager-container-list" :default-percent='75' :min-percent='25'>
        <template slot="leftContainer">
          <div class="left-container">
            <basic-handler>
              <el-button v-if="!defaultExpandAll" type="primary" size="small" icon="el-icon-if-open" plain @click="expandAll">全部展开
              </el-button>
              <el-button v-if="defaultExpandAll" type="primary" size="small" icon="el-icon-if-fold" plain @click="expandAll">全部折叠</el-button>
              <el-button @click="addClick" icon="el-icon-plus" plain size="small" type="primary">发起跟踪
              </el-button>
              <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
                @clickSearchFilter="clickSearchFilter"></basic-search>
            </basic-handler>
            <div class="table-row table-container">
              <basic-table-tree ref="refUserManager" :default-expand-all="defaultExpandAll"
              :data="tableData" :columns="tableTitle">
                <template slot-scope="treeObj" slot="scheduleImage">
                  <basic-upload-files
                    :id="treeObj.scope.row.id"
                    :size="22"
                    :formData="treeObj.scope.row"
                    disabled
                    :data="treeObj.scope.row.scheduleImage">
                  </basic-upload-files>
                </template>
              </basic-table-tree>
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
  import { getProjectList, getSchedulePlanDetail } from '@/api/bpmaManager/schedule/duration/track'
  import pagination from '@/components/Pagination'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'trackDetail',
    mixins: [computed, methods, formatBasic],
    components: {
      pagination
    },
    data() {
      const that = this
      return {
        defaultExpandAll: true,
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
          limit: 100000,
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
      getSchedulePlanDetail() {
        this.tableShow = true
        if(!this.proData.id) return
        getSchedulePlanDetail(this.proData.id).then(res => {
          this.formData = {}
          this.tableShow = false
          res.data = res.data || []
          res.data = res.data.filter(item => (item.type != 3 && item.type != 4))
          res.data = res.data.map(item => {
            return this.computedShowValue(item)
          })
          res.data = this.computedTreeData(res.data)
          this.computedValue(res.data)
          this.tableData = res.data
          this.total = res.data.total
        })
      },
      computedTreeData(data) {
        let arr = []
        data.forEach(item => {
          if (item.parentId == '-1') arr.push(item)
          else {
            data.some(res => {
              if (res.code == item.parentCode) {
                Array.isArray(res.children) ? res.children.push(item) : this.$set(res, 'children', [item])
                return res.children = res.children.sort((a, b) => a.code - b.code)
              }
            })
          }
        })
        arr = arr.sort((a, b) => a.code - b.code)
        return arr
      },
      computedShowValue(item) {
        let dateValue = new Date(item.changedExpiryDate).getTime() - new Date(item.changedBeginDate).getTime() + 86400000
        let date = new Date()
        date.setHours(23)
        date.setMinutes(59)
        date.setSeconds(59)
        date.setMilliseconds(999)
        item.shouldFinishScale = (date.getTime() - new Date(item.changedBeginDate).getTime()) / dateValue
        item.shouldFinishScale = item.shouldFinishScale > 1 ? '1.00' : this.formatToMoney(item.shouldFinishScale)
        item.shouldFinishScale = item.shouldFinishScale < 0 ? '0.00' : item.shouldFinishScale
        item.shouldFinishValue = this.formatToThousands(item.changedValue * item.shouldFinishScale)
        item.shouldFinishValue = item.shouldFinishValue < 0 ? '0.00' : item.shouldFinishValue
        item.finishScale = this.formatToMoney(item.finishScale)
        item.finishValue = this.formatToThousands(item.finishValue)
        if(item.finishScale == 0 && item.shouldFinishScale == 0) item.taskStatus = '未开始'
        else if(item.finishScale - item.shouldFinishScale > 0) item.taskStatus = '超额'
        else if(item.finishScale - item.shouldFinishScale < 0) item.taskStatus = '延期'
        else item.taskStatus = '正常'
        item.planValue = this.formatToThousands(item.planValue)
        item.changedValue = this.formatToThousands(item.changedValue)
        item.planBeginDate = item.planBeginDate ? item.planBeginDate.split(' ')[0] : ''
        item.changedBeginDate = item.changedBeginDate ? item.changedBeginDate.split(' ')[0] : ''
        item.planExpiryDate = item.planExpiryDate ? item.planExpiryDate.split(' ')[0] : ''
        item.changedExpiryDate = item.changedExpiryDate ? item.changedExpiryDate.split(' ')[0] : ''
        item.scheduleImage = item.scheduleImage ? item.scheduleImage.split(',') : ''
        return item
      },
      // computedValue(data) {
      //   let sumValue = 0
      //   let sumScale = 0
      //   let sumFinishScale = 0
      //   let sumFinishValue = 0
      //   let taskStatus
      //   data.forEach(item => {
      //     if (item.ifLastLevel == 2) {
      //       const { finishScale, finishValue, shouldFinishScale, shouldFinishValue, taskStatus } = this.computedValue(item.children)
      //       item.finishValue = finishValue
      //       item.finishScale = finishScale
      //       item.shouldFinishScale = shouldFinishScale
      //       item.shouldFinishValue = shouldFinishValue
      //       item.taskStatus = taskStatus
      //     }
      //     item.finishValue = item.finishValue.replace(/,/g, '')
      //     item.shouldFinishValue = item.shouldFinishValue.replace(/,/g, '')
      //     sumValue += Number(item.finishValue)
      //     sumScale += Number(item.finishScale)
      //     sumFinishScale += Number(item.shouldFinishScale)
      //     sumFinishValue += Number(item.shouldFinishValue)
      //   })
      //   if (this.formatToMoney(sumScale / data.length) - this.formatToMoney(sumFinishScale / data.length) > 0) taskStatus = '超额'
      //   if (this.formatToMoney(sumScale / data.length) - this.formatToMoney(sumFinishScale / data.length) == 0) taskStatus = '正常'
      //   if (this.formatToMoney(sumScale / data.length) - this.formatToMoney(sumFinishScale / data.length) < 0) taskStatus = '延期'
      //   return {
      //     finishValue: this.formatToThousands(sumValue),
      //     finishScale: this.formatToMoney(sumScale / data.length),
      //     shouldFinishScale: this.formatToMoney(sumFinishScale / data.length),
      //     shouldFinishValue: this.formatToThousands(sumFinishValue),
      //     taskStatus
      //   }
      // },
      computedValue(data) {
        let sumShouldFinishValue = 0
        let sumFinishValue = 0
        let finishScale = 0
        let shouldFinishScale = 0
        let sumDays = 0
        let taskStatus
        data.forEach(item => {
          if(item.ifLastLevel == 2) {
            const { finishScale, finishValue, shouldFinishScale, shouldFinishValue, taskStatus } = this.computedValue(item.children)
            item.finishValue = finishValue
            item.finishScale = finishScale
            item.shouldFinishScale = shouldFinishScale
            item.shouldFinishValue = shouldFinishValue
            item.taskStatus = taskStatus
          }
          item.shouldFinishValue = item.shouldFinishValue.replace(/,/g, '')
          item.finishValue = item.finishValue.replace(/,/g, '')
          sumShouldFinishValue += Number(item.shouldFinishValue)
          sumFinishValue += Number(item.finishValue)
          sumDays += Number(item.changedDays)
        })
        data.forEach(item => {
          let date = new Date()
          date.setHours(23)
          date.setMinutes(59)
          date.setSeconds(59)
          date.setMilliseconds(999)
          let diffDay = Math.ceil(date.getTime() - new Date(item.changedBeginDate).getTime())
          let dateValue = new Date(item.changedExpiryDate).getTime() - new Date(item.changedBeginDate).getTime() + 86400000
          diffDay = diffDay > 1 ? 1 : diffDay
          diffDay = diffDay < 0 ? 0 : diffDay
          shouldFinishScale += item.changedDays / sumDays * item.shouldFinishScale
          finishScale += item.finishScale * (item.changedDays / sumDays)
        })
        if(shouldFinishScale == 0 && finishScale == 0) taskStatus = '未开始'
        else if(shouldFinishScale > finishScale) taskStatus = '延期'
        else if(shouldFinishScale < finishScale) taskStatus = '超额'
        else taskStatus = '正常'
        return {
          finishValue: this.formatToThousands(sumFinishValue),
          finishScale: this.formatToMoney(finishScale),
          shouldFinishScale: this.formatToMoney(shouldFinishScale),
          shouldFinishValue: this.formatToThousands(sumShouldFinishValue),
          taskStatus
        }
      },
      contractChange(data) {
        if (!data) return this.tableData = [], this.modelSearchFilter.page = 1, this.proData = {}
        this.modelSearchFilter.proId = data.id
        this.modelSearchFilter.proName = data.name
        this.proData = data
        this.modelSearchFilter.page = 1
        this.getSchedulePlanDetail()
      },
      addClick(lock) {
        if (!this.proData.id) return this.$message.warning('当前无项目，无法新增跟踪！')
        this.dialogFormVisible = true
        let { formData } = this
        if (lock) {
          this.$store.dispatch("cacheId", true)
          this.$router.push({
            path: `/bpmaManager/schedule/duration/recording/id/0/detail`,
            query: this.proData
          })
        } else {
          this.$router.push({
            path: `/bpmaManager/schedule/duration/recording/id/0/${formData.id}`,
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
          case 'handleDate':
            return row.handleDate ? row.handleDate.split(' ')[0] : ''
          default:
            return cellValue
        }
      },
      rowClick(row, column, event) {
        this.formData = row
      },
      getGoodslist() {
        this.getSchedulePlanDetail()
      },
      expandAll() {
        this.defaultExpandAll = !this.defaultExpandAll
        this.$refs.refUserManager.toggleExpandedAll(this.defaultExpandAll);
      }
    }
  }
</script>

<style scoped>
</style>
