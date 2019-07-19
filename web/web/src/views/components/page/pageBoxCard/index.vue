<!--面板-->
<!--参考页面：src\views\eoaManager\index.vue-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="left"><span class="title">{{title}}</span> <span>（共<span class="total">{{dataTable.total}}</span>条）</span></span>
      <el-button size="mini" style="float: right; padding: 3px 0" type="text" @click="clickMore">更多<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>
    <basic-table ref="refTaskTable" :dataTable="dataTable" :columns="columns"
                 :isPagination="false" :pagination="modelSearchFilter"
                 :height="440">
      <template slot-scope="obj" slot="name" v-if="type=='task'">
        <el-button type="text" size="small"
                   @click="clickView(obj.scope.row)">{{ obj.scope.row.name}}
        </el-button>
      </template>
      <template slot-scope="obj" slot="category" v-if="type=='task'">
        {{formatAmType(obj.scope.row.category)}}
      </template>
      <template slot-scope="obj" slot="operate" v-if="type=='task'">
        <el-button type="text" size="small"
                   @click="clickView(obj.scope.row)">办理
        </el-button>
      </template>
      <template slot-scope="obj" slot="messageTitle" v-if="type=='message'">
        <el-button type="text" size="small"
                   @click="clickView(obj.scope.row)">{{ obj.scope.row.messageTitle}}
        </el-button>
      </template>
    </basic-table>
  </el-card>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from '@/utils/mixins/formatBasic'
  import {getTaskData} from '@/api/eoaManager/taskCenterManager';
  import {getMessageData} from '@/api/eoaManager/message/index.js'
  import {    readTask  } from '@/api/eoaManager/taskCenterManager'
  export default {
    name: "pageBoxCard",
    mixins: [computed, methods, formatEnum,formatBasic],
    props: {
      title: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      params: {
        type: Object,
        required: false,
        default:()=>{}
      },
    },
    data(){
      return {
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzyKeys: '',
          fuzzy: ''
        },
        excuteAPI:()=>{},
        columns:[],
        dataTable: {
          data: [],
          total: 0
        },
        tableColumns:{
          task:[
            {
              "text": "任务名称",
              "value": "name",
              "minWidth": "160",
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true,
              className:"spacing-set",
            },
            {
              "text": "申请人",
              "value": "userName",
              "width": "80"
            },
            {
              "text": "申请时间",
              "value": "createTime",
              "width": "160"
            },
            {
              "text": "任务类型",
              "value": "category",
              "width": "80",
              showOverflowTooltip: true,
            },
            {
              "text": "操作",
              "value": "operate",
              "width": "60",
              className:"spacing-set",
            },
          ],
          message:[
            {
              "text": "标题",
              "value": "messageTitle",
              "minWidth": "160",
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true,
              className:"spacing-set",
            },
            {
              "text": "发送人员",
              "value": "sendPerson",
              "width": "200",
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "发送时间",
              "value": "inputTime",
              "width": "160"
            }
          ]
        },
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        //待办事宜
        if (this.type=='task') {
          this.excuteAPI = getTaskData;
          this.$nextTick(() => {
            this.columns = this.tableColumns.task;
          });
        }
        //待阅消息
        if (this.type=='message') {
          this.excuteAPI = getMessageData;
          this.$nextTick(() => {
            this.columns = this.tableColumns.message;
          });
        }
        this.excuteAPI(this.modelSearchFilter).then((response) => {
          this.dataTable.data = response.data.rows;
          this.dataTable.total = response.data.total
        })
      },
      clickMore(){
        //待办事宜
        if (this.type=='task') {
          this.$router.push({name: 'taskCenterManager'})
        }
        //待阅消息
        if (this.type=='message') {
          this.$router.push({name: 'messageCenterManager'})
        }
      },
      clickView(row){
        //待办事宜
        if (this.type=='task') {
          this.$message.error('开发中，敬请期待...')
        }
        //待阅消息
        if (this.type == 'message') {
          let data = {
            params: {id: row.messageId}
          }
          if (row.messageType == 1) {
            data.name = 'logDetail'
          } else if (row.messageType == 2) {
            data.name = 'newsDetail'
          } else if (row.messageType == 3) {
            data.name = 'noticeDetail'
          } else if (row.messageType == 4) {
            data.path = `/bpmaManager/schedule/duration/recording/id/${row.messageId}`
          }
          this.$router.push(data)
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box-card{
  .left{
    border-left: 2px solid #2979FF;
    padding-left: 6px;
    font-size: 14px;
    .title{
      color:#606266
    }
    .total{
      color:#2979FF
    }
  }
  & /deep/ .el-card__body{
    padding: 0 !important;
  }
}

</style>
