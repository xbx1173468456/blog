<template>
  <div :style="windowHeight" class="addFrom">
    <basic-handler>
      <el-button @click="initProjectFormData" icon="el-icon-plus" plain size="small" type="primary">新增跟踪</el-button>
      <el-button :disabled="disabled" @click="save" icon="el-icon-if-save" plain size="small" type="primary">保存
      </el-button>
      <el-button :disabled="disabled || !formData.id" @click="deleteData" icon="el-icon-delete" plain size="small"
                 type="danger">删除
      </el-button>
      <el-button :disabled="disabled" @click="review" icon="el-icon-if-auth" plain size="small" type="primary">审核
      </el-button>
      <el-button :disabled="!disabled" icon="el-icon-plus" plain size="small" type="primary" @click="addPush">新增回复</el-button>
    </basic-handler>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" title="基本信息">
        <el-form :model="formData" :rules="rules" class="form-container" ref="form">
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-validate-status :model="formData"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="单据编码">
                <basic-input disabled placeholder="自动生成单据编码" v-model="formData.code"></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="单据名称" prop="name">
                <basic-input :disabled="disabled" placeholder="请输入单据名称" v-model="formData.name"></basic-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="项目名称" prop="proName">
                <el-input :disabled="disabled" readOnly placeholder="请选择项目名称" v-model="formData.proName" size="small">
                  <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                             slot="append"></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="发起人员">
                <basic-input disabled placeholder="请输入发起人员" v-model="formData.sendPerson"></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="发起日期">
                <el-date-picker :disabled="disabled" placeholder="请选择日期" size="small" type="date"
                                v-model="formData.handleDate"
                                value-format="timestamp">
                </el-date-picker>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <basic-form-item label="接收人员" prop="recvPerson">
                <div class="personWrap">
                  <div class="tags">
                    <el-tag
                      v-for="(person, index) in formData.recvPerson.split(',').filter(item => item)"
                      :key="index"
                      :closable="!disabled"
                      @close="handleClose(index)"
                      type="success">
                      {{person}}
                    </el-tag>
                  </div>
                  <el-button icon="el-icon-plus" @click="addPerson" class="addPerson" type="primary" :disabled="disabled" size="mini"></el-button>
                </div>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row>
            <basic-form-item label="疑问或建议" prop="advise">
              <el-input :disabled="disabled" :maxlength="5000" :rows="4" placeholder="请输入疑问或建议" type="textarea"
                        v-model="formData.advise"></el-input>
            </basic-form-item>
          </el-row>
          <el-row>
            <basic-form-item label="文档附件" class="add-border file">
              <basic-upload ref="refBasicUpload" :formId="formData.id" :disabled="disabled">
              </basic-upload>
            </basic-form-item>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-row>
      <link-data :disabled="disabled" :formData="formData" :userInfo="userInfo" v-model="linkData"></link-data>
    </el-row>
    <basic-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="人员-选择" >
      <dialog-preson @change="changepreson" checkbox v-if="dialogTableVisible"></dialog-preson>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button @click="getrecvPerson" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <!-- <addPerson :dialogTableVisible="dialogTableVisible" ref="addPerson" @getrecvPerson="getrecvPerson"></addPerson> -->
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择" >
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <el-dialog title="回复" :visible.sync="dialogFormVisible">
      <el-form :model="dialogFormData" class="form-container" ref="dialogFrom" :rules="rules">
        <el-row>
          <basic-form-item label="回复内容" prop="answerContent">
            <basic-input :disabled="disabledDialog" placeholder="请输入回复内容" v-model="dialogFormData.answerContent" type="textarea" :rows="6"></basic-input>
          </basic-form-item>
        </el-row>
        <el-row>
          <basic-form-item label="文档附件" class="add-border file">
            <basic-upload ref="refBasicUploadDetail" :formId="dialogFormData.id" :disabled="disabledDialog">
            </basic-upload>
          </basic-form-item>
        </el-row>
        <el-row>
          <basic-form-item label="回复人员">
            <basic-input disabled v-model="dialogFormData.inputPerson"></basic-input>
          </basic-form-item>
        </el-row>
        <el-row>
          <basic-form-item label="回复时间">
            <basic-input disabled v-model="dialogFormData.inputTime"></basic-input>
          </basic-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :disabled="disabledDialog" type="primary" @click="pushDataToServer">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  import dialogProject from '@/views/components/dialog/dialogProject'
  import linkData from './linkData.vue'
  import addPerson from './addPerson.vue'
  import dialogPreson from '@/views/components/dialog/dialogPreson/index.vue'
  import {
    deleteScheduleTrackMaster,
    reviewScheduleTrackMaster,
    saveScheduleTrackMaster,
    postScheduleTrackMaster,
    getScheduleTrackMasterDetail,
    getScheduleTrackDetail,
    saveScheduleTrackDetail
  } from '@/api/bpmaManager/schedule/duration/recording.js'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  import utils from '@/utils/util.js'
  export default {
    name: 'detail',
    mixins: [computed, methods, formatBasic],
    components: {
      dialogProject,
      linkData,
      addPerson,
      dialogPreson
    },
    data() {
      let that = this
      return {
        formData: {recvPerson: ''},
        isUpdate: true,
        rules: {
          answerContent: [{ required: true, trigger: 'change', min: 2 }],
          advise: [{ required: true, trigger: 'change', min: 2 }],
          name: [{ required: true, trigger: 'change', max: 100 }],
          proName: [{ required: true, trigger: 'change' }],
          recvPerson: [{ required: true, trigger: 'change', min: 2 }],
          validateStatus: [{ required: true, trigger: 'change' }]
        },
        type: null,
        invoiceTypeSelectData: [],
        computeModeSelectData: [],
        visibleSyncProject: false,
        visibleSyncContract: false,
        visibleSyncDataNumber: false,
        selectedRow: {},
        activeNames: ['1'],
        dialogTableVisible: false,
        linkData: [],
        dialogFormVisible: false,
        dialogFormData: {},
        disabledDialog: false,
        selecedRow: []
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.user.login
      },
      disabled() {
        if (this.validateStatus) {
          return this.formData.validateStatus == this.validateStatus.code
        }
      },
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
      },
      windowHeight() {
        return {
          height: this.$store.state.app.screenHeight - 120 + 'px'
        }
      },
      textareaHeight() {
        return parseInt(((this.$store.state.app.screenHeight - 133) - 45 * 9) / 25)
      }
    },
    watch: {
      formData: {
        handler() {
          this.isUpdate = false
        },
        deep: true
      }
    },
    async created() {
      this.$store.dispatch("cacheId", '0')
      this.getEnumData(['GetValidateStatusData', 'GetIsOrNotData'])
      const invoiceTypeSelectData = await getDictionaryDataByTypeFilter('SYS_INVOICE_TYPE')
      const computeModeSelectData = await getDictionaryDataByTypeFilter('computeMode')
      this.invoiceTypeSelectData = invoiceTypeSelectData.data
      this.computeModeSelectData = computeModeSelectData.data
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.initProjectFormData()
      }, async id => {
        if (this.$route.params.detail != 'detail') {
          await this.getScheduleTrackMasterDetail(this.$route.params.detail)
        } else {
          this.initProjectFormData()
        }
        if (!this.formData.handleDate) {
          this.$set(this.formData, 'handleDate', new Date().getTime())
        } else {
          this.formData.handleDate = new Date(this.formData.handleDate).getTime()
        }
        this.$set(this.formData, 'sendPerson', this.userInfo.username)
      })
      this.$store.dispatch("cacheId", undefined);
    },
    methods: {
      initProjectFormData(lock) {
        const { id, code, name } = this.$route.query
        this.formData = {
          validateStatus: 2,
          recvPerson: '',
          recvPersonId: '',
          name: '跟踪记录单',
          handleDate: new Date().getTime(),
          proName: name,
          proId: id,
          proCode: code
        }
      },
      getScheduleTrackMasterDetail(id) {
        return getScheduleTrackMasterDetail(id).then(res => {
          if (res.data) {
            this.formData = res.data
            this.getScheduleTrackDetail()
          } else {
            this.initProjectFormData()
          }
        })
      },
      getScheduleTrackDetail() {
        getScheduleTrackDetail(this.formData.id).then(res => {
          this.linkData = res.data
        })
      },
      toipClick(type) {
        if (this.disabled) return
        if (type == 'contract' && !this.formData.proId) return this.$message.warning('请先选择项目')
        if (type == 'dataNumber' && !this.formData.contractId) return this.$message.warning('请先选择合同')
        this.type = type
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
      },
      selectionChange(row) {
        this.selectedRow = row.selectedRow
      },
      handleChange() {
        const row = this.selectedRow
        if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return
        switch (this.type) {
          case 'project':
            this.$set(this.formData, 'proId', row.id)
            this.$set(this.formData, 'proName', row.name)
            this.$set(this.formData, 'proCode', row.code)
            this.$set(this.formData, 'contractId', '')
            this.$set(this.formData, 'contractName', '')
            this.$set(this.formData, 'visafileMasterCode', '')
            this.$set(this.formData, 'visafileMasterId', '')
            break
          case 'contract':
            this.$set(this.formData, 'contractId', row.id)
            this.$set(this.formData, 'contractName', row.name)
            this.$set(this.formData, 'visafileMasterCode', '')
            this.$set(this.formData, 'visafileMasterId', '')
            break
          case 'dataNumber':
            this.$set(this.formData, 'visafileMasterId', row.id)
            this.$set(this.formData, 'visafileMasterCode', row.code)
        }
        this.isUpdate = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      initFormData(lock) {
        const { proId, proName, proCode } = this.formData
        const proData = {
          id: proId,
          name: proName,
          code: proCode
        }
        if (lock) {
          this.initProjectFormData()
          this.$router.replace({
            path: `/bpmaManager/schedule/duration/recording/id/0/detail`,
            query: proData
          })
        } else {
          this.$router.replace({
            path: `/bpmaManager/schedule/duration/recording/id/0/${this.formData.id}`,
            query: proData
          })
        }
      },
      deleteData() {
        if (this.formData.id) {
          this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(res => {
            deleteScheduleTrackMaster(this.formData.id).then(res => {
              if (res.rel) {
                this.$message.success(res.message)
                this.initFormData(true)
              }
            })
          }).catch(err => '')
        } else {
          this.$message.warning('亲，请先保存后在操作')
        }
      },
      review() {
        this.$confirm(' 亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async res => {
          await this.save(true)
          reviewScheduleTrackMaster(this.formData).then(res => {
            if (res.rel) {
              this.isUpdate = true
              this.formData = res.data
              this.$message.success(res.message)
            }
          })
        }).catch(err => '')
      },
      save(lock) {
        return new Promise((reslove, reject) => {
          let res
          this.$refs.form.validate(async valid => {
            if (!valid) {
              this.$message.warning('亲，请先完善和修正错误数据！')
              return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
            }
            if (this.formData.id) {
              res = await postScheduleTrackMaster(this.formData)
            } else {
              res = await saveScheduleTrackMaster(this.formData)
            }
            if (!res.rel) return
            this.formData = res.data
            this.formData.handleDate = new Date(this.formData.handleDate).getTime()
            if(!this.$refs.refBasicUpload.submitUpload(this.formData.id)) return false;
            if (lock !== true) {
              this.$message.success(res.message)
            }
            this.$nextTick(() => {
              this.isUpdate = true
              reslove()
            })
          })
        })
      },
      changepreson(row) {
        this.selecedRow = row
      },
      validatePass(rule, value, callback) {
        value = Number(value)
        if (value < 0 || value > 1) {
          callback(new Error())
        }
        callback()
      },
      handleClose(idx) {
        if(this.formData.recvPerson) {
          const recvPerson = this.formData.recvPerson.split(',')
          const recvPersonId = this.formData.recvPersonId.split(',')
          recvPerson.splice(idx, 1)
          recvPersonId.splice(idx, 1)
          this.selecedRow.splice(idx, 1)
          this.$set(this.formData, 'recvPerson',  recvPerson.join(','))
          this.$set(this.formData, 'recvPersonId',  recvPersonId.join(','))
        }
      },
      getrecvPerson() {
        let userName = this.selecedRow.map(item => item.username)
        let userId = this.selecedRow.map(item => item.id)
        userName = userName.concat(this.formData.recvPerson.split(','))
        userId = userId.concat(this.formData.recvPersonId.split(','))
        userName = userName.filter(item => item)
        userId = userId.filter(item => item)
        let data = userId.map((item, idx) => ({name: userName[idx], id: userId[idx]}))
        data = utils.array.unique(data, 'id')
        userName = data.map(item => item.name).join(',')
        userId = data.map(item => item.id).join(',')
        this.$set(this.formData, 'recvPerson', userName)
        this.$set(this.formData, 'recvPersonId', userId)
        this.$refs.form.validateField('recvPerson')
        this.selectedRow = []
        this.dialogTableVisible = false
      },
      addPerson(){
        this.dialogTableVisible = true
        // this.$refs.addPerson.openDialog()
      },
      addPush() {
        this.dialogFormData = {
          answerPerson: this.userInfo.username,
          answerPersonId: this.userInfo.id,
          inputPerson: this.userInfo.inputPersonFullPath,
          masterId: this.formData.id
        }
        this.dialogFormVisible = true
        this.disabledDialog = false
      },
      pushDataToServer() {
        this.$refs.dialogFrom.validate(async valid => {
          if(valid) {
            this.disabledDialog = true
            await this.saveScheduleTrackDetail()
            this.dialogFormVisible = false
          } else {
            this.$message.warning('亲，请先完善和修正错误数据！')
            return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
          }
        })
      },
      saveScheduleTrackDetail() {
        return saveScheduleTrackDetail(this.dialogFormData).then(res => {
          this.dialogFormData = res.data
          this.$message.success(res.message)
          this.getScheduleTrackDetail()
          this.$refs.refBasicUploadDetail.submitUpload(res.data.id);
        }).catch(err => {
          console.warn(err)
          this.disabledDialog = false
        })
      }
    }
  }
</script>

<style scoped>
.mt10{margin-top: 15PX;}
.el-form-item{margin-bottom: 25px;}
.logForm >>> .el-radio__input.is-disabled.is-checked .el-radio__inner{background: #409EFF}
.personWrap{border:1px solid #dcdfe6;position:relative;padding:0 110px 0 5px;min-height: 36px}
.is-error .personWrap{border-color: #f56c6c;}
.addPerson{position: absolute;top:2px;right:5px;width: 110px;text-align: center;margin-bottom: 0;}
.personWrap .tags{width: 100%;}
.el-tag{margin-left: 5px;}
.borderRed{border: 1px solid red}
</style>
