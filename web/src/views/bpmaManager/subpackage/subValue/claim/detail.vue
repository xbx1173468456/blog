<template>
  <div class="claimDetail-container">
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
        <el-form ref="refClaimForm" class="form-container" :model="claimForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="claimForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="claimForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="索赔名称" prop="name" hide-required-asterisk>
                <el-input size="small" clearable v-model="claimForm.name" :disabled="disabledFlag" ref="refClaimName"
                          placeholder="请输入索赔名称"/>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="claimForm.proName"
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
                <el-input size="small" v-model="claimForm.enterpriseName"
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
                <el-input size="small"  v-model="claimForm.contractName"
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
              <el-form-item label="申报索赔金额">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="claimForm.applyPrice"
                             placeholder="请输入申报索赔金额"
                             :disabled="disabledFlag"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="内部核定金额">
              <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                           clearable
                           v-model="claimForm.approvePrice"
                           placeholder="请输入内部核定金额"
                           :disabled="disabledFlag"
                           :min="0"
              ></basic-input>
            </el-form-item>
          </el-col>
            <el-col :span="8">
              <el-form-item label="最终索赔金额">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="claimForm.payPrice"
                             placeholder="请输入最终索赔金额"
                             :disabled="disabledFlag"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="经办人员">
                <el-input size="small" clearable
                          v-model="claimForm.handlePerson" :disabled="disabledFlag" placeholder="请输入经办人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="完成日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="claimForm.handleDate"
                                type="date"
                                :disabled="disabledFlag"
                                @change="changeFormatDate"
                                placeholder="选择日期" class="date-picker">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否结算" prop="ifPay" class="add-border" >

                <el-radio-group v-model="claimForm.ifPay">
                  <el-radio :label="parseInt(row.code)"
                            v-for="(row, key, index) in dataEnum.isOrNot"
                            :key="row.code" :disabled="true">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="结算金额">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="claimForm.payedPrice"
                             placeholder="系统自动生成结算金额"
                             :disabled="true"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算单号">
                <el-input size="small" clearable v-model="claimForm.payedCode" :disabled="true" placeholder="系统自动生成结算单号"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="索赔内容">
                <el-input size="small" clearable
                          :disabled="disabledFlag"
                          :autosize="{ minRows:6, maxRows: 8}"
                          :max="5000"
                          v-model="claimForm.content" type="textarea" placeholder="请输入索赔内容，不超过5000字"/>
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
                          v-model="claimForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
               <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="claimFormId">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-form-item label="登记人员">
                <el-input size="small" clearable  v-model="claimForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-input size="small" clearable  v-model="claimForm.inputTime" :disabled="true"
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
                           :proId="claimForm.proId"
                           :oppositeEnterpriseId = claimForm.enterpriseId
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
    getClaim,
    saveClaim,
    updateClaim,
    deleteClaim,
    auditClaim,

  } from "@/api/bpmaManager/subpackage/subValue/claim/index.js"

  export default {
    name: 'ClaimDetail',
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
        claimForm:{},
        claimFormId:undefined,

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
          this.claimFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.claimForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.claimForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.claimForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.claimFormId = id;
        this.getClaim();

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
        if(!this.$utils.isEmpty(this.claimForm)){
          return this.claimForm.validateStatus === 1;
        }else{
          return true;
        }

      },
      auditBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.claimForm)){
          return this.claimForm.validateStatus === 1;
        }else{
          return true;
        }
      },

      disabledFlag() {
        return this.claimForm.validateStatus === 1;
      }

    },
    watch: {
      claimForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      }

    },
    methods: {
      handleAddBtn() {
        this.claimFormId = undefined;
        // this.claimForm.proId = undefined;
        // this.claimForm.proName = undefined;
        this.addClaim()
        this.$refs.refClaimForm.resetFields()
      },
      handleSaveBtn () {
        this.validateAfter(()=>{
          if(this.$utils.isEmpty(this.claimFormId)){
            this.saveClaimData().then( () =>{
              this.getClaim()
            }).catch(err=>{
              console.log(err)
            })
          }else{
            this.updateClaimData().then( () =>{
              this.getClaim()
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
          if(this.$utils.isEmpty(this.claimFormId)){
            this.$set(this.claimForm,'proId','')
            this.$set(this.claimForm,'proName','')
            this.$set(this.claimForm,'proCode','')
            this.addClaim()
          }else{
            this.deleteClaimData().then( () =>{
              this.$set(this.claimForm,'proId','')
              this.$set(this.claimForm,'proName','')
              this.$set(this.claimForm,'proCode','')
              this.addClaim()
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
            if(this.$utils.isEmpty(this.claimFormId)) {
              this.saveClaimData(true).then(() => {
                this.auditClaimData().then(() => {
                  this.getClaim()
                })
              }).catch(error => {
                console.log(error)
              })
            }else{
              this.updateClaimData(true).then(() => {
                this.auditClaimData().then(() => {
                  this.getClaim()
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
      addClaim() {
        //this.claimDateRange[0] =  new Date(todayFormat()).getTime()
        this.claimForm = {
          id: '',
          validateStatus: 2,
          proId: this.claimForm.proId,
          proName: this.claimForm.proName,
          proCode: this.claimForm.proCode,
          applyPrice:'0.00',
          approvePrice:'0.00',
          payPrice:'0.00',
          handleDate:new Date(todayFormat()).getTime(),
          ifPay:2,
          payedPrice:'0.00',
          handlePerson:this.$store.state.user.login.username
        }
        this.$refs.refClaimForm.resetFields()
        this.$refs.refClaimName.focus()
        console.log('this.claimForm', this.claimForm)
      },
      /**
       * 保存
       * */
      saveClaimData (boolean) {
        console.log('save data',this.claimForm)
        return saveClaim(this.claimForm).then(res =>{
          if(res.status && res.status === 200) {
            this.claimFormId = res.data.id
            this.claimForm.id = res.data.id
            //上传文件
            if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
            console.log("save claim success",res)
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
      updateClaimData (boolean) {
        console.log('save data',this.claimForm)
        return updateClaim(this.claimForm).then(res =>{
          if(res.status && res.status === 200) {
            console.log("update claim success",res)
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
        this.$refs.refClaimForm.validate(valid => {
          valid ? null : result = valid
          return !result
        })

        if (result) {
          //验证
          if (typeof callback === "function") {
            callback();
          }
        } else {
          if(this.$utils.isEmpty(this.claimForm.name)){
            this.$refs.refClaimName.focus()
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
      deleteClaimData() {
        return deleteClaim(this.claimFormId).then((res) => {
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
      auditClaimData () {
        return auditClaim(this.claimForm).then((res) => {
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
      getClaim () {
        if(this.$utils.isEmpty(this.claimFormId)){
          this.addClaim()
        }else{
          return getClaim(this.claimFormId).then(res =>{
            if(res.status && res.status === 200) {
              console.log("get claimForm",res)
              this.claimForm = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      changeFormatDate(date){
        this.claimForm.handleDate = new Date(date).getTime()
      },

      /**
       * 点击显示哪种弹窗 项目  单位  合同
       * */
      toipClick(type) {
        if (this.disabled) return
        if (type == 'counterpart' && !this.claimForm.proId)
          return this.$message({message:'请先选择项目',type:'warning'})
        if (type == 'contract' && !(this.claimForm.proId && this.claimForm.enterpriseId ))
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
            if(this.claimForm.proId !== row.id ) {
              this.claimForm = Object.assign({}, this.claimForm, {
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
            if(this.claimForm.enterpriseId !== row.id ) {
              this.claimForm = Object.assign({}, this.claimForm, {
                enterpriseName: row.name,
                enterpriseId: row.id,

                contractName:undefined,
                contractId:undefined,
              })
            }
            break
          case 'contract':
            if(this.claimForm.contractId !== row.id ) {
              this.claimForm = Object.assign({}, this.claimForm, {
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
