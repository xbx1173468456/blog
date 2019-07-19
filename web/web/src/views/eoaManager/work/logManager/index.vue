<template>
  <div class="work-container-list">
    <!-- <el-tabs type="border-card" @tab-click="getLogs" v-model="editableTabsValue"> -->
    <el-tabs type="border-card" @tab-click="check" v-model="editableTabsValue">
      <el-tab-pane v-for="(item,i) in tabPane" :key="i">
        <span slot="label"> {{item.name}}</span>
        <el-row>
          <el-col :span="14">
            <div class="grid-content bg-purple">
              <el-button type="primary" size="small" icon="el-icon-plus" @click="addLog()" plain v-if="item.id==1">新增日志
              </el-button>
              <el-button type="primary" size="small" icon="el-icon-if-see" @click="showDetail" plain>查看</el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh" @click="getLogs(typeId,1)" plain>刷新
              </el-button>
            </div>
          </el-col>
          <el-col :span="10" class="fr">
            <div class="handler-container">
              <el-form :inline="true" class="right">
                <el-form-item>
                  <el-input clearable size="small" @keyup.enter.native.prevent="query" v-model="fuzzy"
                    placeholder="请输入关键字">
                    <i class="el-icon-search el-input__icon" slot="suffix">
                    </i>
                  </el-input>
                </el-form-item>
                <el-form-item class="advanced-query">
                  <el-button type="primary" size="small" icon="el-icon-if-query" plain @click="query">高级查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <logTable :tableData="tableData" :columns="columns" :page="page" @handleCurrentChange="handleCurrentChange"
        @currentPage="currentPage" ref="logTable"></logTable>
    </el-tabs>
  </div>
</template>

<script>
  import logTable from './components/logTable'
  import { selectLogs, selectOtherLogs } from '@/api/eoaManager/work/index.js'
  export default {
    name: 'Hello',
    data() {
      return {
        editableTabsValue: '',
        typeId: 0,
        rowId: '',
        tabPane: [
          {
            name: '我的日志',
            id: 1
          },
          {
            name: '他人日志',
            id: 2
          }
        ],
        fuzzy: '',
        columns: [],
        columns1: [
          {
            text: '审核状态',
            value: 'validateStatus',
            width: '80'
          },
          {
            text: '日志编码',
            value: 'code'
          },
          {
            text: '是否补录',
            value: 'reinput',
            width: '80'
          },
          {
            text: '所属日期',
            value: 'workDay'
          },
          {
            text: '今日总结',
            value: 'sumarize',
            align: 'left'
          },
          {
            text: '明日计划',
            value: 'plan',
            align: 'left'
          },
          {
            text: '工作建议',
            value: 'advise',
            align: 'left'
          }

        ],
        columns2: [
          {
            text: '日志编码',
            value: 'code'
          },
          {
            text: '是否补录',
            value: 'reinput',
            width: '80'
          },
          {
            text: '所属日期',
            value: 'workDay'
          },
          {
            text: '今日总结',
            value: 'sumarize',
            align: 'left'
          },
          {
            text: '明日计划',
            value: 'plan',
            align: 'left'
          },
          {
            text: '工作建议',
            value: 'advise',
            align: 'left'
          },
          {
            text: '登记人员',
            value: 'inputPerson'
          },
          {
            text: '登记日期',
            value: 'inputTime'
          }
        ],
        page: {
          total: 0,
          pageSize: 10,
          currentPage: 1
        },
        tableData: [],

      }
    },
    created() {
      let typeId = this.$store.getters.getTypeId
      this.typeId = typeId
      this.editableTabsValue = typeId
      if (this.typeId == 0) {
        this.columns = this.columns1
      } else {
        this.columns = this.columns2
      }
    },
    activated() {
      let typeId = this.$store.getters.getTypeId
      this.typeId = typeId
      this.editableTabsValue = typeId
      if (this.typeId == 0) {
        this.columns = this.columns1
      } else {
        this.columns = this.columns2
      }
      this.getLogs(typeId, this.page.currentPage)
    },
    methods: {
      check(v) {
        this.typeId = v.index
        if (v.index == 0) {
          this.columns = this.columns1
        } else {
          this.columns = this.columns2
        }
        this.$store.dispatch('setTypeId', v.index)
        this.getLogs(v.index)
      },
      //获取日志
      getLogs(v, page, limit) {
        this.tableData = []
        this.page.total = 0
        this.page.currentPage = page
        this.page.pageSize = limit
        if (v == 0) {
          let data = {
            page: page,
            limit: limit,
            fuzzy: this.fuzzy,
            selectOwn: 1
          }
          selectLogs(data).then(res => {
            if (res.status == 200) {
              this.tableData = res.data.rows
              this.page.total = res.data.total

            } else {

            }
          }).catch(err => {
            this.$message.warning(err.$message)

          })

        } else {
          let data = {
            page: page,
            limit: limit,
            fuzzy: this.fuzzy
          }
          selectOtherLogs(data).then(res => {
            if (res.status == 200) {
              this.tableData = res.data.rows
              this.page.total = res.data.total

            } else {

            }
          }).catch(err => {
            this.$message.warning(err.$message)

          })
        }
      },
      //添加日志
      addLog() {
        this.$store.dispatch("cacheId", '0')
        this.$store.dispatch('setLogId', '')
        this.$router.push({
          path: '/eoaManager/work/logManager/id',
          name: 'logDetail',
          params: { id: 0 }
        })
      },
      //搜索
      query() {
        this.getLogs(this.typeId, this.page.currentPage, this.page.limit, this.fuzzy)
      },
      //查看详情
      showDetail() {
        if (!this.rowId) {
          this.$message.warning('请选中一行查看')
          return
        }
        this.$store.dispatch("cacheId", '0')
        this.$router.push({
          path: '/eoaManager/work/logManager/id',
          name: 'logDetail',
          params: { id: this.rowId }
        })
      },
      //刷新
      //  refresh(){
      //    this.page.currentPage=1
      //    this.rowId=''
      //     this.getLogs(this.typeId,1)
      //  },
      //分页
      currentPage(pages) {
        this.page.currentPage = pages.page
        this.page.limit = pages.limit
        this.getLogs(this.typeId, this.page.currentPage, this.page.limit)
      },
      handleCurrentChange(id) {
        this.rowId = id
      }
    },
    components: {
      logTable
    }
  }
</script>
<style scoped>
  .mt10 {
    margin-top: 15PX;
  }

  .pagination {
    text-align: right
  }

  .fr {
    float: right
  }
</style>