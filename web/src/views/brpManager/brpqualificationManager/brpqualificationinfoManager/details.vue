<template>
  <div class="app-container detailsManager-container">
    <div class="handler-container">
      <el-button
        type="primary"
        plain
        size="small"
        icon="el-icon-plus"
        @click="resetData">
        新增
      </el-button>
      <el-button
        type="primary"
        plain
        size="small"
        icon="el-icon-if-save"
        :disabled="saveBtnDisabledFlag"
        @click="changeDatalist">
        保存
      </el-button>
      <el-button
        type="primary"
        :disabled="deleteBtnDisabledFlag"
        plain
        size="small"
        icon="el-icon-delete"
        @click="deleteHint">
        删除
      </el-button>
      <el-button
        type="primary"
        :disabled="auditBtnDisabledFlag"
        plain
        size="small"
        icon="el-icon-if-auth"
        @click="auditHint">
        审核
      </el-button>
      <el-button
        type="primary"
        :disabled="disableBtnDisabledFlag"
        plain
        size="small"
        icon="el-icon-circle-close-outline"
        @click="handleDisableDatalist">
        禁用
      </el-button>
      <el-button
        type="primary"
        :disabled="enableBtnDisabledFlag"
        plain
        size="small"
        icon="el-icon-circle-check-outline"
        @click="handleEnableDatalist">
        启用
      </el-button>
    </div>

      <el-form label-width="120px" class="form-container" :model="formData" :rules="rules" ref="formData"
               :show-message="false">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="审核状态" prop="validateStatus" class="add-border disabled">
              <el-radio-group v-model="formData.validateStatus">
                <el-radio :label="parseInt(row.code)"
                          v-for="(row, key, index) in dataEnum.validateStatus"
                          :key="row.code" disabled>
                  {{ row.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="启用状态" prop="enable" class="add-border disabled">
              <el-radio-group v-model="formData.enable">
                <el-radio :label="parseInt(row.code)"
                          v-for="(row, key, index) in dataEnum.enabled"
                          :key="row.code" disabled>
                  {{ row.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系统编码">
              <el-input clearable size="small" v-model="formData.code" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="资证类型" prop="typeName">
              <el-input size="small" v-model="formData.typeName" readOnly placeholder="请选择资证类型" :disabled="disabledFlag">
                <el-button size="small" slot="append" icon="el-icon-plus" class="form-btn" @click="openDialog" :disabled="disabledFlag"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资证名称" prop="name">
              <el-input ref="refName" clearable size="small" v-model="formData.name" :disabled="disabledFlag"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原始编码">
              <el-input clearable size="small" v-model="formData.originalCode" :disabled="disabledFlag"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="获取日期">
              <el-date-picker size="small"
                              :editable = "false"
                              :clearable = "false"
                              v-model="formData.obtainDate"
                              type="date"
                              :disabled="disabledFlag"
                              :picker-options="pickerOptionsBeginDate"
                              @change="formatBeginDate"
                              placeholder="选择获取日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="截止日期">
              <el-date-picker size="small"
                              :editable = "false"
                              :clearable = "false"
                              v-model="formData.expiryDate"
                              type="date"
                              :disabled="disabledFlag"
                              :picker-options="pickerOptionsExpiryDate"
                              @change="formatExpiryDate"
                              placeholder="选择截止日期">
              </el-date-picker>
            </el-form-item>
          </el-col>


          <!--<el-col :span="16">
            <el-form-item label="有效时间">
              <el-date-picker size="small"
                v-model="formData.timeData"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                :editable="false"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                @change="formatTime"
                :disabled="disabledFlag"
                style="width: 100%;height: 38px">
              </el-date-picker>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="有效期限">
              <el-input clearable size="small" v-model="validTime" disabled>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="发证机构">
              <el-input clearable size="small" v-model="formData.authorizeOrg" :disabled="disabledFlag"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="外借状态">
              <el-input clearable size="small" v-model="formData.borrowStatus" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="外借人员">
              <el-input clearable size="small" v-model="formData.borrowPerson" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="外借日期">
              <el-input clearable size="small" v-model="formData.borrowDate" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计归还日期">
              <el-input clearable size="small" v-model="formData.returnDate" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="外借事由">
              <el-input
                v-model="formData.borrowReason"
                disabled
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                resize="none"
                maxlength="100"
                placeholder="请输入内容">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="补充说明">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="100"
                placeholder="请输入内容">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="附件" class="add-border file">
              <basic-upload ref="refBasicUpload" :formId="formData.id" :disabled="disabledFlag"></basic-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="16">
            <el-form-item label="登记人员">
              <el-input disabled v-model="formData.inputPerson" placeholder="系统自动生成登记人员"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记时间">
              <el-input disabled v-model="formData.inputTime" placeholder="系统自动生成登记时间"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    <basic-dialog v-el-drag-dialog title="资证类型-选择" :visible.sync="dialog" >
      <dialogQualificationType @selectionChange="selectionChange" filterValid v-if="dialog"></dialogQualificationType>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </basic-dialog>

  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import dialogQualificationType from '@/views/components/dialog/dialogQualificationType'
  import {staticDataBasic} from "@/assets/data/basic";

  export default {
    mixins: [computed, methods, formatEnum],
    components: {
      dialogQualificationType
    },
    data() {
      const _this = this
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,


        subContractChangeFormId:undefined,
        subContractChangeForm: {},
        saveBtnDisabledFlag: true,
        dataList: [],
        currentPage: 10,
        showStatus: '',

        dialog: false,//弹出框状态
        typeList: [],//资证列表

        type: null,
        visibleSyncProject: false,
        visibleSyncContract: false,
        selectedRow: {},
        formData: {
          enable: 1,//启用状态
          name: "",//name
          typeName: "",//类型名称
          validateStatus: 2//审核状态
        },

        pickerOptionsBeginDate:{
          disabledDate(time) {
            if(!_this.$utils.isEmpty(_this.formData.expiryDate)){
              return time.getTime() > new Date(_this.formData.expiryDate).getTime();
            }
          },
        },
        pickerOptionsExpiryDate:{
          disabledDate(time) {
            if(!_this.$utils.isEmpty(_this.formData.obtainDate)){
              return time.getTime() < new Date(_this.formData.obtainDate).getTime();
            }
          },
        },

        defaultExpandAll: true,//全部展开
        rowData: {},//当前行数据
        search: {
          validateStatus: 1,
          enable: 1,
          page: 1
        },
        rules: {
          typeName: [
            {required: true, trigger: 'change'}
          ],
          name: [
            {required: true, trigger: 'blur'},
          ]
        },

      }
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if(this.$route.params) {
          this.formData.id = this.$route.params.id ? this.$route.params.id : undefined;
        }
        this.resetData();

      },(id) => {
        this.getDatalist(id);
      });
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetEnabledData'
      ]);
      this.$store.dispatch("cacheId",'0');//刷新
    },
    computed:{
      deleteBtnDisabledFlag(){
        if(!this.$utils.isEmpty(this.formData)){
          return this.formData.validateStatus === 1
        }
        return true
      },
      auditBtnDisabledFlag (){
        if(!this.$utils.isEmpty(this.formData)){
          return this.formData.validateStatus === 1
        }
        return true
      },
      disabledFlag(){
        return this.auditBtnDisabledFlag
      },
      enableBtnDisabledFlag (){
        if(!this.$utils.isEmpty(this.formData) && this.auditBtnDisabledFlag ){
          return this.formData.enable === 1
        }
        return true
      },
      disableBtnDisabledFlag (){
        if(!this.$utils.isEmpty(this.formData) && this.auditBtnDisabledFlag ){
          return this.formData.enable === 2
        }
        return true
      },

      validTime() {
      let days = 0;
        if(this.formData.expiryDate && this.formData.obtainDate ){
          days= Math.floor(Math.abs(this.formData.expiryDate - this.formData.obtainDate)/86400000+1)
        }
        return days

      }

    },
    watch:{
      formData:{
        handler(){
          this.saveBtnDisabledFlag = false
        },
        deep: true
      }
    },
    methods: {
      /**
       * 日期转化时间戳
       * */
      formatBeginDate() {
        return this.formData.obtainDate = new Date(this.formData.obtainDate).getTime()
      },
      formatExpiryDate() {
        return this.formData.expiryDate = new Date(this.formData.expiryDate).getTime()
      },


      openDialog() {
        this.dialog = true;
      },
      /*获取树形列表*/
      getTypeList() {
        this.$store.dispatch('GetQualificationType', this.search).then((response) => {
          this.typeList = response.data;

        }).catch(() => {
          console.log(23)
        })
      },
      /**
       * 弹窗传回的项目名称
       * */
      handleChange() {
        const row = this.selectedRow
        if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return
        this.$set(this.formData, 'typeName', row.name)
        this.$set(this.formData, 'typeId', row.id)
        this.dialog = false;
        //this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false;
      },
      selectionChange(row) {
        console.log(row.selectedRow)
        this.selectedRow=row.selectedRow;
      },
      /*获取资证详情*/
      getDatalist(id) {
        this.$store.dispatch('GetQualificationInfoDetails', id).then((response) => {
          this.copyValue(response.data);
        }).catch((err) => {
          console.log(err)
        })
      },

      /*新增或修改资证详情*/
      changeDatalist(boolean) {
        return new Promise((reslove, reject) => {
          this.$refs.formData.validate((valid) => {
            if (valid) {

              if (this.formData.id) {
                this.$store.dispatch('AmendQualificationInfo', this.formData).then((response) => {
                  console.log(response.data)
                  //上传文件
                  if(!this.$refs.refBasicUpload.submitUpload(response.data.id)) return false;
                  if(!boolean){
                    this.$message.success(response.message);
                  }
                  this.getDatalist(response.data.id);
                  reslove(response)

                }).catch(() => {
                  console.log(23)
                })
              } else {
                this.$store.dispatch('AddQualificationInfo', this.formData).then((response) => {
                  //上传文件
                  if(!this.$refs.refBasicUpload.submitUpload(response.data.id)) return false;
                  if(!boolean){
                    this.$message.success(response.message);
                  }
                  this.getDatalist(response.data.id);
                  reslove(response)

                }).catch(() => {
                  console.log(23)
                })
              }
            }else{
              this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
              return this.$utilsBasic.valideFocus(this,['refName']);
            }
          })
        })
      },

      /*删除资证提示*/
      deleteHint() {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.$utils.isEmpty(this.formData.id)){
            this.resetData();
          }else{
            this.deleteDatalist();
          }
        }).catch(() => {
        })
      },
      /*删除资证*/
      deleteDatalist() {
        this.$store.dispatch('DeleteQualificationInfo', this.formData.id).then((response) => {
          if (response.status === 200) {
            this.$message.success(response.message);
            this.resetData();
          }else{
            this.$message({
              message: response.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      /*审核提示*/
      auditHint() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.$confirm(staticDataBasic.info.audit, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              let res = await this.changeDatalist(true);
              this.copyValue(res.data);
              this.auditDatalist();
            }).catch((err) => {
              console.log(err);
            })
          }
        })
      },
      /*审核*/
      auditDatalist() {

        this.$store.dispatch('AuditQualificationInfo', this.formData).then((response) => {
          this.$message.success(response.message);
          this.getDatalist(this.formData.id);

        }).catch(() => {
          console.log(23)
        })
      },
      handleEnableDatalist (){
        this.$confirm(staticDataBasic.info.enable, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.enableDatalist()
        }).catch((error) => {
          console.log(error)
        })
      },
      handleDisableDatalist (){
        this.$confirm(staticDataBasic.info.disEnable, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.enableDatalist()
        }).catch((error) => {
          console.log(error)
        })
      },
      enableDatalist() {
        this.$store.dispatch('EnableQualificationInfo', this.formData).then((response) => {
          this.getDatalist(this.formData.id);
          this.$message.success(response.message);
        }).catch(() => {
          console.log(23)
        })
      },
      /*清空当前*/
      resetData() {
        this.formData = {
          authCode: "",//用户授权编码
          authorizeOrg: "",//发证机构
          borrowStatus: "",//外借状态
          borrowReason: "",//外借事由
          borrowPerson: "",//外借人员
          borrowDate: "",//外借日期
          code: "",//编码
          enable: 1,//启用状态
          expiryDate: "",//过期时间
          inputPerson: "",//登记人员
          inputPersonId: '',//登记人员ID
          name: "",//name
          id: "",//资证ID
          obtainDate: "",//获取日期
          inputTime: "",//登记时间
          remark: "",//备注
          reserve: "",//保留
          returnDate: "",//归还日期
          typeName: "",//类型名称
          typeId: "",//类型ID
          validateStatus: 2//审核状态
        };
        this.$refs.formData.resetFields()
      },
      /*处理赋值的方法*/
      copyValue(val) {
        this.formData =val
        if(val.obtainDate){
          this.$set(this.formData,'obtainDate',new Date(val.obtainDate).getTime())
        }
        if(val.expiryDate){
          this.$set(this.formData,'expiryDate',new Date(val.expiryDate).getTime())
        }

      /*  this.formData.authCode = val.authCode;
        this.formData.authorizeOrg = val.authorizeOrg;
        this.formData.borrowPerson = val.borrowPerson;
        this.formData.borrowReason = val.borrowReason;
        this.formData.borrowStatus = val.borrowStatus;
        this.formData.borrowDate = val.borrowDate;
        this.formData.code = val.code;
        this.formData.enable = val.enable;
        this.formData.id = val.id;
        this.formData.inputPerson = val.inputPerson;
        this.formData.inputTime = val.inputTime;
        this.formData.name = val.name;
        this.formData.originalCode = val.originalCode;
        this.formData.remark = val.remark;
        this.formData.reserve = val.reserve;
        this.formData.returnDate = val.returnDate;
        this.formData.typeCode = val.typeCode;
        this.formData.typeId = val.typeId;
        this.formData.typeName = val.typeName;
        this.formData.validateStatus = val.validateStatus;

        this.formData.obtainDate = val.obtainDate;
        this.formData.expiryDate = val.expiryDate;*/

      },

    }
  }
</script>

