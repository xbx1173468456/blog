<template>
  <div class="projectHandOverDetail-container">
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
        <el-form ref="refProjectHandOverForm" class="form-container" :model="projectHandOverForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="projectHandOverForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="projectHandOverForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据名称" prop="name" hide-required-asterisk>
                <el-input size="small" clearable v-model="projectHandOverForm.name"
                          :disabled="disabledFlag"
                          ref="refProjectHandOverName"
                          placeholder="请输入单据名称"/>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="projectHandOverForm.proName"
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
                <el-input size="small"  v-model="projectHandOverForm.contractName"
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
              <el-form-item label="是否完全移交" class="add-border">
                <el-radio-group v-model="projectHandOverForm.ifWholeDeliver">
                  <el-radio :label="parseInt(row.code)" :disabled="disabledFlag"
                            v-for="(row, key, index) in dataEnum.isOrNot"
                            :key="row.code">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="建设单位">
                <el-input size="small" clearable
                          v-model="projectHandOverForm.buildEnterprise" :disabled="disabledFlag" placeholder="请输入建设单位"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设计单位">
                <el-input size="small" clearable
                          v-model="projectHandOverForm.designEnterprise" :disabled="disabledFlag" placeholder="请输入设计单位"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="监理单位">
                <el-input size="small" clearable
                          v-model="projectHandOverForm.superviseEnterprise" :disabled="disabledFlag" placeholder="请输入监理单位"/>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="接收单位">
                <el-input size="small" clearable
                          v-model="projectHandOverForm.receiveEnterprise" :disabled="disabledFlag" placeholder="请输入接收单位"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="移交人员">
                <el-input size="small" clearable
                          v-model="projectHandOverForm.handlePerson" :disabled="disabledFlag" placeholder="请输入移交人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="移交日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="projectHandOverForm.handleDate"
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
              <el-form-item label="移交内容">
                <el-input size="small" clearable
                          :disabled="disabledFlag"
                          :autosize="{ minRows:6, maxRows: 8}"
                          :max="5000"
                          v-model="projectHandOverForm.content" type="textarea" placeholder="请输入移交内容，不超过5000字"/>
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
                          v-model="projectHandOverForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
               <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="projectHandOverFormId">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-form-item label="登记人员">
                <el-input size="small" clearable  v-model="projectHandOverForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-input size="small" clearable  v-model="projectHandOverForm.inputTime" :disabled="true"
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
      <dialog-my-contract @selectionChange="selectionChange" filterValid v-if="visibleSyncContract"
                           :proId="projectHandOverForm.proId"
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
    getLastDeliver,
    addLastDeliver,
    amendLastDeliver,
    deleteLastDeliver,
    auditLastDeliver,

  } from "@/api/bpmaManager/laterManager/completedManager/projectHandOver"

  export default {
    name: 'projectHandOverDetail',
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
        projectHandOverForm:{},
        projectHandOverFormId:undefined,

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
          this.projectHandOverFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.projectHandOverForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.projectHandOverForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.projectHandOverForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.projectHandOverFormId = id;
        this.getProjectHandOver();

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
        if(!this.$utils.isEmpty(this.projectHandOverForm)){
          return this.projectHandOverForm.validateStatus === 1;
        }else{
          return true;
        }

      },
      auditBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.projectHandOverForm)){
          return this.projectHandOverForm.validateStatus === 1;
        }else{
          return true;
        }
      },

      disabledFlag() {
        return this.projectHandOverForm.validateStatus === 1;
      },
    },
    watch: {
      projectHandOverForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      },

    },
    methods: {
      handleAddBtn() {
        this.projectHandOverFormId = undefined;
        this.addProjectHandOver()
        this.$refs.refProjectHandOverForm.resetFields()
      },
      handleSaveBtn () {
        this.validateAfter(()=>{
          if(this.$utils.isEmpty(this.projectHandOverFormId)){
            this.saveProjectHandOverData().then( () =>{
              this.getProjectHandOver()
            }).catch(err=>{
              console.log(err)
            })
          }else{
            this.updateProjectHandOverData().then( () =>{
              this.getProjectHandOver()
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
          if(this.$utils.isEmpty(this.projectHandOverFormId)){
            this.$set(this.projectHandOverForm,'proId','')
            this.$set(this.projectHandOverForm,'proName','')
            this.$set(this.projectHandOverForm,'proCode','')
            this.addProjectHandOver()
          }else{
            this.deleteProjectHandOverData().then( () =>{
              this.$set(this.projectHandOverForm,'proId','')
              this.$set(this.projectHandOverForm,'proName','')
              this.$set(this.projectHandOverForm,'proCode','')
              this.addProjectHandOver()
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
            if(this.$utils.isEmpty(this.projectHandOverFormId)) {
              this.saveProjectHandOverData(true).then(() => {
                this.auditProjectHandOverData().then(() => {
                  this.getProjectHandOver()
                })
              }).catch(error => {
                console.log(error)
              })
            }else{
              this.updateProjectHandOverData(true).then(() => {
                this.auditProjectHandOverData().then(() => {
                  this.getProjectHandOver()
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
      addProjectHandOver() {
        this.projectHandOverForm = {
          id: '',
          validateStatus: 2,
          name:'项目移交单',
          proId: this.projectHandOverForm.proId,
          proName: this.projectHandOverForm.proName,
          proCode: this.projectHandOverForm.proCode,
          ifWholeDeliver:1,
          handleDate:new Date(todayFormat()).getTime(),
        }
        this.$refs.refProjectHandOverForm.resetFields()
        console.log('this.projectHandOverForm', this.projectHandOverForm)
      },
      /**
       * 保存
       * */
      saveProjectHandOverData (boolean) {
        console.log('save data',this.projectHandOverForm)
        return addLastDeliver(this.projectHandOverForm).then(res =>{
          if(res.status && res.status === 200) {
            this.projectHandOverFormId = res.data.id
            this.projectHandOverForm.id = res.data.id
            //上传文件
            if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
            console.log("save projectHandOver success",res)
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
      updateProjectHandOverData (boolean) {
        console.log('save data',this.projectHandOverForm)
        return amendLastDeliver(this.projectHandOverForm).then(res =>{
          if(res.status && res.status === 200) {
            console.log("update projectHandOver success",res)
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
        this.$refs.refProjectHandOverForm.validate(valid => {
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
      deleteProjectHandOverData() {
        return deleteLastDeliver(this.projectHandOverFormId).then((res) => {
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
      auditProjectHandOverData () {
        return auditLastDeliver(this.projectHandOverForm).then((res) => {
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
      getProjectHandOver () {
        if(this.$utils.isEmpty(this.projectHandOverFormId)){
          this.addProjectHandOver()
        }else{
          return getLastDeliver(this.projectHandOverFormId).then(res =>{
            if(res.status && res.status === 200) {
              console.log("get projectHandOverForm",res)
              this.projectHandOverForm = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      changeFormatDate(date){
        this.projectHandOverForm.handleDate = new Date(date).getTime()
      },

      /**
       * 点击显示哪种弹窗 项目   合同
       * */
      toipClick(type) {
        if (this.disabled) return
        if (type == 'contract' && !(this.projectHandOverForm.proId ))
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
            this.projectHandOverForm = Object.assign({},this.projectHandOverForm, {
              proName : row.name,
              proId : row.id,
              proCode: row.code
            } )
            break
          case 'contract':
            this.projectHandOverForm = Object.assign({},this.projectHandOverForm, {
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
