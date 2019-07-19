<template>
  <div class="biddingAnnouncement-container">
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

    <el-form ref="refAnnouncementForm" class="form-container"  :model="announcementForm" label-width="120px" :rules="rules" :show-message="false">
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-validate-status :model="announcementForm"></basic-validate-status>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编码" >
            <el-input size="small" clearable v-model="announcementForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
              <el-input size="small"  v-model="announcementForm.proName"
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
          <el-form-item label="招标名称" prop="name" hide-required-asterisk>
            <el-input size="small" clearable
                      show-overflow-tooltip
                      ref="refName"
                      v-model="announcementForm.name"
                      :disabled="disabledFlag"
                      placeholder="请输入招标名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招标方式(※)" prop="mode">
            <el-select size="small" class="mode-select"
                       v-model="announcementForm.mode"
                       placeholder="请选择招标方式"
                       :disabled="disabledFlag"
            >
              <el-option
                v-for="(item, index ) in modeList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="发布日期">
          <el-date-picker size="small"
                          :editable = "false"
            format="yyyy-MM-dd"
            @change="fomatDate"
            v-model="announcementForm.date"
            type="date"
            :disabled="disabledFlag"
            placeholder="选择日期" class="date-picker">
          </el-date-picker>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="联系人员">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      v-model="announcementForm.person" placeholder="请输入联系人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      v-model="announcementForm.telephone" placeholder="请输入联系电话"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招标地点">
            <el-input size="small"
              clearable
              v-model="announcementForm.address"
              placeholder="请输入招标地点"
              :disabled="disabledFlag"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="公告内容">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      :max="5000"
                      v-model="announcementForm.content" type="textarea" placeholder="请输入公告内容，不超过5000字" />
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
                      v-model="announcementForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="附件" class="add-border file">
            <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="announcementFormId" >
            </basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="登记人员">
            <el-input size="small" clearable  v-model="announcementForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input size="small" clearable  v-model="announcementForm.inputTime" :disabled="true" placeholder="系统自动生成登记时间"/>
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
    name: 'BiddingAnnouncementDetail',
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


        announcementFormId:undefined,
        announcementForm: {},
        saveBtnDisabledFlag: true,
        modeList:[],

        rules: {
          proName:[
            { required: true, message: '请选择项目名称', trigger: 'change' }

          ],
          name: [
            { required: true, message: '请输入招标名称', trigger: 'change' }
          ],
          mode:[
            { required: true, message: '招标方式', trigger: 'change' }
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
          this.announcementFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.announcementForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.announcementForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.announcementForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.announcementFormId = id;
        this.getAnnouncement();

      });
    },
    created () {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData'
      ]);
      setTimeout( () => {
        this.getModeType();
      },100)

      this.$store.dispatch("cacheId",'0');//刷新
    },
    computed:{
      deleteBtnDisabledFlag () {
        return this.announcementForm.validateStatus === 1 ;
      },
      auditBtnDisabledFlag () {
        return this.announcementForm.validateStatus === 1;
      },

      disabledFlag () {
        return  this.announcementForm.validateStatus === 1 ;
      }

    },
    watch:{
      announcementForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep:true
      }
    },
    methods:{
      handleAddBtn () {
        this.announcementFormId=undefined;
       this.addAnnouncement();
        this.$refs.refAnnouncementForm.resetFields();
        this.$nextTick(() => {
          // this.saveBtnDisabledFlag = true;
        })
      },
      handleSaveBtn () {

        if(this.$utils.isEmpty(this.announcementFormId)){
          console.log('save this.announcementFormId',this.announcementFormId)
        this.$refs.refAnnouncementForm.validate( (valid) => {
          if(valid){
            this.saveAnnouncementForm().then( () =>{
              this.getAnnouncement()
            })
          }else{
            if(this.$utils.isEmpty(this.announcementForm.name)){
              this.$refs.refName.focus()
              this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
              return false;
            }
            this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
            return false;
          }
        })
        }else{
          // id 修改

          console.log('save this.announcementFormId',this.announcementFormId)
          this.updateAnnouncementForm();
        }

      },
      handleDeleteBtn () {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          if(this.$utils.isEmpty(this.announcementFormId)){
            this.addAnnouncement()
            this.$set(this.announcementForm,'proId','')
            this.$set(this.announcementForm,'proName','')
            this.$set(this.announcementForm,'proCode','')
          }else{
            this.deleteAnnouncementForm().then( ()=>{
              this.addAnnouncement()
              this.$set(this.announcementForm,'proId','')
              this.$set(this.announcementForm,'proName','')
              this.$set(this.announcementForm,'proCode','')
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          console.log(error)
        })

      },
      handleAuditBtn () {
        if(this.$utils.isEmpty(this.announcementFormId)) {
          this.$refs.refAnnouncementForm.validate( (valid) => {
            if(valid){
              this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then( () => {

                this.saveAnnouncementForm(true).then(() => {
                  this.auditAnnouncementForm().then(() => {

                    console.log('id',this.announcementForm.id)
                    this.getAnnouncement()
                  })
                })

              }).catch( (error) => {
                console.log(error)
              })
            }else{
              if(this.$utils.isEmpty(this.announcementForm.name)){
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

            this.updateAnnouncementForm(true).then( ()=> {
              this.auditAnnouncementForm().then(() => {
                this.getAnnouncement()
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
      addAnnouncement () {

        this.announcementForm = {
          id:'',
          validateStatus: 2,
          proId:this.announcementForm.proId,
          proName: this.announcementForm.proName,
          proCode: this.announcementForm.proCode,

        };
        this.$refs.refName.focus()
        console.log('this.announcementForm', this.announcementForm)

      },
      /**
       * 获取表单内容
      * */
      getAnnouncement () {
          if(this.announcementFormId){
            return this.$store.dispatch('GetAnnouncement',this.announcementFormId)
              .then( (res) => {
                if(res.rel){

                  console.log('表单内容',res)
                  this.announcementForm = res.data
                  //  this.$message.success(res.message)
                }else{
                  this.$message({message: res.message,type: 'warning'})
                }
              }).catch(error => {
                console.log(error)
              })
          }else{
            this.addAnnouncement()
          }
      },
      /**
       * 获取招标方式
       * */
      getModeType () {
        this.$store.dispatch('GetDictionaryDataByTypeFilter','BPMA_BID_NO_MODE').then((res) => {
          if(res.rel){
            console.log('mode',res)
           this.modeList = res.data;
            console.log('this.modeList', this.modeList)
          }else{
            this.$message({message: res.message,type: 'warning'})
          }
        }).catch(error => {
          console.log(error)
        })
      },

      /**
       * save announcementForm
      * */
      saveAnnouncementForm (boolean) {
        const saveFormData = this.$utils.copy(this.announcementForm);
       return  this.$store.dispatch('SaveAnnouncement',saveFormData)
                .then( (res) => {
                if(res.status && res.status === 200){
                  console.log('保存成功',res);
                  this.announcementForm.id = res.data.id;
                  this.announcementFormId = res.data.id;
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
       * 修改 announcementForm
      * */
      updateAnnouncementForm (boolean) {

        const updateFormData = this.$utils.copy(this.announcementForm);
       return  this.$store.dispatch('UpdateAnnouncement',updateFormData)
                .then( (res) => {
                if(res.status && res.status === 200){
                  console.log('修改成功',res);
                  // this.announcementForm.id = res.data.id;
                  // this.announcementFormId = res.data.id;
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
       * delete announcementForm
       * */
      deleteAnnouncementForm () {
        return this.$store.dispatch('DeleteAnnouncement', this.announcementFormId)
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
       * audit announcementForm
       * */
      auditAnnouncementForm () {

        console.log('this.announcementForm',this.announcementForm)
        return this.$store.dispatch('AuditAnnouncement',this.announcementForm)
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
            this.announcementForm = Object.assign({}, this.announcementForm, {
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
        this.announcementForm.date = new Date(this.announcementForm.date).getTime();
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
