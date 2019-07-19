<template>
  <div class="work-container-list">
    <!-- <el-tabs type="border-card" @tab-click="getLogs" v-model="editableTabsValue"> -->
    <el-tabs type="border-card" @tab-click="check" v-model="editableTabsValue">
      <el-tab-pane v-for="(item,i) in tabPane" :key="i">
        <span slot="label"> {{item.name}}</span>
        <!-- <el-form :inline="true" :model="formInline" class="form-inline-search left" v-if="i==1">
          <el-form-item label="日期范围:">
            <el-date-picker size="small" v-model="allTime" type="datetimerange" start-placeholder="开始日期"
              :default-time="['00:00:01', '23:59:59']" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="query" icon="el-icon-search" type="primary">搜索</el-button>
            <el-button size="small" icon="el-icon-minus" type="primary" plain>重置</el-button>
          </el-form-item>
        </el-form> -->
      </el-tab-pane>
      <logTable @getDataList="getDataList" :tableData="tableData" :columns="columns" :page="page"
        @handleCurrentChange="handleCurrentChange" @currentPage="currentPage" ref="logTables"
        @dblclick="dblclick" :showHandleBtn="showHandleBtn" :tabStatus="tabStatus" :getActivitiMessageList="getActivitiMessageList"></logTable>
      <pagination :limit.sync="modelSearchFilter.limit" :page.sync="modelSearchFilter.page" :total="total"
                  @pagination="currentPage"/>
    </el-tabs>
  </div>
</template>

<script>
  import logTable from './components/logTable'
  import pagination from "@/components/Pagination";
  import { parseTime } from 'utils'
  import { getMessageData, changeMessage } from '@/api/eoaManager/message/index.js'
  import {
    getActivitiMessageList,
    getTaskData,
    getCompleteList
  } from '@/api/eoaManager/taskCenterManager'
  export default {
    components: {
      logTable,
      pagination
    },
    data() {
      return {
        tableData: [],
        formInline: {
          user: '',
          messageTitle: '',
          sendPerson: '',
          startTime: '',
          endTime: '',
        },
        allTime: '',
        editableTabsValue: '',
        typeId: 0,
        messageTypeId: 1,
        readStatus: 1,
        rowId: '',
        showHandleBtn: true,
        tabPane: [
          {
            name: '待办任务',
          },
          {
            name: '已办任务',
          },
          {
            name: '待阅消息'
          }
        ],
        fuzzy: '',
        columns: [],
        columns1: [
          {
            text: '任务编号',
            value: 'id',
            width: '80'
          },
          {
            text: '任务名称',
            value: 'name',
            width: '100'
          },
          {
            text: '申请人',
            value: 'userName',
            width: '100'

          },
          {
            text: '原因',
            value: 'reason',
            align: 'left'
          },
          {
            text: '创建时间',
            value: 'createTime',
            width: '160'
          },
          {
            text: '流程实例ID',
            value: 'procInstId',
            width: '100'
          }
        ],
        columns2: [
          {
            text: '任务编号',
            value: 'id',
            width: '170'
          },
          {
            text: '任务名称',
            value: 'taskName',
            width: '100'
          },
          {
            text: '申请人',
            value: 'applicantName',
            width: '100'
          },
          {
            text: '原因',
            value: 'opinion',
            align: 'left'
          },
          {
            text: '创建时间',
            value: 'createTime',
            width: '160'
          },
          {
            text: '流程实例ID',
            value: 'processInstanceId',
            width: '100'
          }
        ],
        columns3: [
          {
            text: '任务编号',
            value: 'id',
            width: '170'
          },
          {
            text: '任务名称',
            value: 'name'
          },
          {
            text: '创建时间',
            value: 'createTime',
            width: '160'
          },
          {
            text: '流程实例ID',
            value: 'processInstanceId',
            width: '100'
          }
        ],
        page: {
          total: 0,
          pageSize: 10,
          currentPage: 1
        },
        tableData: [],
        tabStatus: '0',
        total: 0,
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzyKeys: '',
          fuzzy: ''
        }
      }
    },
    methods: {
      check(v) {
        if(this.tabStatus == v.index) return this.currentPage()
        this.modelSearchFilter = {
          page: 1,
          limit: 10,
          fuzzyKeys: '',
          fuzzy: ''
        }
        this.tabStatus = v.index;
        if (v.index == 0) {
          this.columns = this.columns1
          this.getDataList();
          this.showHandleBtn = true
        } else if(v.index == 1){
          this.columns = this.columns2
          this.getCompleteList();
          this.showHandleBtn = true
        } else {
          this.columns = this.columns3
          this.getActivitiMessageList()
          this.showHandleBtn = false
        }
      },
      /*获取待办列表*/
      getDataList() {
        getTaskData(this.modelSearchFilter).then((response) => {
          this.tableData = response.data.rows;
          this.total = response.data.total
        })
      },
      /*获取已办列表*/
      getCompleteList() {
        getCompleteList(this.modelSearchFilter).then((response) => {
          this.tableData = response.data.rows;
          this.total = response.data.total
        })
      },
      // 待阅消息列表
      getActivitiMessageList() {
        getActivitiMessageList(this.modelSearchFilter).then(res => {
          this.tableData = res.data.rows;
          this.total = res.data.total
        })
      },
      //搜索
      query() {
        let arr = {
          startTime: this.allTime[0] ? parseTime(this.allTime[0].getTime()) : '',
          endTime: this.allTime[1] ? parseTime(this.allTime[1].getTime()) : ''
        }
        if (this.tabStatus == 0) {
          this.getDataList();
        } else {
          this.getCompleteList();
        }
      },
      //查看详情
      dblclick(row) {
        let obj = { ...row }
        obj.readStatus = 1
        changeMessage(obj).then(res => {
        }).catch(err => {
          console.log(err)
        })
        let data = {
          params: { id: row.messageId }
        }
        if (row.messageType == 1) {
          data.name = 'logDetail'
          data.path = '/eoaManager/work/logDetail'
        } else if (row.messageType == 2) {
          data.name = 'newsDetail'
          data.path = '/eoaManager/information/newsDetail'
        } else {
          data.name = 'noticeDetail'
          data.path = '/eoaManager/information/noticeDetail'
        }
        this.$router.push(data)
      },
      //分页
      currentPage() {
        console.log(this.tabStatus)
        switch(this.tabStatus) {
          case '0':
            this.getDataList()
            break
          case '1':
            this.getCompleteList()
            break
          case '2':
            this.getActivitiMessageList()
            break
        }
      },
      handleCurrentChange(id) {
        this.rowId = id
      }
    },
    created() {
      this.getDataList();
      let messageTypeId = this.$store.getters.getMessageTypeId

      this.messageTypeId = messageTypeId
      this.editableTabsValue = messageTypeId
      if (this.messageTypeId == 0) {
        this.columns = this.columns1
      } else {
        this.columns = this.columns2
      }
    }
  }
</script>
<style scoped>
  .work-container-list>>>.el-tabs--border-card>.el-tabs__content {
    padding: 10px
  }

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
