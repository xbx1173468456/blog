<template>
  <div class="work-container-list">

      <!-- <el-tabs type="border-card" @tab-click="getLogs" v-model="editableTabsValue"> -->
      <el-tabs type="border-card" @tab-click="check" v-model="editableTabsValue">
        <el-tab-pane v-for="(item,i) in tabPane" :key="i">
          <span slot="label"> {{item.name}}</span>
          <basic-handler>
            <el-form :inline="true" :model="formInline" class="form-inline-search left">
              <el-form-item label="消息名称:">
                <el-input clearable size="small" v-model="formInline.messageTitle" placeholder="消息名称" @clear='query'></el-input>
              </el-form-item>
              <el-form-item label="发送人员:">
                <el-input clearable size="small" v-model="formInline.sendPerson" placeholder="发送人员" @clear='query'></el-input>
              </el-form-item>
              <el-form-item label="日期范围:">
                <el-date-picker size="small"
                                v-model="allTime"
                                type="datetimerange"
                                start-placeholder="开始日期"
                                :default-time="['00:00:01', '23:59:59']"
                                end-placeholder="结束日期"
                                @change='query'
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button size="small" @click="query" icon="el-icon-search" type="primary">搜索</el-button>
                <el-button size="small" icon="el-icon-minus" type="primary" plain>重置</el-button>
              </el-form-item>
            </el-form>
          </basic-handler>
        </el-tab-pane>
         <logTable :tableData="tableData" :columns="columns" :page="page" @handleCurrentChange="handleCurrentChange" @currentPage="currentPage"  ref="logTables" @dblclick="dblclick"></logTable>
      </el-tabs>
  </div>
</template>

<script>
import logTable from './components/logTable'
import { parseTime } from 'utils'

import {getMessageData,changeMessage} from '@/api/eoaManager/message/index.js'

export default {
  name: 'Hello',
  data() {
    return {
        formInline: {
          user: '',
          messageTitle:'',
          sendPerson:'',
          startTime:'',
          endTime:'',
        },
        allTime:'',
        editableTabsValue:'',
        typeId:0,
        messageTypeId:0,
        readStatus:1,
        rowId:'',
        tabPane:[
          {
            name:'待阅消息',
            id:1
          },
          {
            name:'已阅消息',
            id:2
          }
        ],
        fuzzy:'',
        columns:[],
        columns1: [
          {
            text: '阅读状态',
            value: 'readStatus',
            width:'80'
          },
          {
            text: '消息编码',
            value: 'messageCode',
            width:'160'

          },
          {
            text: '消息名称',
            value: 'messageTitle',
            align:'left'

          },
          {
            text: '发送人员',
            value: 'sendPerson'
          },
          {
            text: '发送时间',
            value: 'inputTime',
            width:'160'
          }

         ],
         columns2:[
          {
            text: '阅读状态',
            value: 'readStatus',
            width:'80'
          },
          {
            text: '消息编码',
            value: 'messageCode',
            width:'160'
          },
          {
            text: '消息名称',
            value: 'messageTitle',
            align:'left'
          },
          {
            text: '发送人员',
            value: 'sendPerson'
          },
          {
            text: '发送时间',
            value: 'inputTime',
             width:'160'
          },
          {
            text: '阅读时间',
            value: 'readTime',
             width:'160'
          }
         ],

         page:{
          total:0,
          pageSize:10,
          currentPage:1
        },
         tableData: [],

  }
 },
 methods:{
   check(v){
     this.messageTypeId=v.index
      if(v.index==0){
      this.columns=this.columns1
    }else{
      this.columns=this.columns2
    }
      this.$store.dispatch('setMessageTypeId',v.index)
       this.getLogs(v.index)
   },
   //获取日志
   getLogs(v,page,messageTitle,sendPerson,alltime){
      this.tableData=[]
      this.page.total=0
     if(v==0){
       console.log('未')
       let data={
         page:page,
         limit:10,
         readStatus:2,
         messageTitle:messageTitle,
         sendPerson:sendPerson,
         startTime:alltime?alltime.startTime:'',
         endTime:alltime?alltime.endTime:''
      }
        getMessageData(data).then(res=>{
          if(res.status == 200){
              this.tableData=res.data.rows
              this.page.total=res.data.total
          }
      }).catch(err=>{
        this.$message.warning(err.$message)

      })

     }else{
       console.log('已')

       let data={
         page:page,
         limit:10,
         readStatus:1,
         messageTitle:messageTitle,
         sendPerson:sendPerson,
         startTime:alltime?alltime.startTime:'',
         endTime:alltime?alltime.endTime:''
      }
       getMessageData(data).then(res=>{
          if(res.status == 200){
              this.tableData=res.data.rows
              this.page.total=res.data.total

          }
      }).catch(err=>{
        this.$message.warning(err.$message)
      })
     }
   },
   //搜索
   query(){
     let arr={
       startTime:this.allTime?parseTime(this.allTime[0].getTime()):'',
       endTime:this.allTime?parseTime(this.allTime[1].getTime()):''
     }
      console.log(arr,'arr')
      this.getLogs(this.messageTypeId,this.page.currentPage,this.formInline.messageTitle,this.formInline.sendPerson,arr)
   },
   //查看详情
   dblclick(row){
     row.readTime=new Date().getTime()
     let obj={...row}
     console.log(obj)
     if(obj.readStatus == 2) {
      obj.readStatus=1
      changeMessage(obj).then(res=>{
      }).catch(err=>{
        console.log(err)
      })
     }
     let data={
        params:{id:row.messageId}
     }
     if(row.messageType==1){
       data.name = 'logDetail'
       data.path = '/eoaManager/work/logDetail'
     }else if(row.messageType==2){
       data.name = 'newsDetail'
       data.path = '/eoaManager/information/newsDetail'
     }else if(row.messageType == 3){
       data.name = 'noticeDetail'
       data.path = '/eoaManager/information/noticeDetail'
     } else if(row.messageType == 4) {
      //  data.name = 'recordingDetail'
       data.path = `/bpmaManager/schedule/duration/recording/id/${row.messageId}`
     }
     console.log(data.path)
     this.$router.push(data)
   },
   //分页
    currentPage(pages){
      this.page.currentPage=pages.page
      this.getLogs(this.messageTypeId,pages.page, pages.limit)
    },
   handleCurrentChange(id){
        this.rowId=id
   }
 },
  created(){
    let messageTypeId=this.$store.getters.getMessageTypeId

    this.messageTypeId=messageTypeId
    this.editableTabsValue=messageTypeId
    if(this.messageTypeId==0){
      this.columns=this.columns1
    }else{
      this.columns=this.columns2
    }
    this.getLogs(messageTypeId,this.page.currentPage)
  },
  activated(){
    this.getLogs(this.messageTypeId,this.page.currentPage)
  },
 components:{
   logTable
 }
}
</script>
<style scoped>
.work-container-list >>>.el-tabs--border-card>.el-tabs__content{padding: 10px}
.mt10{margin-top: 15PX;}
.pagination{text-align: right}
.fr{float:right}
</style>

