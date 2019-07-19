<template>
  <div class="TenderResult-container">
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

    <el-form ref="refTenderResultForm" class="form-container"  :model="tenderResultForm" label-width="120px" :rules="rules" :show-message="false" >
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-validate-status :model="tenderResultForm"></basic-validate-status>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编码" >
            <el-input size="small" clearable v-model="tenderResultForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
              <el-input size="small"  v-model="tenderResultForm.proName"
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
          <el-form-item label="投标结果" prop="mode">
            <el-select size="small" class="mode-select"
                       v-model="tenderResultForm.result "
                       placeholder="请选择投标结果"
                       :disabled="disabledFlag"
            >

              <el-option
                v-for="(item, index ) in tenderResultList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公布日期">
            <el-date-picker size="small" format="yyyy-MM-dd"
                            :editable = "false"
                            @change="fomatDate"
              v-model="tenderResultForm.date"
              type="date"
              :disabled="disabledFlag"
              placeholder="选择日期" class="date-picker">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总控制价">
            <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                       clearable
                       :disabled="disabledFlag"
                       v-model="tenderResultForm.controlTotalPrice" placeholder="请输入总控制价"></basic-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="投标均价">
            <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                       clearable
                       :disabled="disabledFlag"
                       v-model="tenderResultForm.averagePrice" placeholder="请输入投标均价"></basic-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="评标总价">
            <basic-input :formatValue="formatToMoney" :format="formatToThousands"
              clearable
                      :disabled="disabledFlag"
                       v-model="tenderResultForm.estimateTotalPrice" placeholder="请输入评标总价"></basic-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="中标总价">
            <basic-input :formatValue="formatToMoney" :format="formatToThousands"
              clearable
              :disabled="disabledFlag"
                       v-model="tenderResultForm.winTotalPrice" placeholder="请输入中标总价"></basic-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="第一中标人">
            <el-input size="small"
              clearable
              v-model="tenderResultForm.firstWinPerson"
              placeholder="请输入第一中标人"
              :disabled="disabledFlag"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="第二中标人">
            <el-input size="small"
              clearable
              v-model="tenderResultForm.secondWinPerson"
              placeholder="请输入第二中标人"
              :disabled="disabledFlag"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="第三中标人">
            <el-input size="small"
              clearable
              v-model="tenderResultForm.thirdWinPerson"
              placeholder="请输入第三中标人"
              :disabled="disabledFlag"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="第一中标总价">
            <basic-input :formatValue="formatToMoney" :format="formatToThousands"
              clearable
              v-model="tenderResultForm.firstWinTotalPrice"
              placeholder="请输入第一中标总价"
              :disabled="disabledFlag"
            ></basic-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="第二中标总价">
            <basic-input :formatValue="formatToMoney" :format="formatToThousands"
              clearable
              v-model="tenderResultForm.secondWinTotalPrice"
              placeholder="请输入第二中标总价"
              :disabled="disabledFlag"
            ></basic-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="第三中标总价">
            <basic-input :formatValue="formatToMoney" :format="formatToThousands"
              clearable
              v-model="tenderResultForm.thirdWinTotalPrice"
              placeholder="请输入第三中标总价"
              :disabled="disabledFlag"
            ></basic-input>
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
                      v-model="tenderResultForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="附件" class="add-border file">
           <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="tenderResultFormId">
            </basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="登记人员">
            <el-input size="small" clearable  v-model="tenderResultForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input size="small" clearable  v-model="tenderResultForm.inputTime" :disabled="true" placeholder="系统自动生成登记时间"/>
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
  import formatBasic from '@/utils/mixins/formatBasic'
  export default {
    name: 'TenderResultDetail',
    components: {
      dialogProject
    },
    mixins: [computed, methods, formatEnum, formatBasic],
    data () {
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,


        tenderResultFormId:undefined,
        tenderResultForm: {},
        saveBtnDisabledFlag: true,

        rules: {
          proName:[
            { required: true, message: '请选择项目名称', trigger: 'change' }

          ],
          result: [
            { required: true, message: '请选择投标结果', trigger: 'change' }
          ],

        },
        tenderResultList: [],

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
          this.tenderResultFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.tenderResultForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.tenderResultForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.tenderResultForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.tenderResultFormId = id;
        this.getTenderResult();

      });
    },
    created () {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData'
      ]);

      setTimeout( () => {

        this.getTenderResultList();
      },100)
      this.$store.dispatch("cacheId",'0');//刷新
    },
    computed:{
      deleteBtnDisabledFlag () {
        return this.tenderResultForm.validateStatus === 1 ;
      },
      auditBtnDisabledFlag () {
        return this.tenderResultForm.validateStatus === 1 ;
      },

      disabledFlag () {
        return  this.tenderResultForm.validateStatus === 1 ;
      }


    },
    watch:{
      tenderResultForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep:true
      }
    },
    methods:{
      handleAddBtn () {
        this.tenderResultFormId = undefined;
        this.addTenderResult();
        this.$refs.refTenderResultForm.resetFields();
        this.$nextTick(() => {
          // this.saveBtnDisabledFlag = true;
        })
      },
      handleSaveBtn () {
        if(this.$utils.isEmpty(this.tenderResultFormId)){
          this.$refs.refTenderResultForm.validate( (valid) => {
            if(valid){
              this.saveTenderResultForm().then( () =>{
                this.getTenderResult()
              })
            }else{
              return false;
            }
          })
        }else{
          this.updateTenderResultForm()
        }

      },
      handleDeleteBtn () {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          if(this.$utils.isEmpty(this.tenderResultFormId)){
            this.addTenderResult()
            this.$set(this.tenderResultForm,'proId','')
            this.$set(this.tenderResultForm,'proName','')
            this.$set(this.tenderResultForm,'proCode','')
          }else{
            this.deleteTenderResultForm().then( ()=>{
              this.addTenderResult()
              this.$set(this.tenderResultForm,'proId','')
              this.$set(this.tenderResultForm,'proName','')
              this.$set(this.tenderResultForm,'proCode','')
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          console.log(error)
        })

      },
      handleAuditBtn () {
        if(this.$utils.isEmpty(this.tenderResultFormId)) {
          this.$refs.refTenderResultForm.validate( (valid) => {
            if(valid){
              this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then( () => {

                this.saveTenderResultForm(true).then(() => {
                  this.auditTenderResultForm().then(() => {

                    console.log('id',this.tenderResultForm.id)
                    this.getTenderResult()
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

            this.updateTenderResultForm(true).then( () => {
              this.auditTenderResultForm().then(() => {
                this.getTenderResult()
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
      addTenderResult () {

        this.tenderResultForm = {
          id:'',
          validateStatus: 2,
          controlTotalPrice: '0.00',
          averagePrice: '0.00',
          estimateTotalPrice: '0.00',
          winTotalPrice: '0.00',
          firstWinTotalPrice: '0.00',
          secondWinTotalPrice: '0.00',
          thirdWinTotalPrice: '0.00',
          result:'中标',
          proId:this.tenderResultForm.proId,
          proName: this.tenderResultForm.proName,
          proCode: this.tenderResultForm.proCode,
        };
        console.log('this.tenderResultForm', this.tenderResultForm)

      },
      /**
       * 获取表单内容
       * */
      getTenderResult () {
        if(this.tenderResultFormId){
          return this.$store.dispatch('GetTenderResult',this.tenderResultFormId)
            .then( (res) => {
              if(res.rel){

                console.log('表单内容',res)
                this.tenderResultForm = res.data
                //  this.$message.success(res.message)
              }else{
                this.$message({message: res.message,type: 'warning'})
              }
            }).catch(error => {
              console.log(error)
            })
        }else{
          this.addTenderResult()
        }
      },

      /**
       * save tenderResultForm
       * */
      saveTenderResultForm (boolean) {
        const saveFormData = this.$utils.copy(this.tenderResultForm);
        return  this.$store.dispatch('SaveTenderResult',saveFormData)
          .then( (res) => {
            if(res.status && res.status === 200){
              console.log('保存成功',res);
              this.tenderResultForm.id = res.data.id;
              this.tenderResultFormId = res.data.id;
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
      updateTenderResultForm (boolean) {
        const updateFormData = this.$utils.copy(this.tenderResultForm);
        return  this.$store.dispatch('UpdateTenderResult',updateFormData)
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
       * delete tenderResultForm
       * */
      deleteTenderResultForm () {
        return this.$store.dispatch('DeleteTenderResult', this.tenderResultFormId)
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
       * audit tenderResultForm
       * */
      auditTenderResultForm () {

        console.log('this.tenderResultForm',this.tenderResultForm)
        return this.$store.dispatch('AuditTenderResult',this.tenderResultForm)
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
            this.tenderResultForm = Object.assign({}, this.tenderResultForm, {
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
       * 投标结果
      * */
      getTenderResultList () {
        this.$store.dispatch('GetDictionaryDataByTypeFilterTenderResult','BPMA_BID_RESULT')
          .then((res) => {
            if(res.rel){
              console.log('tenderResultList',res)
              this.tenderResultList = res.data;
              console.log('this.tenderResultList', this.tenderResultList)
            }else{
              this.$message({message: res.message,type: 'warning'})
            }
          }).catch(error => {
          console.log(error)
        })
      },

      /**
       * 日期转化时间戳
       * */
      fomatDate(){
        this.tenderResultForm.date = new Date(this.tenderResultForm.date).getTime();
      }

    }
  }
</script>

<style scoped>
/*  .date-picker {
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
  }*/


</style>
