<template>
  <div class="labourDetail-container">
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
        <el-form ref="refLabourForm" class="form-container" :model="labourForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="labourForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="labourForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据名称" prop="name" hide-required-asterisk>
                <el-input size="small" clearable v-model="labourForm.name" :disabled="disabledFlag"
                          placeholder="请输入单据名称"/>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="labourForm.proName"
                          readOnly
                          placeholder="请选择项目名称" :disabled="disabledFlag">
                  <el-button
                    size="small"
                    slot="append"
                    icon="el-icon-plus"

                    :disabled="disabledFlag" @click="toipClick('project')"></el-button>
                </el-input>

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分包单位" prop="enterpriseName" hide-required-asterisk>
                <el-input size="small" v-model="labourForm.enterpriseName"
                          readOnly
                          placeholder="请选择分包单位" :disabled="disabledFlag">
                  <el-button
                    size="small"
                    slot="append"
                    icon="el-icon-plus"

                    :disabled="disabledFlag" @click="toipClick('counterpart')"></el-button>
                </el-input>

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同名称" prop="contractName" hide-required-asterisk>
                <el-input size="small"  v-model="labourForm.contractName"
                          readOnly
                          placeholder="请选择合同名称" :disabled="disabledFlag">
                  <el-button size="small"
                             slot="append"
                             icon="el-icon-plus"

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
                                v-model="labourForm.beginDate"
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
                                v-model="labourForm.expiryDate"
                                type="date"
                                :disabled="disabledFlag"
                                :picker-options="pickerOptionsExpiryDate"
                                @change="formatExpiryDate"
                                placeholder="选择截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用工总额">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="sumMoney"
                             placeholder="系统自动生成用工总额"
                             :disabled="true"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="是否结算" prop="ifPay" class="add-border" >

                <el-radio-group v-model="labourForm.ifPay">
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
                             v-model="labourForm.payedPrice"
                             placeholder="系统自动生成结算金额"
                             :disabled="true"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算单号">
                <el-input size="small" clearable v-model="labourForm.payedCode" :disabled="true" placeholder="系统自动生成结算单号"/>
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
                          v-model="labourForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
               <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="labourFormId">
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
      <el-button v-if="addPersonBtnShowFlag" :disabled="disabledFlag"
                 type="primary" plain icon="el-icon-plus" size="small"
                 @click="handleAddPersonBtn" plain>新增人员
      </el-button>
      <el-button v-if="deletePersonBtnShowFlag"
                 type="danger" icon="el-icon-delete" size="small" plain
                 :disabled="deletePersonBtnDisabledFlag"
                 @click="handlePersonDeleteBtn">删除
      </el-button>
    </basic-handler>
    <basic-table ref="refLabourPersonTableData"
                 :isPagination ="false"
                 :dataTable="labourPersonTableData"
                 :columns="columns"
                 :pagination="modelSearchFilter"
                 @current-change="handleCurrentChange"
                 @pagination="getLabourPersonData"
                 >
      <template slot-scope="obj" slot="name">
        <el-form :model="labourPersonTableData.data[obj.scope.$index]" :ref="'formName' + obj.scope.$index" :rules="labourPersonRules"
                 :show-message="false">
          <el-form-item prop="name">
            <el-input clearable size="small"   placeholder="请输入姓名"
                      v-model="obj.scope.row.name"
                      :disabled="disabledFlag"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="obj" slot="gender">
        <el-select size="small" v-model="obj.scope.row.gender"
                   placeholder="请选择性别！" :disabled="disabledFlag">
          <el-option
            v-for="item in dataEnum.gender"
            :key="item.code"
            :label="item.name"
            :value="parseInt(item.code)">
          </el-option>
        </el-select>
      </template>
      <template slot-scope="obj" slot="identityNumber">
        <el-input clearable size="small"   placeholder="请输入身份证号" prop="identityNumber"
                  v-model="obj.scope.row.identityNumber"
                  maxlength="18"
                  :disabled="disabledFlag"></el-input>
      </template>
      <template slot-scope="obj" slot="age">
        <el-input clearable size="small"   placeholder="请输入年龄"
                  v-model="obj.scope.row.age"
                  :disabled="disabledFlag"></el-input>
      </template>
      <template slot-scope="obj" slot="telephone">
        <el-input clearable size="small"   placeholder="请输入电话" prop="telephone"
                  v-model="obj.scope.row.telephone" maxlength="11"
                  :disabled="disabledFlag"></el-input>
      </template>
      <template slot-scope="obj" slot="days">
        <el-input clearable size="small"
                     v-model="obj.scope.row.days"  placeholder="请输入用工天数"
                     :disabled="disabledFlag" @change="daysChange(obj.scope.row)"></el-input>
      </template>
      <template slot-scope="obj" slot="unitPrice">
        <basic-input clearable size="small"
                     :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
                     v-model="obj.scope.row.unitPrice" placeholder="请输入用工单价"
                     :disabled="disabledFlag" @change="daysChange(obj.scope.row)"></basic-input>
      </template>
      <template slot-scope="obj" slot="totalPrice">
        {{formatToThousands(obj.scope.row.totalPrice)}}
      </template>
      <template slot-scope="obj" slot="content">
        <el-input clearable size="small"   placeholder="请输入工作内容"
                  v-model="obj.scope.row.content"
                  :disabled="disabledFlag"></el-input>
      </template>
      <!--todo: 人员类型  树形下拉样式优化 -->
      <template slot-scope="obj" slot="typeName">
        <el-input readOnly size="small"   placeholder="请选择人员类型"
                  v-model="obj.scope.row.typeName"
                  :disabled="disabledFlag">
          <el-button
            size="small"
            slot="append"
            icon="el-icon-plus"

            :disabled="disabledFlag" @click="handlePersonType"></el-button>
        </el-input>
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
                           :proId="labourForm.proId"
                           :oppositeEnterpriseId = labourForm.enterpriseId
      ></dialog-sub-contract>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </el-dialog>

    <!--引入人员弹窗-->
    <basic-dialog v-el-drag-dialog title="引入人员-选择" :visible.sync="personType.visibleSync" >
      <dialog-person-type ref="refDialogPersonType" :personTypeData="labourPersonTableData.data"
                          :isShowChecked="isShowChecked"
                          @selectionChange="selectionChangePersonType"></dialog-person-type>
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
  import dialogPersonType from '@/views/components/dialog/dialogPersonType/index.vue'
  import {staticDataBasic} from "@/assets/data/basic";
  import {todayFormat} from "@/utils";
  import {validateIdCard, validateMobilePhone,validateLength} from "@/utils/validate";
  /**
   * api
   * */

  import {
    getLabour,
    saveLabour,
    deleteLabour,
    auditLabour,
    getLabourPerson,
    deleteLabourPerson
  } from "@/api/bpmaManager/subpackage/subValue/labour/index.js"

    export default {
        name: 'LabourDetail',
      components: {
        dialogProject,
        dialogMyUnit,
        dialogTransitUnit,
        dialogSubContract,
        dialogPersonType
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

          addPersonBtnShowFlag: true,// 人员待系统菜单配置
          deletePersonBtnShowFlag: true,
          saveBtnDisabledFlag:true,
          labourForm:{},
          labourFormId:undefined,
          pickerOptionsBeginDate:{
            disabledDate(time) {
              if(!_this.$utils.isEmpty(_this.labourForm.expiryDate)){
                return time.getTime() > new Date(_this.labourForm.expiryDate).getTime();
              }
            },
          },
          pickerOptionsExpiryDate:{
            disabledDate(time) {
              if(!_this.$utils.isEmpty(_this.labourForm.beginDate)){
                return time.getTime() < new Date(_this.labourForm.beginDate).getTime();
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
           * 人员
           * */
          labourPersonTableData: {
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
              text: '姓名(*)',
              value: 'name',
              width: '130',
              align: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            }, {
              text: '性别',
              value: 'gender',
              width: '130',
              align: "center",
              className: "spacing-set"
            },{
              text: '身份证号',
              value: 'identityNumber',
              width: '210',
              align: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },{
              text: '年龄',
              value: 'age',
              width: '80',
              align: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },{
              text: '电话',
              value: 'telephone',
              width: '140',
              align: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },{
              text: '用工天数',
              value: 'days',
              width: '80',
              align: "center",
              headerAlign: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },{
              text: '用工单价',
              value: 'unitPrice',
              width: '140',
              align: "right",
              headerAlign: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },{
              text: '用工金额',
              value: 'totalPrice',
              width: '140',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },{
              text: '工作内容',
              value: 'content',
              minWidth: 140,
              align: "left",
              headerAlign: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },{
              text: '人员类型',
              value: 'typeName',
              width: '200',
              align: "left",
              headerAlign: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },{
              text: '摘要',
              value: 'summary',
              width: '140',
              align: "left",
              headerAlign: "center",
              className: "spacing-set",
              showOverflowTooltip:true
            },

          ],
          labourPersonRules:{
            name:[
              {required: true,
                validator: (rule, value, callback) => {
                  validateLength(rule, value, callback, true, ['姓名', 1, 20]);
                },
                trigger: 'change'}
            ],
            identityNumber:[
              {
                validator: (rule, value, callback) => {
                  validateIdCard(rule, value, callback, false, ['身份证号']);
                },
                trigger: 'change'
              }
            ],
            telephone:[
              {
                validator: (rule, value, callback) => {
                  validateMobilePhone(rule, value, callback, false, ['电话']);
                },
                trigger: 'change'
              }
            ]
          },
          /**
           * 人员选择
           * */
          personType: {
            visibleSync: false,
            personTypeSelectionChange: null
          },
          isShowChecked:false
        }
      },
      deactivated() {
        this.$store.dispatch("cacheId", undefined);
      },
      activated() {
        this.$utilsBasic.loadAddAndDetailData(this, () => {
          if(this.$route.params) {
            this.labourFormId = this.$route.params.id ? this.$route.params.id : undefined;
          }
          if(this.$route.query) {
            this.labourForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
            this.labourForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
            this.labourForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
          }
          this.handleAddBtn();

        },(id) => {
          this.labourFormId = id;
          this.getLabour();
          this.getLabourPersonData()
        });
      },
      created() {

        //初始化数据字典
        this.getEnumData([
          'GetValidateStatusData',
          'GetGenderData',
          'GetIsOrNotData'
        ]);
        this.$store.dispatch("cacheId",'0');//刷新
      },
      computed: {
        deleteBtnDisabledFlag() {
          if(!this.$utils.isEmpty(this.labourForm)){
            return this.labourForm.validateStatus === 1;
          }else{
            return true;
          }

        },
        auditBtnDisabledFlag() {
          if(!this.$utils.isEmpty(this.labourForm)){
            return this.labourForm.validateStatus === 1;
          }else{
            return true;
          }
        },

        disabledFlag() {
          return this.labourForm.validateStatus === 1;
        },
        deletePersonBtnDisabledFlag() {
          return this.currentRow === null || this.auditBtnDisabledFlag;
        },
        /**
         * 用工总额
         * */
        sumMoney:{
          get() {
            const reducer = (accumulator, currentValue) => accumulator + Number(currentValue);
            console.log('总额',this.labourPersonTableData.data.map(item =>item.totalPrice),this.labourPersonTableData.data.map(item =>item.totalPrice).reduce(reducer,0))
            return this.labourPersonTableData.data.map(item =>item.totalPrice).reduce(reducer,0)
          },
          set(){}
        }
      },
      watch: {
        labourForm: {
          handler() {
            this.saveBtnDisabledFlag = false
          },
          deep: true
        }
      },
      methods: {
        /**
         * 日期转化时间戳
         * */
        formatBeginDate() {
          return this.labourForm.beginDate = new Date(this.labourForm.beginDate).getTime()
        },
        formatExpiryDate() {
          return this.labourForm.expiryDate = new Date(this.labourForm.expiryDate).getTime()
        },

        handleAddBtn() {
          this.labourFormId = undefined;
          // this.labourForm.proId = undefined;
          // this.labourForm.proName = undefined;
          this.addLabour()
          this.$refs.refLabourForm.resetFields()
        },
        handleSaveBtn () {
          this.validateAfter(()=>{
            this.saveLabourData()
          })
        },
        handleDeleteBtn() {
          this.$confirm(staticDataBasic.info.delete, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() =>{
            if(this.$utils.isEmpty(this.labourFormId)){
              this.$set(this.labourForm,'proId','')
              this.$set(this.labourForm,'proName','')
              this.$set(this.labourForm,'proCode','')
              this.addLabour()
            }else{
              this.deleteLabourData().then( () =>{
                this.$set(this.labourForm,'proId','')
                this.$set(this.labourForm,'proName','')
                this.$set(this.labourForm,'proCode','')
                this.addLabour()
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
              this.saveLabourData(true).then( () =>{
                this.auditLabourData()
              })
            })
          }).catch(error => {
            console.log(error)
          })
        },

        handleAddPersonBtn() {
          this.addLabourPerson()
        },
        handlePersonDeleteBtn(){
          this.$confirm(staticDataBasic.info.delete, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() =>{
            this.deleteByIdData( this.labourPersonTableData.data, this.currentRow,(allData,data)=>{
              this.$set(this.labourForm,'detailList',allData)//所有数据（删除时，只改变删除数据的状态，点保存后才删除）
              this.labourPersonTableData.data = data; //除去需要删除的数据
            });
          }).catch(error => {
            console.log(error)
          })
        },

        /**
         * 人员类型
         * */
        handlePersonType(){
          this.personType.visibleSync = true;
          this.$nextTick(() => {
            this.saveBtnDisabledFlag = false;
          })
        },

        /**
         * 人员弹框显示和隐藏
         */
        clickPersonTypeCancel() {
          this.personType.visibleSync = false;
        },
        selectionChangePersonType(data) {
          console.log('回传 data', data)

          this.personType.personTypeSelectionChange = data.selectedRow;

        },
        /**
         * 人员弹框显示之后，确定
         */
        clickPersonTypeOk() {
          this.personType.visibleSync = false;
          this.$set(this.currentRow,'typeName',this.personType.personTypeSelectionChange.name)
          this.$set(this.currentRow,'typeId',this.personType.personTypeSelectionChange.id)
          this.$set(this.currentRow,'typeCode',this.personType.personTypeSelectionChange.code)
          console.log('当前行人员类型',this.currentRow,this.currentRow.typeName)
        },


        /**
         * 新增表单内容
         * */
        addLabour() {
          this.labourForm = {
            id: '',
            validateStatus: 2,
            proId: this.labourForm.proId,
            proName: this.labourForm.proName,
            proCode: this.labourForm.proCode,
            name: '用工记录单',
            totalPrice:'0.00',
            ifPay:2,
            payedPrice:'0.00',
            detailList:[],
            beginDate: new Date(todayFormat()).getTime(),
            expiryDate: new Date(todayFormat()).getTime(),
          }
          this.labourPersonTableData.data=[]
          this.$refs.refLabourForm.resetFields()
          console.log('this.labourForm', this.labourForm)
        },

        /**
         * 新增人员
         * */
        addLabourPerson () {
          let addRow = {
            days:'1',
            unitPrice:'0.0000',
            totalPrice:'0.00',
            masterId:this.labourFormId,
          }
          this.labourPersonTableData.data.unshift(addRow)
          this.$set(this.labourForm,'detailList',this.labourPersonTableData.data)
        },
        /**
         * 保存
         * */
        saveLabourData (boolean) {
          this.labourForm.beginDate = this.labourForm.beginDate ? this.labourForm.beginDate: null
          this.labourForm.expiryDate =this.labourForm.expiryDate ? this.labourForm.expiryDate: null
          this.labourForm.totalPrice = this.sumMoney;
          console.log('save data',this.labourForm)
          return saveLabour(this.labourForm).then(res =>{

            if(res.status && res.status === 200) {
              this.labourFormId = res.data.id
              this.labourForm = res.data
              this.labourPersonTableData.data = res.data.detailList
              //上传文件
              if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
              console.log("save labour success",res)
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
          this.$refs.refLabourForm.validate(valid => {
            valid ? null : result = valid
            return !result
          })
          //人员验证
          this.labourPersonTableData.data.some((item, idx) => {
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
        deleteLabourData() {
          return deleteLabour(this.labourFormId).then((res) => {
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
         * 删除人员
         * */
        deleteLabourPersonData() {
          return deleteLabourPerson(this.currentRow.id).then((res) => {
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
        auditLabourData () {
          return auditLabour(this.labourForm).then((res) => {
            console.log('audit res', res)
            if (res.status && res.status === 200) {
              this.$message.success(res.message)
              this.labourForm = res.data
              this.labourPersonTableData.data = res.data.detailList
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
        getLabour () {
          if(this.$utils.isEmpty(this.labourFormId)){
             this.addLabour()
          }else{
            return getLabour(this.labourFormId).then(res =>{
              if(res.status && res.status === 200) {
                console.log("get labourForm",res)
                this.labourForm = res.data
                if(!this.$utils.isEmpty(res.data.beginDate)){
                  this.$set(this.labourForm, 'beginDate',new Date(res.data.beginDate).getTime())
                }
                if(!this.$utils.isEmpty(res.data.expiryDate)){
                  this.$set(this.labourForm, 'expiryDate',new Date(res.data.expiryDate).getTime())
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
         * 获取人员
         * */
        getLabourPersonData(){
          if(this.$utils.isEmpty(this.labourFormId)) {
            this.labourPersonTableData.data = []
          }else{
            this.modelSearchFilter.masterId = this.labourFormId
           return getLabourPerson(this.modelSearchFilter).then(res => {
              if (res.status && res.status === 200) {
                this.labourPersonTableData.data = res.data.rows
                this.labourForm.detailList = res.data.rows
                console.log(" getLabourPerson", res)
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
        daysChange (row) {
          this.currentRow = row
          this.currentRow.totalPrice = row.days * row.unitPrice
          console.log('daysChange',this.currentRow,this.currentRow.totalPrice)
        },
       /* priceChange(unitPrice){
          this.currentRow.totalPrice = unitPrice * this.currentRow.days
          console.log('priceChange',this.currentRow.totalPrice)
        },*/
        /**
         * 点击显示哪种弹窗 项目  单位  合同
         * */
        toipClick(type) {
          if (this.disabled) return
          if (type == 'counterpart' && !this.labourForm.proId)
            return this.$message({message:'请先选择项目',type:'warning'})
          if (type == 'contract' && !(this.labourForm.proId && this.labourForm.enterpriseId ))
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
              if(this.labourForm.proId !== row.id ) {
                this.labourForm = Object.assign({}, this.labourForm, {
                  proName: row.name,
                  proId: row.id,
                  proCode: row.code,

                  enterpriseName:undefined,
                  enterpriseId:undefined,

                  contractName:undefined,
                  contractId:undefined,
                })
              }
              break
            case 'counterpart':
              if(this.labourForm.enterpriseId !== row.id ) {
                this.labourForm = Object.assign({}, this.labourForm, {
                  enterpriseName: row.name,
                  enterpriseId: row.id,

                  contractName:undefined,
                  contractId:undefined,
                })
              }
              break
            case 'contract':
              if(this.labourForm.contractId !== row.id ) {
                this.labourForm = Object.assign({}, this.labourForm, {
                  contractName: row.name,
                  contractId: row.id,
                })
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
