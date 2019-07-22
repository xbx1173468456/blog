<template>
  <div :style="windowHeight" class="detail-container-detail">
    <basic-handler>
      <el-button @click="initProjectFormData(), linkData = [], handleData = []" icon="el-icon-plus" plain size="small" type="primary">新增资料</el-button>
      <el-button :disabled="disabled" @click="save" icon="el-icon-if-save" plain size="small"
                 type="primary">保存
      </el-button>
      <el-button :disabled="disabled || !formData.id" @click="deleteData" icon="el-icon-delete" plain size="small"
                 type="danger">删除
      </el-button>
      <el-button :disabled="disabled" @click="review" icon="el-icon-if-auth" plain size="small" type="primary">审核
      </el-button>
    </basic-handler>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" title="基本信息">
        <el-form :model="formData" :rules="rules" class="form-container" ref="form" style="margin-bottom: 0;">
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
              <basic-form-item label="资料名称" prop="name">
                <basic-input :disabled="disabled" placeholder="请输入资料名称" v-model="formData.name"></basic-input>
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
              <basic-form-item label="合同名称" prop="contractName">
                <el-input :disabled="disabled" readOnly placeholder="请选择合同名称" v-model="formData.contractName" size="small">
                  <el-button @click="toipClick('contract')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                             slot="append"></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="计划开始日期">
                <el-date-picker :disabled="disabled || linkData.length > 0" :picker-options="pickerOptions1" placeholder="请选择日期" size="small" type="date"
                                v-model="formData.beginDate" value-format="timestamp">
                </el-date-picker>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="计划完成日期">
                <el-date-picker :disabled="disabled || linkData.length > 0" :picker-options="pickerOptions"
                                placeholder="请选择日期" size="small"
                                type="date" v-model="formData.finishDate" value-format="timestamp">
                </el-date-picker>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="计划日历天">
                <basic-input disabled placeholder="请输入计划日历天" v-model="days" price></basic-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="承办人员" prop="handlePerson">
                <basic-input :disabled="disabled" placeholder="请输入承办人员" v-model="formData.handlePerson"></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="承办日期">
                <el-date-picker :disabled="disabled" placeholder="请选择日期" size="small" type="date"
                                v-model="formData.handleDate" value-format="timestamp">
                </el-date-picker>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item class="add-border disabled  " label="是否完成">
                <span
                  class="span-text">{{dataEnum.isOrNot.filter(item => item.code == formData.ifFinish)[0] && dataEnum.isOrNot.filter(item => item.code == formData.ifFinish)[0].name}}</span>
              </basic-form-item>
            </el-col>
          </el-row>
          <basic-form-item label="补充说明" prop="remark">
            <el-input :disabled="disabled" :rows="2" placeholder="请输入补充说明" type="textarea"
                      v-model="formData.remark"></el-input>
          </basic-form-item>
          <basic-form-item label="文档附件" class="add-border file">
            <basic-upload ref="refBasicUpload" :formId="formData.id" :disabled="disabled">
            </basic-upload>
          </basic-form-item>
          <el-row :gutter="10">
            <el-col :span="15">
              <basic-form-item label="登记人员">
                <basic-input disabled placeholder="自动生成登记人员" v-model="formData.inputPerson"></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="9">
              <basic-form-item label="登记时间">
                <basic-input disabled placeholder="自动生成登记时间" v-model="formData.inputTime"></basic-input>
              </basic-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-row>
      <visa-link
        :disabled="disabled"
        :isOrNot="dataEnum.isOrNot"
        :parentDatas="formData"
        @rowChange="rowChange"
        @changeDate="changeDate"
        v-model="linkData"
        ref="visaLink">
      </visa-link>
    </el-row>
    <el-row>
      <visa-handle :disabled="disabled" :isOrNot="dataEnum.isOrNot" :linkRow="handleRow"
                   :linkRowDis="ifFinish && handleRow.ifFinish == ifFinish.code" :parentDatas="formData"
                   :validateStatus="dataEnum.validateStatus" @updateFinish="updateFinish"
                    v-model="handleData">
      </visa-handle>
    </el-row>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择" >
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncContract" title="合同-选择" >
      <dialog-my-contract :proId="formData.proId" @selectionChange="selectionChange" filterValid
                          v-if="visibleSyncContract"></dialog-my-contract>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogMyContract from '@/views/components/dialog/dialogMyContract'
  import {
    deleteVisafileMaster,
    reviewVisafileMaster,
    saveVisafileMaster,
    postVisafileMaster,
    getVisaFilrStage,
    getVisaAndLinkList,
    getVisafileMasterDetail
  } from '@/api/bpmaManager/outputValue/visa/data.js'
  import visaLink from './link.vue'
  import visaHandle from './handle.vue'
  export default {
    name: 'detail',
    mixins: [computed, methods],
    components: {
      dialogProject,
      dialogMyContract,
      visaLink,
      visaHandle
    },
    data() {
      let that = this
      return {
        formData: {},
        isUpdate: true,
        activeNames: ['1'],
        rules: {
          contractName: [{ required: true, trigger: 'change', min: 2 }],
          name: [{ required: true, trigger: 'change', max: 100 }],
          proName: [{ required: true, trigger: 'change' }],
          validateStatus: [{ required: true, trigger: 'change' }],
          handlePerson: [{ max: 50, trigger: 'change' }],
          remark: [{ max: 5000, trigger: 'change' }]
        },
        handleRow: {},
        type: null,
        invoiceTypeSelectData: [],
        computeModeSelectData: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < that.formData.beginDate
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            if(!that.formData.finishDate) return
            return time.getTime() > that.formData.finishDate
          }
        },
        linkData: [],
        handleData: [],
        visibleSyncProject: false,
        visibleSyncContract: false,
        selectedRow: {}
      }
    },
    computed: {
      disabled() {
        if (this.validateStatus) {
          return this.formData.validateStatus == this.validateStatus.code
        }
      },
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
      },
      days: {
        get() {
          if (!this.formData.finishDate || !this.formData.beginDate) {
            this.formData.days = 0
            return this.formData.days
          }
          this.formData.days = ((this.formData.finishDate - this.formData.beginDate) / 86400000 + 1) || 0
          return this.formData.days
        },
        set() {
        }
      },
      windowHeight() {
        return {
          height: this.$store.state.app.screenHeight - 120 + 'px'
        }
      },
      ifFinish() {
        if (!Array.isArray(this.dataEnum.isOrNot)) return {}
        return this.dataEnum.isOrNot.filter(item => item.name === '是')[0]
      }
    },
    watch: {
      formData: {
        handler() {
          this.isUpdate = false
        },
        deep: true
      },
      linkData: {
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
        this.linkData = []
        this.handleData = []
      }, async id => {
        if (this.$route.params.detail != 'detail') {
          await this.getVisafileMasterDetail(this.$route.params.detail)
        } else {
          this.initProjectFormData()
        }
        if (this.formData.beginDate) this.formData.beginDate = this.formatDate(this.formData.beginDate)
        if (this.formData.finishDate) this.formData.finishDate = this.formatDate(this.formData.finishDate)
        if (this.formData.handleDate) this.formData.handleDate = this.formatDate(this.formData.handleDate)
      })
      this.$store.dispatch("cacheId", undefined);
    },
    methods: {
      initProjectFormData(lock) {
        const { id, code, name } = this.$route.query
        this.formData = {
          validateStatus: 2,
          ifFinish: 2,
          beginDate: '',
          finishDate: '',
          proName: name,
          proId: id,
          proCode: code,
          payDate: new Date().getTime()
        }
      },
      getVisafileMasterDetail(id) {
        return getVisafileMasterDetail(id).then(async res => {
          if (res.data) {
            this.formData = res.data
            this.linkLoading = true
            let data = await getVisaFilrStage(this.formData.id)
            this.linkLoading = false
            data.data.bpmaValueVisafileStages
            this.linkData = data.data.bpmaValueVisafileStages.map(item => {
              item.beginDate = this.formatDate(item.beginDate)
              item.finishDate = this.formatDate(item.finishDate)
              return item
            })
          } else {
            this.initProjectFormData()
          }
        })
      },
      toipClick(type) {
        if (this.disabled) return
        if (type == 'contract' && !this.formData.proId) return this.$message.warning('请先选择项目')
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
            break
          case 'contract':
            this.$set(this.formData, 'contractId', row.id)
            this.$set(this.formData, 'contractName', row.name)
            break
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
            path: `/bpmaManager/outputValue/visa/data/id/0/detail`,
            query: proData
          })
        } else {
          this.$router.replace({
            path: `/bpmaManager/outputValue/visa/data/id/0/${this.formData.id}`,
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
            deleteVisafileMaster(this.formData.id).then(res => {
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
          let data = {
            bpmaValueVisafileMaster: this.formData,
            bpmaValueVisafileStages: this.linkData
          }
          reviewVisafileMaster(data).then(res => {
            if (res.rel) {
              this.isUpdate = true
              this.formData = res.data.bpmaValueVisafileMaster
              this.formData.beginDate = this.formData.beginDate ? this.formatDate(this.formData.beginDate) : ''
              this.formData.finishDate = this.formData.finishDate ? this.formatDate(this.formData.finishDate) : ''
              this.formData.handleDate = this.formData.handleDate ? this.formatDate(this.formData.handleDate) : ''
              this.linkData = res.data.bpmaValueVisafileStages.map(item => {
                item.beginDate = this.formatDate(item.beginDate)
                item.finishDate = this.formatDate(item.finishDate)
                return item
              })
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
            if(this.linkData.length > 0) {
              valid = await this.$refs.visaLink.validData()
              if (!valid) {
                this.$message.warning('亲，请先完善和修正错误数据！')
                return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
              }
            }
            let data = {
              bpmaValueVisafileMaster: this.formData,
              bpmaValueVisafileStages: this.linkData
            }
            res = await saveVisafileMaster(data)
            if (!res.rel) return
            this.formData = res.data.bpmaValueVisafileMaster
            this.formData.beginDate = this.formData.beginDate ? this.formatDate(this.formData.beginDate) : ''
            this.formData.finishDate = this.formData.finishDate ? this.formatDate(this.formData.finishDate) : ''
            this.formData.handleDate = this.formData.handleDate ? this.formatDate(this.formData.handleDate) : ''
            this.linkData = res.data.bpmaValueVisafileStages.map(item => {
              item.beginDate = this.formatDate(item.beginDate)
              item.finishDate = this.formatDate(item.finishDate)
              return item
            })
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
      changeDate(data) {
        let beginDates = this.linkData.map(item => {
          if(item.persistStatus != 'fdel') {
            return item.beginDate
          }
          return
        }).filter(item => item).sort((a, b) => a - b)
        let finishDates = this.linkData.map(item => {
          if(item.persistStatus != 'fdel') {
            return item.finishDate
          }
          return
        }).filter(item => item).sort((a, b) => b - a)
        console.log(beginDates[0], finishDates[0])
        this.formData.beginDate = beginDates[0]
        this.formData.finishDate = finishDates[0]
      },
      validatePass(rule, value, callback) {
        value = Number(value)
        if (value < 0 || value > 1) {
          callback(new Error())
        }
        callback()
      },
      formatDate(date) {
        return new Date(date).getTime()
      },
      rowChange(row) {
        if (row.id && this.formData.validateStatus == 1) {
          this.handleRow = row
          getVisaAndLinkList({
            masterId: this.formData.id,
            stageId: row.id
          }).then(res => {
            this.handleData = res.data
          })
        } else {
          this.handleData = []
        }
      },
      async updateFinish() {
        this.handleRow.ifFinish = this.ifFinish.code
        this.handleRow.handleDate = String(new Date().getTime())
        let lock = this.linkData.every(item => item.ifFinish == this.ifFinish.code)
        if (lock) this.formData.ifFinish = this.ifFinish.code
        await this.save()
      }
    }
  }
</script>

<style scoped>
</style>
