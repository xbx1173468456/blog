<template>
  <div class="bpmaManager-container-list">
    <div class="splitPane-container" ref="refSplitPane">
      <basic-split-pane :default-percent='75' :min-percent='25' :style="windowHeight" split="vertical">
        <template slot="leftContainer">
          <div class="left-container">
            <el-row>
              <el-col :span="18">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="addLog()" plain>新增物资合同变更</el-button>
                <el-button type="primary" size="small" icon="el-icon-if-see" @click="showDetail" plain>查看</el-button>
              </el-col>
            </el-row>
            <el-row class="table-row">
              <logTable :tableData="tableData" :columns="tableTitle" :page="page" :height="heightUserManager"
                @handleCurrentChange="handleCurrentChange" @currentPage="currentPage" ref="logTable"></logTable>
            </el-row>
          </div>
        </template>
        <template slot="rightContainer">
          <div class="right-container">
            <page-select-filter :selectData="selectData" :data="itemData" @change="changeProject" :syncSearch='0'
              v-model="selectValue"></page-select-filter>
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
  import logTable from './components/logTable'
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  import { selectListOwn } from '@/api/bpmaManager/early/itemInfo/itemRegister/index.js'
  import { selectBudget } from '@/api/bpmaManager/goods/goodsContract/change/index.js'
  export default {
    name: 'change',
    mixins: [computed, methods],
    components: {
      splitPane,
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
          pageSize: 10,
          currentPage: 1
        },
        dialogFormVisible: false,
        heightUserManager: 0,
      }
    },
    computed: {
      windowHeight() {
        return {
          height: this.$store.state.app.screenHeight - 120 + 'px'
        }
      }
    },
    activated() {
      this.select()
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
        const offsetTopUserManager = this.$refs.logTable.$el.getBoundingClientRect().top;
        this.heightUserManager = innerHeight - offsetTopUserManager - 55;
      },
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
      select(page, fuzzy) {
        if (!this.proObj) {
          return
        }
        let data = {
          proId: this.proObj ? this.proObj.id : '',
          page: page,
          limit: 10,
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
      //添加
      addLog() {
        this.$store.dispatch("cacheId", '0')
        this.$store.dispatch('setTrackId', '')
        this.$router.push({
          path: '/bpmaManager/goods/goodsContract/change/components/change/id',
          name: 'changeDetail',
          params: { id: 0, proObj: this.proObj }
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
          path: '/bpmaManager/goods/goodsContract/change/components/change/id',
          name: 'changeDetail',
          params: { id: this.rowId }
        })
      },
      query() {

      },
      rowClick(row, column, event) {
        this.formData = row
      },
      //分页
      currentPage(v) {
        this.page.currentPage = v
        this.select(v)
      },
      handleCurrentChange(obj) {
        this.rowId = obj.id
      }
    }
  }
</script>

<style scoped>

</style>
