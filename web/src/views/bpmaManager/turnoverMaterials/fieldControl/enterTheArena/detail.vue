<template>
  <div class="enterTheArenaDetail-container">
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
          ref="refenterTheArenaForm"
          class="form-container"
          :model="enterTheArenaForm"
          label-width="120px"
          :rules="rules"
          :show-message="false"
        >
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="enterTheArenaForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input
                  size="small"
                  clearable
                  v-model="enterTheArenaForm.code"
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
                  v-model="enterTheArenaForm.name"
                  :disabled="disabledFlag"
                  ref="refenterTheArenaName"
                  placeholder="请输入单据名称"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input
                  size="small"
                  v-model="enterTheArenaForm.proName"
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
                  v-model="enterTheArenaForm.enterpriseName"
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
                  v-model="enterTheArenaForm.contractName"
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
              <el-form-item label="收货人员" prop="handlePerson" hide-required-asterisk>
                <el-input
                  size="small"
                  clearable
                  v-model="enterTheArenaForm.handlePerson"
                  :disabled="disabledFlag"
                  ref="refenterTheArenaName"
                  placeholder="请输入经办人员"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="离场日期">
                <el-date-picker
                  size="small"
                  :editable="false"
                  :clearable="false"
                  v-model="enterTheArenaForm.shouldPayDate"
                  type="date"
                  :disabled="disabledFlag"
                  @change="changeFormatShouldPayDate"
                  placeholder="选择离场日期"
                  class="date-picker"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="备注说明">
                <el-input
                  size="small"
                  clearable
                  :disabled="disabledFlag"
                  :autosize="{ minRows:2, maxRows: 5}"
                  :max="5000"
                  v-model="enterTheArenaForm.remark"
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
                  :formId="enterTheArenaFormId"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="16">
              <el-form-item label="登记人员" prop="inputPersonId" hide-required-asterisk>
                <el-input
                  size="small"
                  clearable
                  v-model="enterTheArenaForm.inputPersonId"
                  :disabled="true"
                  ref="refenterTheArenaName"
                  placeholder="系统自动生成登记人员"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-date-picker
                  size="small"
                  :editable="false"
                  :clearable="false"
                  v-model="enterTheArenaForm.inputTime"
                  type="date"
                  :disabled="true"
                  @change="changeFormatShouldPayDate"
                  placeholder="系统自动生成登记时间"
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
          >引入周材</el-button>
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
          ref="refenterTheArenaTableData"
          :isPagination="false"
          :dataTable="enterTheArenaTableData"
          :columns="columns"
          :pagination="modelSearchFilter"
          @current-change="handleCurrentChange"
          @pagination="getenterTheArenaDetailData"
        >
          <template slot-scope="obj" slot="billType">{{formatSubFinBillType(obj.scope.row)}}</template>

          <!-- <template slot-scope="obj" slot="unitPrice">{{formatToThousands(obj.scope.row.unitPrice)}}</template> -->
          <!-- <template
            slot-scope="obj"
            slot="unpayPrice"
          >{{formatToThousands(obj.scope.row.unpayPrice)}}</template>-->
          <template slot-scope="obj" slot="sum">
            <basic-input
              :formatValue="formatToMoney"
              :format="formatToThousands"
              clearable
              v-model="obj.scope.row.sum"
              :disabled="disabledFlag"
              placeholder="请输入进场数量"
              @change="sumChange(obj.scope.row)"
              :min="0.0000"
            ></basic-input>
          </template>
          <template slot-scope="obj" slot="unitPrice">
            <basic-input
              :formatValue="formatToMoney"
              :format="formatToThousands"
              clearable
              v-model="obj.scope.row.unitPrice"
              :disabled="disabledFlag"
              placeholder="请输入使用单价"
              @change="sumChange(obj.scope.row)"
              :min="0.0000"
            ></basic-input>
          </template>
          <template slot-scope="obj" slot="position">
            <basic-input
              :formatValue="formatToMoney"
              :format="formatToThousands"
              clearable
              v-model="obj.scope.row.position"
              :disabled="disabledFlag"
              placeholder="请输入使用部位"
            ></basic-input>
          </template>
          <template slot-scope="obj" slot="remark">
            <el-input
              clearable
              size="small"
              placeholder="备注"
              v-model="obj.scope.row.remark"
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
        :proId="enterTheArenaForm.proId"
        :oppositeEnterpriseId="enterTheArenaForm.enterpriseId"
      ></dialog-sub-contract>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog :visible.sync="subStagePay.visibleSync" lock-scroll title="引入周材-选择">
      <dialog-sub-stage-pay
        ref="refDialogSubStagePay"
        :proId="enterTheArenaForm.proId"
        :enterpriseId="enterTheArenaForm.enterpriseId"
        :contractId="enterTheArenaForm.contractId"
        :isNull="enterTheArenaForm.contractId ? '':'contractId'"
        :subStagePayData="enterTheArenaTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubStagePay"
      ></dialog-sub-stage-pay>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubStagePayCancel">取 消</el-button>
        <el-button @click="handleSubStagePayOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>-->
    <basic-dialog v-el-drag-dialog :visible.sync="subStagePay.visibleSync" title="引入周材-选择">
      <dialog-material-dictionary
        ref="refDialogSubStagePay"
        :proId="enterTheArenaForm.proId"
        :enterpriseId="enterTheArenaForm.enterpriseId"
        :contractId="enterTheArenaForm.contractId"
        :isNull="enterTheArenaForm.contractId ? '':'contractId'"
        :subStagePayData="enterTheArenaTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubStagePay"
      ></dialog-material-dictionary>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubStagePayCancel">取 消</el-button>
        <el-button @click="handleSubStagePayOk" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <!--引入用工单-->
    <el-dialog :visible.sync="subLabour.visibleSync" lock-scroll title="用工单-选择">
      <dialog-sub-labour
        ref="refDialogSubLabour"
        :proId="enterTheArenaForm.proId"
        :enterpriseId="enterTheArenaForm.enterpriseId"
        :contractId="enterTheArenaForm.contractId"
        :isNull="enterTheArenaForm.contractId ? '':'contractId'"
        :subLabourData="enterTheArenaTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubLabour"
      ></dialog-sub-labour>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubLabourCancel">取 消</el-button>
        <el-button @click="handleSubLabourOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!--引入计量单-->
    <!-- <el-dialog :visible.sync="subCount.visibleSync" lock-scroll title="计量单-选择">
      <dialog-sub-count
        ref="refDialogSubCount"
        :proId="enterTheArenaForm.proId"
        :enterpriseId="enterTheArenaForm.enterpriseId"
        :contractId="enterTheArenaForm.contractId"
        :isNull="enterTheArenaForm.contractId ? '':'contractId'"
        :subCountData="enterTheArenaTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubCount"
      ></dialog-sub-count>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubCountCancel">取 消</el-button>
        <el-button @click="handleSubCountOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>-->
    <!--引入签证单-->
    <!-- <el-dialog :visible.sync="subVisa.visibleSync" lock-scroll title="签证单-选择">
      <dialog-sub-visa
        ref="refDialogSubVisa"
        :proId="enterTheArenaForm.proId"
        :enterpriseId="enterTheArenaForm.enterpriseId"
        :contractId="enterTheArenaForm.contractId"
        :isNull="enterTheArenaForm.contractId ? '':'contractId'"
        :subVisaData="enterTheArenaTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubVisa"
      ></dialog-sub-visa>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubVisaCancel">取 消</el-button>
        <el-button @click="handleSubVisaOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>-->
    <!--引入索赔单-->
    <!-- <el-dialog :visible.sync="subClaim.visibleSync" lock-scroll title="索赔单-选择">
      <dialog-sub-claim
        ref="refDialogSubClaim"
        :proId="enterTheArenaForm.proId"
        :enterpriseId="enterTheArenaForm.enterpriseId"
        :contractId="enterTheArenaForm.contractId"
        :isNull="enterTheArenaForm.contractId ? '':'contractId'"
        :subClaimData="enterTheArenaTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubClaim"
      ></dialog-sub-claim>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubClaimCancel">取 消</el-button>
        <el-button @click="handleSubClaimOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>-->
    <!--引入奖励单-->
    <!-- <el-dialog :visible.sync="subReward.visibleSync" lock-scroll title="奖励单-选择">
      <dialog-sub-reward
        ref="refDialogSubReward"
        :proId="enterTheArenaForm.proId"
        :enterpriseId="enterTheArenaForm.enterpriseId"
        :contractId="enterTheArenaForm.contractId"
        :isNull="enterTheArenaForm.contractId ? '':'contractId'"
        :subRewardData="enterTheArenaTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubReward"
      ></dialog-sub-reward>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubRewardCancel">取 消</el-button>
        <el-button @click="handleSubRewardOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>-->
    <!--引入扣罚单-->
    <!-- <el-dialog :visible.sync="subPunish.visibleSync" lock-scroll title="扣罚单-选择">
      <dialog-sub-punishment
        ref="refDialogSubPunishment"
        :proId="enterTheArenaForm.proId"
        :enterpriseId="enterTheArenaForm.enterpriseId"
        :contractId="enterTheArenaForm.contractId"
        :isNull="enterTheArenaForm.contractId ? '':'contractId'"
        :subPunishmentData="enterTheArenaTableData.data"
        :isShowChecked="true"
        @selectionChange="selectionChangeSubPunish"
      ></dialog-sub-punishment>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubPunishCancel">取 消</el-button>
        <el-button @click="handleSubPunishOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>-->
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
import dialogMaterialDictionary from "@/views/components/dialog/dialogMaterialDictionary";

import { staticDataBasic } from "@/assets/data/basic";
import { todayFormat } from "@/utils";
import { validateLength } from "@/utils/validate";

/**
 * api
 * dialog-material-dictionary
 * */

import {
  updateEnterTheArena,
  saveEnterTheArena
} from "@/api/bpmaManager/turnoverMaterials/fieldControl/enterTheArena/index.js";

export default {
  name: "enterTheArenaDetail",
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
    dialogSubPunishment,
    dialogMaterialDictionary
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
      enterTheArenaForm: {},
      enterTheArenaFormId: undefined,

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
      enterTheArenaTableData: {
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
          text: "周材编码",
          value: "reuseMaterialCode",
          width: "140",
          align: "center",
          showOverflowTooltip: true
        },
        {
          text: "周材名称",
          value: "reuseMaterialName",
          width: "130",
          align: "center",
          showOverflowTooltip: true
        },
        {
          text: "规格型号",
          value: "model",
          minWidth: "200",
          align: "left",
          headerAlign: "center",
          showOverflowTooltip: true
        },
        {
          text: "计量单位",
          value: "unit",
          width: "150",
          align: "center",
          headerAlign: "center",
          className: "spacing-set",
          showOverflowTooltip: true
        },
        {
          text: "进场数量(*)",
          value: "sum",
          width: "150",
          align: "center",
          headerAlign: "center",
          className: "spacing-set",
          showOverflowTooltip: true
        },
        {
          text: "使用单价",
          value: "unitPrice",
          width: "150",
          align: "center",
          headerAlign: "center",
          className: "spacing-set",
          showOverflowTooltip: true
        },
        {
          text: "使用部位",
          value: "position",
          width: "150",
          align: "left",
          headerAlign: "center",
          className: "spacing-set",
          showOverflowTooltip: true
        },
        {
          text: "备注",
          value: "remark",
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
          this.enterTheArenaFormId = this.$route.params.id
            ? this.$route.params.id
            : undefined;
        }
        if (this.$route.query) {
          this.enterTheArenaForm.proId = this.$route.query.proId
            ? this.$route.query.proId
            : undefined;
          this.enterTheArenaForm.proName = this.$route.query.name
            ? this.$route.query.name
            : undefined;
          this.enterTheArenaForm.proCode = this.$route.query.proCode
            ? this.$route.query.proCode
            : undefined;
        }
        this.handleAddBtn();
      },
      id => {
        this.enterTheArenaFormId = id;
        this.getenterTheArena();
        this.getenterTheArenaDetailData();
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
      if (!this.$utils.isEmpty(this.enterTheArenaForm)) {
        return this.enterTheArenaForm.validateStatus === 1;
      } else {
        return true;
      }
    },
    auditBtnDisabledFlag() {
      if (!this.$utils.isEmpty(this.enterTheArenaForm)) {
        return this.enterTheArenaForm.validateStatus === 1;
      } else {
        return true;
      }
    },

    disabledFlag() {
      return this.enterTheArenaForm.validateStatus === 1;
    },
    priceDisabledFlag() {
      return (
        (this.enterTheArenaTableData.data &&
          this.enterTheArenaTableData.data.length > 0) ||
        this.disabledFlag
      );
    },
    deleteSubListBtnDisabledFlag() {
      return !this.currentRow || this.auditBtnDisabledFlag;
    },

    sumChange(data) {
      if (data.ifChangePrice == 2) {
        data.useUnitPrice = data.buyUnitPrice;
      }
      data.useSum = data.buySum;
      data.buyTotalPrice = this.$utilsBasic.toMoney(
        data.buySum * data.buyUnitPrice,
        2
      );
      data.useTotalPrice = this.$utilsBasic.toMoney(
        data.useSum * data.useUnitPrice,
        2
      );
      this.computeSummary();
    },
    /**
     * 计算未付总额
     * */
    unpayPrice: {
      get() {
        const reducer = (accumulator, currentValue) =>
          accumulator + Number(currentValue);
        //扣罚加总 扣罚单类型billType = 6
        let punishSum = this.enterTheArenaTableData.data
          .filter(item => {
            return item.billType === 6;
          })
          .map(item => item.unpayPrice)
          .reduce(reducer, 0);
        let otherSum = this.enterTheArenaTableData.data
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
        let punishSum = this.enterTheArenaTableData.data
          .filter(item => {
            return item.billType === 6;
          })
          .map(item => item.shouldPayPrice)
          .reduce(reducer, 0);
        let otherSum = this.enterTheArenaTableData.data
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
            this.shouldPayPriced * this.enterTheArenaForm.qualityAssuranceScale
          );
        } else {
          return (
            this.enterTheArenaForm.shouldPayPriced *
            this.enterTheArenaForm.qualityAssuranceScale
          );
        }
      },
      set() {}
    }
  },
  watch: {
    enterTheArenaForm: {
      handler() {
        this.saveBtnDisabledFlag = false;
      },
      deep: true
    }
  },
  methods: {
    handleAddBtn() {
      this.enterTheArenaFormId = undefined;
      // this.enterTheArenaForm.proId = undefined;
      // this.enterTheArenaForm.proName = undefined;
      // this.enterTheArenaForm.proCode = undefined;
      this.addenterTheArena();
      // this.$refs.refenterTheArenaForm.resetFields()
    },
    handleSaveBtn() {
      this.validateAfter(() => {
        this.saveEnterTheArenaData().catch(err => {
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
          if (this.$utils.isEmpty(this.enterTheArenaFormId)) {
            this.$set(this.enterTheArenaForm, "proId", "");
            this.$set(this.enterTheArenaForm, "proName", "");
            this.$set(this.enterTheArenaForm, " proCode", "");
            this.addenterTheArena();
          } else {
            this.deleteenterTheArenaData()
              .then(() => {
                this.$set(this.enterTheArenaForm, "proId", "");
                this.$set(this.enterTheArenaForm, "proName", "");
                this.$set(this.enterTheArenaForm, " proCode", "");
                this.addenterTheArena();
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
            this.saveEnterTheArenaData(true)
              .then(() => {
                this.auditenterTheArenaData();
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
            this.enterTheArenaTableData.data,
            this.currentRow,
            (allData, data) => {
              this.$set(this.enterTheArenaForm, "detailList", allData); //所有数据（删除时，只改变删除数据的状态，点保存后才删除）
              this.enterTheArenaTableData.data = data; //除去需要删除的数据
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
    addenterTheArena() {
      this.enterTheArenaForm = {
        code: "",
        contractName: "",
        enterpriseCode: "",
        enterpriseName: "",
        handleDate: "",
        handlePerson: "",
        inputPerson: "",
        inputTime: "",
        name: "周材进场管理",
        proCode: "",
        proName: "",
        remark: "",
        validateStatus: 2,
        detailList: [
          {
            inputPerson: "",
            inputTime: "",
            model: "",
            position: "",
            remark: "",
            reuseMaterialCode: "",
            reuseMaterialName: "",
            sum: "",
            unit: "",
            unitPrice: ""
          }
        ]
      };
      // this.$refs.refenterTheArenaForm.resetFields()
      this.enterTheArenaTableData.data = [];
      console.log("this.enterTheArenaForm", this.enterTheArenaForm);
    },
    changeScale() {
      if (this.enterTheArenaForm.qualityAssuranceScale < 0) {
        this.enterTheArenaForm.qualityAssuranceScale = "0";
        this.$message({
          message: staticDataBasic.info.qualityAssuranceScale,
          type: "warning"
        });
      }
      if (this.enterTheArenaForm.qualityAssuranceScale > 1) {
        this.enterTheArenaForm.qualityAssuranceScale = "1";
        this.$message({
          message: staticDataBasic.info.qualityAssuranceScale,
          type: "warning"
        });
      }
    },
    /**
     * saveSubcontractApplication
     * 保存
     * */
    saveEnterTheArenaData(boolean) {
      console.log("save data", this.enterTheArenaForm);
      if (this.priceDisabledFlag) {
        this.enterTheArenaForm.unpayPrice = this.unpayPrice;
        this.enterTheArenaForm.shouldPayPriced = this.shouldPayPriced;
      }

      this.enterTheArenaForm.qualityAssurancePrice = this.qualityAssurancePrice;
      return saveEnterTheArena(this.enterTheArenaForm)
        .then(res => {
          if (res.status && res.status === 200) {
            this.enterTheArenaFormId = res.data.id;
            this.enterTheArenaForm = res.data;
            this.enterTheArenaTableData.data = res.data.detailList;
            //上传文件
            if (!this.$refs.refBasicUpload.submitUpload(res.data.id))
              return false;
            console.log("save enterTheArena success", res);
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
      this.$refs.refenterTheArenaForm.validate(valid => {
        valid ? null : (result = valid);
        return !result;
      });

      if (result) {
        //验证
        if (typeof callback === "function") {
          callback();
        }
      } else {
        if (this.$utils.isEmpty(this.enterTheArenaForm.name)) {
          this.$refs.refenterTheArenaName.focus();
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
    deleteenterTheArenaData() {
      return deleteenterTheArena(this.enterTheArenaFormId)
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
    auditenterTheArenaData() {
      return auditenterTheArena(this.enterTheArenaForm)
        .then(res => {
          console.log("audit res", res);
          if (res.status && res.status === 200) {
            this.$message.success(res.message);
            this.enterTheArenaForm = res.data;
            this.enterTheArenaTableData.data = res.data.detailList;
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
    getenterTheArena() {
      if (this.$utils.isEmpty(this.enterTheArenaFormId)) {
        this.addenterTheArena();
      } else {
        return updateEnterTheArena(this.enterTheArenaFormId)
          .then(res => {
            if (res.status && res.status === 200) {
              console.log("get enterTheArenaForm", res);
              this.enterTheArenaForm = res.data;
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
      this.enterTheArenaForm.handleDate = new Date(date).getTime();
    },

    changeFormatShouldPayDate(date) {
      this.enterTheArenaForm.shouldPayDate = new Date(date).getTime();
    },
    changeFormatQualityAssuranceDate(date) {
      this.enterTheArenaForm.qualityAssuranceDate = new Date(date).getTime();
    },
    /**
     * 点击显示哪种弹窗 项目  单位  合同
     * */
    toipClick(type) {
      if (this.disabled) return;
      if (type == "counterpart" && !this.enterTheArenaForm.proId)
        return this.$message({ message: "请先选择项目", type: "warning" });
      if (
        type == "contract" &&
        !(this.enterTheArenaForm.proId && this.enterTheArenaForm.enterpriseId)
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
          if (this.enterTheArenaForm.proId !== row.id) {
            this.enterTheArenaForm = Object.assign({}, this.enterTheArenaForm, {
              proName: row.name,
              proId: row.id,
              proCode: row.code,

              enterpriseId: undefined,
              enterpriseName: undefined,

              contractName: undefined,
              contractId: undefined,
              qualityAssuranceScale: "1.00"
            });
            this.enterTheArenaTableData.data = [];
            this.$set(
              this.enterTheArenaForm,
              "detailList",
              this.enterTheArenaTableData.data
            );
            console.log("proName", this.enterTheArenaForm.proName);
          }
          break;
        case "counterpart":
          if (this.enterTheArenaForm.enterpriseId !== row.id) {
            this.enterTheArenaForm = Object.assign({}, this.enterTheArenaForm, {
              enterpriseId: row.id,
              enterpriseName: row.name,

              contractName: undefined,
              contractId: undefined,
              qualityAssuranceScale: "1.00"
            });
            this.enterTheArenaTableData.data = [];
            this.$set(
              this.enterTheArenaForm,
              "detailList",
              this.enterTheArenaTableData.data
            );
            console.log(
              "enterpriseName",
              this.enterTheArenaForm.enterpriseName
            );
          }

          break;
        case "contract":
          if (this.enterTheArenaForm.contractId !== row.id) {
            this.enterTheArenaForm = Object.assign({}, this.enterTheArenaForm, {
              contractName: row.name,
              contractId: row.id,
              qualityAssuranceScale: row.qualityAssurancePriceScale
            });
            this.enterTheArenaTableData.data = [];
            this.$set(
              this.enterTheArenaForm,
              "detailList",
              this.enterTheArenaTableData.data
            );
            console.log("contractName", this.enterTheArenaForm.contractName);
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
    getenterTheArenaDetailData() {
      if (this.$utils.isEmpty(this.enterTheArenaFormId)) {
        this.enterTheArenaTableData.data = [];
        this.$set(
          this.enterTheArenaForm,
          "detailList",
          this.enterTheArenaTableData.data
        );
      } else {
        this.modelSearchFilter.masterId = this.enterTheArenaFormId;
        return updateEnterTheArena(this.modelSearchFilter)
          .then(res => {
            console.log(res);
            if (res.status && res.status === 200) {
              this.enterTheArenaTableData.data = res.data.rows;
              this.$set(
                this.enterTheArenaForm,
                "detailList",
                this.enterTheArenaTableData.data
              );
              console.log(" getenterTheArenaTableData", res);
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
    deleteenterTheArenaDetailData() {
      return deleteenterTheArenaDetail(this.currentRow.id)
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
      console.log(SelectionChangeData);
      if (SelectionChangeData && SelectionChangeData.length > 0) {
        let addNewArr = []; //需新加的数组
        let codesArr = []; //表格原有数组编码集合
        if (
          this.enterTheArenaTableData.data &&
          this.enterTheArenaTableData.data.length > 0
        ) {
          codesArr = this.enterTheArenaTableData.data
            .filter(item => item.billType == type)
            .map(item => item.billCode);
          for (const item of SelectionChangeData) {
            if (codesArr.indexOf(item.code) < 0) {
              //判断返回数据与原有数据是否有重复
              let rowObj = Object.assign(
                {},
                {
                  reuseMaterialName: item.name,
                  reuseMaterialCode: item.code,
                  model: item.model,
                  unit: item.unit
                }
              );
              addNewArr.push(rowObj);
              console.log(addNewArr);
            }
          }
        } else {
          for (const item of SelectionChangeData) {
            console.log(item);
            let rowObj = Object.assign(
              {},
              {
                reuseMaterialName: item.name,
                reuseMaterialCode: item.code,
                model: item.model,
                unit: item.unit
              }
            );
            addNewArr.push(rowObj);
          }
        }
        this.enterTheArenaTableData.data = addNewArr.concat(
          this.enterTheArenaTableData.data
        );
        this.$set(
          this.enterTheArenaForm,
          "detailList",
          this.enterTheArenaTableData.data
        );
      }
    },
    /**
     * 阶段结算单弹框显示和隐藏
     * */
    handleImportSubStagePay() {
      console.log(11111);
      if (this.$utils.isEmpty(this.enterTheArenaForm.enterpriseId)) {
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
      if (this.$utils.isEmpty(this.enterTheArenaForm.enterpriseId)) {
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
      if (this.$utils.isEmpty(this.enterTheArenaForm.enterpriseId)) {
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
      if (this.$utils.isEmpty(this.enterTheArenaForm.enterpriseId)) {
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
      if (this.$utils.isEmpty(this.enterTheArenaForm.enterpriseId)) {
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
      if (this.$utils.isEmpty(this.enterTheArenaForm.enterpriseId)) {
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
      if (this.$utils.isEmpty(this.enterTheArenaForm.enterpriseId)) {
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
