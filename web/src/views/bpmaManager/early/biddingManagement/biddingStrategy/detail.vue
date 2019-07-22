<template>
  <div class="biddingStrategy-container">
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

    <el-form ref="refBiddingStrategyForm" class="form-container"  :model="biddingStrategyForm" label-width="120px" :rules="rules" :show-message="false" >
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-validate-status :model="biddingStrategyForm"></basic-validate-status>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编码" >
            <el-input size="small" clearable v-model="biddingStrategyForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
              <el-input size="small"  v-model="biddingStrategyForm.proName"
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

          <el-form-item label="是否投标" prop="date" class="add-border" >

            <el-radio-group v-model="biddingStrategyForm.date" >
              <el-radio :label="parseInt(row.code)"
                        v-for="(row, key, index) in dataEnum.isOrNot"
                        :key="row.code" :disabled="disabledFlag">
                {{ row.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商务负责人员">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      v-model="biddingStrategyForm.busiPerson" placeholder="请输入商务负责人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="技术负责人员">
            <el-input size="small"
              clearable
              v-model="biddingStrategyForm.techPerson"
              placeholder="请输入技术负责人员"
              :disabled="disabledFlag"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="协作人员">
            <el-input size="small"
                      clearable
                      v-model="biddingStrategyForm.partner"
                      placeholder="请输入协作人员"
                      :disabled="disabledFlag"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="商务策略">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      v-model="biddingStrategyForm.busiStrategy" type="textarea" placeholder="请输入商务策略" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="技术策略">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      v-model="biddingStrategyForm.techStrategy" type="textarea" placeholder="请输入技术策略" />
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
                      v-model="biddingStrategyForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="附件" class="add-border file">
           <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="biddingStrategyFormId">
            </basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="登记人员">
            <el-input size="small" clearable  v-model="biddingStrategyForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input size="small" clearable  v-model="biddingStrategyForm.inputTime" :disabled="true" placeholder="系统自动生成登记时间"/>
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
  export default {
    name: 'BiddingStrategyDetail',
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


        biddingStrategyFormId:undefined,
        biddingStrategyForm: {},
        saveBtnDisabledFlag: true,

        rules: {
          proName:[
            { required: true, message: '请选择项目名称', trigger: 'change' }

          ],
          date:[
            { required: true, message: '请选择是否投标', trigger: 'change' }
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
          this.biddingStrategyFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.biddingStrategyForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.biddingStrategyForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.biddingStrategyForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      }, (id) => {
        this.biddingStrategyFormId = id
        this.getBiddingStrategy();

      });
    },
    created () {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetIsOrNotData'
      ]);
      this.$store.dispatch("cacheId",'0');//刷新
    },
    computed:{
      deleteBtnDisabledFlag () {
        return this.biddingStrategyForm.validateStatus === 1 ;
      },
      auditBtnDisabledFlag () {
        return this.biddingStrategyForm.validateStatus === 1 ;
      },

      disabledFlag () {
        return  this.biddingStrategyForm.validateStatus === 1 ;
      }

    },
    watch:{
      biddingStrategyForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep:true
      }
    },
    methods:{
      handleAddBtn () {
        this.biddingStrategyFormId = undefined;
       this.addBiddingStrategy();
        this.$refs.refBiddingStrategyForm.resetFields();
        this.$nextTick(() => {
          // this.saveBtnDisabledFlag = true;
        })
      },
      handleSaveBtn () {
        if(this.$utils.isEmpty(this.biddingStrategyFormId)){
          this.$refs.refBiddingStrategyForm.validate( (valid) => {
            if(valid){
              this.saveBiddingStrategyForm().then( () =>{
                this.getBiddingStrategy()
              })
            }else{
              return false;
            }
          })
        }else{
          this.updateBiddingStrategyForm()
        }

      },
      handleDeleteBtn () {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          if(this.$utils.isEmpty(this.biddingStrategyFormId)){
            this.addBiddingStrategy()
            this.$set(this.biddingStrategyForm,'proId','')
            this.$set(this.biddingStrategyForm,'proName','')
            this.$set(this.biddingStrategyForm,'proCode','')
          }else{
            this.deleteBiddingStrategyForm().then( ()=>{
              this.addBiddingStrategy()
              this.$set(this.biddingStrategyForm,'proId','')
              this.$set(this.biddingStrategyForm,'proName','')
              this.$set(this.biddingStrategyForm,'proCode','')
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          console.log(error)
        })

      },
      handleAuditBtn () {
        if(this.$utils.isEmpty(this.biddingStrategyFormId)) {
          this.$refs.refBiddingStrategyForm.validate( (valid) => {
            if(valid){
              this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then( () => {

                this.saveBiddingStrategyForm(true).then(() => {
                  this.auditBiddingStrategyForm().then(() => {

                    console.log('id',this.biddingStrategyForm.id)
                    this.getBiddingStrategy()
                  })
                })

              }).catch( (error) => {
                console.log(error)
              })
            }else{
              return false;
            }
          })
        }else{
          this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then( () => {

            this.updateBiddingStrategyForm(true).then( ()=>{
              this.auditBiddingStrategyForm().then(() => {
                this.getBiddingStrategy()
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
      addBiddingStrategy () {

        this.biddingStrategyForm = {
          id:'',
          validateStatus: 2,
          date:1,
          proId:this.biddingStrategyForm.proId,
          proName: this.biddingStrategyForm.proName,
          proCode: this.biddingStrategyForm.proCode,

        };
        console.log('this.biddingStrategyForm', this.biddingStrategyForm)

      },
      /**
       * 获取表单内容
       * */
      getBiddingStrategy () {
        if(this.biddingStrategyFormId){
          return this.$store.dispatch('GetBiddingStrategy',this.biddingStrategyFormId)
            .then( (res) => {
              if(res.rel){

                console.log('表单内容',res)
                this.biddingStrategyForm = res.data
                //  this.$message.success(res.message)
              }else{
                this.$message({message: res.message,type: 'warning'})
              }
            }).catch(error => {
              console.log(error)
            })
        }else{
          this.addBiddingStrategy()
        }
      },

      /**
       * save biddingStrategyForm
       * */
      saveBiddingStrategyForm (boolean) {
        const saveFormData = this.$utils.copy(this.biddingStrategyForm);
        return  this.$store.dispatch('SaveBiddingStrategy',saveFormData)
          .then( (res) => {
            if(res.status && res.status === 200){
              console.log('保存成功',res);
              this.biddingStrategyForm.id = res.data.id;
              this.biddingStrategyFormId = res.data.id;
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
      updateBiddingStrategyForm (boolean) {
        const updateFormData = this.$utils.copy(this.biddingStrategyForm);
        return  this.$store.dispatch('UpdateBiddingStrategy',updateFormData)
          .then( (res) => {
            if(res.status && res.status === 200){
              console.log('update成功',res);
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
       * delete biddingStrategyForm
       * */
      deleteBiddingStrategyForm () {
        return this.$store.dispatch('DeleteBiddingStrategy', this.biddingStrategyFormId)
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
       * audit biddingStrategyForm
       * */
      auditBiddingStrategyForm () {

        console.log('this.biddingStrategyForm',this.biddingStrategyForm)
        return this.$store.dispatch('AuditBiddingStrategy',this.biddingStrategyForm)
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
            this.biddingStrategyForm = Object.assign({}, this.biddingStrategyForm, {
              proName : row.name,
              proId : row.id,
              proCode : row.code
            })

            break
        }
        this.saveBtnDisabledFlag = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },

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

*/


</style>
