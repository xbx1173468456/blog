<template>
  <div class="trackRecordDetail-container">
    <basic-handler>
      <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"

                 @click="handleAddBtn" >新增
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
        <el-form ref="refTrackRecordForm" class="form-container" :model="trackRecordForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="trackRecordForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="trackRecordForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="trackRecordForm.proName"
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
              <el-form-item label="跟踪方式">
                <el-select size="small"
                           v-model="trackRecordForm.way"
                           placeholder="请选择跟踪方式"
                           :disabled="disabledFlag">
                  <el-option
                    v-for="item in trackRecordWay"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="跟踪日期">
                <el-date-picker size="small"
                                :editable = "false"
                                :clearable = "false"
                                v-model="trackRecordForm.date"
                                type="date"
                                :disabled="disabledFlag"
                                @change="changeFormatDate"
                                placeholder="选择日期" class="date-picker">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="跟踪主题">
                <el-input size="small" clearable
                          v-model="trackRecordForm.topic" :disabled="disabledFlag" placeholder="请输入跟踪主题"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="我方人员">
                <el-input size="small" clearable
                          v-model="trackRecordForm.ourPerson" :disabled="disabledFlag" placeholder="请输入我方人员"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="对方人员">
                <el-input size="small" clearable
                          v-model="trackRecordForm.theirPerson" :disabled="disabledFlag" placeholder="请输入对方人员"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="跟踪内容" prop="content" hide-required-asterisk>
                <el-input size="small" clearable
                          ref="refTrackRecordContent"
                          :disabled="disabledFlag"
                          :autosize="{ minRows:6, maxRows: 8}"
                          :max="5000"
                          v-model="trackRecordForm.content" type="textarea" placeholder="请输入跟踪内容，不超过5000字"/>
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
                          v-model="trackRecordForm.remark" type="textarea" placeholder="请输入需求概述，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
               <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="trackRecordFormId">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-form-item label="登记人员">
                <el-input size="small" clearable  v-model="trackRecordForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-input size="small" clearable  v-model="trackRecordForm.inputTime" :disabled="true"
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
  import {staticDataBasic} from "@/assets/data/basic";
  import {todayFormat} from "@/utils";
  import {validateLength} from "@/utils/validate";

  /**
   * api
   * */

  import {
    getTrackRecord,
    saveTrackRecord,
    updateTrackRecord,
    deleteTrackRecord,
    auditTrackRecord,

  } from "@/api/bpmaManager/early/itemInfo/trackRecord/index.js"
  import { getDictionaryDataByTypeFilter }from '@/api/common/dataDictionary.js'
  export default {
    name: 'TrackRecordDetail',
    components: {
      dialogProject,
    },
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,

        saveBtnDisabledFlag:true,
        trackRecordForm:{},
        trackRecordFormId:undefined,

        rules: {
          proName: [
            {required: true, message: '请选择项目名称', trigger: 'change'}
          ],
          content:[
            {required: true, message: '请输入跟踪内容', trigger: 'change'}
          ]
        },
        trackRecordWay:null,
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
        if (this.$route.params) {
          this.trackRecordFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if (this.$route.query) {
          this.trackRecordFormId = this.$route.params.id ? this.$route.params.id : undefined;
          this.trackRecordForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.trackRecordForm.proName = this.$route.query.name ? this.$route.query.name : undefined;
          this.trackRecordForm.proCode = this.$route.query.proCode ? this.$route.query.proCode : undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.trackRecordFormId = id;
        this.getTrackRecord();

      });
    },
    created() {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetIsOrNotData'
      ]);
      setTimeout(() => {
        this.getTrackRecordWayData();
      }, 100)
      this.$store.dispatch("cacheId",'0');//刷新
    },
    computed: {
      deleteBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.trackRecordForm)){
          return this.trackRecordForm.validateStatus === 1;
        }else{
          return true;
        }

      },
      auditBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.trackRecordForm)){
          return this.trackRecordForm.validateStatus === 1;
        }else{
          return true;
        }
      },

      disabledFlag() {
        return this.trackRecordForm.validateStatus === 1;
      },
    },
    watch: {
      trackRecordForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      },

    },
    methods: {
      handleAddBtn() {
        this.trackRecordFormId = undefined;
        this.addTrackRecord()
        this.$refs.refTrackRecordForm.resetFields()
      },
      handleSaveBtn () {
        this.validateAfter(()=>{
          if(this.$utils.isEmpty(this.trackRecordFormId)){
            this.saveTrackRecordData().then( () =>{
              this.getTrackRecord()
            }).catch(err=>{
              console.log(err)
            })
          }else{
            this.updateTrackRecordData().then( () =>{
              this.getTrackRecord()
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
          if(this.$utils.isEmpty(this.trackRecordFormId)){
            this.addTrackRecord()
            this.$set(this.trackRecordForm,'proId','')
            this.$set(this.trackRecordForm,'proName','')
            this.$set(this.trackRecordForm,'proCode','')
          }else{
            this.deleteTrackRecordData().then( () =>{
              this.addTrackRecord()
              this.$set(this.trackRecordForm,'proId','')
              this.$set(this.trackRecordForm,'proName','')
              this.$set(this.trackRecordForm,'proCode','')
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
            if(this.$utils.isEmpty(this.trackRecordFormId)) {
              this.saveTrackRecordData(true).then(() => {
                this.auditTrackRecordData().then(() => {
                  this.getTrackRecord()
                })
              }).catch(error => {
                console.log(error)
              })
            }else{
              this.updateTrackRecordData(true).then(() => {
                this.auditTrackRecordData().then(() => {
                  this.getTrackRecord()
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
      addTrackRecord() {
        //this.trackRecordDateRange[0] =  new Date(todayFormat()).getTime()
        this.trackRecordForm = {
          id: '',
          validateStatus: 2,
          proId: this.trackRecordForm.proId,
          proName: this.trackRecordForm.proName,
          proCode: this.trackRecordForm.proCode,
          date:new Date(todayFormat()).getTime(),
        }
        this.$refs.refTrackRecordForm.resetFields()
        this.$refs.refTrackRecordContent.focus()
        console.log('this.trackRecordForm', this.trackRecordForm)
      },
      /**
       * 保存
       * */
      saveTrackRecordData (boolean) {
        console.log('save data',this.trackRecordForm)
        return saveTrackRecord(this.trackRecordForm).then(res =>{
          if(res.status && res.status === 200) {
            this.trackRecordFormId = res.data.id
            this.trackRecordForm.id = res.data.id
            //上传文件
            if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
            console.log("save trackRecord success",res)
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
      updateTrackRecordData (boolean) {
        console.log('save data',this.trackRecordForm)
        return updateTrackRecord(this.trackRecordForm).then(res =>{
          if(res.status && res.status === 200) {
            console.log("update trackRecord success",res)
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
        this.$refs.refTrackRecordForm.validate(valid => {
          valid ? null : result = valid
          return !result
        })

        if (result) {
          //验证
          if (typeof callback === "function") {
            callback();
          }
        } else {
          if(this.$utils.isEmpty(this.trackRecordForm.content)){
            this.$refs.refTrackRecordContent.focus()
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
      deleteTrackRecordData() {
        return deleteTrackRecord(this.trackRecordFormId).then((res) => {
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
      auditTrackRecordData () {
        return auditTrackRecord(this.trackRecordForm).then((res) => {
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
      getTrackRecord () {
        if(this.$utils.isEmpty(this.trackRecordFormId)){
          this.addTrackRecord()
        }else{
          return getTrackRecord(this.trackRecordFormId).then(res =>{
            if(res.status && res.status === 200) {
              console.log("get trackRecordForm",res)
              this.trackRecordForm = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      changeFormatDate(date){
        this.trackRecordForm.date = new Date(date).getTime()
      },

      /**
       * 点击显示哪种弹窗 项目  单位  合同
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
            this.trackRecordForm = Object.assign({},this.trackRecordForm, {
              proName : row.name,
              proId : row.id,
              proCode: row.code
            } )
            break
        }
        this.saveBtnDisabledFlag = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },

      /**
       * 跟踪方式
       * */
      getTrackRecordWayData(){
        getDictionaryDataByTypeFilter('BPMA_PRO_WAY')
          .then( (res) => {
            console.log('way',res)
            if(res.status && res.status === 200){
              this.trackRecordWay = res.data;
            }else{
              this.$message({message: res.message,type: 'warning'})
            }
          })
      }

    }
  }
</script>

<style scoped>

</style>
