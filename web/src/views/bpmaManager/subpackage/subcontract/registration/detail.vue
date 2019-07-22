<template>
    <div class="registrationDetail-container">
      <el-tabs type="border-card">
        <el-tab-pane label="合同信息">
          <div class="handler-container">
            <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"

                       @click="handleAddBtn" plain>新增
            </el-button>
            <el-button v-if="saveBtnShowFlag" type="primary" icon="el-icon-if-save" size="small" plain

                       @click="handleSaveBtn" :disabled="saveBtnDisabledFlag || (registrationForm.signStatus === 1) ">保存
            </el-button>

            <el-button v-if="deleteBtnShowFlag" type="danger" icon="el-icon-delete" size="small" plain
                       @click="handleDeleteBtn" :disabled="deleteBtnDisabledFlag">删除
            </el-button>
            <el-button v-if="auditBtnShowFlag" type="primary" icon="el-icon-if-auth" size="small" plain
                       @click="handleAuditBtn" :disabled="auditBtnDisabledFlag">审核
            </el-button>
            <el-button v-if="signBtnShowFlag" type="primary" icon="el-icon-if-signing" size="small" plain
                       @click="handleSignBtn" :disabled="signBtnDisabledFlag">签约
            </el-button>
          </div>
          <el-form ref="refRegistrationForm" class="form-container" :model="registrationForm"
                   label-width="120px" :rules="rules" :show-message="false">
            <el-row :gutter="5">
              <el-col :span="8">
                <basic-validate-status :model="registrationForm"></basic-validate-status>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编码">
                  <el-input size="small" clearable v-model="registrationForm.code" :disabled="true" placeholder="系统自动生成合同编码"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                  <el-input size="small" v-model="registrationForm.proName"
                            readOnly
                            placeholder="请选择项目名称" :disabled="auditedDisabledFlag">
                    <el-button size="small"
                               slot="append"
                               icon="el-icon-plus"
                               class="form-btn"
                               :disabled="auditedDisabledFlag" @click="toipClick('project')"></el-button>
                  </el-input>

                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="合同名称" prop="name" hide-required-asterisk>
                  <el-input size="small" clearable v-model="registrationForm.name" :disabled="auditedDisabledFlag" ref="refName"
                            placeholder="请输入合同名称"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="价税合计金额">
                  <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="registrationForm.beforeTaxPrice"
                             placeholder="请输入价税合计金额"
                             :disabled="disabledFlag"
                             :min="0"
                  ></basic-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="税后合计金额">
                  <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="afterTaxPrice"
                             placeholder="系统自动生成税后合计金额"
                             :disabled="true"
                             :min="0"
                  ></basic-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="发票类型" prop="type" >
                  <el-select size="small" class="mode-select"
                             v-model="registrationForm.invoiceType"
                             placeholder="请选择发票类型"
                             :disabled="disabledFlag"
                  >
                    <el-option
                      v-for="(item, index ) in invoiceTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发票税率">
                  <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             :disabled="disabledFlag"
                             v-model="registrationForm.invoiceTaxRate"
                             placeholder="请输入发票税率"
                             :min="0"
                             :max="1"
                               @change="changeInvoiceTaxRate"
                  ></basic-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="进项税税额">
                  <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="tax"
                             placeholder="系统自动生成进项税税额"
                             :disabled="true"
                             :min="0"
                  ></basic-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="我方机构" prop="ourEnterpriseName" hide-required-asterisk>
                  <el-input size="small" v-model="registrationForm.ourEnterpriseName"
                            readOnly
                            placeholder="请选择我方机构" :disabled="auditedDisabledFlag">
                    <el-button size="small"
                               slot="append"
                               icon="el-icon-plus"
                               class="form-btn"
                               :disabled="auditedDisabledFlag" @click="toipClick('meMechanism')"></el-button>
                  </el-input>

                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="对方单位" prop="oppositeEnterpriseName" hide-required-asterisk>
                  <el-input size="small" v-model="registrationForm.oppositeEnterpriseName"
                            readOnly
                            placeholder="请选择对方单位" :disabled="auditedDisabledFlag">
                    <el-button size="small"
                               slot="append"
                               icon="el-icon-plus"
                               class="form-btn"
                               :disabled="auditedDisabledFlag" @click="toipClick('counterpart')"></el-button>
                  </el-input>

                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="三方单位">
                  <el-input size="small" v-model="registrationForm.thirdEnterpriseName"
                            readOnly
                            placeholder="请选择三方单位" :disabled="disabledFlag">
                    <el-button size="small"
                               slot="append"
                               icon="el-icon-plus"
                               class="form-btn"
                               :disabled="disabledFlag" @click="toipClick('tripartiteUnit')"></el-button>
                  </el-input>

                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="签约状态" prop="ifContract" class="add-border">
                  <el-radio-group v-model="registrationForm.signStatus">
                    <el-radio :label="parseInt(row.code)"
                              v-for="(row, key, index) in dataEnum.siginStatus"
                              :key="row.code" :disabled="true">
                      {{ row.name }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签约日期" >
                  <el-date-picker size="small"
                                  :editable = "false"
                                  :clearable = "false"
                                  @change="formatSignDate"
                                  v-model="registrationForm.signDate"
                                  type="date"
                                  :disabled="disabledFlag"
                                  placeholder="选择日期" class="date-picker">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="原始合同号">
                  <el-input size="small" clearable v-model="registrationForm.orignalCode" :disabled="disabledFlag"
                            placeholder="请输入原始合同号"/>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="计价方式" >
                  <el-select size="small" class="mode-select"
                             v-model="registrationForm.computeMode"
                             placeholder="请选择计价方式"
                             :disabled="disabledFlag">
                    <el-option
                      v-for="(item, index ) in computeModeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="进度款支付比例">
                  <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="registrationForm.progressPricePayScale"
                             placeholder="请输入进度款支付比例"
                             :disabled="disabledFlag"
                             :min="0"
                             :max="1"
                               @change="changeProgressPricePayScale"
                  ></basic-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="质保金比例">
                  <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="registrationForm.qualityAssurancePriceScale"
                             placeholder="请输入质保金比例"
                             :disabled="disabledFlag"
                             :min="0"
                             :max="1"
                               @change="changeAssurancePriceScale"
                  ></basic-input>
                </el-form-item>
              </el-col>
            </el-row>



            <el-row :gutter="5">
              <el-col :span="24">
                <el-form-item label="合同内容">
                  <el-input size="small" clearable
                            :disabled="disabledFlag"
                            :autosize="{ minRows:6, maxRows: 8}"
                            :max="5000"
                            v-model="registrationForm.contractContent" type="textarea" placeholder="请输入合同内容，不超过5000字"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="24">
                <el-form-item label="支付方式">
                  <el-input size="small" clearable
                            :disabled="disabledFlag"
                            :autosize="{ minRows:6, maxRows: 8}"
                            :max="5000"
                            v-model="registrationForm.payMode" type="textarea" placeholder="请输入支付方式，不超过5000字"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="24">
                <el-form-item label="合同交底">
                  <el-input size="small" clearable
                            :disabled="disabledFlag"
                            :autosize="{ minRows:6, maxRows: 8}"
                            :max="5000"
                            v-model="registrationForm.contractExplain" type="textarea" placeholder="请输入合同交底，不超过5000字"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="24">
                <el-form-item label="合同摘要">
                  <el-input size="small" clearable
                            :disabled="disabledFlag"
                            :autosize="{ minRows:6, maxRows: 8}"
                            :max="5000"
                            v-model="registrationForm.summary" type="textarea" placeholder="请输入合同摘要，不超过5000字"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="24">
                <el-form-item label="补充说明">
                  <el-input size="small" clearable
                            :disabled="disabledFlag"
                            :autosize="{ minRows:6, maxRows: 8}"
                            :max="5000"
                            v-model="registrationForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="24">
                <el-form-item label="合同附件" class="add-border file">
                  <basic-upload ref="refBasicUpload" :formId="registrationFormId" :disabled="disabledFlag">
                  </basic-upload>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="16">
                <el-form-item label="登记人员">
                  <el-input size="small" clearable  v-model="registrationForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="登记时间">
                  <el-input size="small" clearable  v-model="registrationForm.inputTime" :disabled="true"
                            placeholder="系统自动生成登记时间"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择" >
            <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
            <div class="dialog-footer" slot="footer">
              <el-button @click="visibleSyncProject = false">取 消</el-button>
              <el-button @click="handleChange" type="primary">确 定</el-button>
            </div>
          </basic-dialog>
          <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMeMechanism" title="我方机构-选择" >
            <dialog-my-unit @selectionChange="selectionChange" filterUnit filterValid
                            v-if="visibleSyncMeMechanism"></dialog-my-unit>
            <div class="dialog-footer" slot="footer">
              <el-button @click="visibleSyncMeMechanism = false">取 消</el-button>
              <el-button @click="handleChange" type="primary">确 定</el-button>
            </div>
          </basic-dialog>
          <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncCounterpart" title="对方单位-选择" >
            <dialog-transit-unit @selectionChange="selectionChange" filterValid
                                 v-if="visibleSyncCounterpart"></dialog-transit-unit>
            <div class="dialog-footer" slot="footer">
              <el-button @click="visibleSyncCounterpart = false">取 消</el-button>
              <el-button @click="handleChange" type="primary">确 定</el-button>
            </div>
          </basic-dialog>
          <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncTripartiteUnit" title="三方单位-选择" >
            <dialog-transit-unit @selectionChange="selectionChange" filterValid
                                 v-if="visibleSyncTripartiteUnit"></dialog-transit-unit>
            <div class="dialog-footer" slot="footer">
              <el-button @click="visibleSyncTripartiteUnit = false">取 消</el-button>
              <el-button @click="handleChange" type="primary">确 定</el-button>
            </div>
          </basic-dialog>
        </el-tab-pane>
        <el-tab-pane label="合同预算" :disabled="!registrationFormId">
          <div class="handler-container">
            <el-button v-if="!defaultExpandAll" type="primary" size="small" icon="el-icon-if-open" plain
                       @click="clickDefaultExpandAll">全部展开
            </el-button>
            <el-button v-if="defaultExpandAll" type="primary" size="small" icon="el-icon-if-fold" plain
                       @click="clickDefaultExpandAll">全部折叠
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
            <el-button type="primary" size="small" icon="el-icon-plus"
                       :disabled="this.registrationForm.signStatus === 1"
                       @click="clickLevel(1,-1)" plain>新增根</el-button>
            <el-button :disabled="addNextBudgetBtnDisabledFlag"
                       type="primary" size="small" icon="el-icon-circle-plus-outline"
                       @click="clickLevel(1,1)" plain>新增同级
            </el-button>
            <el-button :disabled="addBranchBudgetBtnDisabledFlag"
                       type="primary" size="small" icon="el-icon-circle-plus-outline"
                       @click="clickLevel(2,1)" plain>新增下级
            </el-button>
            <el-button :disabled="saveBudgetBtnDisabledFlag || this.registrationForm.signStatus === 1 "
                       type="primary" size="small" icon="el-icon-if-save"
                       @click="handleSaveBudgetBtn" plain>保存
            </el-button>
            <el-button :disabled="deleteBudgetBtnDisabledFlag"
                       type="danger" size="small" icon="el-icon-delete"
                       @click="handleDeleteBudgetBtn" plain>删除
            </el-button>
            <!--<basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilterBudget"
                          @clickSearchFilter="clickSearchFilter"></basic-search>-->

          </div>

          <basic-table-tree ref="refBudgetDataTableTree" :default-expand-all="defaultExpandAll"
                            :data="budgetData" :columns="columns" border
                            @current-change="rowClick">

            <template slot-scope="treeObj" slot="name">
              <el-form :model="treeObj.scope.row" :ref="'formName' + treeObj.scope.$index" :rules="budgetRules"
                       :show-message="false">
                <el-form-item prop="name">
                  <el-input clearable size="small"   placeholder="请输入名称"
                            v-model="treeObj.scope.row.name"
                            :disabled="disabledFlag"></el-input>
                </el-form-item>
              </el-form>
            </template>
            <template slot-scope="treeObj" slot="feature">
              <el-input clearable size="small"   placeholder="请输入特征"
                        v-model="treeObj.scope.row.feature"
                        :disabled="disabledFlag"></el-input>
            </template>
            <template slot-scope="treeObj" slot="unit">
              <el-input clearable size="small"   placeholder="请输入单位"
                        v-model="treeObj.scope.row.unit"
                        :disabled="disabledFlag"></el-input>
            </template>
            <template slot-scope="treeObj" slot="sum">
              <basic-input clearable size="small"
                           :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
                        v-model="treeObj.scope.row.sum"  placeholder="请输入数量"
                        :disabled="disabledFlag || treeObj.scope.row.ifLastLevel == 2"
                           @change="sumChange(treeObj.scope.row)"></basic-input>
            </template>
            <template slot-scope="treeObj" slot="unitPrice">
              <basic-input clearable size="small"
                        :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
                        v-model="treeObj.scope.row.unitPrice" placeholder="请输入单价"
                        :disabled="disabledFlag || treeObj.scope.row.ifLastLevel == 2"
                           @change="sumChange(treeObj.scope.row)"></basic-input>
            </template>
            <template slot-scope="treeObj" slot="totalPrice">
              {{formatToThousands(Number(treeObj.scope.row.totalPrice))}}
             <!-- <basic-input clearable size="small"
                           :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
                           v-model="treeObj.scope.row.totalPrice" placeholder="系统生成金额"
                           :disabled="true" ></basic-input>-->
            </template>
            <template slot-scope="treeObj" slot="remark">
              <el-input clearable size="small"  v-model="treeObj.scope.row.remark"
                        :disabled="disabledFlag" placeholder="请输入补充说明"></el-input>
            </template>

          </basic-table-tree>

        </el-tab-pane>
      </el-tabs>



    </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from '@/utils/mixins/formatBasic'
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogMyUnit from '@/views/components/dialog/dialogMyUnit'
  import dialogTransitUnit from '@/views/components/dialog/dialogTransitUnit'
  import {staticDataBasic} from "@/assets/data/basic";
  import {validateLength} from "@/utils/validate";
  import {
    getNowFormatDate,
    deepCloneByObject,
    getChangedTableTreeData,
    updateTableTreeData,
    updateTableTreeEnableData
  } from '@/utils'
  /**
   * api
   * */
  import {
    getAllSubContractRegistrationItem,
    getSubContractRegistration,
    saveSubContractRegistration,
    updateSubContractRegistration,
    deleteSubContractRegistration,
    auditSubContractRegistration,
    signSubContractRegistration,
    getOurEnterprise,
    getEnterprise,
    getSubContractBudget,
    deleteSubContractBudget,
    putSubContractBudget
  } from '@/api/bpmaManager/subpackage/subcontract/registration/index.js'
  import {getDictionaryDataByTypeFilter} from '@/api/common/dataDictionary.js'
    export default {
        name: 'RegistrationDetail',
      components: {
        dialogProject,
        dialogMyUnit,
        dialogTransitUnit
      },
      mixins: [computed, methods, formatEnum, formatBasic],
      data() {
        return {
          addBtnShowFlag: true, //待系统菜单配置
          saveBtnShowFlag: true,
          deleteBtnShowFlag: true,
          auditBtnShowFlag: true,
          signBtnShowFlag: true,


          registrationFormId: undefined,
          registrationForm: {
            beforeTaxPrice:'0.00',
            invoiceTaxRate:'0.00',
            afterTaxPrice:'0.00',
            tax:'0.00',

          },
          computeModeList:[],
          invoiceTypeList: [],
          saveBtnDisabledFlag: true,

          rules: {
            proName: [
              {required: true, message: '请选择项目名称', trigger: 'change'}

            ],
            name: [
              {required: true, message: '请输入合同名称', trigger: 'change'}
            ],
            ourEnterpriseName: [
              {required: true, message: '请选择我方机构', trigger: 'change'}
            ],
            oppositeEnterpriseName: [
              {required: true, message: '请选择对方单位', trigger: 'change'}
            ]

          },
          budgetRules:{
            name:[
              {
                required: true,
                validator: (rule, value, callback) => {
                  validateLength(rule, value, callback, true, ['名称', 1, 20]);
                },
                trigger: 'change'
              }
            ]
          },
          type: null,
          visibleSyncProject: false,
          visibleSyncMeMechanism: false,
          visibleSyncCounterpart: false,
          visibleSyncTripartiteUnit: false,
          selectedRow: {},


          /***
           * 合同预算
           * */
           saveBudgetBtnDisabledFlag:true,
        // saveBudgetBtnDisabledFlag:false,
          defaultExpandAll:false,

          columns: [
            {
              expand: true,
              text: '编码',
              value: 'tree_code',
              width: '250',
              align: "left",
              headerAlign: "center",

            },
            {
              text: '名称(*)',
              value: 'name',
              minWidth: 200,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true,
              className:"spacing-set"
            },
            {
              text: '特征',
              value: 'feature',
              width: '120',
              headerAlign: "center",
              align: "center",
              showOverflowTooltip: true,
              className: "spacing-set"

            },
            {
              text: '单位',
              value: 'unit',
              width: '120',
              headerAlign: "center",
              align: "center",
              showOverflowTooltip: true,
              className: "spacing-set"
            },{
              text: '数量',
              value: 'sum',
              width: '120',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true,
              className: "spacing-set"
            },{
              text: '单价',
              value: 'unitPrice',
              width: '120',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true,
              className: "spacing-set"
            },{
              text: '金额',
              value: 'totalPrice',
              width: '150',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true,
              className: "spacing-set"
            },{
              text: '补充说明',
              value: 'remark',
              width: '300',
              headerAlign: "center",
              align: "left",
              showOverflowTooltip: true,
              className: "spacing-set"
            }
          ],
          budgetCurrentRow:null,
          modelSearchFilterBudget: {
            contractId:undefined,
            fuzzy: '',
            fuzzyKeys:'',
          },
          budgetData:[],

        }
      },
      deactivated() {
        this.$store.dispatch("cacheId", undefined);
      },
      activated() {
        this.$utilsBasic.loadAddAndDetailData(this, () => {
          if(this.$route.params) {
            this.registrationFormId = this.$route.params.id ? this.$route.params.id : undefined;
          }
          if(this.$route.query) {
            this.registrationForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
            this.registrationForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
            this.registrationForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
          }
          this.handleAddBtn();

        },(id) => {
          this.registrationFormId = id;
          this.getRegistration();
          this.getSubContractBudgetData()
        });
      },
      created() {

        //初始化数据字典
        this.getEnumData([
          'GetValidateStatusData',
          'GetIsOrNotData',
          'GetSiginStatusData'
        ]);
        this.$store.dispatch("cacheId",'0');//刷新

      },
      mounted() {
        setTimeout(() => {
          this.getcomputeModeList()
          this.getinvoiceTypeList()
        }, 100)

      },
      computed: {
        deleteBtnDisabledFlag() {
          return this.registrationForm.validateStatus === 1;
        },
        auditBtnDisabledFlag() {
          return this.registrationForm.validateStatus === 1;
        },
        signBtnDisabledFlag(){
          return !this.auditBtnDisabledFlag || !this.registrationForm.signDate || this.registrationForm.signStatus === 1 ;
        } ,
        auditedDisabledFlag() {
          return this.registrationForm.validateStatus === 1;
        },
        disabledFlag() {
          return this.registrationForm.signStatus === 1;
        },

        /**
         * afterTaxPrice 税后合计金额
         * beforeTaxPrice  价税合计金额
         * invoiceTaxRate  发票税率
         *
         * 税后合计金额 = 价税合计金额 / （1+发票税率）
        * */
        afterTaxPrice: {
          get: function () {
            let beforeTaxPrice = Number(this.registrationForm.beforeTaxPrice)
            let invoiceTaxRate = Number(this.registrationForm.invoiceTaxRate)
            let computedRes = beforeTaxPrice / (invoiceTaxRate + 1)
            let res = isNaN(computedRes) ? '0.00' : computedRes.toFixed(2)
            return res
           // return this.$utilsBasic.toThousands(Number(res))
          },
          set: function () {
          }
        },

        /**
         * beforeTaxPrice  价税合计金额
         * invoiceTaxRate  发票税率
         * tax  进项税税额
         *    发票类型 = 增值税专用发票 ，
         *    进项税税额 = 价税合计金额 / （1+发票税率） * 发票税率
         *    发票类型 ≠ 增值税专用发票 ，进项税税额 = 0.00
        * */
        tax: {
          get: function () {
            if(this.registrationForm.invoiceType == '增值税专用发票'){
              let beforeTaxPrice = Number(this.registrationForm.beforeTaxPrice)
              let invoiceTaxRate = Number(this.registrationForm.invoiceTaxRate)
              let computedRes = beforeTaxPrice / (invoiceTaxRate + 1) * invoiceTaxRate
              let res = isNaN(computedRes) ? '0.00' : computedRes.toFixed(2)

              return res
            }else{
              return '0.00'
            }

          },
          set: function () {
          }
        },

        /***
         * 预算相关按钮是否禁用
         * */
        addNextBudgetBtnDisabledFlag () {
          if(this.$utils.length(this.budgetCurrentRow)){
            return false
          }
          return true;
        },
        addBranchBudgetBtnDisabledFlag() {

          if(this.$utils.length(this.budgetCurrentRow)){
            return false
          }
          return true;
        },
        deleteBudgetBtnDisabledFlag() {
          if(this.$utils.length(this.budgetCurrentRow)){
            return false
          }
          return true;
        },

      },
      watch: {
        registrationForm: {
          handler() {
            this.saveBtnDisabledFlag = false
          },
          deep: true
        },

        budgetData: {
          handler() {

            this.saveBudgetBtnDisabledFlag = false
          },
          deep: true
        },
      },
      methods: {
        handleAddBtn() {
          this.registrationFormId = undefined;
          // this.registrationForm.proId = undefined;
          // this.registrationForm.proName = undefined;
          this.addRegistration();
          this.$refs.refRegistrationForm.resetFields();
          this.$nextTick(() => {
            // this.saveBtnDisabledFlag = true;
          })
        },
        handleSaveBtn() {

          if (this.$utils.isEmpty(this.registrationFormId)) {
            this.$refs.refRegistrationForm.validate((valid) => {
              if (valid) {
                this.saveRegistrationForm().then(() => {
                  this.getRegistration()
                })
              } else {
                if(this.$utils.isEmpty(this.registrationForm.name)){
                  this.$refs.refName.focus()
                  this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
                  return false;
                }
                this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
                return false;
              }
            })
          } else {
            //id 修改

            this.updateRegistrationForm();
          }

        },
        handleDeleteBtn() {
          this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.$utils.isEmpty(this.registrationFormId)) {
              this.$set(this.registrationForm,'proId','')
              this.$set(this.registrationForm,'proName','')
              this.$set(this.registrationForm,'proCode','')
              this.addRegistration()
            } else {
              this.deleteRegistrationForm().then(() => {
                this.$set(this.registrationForm,'proId','')
                this.$set(this.registrationForm,'proName','')
                this.$set(this.registrationForm,'proCode','')
                this.addRegistration()
              }).catch(error => {
                console.log(error)
              })
            }
          }).catch(error => {
            console.log(error)
          })

        },
        handleAuditBtn() {
          if (this.$utils.isEmpty(this.registrationFormId)) {
            this.$refs.refRegistrationForm.validate((valid) => {
              if (valid) {
                this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {

                  this.saveRegistrationForm(true).then(() => {
                    this.auditRegistrationForm().then(() => {

                      console.log('id', 3)
                      this.getRegistration()
                    })
                  })

                }).catch((error) => {
                  console.log(error)
                })
              } else {
                if(this.$utils.isEmpty(this.registrationForm.name)){
                  this.$refs.refName.focus()
                  this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
                  return false;
                }
                this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
                return false;
              }
            })
          } else {
            this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              this.updateRegistrationForm(true).then( () => {
                this.auditRegistrationForm().then(() => {
                  this.getRegistration()
                })
              })


            }).catch((error) => {
              console.log(error)
            })
          }
        },
        handleSignBtn(){
          this.$confirm('亲，您是否确定当前合同已签约，确定后数据不能修改！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.signData();
          }).catch(error => {
            console.log(error)
          })

        },

        /**
         * 点击显示哪种弹窗 项目  我方机构  对方单位  三方单位
         * */
        toipClick(type) {
          if (this.disabled) return
          this.type = type
          this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
        },
        selectionChange(row) {
          this.selectedRow = row.selectedRow
        },

        /**
         * 弹窗传回的项目名称
         * */
        handleChange() {
          const row = this.selectedRow
          if(!this.isSelectedRow(row)) return false;
          if (Object.keys(row).length === 0) return
          switch (this.type) {
            case 'project':
              this.registrationForm = Object.assign({},this.registrationForm, {
                proName : row.name,
                proId : row.id,
                proCode : row.code
              } )
              break
            case 'meMechanism':
              this.registrationForm = Object.assign({},this.registrationForm, {
                ourEnterpriseName : row.name,
                ourEnterpriseId : row.id,
                ourEnterpriseCode : row.code
              } )
              break
            case 'counterpart':
              this.registrationForm = Object.assign({},this.registrationForm, {
                oppositeEnterpriseName : row.name,
                oppositeEnterpriseId : row.id,
                oppositeEnterpriseCode : row.code
              } )
              break
            case 'tripartiteUnit':
              this.registrationForm = Object.assign({},this.registrationForm, {
                thirdEnterpriseName : row.name,
                thirdEnterpriseId : row.id,
                thirdEnterpriseCode : row.code
              } )
              break
          }
          this.saveBtnDisabledFlag = false
          this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
        },

        /**
         * 新增表单内容
         * */
        addRegistration() {

          this.registrationForm = {
            id: '',
            validateStatus: 2,
            proName:this.registrationForm.proName,
            proId:this.registrationForm.proId,
            proCode:this.registrationForm.proCode,
            beforeTaxPrice: '0.00',
            invoiceType:'无',
            invoiceTaxRate:'0.00',
            afterTaxPrice:'0.00',
            tax:'0.00',
            signStatus:2,
            progressPricePayScale: '1.00',
            qualityAssurancePriceScale: '0.00',
            ifContract:2,
            type:1
          };
          this.registrationForm.afterTaxPrice = this.afterTaxPrice
          console.log('this.registrationForm.afterTaxPrice',this.registrationForm.afterTaxPrice)
          this.registrationForm.tax = this.tax;
          this.$refs.refName.focus()
          this.$nextTick( () =>{
            // this.saveBtnDisabledFlag =true
          })
          console.log('this.registrationForm', this.registrationForm)

        },
        changeInvoiceTaxRate(){
          if(this.registrationForm.invoiceTaxRate < 0 ){
            this.registrationForm.invoiceTaxRate = '0'
            this.$message({message:staticDataBasic.info.invoiceTaxRate,type:'warning'})
          }
          if( this.registrationForm.invoiceTaxRate > 1){
            this.registrationForm.invoiceTaxRate = '1'
            this.$message({message:staticDataBasic.info.invoiceTaxRate,type:'warning'})
          }
        },
        changeProgressPricePayScale(){
          if(this.registrationForm.progressPricePayScale < 0 ){
            this.registrationForm.progressPricePayScale = '0'
            this.$message({message:staticDataBasic.info.progressPricePayScale,type:'warning'})
          }
          if( this.registrationForm.progressPricePayScale > 1){
            this.registrationForm.progressPricePayScale = '1'
            this.$message({message:staticDataBasic.info.progressPricePayScale,type:'warning'})
          }
        },
        changeAssurancePriceScale(){
          if(this.registrationForm.qualityAssurancePriceScale < 0 ){
            this.registrationForm.qualityAssurancePriceScale = '0'
            this.$message({message:staticDataBasic.info.qualityAssuranceScale,type:'warning'})
          }
          if( this.registrationForm.qualityAssurancePriceScale > 1){
            this.registrationForm.qualityAssurancePriceScale = '1'
            this.$message({message:staticDataBasic.info.qualityAssuranceScale,type:'warning'})
          }
        },
        /**
         * 获取表单内容
         * */
        getRegistration() {
          if (this.registrationFormId) {
            return getSubContractRegistration(this.registrationFormId)
              .then((res) => {
                if (res.rel) {

                  console.log('表单内容', res)
                  this.registrationForm = res.data
                  this.$nextTick( () =>{
                    this.$refs.refRegistrationForm.clearValidate()
                    // this.saveBtnDisabledFlag =true
                  })
                } else {
                  this.$message({message: res.message, type: 'warning'})
                }
              }).catch(error => {
                console.log(error)
              })
          } else {
            this.addRegistration()
          }
        },
        /**
         * 获取计价方式
         * */
        getcomputeModeList() {
          getDictionaryDataByTypeFilter('BPMA_COMPUTE_MODE')
            .then((res) => {
              console.log('getcomputeModeList',res)
              if (res.rel) {
                this.computeModeList = res.data;
              } else {
                this.$message({message: res.message, type: 'warning'})
              }

            }).catch(error => {
            console.log(error)
          })
        },
        /**
         * 获取发票类型
         * */
        getinvoiceTypeList() {
          getDictionaryDataByTypeFilter('SYS_INVOICE_TYPE')
            .then((res) => {
              console.log('getinvoiceTypeList',res)
              if (res.rel) {
                this.invoiceTypeList = res.data;
              } else {
                this.$message({message: res.message, type: 'warning'})
              }

            }).catch(error => {
            console.log(error)
          })
        },

        /**
         * save registrationForm
         * */
        saveRegistrationForm(boolean) {
          this.registrationForm.afterTaxPrice = this.afterTaxPrice
         this.registrationForm.tax = this.tax

          const saveFormData = this.$utils.copy(this.registrationForm);
          console.log('保存成功', 1);
          return saveSubContractRegistration(saveFormData)
            .then((res) => {
              if (res.status && res.status === 200) {
                console.log('保存成功', 2);
                console.log('保存成功', res);
                this.registrationForm.id = res.data.id;
                this.registrationFormId = res.data.id;
                //上传文件
                if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
                if(!boolean){
                  this.$message.success(res.message)
                }
              } else {
                this.$message({message: res.message, type: 'warning'})
              }
            }).catch(error => {
              console.log(error)
            })
        },

        /**
         * 修改 registrationForm
         * */
        updateRegistrationForm(boolean) {

          this.registrationForm.afterTaxPrice = this.afterTaxPrice
          this.registrationForm.tax = this.tax
          const updateFormData = this.$utils.copy(this.registrationForm);
          return updateSubContractRegistration(updateFormData)
            .then((res) => {
              if (res.status && res.status === 200) {
                console.log('修改成功', res);
                // this.registrationForm.id = res.data.id;
                // this.registrationFormId = res.data.id;
                //上传文件
                if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
                if(!boolean){
                  this.$message.success(res.message)
                }
              } else {
                this.$message({message: res.message, type: 'warning'})
              }
            }).catch(error => {
              console.log(error)
            })
        },
        /**
         * delete registrationForm
         * */
        deleteRegistrationForm() {
          return deleteSubContractRegistration(this.registrationFormId)
            .then((res) => {
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
         * audit registrationForm
         * */
        auditRegistrationForm() {

          console.log('this.registrationForm', this.registrationForm)
          return auditSubContractRegistration(this.registrationForm)
            .then((res) => {

              console.log('audit res', res)
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
        * 签约
        * */
        signData () {
          return signSubContractRegistration(this.registrationForm).then((res) => {
            if(res.status &&res.status ===200){
              this.registrationForm.signStatus = 1
              this.$message.success(res.message)
            }else{
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch((err)=>{
            console.log(err)
          })
        } ,




        formatSignDate() {
        this.registrationForm.signDate = new Date(this.registrationForm.signDate).getTime()
        },

        /*******
         * 合同预算
         * */
        clickDefaultExpandAll(){
          if(this.defaultExpandAll)
          {
            this.defaultExpandAll = false;
          }else{
            this.defaultExpandAll = true;
          }
          console.log('折叠')
          this.getSubContractBudgetData()
          this.$refs.refBudgetDataTableTree.toggleExpandedAll(this.defaultExpandAll);
        },
        clickRefresh(){
          console.log('Refresh')
         this.getSubContractBudgetData()
        },

        // 新增
        clickLevel(type, pid) {
          let addRowData = {
            sum:'0.0000',
            unitPrice:'0.0000',
            totalPrice:'0.00',
            remark:'',
            contractId:this.registrationFormId,
            ifLastLevel: 1,
             type: type,
            parentCode: (this.budgetCurrentRow && this.budgetCurrentRow.code) ? this.budgetCurrentRow.code : '00', // 上级编码
            parentId: (this.budgetCurrentRow && this.budgetCurrentRow.id)> 0 ? this.budgetCurrentRow.id : -1,
            parentName:  (this.budgetCurrentRow && this.budgetCurrentRow.name) ? this.budgetCurrentRow.name : '',
            level: (this.budgetCurrentRow && this.budgetCurrentRow.level) ? 1 + this.budgetCurrentRow.level : 1, // 树形级别
          }
          //追加菜单树
          if (type == 1 && pid == -1) {
            //新增根
            this.$set(addRowData, "parentCode", '00');
            this.$set(addRowData, "parentId", -1);
            this.$set(addRowData, "parentName", '');
            this.$set(addRowData, "level", 1);
            this.$set(addRowData, "orgPathName", '/');
            let treeId = this.budgetData.length;
            let row = {tree_parent: '', tree_id: treeId, treeId: treeId};
            this.$set(addRowData, "tree_id", treeId);
            this.$set(addRowData, "treeId", treeId);
            this.$refs.refBudgetDataTableTree.addBrother(row, addRowData);
            this.$refs.refBudgetDataTableTree.setCurrentRow(row);
          }
          else if (type == 1) {
            this.$set(addRowData, "parentCode", this.budgetCurrentRow.parentCode);
            this.$set(addRowData, "parentId", this.budgetCurrentRow.parentId);
            this.$set(addRowData, "parentName", this.budgetCurrentRow.parentName);
            //新增同级
            if (this.budgetCurrentRow.parentId != '-1') {
              let parentData = this.computedParentData(this.budgetCurrentRow, this.budgetData)
              console.log('parentData',parentData)
              parentData.ifLastLevel = 2
              parentData.sum = '0.0000'
              parentData.unitPrice = '0.0000'
              parentData.totalPrice = '0.00'
            }

            let treeId = this.budgetCurrentRow.tree_id + '-' + (this.$utils.length(this.budgetCurrentRow.children)>0 ? this.budgetCurrentRow.children.length : '0');
            this.$set(addRowData, "tree_id", treeId);
            this.$set(addRowData, "treeId", treeId);
            this.$refs.refBudgetDataTableTree.addBrother(this.budgetCurrentRow, addRowData);
            this.$refs.refBudgetDataTableTree.setCurrentRow(addRowData);
          } else {
            //新增下级
            this.budgetCurrentRow.ifLastLevel = 2
            this.budgetCurrentRow.sum = '0.0000'
            this.budgetCurrentRow.unitPrice = '0.0000'
            this.budgetCurrentRow.totalPrice = '0.00'

            this.$refs.refBudgetDataTableTree.toggleExpandedRow(this.budgetCurrentRow.tree_id);
            let treeId = this.budgetCurrentRow.tree_id + '-' + (this.$utils.length(this.budgetCurrentRow.children)>0 ? this.budgetCurrentRow.children.length : '0');
            this.$set(addRowData, "tree_id", treeId);
            this.$set(addRowData, "treeId", treeId);
            this.$refs.refBudgetDataTableTree.addChild(this.budgetCurrentRow, addRowData);
            this.$refs.refBudgetDataTableTree.setCurrentRow(addRowData);
          }
          this.$nextTick(function () {
          //  this.$refs.refName.focus();
            this.saveBudgetBtnDisabledFlag = false
          });
        },
        computedParentData(selected, data) {
          data = this.computedSaveData(data)
          return data.filter(item => item.code == selected.parentCode)[0]
        },
        computedSaveData(data) {
          let arr = []
          data.forEach(item => {
            if (item.children && item.children.length > 0) {
              arr = arr.concat(this.computedSaveData((item.children)))
            }
            if (item.tree_parent) {
              this.$set(item, 'parentId', item.tree_parent.id)
              this.$set(item, 'parentCode', item.tree_parent.code)
            }
            arr.push(item)
          })
          return arr
        },
        /**
         * 新增时，总价加总
         * */
        computedValue(data) {
          if (data.children && data.children.length > 0) {
            let sum = 0
            data.children.forEach(res => {
              if (res.children && res.children.length > 0) {
                res = this.computedValue(res)
              }
              sum += Number(res.totalPrice)
            })
            data.totalPrice = sum
          }
          return data
        },


        handleSaveBudgetBtn() {
          return this.validateAfter(() => {
            this.saveSubContractBudget().then( () =>{
              this.getSubContractBudgetData()
            })
          })

        },
        /**
         * 保存或者审核之前验证
         */

        validateAfter(callback) {
          let result = true
          let idx = 0
          while(this.$refs['formName' + idx]) {
            console.log('refs',this.$refs['formName' + idx])
            this.$refs['formName' + idx].validate(valid => {
              console.log(valid, idx)
              valid ? null : result = valid
            })
            idx++
          }

          if (result) {
            if (typeof callback === "function") {
              callback();
            }
          } else {
            this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
            return false
          }
        },

        handleDeleteBudgetBtn() {
          this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.budgetCurrentRow.id) {
              this.deleteSubContractBudget().then( () => {

                if (this.budgetCurrentRow.parentId != '-1') {
                  let parentData = this.computedParentData(this.budgetCurrentRow, this.budgetData)
                  this.$set(parentData, 'totalPrice', 0)
                  let brothersData = parentData.children.filter(item => (item.type == 1 || item.type == 2) && (item != this.budgetCurrentRow))
                  if (brothersData.length == 0) parentData.ifLastLevel = 1
                }
              }).then( () =>{
                this.saveSubContractBudget()
                console.log('保存')
              }).then( () =>{
                this.getSubContractBudgetData().then(res => {
                  this.budgetData = this.budgetData.map(item => {
                    return this.computedValue(item)
                  })
                })
                console.log('获取')
              }).catch(error => {
                console.log(error)
              })
            } else {

              //console.log(this.budgetData.indexOf(this.budgetCurrentRow))
             /* this.budgetData.splice(this.budgetData.indexOf(this.budgetCurrentRow), 1)*/
              this.budgetData = this.setAllDataIsOnly(this.budgetData, this.budgetCurrentRow)
              if (this.budgetCurrentRow.parentId != '-1') {
                let parentData = this.computedParentData(this.budgetCurrentRow, this.budgetData)
                this.$set(parentData, 'totalPrice', 0)
                let brothersData = parentData.children.filter(item => (item.type == 1 || item.type == 2) && (item != this.budgetCurrentRow))
                if (brothersData.length == 0) parentData.ifLastLevel = 1
              }

              this.$nextTick(function () {
                this.$refs.refBudgetDataTableTree.setCurrentRow(this.budgetData[0]);
                this.budgetData = this.budgetData.map(item => {
                  return this.computedValue(item)
                })
              });
            }
          }).catch(error => {
            console.log(error)
          })


        },
        setAllDataIsOnly(data, target) {
          return data.filter(item => {
            if (item.children && item.children.length > 0) {
              item.children = this.setAllDataIsOnly(item.children, target)
            }
            return item != target
          })
        },

        rowClick(row,oldCurrentRow) {
          console.log(row)
          if (this.$utils.length(row)) {
            this.budgetCurrentRow = row;
           // this.budgetCurrentRow.code = row.tree_code;//用于生成编码
            this.$set(this.budgetCurrentRow,'code',row.tree_code)

          }

        },
        sumChange(row){
          this.budgetCurrentRow = row
          this.budgetCurrentRow.totalPrice = row.unitPrice * row.sum
          console.log('sumChange',this.budgetCurrentRow.totalPrice)

          this.budgetData = this.budgetData.map(item => {
            return this.computedValue(item)
          })

        },
        /*priceChange(unitPrice){
          this.budgetCurrentRow.totalPrice = this.budgetCurrentRow.sum * unitPrice
          console.log('priceChange',this.budgetCurrentRow.totalPrice)

          this.budgetData = this.budgetData.map(item => {
            return this.computedValue(item)
          })
        },*/

        /**
         * 搜索按钮
         */
       /* clickSearchFilter() {
       this.$refs.refBasicSearch.searchFilter(this.$refs.refBudgetDataTableTree, this.modelSearchFilterBudget, () => {
            this.getSubContractBudgetData();
          });

        },*/

        getSubContractBudgetData() {
          if(this.registrationFormId){
            this.modelSearchFilterBudget.contractId = this.registrationFormId;
            return getSubContractBudget(this.modelSearchFilterBudget)
              .then((res)=>{
                if(res.status && res.status === 200){
                  console.log('res.data',res.data)

                  this.budgetData = res.data;
                  console.log('getSubContractBudgetData',res)
                  console.log('this.budgetData',this.budgetData)
                  this.saveBudgetBtnDisabledFlag = true
                  this.$nextTick(function () {
                    this.$refs.refBudgetDataTableTree.setCurrentRow(this.budgetData[0]);
                  });
                }else{
                  this.$message({message: res.message, type: 'warning'})
                }

              })
              .catch(err=>{
                console.log(err)
              })
          }else{
            this.budgetData = []
          }

        },

        saveSubContractBudget(){
          console.log('this.budgetData', this.budgetData)
           let budgetDataTable = deepCloneByObject(this.budgetData);
          // let budgetDataTable = deepCloneByObject(this.$refs.refBudgetDataTableTree.getData());
          return putSubContractBudget(budgetDataTable)
            .then((res)=>{
              if(res.status && res.status === 200){
                console.log('saveSubContractBudget',res)
                this.$message.success(res.message)
              }else{
                this.$message({message: res.message, type: 'warning'})
              }

            })
            .catch(err=>{
            console.log(err)
          })
        },
        deleteSubContractBudget(){
          console.log(this.budgetCurrentRow.id)
          return deleteSubContractBudget(this.budgetCurrentRow.id)
            .then((res) => {
              if (res.status && res.status === 200) {
                this.$message.success(res.message)
              } else {
                this.$message({message: res.message, type: 'warning'})
              }
            }).catch(error => {
              console.log(error)
            })
        }

      }
    }
</script>

<style scoped>
/*  .date-picker {
    width: 100%;

  }

  .date-picker >>> .el-input__inner {
    padding-left: 35px;
  }

  .form-btn {
    margin-bottom: -10px;
  }
  .form-btn:hover{background-color:transparent;border-right:none}

  .mode-select {
    width: 100%;
  }*/

</style>
