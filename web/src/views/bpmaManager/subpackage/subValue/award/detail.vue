<template>
  <div class="awardDetail-container">
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
        <el-form ref="refAwardForm" class="form-container" :model="awardForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="awardForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="awardForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="奖励名称" prop="name" hide-required-asterisk>
                <el-input size="small" clearable v-model="awardForm.name"
                          :disabled="disabledFlag"
                          ref="refAwardName"
                          placeholder="请输入奖励名称"/>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="awardForm.proName"
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
                <el-input size="small" v-model="awardForm.enterpriseName"
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
                <el-input size="small"  v-model="awardForm.contractName"
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
                          v-model="awardForm.handlePerson" :disabled="disabledFlag" placeholder="请输入经办人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="奖励日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="awardForm.handleDate"
                                type="date"
                                :disabled="disabledFlag"
                                @change="changeFormatDate"
                                placeholder="选择日期" class="date-picker">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="奖励金额">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                             clearable
                             v-model="awardForm.price"
                             placeholder="请输入奖励金额"
                             :disabled="disabledFlag"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="是否结算" prop="ifPay" class="add-border" >

                <el-radio-group v-model="awardForm.ifPay">
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
                             v-model="awardForm.payedPrice"
                             placeholder="系统自动生成结算金额"
                             :disabled="true"
                             :min="0"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算单号">
                <el-input size="small" clearable v-model="awardForm.payedCode" :disabled="true" placeholder="系统自动生成结算单号"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="奖励事由">
                <el-input size="small" clearable
                          :disabled="disabledFlag"
                          :autosize="{ minRows:6, maxRows: 8}"
                          :max="5000"
                          v-model="awardForm.reason" type="textarea" placeholder="请输入奖励事由，不超过5000字"/>
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
                          v-model="awardForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
               <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="awardFormId">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-form-item label="登记人员">
                <el-input size="small" clearable  v-model="awardForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-input size="small" clearable  v-model="awardForm.inputTime" :disabled="true"
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
                           :proId="awardForm.proId"
                           :oppositeEnterpriseId = awardForm.enterpriseId
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
    getAward,
    saveAward,
    updateAward,
    deleteAward,
    auditAward,

  } from "@/api/bpmaManager/subpackage/subValue/award/index.js"

  export default {
    name: 'AwardDetail',
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
        awardForm:{},
        awardFormId:undefined,

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
          this.awardFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.awardForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.awardForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.awardForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.awardFormId = id;
        this.getAward();

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
        if(!this.$utils.isEmpty(this.awardForm)){
          return this.awardForm.validateStatus === 1;
        }else{
          return true;
        }

      },
      auditBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.awardForm)){
          return this.awardForm.validateStatus === 1;
        }else{
          return true;
        }
      },

      disabledFlag() {
        return this.awardForm.validateStatus === 1;
      },

    },
    watch: {
      awardForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      },
    },
    methods: {
      handleAddBtn() {
        this.awardFormId = undefined;
        // this.awardForm.proId = undefined;
        // this.awardForm.proName = undefined;
        this.addAward()
        this.$refs.refAwardForm.resetFields()
      },
      handleSaveBtn () {
        this.validateAfter(()=>{
          if(this.$utils.isEmpty(this.awardFormId)){
            this.saveAwardData().then( () =>{
              this.getAward()
            }).catch(err=>{
              console.log(err)
            })
          }else{
            this.updateAwardData().then( () =>{
              this.getAward()
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
          if(this.$utils.isEmpty(this.awardFormId)){
            this.$set(this.awardForm,'proId','')
            this.$set(this.awardForm,'proName','')
            this.$set(this.awardForm,'proCode','')
            this.addAward()
          }else{
            this.deleteAwardData().then( () =>{
              this.$set(this.awardForm,'proId','')
              this.$set(this.awardForm,'proName','')
              this.$set(this.awardForm,'proCode','')
              this.addAward()
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
            if(this.$utils.isEmpty(this.awardFormId)) {
              this.saveAwardData(true).then(() => {
                this.auditAwardData().then(() => {
                  this.getAward()
                })
              }).catch(error => {
                console.log(error)
              })
            }else{
              this.updateAwardData(true).then(() => {
                this.auditAwardData().then(() => {
                  this.getAward()
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
      addAward() {
        //this.awardDateRange[0] =  new Date(todayFormat()).getTime()
        this.awardForm = {
          id: '',
          validateStatus: 2,
          proId: this.awardForm.proId,
          proName: this.awardForm.proName,
          proCode: this.awardForm.proCode,
          price:'0.00',
          handleDate:new Date(todayFormat()).getTime(),
          ifPay:2,
          payedPrice:'0.00',
          handlePerson:this.$store.state.user.login.username
        }
        this.$refs.refAwardForm.resetFields()
        this.$refs.refAwardName.focus()
        console.log('this.awardForm', this.awardForm)
      },
      /**
       * 保存
       * */
      saveAwardData (boolean) {
        console.log('save data',this.awardForm)
        return saveAward(this.awardForm).then(res =>{
          if(res.status && res.status === 200) {
            this.awardFormId = res.data.id
            this.awardForm.id = res.data.id
            //上传文件
            if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
            console.log("save award success",res)
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
      updateAwardData (boolean) {
        console.log('save data',this.awardForm)
        return updateAward(this.awardForm).then(res =>{
          if(res.status && res.status === 200) {
            console.log("update award success",res)
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
        this.$refs.refAwardForm.validate(valid => {
          valid ? null : result = valid
          return !result
        })

        if (result) {
          //验证
          if (typeof callback === "function") {
            callback();
          }
        } else {
          if(this.$utils.isEmpty(this.awardForm.name)){
            this.$refs.refAwardName.focus()
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
      deleteAwardData() {
        return deleteAward(this.awardFormId).then((res) => {
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
      auditAwardData () {
        return auditAward(this.awardForm).then((res) => {
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
      getAward () {
        if(this.$utils.isEmpty(this.awardFormId)){
          this.addAward()
        }else{
          return getAward(this.awardFormId).then(res =>{
            if(res.status && res.status === 200) {
              console.log("get awardForm",res)
              this.awardForm = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      changeFormatDate(date){
        this.awardForm.handleDate = new Date(date).getTime()
      },

      /**
       * 点击显示哪种弹窗 项目  单位  合同
       * */
      toipClick(type) {
        if (this.disabled) return
        if (type == 'counterpart' && !this.awardForm.proId)
          return this.$message({message:'请先选择项目',type:'warning'})
        if (type == 'contract' && !(this.awardForm.proId && this.awardForm.enterpriseId ))
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
            if(this.awardForm.proId !== row.id ){
              this.awardForm = Object.assign({},this.awardForm, {
                proName : row.name,
                proId : row.id,
                proCode: row.code,

                enterpriseName:undefined,
                enterpriseId:undefined,

                contractName:undefined,
                contractId:undefined,
              } )
            }
            break
          case 'counterpart':
            if(this.awardForm.enterpriseId !== row.id ) {
              this.awardForm = Object.assign({}, this.awardForm, {
                enterpriseName: row.name,
                enterpriseId: row.id,

                contractName:undefined,
                contractId:undefined
              })
            }
            break
          case 'contract':
            if(this.awardForm.contractId !== row.id ) {
              this.awardForm = Object.assign({}, this.awardForm, {
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
