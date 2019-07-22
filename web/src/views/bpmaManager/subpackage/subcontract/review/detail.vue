<template>
    <div class="reviewDetail-container">
      <div class="handler-container">
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
      </div>
      <el-form ref="refReviewForm" class="form-container" :model="reviewForm"
               label-width="120px" :rules="rules" :show-message="false">
        <el-row :gutter="5">
          <el-col :span="8">
            <basic-validate-status :model="reviewForm"></basic-validate-status>
          </el-col>
          <el-col :span="8">
            <el-form-item label="评审单号">
              <el-input size="small" clearable v-model="reviewForm.code" :disabled="true" placeholder="系统自动生成评审单号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
              <el-input size="small" v-model="reviewForm.proName"
                        readOnly
                        placeholder="请选择项目名称" :disabled="disabledFlag">
                <el-button size="small"
                           slot="append"
                           icon="el-icon-plus"
                           class="form-btn"
                           :disabled="disabledFlag" @click="toipClick('project')"></el-button>
              </el-input>

            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="合同名称" prop="name" hide-required-asterisk>
              <el-input size="small" clearable
                        ref="refName"
                        v-model="reviewForm.name" :disabled="disabledFlag"
                        placeholder=""/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="价税合计金额">
              <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                         clearable
                         v-model="reviewForm.beforeTaxPrice"
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
                         v-model="reviewForm.invoiceType"
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
                         v-model="reviewForm.invoiceTaxRate"
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
              <el-input size="small" v-model="reviewForm.ourEnterpriseName"
                        readOnly
                        placeholder="请选择我方机构" :disabled="disabledFlag">
                <el-button size="small"
                           slot="append"
                           icon="el-icon-plus"
                           class="form-btn"
                           :disabled="disabledFlag" @click="toipClick('meMechanism')"></el-button>
              </el-input>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="对方单位" prop="oppositeEnterpriseName" hide-required-asterisk >
              <el-input size="small" v-model="reviewForm.oppositeEnterpriseName"
                        readOnly
                        placeholder="请选择对方单位" :disabled="disabledFlag">
                <el-button size="small"
                           slot="append"
                           icon="el-icon-plus"
                           class="form-btn"
                           :disabled="disabledFlag" @click="toipClick('counterpart')"></el-button>
              </el-input>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="三方单位">
              <el-input size="small" v-model="reviewForm.thirdEnterpriseName"
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
            <el-form-item label="计价方式" >
              <el-select size="small" class="mode-select"
                         v-model="reviewForm.computeMode"
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
                         v-model="reviewForm.progressPricePayScale"
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
                         v-model="reviewForm.qualityAssurancePriceScale"
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
          <el-col :span="8">
            <el-form-item label="起草人员" >
              <el-input size="small" clearable v-model="reviewForm.draftPerson" :disabled="disabledFlag"
                        placeholder="请输入起草人员"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承办人员">
              <el-input size="small" clearable v-model="reviewForm.handlePerson" :disabled="disabledFlag"
                        placeholder="请输入承办人员"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否生成合同" prop="ifContract" class="add-border">
              <el-radio-group v-model="reviewForm.ifContract">
                <el-radio :label="parseInt(row.code)"
                          v-for="(row, key, index) in dataEnum.isOrNot"
                          :key="row.code" :disabled="disabledFlag">
                  {{ row.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item label="合同正文">
              <el-input size="small" clearable
                        :disabled="disabledFlag"
                        :autosize="{ minRows:6, maxRows: 8}"
                        :max="5000"
                        v-model="reviewForm.contractContent" type="textarea" placeholder="请输入合同正文，不超过5000字"/>
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
                        v-model="reviewForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item label="附件" class="add-border file">
             <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="reviewFormId">
              </basic-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="16">
            <el-form-item label="登记人员">
              <el-input size="small" clearable  v-model="reviewForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记时间">
              <el-input size="small" clearable  v-model="reviewForm.inputTime" :disabled="true" placeholder="系统自动生成登记时间"/>
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
    </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogMyUnit from '@/views/components/dialog/dialogMyUnit'
  import dialogTransitUnit from '@/views/components/dialog/dialogTransitUnit'
  import formatBasic from '@/utils/mixins/formatBasic'
  import {staticDataBasic} from "@/assets/data/basic";
  /**
   * api
   * */
  import {
    getAllSubContractReviewItem,
    getSubContractReview,
    saveSubContractReview,
    updateSubContractReview,
    deleteSubContractReview,
    auditSubContractReview,
    getOurEnterprise,
    getEnterprise
  } from '@/api/bpmaManager/subpackage/subcontract/review/index.js'
  import {getDictionaryDataByTypeFilter} from '@/api/common/dataDictionary.js'
    export default {
        name: 'ReviewDetail',
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


          reviewFormId: undefined,
          reviewForm: {
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

          type: null,
          visibleSyncProject: false,
          visibleSyncMeMechanism: false,
          visibleSyncCounterpart: false,
          visibleSyncTripartiteUnit: false,
          selectedRow: {},

        }
      },
      deactivated() {
        this.$store.dispatch("cacheId", undefined);
      },
      activated() {
        this.$utilsBasic.loadAddAndDetailData(this, () => {
          if(this.$route.params) {
            this.reviewFormId = this.$route.params.id ? this.$route.params.id : undefined;
          }
          if(this.$route.query) {
            this.reviewForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
            this.reviewForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
            this.reviewForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
          }
          this.handleAddBtn();

        },(id) => {
          this.reviewFormId = id;
          this.getReview();

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
      mounted() {
        setTimeout(() => {

         /* this.getAllItem();*/
          this.getcomputeModeList()
          this.getinvoiceTypeList()
        }, 100)

      },
      computed: {
        deleteBtnDisabledFlag() {
          return this.reviewForm.validateStatus === 1;
        },
        auditBtnDisabledFlag() {
          return this.reviewForm.validateStatus === 1;
        },

        disabledFlag() {
          return this.reviewForm.validateStatus === 1;
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
            let beforeTaxPrice = Number(this.reviewForm.beforeTaxPrice)
            let invoiceTaxRate = Number(this.reviewForm.invoiceTaxRate)
            let computedRes = beforeTaxPrice / (invoiceTaxRate + 1)
            let res = isNaN(computedRes) ? '0.00' : computedRes.toFixed(2)
            return res
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
            if(this.reviewForm.invoiceType == '增值税专用发票'){
              let beforeTaxPrice = Number(this.reviewForm.beforeTaxPrice)
              let invoiceTaxRate = Number(this.reviewForm.invoiceTaxRate)
              let computedRes = beforeTaxPrice / (invoiceTaxRate + 1) * invoiceTaxRate
              let res = isNaN(computedRes) ? '0.00' : computedRes.toFixed(2)

              return res
            }else{
              return '0.00'
            }

          },
          set: function () {
          }
        }
      },
      watch: {
        reviewForm: {
          handler() {
            this.saveBtnDisabledFlag = false
          },
          deep: true
        },

      },
      methods: {
        handleAddBtn() {
          this.reviewFormId = undefined;
          // this.reviewForm.proId = undefined;
          // this.reviewForm.proName = undefined;
          this.addReview();
          this.$refs.refReviewForm.resetFields();
          this.$nextTick(() => {
            // this.saveBtnDisabledFlag = true;
          })
        },
        handleSaveBtn() {

          if (this.$utils.isEmpty(this.reviewFormId)) {
            this.$refs.refReviewForm.validate((valid) => {
              if (valid) {
                this.saveReviewForm().then(() => {
                  this.getReview()
                })
              } else {
                if(this.$utils.isEmpty(this.reviewForm.name)){
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

            this.updateReviewForm();
          }

        },
        handleDeleteBtn() {
          this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.$utils.isEmpty(this.reviewFormId)) {
              this.$set(this.reviewForm,'proId','')
              this.$set(this.reviewForm,'proName','')
              this.$set(this.reviewForm,'proCode','')
              this.addReview()
            } else {
              this.deleteReviewForm().then(() => {
                this.$set(this.reviewForm,'proId','')
                this.$set(this.reviewForm,'proName','')
                this.$set(this.reviewForm,'proCode','')
                this.addReview()
              }).catch(error => {
                console.log(error)
              })
            }
          }).catch(error => {
            console.log(error)
          })

        },
        handleAuditBtn() {
          if (this.$utils.isEmpty(this.reviewFormId)) {
            this.$refs.refReviewForm.validate((valid) => {
              if (valid) {
                this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {

                  this.saveReviewForm(true).then(() => {
                    this.auditReviewForm().then(() => {

                      console.log('id', this.reviewForm.id)
                      this.getReview()
                    })
                  })

                }).catch((error) => {
                  console.log(error)
                })
              } else {
                return false;
              }
            })
          } else {
            this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              this.updateReviewForm(true).then( () =>{
                this.auditReviewForm().then(() => {
                  this.getReview()
                })
              })


            }).catch((error) => {
              console.log(error)
            })
          }
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
              this.reviewForm = Object.assign({},this.reviewForm, {
                proName : row.name,
                proId : row.id,
                proCode : row.code
              } )
              break
            case 'meMechanism':
              this.reviewForm = Object.assign({},this.reviewForm, {
                ourEnterpriseName : row.name,
                ourEnterpriseId : row.id,
                ourEnterpriseCode : row.code
              } )
              break
            case 'counterpart':
              this.reviewForm = Object.assign({},this.reviewForm, {
                oppositeEnterpriseName : row.name,
                oppositeEnterpriseId : row.id,
                oppositeEnterpriseCode : row.code
              } )
              break
            case 'tripartiteUnit':
              this.reviewForm = Object.assign({},this.reviewForm, {
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
        addReview() {

          this.reviewForm = {
            id: '',
            proName:this.reviewForm.proName,
            proId:this.reviewForm.proId,
            proCode :this.reviewForm.proCode ,
            validateStatus: 2,
            beforeTaxPrice: '0.00',
            invoiceType:'无',
            invoiceTaxRate:'0.00',
            afterTaxPrice:'0.00',
            tax:'0.00',
            progressPricePayScale: '0.00',
            qualityAssurancePriceScale: '0.00',
            ifContract:2
          };
          this.reviewForm.afterTaxPrice = this.afterTaxPrice
          console.log('this.reviewForm.afterTaxPrice',this.reviewForm.afterTaxPrice)
          this.reviewForm.tax = this.tax;
          this.$refs.refName.focus()
          this.$nextTick( () =>{
            // this.saveBtnDisabledFlag =true
          })
          console.log('this.reviewForm', this.reviewForm)

        },
        changeInvoiceTaxRate(){
          if(this.reviewForm.invoiceTaxRate < 0 ){
            this.reviewForm.invoiceTaxRate = '0'
            this.$message({message:staticDataBasic.info.invoiceTaxRate,type:'warning'})
          }
          if( this.reviewForm.invoiceTaxRate > 1){
            this.reviewForm.invoiceTaxRate = '1'
            this.$message({message:staticDataBasic.info.invoiceTaxRate,type:'warning'})
          }
        },
        changeProgressPricePayScale(){
          if(this.reviewForm.progressPricePayScale < 0 ){
            this.reviewForm.progressPricePayScale = '0'
            this.$message({message:staticDataBasic.info.progressPricePayScale,type:'warning'})
          }
          if( this.reviewForm.progressPricePayScale > 1){
            this.reviewForm.progressPricePayScale = '1'
            this.$message({message:staticDataBasic.info.progressPricePayScale,type:'warning'})
          }
        },
        changeAssurancePriceScale(){
          if(this.reviewForm.qualityAssurancePriceScale < 0 ){
            this.reviewForm.qualityAssurancePriceScale = '0'
            this.$message({message:staticDataBasic.info.qualityAssuranceScale,type:'warning'})
          }
          if( this.reviewForm.qualityAssurancePriceScale > 1){
            this.reviewForm.qualityAssurancePriceScale = '1'
            this.$message({message:staticDataBasic.info.qualityAssuranceScale,type:'warning'})
          }
        },
        /**
         * 获取表单内容
         * */
        getReview() {
          if (this.reviewFormId) {
            return getSubContractReview(this.reviewFormId)
              .then((res) => {
                if (res.rel) {

                  console.log('表单内容', res)
                  this.reviewForm = res.data
                  this.$nextTick( () =>{
                    // this.saveBtnDisabledFlag =true
                  })
                } else {
                  this.$message({message: res.message, type: 'warning'})
                }
              }).catch(error => {
                console.log(error)
              })
          } else {
            this.addReview()
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
         * save reviewForm
         * */
        saveReviewForm(boolean) {
          this.reviewForm.afterTaxPrice = this.afterTaxPrice
          this.reviewForm.tax = this.tax
          const saveFormData = this.$utils.copy(this.reviewForm);
          return saveSubContractReview(saveFormData)
            .then((res) => {
              if (res.status && res.status === 200) {
                console.log('保存成功', res);
                this.reviewForm.id = res.data.id;
                this.reviewFormId = res.data.id;
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
         * 修改 reviewForm
         * */
        updateReviewForm(boolean) {

          this.reviewForm.afterTaxPrice = this.afterTaxPrice
          this.reviewForm.tax = this.tax
          const updateFormData = this.$utils.copy(this.reviewForm);
          return updateSubContractReview(updateFormData)
            .then((res) => {
              if (res.status && res.status === 200) {
                console.log('修改成功', res);
                // this.reviewForm.id = res.data.id;
                // this.reviewFormId = res.data.id;
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
         * delete reviewForm
         * */
        deleteReviewForm() {
          return deleteSubContractReview(this.reviewFormId)
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
         * audit reviewForm
         * */
        auditReviewForm() {

          console.log('this.reviewForm', this.reviewForm)

          return auditSubContractReview(this.reviewForm)
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
         * 获取详情页分包项目所有数据
         * */
        getAllItem() {
          this.titleData = this.proTitleData;
          return getAllSubContractReviewItem(this.modelSearchFilter).then((res) => {

            if (res.status && res.status === 200) {
              //  console.log('获取详情页分包项目所有数据',res)

              this.popData = res.data.rows;

              // console.log('详情页popData',this.popData)
            } else {
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
        },


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
