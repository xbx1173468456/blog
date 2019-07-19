<template>
  <div class="completedReportDetail-container">
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
        <el-form ref="refCompletedReportForm" class="form-container" :model="completedReportForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="completedReportForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="completedReportForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报告名称" prop="name" hide-required-asterisk>
                <el-input size="small" clearable v-model="completedReportForm.name"
                          :disabled="disabledFlag"
                          ref="refCompletedReportName"
                          placeholder="请输入报告名称"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="completedReportForm.proName"
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
              <el-form-item label="合同名称" prop="contractName" hide-required-asterisk>
                <el-input size="small"  v-model="completedReportForm.contractName"
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
            <el-col :span="8">
              <el-form-item label="项目经理">
                <el-input size="small" clearable
                          v-model="completedReportForm.projectManager" :disabled="disabledFlag" placeholder="请输入项目经理"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="计划开工日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="completedReportForm.planBeginDate"
                                type="date"
                                :disabled="disabledFlag"
                                :picker-options="pickerOptionsPlanBeginDate"
                                @change="formatPlanBeginDate"
                                placeholder="选择计划开工日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划完工日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="completedReportForm.planFinishDate"
                                type="date"
                                :disabled="disabledFlag"
                                :picker-options="pickerOptionsPlanFinishDate"
                                @change="formatPlanFinishDate"
                                placeholder="选择计划完工日期">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="计划日历天">
                <el-input size="small" clearable v-model="planDays" :disabled="true" placeholder="系统自动生成计划日历天" :min="0"/>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="实际开工日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="completedReportForm.beginDate"
                                type="date"
                                :disabled="disabledFlag"
                                :picker-options="pickerOptionsBeginDate"
                                @change="formatBeginDate"
                                placeholder="选择实际开工日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实际完工日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="completedReportForm.finishDate"
                                type="date"
                                :disabled="disabledFlag"
                                :picker-options="pickerOptionsFinishDate"
                                @change="formatFinishDate"
                                placeholder="选择实际完工日期">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="实际日历天">
                <el-input size="small" clearable v-model="days" :disabled="true" placeholder="系统自动生成计划日历天" :min="0"/>

              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="报告说明">
                <el-input size="small" clearable
                          :disabled="disabledFlag"
                          :autosize="{ minRows:6, maxRows: 8}"
                          :max="5000"
                          v-model="completedReportForm.incomeAccount" type="textarea" placeholder="请输入报告说明，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
               <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="completedReportFormId">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-form-item label="登记人员">
                <el-input size="small" clearable  v-model="completedReportForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-input size="small" clearable  v-model="completedReportForm.inputTime" :disabled="true"
                          placeholder="系统自动生成登记时间"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

    <el-dialog :visible.sync="visibleSyncProject" lock-scroll title="项目名称-选择" width="60%">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="合同-选择" :visible.sync="visibleSyncContract" width="60%" lock-scroll>
      <dialog-my-contract @selectionChange="selectionChange" filterValid v-if="visibleSyncContract"
                           :proId="completedReportForm.proId"
      ></dialog-my-contract>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
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
  import dialogMyContract from '@/views/components/dialog/dialogMyContract'
  import {staticDataBasic} from "@/assets/data/basic";
  import {todayFormat} from "@/utils";
  import {validateLength} from "@/utils/validate";

  /**
   * api
   * */

  import {
    getLastFinish,
    addLastFinish,
    amendLastFinish,
    deleteLastFinish,
    auditLastFinish,

  } from "@/api/bpmaManager/laterManager/completedManager/completedReport"

  export default {
    name: 'completedReportDetail',
    components: {
      dialogProject,
      dialogMyContract
    },
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      const _this = this
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,

        saveBtnDisabledFlag:true,
        completedReportForm:{},
        completedReportFormId:undefined,

        rules: {
          name: [
            {required: true, message: '请输入报告名称', trigger: 'change'}
          ],
          proName: [
            {required: true, message: '请选择项目名称', trigger: 'change'}
          ]
        },
        pickerOptionsPlanBeginDate:{
          disabledDate(time) {
            if(!_this.$utils.isEmpty(_this.completedReportForm.planFinishDate)){
              return time.getTime() > new Date(_this.completedReportForm.planFinishDate).getTime();
            }
          },
        },
        pickerOptionsPlanFinishDate:{
          disabledDate(time) {
            if(!_this.$utils.isEmpty(_this.completedReportForm.planBeginDate)){
              return time.getTime() < new Date(_this.completedReportForm.planBeginDate).getTime();
            }
          },
        },
        pickerOptionsBeginDate:{
          disabledDate(time) {
            if(!_this.$utils.isEmpty(_this.completedReportForm.finishDate)){
              return time.getTime() > new Date(_this.completedReportForm.finishDate).getTime();
            }
          },
        },
        pickerOptionsFinishDate:{
          disabledDate(time) {
            if(!_this.$utils.isEmpty(_this.completedReportForm.beginDate)){
              return time.getTime() < new Date(_this.completedReportForm.beginDate).getTime();
            }
          },
        },


        /**
         * 弹窗
         * */
        type: null,
        visibleSyncProject: false,
        visibleSyncContract: false,
        selectedRow: {},

      }
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if(this.$route.params) {
          this.completedReportFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.completedReportForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.completedReportForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.completedReportForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.completedReportFormId = id;
        this.getCompletedReport();
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
        if(!this.$utils.isEmpty(this.completedReportForm)){
          return this.completedReportForm.validateStatus === 1;
        }else{
          return true;
        }

      },
      auditBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.completedReportForm)){
          return this.completedReportForm.validateStatus === 1;
        }else{
          return true;
        }
      },

      disabledFlag() {
        return this.completedReportForm.validateStatus === 1;
      },

      /**
       * planDays  计划日历天
       * */
      planDays: function () {
        let planBeginDate = this.completedReportForm.planBeginDate
        let planFinishDate = this.completedReportForm.planFinishDate
        let daysRes = 0
        if (planBeginDate && planFinishDate) {
          daysRes =  Math.floor(Math.abs(planFinishDate - planBeginDate )/(1000*60*60*24)) + 1
        }
        console.log("daysRes", planBeginDate, planFinishDate, daysRes)
        return daysRes;
      },
      /**
       * days  实际日历天
       * */
      days: function () {
        let beginDate = this.completedReportForm.beginDate
        let finishDate = this.completedReportForm.finishDate
        let daysRes = 0
        if (beginDate && finishDate) {
          daysRes =  Math.floor(Math.abs(finishDate - beginDate )/(1000*60*60*24)) + 1
        }
        console.log("daysRes", beginDate, finishDate, daysRes)
        return daysRes;
      }

    },
    watch: {
      completedReportForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      },

    },
    methods: {
      handleAddBtn() {
        this.completedReportFormId = undefined;
        this.addCompletedReport()
        this.$refs.refCompletedReportForm.resetFields()
      },
      handleSaveBtn () {
        this.validateAfter(()=>{
          if(this.$utils.isEmpty(this.completedReportFormId)){
            this.saveCompletedReportData().then( () =>{
              this.getCompletedReport()
            }).catch(err=>{
              console.log(err)
            })
          }else{
            this.updateCompletedReportData().then( () =>{
              this.getCompletedReport()
            }).catch(err=>{
              console.log(err)
            })
          }

        })
      },
      handleDeleteBtn() {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>{
          if(this.$utils.isEmpty(this.completedReportFormId)){
            this.$set(this.completedReportForm,'proId','')
            this.$set(this.completedReportForm,'proName','')
            this.$set(this.completedReportForm,'proCode','')
            this.addCompletedReport()
          }else{
            this.deleteCompletedReportData().then( () =>{
              this.$set(this.completedReportForm,'proId','')
              this.$set(this.completedReportForm,'proName','')
              this.$set(this.completedReportForm,'proCode','')
              this.addCompletedReport()
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
            if(this.$utils.isEmpty(this.completedReportFormId)) {
              this.saveCompletedReportData(true).then(() => {
                this.auditCompletedReportData().then(() => {
                  this.getCompletedReport()
                })
              }).catch(error => {
                console.log(error)
              })
            }else{
              this.updateCompletedReportData(true).then(() => {
                this.auditCompletedReportData().then(() => {
                  this.getCompletedReport()
                })
              }).catch(error => {
                console.log(error)
              })
            }
          })
        }).catch(error => {
          console.log(error)
        })
      },

      /**
       * 新增表单内容
       * */
      addCompletedReport() {
        this.completedReportForm = {
          id: '',
          validateStatus: 2,
          name:'竣工报告书',
          proId: this.completedReportForm.proId,
          proName: this.completedReportForm.proName,
          proCode: this.completedReportForm.proCode,
          planBeginDate: new Date(todayFormat()).getTime(),
          planFinishDate: new Date(todayFormat()).getTime(),
          beginDate: new Date(todayFormat()).getTime(),
          finishDate: new Date(todayFormat()).getTime(),
        }
        this.$refs.refCompletedReportForm.resetFields()
        console.log('this.completedReportForm', this.completedReportForm)
      },
      /**
       * 保存
       * */
      saveCompletedReportData (boolean) {
        this.completedReportForm = Object.assign({},this.completedReportForm,{
          planDays:this.planDays,
          days:this.days
        })
        return addLastFinish(this.completedReportForm).then(res =>{
          if(res.status && res.status === 200) {
            this.completedReportFormId = res.data.id
            this.completedReportForm.id = res.data.id
            //上传文件
            if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
            console.log("save completedReport success",res)
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
       * 修改
       * */
      updateCompletedReportData (boolean) {
        this.completedReportForm = Object.assign({},this.completedReportForm,{
          planDays:this.planDays,
          days:this.days
        })
        return amendLastFinish(this.completedReportForm).then(res =>{
          if(res.status && res.status === 200) {
            console.log("update completedReport success",res)
            //上传文件
            if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
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
        this.$refs.refCompletedReportForm.validate(valid => {
          valid ? null : result = valid
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
      deleteCompletedReportData() {
        return deleteLastFinish(this.completedReportFormId).then((res) => {
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
      auditCompletedReportData () {
        return auditLastFinish(this.completedReportForm).then((res) => {
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
       * 获取表单内容
       * */
      getCompletedReport () {
        if(this.$utils.isEmpty(this.completedReportFormId)){
          this.addCompletedReport()
        }else{
          return getLastFinish(this.completedReportFormId).then(res =>{
            if(res.status && res.status === 200) {
              console.log("get completedReportForm",res)
              this.completedReportForm = res.data
              if(!this.$utils.isEmpty(res.data.beginDate)){
                this.$set(this.completedReportForm, 'planBeginDate',new Date(res.data.planBeginDate).getTime())
              }
              if(!this.$utils.isEmpty(res.data.planFinishDate)){
                this.$set(this.completedReportForm, 'planFinishDate',new Date(res.data.planFinishDate).getTime())
              }
              if(!this.$utils.isEmpty(res.data.beginDate)){
                this.$set(this.completedReportForm, 'beginDate',new Date(res.data.beginDate).getTime())
              }
              if(!this.$utils.isEmpty(res.data.finishDate)){
                this.$set(this.completedReportForm, 'finishDate',new Date(res.data.finishDate).getTime())
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
       * 点击显示哪种弹窗 项目  单位  合同
       * */
      toipClick(type) {
        if (this.disabled) return
        if (type == 'contract' && !(this.completedReportForm.proId ))
          return this.$message({message:'请先选择项目',type:'warning'})
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
            this.completedReportForm = Object.assign({},this.completedReportForm, {
              proName : row.name,
              proId : row.id,
              proCode: row.code
            } )
            break
          case 'contract':
            this.completedReportForm = Object.assign({},this.completedReportForm, {
              contractName : row.name,
              contractId : row.id,
            } )
            break
        }
        this.saveBtnDisabledFlag = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },

      /**
       * 日期转化时间戳
       * */
      formatPlanBeginDate() {
        this.completedReportForm.planBeginDate= new Date(this.completedReportForm.planBeginDate).getTime()
      },
      formatPlanFinishDate() {
        this.completedReportForm.planFinishDate= new Date(this.completedReportForm.planFinishDate).getTime()
      },
      formatBeginDate() {
        this.completedReportForm.beginDate= new Date(this.completedReportForm.beginDate).getTime()
      },
      formatFinishDate() {
        this.completedReportForm.finishDate= new Date(this.completedReportForm.finishDate).getTime()
      },
    }
  }
</script>

<style scoped>

</style>
