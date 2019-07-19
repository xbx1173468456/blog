<template>
  <div class="punishDetail-container">
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
        <el-form ref="refPunishForm" class="form-container" :model="punishForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="punishForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="punishForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="扣罚名称" prop="name" hide-required-asterisk>
                <el-input size="small" clearable v-model="punishForm.name"
                          :disabled="disabledFlag"
                          ref="refPunishName"
                          placeholder="请输入扣罚名称"/>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="punishForm.proName"
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
                <el-input size="small" v-model="punishForm.enterpriseName"
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
                <el-input size="small"  v-model="punishForm.contractName"
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
              <el-form-item label="经办人员">
                <el-input size="small" clearable
                          v-model="punishForm.handlePerson" :disabled="disabledFlag" placeholder="请输入签证人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="扣罚日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="punishForm.handleDate"
                                type="date"
                                :disabled="disabledFlag"
                                @change="changeFormatDate"
                                placeholder="选择日期" class="date-picker">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="扣罚金额">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="punishForm.price"
                             placeholder="请输入扣罚金额"
                             :disabled="disabledFlag"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="是否结算" prop="ifPay" class="add-border" >

                <el-radio-group v-model="punishForm.ifPay">
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
                             v-model="punishForm.payedPrice"
                             placeholder="系统自动生成结算金额"
                             :disabled="true"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算单号">
                <el-input size="small" clearable v-model="punishForm.payedCode" :disabled="true" placeholder="系统自动生成结算单号"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="扣罚事由">
                <el-input size="small" clearable
                          :disabled="disabledFlag"
                          :autosize="{ minRows:6, maxRows: 8}"
                          :max="5000"
                          v-model="punishForm.reason" type="textarea" placeholder="请输入扣罚事由，不超过5000字"/>
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
                          v-model="punishForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border  file">
               <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="punishFormId">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-form-item label="登记人员">
                <el-input size="small" clearable  v-model="punishForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-input size="small" clearable  v-model="punishForm.inputTime" :disabled="true"
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
                           :proId="punishForm.proId"
                           :oppositeEnterpriseId = punishForm.enterpriseId
      ></dialog-sub-contract>
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
  import dialogMyUnit from '@/views/components/dialog/dialogMyUnit'
  import dialogTransitUnit from '@/views/components/dialog/dialogTransitUnit'
  import dialogSubContract from '@/views/components/dialog/dialogSubContract'
  import {staticDataBasic} from "@/assets/data/basic";
  import {todayFormat} from "@/utils";
  import {validateLength} from "@/utils/validate";

  /**
   * api
   * */

  import {
    getPunish,
    savePunish,
    updatePunish,
    deletePunish,
    auditPunish,

  } from "@/api/bpmaManager/subpackage/subValue/punish/index.js"

  export default {
    name: 'PunishDetail',
    components: {
      dialogProject,
      dialogMyUnit,
      dialogTransitUnit,
      dialogSubContract
    },
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,

        saveBtnDisabledFlag:true,
        punishForm:{},
        punishFormId:undefined,

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

      }
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if(this.$route.params) {
          this.punishFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.punishForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.punishForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.punishForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.punishFormId = id;
        this.getPunish();

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
        if(!this.$utils.isEmpty(this.punishForm)){
          return this.punishForm.validateStatus === 1;
        }else{
          return true;
        }

      },
      auditBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.punishForm)){
          return this.punishForm.validateStatus === 1;
        }else{
          return true;
        }
      },

      disabledFlag() {
        return this.punishForm.validateStatus === 1;
      }
    },
    watch: {
      punishForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      }
    },
    methods: {
      handleAddBtn() {
        this.punishFormId = undefined;
        // this.punishForm.proId = undefined;
        // this.punishForm.proName = undefined;
        this.addPunish()
        this.$refs.refPunishForm.resetFields()
      },
      handleSaveBtn () {
        this.validateAfter(()=>{
          if(this.$utils.isEmpty(this.punishFormId)){
            this.savePunishData().then( () =>{
              this.getPunish()
            }).catch(err=>{
              console.log(err)
            })
          }else{
            this.updatePunishData().then( () =>{
              this.getPunish()
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
          if(this.$utils.isEmpty(this.punishFormId)){
            this.$set(this.punishForm,'proId','')
            this.$set(this.punishForm,'proName','')
            this.$set(this.punishForm,'proCode','')
            this.addPunish()
          }else{
            this.deletePunishData().then( () =>{
              this.$set(this.punishForm,'proId','')
              this.$set(this.punishForm,'proName','')
              this.$set(this.punishForm,'proCode','')
              this.addPunish()
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
            if(this.$utils.isEmpty(this.punishFormId)) {
              this.savePunishData(true).then(() => {
                this.auditPunishData().then(() => {
                  this.getPunish()
                })
              }).catch(error => {
                console.log(error)
              })
            }else{
              this.updatePunishData(true).then(() => {
                this.auditPunishData().then(() => {
                  this.getPunish()
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
      addPunish() {
        //this.punishDateRange[0] =  new Date(todayFormat()).getTime()
        this.punishForm = {
          id: '',
          validateStatus: 2,
          proId: this.punishForm.proId,
          proName: this.punishForm.proName,
          proCode: this.punishForm.proCode,
          price:'0.00',
          handleDate:new Date(todayFormat()).getTime(),
          ifPay:2,
          payedPrice:'0.00',
          handlePerson:this.$store.state.user.login.username

        }
        this.$refs.refPunishForm.resetFields()
        this.$refs.refPunishName.focus()
        console.log('this.punishForm', this.punishForm)
      },
      /**
       * 保存
       * */
      savePunishData (boolean) {
        console.log('save data',this.punishForm)
        return savePunish(this.punishForm).then(res =>{
          if(res.status && res.status === 200) {
            this.punishFormId = res.data.id
            this.punishForm.id = res.data.id
            if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
            console.log("save punish success",res)
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
      updatePunishData (boolean) {
        console.log('save data',this.punishForm)
        return updatePunish(this.punishForm).then(res =>{
          if(res.status && res.status === 200) {
            console.log("update punish success",res)
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
        this.$refs.refPunishForm.validate(valid => {
          valid ? null : result = valid
          return !result
        })

        if (result) {
          //验证
          if (typeof callback === "function") {
            callback();
          }
        } else {
          if(this.$utils.isEmpty(this.punishForm.name)){
            this.$refs.refPunishName.focus()
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
      deletePunishData() {
        return deletePunish(this.punishFormId).then((res) => {
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
      auditPunishData () {
        return auditPunish(this.punishForm).then((res) => {
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
      getPunish () {
        if(this.$utils.isEmpty(this.punishFormId)){
          this.addPunish()
        }else{
          return getPunish(this.punishFormId).then(res =>{
            if(res.status && res.status === 200) {
              console.log("get punishForm",res)
              this.punishForm = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      changeFormatDate(date){
        this.punishForm.handleDate = new Date(date).getTime()
      },

      /**
       * 点击显示哪种弹窗 项目  单位  合同
       * */
      toipClick(type) {
        if (this.disabled) return
        if (type == 'counterpart' && !this.punishForm.proId)
          return this.$message({message:'请先选择项目',type:'warning'})
        if (type == 'contract' && !(this.punishForm.proId && this.punishForm.enterpriseId ))
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
            if(this.punishForm.proId !== row.id ) {
              this.punishForm = Object.assign({}, this.punishForm, {
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
            if(this.punishForm.enterpriseId !== row.id ) {
              this.punishForm = Object.assign({}, this.punishForm, {
                enterpriseName: row.name,
                enterpriseId: row.id,

                contractName: undefined,
                contractId: undefined,
              })
            }
            break
          case 'contract':
            if(this.punishForm.contractId !== row.id ) {
              this.punishForm = Object.assign({}, this.punishForm, {
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
