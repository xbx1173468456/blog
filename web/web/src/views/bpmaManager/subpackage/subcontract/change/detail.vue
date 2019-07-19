<template>
  <div class="change-container">
    <div class="handler-container">
      <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"

                 @click="handleAddBtn" plain>新增</el-button>
      <el-button  v-if="saveBtnShowFlag"  type="primary" icon="el-icon-if-save" size="small" plain

                  @click="handleSaveBtn" :disabled="saveBtnDisabledFlag || auditBtnDisabledFlag">保存</el-button>

      <el-button v-if="deleteBtnShowFlag" type="danger" icon="el-icon-delete" size="small" plain
                 @click="handleDeleteBtn" :disabled="deleteBtnDisabledFlag">删除
      </el-button>
      <el-button v-if="auditBtnShowFlag" type="primary" icon="el-icon-if-auth" size="small" plain
                 @click="handleAuditBtn" :disabled="auditBtnDisabledFlag">审核
      </el-button>
    </div>

    <el-form ref="refSubContractChangeForm" class="form-container"  :model="subContractChangeForm" label-width="120px" :rules="rules" :show-message="false">
      <el-row :gutter="5">
        <el-col :span="8">
          <basic-validate-status :model="subContractChangeForm"></basic-validate-status>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编码" >
            <el-input size="small" clearable v-model="subContractChangeForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="变更名称" prop="name">
            <el-input size="small" clearable ref="refChangeName"
                      v-model="subContractChangeForm.name" :disabled="disabledFlag" placeholder="请输入变更名称"/>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
            <el-input size="small" v-model="subContractChangeForm.proName"
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
        <el-col :span="8">
          <el-form-item label="合同名称" prop="contractName" hide-required-asterisk>
            <el-input size="small"  v-model="subContractChangeForm.contractName"
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

          <el-form-item label="原变更单号" >
            <el-input size="small" clearable v-model="subContractChangeForm.orignalCode" :disabled="disabledFlag" placeholder="请输入原变更单号"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="变更日期">
            <el-date-picker size="small"
                            :editable = "false"
                            :clearable = "false"
              @change="fomatDate"
              v-model="subContractChangeForm.changeDate"
              type="date"
              :disabled="disabledFlag"
              placeholder="选择日期" class="date-picker">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办人员">
            <el-input size="small"
              clearable
              v-model="subContractChangeForm.handlePerson"
              placeholder="请输入经办人员"
              :disabled="disabledFlag"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="变更金额">
            <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                       size="small"
                       clearable
                       v-model="subContractChangeForm.price"
                       placeholder="请输入变更金额"
                       :disabled="disabledFlag"
                       :min="0"
            ></basic-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="24">
          <el-form-item label="变更原因">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      :max="5000"
                      v-model="subContractChangeForm.reason" type="textarea" placeholder="请输入变更原因，不超过5000字" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="24">
          <el-form-item label="变更内容" prop="content" hide-required-asterisk>
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      :max="5000"
                      ref="refChangeContent"
                      v-model="subContractChangeForm.content" type="textarea" placeholder="请输入变更内容，不超过5000字" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="24">
          <el-form-item label="变更影响">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      :max="5000"
                      v-model="subContractChangeForm.effect" type="textarea" placeholder="请输入变更影响，不超过5000字" />
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
                      v-model="subContractChangeForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="24">
          <el-form-item label="附件" class="add-border file">
           <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="subContractChangeFormId">
            </basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="登记人员">
            <el-input size="small" clearable  v-model="subContractChangeForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input size="small" clearable  v-model="subContractChangeForm.inputTime" :disabled="true" placeholder="系统自动生成登记时间"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <basic-dialog v-el-drag-dialog title="项目名称-选择" :visible.sync="visibleSyncProject" >
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog title="合同-选择" :visible.sync="visibleSyncContract" >
      <dialog-sub-contract @selectionChange="selectionChange" filterValid v-if="visibleSyncContract"
                          :proId="subContractChangeForm.proId"></dialog-sub-contract>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogSubContract from '@/views/components/dialog/dialogSubContract'
  import formatBasic from '@/utils/mixins/formatBasic'
  import {staticDataBasic} from "@/assets/data/basic";
  import {
    getAllSubContractChangeItem,
    getSubContractChange,
    saveSubContractChange,
    updateSubContractChange,
    deleteSubContractChange,
    auditSubContractChange,
    getSubContract

  } from '@/api/bpmaManager/subpackage/subcontract/change/index.js'
  import {getDictionaryDataByTypeFilter} from '@/api/common/dataDictionary.js'
  export default {
    name: 'ChangeDetail',
    components: {
      dialogProject,
      dialogSubContract
    },
    mixins: [computed, methods, formatEnum,formatBasic],
    data () {
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,


        subContractChangeFormId:undefined,
        subContractChangeForm: {},
        saveBtnDisabledFlag: true,

        rules: {
          proName:[
            { required: true, message: '请选择项目名称', trigger: 'change' }

          ],
          name: [
            { required: true, message: '请输入变更名称', trigger: 'change' }
          ],
          contractName: [
            { required: true, message: '请选择合同名称', trigger: 'change' }
          ],
          content:[
            { required: true, message: '请输入变更内容', trigger: 'change'}
          ]

        },
        type: null,
        visibleSyncProject: false,
        visibleSyncContract: false,
        selectedRow: {}

      }
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if(this.$route.params) {
          this.subContractChangeFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.subContractChangeForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.subContractChangeForm.proName = this.$route.query.name ? this.$route.query.name : undefined;
          this.subContractChangeForm.proCode = this.$route.query.proCode ? this.$route.query.proCode : undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.subContractChangeFormId = id;
        this.getSubContractChange();

      });
    },
    created () {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData'
      ]);
      this.$store.dispatch("cacheId",'0');//刷新

    },
    computed:{
      deleteBtnDisabledFlag () {
        return this.subContractChangeForm.validateStatus === 1 ;
      },
      auditBtnDisabledFlag () {
        return this.subContractChangeForm.validateStatus === 1;
      },

      disabledFlag () {
        return  this.subContractChangeForm.validateStatus === 1 ;
      }
    },
    watch:{
      subContractChangeForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep:true
      }
    },
    methods:{
      handleAddBtn () {
        this.subContractChangeFormId = undefined;
        // this.subContractChangeForm.proId = undefined;
        // this.subContractChangeForm.proName = undefined;

       this.addSubContractChange();
        this.$refs.refSubContractChangeForm.resetFields();
        this.$nextTick(() => {
          // this.saveBtnDisabledFlag = true;
        })
      },
      handleSaveBtn () {

        if(this.$utils.isEmpty(this.subContractChangeFormId)){
        this.$refs.refSubContractChangeForm.validate( (valid) => {
          if(valid){
            this.saveSubContractChangeForm().then( () =>{
              this.getSubContractChange()
            })
          }else{
            if(this.$utils.isEmpty(this.subContractChangeForm.name)){
              this.$refs.refChangeName.focus()
              this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
              return false;
            }
            if(this.$utils.isEmpty(this.subContractChangeForm.content)){
              this.$refs.refChangeContent.focus()
              this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
              return false;
            }
            this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
            return false;
          }
        })
        }else{
          // 无id 修改

          this.updateSubContractChangeForm();
        }

      },
      handleDeleteBtn () {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          if(this.$utils.isEmpty(this.subContractChangeFormId)){
            this.$set(this.subContractChangeForm,'proId','')
            this.$set(this.subContractChangeForm,'proName','')
            this.$set(this.subContractChangeForm,'proCode','')
            this.addSubContractChange()
          }else{
            this.deleteSubContractChangeForm().then( ()=>{
              this.$set(this.subContractChangeForm,'proId','')
              this.$set(this.subContractChangeForm,'proName','')
              this.$set(this.subContractChangeForm,'proCode','')
              this.addSubContractChange()
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          console.log(error)
        })

      },
      handleAuditBtn () {
        if(this.$utils.isEmpty(this.subContractChangeFormId)) {
          this.$refs.refSubContractChangeForm.validate( (valid) => {
            if(valid){
              this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then( () => {

                this.saveSubContractChangeForm(true).then(() => {
                  this.auditSubContractChangeForm().then(() => {

                    console.log('id',this.subContractChangeForm.id)
                    this.getSubContractChange()
                  })
                })

              }).catch( (error) => {
                console.log(error)
              })
            }else{
              if(this.$utils.isEmpty(this.subContractChangeForm.name)){
                this.$refs.refChangeName.focus()
                this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
                return false;
              }
              if(this.$utils.isEmpty(this.subContractChangeForm.content)){
                this.$refs.refChangeContent.focus()
                this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
                return false;
              }
              this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
              return false;
            }
          })
        }else{
          this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then( () => {

            this.updateSubContractChangeForm(true).then( () => {
              this.auditSubContractChangeForm().then(() => {
                this.getSubContractChange()
              })
            })


          }).catch( (error) => {
            console.log(error)
          })
        }
      },
      /**
       * 点击显示哪种弹窗 项目  合同
       * */
      toipClick(type) {
        if (this.disabled) return
        if (type == 'contract' && !this.subContractChangeForm.proId) return this.$message({message:'请先选择项目',type:'warning'})
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
            if(this.subContractChangeForm.proId !== row.id){
              this.subContractChangeForm = Object.assign({}, this.subContractChangeForm, {
                proName: row.name,
                proId: row.id,
                proCode: row.code,
                contractName: undefined,
                contractId: undefined,
              })
            }
            break
          case 'contract':
            this.subContractChangeForm = Object.assign({}, this.subContractChangeForm, {
              contractName: row.name,
              contractId: row.id,
            })
        }
        this.saveBtnDisabledFlag = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },

      /**
       * 新增表单内容
       * */
      addSubContractChange () {

        this.subContractChangeForm = {
          id:'',
          validateStatus: 2,
          price:'0.00',
          proId:this.subContractChangeForm.proId,
          proName: this.subContractChangeForm.proName,
          proCode: this.subContractChangeForm.proCode,

        };
        this.$refs.refChangeName.focus()
        this.$nextTick( () =>{
          // this.saveBtnDisabledFlag =true
        })
        console.log('this.subContractChangeForm', this.subContractChangeForm)

      },
      /**
       * 获取表单内容
      * */
      getSubContractChange () {
          if(this.subContractChangeFormId){
            return getSubContractChange(this.subContractChangeFormId)
              .then( (res) => {
                if(res.rel){

                  console.log('表单内容',res)
                  this.subContractChangeForm = res.data
                  //  this.$message.success(res.message)
                  this.$nextTick( () =>{
                    // this.saveBtnDisabledFlag =true
                  })
                }else{
                  this.$message({message: res.message,type: 'warning'})
                }
              }).catch(error => {
                console.log(error)
              })
          }else{
            this.addSubContractChange()
          }
      },

      /**
       * save subContractChangeForm
      * */
      saveSubContractChangeForm (boolean) {
        const saveFormData = this.$utils.copy(this.subContractChangeForm);
       return  saveSubContractChange(saveFormData)
                .then( (res) => {
                if(res.status && res.status === 200){
                  console.log('保存成功',res);
                  this.subContractChangeForm.id = res.data.id;
                  this.subContractChangeFormId = res.data.id;
                  //上传文件
                  if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
                  if(!boolean){
                    this.$message.success(res.message)
                  }
                }else{
                  this.$message({message: res.message,type: 'warning'})
                }
              }).catch(error => {
                console.log(error)
              })
      },

      /**
       * 修改 subContractChangeForm
      * */
      updateSubContractChangeForm (boolean) {

        const updateFormData = this.$utils.copy(this.subContractChangeForm);
       return  updateSubContractChange(updateFormData)
                .then( (res) => {
                if(res.status && res.status === 200){
                  console.log('修改成功',res);
                  // this.subContractChangeForm.id = res.data.id;
                  // this.subContractChangeFormId = res.data.id;
                  //上传文件
                  if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
                  if(!boolean){
                    this.$message.success(res.message)
                  }
                }else{
                  this.$message({message: res.message,type: 'warning'})
                }
              }).catch(error => {
                console.log(error)
              })
      },

      /**
       * delete subContractChangeForm
       * */
      deleteSubContractChangeForm () {
        return deleteSubContractChange(this.subContractChangeFormId)
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
       * audit subContractChangeForm
       * */
      auditSubContractChangeForm () {

        console.log('this.subContractChangeForm',this.subContractChangeForm)
        return auditSubContractChange(this.subContractChangeForm)
          .then( (res) => {

            console.log('audit res',res)
            if(res.status && res.status === 200) {
              this.$message.success(res.message)
            }else{
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
      },


      /**
       * 日期转化时间戳
       * */
      fomatDate(){
        this.subContractChangeForm.changeDate = new Date(this.subContractChangeForm.changeDate).getTime();
      },


    }
  }
</script>

<style scoped>
  /* .date-picker {
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
  }

*/
</style>
