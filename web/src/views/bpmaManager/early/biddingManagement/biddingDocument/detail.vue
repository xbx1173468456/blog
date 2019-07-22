<template>
  <div class="biddingDocument-container">
    <div class="handler-container">
      <el-button v-if="addBtnShowFlag" type="primary" icon="el-icon-plus" size="small"

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

    <el-form ref="refDocumentForm" class="form-container"  :model="documentForm" label-width="120px" :rules="rules" :show-message="false" >
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-validate-status :model="documentForm"></basic-validate-status>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编码" >
            <el-input size="small" clearable v-model="documentForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
              <el-input size="small"  v-model="documentForm.proName"
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
                      v-model="documentForm.name"
                      :disabled="disabledFlag"
                      placeholder="请输入文件名称"/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="获取人员">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      v-model="documentForm.person" placeholder="请输入联系人员"/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
        <el-form-item label="获取日期">
          <el-date-picker size="small" format="yyyy-MM-dd"
                          :editable = "false"
                          @change="fomatDate"
            v-model="documentForm.date"
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
                      v-model="documentForm.content" type="textarea" placeholder="请输入文件内容，不超过5000字" />
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
                      v-model="documentForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="附件" class="add-border file">
           <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="documentFormId">
            </basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="登记人员">
            <el-input size="small" clearable  v-model="documentForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input size="small" clearable  v-model="documentForm.inputTime" :disabled="true" placeholder="系统自动生成登记时间"/>
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
    name: 'BiddingDocumentDetail',
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


        documentFormId:undefined,
        documentForm: {},
        saveBtnDisabledFlag: true,

        rules: {
          proName:[
            { required: true, message: '请选择项目名称', trigger: 'change' }

          ],
          name: [
            { required: true, message: '请输入文件名称', trigger: 'change' }
          ],
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
        if (this.$route.params ) {
          this.documentFormId =  this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.documentFormId = this.$route.params.id ? this.$route.params.id : undefined;
          this.documentForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.documentForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.documentForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.documentFormId = id
        this.getDocument();
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
        return this.documentForm.validateStatus === 1 ;
      },
      auditBtnDisabledFlag () {
        return this.documentForm.validateStatus === 1 ;
      },

      disabledFlag () {
        return  this.documentForm.validateStatus === 1 ;
      }

    },
    watch:{
      documentForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep:true
      }
    },
    methods:{
      handleAddBtn () {
        this.documentFormId=undefined;
       this.addDocument();
        this.$refs.refDocumentForm.resetFields();
        this.$nextTick(() => {
          // this.saveBtnDisabledFlag = true;
        })
      },
      handleSaveBtn () {
        if(this.$utils.isEmpty(this.documentFormId)){
          this.$refs.refDocumentForm.validate( (valid) => {
            if(valid){
              this.saveDocumentForm().then( () => {
                this.getDocument()
              })
            }else{
              if(this.$utils.isEmpty(this.documentForm.name)){
                this.$refs.refName.focus()
                this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
                return false;
              }
              this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
              return false;
            }
          })
        }else{
          this.updateDocumentForm()
        }

      },
      handleDeleteBtn () {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          if(this.$utils.isEmpty(this.documentFormId)){
            this.addDocument()
            this.$set(this.documentForm,'proId','')
            this.$set(this.documentForm,'proName','')
            this.$set(this.documentForm,'proCode','')
          }else{
            this.deleteDocumentForm().then( ()=>{
              this.addDocument()
              this.$set(this.documentForm,'proId','')
              this.$set(this.documentForm,'proName','')
              this.$set(this.documentForm,'proCode','')
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          console.log(error)
        })

      },
      handleAuditBtn () {
        if(this.$utils.isEmpty(this.documentFormId)) {
          this.$refs.refDocumentForm.validate( (valid) => {
            if(valid){
              this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then( () => {

                this.saveDocumentForm(true).then(() => {
                  this.auditDocumentForm().then(() => {

                    console.log('id',this.documentForm.id)
                    this.getDocument()
                  })
                })

              }).catch( (error) => {
                console.log(error)
              })
            }else{
              if(this.$utils.isEmpty(this.documentForm.name)){
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

            this.updateDocumentForm(true).then( () =>{
              this.auditDocumentForm().then(() => {
                this.getDocument()
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
      addDocument () {

        this.documentForm = {
          id:'',
          validateStatus: 2,
          proId:this.documentForm.proId,
          proName: this.documentForm.proName,
          proCode: this.documentForm.proCode,

        };
        this.$refs.refName.focus()
        console.log('this.documentForm', this.documentForm)

      },
      /**
       * 获取表单内容
      * */
      getDocument () {
          if(!this.documentFormId){
            this.addDocument()
          }else{
            return this.$store.dispatch('GetDocument',this.documentFormId)
              .then( (res) => {
                if(res.rel){

                  console.log('表单内容',res)
                  this.documentForm = res.data
                  //  this.$message.success(res.message)
                }else{
                  this.$message({message: res.message,type: 'warning'})
                }
              }).catch(error => {
              console.log(error)
            })
          }
      },
      /**
       * save documentForm
      * */
      saveDocumentForm (boolean) {
        const saveFormData = this.$utils.copy(this.documentForm);
        console.log('saveFormData',saveFormData)
        return this.$store.dispatch('SaveDocument', saveFormData)
          .then((res) => {
            if (res.rel) {
              console.log('保存成功', res);
              this.documentForm.id = res.data.id;
              this.documentFormId = res.data.id;
              //上传文件
              if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
              if(!boolean){
                this.$message.success(res.message)
              }
            } else {
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
      },
      /**
       * 修改 documentForm
       * */
      updateDocumentForm (boolean) {
        const updateFormData = this.$utils.copy(this.documentForm);
        return this.$store.dispatch('UpdateDocument', updateFormData)
          .then((res) => {
            if (res.rel) {
              console.log('修改成功', res);
              //上传文件
              if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
              if(!boolean){
                this.$message.success(res.message)
              }
            } else {
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
      },
      /**
       * delete documentForm
       * */
      deleteDocumentForm () {
        return this.$store.dispatch('DeleteDocument', this.documentFormId)
          .then((res) => {
            if (res.rel) {
              this.$message.success(res.message)
            } else {
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
      },
      /**
       * audit documentForm
       * */
      auditDocumentForm () {
        return this.$store.dispatch('AuditDocument',this.documentForm)
          .then( (res) => {
            if(res.rel) {
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
            this.documentForm = Object.assign({}, this.documentForm, {
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
        this.documentForm.date = new Date(this.documentForm.date).getTime();
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
