<template>
  <div class="tenderFee-container">
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

    <el-form ref="refTenderFeeForm" class="form-container"  :model="tenderFeeForm" label-width="120px" :rules="rules" :show-message="false" >
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-validate-status :model="tenderFeeForm"></basic-validate-status>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编码" >
            <el-input size="small" clearable v-model="tenderFeeForm.code" :disabled="true" placeholder="" placeholder="系统自动生成单据编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
              <el-input size="small"  v-model="tenderFeeForm.proName"
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
          <el-form-item label="费用名称" prop="name" hide-required-asterisk>
            <el-input size="small" clearable
                      show-overflow-tooltip
                      ref="refName"
                      v-model="tenderFeeForm.name"
                      :disabled="disabledFlag"
                      placeholder="请输入费用名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发生日期">
            <el-date-picker size="small" format="yyyy-MM-dd"
                            :editable = "false"
                            @change="fomatDate"
              v-model="tenderFeeForm.date"
              type="date"
              :disabled="disabledFlag"
              placeholder="选择日期" class="date-picker">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="费用金额">

            <basic-input :format="formatToThousands" :formatValue="formatToMoney"
                         :disabled="disabledFlag"  placeholder="请输入费用金额"
                         v-model="tenderFeeForm.sum"></basic-input>

           <!-- <el-input size="small" clearable
                      :disabled="disabledFlag"
                      v-model="tenderFeeForm.sum"
                      @change=":formatValue="formatToMoney""
                      placeholder="请输入费用金额"/>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="经办人员">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      v-model="tenderFeeForm.person" placeholder="请输入经办人员"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="费用明细">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      v-model="tenderFeeForm.detail" type="textarea" placeholder="请输入费用明细" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="补充说明">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      v-model="tenderFeeForm.remark" type="textarea"
                      :max="2000"
                      placeholder="请输入补充说明，不超过5000字" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="文档附件" class="add-border file">
           <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="tenderFeeFormId">
            </basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="登记人员">
            <el-input size="small" clearable  v-model="tenderFeeForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input size="small" clearable  v-model="tenderFeeForm.inputTime" :disabled="true" placeholder="系统自动生成登记时间"/>
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
  import formatBasic from '@/utils/mixins/formatBasic'
  import dialogProject from '@/views/components/dialog/dialogProject'
  import {staticDataBasic} from "@/assets/data/basic";
  export default {
    name: 'TenderFeeDetail',
    components: {
      dialogProject
    },
    mixins: [computed, methods, formatEnum,formatBasic],
    data () {
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,


        tenderFeeFormId:undefined,
        tenderFeeForm: {

        },
        saveBtnDisabledFlag: true,
        modeList:[],

        rules: {
          proName:[
            { required: true, message: '请选择项目名称', trigger: 'change' }

          ],
          name: [
            { required: true, message: '请输入招标名称', trigger: 'change' }
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
          this.tenderFeeFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.tenderFeeForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.tenderFeeForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.tenderFeeForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.tenderFeeFormId = id;
        this.getTenderFee();

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
        return this.tenderFeeForm.validateStatus === 1 ;
      },
      auditBtnDisabledFlag () {
        return this.tenderFeeForm.validateStatus === 1 ;
      },

      disabledFlag () {
        return  this.tenderFeeForm.validateStatus === 1 ;
      }

    },
    watch:{
      tenderFeeForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep:true
      }
    },
    methods:{
      handleAddBtn () {
        this.tenderFeeFormId = undefined;
        this.addTenderFee();
        this.$refs.refTenderFeeForm.resetFields();
        this.$nextTick(() => {
          this.saveBtnDisabledFlag = false;
        })
      },
      handleSaveBtn () {
        if(this.$utils.isEmpty(this.tenderFeeFormId)) {
          this.$refs.refTenderFeeForm.validate( (valid) => {
            if(valid){
              this.saveTenderFeeForm().then( () =>{
                this.getTenderFee()
              })
            }else{
              if(this.$utils.isEmpty(this.tenderFeeForm.name)){
                this.$refs.refName.focus()
                this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
                return false;
              }
              this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
              return false;
            }
          })
        }else{
          this.updateTenderFeeForm()
        }

      },
      handleDeleteBtn () {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          if(this.$utils.isEmpty(this.tenderFeeFormId)){
            this.addTenderFee()
            this.$set(this.tenderFeeForm,'proId','')
            this.$set(this.tenderFeeForm,'proName','')
            this.$set(this.tenderFeeForm,'proCode','')
          }else{
            this.deleteTenderFeeForm().then( ()=>{
              this.addTenderFee()
              this.$set(this.tenderFeeForm,'proId','')
              this.$set(this.tenderFeeForm,'proName','')
              this.$set(this.tenderFeeForm,'proCode','')
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          console.log(error)
        })

      },
      handleAuditBtn () {
        if(this.$utils.isEmpty(this.tenderFeeFormId)) {
          this.$refs.refTenderFeeForm.validate( (valid) => {
            if(valid){
              this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then( () => {

                this.saveTenderFeeForm(true).then(() => {
                  this.auditTenderFeeForm().then(() => {

                    console.log('id',this.tenderFeeForm.id)
                    this.getTenderFee()
                  })
                })

              }).catch( (error) => {
                console.log(error)
              })
            }else{
              if(this.$utils.isEmpty(this.tenderFeeForm.name)){
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

            this.updateTenderFeeForm(true).then(() =>{
              this.auditTenderFeeForm().then(() => {
                this.getTenderFee()
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
      addTenderFee () {

        this.tenderFeeForm = {
          id:'',
          validateStatus: 2,
          sum: '0.00',
          proId:this.tenderFeeForm.proId,
          proName: this.tenderFeeForm.proName,
          proCode: this.tenderFeeForm.proCode,

        };
        this.$refs.refName.focus()

        console.log('this.tenderFeeForm', this.tenderFeeForm)

      },
      /**
       * 获取表单内容
       * */
      getTenderFee () {
        if(this.tenderFeeFormId){
          return this.$store.dispatch('GetTenderFee',this.tenderFeeFormId)
            .then( (res) => {
              if(res.rel){

                console.log('表单内容',res)
                this.tenderFeeForm = res.data
                this.$nextTick(() => {
                  // this.saveBtnDisabledFlag = true;
                })
                //  this.$message.success(res.message)
              }else{
                this.$message({message: res.message,type: 'warning'})
              }
            }).catch(error => {
              console.log(error)
            })
        }else{
          this.addTenderFee()
        }
      },


      /**
       * save tenderFeeForm
       * */
      saveTenderFeeForm (boolean) {
        const saveFormData = this.$utils.copy(this.tenderFeeForm);
        return  this.$store.dispatch('SaveTenderFee',saveFormData)
          .then( (res) => {
            if(res.status && res.status === 200){
              console.log('保存成功',res);
              this.tenderFeeForm.id = res.data.id;
              this.tenderFeeFormId = res.data.id;
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
      updateTenderFeeForm (boolean) {
        const updateFormData = this.$utils.copy(this.tenderFeeForm);
        return  this.$store.dispatch('UpdateTenderFee',updateFormData)
          .then( (res) => {
            if(res.status && res.status === 200){
              console.log('保存成功',res);
              this.tenderFeeForm.id = res.data.id;
              this.tenderFeeFormId = res.data.id;
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
       * delete tenderFeeForm
       * */
      deleteTenderFeeForm () {
        return this.$store.dispatch('DeleteTenderFee', this.tenderFeeFormId)
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
       * audit tenderFeeForm
       * */
      auditTenderFeeForm () {

        console.log('this.tenderFeeForm',this.tenderFeeForm)
        return this.$store.dispatch('AuditTenderFee',this.tenderFeeForm)
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
            this.tenderFeeForm = Object.assign({}, this.tenderFeeForm, {
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
        this.tenderFeeForm.date = new Date(this.tenderFeeForm.date).getTime();
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
