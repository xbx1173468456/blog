<template>
  <div class="maintRecordDetail-container">
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
        <el-form ref="refMaintRecordForm" class="form-container" :model="maintRecordForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="maintRecordForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="maintRecordForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据名称" prop="name" hide-required-asterisk>
                <el-input size="small" clearable v-model="maintRecordForm.name"
                          :disabled="disabledFlag"
                          ref="refMaintRecordName"
                          placeholder="请输入单据名称"/>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="maintRecordForm.proName"
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
                <el-input size="small"  v-model="maintRecordForm.contractName"
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
              <el-form-item label="维保费用">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="maintRecordForm.totalPrice"
                             placeholder="请输入维保费用"
                             :disabled="disabledFlag"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="其中：人工费">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="maintRecordForm.labourPrice"
                             placeholder="请输入人工费"
                             :disabled="disabledFlag"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其中：设备费">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="maintRecordForm.devicePrice"
                             placeholder="请输入设备费"
                             :disabled="disabledFlag"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其中：其他">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="maintRecordForm.otherPrice"
                             placeholder="请输入其他费用"
                             :disabled="disabledFlag"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="费用说明">
                <el-input size="small" clearable
                          v-model="maintRecordForm.priceExplain" :disabled="disabledFlag" placeholder="请输入费用说明"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="维保人员">
                <el-input size="small" clearable
                          v-model="maintRecordForm.handlePerson" :disabled="disabledFlag" placeholder="请输入维保人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否完成"  class="add-border">
                <el-radio-group v-model="maintRecordForm.ifFinish">
                  <el-radio :label="parseInt(row.code)"
                            v-for="(row, key, index) in dataEnum.isOrNot"
                            :key="row.code" :disabled="disabledFlag">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="完成日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="maintRecordForm.handleDate"
                                type="date"
                                :disabled="disabledFlag"
                                @change="changeFormatDate"
                                placeholder="选择日期" class="date-picker">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row :gutter="5">
              <el-col :span="24">
                <el-form-item label="维保部位/设备">
                  <el-input size="small" clearable
                            v-model="maintRecordForm.device" :disabled="disabledFlag" placeholder="请输入维保部位/设备"/>
                </el-form-item>
              </el-col>
            </el-row>

          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="维保内容">
                <el-input size="small" clearable
                          :disabled="disabledFlag"
                          :autosize="{ minRows:6, maxRows: 8}"
                          :max="5000"
                          v-model="maintRecordForm.content" type="textarea" placeholder="请输入维保内容，不超过5000字"/>
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
                          v-model="maintRecordForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
               <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="maintRecordFormId">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-form-item label="登记人员">
                <el-input size="small" clearable  v-model="maintRecordForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-input size="small" clearable  v-model="maintRecordForm.inputTime" :disabled="true"
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
                           :proId="maintRecordForm.proId"
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
    getLastMaintenance,
    addLastMaintenance,
    amendLastMaintenance,
    deleteLastMaintenance,
    auditLastMaintenance,

  } from "@/api/bpmaManager/laterManager/maintRecord"

  export default {
    name: 'maintRecordDetail',
    components: {
      dialogProject,
      dialogMyContract
    },
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,

        saveBtnDisabledFlag:true,
        maintRecordForm:{},
        maintRecordFormId:undefined,

        rules: {
          name: [
            {required: true, message: '请输入单据名称', trigger: 'change'}
          ],
          proName: [
            {required: true, message: '请选择项目名称', trigger: 'change'}
          ],
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
          this.maintRecordFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.maintRecordForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.maintRecordForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.maintRecordForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.maintRecordFormId = id;
        this.getMaintRecord();

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
        if(!this.$utils.isEmpty(this.maintRecordForm)){
          return this.maintRecordForm.validateStatus === 1;
        }else{
          return true;
        }

      },
      auditBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.maintRecordForm)){
          return this.maintRecordForm.validateStatus === 1;
        }else{
          return true;
        }
      },

      disabledFlag() {
        return this.maintRecordForm.validateStatus === 1;
      },
    },
    watch: {
      maintRecordForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      },

    },
    methods: {
      handleAddBtn() {
        this.maintRecordFormId = undefined;
        this.addMaintRecord()
        this.$refs.refMaintRecordForm.resetFields()
      },
      handleSaveBtn () {
        this.validateAfter(()=>{
          if(this.$utils.isEmpty(this.maintRecordFormId)){
            this.saveMaintRecordData().then( () =>{
              this.getMaintRecord()
            }).catch(err=>{
              console.log(err)
            })
          }else{
            this.updateMaintRecordData().then( () =>{
              this.getMaintRecord()
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
          if(this.$utils.isEmpty(this.maintRecordFormId)){
            this.addMaintRecord()
            this.$set(this.maintRecordForm,'proId','')
            this.$set(this.maintRecordForm,'proName','')
            this.$set(this.maintRecordForm,'proCode','')
          }else{
            this.deleteMaintRecordData().then( () =>{
              this.addMaintRecord()
              this.$set(this.maintRecordForm,'proId','')
              this.$set(this.maintRecordForm,'proName','')
              this.$set(this.maintRecordForm,'proCode','')
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
            if(this.$utils.isEmpty(this.maintRecordFormId)) {
              this.saveMaintRecordData(true).then(() => {
                this.auditMaintRecordData().then(() => {
                  this.getMaintRecord()
                })
              }).catch(error => {
                console.log(error)
              })
            }else{
              this.updateMaintRecordData(true).then(() => {
                this.auditMaintRecordData().then(() => {
                  this.getMaintRecord()
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
      addMaintRecord() {
        //this.maintRecordDateRange[0] =  new Date(todayFormat()).getTime()
        this.maintRecordForm = {
          id: '',
          validateStatus: 2,
          name:'维保记录单',
          ifFinish:1,
          proId: this.maintRecordForm.proId,
          proName: this.maintRecordForm.proName,
          proCode: this.maintRecordForm.proCode,
          totalPrice:'0.00',
          labourPrice:'0.00',
          devicePrice:'0.00',
          otherPrice:'0.00',
          handleDate:new Date(todayFormat()).getTime(),
        }
        this.$refs.refMaintRecordForm.resetFields()
        console.log('this.maintRecordForm', this.maintRecordForm)
      },
      /**
       * 保存
       * */
      saveMaintRecordData (boolean) {
        console.log('save data',this.maintRecordForm)
        return addLastMaintenance(this.maintRecordForm).then(res =>{
          if(res.status && res.status === 200) {
            this.maintRecordFormId = res.data.id
            this.maintRecordForm.id = res.data.id
            //上传文件
            if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
            console.log("save maintRecord success",res)
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
      updateMaintRecordData (boolean) {
        console.log('save data',this.maintRecordForm)
        return amendLastMaintenance(this.maintRecordForm).then(res =>{
          if(res.status && res.status === 200) {
            console.log("update maintRecord success",res)
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
        this.$refs.refMaintRecordForm.validate(valid => {
          valid ? null : result = valid
          return !result
        })

        if (result) {
          //验证
          if (typeof callback === "function") {
            callback();
          }
        } else {
          if(this.$utils.isEmpty(this.maintRecordForm.name)){
            this.$refs.refMaintRecordName.focus()
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
      deleteMaintRecordData() {
        return deleteLastMaintenance(this.maintRecordFormId).then((res) => {
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
      auditMaintRecordData () {
        return auditLastMaintenance(this.maintRecordForm).then((res) => {
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
      getMaintRecord () {
        if(this.$utils.isEmpty(this.maintRecordFormId)){
          this.addMaintRecord()
        }else{
          return getLastMaintenance(this.maintRecordFormId).then(res =>{
            if(res.status && res.status === 200) {
              console.log("get maintRecordForm",res)
              this.maintRecordForm = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      changeFormatDate(date){
        this.maintRecordForm.handleDate = new Date(date).getTime()
      },

      /**
       * 点击显示哪种弹窗 项目    合同
       * */
      toipClick(type) {
        if (this.disabled) return
        if (type == 'contract' && !this.maintRecordForm.proId)
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
            this.maintRecordForm = Object.assign({},this.maintRecordForm, {
              proName : row.name,
              proId : row.id,
              proCode: row.code
            } )
            break
          case 'contract':
            this.maintRecordForm = Object.assign({},this.maintRecordForm, {
              contractName : row.name,
              contractId : row.id,
            } )
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
