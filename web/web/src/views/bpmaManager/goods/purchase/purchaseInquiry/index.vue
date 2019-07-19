<template>
  <basic-split-pane class="bpmaManager-container-list" :default-percent='75' :min-percent='25'>
    <template slot="leftContainer">
      <div class="left-container">
        <div class="handler-container">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addLog()" plain>新增采购询价</el-button>
          <el-button type="primary" size="small" icon="el-icon-if-see" @click="showDetail" plain>查看</el-button>
          <el-form :inline="true" class="right">
            <el-form-item>
              <el-input clearable size="small" @keyup.enter.native.prevent="query" v-model="fuzzy" placeholder="请输入关键字">
                <i class="el-icon-search el-input__icon" slot="suffix">
                </i>
              </el-input>
            </el-form-item>
            <el-form-item class="advanced-query">
              <el-button type="primary" size="small" icon="el-icon-if-query" plain>高级查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <logTable :tableData="tableData" :columns="tableTitle" :page="page" @handleCurrentChange="handleCurrentChange"
          @currentPage="currentPage" ref="logTable"></logTable>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container">
        <page-select-filter :selectData="selectData" :data="itemData" @change="changeProject" :syncSearch='0'
          v-model="selectValue" @refreshData="refreshData"></page-select-filter>
      </div>
    </template>
  </basic-split-pane>
</template>

<script>
  import basicSplitPane from '@/views/components/basic/basicSplitPane'
  import {
    getDictionaryDataByTypeFilter
  } from '@/api/common/dataDictionary'
  import tableTitle from './tableTitle.json'
  import logTable from './components/logTable'
  import {
    selectListOwn
  } from '@/api/bpmaManager/early/itemInfo/itemRegister/index.js'
  import {
    selectBudget
  } from '@/api/bpmaManager/goods/purchase/purchaseInquiry/index.js'
  export default {
    name: 'change',
    components: {
      basicSplitPane,
      logTable
    },
    created() {
      this.selectItems()
      this.getDic()
    },
    data() {
      const that = this
      return {
        selectData: {
          data: [],
          key: 'id'
        },
        stage: [],
        selectValue: [],
        fuzzy: '',
        proObj: '',
        itemData: {
          name: 'name',
          key: 'stageId',
          data: []
        },
        tableTitle,
        tableShow: false,
        tableData: [],
        formData: {},
        proData: {},
        page: {
          total: 0,
          currentPage: 1,
          limit: 10
        },
        dialogFormVisible: false
      }
    },
    activated() {
      this.refreshData()
    },
    methods: {
      selectItems(fuzzy) {
        let data = {
          page: 1,
          limit: 1000,
          fuzzy: fuzzy,
        }
        selectListOwn(data).then(res => {
          if (res.status == 200) {
            this.itemData.data = res.data.rows
          }
        }).catch(err => {
          this.$message.warning(err.$message)
        })
      },
      getDic() {
        getDictionaryDataByTypeFilter('SYS_PRO_STAGE').then(res => {
          if (res.status == 200) {
            this.selectData.data = res.data
            this.selectValue = res.data.map(item => item.id)
          }
        }).catch(err => {
          this.$message.warning(err.message)
        })
      },
      changeProject(obj) {
        this.proObj = obj
        this.select(1)
      },
      //查询左边
      select(page, limit, fuzzy) {
        if (!this.proObj) {
          return
        }
        let data = {
          proId: this.proObj ? this.proObj.id : '',
          page: page,
          limit: limit,
          fuzzy: fuzzy,
        }
        selectBudget(data).then(res => {
          if (res.status == 200) {
            this.tableData = res.data.rows
            this.page.total = res.data.total
          }
        }).catch(err => {
          this.$message.warning(err.$message)
        })
      },
      refreshData() {
        this.changeProject(this.proObj)
      },
      //添加日志
      addLog() {
        if (!this.proObj || !this.proObj.id) return this.$message.warning('当前无项目，无法新增采购询价！')
        this.$store.dispatch('setTrackId', '')
        this.$store.dispatch("cacheId", '0')
        this.$router.push({
          path: '/bpmaManager/goods/purchase/purchaseInquiry/components/purchaseInquiryDetail/id',
          name: 'purchaseInquiryDetail',
          params: {
            id: 0,
            proObj: this.proObj
          }
        })
      },
      //搜索
      query() {
        this.getLogs(this.page.currentPage, this.fuzzy)
      },
      //查看详情
      showDetail() {
        if (!this.rowId) {
          this.$message.warning('请选中一行查看')
          return
        }
        this.$store.dispatch("cacheId", '0')
        this.$router.push({
          path: '/bpmaManager/goods/purchase/purchaseInquiry/components/purchaseInquiryDetail/id',
          name: 'purchaseInquiryDetail',
          params: {
            id: this.rowId
          }
        })
      },
      query() {

      },
      rowClick(row, column, event) {
        this.formData = row
      },
      //分页
      currentPage(pages) {
        this.page.currentPage = pages.page
        this.page.limit = pages.limit
        this.select(pages.page, pages.limit)
      },
      handleCurrentChange(obj) {
        this.rowId = obj.id
      }
    }
  }
</script>

<style scoped>

</style>
