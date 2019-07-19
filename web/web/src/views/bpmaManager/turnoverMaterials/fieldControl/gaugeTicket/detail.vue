<template>
  <div class="gaugeTicketDetail-container">
    <basic-handler>
      <el-button
        v-if="addBtnShowFlag"
        type="primary"
        plain
        icon="el-icon-plus"
        size="small"
        @click="handleAddBtn"
      >新增</el-button>
      <el-button
        v-if="saveBtnShowFlag"
        type="primary"
        icon="el-icon-if-save"
        size="small"
        plain
        @click="handleSaveBtn"
        :disabled="saveBtnDisabledFlag || auditBtnDisabledFlag"
      >保存</el-button>

      <el-button
        v-if="deleteBtnShowFlag"
        type="danger"
        icon="el-icon-delete"
        size="small"
        plain
        @click="handleDeleteBtn"
        :disabled="deleteBtnDisabledFlag"
      >删除</el-button>
      <el-button
        v-if="auditBtnShowFlag"
        type="primary"
        icon="el-icon-if-auth"
        size="small"
        plain
        @click="handleAuditBtn"
        :disabled="auditBtnDisabledFlag"
      >审核</el-button>
    </basic-handler>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form
          ref="refCompletionPayForm"
          class="form-container"
          :model="completionPayForm"
          label-width="120px"
          :rules="rules"
          :show-message="false"
        >
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="completionPayForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input
                  size="small"
                  clearable
                  v-model="completionPayForm.code"
                  :disabled="true"
                  placeholder="系统自动生成单据编码"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据名称" prop="name" hide-required-asterisk>
                <el-input
                  size="small"
                  clearable
                  v-model="completionPayForm.name"
                  :disabled="disabledFlag"
                  ref="refCompletionPayName"
                  placeholder="请输入单据名称"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称(*)" prop="proName" hide-required-asterisk>
                <el-input
                  size="small"
                  v-model="completionPayForm.proName"
                  readonly
                  placeholder="请选择项目名称"
                  :disabled="disabledFlag"
                >
                  <el-button
                    size="small"
                    slot="append"
                    icon="el-icon-plus"
                    class="form-btn"
                    :disabled="disabledFlag"
                    @click="toipClick('project')"
                  ></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位名称" prop="enterpriseName" hide-required-asterisk>
                <el-input
                  size="small"
                  v-model="completionPayForm.enterpriseName"
                  readonly
                  placeholder="请选择单位名称"
                  :disabled="disabledFlag"
                >
                  <el-button
                    size="small"
                    slot="append"
                    icon="el-icon-plus"
                    class="form-btn"
                    :disabled="disabledFlag"
                    @click="toipClick('counterpart')"
                  ></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同名称" prop="contractName" hide-required-asterisk>
                <el-input
                  size="small"
                  v-model="completionPayForm.contractName"
                  readonly
                  placeholder="请选择合同名称"
                  :disabled="disabledFlag"
                >
                  <el-button
                    size="small"
                    slot="append"
                    icon="el-icon-plus"
                    class="form-btn"
                    :disabled="disabledFlag"
                    @click="toipClick('contract')"
                  ></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="计量金额">
                <basic-input
                  :formatValue="formatToMoney"
                  :format="formatToThousands"
                  clearable
                  v-model="beforeTaxPrice"
                  placeholder="请输入计量金额"
                  :disabled="disabledFlag"
                  :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="质保金比例">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="completionPayForm.qualityAssuranceScale"
                             :disabled="disabledFlag"
                             placeholder="请输入质保金比例"
                             :min="0"
                             :max="1"
                             @change="changeScale"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="质保金总额">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="qualityAssurancePrice"
                             :disabled="true"
                             placeholder="请输入质保金总额"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
               <el-form-item label="质保到期日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="completionPayForm.qualityAssuranceDate"
                                type="date"
                                :disabled="disabledFlag"
                                @change="changeFormatQualityAssuranceDate"
                                placeholder="选择质保到期日期" class="date-picker">
                </el-date-picker>
              </el-form-item>
          </el-col>-->

          <!-- </el-row> -->
          <!--<el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="是否结算" prop="ifPay" class="add-border" >

                <el-radio-group v-model="completionPayForm.ifPay">
                  <el-radio :label="parseInt(row.code)"
                            v-for="(row, key, index) in dataEnum.isOrNot"
                            :key="row.code" :disabled="true">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            &lt;!&ndash; <el-col :span="8">
               <el-form-item label="结算金额">
                 <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                              clearable
                              v-model="completionPayForm.payedPrice"
                              placeholder="系统自动生成结算金额"
                              :disabled="true"
                              :min="0"
                 ></basic-input>
               </el-form-item>
             </el-col>
             <el-col :span="8">
               <el-form-item label="结算单号">
                 <el-input size="small" clearable v-model="completionPayForm.payedCode" :disabled="true" placeholder="系统自动生成结算单号"/>
               </el-form-item>
             </el-col>&ndash;&gt;
          </el-row>-->

          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="备注说明">
                <el-input
                  size="small"
                  clearable
                  :disabled="disabledFlag"
                  :autosize="{ minRows:2, maxRows: 5}"
                  :max="5000"
                  v-model="completionPayForm.remark"
                  type="textarea"
                  placeholder="请输入补充说明，不超过200字"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
                <basic-upload
                  ref="refBasicUpload"
                  :disabled="disabledFlag"
                  :formId="completionPayFormId"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="16">
              <el-form-item label="登记人员" prop="names" hide-required-asterisk>
                <el-input
                  size="small"
                  clearable
                  v-model="completionPayForm.namess"
                  :disabled="true"
                  ref="refCompletionPayName"
                  placeholder="请输入登记人员"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-date-picker
                  size="small"
                  :editable="false"
                  :clearable="false"
                  v-model="completionPayForm.shouldPayDates"
                  type="date"
                  :disabled="true"
                  @change="changeFormatShouldPayDate"
                  placeholder="登记时间"
                  class="date-picker"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <transition name="slide-fade">
      <div class="content-container">
        <basic-handler class="margin-top10">
          <el-button
            v-if="subStagePayBtnShowFlag"
            type="primary"
            plain
            icon="el-icon-plus"
            size="small"
            :disabled="disabledFlag"
            @click="handleImportSubStagePay"
          >现场周材</el-button>
          <el-button
            v-if="deleteBtnSubListShowFlag"
            type="danger"
            icon="el-icon-delete"
            size="small"
            plain
            @click="handleDeleteSubListBtn"
            :disabled="deleteSubListBtnDisabledFlag"
          >删除</el-button>
        </basic-handler>
        <basic-table
          ref="refCompletionPayTableData"
          :isPagination="false"
          :dataTable="completionPayTableData"
          :columns="columns"
          :pagination="modelSearchFilter"
          @current-change="handleCurrentChange"
          @pagination="getCompletionPayDetailData"
        >
          <template slot-scope="obj" slot="billType">{{formatSubFinBillType(obj.scope.row)}}</template>

          <template
            slot-scope="obj"
            slot="unpayPrice"
          >{{formatToThousands(obj.scope.row.unpayPrice)}}</template>
          <template slot-scope="obj" slot="shouldPayPrice">
            <basic-input
              :formatValue="formatToMoney"
              :format="formatToThousands"
              clearable
              v-model="obj.scope.row.shouldPayPrice"
              :disabled="disabledFlag"
              placeholder="请输入应付总额"
            ></basic-input>
            <!--        {{formatToThousands(obj.scope.row.shouldPayPrice)}}-->
          </template>
          <template slot-scope="obj" slot="summary">
            <el-input
              clearable
              size="small"
              placeholder="请输入结算说明"
              v-model="obj.scope.row.summary"
              :disabled="disabledFlag"
            ></el-input>
          </template>
        </basic-table>
      </div>
    </transition>

    <el-dialog :visible.sync="visibleSyncProject" lock-scroll title="项目名称-选择" width="60%">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="visibleSyncCounterpart" lock-scroll title="单位名称-选择" width="60%">
      <dialog-transit-unit
        @selectionChange="selectionChange"
        filterValid
        v-if="visibleSyncCounterpart"
      ></dialog-transit-unit>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncCounterpart = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="合同-选择" :visible.sync="visibleSyncContract" width="60%" lock-scroll>
      <dialog-sub-contract
        @selectionChange="selectionChange"
        filterValid
        v-if="visibleSyncContract"
        :proId="completionPayForm.proId"
        :oppositeEnterpriseId="completionPayForm.enterpriseId"
      ></dialog-sub-contract>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </el-dialog>

    <!--引入分包阶段结算单-->
    <!-- <el-dialog :visible.sync="subStagePay.visibleSync" lock-scroll title="阶段结算单-选择" >
      <dialog-sub-stage-pay ref="refDialogSubStagePay"
                         :proId="completionPayForm.proId"
                         :enterpriseId = "completionPayForm.enterpriseId"
                         :contractId ="completionPayForm.contractId"
                         :isNull="completionPayForm.contractId ? '':'contractId'"
                         :subStagePayData="completionPayTableData.data"
                         :isShowChecked="true"
                         @selectionChange="selectionChangeSubStagePay"
      >
      </dialog-sub-stage-pay>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubStagePayCancel">取 消</el-button>
        <el-button @click="handleSubStagePayOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>-->

    <!--引入用工单-->
    <el-dialog :visible.sync="subLabour.visibleSync" lock-scroll title="用工单-选择">
      <dialog-sub-labour
        ref="refDialogSubLabour"
        :proId="completionPayForm.proId"
        :enterpriseId="completionPayForm.enterpriseId"
        :contractId="completionPayForm.contractId"
        :isNull="completionPayForm.contractId ? '':'contractId'"
        :subLabourData="completionPayTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubLabour"
      ></dialog-sub-labour>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubLabourCancel">取 消</el-button>
        <el-button @click="handleSubLabourOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!--引入计量单-->
    <el-dialog :visible.sync="subCount.visibleSync" lock-scroll title="计量单-选择">
      <dialog-sub-count
        ref="refDialogSubCount"
        :proId="completionPayForm.proId"
        :enterpriseId="completionPayForm.enterpriseId"
        :contractId="completionPayForm.contractId"
        :isNull="completionPayForm.contractId ? '':'contractId'"
        :subCountData="completionPayTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubCount"
      ></dialog-sub-count>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubCountCancel">取 消</el-button>
        <el-button @click="handleSubCountOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!--引入签证单-->
    <el-dialog :visible.sync="subVisa.visibleSync" lock-scroll title="签证单-选择">
      <dialog-sub-visa
        ref="refDialogSubVisa"
        :proId="completionPayForm.proId"
        :enterpriseId="completionPayForm.enterpriseId"
        :contractId="completionPayForm.contractId"
        :isNull="completionPayForm.contractId ? '':'contractId'"
        :subVisaData="completionPayTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubVisa"
      ></dialog-sub-visa>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubVisaCancel">取 消</el-button>
        <el-button @click="handleSubVisaOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!--引入索赔单-->
    <el-dialog :visible.sync="subClaim.visibleSync" lock-scroll title="索赔单-选择">
      <dialog-sub-claim
        ref="refDialogSubClaim"
        :proId="completionPayForm.proId"
        :enterpriseId="completionPayForm.enterpriseId"
        :contractId="completionPayForm.contractId"
        :isNull="completionPayForm.contractId ? '':'contractId'"
        :subClaimData="completionPayTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubClaim"
      ></dialog-sub-claim>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubClaimCancel">取 消</el-button>
        <el-button @click="handleSubClaimOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!--引入奖励单-->
    <el-dialog :visible.sync="subReward.visibleSync" lock-scroll title="奖励单-选择">
      <dialog-sub-reward
        ref="refDialogSubReward"
        :proId="completionPayForm.proId"
        :enterpriseId="completionPayForm.enterpriseId"
        :contractId="completionPayForm.contractId"
        :isNull="completionPayForm.contractId ? '':'contractId'"
        :subRewardData="completionPayTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubReward"
      ></dialog-sub-reward>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubRewardCancel">取 消</el-button>
        <el-button @click="handleSubRewardOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!--引入扣罚单-->
    <el-dialog :visible.sync="subPunish.visibleSync" lock-scroll title="扣罚单-选择">
      <dialog-sub-punishment
        ref="refDialogSubPunishment"
        :proId="completionPayForm.proId"
        :enterpriseId="completionPayForm.enterpriseId"
        :contractId="completionPayForm.contractId"
        :isNull="completionPayForm.contractId ? '':'contractId'"
        :subPunishmentData="completionPayTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubPunish"
      ></dialog-sub-punishment>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubPunishCancel">取 消</el-button>
        <el-button @click="handleSubPunishOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";
import formatBasic from "@/utils/mixins/formatBasic";
import dialogProject from "@/views/components/dialog/dialogProject";
import dialogTransitUnit from "@/views/components/dialog/dialogTransitUnit";
import dialogSubContract from "@/views/components/dialog/dialogSubContract";

import dialogSubStagePay from "@/views/components/dialog/dialogSubStagePay";
import dialogSubLabour from "@/views/components/dialog/dialogSubLabour";
import dialogSubCount from "@/views/components/dialog/dialogSubCount";
import dialogSubVisa from "@/views/components/dialog/dialogSubVisa";
import dialogSubClaim from "@/views/components/dialog/dialogSubClaim";
import dialogSubReward from "@/views/components/dialog/dialogSubReward";
import dialogSubPunishment from "@/views/components/dialog/dialogSubPunishment";
import { staticDataBasic } from "@/assets/data/basic";
import { todayFormat } from "@/utils";
import { validateLength } from "@/utils/validate";

/**
 * api
 * */

import {
  getCompletionPay,
  saveCompletionPay,
  deleteCompletionPay,
  auditCompletionPay,
  getCompletionPayDetail,
  deleteCompletionPayDetail
} from "@/api/bpmaManager/subpackage/subcontractManagement/completionPay/index.js";

export default {
  name: "gaugeTicketDetail",
  components: {
    dialogProject,
    dialogTransitUnit,
    dialogSubContract,
    dialogSubStagePay,
    dialogSubLabour,
    dialogSubCount,
    dialogSubVisa,
    dialogSubClaim,
    dialogSubReward,
    dialogSubPunishment
  },
  mixins: [computed, methods, formatEnum, formatBasic],
  data() {
    return {
      addBtnShowFlag: true, //待系统菜单配置
      saveBtnShowFlag: true,
      deleteBtnShowFlag: true,
      auditBtnShowFlag: true,

      subStagePayBtnShowFlag: true,
      labourBtnShowFlag: true, //待系统菜单配置
      countBtnShowFlag: true,
      visaBtnShowFlag: true,
      claimBtnShowFlag: true,
      rewardBtnShowFlag: true,
      punishBtnShowFlag: true,
      deleteBtnSubListShowFlag: true,

      activeNames: ["1"],
      saveBtnDisabledFlag: true,
      completionPayForm: {},
      completionPayFormId: undefined,

      rules: {
        name: [
          { required: true, message: "请输入款项名称", trigger: "change" }
        ],
        proName: [
          { required: true, message: "请选择项目名称", trigger: "change" }
        ],
        enterpriseName: [
          { required: true, message: "请选择分包单位", trigger: "change" }
        ]
      },

      /**
       * 弹窗
       * */
      type: null,
      visibleSyncProject: false,
      visibleSyncCounterpart: false,
      visibleSyncContract: false,
      selectedRow: {},

      subStagePay: {
        visibleSync: false,
        subStagePaySelectionChange: []
      },
      subLabour: {
        visibleSync: false,
        subLabourSelectionChange: []
      },
      subCount: {
        visibleSync: false,
        subCountSelectionChange: []
      },
      subVisa: {
        visibleSync: false,
        subVisaSelectionChange: []
      },
      subClaim: {
        visibleSync: false,
        subClaimSelectionChange: []
      },
      subReward: {
        visibleSync: false,
        subRewardSelectionChange: []
      },
      subPunish: {
        visibleSync: false,
        subPunishSelectionChange: []
      },

      /**
       * 子表
       * */
      completionPayTableData: {
        data: [],
        total: 0
      },
      modelSearchFilter: {
        page: 1,
        limit: 10000,
        masterId: undefined
      },
      currentRow: null, //表格当前行
      columns: [
        //表格列
        {
          text: "现场类型",
          value: "billType",
          width: "140",
          align: "center",
          showOverflowTooltip: true
        },
        {
          text: "周材名称",
          value: "billCode",
          width: "130",
          align: "center",
          showOverflowTooltip: true
        },
        {
          text: "规格型号",
          value: "billName",
          minWidth: "200",
          align: "left",
          headerAlign: "center",
          showOverflowTooltip: true
        },
        {
          text: "现场数量",
          value: "unpayPrice",
          width: "150",
          align: "right",
          headerAlign: "center",
          showOverflowTooltip: true
        },
        {
          text: "使用单价",
          value: "shouldPayPrice",
          width: "150",
          align: "right",
          headerAlign: "center",
          className: "spacing-set",
          showOverflowTooltip: true
        },
        {
          text: "离场数量(*)",
          value: "ssss",
          width: "150",
          align: "right",
          headerAlign: "center",
          showOverflowTooltip: true
        },
        {
          text: "备注说明",
          value: "summary",
          width: "200",
          align: "left",
          headerAlign: "center",
          className: "spacing-set",
          showOverflowTooltip: true
        }
      ]
    };
  },
  deactivated() {
    this.$store.dispatch("cacheId", undefined);
  },
  activated() {
    this.$utilsBasic.loadAddAndDetailData(
      this,
      () => {
        if (this.$route.params) {
          this.completionPayFormId = this.$route.params.id
            ? this.$route.params.id
            : undefined;
        }
        if (this.$route.query) {
          this.completionPayForm.proId = this.$route.query.proId
            ? this.$route.query.proId
            : undefined;
          this.completionPayForm.proName = this.$route.query.name
            ? this.$route.query.name
            : undefined;
          this.completionPayForm.proCode = this.$route.query.proCode
            ? this.$route.query.proCode
            : undefined;
        }
        this.handleAddBtn();
      },
      id => {
        this.completionPayFormId = id;
        this.getCompletionPay();
        this.getCompletionPayDetailData();
      }
    );
  },
  created() {
    //初始化数据字典
    this.getEnumData([
      "GetValidateStatusData",
      "GetIsOrNotData",
      "GetSubFinBillTypeEnum"
    ]);
    this.$store.dispatch("cacheId", "0"); //刷新
  },
  computed: {
    deleteBtnDisabledFlag() {
      if (!this.$utils.isEmpty(this.completionPayForm)) {
        return this.completionPayForm.validateStatus === 1;
      } else {
        return true;
      }
    },
    auditBtnDisabledFlag() {
      if (!this.$utils.isEmpty(this.completionPayForm)) {
        return this.completionPayForm.validateStatus === 1;
      } else {
        return true;
      }
    },

    disabledFlag() {
      return this.completionPayForm.validateStatus === 1;
    },
    priceDisabledFlag() {
      return (
        (this.completionPayTableData.data &&
          this.completionPayTableData.data.length > 0) ||
        this.disabledFlag
      );
    },
    deleteSubListBtnDisabledFlag() {
      return !this.currentRow || this.auditBtnDisabledFlag;
    },

    /**
     * 计算未付总额
     * */
    unpayPrice: {
      get() {
        const reducer = (accumulator, currentValue) =>
          accumulator + Number(currentValue);
        //扣罚加总 扣罚单类型billType = 6
        let punishSum = this.completionPayTableData.data
          .filter(item => {
            return item.billType === 6;
          })
          .map(item => item.unpayPrice)
          .reduce(reducer, 0);
        let otherSum = this.completionPayTableData.data
          .filter(item => {
            return item.billType !== 6;
          })
          .map(item => item.unpayPrice)
          .reduce(reducer, 0);
        console.log("结算金额", punishSum, otherSum);
        return otherSum - punishSum;
      },
      set() {}
    },

    /**
     * 计算应付总额
     * */
    shouldPayPriced: {
      get() {
        const reducer = (accumulator, currentValue) =>
          accumulator + Number(currentValue);
        //扣罚加总 扣罚单类型billType = 6
        let punishSum = this.completionPayTableData.data
          .filter(item => {
            return item.billType === 6;
          })
          .map(item => item.shouldPayPrice)
          .reduce(reducer, 0);
        let otherSum = this.completionPayTableData.data
          .filter(item => {
            return item.billType !== 6;
          })
          .map(item => item.shouldPayPrice)
          .reduce(reducer, 0);
        console.log("结算金额", punishSum, otherSum);
        return otherSum - punishSum;
      },
      set() {}
    },

    qualityAssurancePrice: {
      get() {
        if (this.priceDisabledFlag) {
          return (
            this.shouldPayPriced * this.completionPayForm.qualityAssuranceScale
          );
        } else {
          return (
            this.completionPayForm.shouldPayPriced *
            this.completionPayForm.qualityAssuranceScale
          );
        }
      },
      set() {}
    }
  },
  watch: {
    completionPayForm: {
      handler() {
        this.saveBtnDisabledFlag = false;
      },
      deep: true
    }
  },
  methods: {
    handleAddBtn() {
      this.completionPayFormId = undefined;
      // this.completionPayForm.proId = undefined;
      // this.completionPayForm.proName = undefined;
      // this.completionPayForm.proCode = undefined;
      this.addCompletionPay();
      // this.$refs.refCompletionPayForm.resetFields()
    },
    handleSaveBtn() {
      this.validateAfter(() => {
        this.saveCompletionPayData().catch(err => {
          console.log(err);
        });
      });
    },
    handleDeleteBtn() {
      this.$confirm(staticDataBasic.info.delete, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.$utils.isEmpty(this.completionPayFormId)) {
            this.$set(this.completionPayForm, "proId", "");
            this.$set(this.completionPayForm, "proName", "");
            this.$set(this.completionPayForm, " proCode", "");
            this.addCompletionPay();
          } else {
            this.deleteCompletionPayData()
              .then(() => {
                this.$set(this.completionPayForm, "proId", "");
                this.$set(this.completionPayForm, "proName", "");
                this.$set(this.completionPayForm, " proCode", "");
                this.addCompletionPay();
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAuditBtn() {
      this.$confirm(staticDataBasic.info.audit, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.validateAfter(() => {
            this.saveCompletionPayData(true)
              .then(() => {
                this.auditCompletionPayData();
              })
              .catch(error => {
                console.log(error);
              });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleDeleteSubListBtn() {
      this.$confirm(staticDataBasic.info.delete, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteByIdData(
            this.completionPayTableData.data,
            this.currentRow,
            (allData, data) => {
              this.$set(this.completionPayForm, "detailList", allData); //所有数据（删除时，只改变删除数据的状态，点保存后才删除）
              this.completionPayTableData.data = data; //除去需要删除的数据
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * 新增表单内容
     * */
    addCompletionPay() {
      this.completionPayForm = {
        id: "",
        validateStatus: 2,
        name: "完工结算款",
        proId: this.completionPayForm.proId,
        proName: this.completionPayForm.proName,
        proCode: this.completionPayForm.proCode,
        unpayPrice: "0.00",
        shouldPayPriced: "0.00",
        shouldPayDate: new Date(todayFormat()).getTime(),
        qualityAssuranceScale: "1.00",
        qualityAssurancePrice: "0.00",
        qualityAssuranceDate: new Date(todayFormat()).getTime(),
        ifPay: 2
      };
      // this.$refs.refCompletionPayForm.resetFields()
      this.completionPayTableData.data = [];
      console.log("this.completionPayForm", this.completionPayForm);
    },
    changeScale() {
      if (this.completionPayForm.qualityAssuranceScale < 0) {
        this.completionPayForm.qualityAssuranceScale = "0";
        this.$message({
          message: staticDataBasic.info.qualityAssuranceScale,
          type: "warning"
        });
      }
      if (this.completionPayForm.qualityAssuranceScale > 1) {
        this.completionPayForm.qualityAssuranceScale = "1";
        this.$message({
          message: staticDataBasic.info.qualityAssuranceScale,
          type: "warning"
        });
      }
    },
    /**
     * 保存
     * */
    saveCompletionPayData(boolean) {
      console.log("save data", this.completionPayForm);
      if (this.priceDisabledFlag) {
        this.completionPayForm.unpayPrice = this.unpayPrice;
        this.completionPayForm.shouldPayPriced = this.shouldPayPriced;
      }

      this.completionPayForm.qualityAssurancePrice = this.qualityAssurancePrice;
      return saveCompletionPay(this.completionPayForm)
        .then(res => {
          if (res.status && res.status === 200) {
            this.completionPayFormId = res.data.id;
            this.completionPayForm = res.data;
            this.completionPayTableData.data = res.data.detailList;
            //上传文件
            if (!this.$refs.refBasicUpload.submitUpload(res.data.id))
              return false;
            console.log("save completionPay success", res);
            if (!boolean) {
              this.$message.success(res.message);
            }
          } else {
            this.$message({ message: res.message, type: "warning" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     * 保存或者审核之前验证
     */
    validateAfter(callback) {
      let result = true;
      //表单验证
      this.$refs.refCompletionPayForm.validate(valid => {
        valid ? null : (result = valid);
        return !result;
      });

      if (result) {
        //验证
        if (typeof callback === "function") {
          callback();
        }
      } else {
        if (this.$utils.isEmpty(this.completionPayForm.name)) {
          this.$refs.refCompletionPayName.focus();
        }
        this.$message({
          message: staticDataBasic.info.updateEmptyError,
          type: "warning"
        });
        return false;
      }
    },

    /**
     * 删除表单
     * */
    deleteCompletionPayData() {
      return deleteCompletionPay(this.completionPayFormId)
        .then(res => {
          if (res.status && res.status === 200) {
            this.$message.success(res.message);
          } else {
            this.$message({ message: res.message, type: "warning" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    /**
     * 审核
     * */
    auditCompletionPayData() {
      return auditCompletionPay(this.completionPayForm)
        .then(res => {
          console.log("audit res", res);
          if (res.status && res.status === 200) {
            this.$message.success(res.message);
            this.completionPayForm = res.data;
            this.completionPayTableData.data = res.data.detailList;
          } else {
            this.$message({ message: res.message, type: "warning" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    /**
     * 获取表单内容
     * */
    getCompletionPay() {
      if (this.$utils.isEmpty(this.completionPayFormId)) {
        this.addCompletionPay();
      } else {
        return getCompletionPay(this.completionPayFormId)
          .then(res => {
            if (res.status && res.status === 200) {
              console.log("get completionPayForm", res);
              this.completionPayForm = res.data;
            } else {
              this.$message({ message: res.message, type: "warning" });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    changeFormatDate(date) {
      this.completionPayForm.handleDate = new Date(date).getTime();
    },

    changeFormatShouldPayDate(date) {
      this.completionPayForm.shouldPayDate = new Date(date).getTime();
    },
    changeFormatQualityAssuranceDate(date) {
      this.completionPayForm.qualityAssuranceDate = new Date(date).getTime();
    },
    /**
     * 点击显示哪种弹窗 项目  单位  合同
     * */
    toipClick(type) {
      if (this.disabled) return;
      if (type == "counterpart" && !this.completionPayForm.proId)
        return this.$message({ message: "请先选择项目", type: "warning" });
      if (
        type == "contract" &&
        !(this.completionPayForm.proId && this.completionPayForm.enterpriseId)
      )
        return this.$message({
          message: "请先选择项目和分包单位",
          type: "warning"
        });
      this.type = type;
      this[
        "visibleSync" +
          type.replace(/(^[\w\W])/, res => res.toLocaleUpperCase())
      ] = true;
    },
    selectionChange(row) {
      console.log("回传row", row);
      this.selectedRow = row.selectedRow;
    },

    /**
     * 弹窗传回的名称 项目 单位 合同
     * */
    handleChange() {
      const row = this.selectedRow;
      if (!this.isSelectedRow(row)) return false;
      if (Object.keys(row).length === 0) return;
      switch (this.type) {
        case "project":
          if (this.completionPayForm.proId !== row.id) {
            this.completionPayForm = Object.assign({}, this.completionPayForm, {
              proName: row.name,
              proId: row.id,
              proCode: row.code,

              enterpriseId: undefined,
              enterpriseName: undefined,

              contractName: undefined,
              contractId: undefined,
              qualityAssuranceScale: "1.00"
            });
            this.completionPayTableData.data = [];
            this.$set(
              this.completionPayForm,
              "detailList",
              this.completionPayTableData.data
            );
            console.log("proName", this.completionPayForm.proName);
          }
          break;
        case "counterpart":
          if (this.completionPayForm.enterpriseId !== row.id) {
            this.completionPayForm = Object.assign({}, this.completionPayForm, {
              enterpriseId: row.id,
              enterpriseName: row.name,

              contractName: undefined,
              contractId: undefined,
              qualityAssuranceScale: "1.00"
            });
            this.completionPayTableData.data = [];
            this.$set(
              this.completionPayForm,
              "detailList",
              this.completionPayTableData.data
            );
            console.log(
              "enterpriseName",
              this.completionPayForm.enterpriseName
            );
          }

          break;
        case "contract":
          if (this.completionPayForm.contractId !== row.id) {
            this.completionPayForm = Object.assign({}, this.completionPayForm, {
              contractName: row.name,
              contractId: row.id,
              qualityAssuranceScale: row.qualityAssurancePriceScale
            });
            this.completionPayTableData.data = [];
            this.$set(
              this.completionPayForm,
              "detailList",
              this.completionPayTableData.data
            );
            console.log("contractName", this.completionPayForm.contractName);
          }

          break;
      }
      this.saveBtnDisabledFlag = false;
      this[
        "visibleSync" +
          this.type.replace(/(^[\w\W])/, res => res.toLocaleUpperCase())
      ] = false;
    },

    /**
     * 获取子表内容
     * */
    getCompletionPayDetailData() {
      if (this.$utils.isEmpty(this.completionPayFormId)) {
        this.completionPayTableData.data = [];
        this.$set(
          this.completionPayForm,
          "detailList",
          this.completionPayTableData.data
        );
      } else {
        this.modelSearchFilter.masterId = this.completionPayFormId;
        return getCompletionPayDetail(this.modelSearchFilter)
          .then(res => {
            if (res.status && res.status === 200) {
              this.completionPayTableData.data = res.data.rows;
              this.$set(
                this.completionPayForm,
                "detailList",
                this.completionPayTableData.data
              );
              console.log(" getCompletionPayTableData", res);
            } else {
              this.$message({ message: res.message, type: "warning" });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    /**
     * 删除子表
     * */
    deleteCompletionPayDetailData() {
      return deleteCompletionPayDetail(this.currentRow.id)
        .then(res => {
          if (res.status && res.status === 200) {
            this.$message.success(res.message);
          } else {
            this.$message({ message: res.message, type: "warning" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    /**
     * 当前行
     * */
    handleCurrentChange(row) {
      console.log(row);
      this.currentRow = row;
    },

    /**
     * 回传数据加入子表表格
     * */
    selectedDataPushTable(SelectionChangeData, type) {
      if (SelectionChangeData && SelectionChangeData.length > 0) {
        let addNewArr = []; //需新加的数组
        let codesArr = []; //表格原有数组编码集合
        if (
          this.completionPayTableData.data &&
          this.completionPayTableData.data.length > 0
        ) {
          codesArr = this.completionPayTableData.data
            .filter(item => item.billType == type)
            .map(item => item.billCode);
          for (const item of SelectionChangeData) {
            if (codesArr.indexOf(item.code) < 0) {
              //判断返回数据与原有数据是否有重复
              let rowObj = Object.assign(
                {},
                {
                  masterId: this.completionPayFormId,
                  billId: item.id,
                  billType: type,
                  billCode: item.code,
                  billName: item.name,
                  unpayPrice:
                    item.totalPrice - item.payedPrice ||
                    item.payPrice - item.payedPrice ||
                    item.price - item.payedPrice, //未付：单据金额 - 结算金额
                  shouldPayPrice:
                    item.totalPrice - item.payedPrice ||
                    item.payPrice - item.payedPrice ||
                    item.price - item.payedPrice //应付 = 未付
                }
              );
              addNewArr.push(rowObj);
            }
          }
        } else {
          for (const item of SelectionChangeData) {
            let rowObj = Object.assign(
              {},
              {
                masterId: this.completionPayFormId,
                billId: item.id,
                billType: type,
                billCode: item.code,
                billName: item.name,
                unpayPrice:
                  item.totalPrice - item.payedPrice ||
                  item.payPrice - item.payedPrice ||
                  item.price - item.payedPrice ||
                  item.price - item.shouldPayPrice, //未付：单据金额 - 结算金额
                shouldPayPrice:
                  item.totalPrice - item.payedPrice ||
                  item.payPrice - item.payedPrice ||
                  item.price - item.payedPrice ||
                  item.price - item.shouldPayPrice //应付 = 未付
              }
            );
            addNewArr.push(rowObj);
          }
        }
        this.completionPayTableData.data = addNewArr.concat(
          this.completionPayTableData.data
        );
        this.$set(
          this.completionPayForm,
          "detailList",
          this.completionPayTableData.data
        );
      }
    },
    /**
     * 阶段结算单弹框显示和隐藏
     * */
    handleImportSubStagePay() {
      if (this.$utils.isEmpty(this.completionPayForm.enterpriseId)) {
        this.$message({ message: "请先选择单位名称", type: "warning" });
      } else {
        this.subStagePay.visibleSync = true;
        this.$nextTick(() => {
          this.saveBtnDisabledFlag = false;
        });
      }
    },
    handleSubStagePayCancel() {
      this.subStagePay.visibleSync = false;
    },
    selectionChangeSubStagePay(data) {
      console.log("阶段结算单回传 data", data);
      this.subStagePay.subStagePaySelectionChange = data.selectedRows;
    },
    handleSubStagePayOk() {
      this.subStagePay.visibleSync = false;
      //数据加入到列表中
      const subStagePaySelectionChange = this.subStagePay
        .subStagePaySelectionChange;
      this.selectedDataPushTable(subStagePaySelectionChange, 7);
    },

    /**
     * 用工单弹框显示和隐藏
     * */
    handleImportLabour() {
      if (this.$utils.isEmpty(this.completionPayForm.enterpriseId)) {
        this.$message({ message: "请先选择分包单位", type: "warning" });
      } else {
        this.subLabour.visibleSync = true;
        this.$nextTick(() => {
          this.saveBtnDisabledFlag = false;
        });
      }
    },
    handleSubLabourCancel() {
      this.subLabour.visibleSync = false;
    },
    selectionChangeSubLabour(data) {
      console.log("用工单回传 data", data);
      this.subLabour.subLabourSelectionChange = data.selectedRows;
    },
    handleSubLabourOk() {
      this.subLabour.visibleSync = false;
      //数据加入到列表中
      const subLabourSelectionChange = this.subLabour.subLabourSelectionChange;
      this.selectedDataPushTable(subLabourSelectionChange, 1);
    },

    /**
     * 计量单弹框显示和隐藏
     * */
    handleImportCount() {
      if (this.$utils.isEmpty(this.completionPayForm.enterpriseId)) {
        this.$message({ message: "请先选择分包单位", type: "warning" });
      } else {
        this.subCount.visibleSync = true;
        this.$nextTick(() => {
          this.saveBtnDisabledFlag = false;
        });
      }
    },
    handleSubCountCancel() {
      this.subCount.visibleSync = false;
    },
    selectionChangeSubCount(data) {
      console.log("计量单回传 data", data);
      this.subCount.subCountSelectionChange = data.selectedRows;
    },
    handleSubCountOk() {
      this.subCount.visibleSync = false;
      //数据加入到列表中
      const subCountSelectionChange = this.subCount.subCountSelectionChange;
      this.selectedDataPushTable(subCountSelectionChange, 2);
    },

    /**
     * 签证单弹框显示和隐藏
     * */
    handleImportVisa() {
      if (this.$utils.isEmpty(this.completionPayForm.enterpriseId)) {
        this.$message({ message: "请先选择分包单位", type: "warning" });
      } else {
        this.subVisa.visibleSync = true;
        this.$nextTick(() => {
          this.saveBtnDisabledFlag = false;
        });
      }
    },
    handleSubVisaCancel() {
      this.subVisa.visibleSync = false;
    },
    selectionChangeSubVisa(data) {
      console.log("Visa回传 data", data);
      this.subVisa.subVisaSelectionChange = data.selectedRows;
    },
    handleSubVisaOk() {
      this.subVisa.visibleSync = false;
      //数据加入到列表中
      const subVisaSelectionChange = this.subVisa.subVisaSelectionChange;
      this.selectedDataPushTable(subVisaSelectionChange, 3);
    },

    /**
     * 索赔单弹框显示和隐藏
     * */
    handleImportClaim() {
      if (this.$utils.isEmpty(this.completionPayForm.enterpriseId)) {
        this.$message({ message: "请先选择分包单位", type: "warning" });
      } else {
        this.subClaim.visibleSync = true;
        this.$nextTick(() => {
          this.saveBtnDisabledFlag = false;
        });
      }
    },
    handleSubClaimCancel() {
      this.subClaim.visibleSync = false;
    },
    selectionChangeSubClaim(data) {
      console.log("索赔单回传 data", data);
      this.subClaim.subClaimSelectionChange = data.selectedRows;
    },
    handleSubClaimOk() {
      this.subClaim.visibleSync = false;
      //数据加入到列表中
      const subClaimSelectionChange = this.subClaim.subClaimSelectionChange;
      this.selectedDataPushTable(subClaimSelectionChange, 4);
    },

    /**
     *奖励单弹框显示和隐藏
     * */
    handleImportReward() {
      if (this.$utils.isEmpty(this.completionPayForm.enterpriseId)) {
        this.$message({ message: "请先选择分包单位", type: "warning" });
      } else {
        this.subReward.visibleSync = true;
        this.$nextTick(() => {
          this.saveBtnDisabledFlag = false;
        });
      }
    },
    handleSubRewardCancel() {
      this.subReward.visibleSync = false;
    },
    selectionChangeSubReward(data) {
      console.log("奖励单回传 data", data);
      this.subReward.subRewardSelectionChange = data.selectedRows;
    },
    handleSubRewardOk() {
      this.subReward.visibleSync = false;
      //数据加入到列表中
      const subRewardSelectionChange = this.subReward.subRewardSelectionChange;
      this.selectedDataPushTable(subRewardSelectionChange, 5);
    },

    /**
     * 扣罚单弹框显示和隐藏
     * */
    handleImportPunish() {
      if (this.$utils.isEmpty(this.completionPayForm.enterpriseId)) {
        this.$message({ message: "请先选择分包单位", type: "warning" });
      } else {
        this.subPunish.visibleSync = true;
        this.$nextTick(() => {
          this.saveBtnDisabledFlag = false;
        });
      }
    },
    handleSubPunishCancel() {
      this.subPunish.visibleSync = false;
    },
    selectionChangeSubPunish(data) {
      console.log("扣罚单回传 data", data);
      this.subPunish.subPunishSelectionChange = data.selectedRows;
    },
    handleSubPunishOk() {
      this.subPunish.visibleSync = false;
      //数据加入到列表中
      const subPunishSelectionChange = this.subPunish.subPunishSelectionChange;
      this.selectedDataPushTable(subPunishSelectionChange, 6);
    }
  }
};
</script>

<style scoped>
</style>
