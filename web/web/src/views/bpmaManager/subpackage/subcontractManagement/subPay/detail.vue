<template>
  <div class="subPayDetail-container">
    <basic-handler>
      <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"

                 @click="handleAddBtn" plain>新增
      </el-button>
      <el-button v-if="saveBtnShowFlag" type="primary" icon="el-icon-if-save" size="small" plain

                 @click="handleSaveBtn" :disabled="saveBtnDisabledFlag || auditBtnDisabledFlag">保存
      </el-button>

      <el-button v-if="deleteBtnShowFlag" type="danger" icon="el-icon-delete" size="small" plain
                 @click="handleDeleteBtn" :disabled="deleteBtnDisabledFlag">删除
      </el-button>
      <el-button v-if="auditBtnShowFlag" type="primary" icon="el-icon-if-auth" size="small" plain
                 @click="handleAuditBtn" :disabled="auditBtnDisabledFlag">审核
      </el-button>
    </basic-handler>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form ref="refSubPayForm" class="form-container" :model="subPayForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="subPayForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="subPayForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="款项名称" prop="name" hide-required-asterisk>
                <el-input size="small" clearable v-model="subPayForm.name"
                          :disabled="disabledFlag"
                          ref="refSubPayName"
                          placeholder="请输入款项名称"/>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="subPayForm.proName"
                          readOnly
                          placeholder="请选择项目名称" :disabled="disabledFlag">
                  <el-button
                    size="small"
                    slot="append"
                    icon="el-icon-plus"
                    class="form-btn"
                    :disabled="disabledFlag" @click="toipClick('project')"></el-button>
                </el-input>

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分包单位" prop="enterpriseName" hide-required-asterisk>
                <el-input size="small" v-model="subPayForm.enterpriseName"
                          readOnly
                          placeholder="请选择分包单位" :disabled="disabledFlag">
                  <el-button
                    size="small"
                    slot="append"
                    icon="el-icon-plus"
                    class="form-btn"
                    :disabled="disabledFlag" @click="toipClick('counterpart')"></el-button>
                </el-input>

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同名称" prop="contractName" hide-required-asterisk>
                <el-input size="small"  v-model="subPayForm.contractName"
                          readOnly
                          placeholder="请选择合同名称" :disabled="disabledFlag">
                  <el-button size="small"
                             slot="append"
                             icon="el-icon-plus"
                             class="form-btn"
                             :disabled="disabledFlag" @click="toipClick('contract')"></el-button>
                </el-input>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="本次结算总额">
                <basic-input v-if="priceDisabledFlag == false" :formatValue="formatToMoney" :format="formatToThousands"
                             allowNegative
                             clearable
                             v-model="subPayForm.price"
                             placeholder="请输入本次结算总额"
                             :disabled="priceDisabledFlag"
                ></basic-input>
                <basic-input v-else :formatValue="formatToMoney" :format="formatToThousands"
                             allowNegative
                             clearable
                             v-model="price"
                             placeholder="请输入本次结算总额"
                             :disabled="priceDisabledFlag"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应付进度款比例">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="subPayForm.shouldPayScale"
                             placeholder="请输入应付进度款比例"
                             :disabled="disabledFlag"
                             :min="0"
                             :max="1"
                             @change="changeScale"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应付进度款金额">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             allowNegative
                             clearable
                             v-model="shouldPayPrice"
                             placeholder="请输入应付进度款金额"
                             :disabled="true"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="经办人员">
                <el-input size="small" clearable
                          v-model="subPayForm.handlePerson" :disabled="disabledFlag" placeholder="请输入经办人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属年月">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="subPayForm.handleDate"
                                type="month"
                                :disabled="disabledFlag"
                                @change="changeFormatDate"
                                placeholder="选择所属年月" class="date-picker">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应付日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="subPayForm.shouldPayDate"
                                type="date"
                                :disabled="disabledFlag"
                                @change="changeFormatShouldPayDate"
                                placeholder="选择应付日期" class="date-picker">
                </el-date-picker>
              </el-form-item>
            </el-col>

          </el-row>
          <!--<el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="是否结算" prop="ifPay" class="add-border" >

                <el-radio-group v-model="subPayForm.ifPay">
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
                             v-model="subPayForm.payedPrice"
                             placeholder="系统自动生成结算金额"
                             :disabled="true"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算单号">
                <el-input size="small" clearable v-model="subPayForm.payedCode" :disabled="true" placeholder="系统自动生成结算单号"/>
              </el-form-item>
            </el-col>&ndash;&gt;
          </el-row>-->
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="补充说明">
                <el-input size="small" clearable
                          :disabled="disabledFlag"
                          :autosize="{ minRows:6, maxRows: 8}"
                          :max="5000"
                          v-model="subPayForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
               <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="subPayFormId">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <transition name="slide-fade">
      <div class="content-container">
    <basic-handler class="margin-top10">
      <el-button v-if="labourBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                 :disabled="disabledFlag"
                 @click="handleImportLabour" >引入用工单
      </el-button>
      <el-button v-if="countBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                 :disabled="disabledFlag"
                 @click="handleImportCount" >引入计量单
      </el-button>
      <el-button v-if="visaBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                 :disabled="disabledFlag"
                 @click="handleImportVisa" >引入签证单
      </el-button>
      <el-button v-if="claimBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                 :disabled="disabledFlag"
                 @click="handleImportClaim" >引入索赔单
      </el-button>
      <el-button v-if="rewardBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                 :disabled="disabledFlag"
                 @click="handleImportReward" >引入奖励单
      </el-button>
      <el-button v-if="punishBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                 :disabled="disabledFlag"
                 @click="handleImportPunish" >引入扣罚单
      </el-button>
      <el-button v-if="deleteBtnSubListShowFlag" type="danger" icon="el-icon-delete" size="small" plain
                 @click="handleDeleteSubListBtn" :disabled="deleteSubListBtnDisabledFlag">删除
      </el-button>
    </basic-handler>
    <basic-table ref="refSubPayTableData"
                 :isPagination ="false"
                 :dataTable="subPayTableData"
                 :columns="columns"
                 :pagination="modelSearchFilter"
                 @current-change="handleCurrentChange"
                 @pagination="getSubPayDetailData"
    >
      <template slot-scope="obj" slot="billType">
        {{formatSubFinBillType(obj.scope.row)}}
      </template>

      <template slot-scope="obj" slot="billPrice">
        {{formatToThousands(obj.scope.row.billPrice)}}
      </template>
      <template slot-scope="obj" slot="payPrice">
        <!--{{formatToThousands(obj.scope.row.payPrice)}}-->
        <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                     clearable
                     v-model="obj.scope.row.payPrice"
                     placeholder="请输入结算金额"
                     :disabled="disabledFlag"
                     :min="0"
        ></basic-input>
      </template>
      <template slot-scope="obj" slot="summary">
        <el-input clearable size="small"   placeholder="请输入结算说明"
                  v-model="obj.scope.row.summary"
                  :disabled="disabledFlag"></el-input>
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
    <el-dialog :visible.sync="visibleSyncCounterpart" lock-scroll title="分包单位-选择" width="60%">
      <dialog-transit-unit @selectionChange="selectionChange" filterValid
                           v-if="visibleSyncCounterpart"></dialog-transit-unit>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncCounterpart = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="合同-选择" :visible.sync="visibleSyncContract" width="60%" lock-scroll>
      <dialog-sub-contract @selectionChange="selectionChange" filterValid v-if="visibleSyncContract"
                           :proId="subPayForm.proId"
                           :oppositeEnterpriseId = "subPayForm.enterpriseId"
      ></dialog-sub-contract>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </el-dialog>

    <!--引入用工单-->
    <el-dialog :visible.sync="subLabour.visibleSync" lock-scroll title="用工单-选择" >
      <dialog-sub-labour ref="refDialogSubLabour"
                         :proId="subPayForm.proId"
                         :enterpriseId = "subPayForm.enterpriseId"
                         :contractId = "subPayForm.contractId"
                         :isNull="subPayForm.contractId ? '':'contractId'"
                        :subLabourData="subPayTableData.data"
                        :isShowChecked="true"
                        @selectionChange="selectionChangeSubLabour"
      >
      </dialog-sub-labour>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubLabourCancel">取 消</el-button>
        <el-button @click="handleSubLabourOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!--引入计量单-->
    <el-dialog :visible.sync="subCount.visibleSync" lock-scroll title="计量单-选择" >
      <dialog-sub-count ref="refDialogSubCount"
                        :proId="subPayForm.proId"
                        :enterpriseId = "subPayForm.enterpriseId"
                        :contractId = "subPayForm.contractId"
                        :isNull="subPayForm.contractId ? '':'contractId'"
                        :subCountData="subPayTableData.data"
                        :isShowChecked="true"
                        @selectionChange="selectionChangeSubCount"
      >
      </dialog-sub-count>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubCountCancel">取 消</el-button>
        <el-button @click="handleSubCountOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
<!--引入签证单-->
    <el-dialog :visible.sync="subVisa.visibleSync" lock-scroll title="签证单-选择" >
      <dialog-sub-visa ref="refDialogSubVisa"
                       :proId="subPayForm.proId"
                       :enterpriseId="subPayForm.enterpriseId"
                       :contractId="subPayForm.contractId"
                       :isNull="subPayForm.contractId ? '':'contractId'"
                       :subVisaData="subPayTableData.data"
                       :isShowChecked="true"
                       @selectionChange="selectionChangeSubVisa"
      >
      </dialog-sub-visa>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubVisaCancel">取 消</el-button>
        <el-button @click="handleSubVisaOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
<!--引入索赔单-->
    <el-dialog :visible.sync="subClaim.visibleSync" lock-scroll title="索赔单-选择" >
      <dialog-sub-claim ref="refDialogSubClaim"
                        :proId="subPayForm.proId"
                        :enterpriseId = "subPayForm.enterpriseId"
                        :contractId = "subPayForm.contractId"
                        :isNull="subPayForm.contractId ? '':'contractId'"
                        :subClaimData="subPayTableData.data"
                        :isShowChecked="true"
                        @selectionChange="selectionChangeSubClaim"
      >
      </dialog-sub-claim>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubClaimCancel">取 消</el-button>
        <el-button @click="handleSubClaimOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
<!--引入奖励单-->
    <el-dialog :visible.sync="subReward.visibleSync" lock-scroll title="奖励单-选择" >
      <dialog-sub-reward ref="refDialogSubReward"
                         :proId="subPayForm.proId"
                         :enterpriseId = "subPayForm.enterpriseId"
                         :contractId ="subPayForm.contractId"
                         :isNull="subPayForm.contractId ? '':'contractId'"
                        :subRewardData="subPayTableData.data"
                        :isShowChecked="true"
                        @selectionChange="selectionChangeSubReward"
      >
      </dialog-sub-reward>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleSubRewardCancel">取 消</el-button>
        <el-button @click="handleSubRewardOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
<!--引入扣罚单-->
    <el-dialog :visible.sync="subPunish.visibleSync" lock-scroll title="扣罚单-选择" >
      <dialog-sub-punishment ref="refDialogSubPunishment"
                             :proId="subPayForm.proId"
                             :enterpriseId="subPayForm.enterpriseId"
                             :contractId="subPayForm.contractId"
                             :isNull="subPayForm.contractId ? '':'contractId'"
                             :subPunishmentData="subPayTableData.data"
                             :isShowChecked="true"
                             @selectionChange="selectionChangeSubPunish"
      >
      </dialog-sub-punishment>
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
  import formatBasic from '@/utils/mixins/formatBasic'
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogTransitUnit from '@/views/components/dialog/dialogTransitUnit'
  import dialogSubContract from '@/views/components/dialog/dialogSubContract'


  import dialogSubLabour from '@/views/components/dialog/dialogSubLabour'
  import dialogSubCount from '@/views/components/dialog/dialogSubCount'
  import dialogSubVisa from '@/views/components/dialog/dialogSubVisa'
  import dialogSubClaim from '@/views/components/dialog/dialogSubClaim'
  import dialogSubReward from '@/views/components/dialog/dialogSubReward'
  import dialogSubPunishment from '@/views/components/dialog/dialogSubPunishment'
  import {staticDataBasic} from "@/assets/data/basic";
  import {todayFormat} from "@/utils";
  import {validateLength} from "@/utils/validate";

  /**
   * api
   * */

  import {
    getSubPay,
    saveSubPay,
    deleteSubPay,
    auditSubPay,
    getSubPayDetail,
    deleteSubPayDetail
  } from "@/api/bpmaManager/subpackage/subcontractManagement/subPay/index.js"

  export default {
    name: 'SubPayDetail',
    components: {
      dialogProject,
      dialogTransitUnit,
      dialogSubContract,
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

        labourBtnShowFlag:true,  //待系统菜单配置
        countBtnShowFlag:true,
        visaBtnShowFlag:true,
        claimBtnShowFlag:true,
        rewardBtnShowFlag:true,
        punishBtnShowFlag:true,
        deleteBtnSubListShowFlag:true,

        activeNames: ['1'],
        saveBtnDisabledFlag:true,
        subPayForm:{},
        subPayFormId:undefined,

        rules: {
          name: [
            {required: true, message: '请输入款项名称', trigger: 'change'}
          ],
          proName: [
            {required: true, message: '请选择项目名称', trigger: 'change'}
          ],
          enterpriseName:[
            {required: true, message: '请选择分包单位', trigger: 'change'}
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

        subLabour:{
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
        subPayTableData:{
          data:[],
          total:0
        },
        modelSearchFilter: {
          page: 1,
          limit: 10000,
          masterId:undefined
        },
        currentRow:null, //表格当前行
        columns:[ //表格列
          {
            text: '单据类型',
            value: 'billType',
            width: '140',
            align: "center",
            showOverflowTooltip:true
          },{
            text: '单据编码',
            value: 'billCode',
            width: '130',
            align: "center",
            showOverflowTooltip:true
          },{
            text: '单据名称',
            value: 'billName',
            minWidth: '200',
            align: "left",
            headerAlign: "center",
            showOverflowTooltip:true
          },{
            text: '单据金额',
            value: 'billPrice',
            width: '150',
            align: "right",
            headerAlign: "center",
            showOverflowTooltip:true
          },{
            text: '结算金额',
            value: 'payPrice',
            width: '150',
            align: "right",
            headerAlign: "center",
            className: "spacing-set",
            showOverflowTooltip:true
          },{
            text: '结算说明',
            value: 'summary',
            width: '200',
            align: "left",
            headerAlign: "center",
            className: "spacing-set",
            showOverflowTooltip:true
          }
        ]

      }
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if(this.$route.params) {
          this.subPayFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.subPayForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.subPayForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.subPayForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.subPayFormId = id;
        this.getSubPay();
        this.getSubPayDetailData()
      });
    },
    created() {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetIsOrNotData',
        'GetSubFinBillTypeEnum'

      ]);
      this.$store.dispatch("cacheId",'0');//刷新
    },
    computed: {
      deleteBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.subPayForm)){
          return this.subPayForm.validateStatus === 1;
        }else{
          return true;
        }

      },
      auditBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.subPayForm)){
          return this.subPayForm.validateStatus === 1;
        }else{
          return true;
        }
      },

      disabledFlag() {
        return this.subPayForm.validateStatus === 1;
      },
      priceDisabledFlag () {
        return (this.subPayTableData.data && this.subPayTableData.data.length > 0) || this.disabledFlag
      },
      deleteSubListBtnDisabledFlag () {
        return !this.currentRow || this.auditBtnDisabledFlag
      },

      /**
       * 计算结算金额
       * */
      price:{
        get () {
          const reducer = (accumulator, currentValue) => accumulator + Number(currentValue);
          //扣罚加总 扣罚单类型billType = 6
          let punishSum = this.subPayTableData.data.filter(item => {return item.billType === 6}).map( item => item.payPrice).reduce(reducer,0)
          let otherSum = this.subPayTableData.data.filter(item => {return item.billType !== 6}).map( item => item.payPrice).reduce(reducer,0)
          console.log('结算金额',punishSum,otherSum)
          return otherSum - punishSum
        },
        set() {}
      },
      shouldPayPrice:{
        get () {
         if(this.priceDisabledFlag){
           return this.price * this.subPayForm.shouldPayScale
         }else{
           return this.subPayForm.price * this.subPayForm.shouldPayScale
         }

        },
        set () {}
      }
    },
    watch: {
      subPayForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      },
    },
    methods: {
      handleAddBtn() {
        this.subPayFormId = undefined;
        // this.subPayForm.proId = undefined;
        // this.subPayForm.proName = undefined;
        // this.subPayForm.proCode = undefined;
        this.addSubPay()
        this.$refs.refSubPayForm.resetFields()
      },
      handleSaveBtn () {
        this.validateAfter(()=>{
          this.saveSubPayData().catch(err=>{
            console.log(err)
          })

        })
      },
      handleDeleteBtn() {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>{
          if(this.$utils.isEmpty(this.subPayFormId)){
            this.$set(this.subPayForm,'proId','')
            this.$set(this.subPayForm,'proName','')
            this.$set(this.subPayForm,'proCode','')
            this.addSubPay()
          }else{
            this.deleteSubPayData().then( () =>{
              this.$set(this.subPayForm,'proId','')
              this.$set(this.subPayForm,'proName','')
              this.$set(this.subPayForm,'proCode','')
              this.addSubPay()
            }).catch(err=>{
              console.log(err)
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleAuditBtn() {
        this.$confirm(staticDataBasic.info.audit, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>{
          this.validateAfter(()=>{
            this.saveSubPayData(true).then(() => {
              this.auditSubPayData()
            }).catch(error => {
              console.log(error)
            })
          })
        }).catch(error => {
          console.log(error)
        })
      },
      handleDeleteSubListBtn() {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>{
          this.deleteByIdData(this.subPayTableData.data, this.currentRow,(allData,data)=>{
            this.$set(this.subPayForm,'detailList',allData)//所有数据（删除时，只改变删除数据的状态，点保存后才删除）
            this.subPayTableData.data = data; //除去需要删除的数据
          });

        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 新增表单内容
       * */
      addSubPay() {
        this.subPayForm = {
          id: '',
          validateStatus: 2,
          name:'阶段结算款',
          proId: this.subPayForm.proId,
          proName: this.subPayForm.proName,
          proCode:this.subPayForm.proCode,
          price:'0.00',
          shouldPayScale:'1.00',
          handleDate:new Date(todayFormat()).getTime(),
          shouldPayDate:new Date(todayFormat()).getTime(),
          ifPay:2,
        }
        this.$refs.refSubPayForm.resetFields()
        this.subPayTableData.data = []
        console.log('this.subPayForm', this.subPayForm)
      },
      /**
       * 保存
       * */
      saveSubPayData (boolean) {
        console.log('save data',this.subPayForm)
        if(this.priceDisabledFlag){
          this.subPayForm.price = this.price
        }
        this.subPayForm.shouldPayPrice = this.shouldPayPrice
        return saveSubPay(this.subPayForm).then(res =>{
          if(res.status && res.status === 200) {
            console.log('subPay save',res)
            this.subPayFormId = res.data.id
            this.subPayForm = res.data
            this.subPayTableData.data = res.data.detailList
            //上传文件
            if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
            console.log("save subPay success",res)
            if(!boolean){
              this.$message.success(res.message)
            }
          }else{
            this.$message({message:res.message,type:'warning'})
          }
        }).catch(err=>{
          console.log(err)
        })
      },

      /**
       * 保存或者审核之前验证
       */
      validateAfter(callback) {
        let result = true
        //表单验证
        this.$refs.refSubPayForm.validate(valid => {
          valid ? null : result = valid
          return !result
        })

        if (result) {
          //验证
          if (typeof callback === "function") {
            callback();
          }
        } else {
          if(this.$utils.isEmpty(this.subPayForm.name)){
            this.$refs.refSubPayName.focus()
          }
          this.$message({
            message: staticDataBasic.info.updateEmptyError,
            type: 'warning'
          });
          return false
        }
      },

      /**
       * 删除表单
       * */
      deleteSubPayData() {
        return deleteSubPay(this.subPayFormId).then((res) => {
          if (res.status && res.status === 200) {
            this.$message.success(res.message)
          } else {
            this.$message({message: res.message, type: 'warning'})
          }
        }).catch(error => {
          console.log(error)
        })
      },

      /**
       * 审核
       * */
      auditSubPayData () {
        return auditSubPay(this.subPayForm).then((res) => {
          console.log('audit res', res)
          if (res.status && res.status === 200) {
            this.subPayForm = res.data
            this.subPayTableData.data = res.data.detailList
            this.$message.success(res.message)
          } else {
            this.$message({message: res.message, type: 'warning'})
          }
        }).catch(error => {
          console.log(error)
        })
      },

      changeScale(){
        if(this.subPayForm.shouldPayScale < 0 ){
          this.subPayForm.shouldPayScale = '0'
          this.$message({message:staticDataBasic.info.shouldPayScale,type:'warning'})
        }
        if( this.subPayForm.shouldPayScale > 1){
          this.subPayForm.shouldPayScale = '1'
          this.$message({message:staticDataBasic.info.shouldPayScale,type:'warning'})
        }
      },
      /**
       * 获取表单内容
       * */
      getSubPay () {
        if(this.$utils.isEmpty(this.subPayFormId)){
          this.addSubPay()
        }else{
          return getSubPay(this.subPayFormId).then(res =>{
            if(res.status && res.status === 200) {
              console.log("get subPayForm",res)
              this.subPayForm = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      changeFormatDate(date){
        this.subPayForm.handleDate = new Date(date).getTime()
      },

      changeFormatShouldPayDate (date) {
        this.subPayForm.shouldPayDate = new Date(date).getTime()
      },
      /**
       * 点击显示哪种弹窗 项目  单位  合同
       * */
      toipClick(type) {
        if (this.disabled) return
        if (type == 'counterpart' && !this.subPayForm.proId)
          return this.$message({message:'请先选择项目',type:'warning'})
        if (type == 'contract' && !(this.subPayForm.proId && this.subPayForm.enterpriseId ))
          return this.$message({message:'请先选择项目和分包单位',type:'warning'})
        this.type = type
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
      },
      selectionChange(row) {
        console.log('回传row',row)
        this.selectedRow = row.selectedRow
      },

      /**
       * 弹窗传回的名称 项目 单位 合同
       * */
      handleChange() {
        const row = this.selectedRow
        if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return
        switch (this.type) {
          case 'project':
            if(this.subPayForm.proId !== row.id){
              this.subPayForm = Object.assign({},this.subPayForm, {
                proName : row.name,
                proId : row.id,
                proCode : row.code,

                enterpriseName:undefined,
                enterpriseId:undefined,

                contractName:undefined,
                contractId:undefined,
                shouldPayScale:'1.00'
              } )
              this.subPayTableData.data=[]
              this.$set(this.subPayForm,'detailList', this.subPayTableData.data)
              console.log('proName',this.subPayForm.proName)
            }

            break
          case 'counterpart':
            if(this.subPayForm.enterpriseId !== row.id){
              this.subPayForm = Object.assign({},this.subPayForm, {
                enterpriseName : row.name,
                enterpriseId : row.id,

                contractName:undefined,
                contractId:undefined,
                shouldPayScale:'1.00'
              } )
              this.subPayTableData.data=[]
              this.$set(this.subPayForm,'detailList', this.subPayTableData.data)
              console.log('enterpriseName',this.subPayForm.enterpriseName)
            }
            break
          case 'contract':
            if(this.subPayForm.enterpriseId !== row.id){
              this.subPayForm = Object.assign({},this.subPayForm, {
                contractName : row.name,
                contractId : row.id,
                shouldPayScale: row.progressPricePayScale
              } )
              this.subPayTableData.data=[]
              this.$set(this.subPayForm,'detailList', this.subPayTableData.data)
              console.log('contractName',this.subPayForm.contractName)
            }

            break
        }
        this.saveBtnDisabledFlag = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },

      /**
       * 获取子表内容
       * */
      getSubPayDetailData() {
        if(this.$utils.isEmpty(this.subPayFormId)) {
          this.subPayTableData.data = []
        }else{
          this.modelSearchFilter.masterId = this.subPayFormId
          return getSubPayDetail(this.modelSearchFilter).then((res) => {
            if (res.status && res.status === 200) {
                this.subPayTableData.data = res.data.rows
              this.$set(this.subPayForm,'detailList',this.subPayTableData.data)
              console.log(" getSubPayTableData", res)
            } else {
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },

      /**
       * 删除子表
       * */
      deleteSubPayDetailData() {
        return deleteSubPayDetail(this.currentRow.id).then((res) => {
          if (res.status && res.status === 200) {
            this.$message.success(res.message)
          } else {
            this.$message({message: res.message, type: 'warning'})
          }
        }).catch(error => {
          console.log(error)
        })
      },

      /**
       * 当前行
       * */
      handleCurrentChange(row) {
        console.log(row)
        this.currentRow = row
      },

      /**
       * 回传数据加入子表表格
       * */
      selectedDataPushTable(SelectionChangeData,type){
        if(SelectionChangeData && SelectionChangeData.length > 0){
          let addNewArr = [] //需新加的数组
          let codesArr = []  //表格原有数组编码集合
          if(this.subPayTableData.data && this.subPayTableData.data.length > 0) {
            codesArr = this.subPayTableData.data.filter(item =>item.billType == type ).map(item => item.billCode)
            for(const item of SelectionChangeData) {
              if(codesArr.indexOf(item.code) < 0){ //判断返回数据与原有数据是否有重复
                let rowObj = Object.assign({},{
                  masterId:this.subPayFormId,
                  billId:item.id,
                  billType:type,
                  billCode:item.code,
                  billName:item.name,
                  billPrice:item.totalPrice || item.payPrice || item.price,
                  payPrice:item.totalPrice || item.payPrice || item.price,
                })
                addNewArr.push(rowObj)
              }
            }

          }else{
            for(const item of SelectionChangeData) {
              let rowObj = Object.assign({},{
                masterId:this.subPayFormId,
                billId:item.id,
                billType:type,
                billCode:item.code,
                billName:item.name,
                billPrice:item.totalPrice || item.payPrice || item.price,
                payPrice:item.totalPrice || item.payPrice || item.price,
              })
              addNewArr.push(rowObj)
            }
          }
          this.subPayTableData.data = addNewArr.concat(this.subPayTableData.data)
          this.$set(this.subPayForm,'detailList',this.subPayTableData.data)
        }
      },

      /**
       * 用工单弹框显示和隐藏
       * */
      handleImportLabour ( ){
        if(this.$utils.isEmpty(this.subPayForm.enterpriseId)){
          this.$message({message:'请先选择分包单位',type:'warning'})
        }else{
          this.subLabour.visibleSync = true
          this.$nextTick(() => {
            this.saveBtnDisabledFlag = false;
          })
        }
      },
      handleSubLabourCancel() {
        this.subLabour.visibleSync = false
      },
      selectionChangeSubLabour (data){
        console.log('用工单回传 data', data)
        this.subLabour.subLabourSelectionChange = data.selectedRows;
      },
      handleSubLabourOk(){
        this.subLabour.visibleSync = false
        //数据加入到列表中
        const subLabourSelectionChange = this.subLabour.subLabourSelectionChange
        this.selectedDataPushTable(subLabourSelectionChange,1)
      },

      /**
       * 计量单弹框显示和隐藏
       * */
      handleImportCount ( ){
        if(this.$utils.isEmpty(this.subPayForm.enterpriseId)){
          this.$message({message:'请先选择分包单位',type:'warning'})
        }else{
          this.subCount.visibleSync = true
          this.$nextTick(() => {
            this.saveBtnDisabledFlag = false;
          })
        }
      },
      handleSubCountCancel() {
        this.subCount.visibleSync = false
      },
      selectionChangeSubCount (data){
        console.log('计量单回传 data', data)
        this.subCount.subCountSelectionChange = data.selectedRows;
      },
      handleSubCountOk(){
        this.subCount.visibleSync = false
        //数据加入到列表中
        const subCountSelectionChange = this.subCount.subCountSelectionChange
        this.selectedDataPushTable(subCountSelectionChange,2)
      },

      /**
       * 签证单弹框显示和隐藏
       * */
      handleImportVisa ( ){
        if(this.$utils.isEmpty(this.subPayForm.enterpriseId)){
          this.$message({message:'请先选择分包单位',type:'warning'})
        }else{
          this.subVisa.visibleSync = true
          this.$nextTick(() => {
            this.saveBtnDisabledFlag = false;
          })
        }
      },
      handleSubVisaCancel() {
        this.subVisa.visibleSync = false
      },
      selectionChangeSubVisa (data){
        console.log('Visa回传 data', data)
        this.subVisa.subVisaSelectionChange = data.selectedRows;
      },
      handleSubVisaOk(){
        this.subVisa.visibleSync = false
        //数据加入到列表中
        const subVisaSelectionChange = this.subVisa.subVisaSelectionChange
        this.selectedDataPushTable(subVisaSelectionChange,3)
      },

      /**
       * 索赔单弹框显示和隐藏
       * */
      handleImportClaim ( ){
        if(this.$utils.isEmpty(this.subPayForm.enterpriseId)){
          this.$message({message:'请先选择分包单位',type:'warning'})
        }else{
          this.subClaim.visibleSync = true
          this.$nextTick(() => {
            this.saveBtnDisabledFlag = false;
          })
        }
      },
      handleSubClaimCancel() {
        this.subClaim.visibleSync = false
      },
      selectionChangeSubClaim (data){
        console.log('索赔单回传 data', data)
        this.subClaim.subClaimSelectionChange = data.selectedRows;
      },
      handleSubClaimOk(){
        this.subClaim.visibleSync = false
        //数据加入到列表中
        const subClaimSelectionChange = this.subClaim.subClaimSelectionChange
        this.selectedDataPushTable(subClaimSelectionChange,4)
      },

      /**
       *奖励单弹框显示和隐藏
       * */
      handleImportReward ( ){
        if(this.$utils.isEmpty(this.subPayForm.enterpriseId)){
          this.$message({message:'请先选择分包单位',type:'warning'})
        }else{
          this.subReward.visibleSync = true
          this.$nextTick(() => {
            this.saveBtnDisabledFlag = false;
          })
        }
      },
      handleSubRewardCancel() {
        this.subReward.visibleSync = false
      },
      selectionChangeSubReward (data){
        console.log('奖励单回传 data', data)
        this.subReward.subRewardSelectionChange = data.selectedRows;
      },
      handleSubRewardOk(){
        this.subReward.visibleSync = false
        //数据加入到列表中
        const subRewardSelectionChange = this.subReward.subRewardSelectionChange
        this.selectedDataPushTable(subRewardSelectionChange,5)
      },

      /**
       * 扣罚单弹框显示和隐藏
       * */
      handleImportPunish ( ){
        if(this.$utils.isEmpty(this.subPayForm.enterpriseId)){
          this.$message({message:'请先选择分包单位',type:'warning'})
        }else{
          this.subPunish.visibleSync = true
          this.$nextTick(() => {
            this.saveBtnDisabledFlag = false;
          })
        }
      },
      handleSubPunishCancel() {
        this.subPunish.visibleSync = false
      },
      selectionChangeSubPunish (data){
        console.log('扣罚单回传 data', data)
        this.subPunish.subPunishSelectionChange = data.selectedRows;
      },
      handleSubPunishOk(){
        this.subPunish.visibleSync = false
        //数据加入到列表中
        const subPunishSelectionChange = this.subPunish.subPunishSelectionChange
        this.selectedDataPushTable(subPunishSelectionChange,6)
      },

    }
  }
</script>

<style scoped>

</style>
