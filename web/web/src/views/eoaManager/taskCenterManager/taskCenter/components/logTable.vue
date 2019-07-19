<template>
  <div class="mtb">
    <el-table
      ref="singleTable"
      :data="tableData"
      tooltip-effect="dark"
      :height="heightUserManager"
      border
      stripe
      :highlight-current-row="highlight"
      @row-clcik="handleClick"
      class="mt10"
      style="width: 100%"
    >
      <el-table-column :type="type" label="序号" width="70" align="center"></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        v-for="(col,i) in columns"
        :label="col.text"
        :key="i"
        :width="col.width"
        :class-name="col.align"
        :property="col.value"
      >
      </el-table-column>
        <el-table-column
          header-align="center"
          width="150"
          label="任务类型">
          <template slot-scope="scope">
            {{formatAmType(scope.row.category)}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <el-button type="primary" @click="openModel(scope.row)" plain size="small" v-if="!scope.row.taskName && showHandleBtn">
              办理
            </el-button>
            <el-button type="primary" @click="lookData(scope.row)" plain size="small">
              查看详情
            </el-button>
          </template>
        </el-table-column>
    </el-table>
    <basic-dialog
      title="办理任务"
      modal-append-to-body
      :visible.sync="dialogStatus"
      :close-on-click-modal="false"
      :show-close="false"
      width="75%"
      top="80px">
      <!-- <el-form label-width="120px" class="form-container" :model="formData" ref="formData">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="任务编码">
              <el-input clearable size="small" v-model="formData.id" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务类型">
            <el-select v-model="formData.category" placeholder="请选择新增类型" size="small" disabled>
              <el-option
                v-for="item in flowType"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理人">
              <el-input clearable size="small" v-model="formData.opName" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="formData.category==1">
            <el-form-item label="请假类型">
              <el-select v-model="formData.type" placeholder="请选择" style="width: 100%" :disabled="auditStatus" size="small">
                <el-option
                  v-for="item in dataEnum.holidayType"
                  :key="item.code"
                  :label="item.name"
                  :value="parseInt(item.code)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="开始时间" prop="timeData">
              <el-input clearable size="small" v-model="formData.beginTime" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间" prop="timeData">
              <el-input clearable size="small" v-model="formData.endTime" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
              <el-form-item label="申请人">
                <el-input clearable size="small" v-model="formData.inputPerson" disabled/>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="原因">
              <el-input
                v-model="formData.reason"
                type="textarea"
                :rows="10"
                maxlength="200"
                disabled
                placeholder="请输入内容">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form> -->
      <component :is="componentId" :isUpdateAuthWorkFlow="false" v-if="dialogStatus" :reserve="formData.reserve"></component>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogStatus = false" >取 消</el-button>
        <template v-if="formData.validateStatus == 3 || (formData.validateStatus == 5 && formData.reserve == 2)">
          <el-button type="primary" @click="handle" >提交办理</el-button>
          <el-button v-if="formData.reserve == 2" type="warning" @click="completeData('0')" >退回发起人</el-button>
          <el-button v-if="formData.reserve == 2" type="warning" @click="completeData('5')" >退回上一级</el-button>
        </template>
        <template v-if="formData.validateStatus == 0 || (formData.validateStatus == 5 && formData.reserve == 1)">
          <!-- <el-button type="primary" @click="handleUmit" >编辑</el-button> -->
          <el-button v-if="formData.reserve == 1" type="danger" @click="completeData('4')" >结束办理</el-button>
          <el-button type="danger" @click="handle" >重新审批</el-button>
        </template>
      </span>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog title="审批详情"
      :visible.sync="detailStatus"
      width="1000px"
      :handleClose="handleClose"
      top="100px">
      <div class="imgbox">
        <img :src="flow" alt="">
      </div>
      <el-table
        ref="detailTable"
        highlight-current-row
        :data="detailData"
        border
        fit
        stripe
        height="400">
        <el-table-column
          type="index"
          align="center"
          width="60"
          label="序号"/>
        <el-table-column
          property="taskId"
          align="center"
          width="100"
          label="任务编码"
          show-overflow-tooltip/>
        <el-table-column
          property="taskName"
          align="center"
          width="100"
          label="任务名称"
          show-overflow-tooltip/>
        <el-table-column
          property="opName"
          align="center"
          width="120"
          label="审批人"
          show-overflow-tooltip/>
        <el-table-column
          property="opinion"
          align="center"
          label="审批信息"
          width="120"
          show-overflow-tooltip/>
        <el-table-column
          property="inTime"
          align="center"
          label="任务到达时间"
          width="160"
          show-overflow-tooltip/>
        <el-table-column
          property="createTime"
          align="center"
          width="160"
          label="审批时间"
          show-overflow-tooltip/>
        <el-table-column
          property="usedTime"
          align="center"
          width="140"
          label="处理用时(小时)"
          show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{Math.ceil(scope.row.usedTime/3600000)}}</span>
        </template>
        </el-table-column>
        <el-table-column
          property="flag"
          align="center"
          width="100"
          label="审批状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{formatAuditStatusEnum(scope.row.flag)}}
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailStatus=false" >关闭</el-button>
      </span>
    </basic-dialog>
    <el-dialog :title="compoenntTitle" :visible.sync="umitLeaveShow" @close="handleClose" width="75%">
      <component :is="componentId" :isUpdate="false"></component>
      <!-- <ask-for-leave :isUpdate="false"></ask-for-leave> -->
    </el-dialog>
  </div>
</template>
<script>
import pagination from "@/components/Pagination";
import methods from '@/utils/mixins/methods'
import computed from '@/utils/mixins/computed'
import formatEnum from '@/utils/mixins/formatEnum.js'
import askForLeave from '@/views/eoaManager/attendance/askForLeave/details'
import workOvertime from '@/views/eoaManager/attendance/workOvertime/details'
import contractReview from '@/views/bpmaManager/early/undertakeContract/review/detail/index'
import borrowBill from '@/views/bpmaManager/finance/borrow/borrowBill/detail/index'
import dailyReimbursement from '@/views/bpmaManager/finance/cost/dailyReimbursement/detail/index'
import purchaseApplication from '@/views/bpmaManager/goods/purchase/purchaseApplication/components/materialApplyDetail'
import goodsContractReview from '@/views/bpmaManager/goods/goodsContract/review/contractDetail/index'
import businessReimbursement from '@/views/bpmaManager/finance/cost/businessReimbursement/detail/index'
import {
  readTask
} from '@/api/eoaManager/taskCenterManager'
export default {
  name: "logTable",
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      dictionary: [],
      heightUserManager: "0",
      flow:'',
      dialogStatus: false,
      detailStatus:false,
      search: {
        /*page: 1,
        limit: 30*/
      },
      detailData:[],//详情信息
      formData: {
        beginTime:'',
        endTime:'',
        category:'1',//任务类型
        id:'',//任务编码
        opinion: "",//审核意见
      },
      flowType:[],
      msg: {},//审核传参,
      umitLeaveShow: false,
      detailId: null,
      compoenntTitle: null,
      componentId: null,
      row: {},
      total: 0,
      destroy: false
    };
  },
  computed: {
    auditStatus() {
      return this.formData.validateStatus == 1 || this.formData.validateStatus == 3 || this.formData.validateStatus == 4
    }
  },
  watch: {
    screenHeight(innerHeight) {
      this.heightInit(innerHeight);
    }
  },
  mounted() {
    this.getDataList();
    this.$nextTick(() => {
      this.heightInit(this.getInnerHeight());
    })
  },
  props: {
    columns: {
      type: Array,
      default: []
    },
    tableData: {
      type: Array,
      default: []
    },
    page: {
      type: Object,
      default: {}
    },
    type: {
      type: String,
      default: "index"
    },
    highlight: {
      type: Boolean,
      default: true
    },
    typeTable: {
      type: Boolean,
      default: false
    },
    showHandleBtn: Boolean,
    tabStatus: [String, Number],
    getActivitiMessageList: Function
  },
  components: {
    pagination,
    askForLeave,
    workOvertime,
    contractReview,
    borrowBill,
    dailyReimbursement,
    goodsContractReview,
    purchaseApplication,
    businessReimbursement
  },
  methods: {
    handle() {
      this.dialogStatus = false
      this.$pagePPSelect.open({
        // processId: '750052'
        processId: this.formData.processInstanceId,
        formData: this.formData
      }).then(res => {
        this.msg.nextCandidateId = res.nextCandidateId
        this.msg.nextGroupId = res.nextGroupId
        this.msg.sendUserId = res.sendUserId
        this.formData.opinion = res.handleText
        this.completeData('1')
      }).catch(err => {
        this.dialogStatus = true
      })
    },
    heightInit(innerHeight) {
      if (!this.$refs.singleTable) return
      const offsetTopUserManager = this.$refs.singleTable.$el.getBoundingClientRect().top;
      this.heightUserManager = innerHeight - offsetTopUserManager - 75;
    },
    handleUmit() {
      this.dialogStatus = false
      this.umitLeaveShow = true
      this.$route.query.id = this.detailId
      switch(this.formData.category) {
        case 'askForLeave':
          this.componentId = 'ask-for-leave'
          this.compoenntTitle = '请假编辑'
          break
        case 'workOvertime':
          this.componentId = 'workOvertime'
          this.compoenntTitle = '加班编辑'
          break
        case 'undertakeContractReview':
          this.componentId = 'contract-review'
          this.compoenntTitle = '承接合同评审'
          break
      }
    },
    handleClose() {
      this.dialogStatus = true
    },
    showDetail(a) {
      /*this.$emit("dblclick", a);*/
    },
    currentPage(pages) {
      /*this.$emit("currentPage", pages.page);*/
    },
    handleClick(row) {
      this.row = row
    },
    handleSelectionChange(v) {
     /* this.$emit("handleSelectionChange", v);*/
    },
    dblclick(row) {
     /* this.$emit("dblclick", row);*/
    },
    handleClose() {
      if(this.tabStatus == 2) {
        this.getActivitiMessageList()
      }
    },
    /*打开弹窗*/
    async openModel(data) {
      this.$set(this.formData, 'validateStatus', null)
      this.$set(this.formData, 'reserve', null)
      // this.formData.validateStatus = null
      // this.formData.reserve = null
      await this.getFlowMsg(data.id,data.category)
      this.formData.category=data.category;
      this.formData.id=data.id;
      this.formData.opName=this.$store.state.user.login.username;;
      this.$route.query.id = this.detailId
      this.$route.params.detail = this.detailId
      this.$route.params.id = this.detailId
      switch(this.formData.category) {
        case 'askForLeave':
          this.componentId = 'ask-for-leave'
          this.compoenntTitle = '请假编辑'
          break
        case 'workOvertime':
          this.componentId = 'work-overtime'
          this.compoenntTitle = '加班编辑'
          break
        case 'undertakeContractReview':
          this.componentId = 'contract-review'
          this.compoenntTitle = '承接合同评审'
          break
        case 'borrowBill':
          this.componentId = 'borrow-bill'
          this.compoenntTitle = '借款单'
          break
        case 'dailyReimbursement':
          this.componentId = 'daily-reimbursement'
          this.compoenntTitle = '日常报销'
          break
        case 'businessReimbursement':
          this.componentId = 'business-reimbursement'
          this.compoenntTitle = '业务报销'
          break
        case 'purchaseApplication':
          this.componentId = 'purchase-application'
          this.compoenntTitle = '采购申请'
          break
        case 'goodsContractReview':
          this.componentId = 'goods-contract-review'
          this.compoenntTitle = '物资合同评审'
          break
      }
      this.dialogStatus = true;
    },
    //处理待办任务
    completeData(val) {
      this.msg.opId = this.$store.state.user.login.id;
      this.msg.opName = this.$store.state.user.login.username;
      this.msg.flag = val;
      this.msg.taskId = this.formData.id;
      this.msg.opinion = this.formData.opinion;
      this.msg.inputPersonId = this.formData.inputPersonId
      this.$store.dispatch('CompleteShowTask', this.msg).then((response) => {
        this.$message.success('操作成功');
        this.$emit('getDataList');
        this.dialogStatus = false;
      }).catch((err) => {
      })
    },
    //查看详情
    lookData(row){
      this.detailStatus = true;
      this.$store.dispatch('ReadResource',row.procInstId || row.processInstanceId).then((response) => {
        this.flow="data:image/png;base64,"+response.images;
      }).catch((err) => {
      })
      this.$store.dispatch('LookShowTask', row.procInstId || row.processInstanceId).then((response) => {
        this.detailData=response.data;
      }).catch((err) => {
      })
      if(this.tabStatus == 2) {
        readTask({id: row.id})
      }
    },
    /*类型*/
    dataType() {
      this.$store.dispatch('AmType').then((response) => {
        this.flowType=response;
      }).catch((err) => {
      })
    },
    /*获取加班、请假详情*/
    getFlowMsg(id,type){
      return new Promise((reslove, reject) => {
        this.$store.dispatch('GetFormId',id).then((response) => {
          this.$set(this.formData, 'reason', response.data.reason)
          this.$set(this.formData, 'beginTime', response.data.beginTime)
          this.$set(this.formData, 'endTime', response.data.endTime)
          this.$set(this.formData, 'inputPerson', response.data.inputPerson)
          this.$set(this.formData, 'inputPersonId', response.data.inputPersonId)
          this.$set(this.formData, 'validateStatus', response.data.validateStatus)
          this.$set(this.formData, 'processInstanceId', response.data.processInstanceId)
          this.$set(this.formData, 'reserve', response.data.reserve)
          this.detailId = response.data.id
          reslove()
        })
      })
    }
  },
  created() {
    //初始化数据字典
    this.getEnumData([
      "GetReadStatus",
      'GetHolidayTypeData',
      'GetAuditStatusEnum',
      'GetAmTypeData'
    ]);
    this.dictionary = this.$store.state.common.dataEnum;
  },
  mounted() {
    this.dataType();
    let that = this;
    this.$nextTick(() => {
      this.heightInit(this.getInnerHeight());
    })
  }
};
</script>
<style scoped>
.mt10 {
  margin-top: 15px;
}
.pagination {
  text-align: right;
}
.el-table td.is-center.left {
  text-align: left !important;
}
.mtb >>> .el-table--medium td {
  padding: 5px 0 !important;
}
</style>


