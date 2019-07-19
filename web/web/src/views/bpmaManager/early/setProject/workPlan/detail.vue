<template>
  <div class="workPlan-container">
    <div class="handler-container">
      <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                 @click="resetData" plain>新增
      </el-button>
      <el-button v-if="saveBtnShowFlag" type="primary" icon="el-icon-if-save" size="small"
                 @click="changeDataList(false)"
                 :disabled="saveBtnDisabledFlag || auditBtnDisabledFlag"
                 plain>保存
      </el-button>
      <el-button v-if="deleteBtnShowFlag" type="danger" icon="el-icon-delete" size="small" plain
                 @click="deleteHint"
                 :disabled="deleteBtnDisabledFlag">删除
      </el-button>
      <el-button v-if="auditBtnShowFlag" type="primary" icon="el-icon-if-auth" size="small" plain
                 @click="auditHint"
                 :disabled="auditBtnDisabledFlag">审核
      </el-button>
    </div>

    <el-form ref="formData" class="form-container" :model="formData" label-width="120px" :rules="rules" :show-message="false">
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-validate-status :model="formData"></basic-validate-status>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编码">
            <el-input clearable size="small" v-model="formData.code" :disabled="true" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
            <el-input size="small" v-model="formData.proName" readOnly
                      :disabled="disabledFlag"
                      placeholder="请选择项目名称">
              <el-button slot="append" icon="el-icon-plus" class="form-btn"
                         :disabled="disabledFlag"
                         @click="toipClick('project')"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="方案名称" prop="name" hide-required-asterisk>
            <el-input clearable
                      size="small"
                      show-overflow-tooltip
                      ref="refName"
                      v-model="formData.name"
                      :disabled="disabledFlag"
                      placeholder="请输入方案名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人员">
            <el-input clearable size="small"
                      :disabled="disabledFlag"
                      placeholder="请输入编制人员"
                      v-model="formData.person"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="完成日期">
            <el-date-picker size="small"
                            v-model="formData.date"
                            type="date"
                            @change="formatTime"
                            :editable="false"
                            :clearable="false"
                            :disabled="disabledFlag"
                            placeholder="选择日期" class="date-picker">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="方案内容">
            <el-input
              clearable
              :disabled="disabledFlag"
              :autosize="{ minRows: 6, maxRows: 10}" v-model="formData.content" type="textarea"
              placeholder="请输入方案内容,最大长度200字符"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="补充说明">
            <el-input
              clearable
              :disabled="disabledFlag"
              :autosize="{ minRows: 6, maxRows: 10}" v-model="formData.remark" type="textarea"
              placeholder="请输入补充说明,最大长度200字符"/>
          </el-form-item>
        </el-col>

           <el-col :span="24">
             <el-form-item label="附件" class="add-border file">
              <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="formData.id">
               </basic-upload>
             </el-form-item>
           </el-col>
        <el-col :span="16">
          <el-form-item label="登记人员">
            <el-input clearable size="small" v-model="formData.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input clearable size="small" v-model="formData.inputTime" :disabled="true"  placeholder="系统自动生成登记时间"/>
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
    name: 'WorkPlanDetail',
    mixins: [computed, methods, formatEnum],
    components: {
      dialogProject
    },
    data() {
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,

        saveBtnDisabledFlag: true,
        formDataId: undefined,
        dialog: false,//弹窗状态

        type: null,
        visibleSyncProject:false,
        selectedRow: {},

        formData: {},
        rules: {
          name: [
            {required: true, message: '方案名称', trigger: 'blur'}
          ],
          proName: [
            {required: true, message: '项目名称', trigger: 'change'}
          ]
        }
      }
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if(this.$route.params) {
          this.$set(this.formData, 'id', this.$route.params.id ? this.$route.params.id : undefined)
        }
        if(this.$route.query) {
          this.formData.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.formData.proName = this.$route.query.proName ? this.$route.query.proName: undefined;
          this.formData.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.resetData();

      },(id) => {
        this.$set(this.formData, 'id', id)
        this.getDatalist();

      });
    },

    created() {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData'
      ]);
      this.$store.dispatch("cacheId",'0');//刷新

    },
    computed:{
      deleteBtnDisabledFlag () {
        return this.formData.validateStatus === 1 ;
      },
      auditBtnDisabledFlag () {
        return this.formData.validateStatus === 1;
      },

      disabledFlag () {
        return  this.formData.validateStatus === 1 ;
      }

    },
    watch:{
      formData: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep:true
      }
    },
    methods: {
      /*获取详情*/
      getDatalist() {
        if(this.$utils.isEmpty(this.formData.id)) {
          this.addData()
        }else{
          this.$store.dispatch('GetBuildPlan', this.formData.id).then((response) => {
            this.copyValue(response.data);

          }).catch((err) => {
            console.log(err)
          })
        }

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
            this.formData = Object.assign({}, this.formData, {
              proName : row.name,
              proId : row.id,
              proCode : row.code
            })
            break
        }
        this.saveBtnDisabledFlag = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      /*获取可选项目列表*/
      getProjectDataList() {
        this.$store.dispatch('GetPropjectDataList').then((response) => {
          this.projectData = response.data;
          console.log(response)
        }).catch(() => {
          console.log(23)
        })
      },
      /*修改保存或新增*/
      changeDataList(boolean) {
        return new Promise((reslove, reject) => {
          this.$refs.formData.validate((valid) => {
            if (valid) {
              if (this.formData.id) {
                this.$store.dispatch('AmendBuildPlan', this.formData).then((response) => {
                  //上传文件
                  if(!this.$refs.refBasicUpload.submitUpload(response.data.id)) return false;
                  if(!boolean){
                    this.$message.success(response.message);
                  }

                  this.getDatalist(response.data.id);
                  reslove(response)

                }).catch((err) => {
                  console.log(err)
                })
              } else {
                this.$store.dispatch('AddBuildPlan', this.formData).then((response) => {
                  this.$set(this.formData, 'id',response.data.id)
                  //上传文件
                  if(!this.$refs.refBasicUpload.submitUpload(response.data.id)) return false;
                  if(!boolean){
                    this.$message.success(response.message);
                  }
                  this.getDatalist(response.data.id);
                  reslove(response)

                }).catch((err) => {
                  console.log(err)
                })
              }
            }else{
              if(this.$utils.isEmpty(this.formData.name)){
                this.$refs.refName.focus()
              }
              this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
            }
          })
        })
      },

      /*删除提示*/
      deleteHint() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.$utils.isEmpty(this.formData.id)){
            this.resetData()
          }else{
            this.deleteDatalist();
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      /*删除详情*/
      deleteDatalist() {
        console.log(this.formData.id)
        this.$store.dispatch('DeleteBuildPlan', this.formData.id).then((response) => {
         this.$message.success(response.message);
          this.resetData();
        }).catch(() => {
          console.log(23)
        })
      },
      /*审核提示*/
      auditHint() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.$confirm(' 亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              let res = await this.changeDataList(true);
              this.copyValue(res.data);
              this.auditDatalist();
            }).catch((err) => {
              console.log(err);
            })
          }else{
            if(this.$utils.isEmpty(this.formData.name)){
              this.$refs.refName.focus()
            }
            this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
          }
        })
      },
      /*审核详情*/
      auditDatalist() {

        this.$store.dispatch('AuditBuildPlan', this.formData).then((response) => {
          this.$message.success(response.message);
          this.getDatalist(this.formData.id);

        }).catch(() => {
          console.log(23)
        })
      },
      /*重置数据*/
      resetData() {
        this.addData()
        this.$refs.formData.resetFields();
        this.$nextTick(() => {
         // this.saveBtnDisabledFlag = true;
        })

      },
      addData () {
        this.formData = {
          id: '',
          validateStatus: 2,//审核状态
          proId:this.formData.proId,
          proName: this.formData.proName,
          proCode: this.formData.proCode,
          person: this.$store.state.user.login.username,
          date: new Date().getTime()
        }
        this.$refs.refName.focus()

      },
      /*处理赋值的方法*/
      copyValue(val){
        this.formData = val;
        if (!this.formData.date) {
          this.formData.date = "";
        } else {
          this.formData.date = new Date(this.formData.date).getTime();
        }
      },
      /*转化时间戳*/
      formatTime(time) {
        this.formData.date = new Date(this.formData.date).getTime();
      },
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
