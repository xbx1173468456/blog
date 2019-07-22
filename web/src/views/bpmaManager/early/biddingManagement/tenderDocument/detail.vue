<template>
  <div class="TenderDocument-container">
    <div class="handler-container">
      <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"

                 @click="handleAddBtn" >新增</el-button>
      <el-button  v-if="saveBtnShowFlag"  type="primary" icon="el-icon-if-save" size="small" plain

                  @click="handleSaveBtn" :disabled="saveBtnDisabledFlag || auditBtnDisabledFlag">保存</el-button>

      <el-button v-if="deleteBtnShowFlag" type="danger" icon="el-icon-delete" size="small" plain
                 @click="handleDeleteBtn" :disabled="deleteBtnDisabledFlag">删除
      </el-button>
      <el-button v-if="auditBtnShowFlag" type="primary" icon="el-icon-if-auth" size="small" plain
                 @click="handleAuditBtn" :disabled="auditBtnDisabledFlag">审核
      </el-button>
    </div>

    <el-form ref="refTenderDocumentForm" class="form-container"  :model="tenderDocumentForm" label-width="120px" :rules="rules" :show-message="false" >
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-validate-status :model="tenderDocumentForm"></basic-validate-status>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编码" >
            <el-input size="small" clearable v-model="tenderDocumentForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
              <el-input size="small"  v-model="tenderDocumentForm.proName"
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
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="文件名称" prop="name" hide-required-asterisk>
            <el-input size="small" clearable
                      show-overflow-tooltip
                      ref="refName"
                      v-model="tenderDocumentForm.name"
                      :disabled="disabledFlag"
                      placeholder="请输入文件名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人员">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      v-model="tenderDocumentForm.person" placeholder="请输入编制人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="完成日期">
            <el-date-picker size="small" format="yyyy-MM-dd"
                            :editable = "false"
                            @change="fomatDate"
              v-model="tenderDocumentForm.date"
              type="date"
              :disabled="disabledFlag"
              placeholder="选择日期" class="date-picker">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="文件内容">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      :max="5000"
                      v-model="tenderDocumentForm.content" type="textarea" placeholder="请输入文件内容，不超过5000字" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="补充说明">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      :max="2000"
                      v-model="tenderDocumentForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="附件" class="add-border file">
           <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="tenderDocumentFormId">
            </basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="登记人员">
            <el-input size="small" clearable  v-model="tenderDocumentForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input size="small" clearable  v-model="tenderDocumentForm.inputTime" :disabled="true" placeholder="系统自动生成登记时间"/>
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
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import dialogProject from '@/views/components/dialog/dialogProject'
  import {staticDataBasic} from "@/assets/data/basic";
  export default {
    name: 'TenderDocumentDetail',
    components: {
      dialogProject
    },
    mixins: [computed, methods, formatEnum],
    data () {
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,


        tenderDocumentFormId:undefined,
        tenderDocumentForm: {},
        saveBtnDisabledFlag: true,

        rules: {
          proName:[
            { required: true, message: '请选择项目名称', trigger: 'change' }

          ],
          name: [
            { required: true, message: '请输入文件名称', trigger: 'change' }
          ]
        },

        type: null,
        visibleSyncProject:false,
        selectedRow: {}

      }
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if(this.$route.params) {
          this.tenderDocumentFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.tenderDocumentForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.tenderDocumentForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.tenderDocumentForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.tenderDocumentFormId = id;
        this.getTenderDocument();

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
        return this.tenderDocumentForm.validateStatus === 1 ;
      },
      auditBtnDisabledFlag () {
        return this.tenderDocumentForm.validateStatus === 1 ;
      },

      disabledFlag () {
        return  this.tenderDocumentForm.validateStatus === 1 ;
      }

    },
    watch:{
      tenderDocumentForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep:true
      }
    },
    methods:{
      handleAddBtn () {
        this.tenderDocumentFormId = undefined;
        this.addTenderDocument();
        this.$refs.refTenderDocumentForm.resetFields();
        this.$nextTick(() => {
          // this.saveBtnDisabledFlag = true;
        })
      },
      handleSaveBtn () {
        if(this.$utils.isEmpty(this.tenderDocumentFormId)){
          this.$refs.refTenderDocumentForm.validate( (valid) => {
            if(valid){
              this.saveTenderDocumentForm().then( () =>{
                this.getTenderDocument()
              })
            }else{
              if(this.$utils.isEmpty(this.tenderDocumentForm.name)){
                this.$refs.refName.focus()
                this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
                return false;
              }
              this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
              return false;
            }
          })
        }else{
          this.updateTenderDocumentForm()
        }

      },
      handleDeleteBtn () {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          if(this.$utils.isEmpty(this.tenderDocumentFormId)){
            this.addTenderDocument()
            this.$set(this.tenderDocumentForm,'proId','')
            this.$set(this.tenderDocumentForm,'proName','')
            this.$set(this.tenderDocumentForm,'proCode','')
          }else{
            this.deleteTenderDocumentForm().then( ()=>{
              this.addTenderDocument()
              this.$set(this.tenderDocumentForm,'proId','')
              this.$set(this.tenderDocumentForm,'proName','')
              this.$set(this.tenderDocumentForm,'proCode','')
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          console.log(error)
        })

      },
      handleAuditBtn () {
        if(this.$utils.isEmpty(this.tenderDocumentFormId)) {
          this.$refs.refTenderDocumentForm.validate( (valid) => {
            if(valid){

              this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then( () => {

                this.saveTenderDocumentForm(true).then(() => {
                  this.auditTenderDocumentForm().then(() => {

                    console.log('id',this.tenderDocumentForm.id)
                    this.getTenderDocument()
                  })
                })

              }).catch( (error) => {
                console.log(error)
              })
            }else{
              if(this.$utils.isEmpty(this.tenderDocumentForm.name)){
                this.$refs.refName.focus()
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

            this.updateTenderDocumentForm(true).then( () => {
              this.auditTenderDocumentForm().then(() => {
                this.getTenderDocument()
              })
            })


          }).catch( (error) => {
            console.log(error)
          })
        }
      },
      handleShowItemNameBtn () {
        this.dialogTableVisible = true
      },
      /**
       * 新增表单内容
       * */
      addTenderDocument () {

        this.tenderDocumentForm = {
          id:'',
          validateStatus: 2,
          proId:this.tenderDocumentForm.proId,
          proName: this.tenderDocumentForm.proName,
          proCode: this.tenderDocumentForm.proCode,

        };
        this.$refs.refName.focus()
        console.log('this.tenderDocumentForm', this.tenderDocumentForm)

      },
      /**
       * 获取表单内容
      * */
      getTenderDocument () {
        if(this.tenderDocumentFormId){
          return this.$store.dispatch('GetTenderDocument',this.tenderDocumentFormId)
            .then( (res) => {
              if(res.rel){

                console.log('表单内容',res)
                this.tenderDocumentForm = res.data
                //  this.$message.success(res.message)
              }else{
                this.$message({message: res.message,type: 'warning'})
              }
            }).catch(error => {
              console.log(error)
            })
        }else{
          this.addTenderDocument()
        }
      },


      /**
       * save tenderDocumentForm
       * */
      saveTenderDocumentForm (boolean) {
        const saveFormData = this.$utils.copy(this.tenderDocumentForm);
        return  this.$store.dispatch('SaveTenderDocument',saveFormData)
          .then( (res) => {
            if(res.status && res.status === 200){
              console.log('保存成功',res);
              this.tenderDocumentForm.id = res.data.id;
              this.tenderDocumentFormId = res.data.id;
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
       * 修改 Form
       * */
      updateTenderDocumentForm (boolean) {
        const updateFormData = this.$utils.copy(this.tenderDocumentForm);
        return  this.$store.dispatch('UpdateTenderDocument',updateFormData)
          .then( (res) => {
            if(res.status && res.status === 200){
              //上传文件
              if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
              console.log('修改成功',res);
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
       * delete tenderDocumentForm
       * */
      deleteTenderDocumentForm () {
        return this.$store.dispatch('DeleteTenderDocument', this.tenderDocumentFormId)
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
       * audit tenderDocumentForm
       * */
      auditTenderDocumentForm () {

        console.log('this.tenderDocumentForm',this.tenderDocumentForm)
        return this.$store.dispatch('AuditTenderDocument',this.tenderDocumentForm)
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
       * 项目名称-选择
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
        // console.log('detailRow',row)
        switch (this.type) {
          case 'project':
            this.tenderDocumentForm = Object.assign({}, this.tenderDocumentForm, {
              proName : row.name,
              proId : row.id,
              proCode : row.code
            })

            break
        }
        this.saveBtnDisabledFlag = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      /**
       * 日期转化时间戳
       * */
      fomatDate(){
        this.tenderDocumentForm.date = new Date(this.tenderDocumentForm.date).getTime();
      }

    }
  }
</script>

<style scoped>
/*
  .date-picker {
    width: 100%;

  }

  .date-picker >>> .el-input__inner {
    padding-left: 35px;
  }

  .form-btn {
    margin-bottom: -10px;
  }

  .mode-select {
    width: 100%;
  }
*/


</style>
