<template>
  <div class="recRecordDetail-container">
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
        <el-form ref="refRecRecordForm" class="form-container" :model="recRecordForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="recRecordForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="recRecordForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="recRecordForm.proName"
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

          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="踏勘日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="recRecordForm.date"
                                type="date"
                                :disabled="disabledFlag"
                                @change="changeFormatDate"
                                placeholder="选择日期" class="date-picker">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="踏勘人员">
                <el-input size="small" clearable
                          v-model="recRecordForm.person" :disabled="disabledFlag" placeholder="请输入踏勘人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="踏勘地点">
                <el-input size="small" clearable v-model="recRecordForm.address" :disabled="disabledFlag" placeholder="请输入踏勘地点"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="踏勘详情">
                <el-input size="small" clearable
                          :disabled="disabledFlag"
                          :autosize="{ minRows:6, maxRows: 8}"
                          :max="5000"
                          v-model="recRecordForm.content" type="textarea" placeholder="请输入踏勘详情，不超过5000字"/>
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
                          v-model="recRecordForm.remark" type="textarea" placeholder="请输入需求概述，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="recRecordFormId" >
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-form-item label="登记人员">
                <el-input size="small" clearable  v-model="recRecordForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-input size="small" clearable  v-model="recRecordForm.inputTime" :disabled="true"
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
    getRecRecord,
    saveRecRecord,
    updateRecRecord,
    deleteRecRecord,
    auditRecRecord,

  } from "@/api/bpmaManager/early/itemInfo/reconnaissanceRecord/index.js"

  export default {
    name: 'reconnaissanceRecordDetail',
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
        recRecordForm:{},
        recRecordFormId:undefined,

        rules: {
          proName: [
            {required: true, message: '请选择项目名称', trigger: 'change'}
          ],
        },

        /**
         * 弹窗
         * */
        type: null,
        visibleSyncProject: false,
        selectedRow: {},

      }
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if(this.$route.params) {
          this.recRecordFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.recRecordForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.recRecordForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.recRecordForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.recRecordFormId = id;
        this.getRecRecord();

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
        if(!this.$utils.isEmpty(this.recRecordForm)){
          return this.recRecordForm.validateStatus === 1;
        }else{
          return true;
        }

      },
      auditBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.recRecordForm)){
          return this.recRecordForm.validateStatus === 1;
        }else{
          return true;
        }
      },

      disabledFlag() {
        return this.recRecordForm.validateStatus === 1;
      },
    },
    watch: {
      recRecordForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      },

    },
    methods: {
      handleAddBtn() {
        this.recRecordFormId = undefined;
        this.addRecRecord()
        this.$refs.refRecRecordForm.resetFields()
      },
      handleSaveBtn () {
        this.validateAfter(()=>{
          if(this.$utils.isEmpty(this.recRecordFormId)){
            this.saveRecRecordData().then( () =>{
              this.getRecRecord()
            }).catch(err=>{
              console.log(err)
            })
          }else{
            this.updateRecRecordData().then( () =>{
              this.getRecRecord()
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
          if(this.$utils.isEmpty(this.recRecordFormId)){
            this.addRecRecord()
            this.$set(this.recRecordForm,'proId','')
            this.$set(this.recRecordForm,'proName','')
            this.$set(this.recRecordForm,'proCode','')
          }else{
            this.deleteRecRecordData().then( () =>{
              this.addRecRecord()
              this.$set(this.recRecordForm,'proId','')
              this.$set(this.recRecordForm,'proName','')
              this.$set(this.recRecordForm,'proCode','')
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
            if(this.$utils.isEmpty(this.recRecordFormId)) {
              this.saveRecRecordData(true).then(() => {
                this.auditRecRecordData().then(() => {
                  this.getRecRecord()
                })
              }).catch(error => {
                console.log(error)
              })
            }else{
              this.updateRecRecordData(true).then(() => {
                this.auditRecRecordData().then(() => {
                  this.getRecRecord()
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
      addRecRecord() {
        this.recRecordForm = {
          id: '',
          validateStatus: 2,
          proId: this.recRecordForm.proId,
          proName: this.recRecordForm.proName,
          proCode: this.recRecordForm.proCode,
          date:new Date(todayFormat()).getTime(),

        }
        this.$refs.refRecRecordForm.resetFields()
        console.log('this.recRecordForm', this.recRecordForm)
      },
      /**
       * 保存
       * */
      saveRecRecordData (boolean) {
        console.log('save data',this.recRecordForm)
        return saveRecRecord(this.recRecordForm).then(res =>{
          if(res.status && res.status === 200) {
            this.recRecordFormId = res.data.id
            this.recRecordForm.id = res.data.id
            //上传文件
            if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
            console.log("save recRecord success",res)
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
      updateRecRecordData (boolean) {
        console.log('save data',this.recRecordForm)
        return updateRecRecord(this.recRecordForm).then(res =>{
          if(res.status && res.status === 200) {
            console.log("update recRecord success",res)
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
        this.$refs.refRecRecordForm.validate(valid => {
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
      deleteRecRecordData() {
        return deleteRecRecord(this.recRecordFormId).then((res) => {
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
      auditRecRecordData () {
        return auditRecRecord(this.recRecordForm).then((res) => {
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
      getRecRecord () {
        if(this.$utils.isEmpty(this.recRecordFormId)){
          this.addRecRecord()
        }else{
          return getRecRecord(this.recRecordFormId).then(res =>{
            if(res.status && res.status === 200) {
              console.log("get recRecordForm",res)
              this.recRecordForm = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      changeFormatDate(date){
        this.recRecordForm.date = new Date(date).getTime()
      },

      /**
       * 点击显示哪种弹窗 项目
       * */
      toipClick(type) {
        if (this.disabled) return
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
            this.recRecordForm = Object.assign({},this.recRecordForm, {
              proName : row.name,
              proId : row.id,
              proCode: row.code
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
