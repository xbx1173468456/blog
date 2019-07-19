<template>
  <div class="countDetail-container">
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
        <el-form ref="refCountForm" class="form-container" :model="countForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="countForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="countForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据名称" prop="name" hide-required-asterisk>
                <el-input size="small" clearable v-model="countForm.name" :disabled="disabledFlag"
                          placeholder="请输入单据名称"/>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="countForm.proName"
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
                <el-input size="small" v-model="countForm.enterpriseName"
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
                <el-input size="small"  v-model="countForm.contractName"
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
              <el-form-item label="开始日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="countForm.beginDate"
                                type="date"
                                :disabled="disabledFlag"
                                :picker-options="pickerOptionsBeginDate"
                                @change="formatBeginDate"
                                placeholder="选择开始日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="截止日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="countForm.expiryDate"
                                type="date"
                                :disabled="disabledFlag"
                                :picker-options="pickerOptionsExpiryDate"
                                @change="formatExpiryDate"
                                placeholder="选择截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="计量总额">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="sumMoney"
                             placeholder="系统自动生成计量总额"
                             :disabled="true"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="是否结算" prop="ifPay" class="add-border" >

                <el-radio-group v-model="countForm.ifPay">
                  <el-radio :label="parseInt(row.code)"
                            v-for="(row, key, index) in dataEnum.isOrNot"
                            :key="row.code" :disabled="true">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算金额">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="countForm.payedPrice"
                             placeholder="系统自动生成结算金额"
                             :disabled="true"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算单号">
                <el-input size="small" clearable v-model="countForm.payedCode" :disabled="true" placeholder="系统自动生成结算单号"/>
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
                          v-model="countForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
               <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="countFormId">
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
      <el-button v-if="addBudgetBtnShowFlag" :disabled="disabledFlag"
                 type="primary" plain icon="el-icon-plus" size="small"
                 @click="handleImportBudgetBtn" plain>引入合同预算
      </el-button>
      <el-button v-if="addBudgetBtnShowFlag" :disabled="disabledFlag"
                 type="primary" plain icon="el-icon-plus" size="small"
                 @click="handleAddBudgetBtn" plain>新增
      </el-button>
      <el-button v-if="deleteBudgetBtnShowFlag"
                 type="danger" icon="el-icon-delete" size="small" plain
                 :disabled="deleteBudgetBtnDisabledFlag"
                 @click="handleBudgetDeleteBtn">删除
      </el-button>
    </basic-handler>
    <basic-table ref="refCountBudgetTableData"
                 :isPagination ="false"
                 :dataTable="countBudgetTableData"
                 :columns="columns"
                 :pagination="modelSearchFilter"
                 @current-change="handleCurrentChange"
                 @pagination="getCountBudgetData"
                 >
      <template slot-scope="obj" slot="name">
        <el-form :model="countBudgetTableData.data[obj.scope.$index]" :ref="'formName' + obj.scope.$index" :rules="countBudgetRules"
                 :show-message="false">
          <el-form-item prop="name">
            <el-input clearable size="small"   placeholder="请输入名称"
                      v-model="obj.scope.row.name"
                      :disabled="disabledFlag"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="obj" slot="feature">
        <el-input clearable size="small"   placeholder="请输入特征"
                  v-model="obj.scope.row.feature"
                  :disabled="disabledFlag"></el-input>
      </template>
      <template slot-scope="obj" slot="unit">
        <el-input clearable size="small"
                     v-model="obj.scope.row.unit" placeholder="请输入单位"
                     :disabled="disabledFlag" ></el-input>

      </template>
      <template slot-scope="obj" slot="sum">
        <basic-input clearable size="small"
                     :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
                     v-model="obj.scope.row.sum" placeholder="请输入数量"
                     :min="0"
                     :disabled="disabledFlag" @change="sumChange(obj.scope.row)"></basic-input>
      </template>
      <template slot-scope="obj" slot="unitPrice">
        <basic-input clearable size="small"
                     :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
                     v-model="obj.scope.row.unitPrice" placeholder="请输入单价"
                     :disabled="disabledFlag" @change="sumChange(obj.scope.row)"></basic-input>
      </template>
      <template slot-scope="obj" slot="totalPrice">
        {{formatToThousands(obj.scope.row.totalPrice)}}
      </template>
      <template slot-scope="obj" slot="summary">
        <el-input clearable size="small"   placeholder="请输入摘要"
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
                           :proId="countForm.proId"
                           :oppositeEnterpriseId = countForm.enterpriseId
      ></dialog-sub-contract>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </el-dialog>
    <!--引入预算弹窗-->
    <basic-dialog v-el-drag-dialog title="合同预算-选择"
                   :visible.sync="countBudget.visibleSync">
      <dialog-sub-contract-multiple-budget
        ref="refDialogPersonType"
        :countBudgetData="countBudgetTableData.data"
        :isShowChecked="isShowChecked"
        :contractId ="countForm.contractId"
        @selectionChange="selectionChangePersonType"
      >

      </dialog-sub-contract-multiple-budget>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickPersonTypeCancel">取 消</el-button>
        <el-button type="primary" @click="clickPersonTypeOk">确 定</el-button>
      </div>
    </basic-dialog>

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
  import dialogSubContract from '@/views/components/dialog/dialogSubContract'
  import dialogSubContractMultipleBudget from '@/views/components/dialog/dialogSubContract/multipleBudget'

  import {staticDataBasic} from "@/assets/data/basic";
  import {todayFormat} from "@/utils";
  import {validateLength} from "@/utils/validate";

  /**
   * api
   * */

  import {
    getCount,
    saveCount,
    deleteCount,
    auditCount,
    getCountBudget,
    deleteCountBudget
  } from "@/api/bpmaManager/subpackage/subValue/count/index.js"

    export default {
        name: 'CountDetail',
      components: {
        dialogProject,
        dialogMyUnit,
        dialogTransitUnit,
        dialogSubContract,
        dialogSubContractMultipleBudget
      },
      mixins: [computed, methods, formatEnum, formatBasic],
      data() {
        const _this = this
        return {
          activeNames: ['1'],
          addBtnShowFlag: true, //待系统菜单配置
          saveBtnShowFlag: true,
          deleteBtnShowFlag: true,
          auditBtnShowFlag: true,

          addBudgetBtnShowFlag: true,// 预算待系统菜单配置
          deleteBudgetBtnShowFlag: true,
          saveBtnDisabledFlag:true,
          countForm:{},
          countFormId:undefined,
          pickerOptionsBeginDate:{
            disabledDate(time) {
              if(!_this.$utils.isEmpty(_this.countForm.expiryDate)){
                return time.getTime() > new Date(_this.countForm.expiryDate).getTime();
              }
            },
          },
          pickerOptionsExpiryDate:{
            disabledDate(time) {
              if(!_this.$utils.isEmpty(_this.countForm.beginDate)){
                return time.getTime() < new Date(_this.countForm.beginDate).getTime();
              }
            },
          },

          rules: {
            name: [
              {required: true, message: '请输入单据名称', trigger: 'change'}
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

          /***
           * 预算
           * */
          countBudgetTableData: {
            data: [],
            total: 0
          },
          modelSearchFilter: {
            page: 1,
            limit: 10000,
          },
          currentRow:null, //表格当前行
          columns:[ //表格列
            {
              text: '编码',
              value: 'code',
              width: '130',
              align: "center",
              showOverflowTooltip:true
            }, {
              text: '名称(*)',
              value: 'name',
              minWidth: '200',
              align: "left",
              headerAlign: "center",
              className: "spacing-set"
            },{
              text: '特征',
              value: 'feature',
              width: '150',
              align: "left",
              headerAlign: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },{
              text: '单位',
              value: 'unit',
              width: '120',
              align: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },{
              text: '数量',
              value: 'sum',
              width: '120',
              align: "right",
              headerAlign: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },{
              text: '单价',
              value: 'unitPrice',
              width: '120',
              align: "right",
              headerAlign: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },{
              text: '金额',
              value: 'totalPrice',
              width: '150',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },{
              text: '摘要',
              value: 'summary',
              width: '140',
              align: "left",
              headerAlign: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            }

          ],
          countBudgetRules:{
            name:[
              {required: true, message: '请输入名称', trigger: 'change'}
            ]
          },
          /**
           * 预算选择
           * */
          countBudget: {
            visibleSync: false,
            countBudgetSelectionChange: []
          },
          isShowChecked: true
        }
      },
      deactivated() {
        this.$store.dispatch("cacheId", undefined);
      },
      activated() {
        this.$utilsBasic.loadAddAndDetailData(this, () => {
          if(this.$route.params) {
            this.countFormId = this.$route.params.id ? this.$route.params.id : undefined;
          }
          if(this.$route.query) {
            this.countForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
            this.countForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
            this.countForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
          }
          this.handleAddBtn();

        },(id) => {
          this.countFormId = id;
          this.getCount();
          this.getCountBudgetData()

        });
      },
      created() {

        //初始化数据字典
        this.getEnumData([
          'GetValidateStatusData',
          'GetIsOrNotData'
        ]);
        this.$store.dispatch("cacheId",'0');//刷新
      },
      computed: {
        deleteBtnDisabledFlag() {
          if(!this.$utils.isEmpty(this.countForm)){
            return this.countForm.validateStatus === 1;
          }else{
            return true;
          }

        },
        auditBtnDisabledFlag() {
          if(!this.$utils.isEmpty(this.countForm)){
            return this.countForm.validateStatus === 1;
          }else{
            return true;
          }
        },

        disabledFlag() {
          return this.countForm.validateStatus === 1;
        },
        deleteBudgetBtnDisabledFlag() {
          return this.currentRow === null || this.auditBtnDisabledFlag;
        },
        /**
         * 计量总额
         * */
        sumMoney:{
          get() {
            const reducer = (accumulator, currentValue) => accumulator + Number(currentValue);
            console.log('总额',this.countBudgetTableData.data.map(item =>item.totalPrice),this.countBudgetTableData.data.map(item =>item.totalPrice).reduce(reducer,0))
            return this.countBudgetTableData.data.map(item =>item.totalPrice).reduce(reducer,0)
          },
          set(){}
        }
      },
      watch: {
        countForm: {
          handler() {
            this.saveBtnDisabledFlag = false
          },
          deep: true
        },
      },
      methods: {
        /**
         * 日期转化时间戳
         * */
        formatBeginDate() {
          return this.countForm.beginDate = new Date(this.countForm.beginDate).getTime()
        },
        formatExpiryDate() {
          return this.countForm.expiryDate = new Date(this.countForm.expiryDate).getTime()
        },
        handleAddBtn() {
          this.countFormId = undefined;
          // this.countForm.proId = undefined;
          // this.countForm.proName = undefined;
          this.addCount()
          this.$refs.refCountForm.resetFields()
        },
        handleSaveBtn () {
          this.validateAfter(()=>{
            this.saveCountData()
          })
        },
        handleDeleteBtn() {
          this.$confirm(staticDataBasic.info.delete, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() =>{
            if(this.$utils.isEmpty(this.countFormId)){
              this.$set(this.countForm,'proId','')
              this.$set(this.countForm,'proName','')
              this.$set(this.countForm,'proCode','')
              this.addCount()
            }else{
              this.deleteCountData().then( () =>{
                this.$set(this.countForm,'proId','')
                this.$set(this.countForm,'proName','')
                this.$set(this.countForm,'proCode','')
                this.addCount()
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
              this.saveCountData(true).then( () =>{
                this.auditCountData()
              })
            })
          }).catch(error => {
            console.log(error)
          })
        },
        handleImportBudgetBtn(){
          if(this.$utils.isEmpty(this.countForm.contractId)){
            this.$message({message:'请先选择合同',type:'warning'})
          }else{
            this.countBudget.visibleSync = true;
            this.$nextTick(() => {
              this.saveBtnDisabledFlag = false;
            })
          }


        },
        handleAddBudgetBtn() {
          this.addCountBudget()
        },
        handleBudgetDeleteBtn(){
          this.$confirm(staticDataBasic.info.delete, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() =>{
            if(this.$utils.isEmpty(this.currentRow.id)){
              this.countBudgetTableData.data.splice(this.countBudgetTableData.data.indexOf(this.currentRow),1)
            }else{
              this.deleteCountBudgetData().then( () =>{
                this.getCountBudgetData()
              }).catch(err=>{
                console.log(err)
              })
            }
          }).catch(error => {
            console.log(error)
          })
        },

        /**
         * 预算弹框显示和隐藏
         */
        clickPersonTypeCancel() {
          this.countBudget.visibleSync = false;
        },
        selectionChangePersonType(data) {
          console.log('回传 data', data)
          this.countBudget.countBudgetSelectionChange = data.selectedRows;
        },
        /**
         * 预算弹框显示之后，确定
         * */
        clickPersonTypeOk() {
          this.countBudget.visibleSync = false;
          //数据加入到预算列表中
          const countBudgetSelectionChange = this.countBudget.countBudgetSelectionChange;
          console.log('ok后回传 预算data', countBudgetSelectionChange)
          if (countBudgetSelectionChange && countBudgetSelectionChange.length > 0) {
            let newArray = [];
            let countBudgetJson = '';
            if(this.countBudgetTableData.data && this.countBudgetTableData.data.length > 0){
              countBudgetJson = this.countBudgetTableData.data.map(item => item.code).join(',') //合同编码集合
              for(const item of countBudgetSelectionChange){
                if(countBudgetJson.indexOf(item.code) < 0) {
                  let countBudgetObj = Object.assign({}, {
                    budgetId:item.id,
                    masterId:this.countFormId,
                    code: item.code,
                    name: item.name,
                    feature: item.feature,
                    unit: item.unit,
                    sum: item.sum,
                    unitPrice: item.unitPrice,
                    totalPrice: item.totalPrice,
                    summary: item.summary
                  })
                  newArray.push(countBudgetObj)
                }
              }

            }else{
              for(const item of countBudgetSelectionChange){
                let countBudgetObj = Object.assign({}, {
                  budgetId:item.id,
                  masterId:this.countFormId,
                  code: item.code,
                  name: item.name,
                  feature: item.feature,
                  unit: item.unit,
                  sum: item.sum,
                  unitPrice: item.unitPrice,
                  totalPrice: item.totalPrice,
                  summary: item.summary
                })

                newArray.push(countBudgetObj)
              }
            }
            //预算添加至页面表格
            this.countBudgetTableData.data = newArray.concat(this.countBudgetTableData.data);
            this.countForm.detailList = this.countBudgetTableData.data
            console.log('预算添加至页面表格',this.countBudgetTableData.data)
          }
        },
        /**
         * 新增表单内容
         * */
        addCount() {
          this.countForm = {
            id: '',
            validateStatus: 2,
            proId: this.countForm.proId,
            proName: this.countForm.proName,
            proCode: this.countForm.proCode,
            name: '分包计量单',
            totalPrice:'0.00',
            ifPay:2,
            payedPrice:'0.00',
            detailList:[],
            beginDate: new Date(todayFormat()).getTime(),
            expiryDate: new Date(todayFormat()).getTime(),
          }
          this.countBudgetTableData.data=[]
          this.$refs.refCountForm.resetFields()
          console.log('this.countForm', this.countForm)
        },

        /**
         * 新增预算
         * */
        addCountBudget () {
          let addRow = {
            unitPrice:'0.0000',
            sum:'0.0000',
            totalPrice:'0.00',
            masterId:this.countFormId,
          }
          this.countBudgetTableData.data.unshift(addRow)
          this.$set(this.countForm,'detailList',this.countBudgetTableData.data)
        },
        /**
         * 保存
         * */
        saveCountData (boolean) {
         // this.countForm.detailList = this.$utils.copy(this.countBudgetTableData.data)
          this.countForm.totalPrice = this.sumMoney;
          console.log('save data',this.countForm)
          return saveCount(this.countForm).then(res =>{
            if(res.status && res.status === 200) {
              this.countFormId = res.data.id
              this.countForm = res.data
              this.countBudgetTableData.data = res.data.detailList
              //上传文件
              if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
              console.log("save count success",res)
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
          this.$refs.refCountForm.validate(valid => {
            valid ? null : result = valid
            return !result
          })
          //预算验证
          this.countBudgetTableData.data.some((item, idx) => {
            this.$refs['formName' + idx].validate(valid => {
              valid ? null : result = valid
            })

            return !result
          })
          if (result) {
            //验证
            if (typeof callback === "function") {
              callback();
            }
          } else {
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
        deleteCountData() {
          return deleteCount(this.countFormId).then((res) => {
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
         * 删除预算
         * */
        deleteCountBudgetData() {
          return deleteCountBudget(this.currentRow.id).then((res) => {
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
        auditCountData () {
          return auditCount(this.countForm).then((res) => {
            console.log('audit res', res)
            if (res.status && res.status === 200) {
              this.$message.success(res.message)
              this.countForm = res.data
              this.countBudgetTableData.data = res.data.detailList
            } else {
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
        },

        /**
         * 获取表单内容
         * */
        getCount () {
          if(this.$utils.isEmpty(this.countFormId)){
             this.addCount()
          }else{
            return getCount(this.countFormId).then(res =>{
              if(res.status && res.status === 200) {
                console.log("get countForm",res)
                this.countForm = res.data
                if(!this.$utils.isEmpty(res.data.beginDate)){
                  this.$set(this.countForm, 'beginDate',new Date(res.data.beginDate).getTime())
                }
                if(!this.$utils.isEmpty(res.data.expiryDate)){
                  this.$set(this.countForm, 'expiryDate',new Date(res.data.expiryDate).getTime())
                }

              }else{
                this.$message({message:res.message,type:'warning'})
              }
            }).catch(err=>{
              console.log(err)
            })
          }
        },


        /**
         * 获取预算
         * */
        getCountBudgetData(){
          if(this.$utils.isEmpty(this.countFormId)) {
            this.countBudgetTableData.data = []
          }else{
            this.modelSearchFilter.masterId = this.countFormId
           return getCountBudget(this.modelSearchFilter).then(res => {
              if (res.status && res.status === 200) {
                this.countBudgetTableData.data = res.data.rows
                this.$set(this.countForm,'detailList',res.data.rows)
                console.log(" getCountBudget", res)
              } else {
                this.$message({message: res.message, type: 'warning'})
              }
            }).catch(err => {
              console.log(err)
            })
          }
        },
        /**
         * 当前行
         * */
        handleCurrentChange(row) {
          console.log(row)
          this.currentRow = row
        },
        sumChange (row) {
          this.currentRow = row
          let totalPrice = row.sum * row.unitPrice
          this.$set(this.currentRow,'totalPrice',totalPrice)
          console.log('sumChange',this.currentRow.totalPrice)
        },
      /*  priceChange(unitPrice){
          let totalPrice = unitPrice * this.currentRow.sum
          this.$set(this.currentRow,'totalPrice',totalPrice)
          console.log('priceChange',this.currentRow.totalPrice)
        },*/
        /**
         * 点击显示哪种弹窗 项目  单位  合同
         * */
        toipClick(type) {
          if (this.disabled) return
          if (type == 'counterpart' && !this.countForm.proId)
            return this.$message({message:'请先选择项目',type:'warning'})
          if (type == 'contract' && !(this.countForm.proId && this.countForm.enterpriseId ))
            return this.$message({message:'请先选择项目和分包单位',type:'warning'})
          this.type = type
          this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
        },
        selectionChange(row) {
          console.log('回传row',row)
          this.selectedRow = row.selectedRow
        },

        /**
         * 弹窗传回的名称
         * */
        handleChange() {
          const row = this.selectedRow
          if(!this.isSelectedRow(row)) return false;
          if (Object.keys(row).length === 0) return
          switch (this.type) {
            case 'project':
              if(this.countForm.proId !== row.id ) {
                this.countForm = Object.assign({}, this.countForm, {
                  proName: row.name,
                  proId: row.id,
                  proCode: row.code,

                  enterpriseName:undefined,
                  enterpriseId:undefined,

                  contractName:undefined,
                  contractId:undefined,
                })
                this.countBudgetTableData.data = []
                this.$set(this.countForm,'detailList',this.countBudgetTableData.data)
              }

              break
            case 'counterpart':
              if(this.countForm.enterpriseId !== row.id ) {
                this.countForm = Object.assign({}, this.countForm, {
                  enterpriseName: row.name,
                  enterpriseId: row.id,

                  contractName:undefined,
                  contractId:undefined,
                })
                this.countBudgetTableData.data = []
                this.$set(this.countForm,'detailList',this.countBudgetTableData.data)
              }
              break
            case 'contract':
              if(this.countForm.contractId !== row.id ) {
                this.countForm = Object.assign({}, this.countForm, {
                  contractName: row.name,
                  contractId: row.id,
                })
                this.countBudgetTableData.data = []
                this.$set(this.countForm,'detailList',this.countBudgetTableData.data)
              }
              break
          }
          this.saveBtnDisabledFlag = false
          this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
        },
      }
    }
</script>

<style scoped>

</style>
