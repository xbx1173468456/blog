<template>
  <div :style="windowHeight" class="addFrom">
    <basic-handler>
      <el-button @click="initProjectFormData" icon="el-icon-plus" plain size="small" type="primary">新增进度报告</el-button>
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
                  <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini"
                    :disabled="disabled" slot="append"></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="报告人员" prop="handlePerson">
                <basic-input :disabled="disabled" placeholder="请输入报告人员" v-model="formData.handlePerson"></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="报告日期">
                <el-date-picker :disabled="disabled" placeholder="请选择日期" size="small" type="date"
                  v-model="formData.handleDate" value-format="timestamp">
                </el-date-picker>
              </basic-form-item>
            </el-col>
          </el-row>
          <basic-form-item label="进度概述" prop="sheduleSummary">
            <el-input :disabled="disabled" :rows="2" placeholder="请输入进度概述" type="textarea"
              v-model="formData.sheduleSummary"></el-input>
          </basic-form-item>
          <basic-form-item label="整体进度图片">
            <el-row style="border: 1px solid #dcdfe6; padding: 5px;">
              <basic-upload-files
                :id="formData.id"
                :disabled="disabled"
                :beforeClick="beforeClick"
                @uploadSuccess="uploadSuccess"
                @close="handlClose"
                :data="formData.sheduleImage">
              </basic-upload-files>
            </el-row>
          </basic-form-item>
          <basic-form-item label="文档附件" class="add-border file">
            <basic-upload ref="refBasicUpload" :formId="formData.id" :disabled="disabled">
            </basic-upload>
          </basic-form-item>
          <!-- <el-row :gutter="10">
            <el-col :span="15">
              <basic-form-item label="登记人员">
                <basic-input disabled placeholder="自动生成登记人员" v-model="formData.inputPerson"></basic-input>
              </basic-form-item>
            </el-col>
            </el-col>
            <el-col :span="9">
              <basic-form-item label="登记时间">
                <basic-input disabled placeholder="自动生成登记时间" v-model="formData.inputTime"></basic-input>
              </basic-form-item>
            </el-col>
          </el-row> -->
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-row>
      <plan-schedule
        :formData="formData"
        :disabled="disabled"
        v-model="linkData"
        @planChange="planChange"
        :total="total"
        @save="save(true)"
        :getScheduleReportDetail="getScheduleReportDetail"
        ref="addPlan">
      </plan-schedule>
    </el-row>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
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
  import planSchedule from './planSchedule'
  import {
    deleteScheduleReportMaster,
    reviewScheduleReportMaster,
    saveScheduleReportMaster,
    getScheduleReportMasterDetail,
    getScheduleReportDetail
  } from '@/api/bpmaManager/schedule/duration/report'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'detail',
    mixins: [computed, methods, formatBasic],
    components: {
      dialogProject,
      planSchedule
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
          payScale: [{ validator: that.validatePass, trigger: 'change' }],
          handlePerson: [{ max: 50, trigger: 'change' }],
          sheduleSummary: [{ max: 500, trigger: 'change' }]
        },
        type: null,
        invoiceTypeSelectData: [],
        computeModeSelectData: [],
        visibleSyncProject: false,
        selectedRow: {},
        linkData: [],
        contractDate: null,
        total: 0,
        dialogImageUrl: '',
        dialogVisible: false
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
      payPrice: {
        get() {
          let totalPrice = Number(this.formData.totalPrice)
          let payScale = Number(this.formData.payScale)
          let payPrice = isNaN(totalPrice * payScale) ? '0.00' : (totalPrice * payScale).toFixed(2)
          this.formData.payPrice = payPrice
          return this.$utilsBasic.toThousands(payPrice)
        },
        set() {
        }
      },
      windowHeight() {
        return {
          height: this.$store.state.app.screenHeight - 120 + 'px'
        }
      },
      textareaHeight() {
        return parseInt(((this.$store.state.app.screenHeight - 133) - 45 * 6) / 25)
      },
      userInfo() {
        return this.$store.state.user.login
      }
    },
    watch: {
      formData: {
        handler() {
          this.isUpdate = false
        },
        deep: true
      },
      contractDate(val) {
        this.formData.contractBeginDate = new Date(val[0]).getTime()
        this.formData.contractExpiryDate = new Date(val[1]).getTime()
        this.formData.contractDays = ((this.formData.contractExpiryDate - this.formData.contractBeginDate) / 86400000 + 1) || 0
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
      }, async id => {
        if (this.$route.params.detail != 'detail') {
          await this.getScheduleReportMasterDetail(this.$route.params.detail)
        } else {
          this.initProjectFormData()
        }
        if (!this.formData.date) {
          this.$set(this.formData, 'date', new Date().getTime())
        } else {
          this.formData.date = new Date(this.formData.date).getTime()
        }
      })
      this.$store.dispatch("cacheId", undefined);
    },
    methods: {
      initProjectFormData(lock) {
        const { id, code, name } = this.$route.query
        this.formData = {
          validateStatus: 2,
          name: '进度报告单',
          payPrice: '0.00',
          payScale: '1.00',
          totalPrice: '0.00',
          planDays: 0,
          contractDays: 0,
          handlePerson: this.userInfo.username,
          handleDate: new Date().getTime(),
          proName: name,
          proId: id,
          proCode: code,
          sheduleImage: [],
          payDate: new Date().getTime()
        }
      },
      getScheduleReportMasterDetail(id) {
        return getScheduleReportMasterDetail(id).then(res => {
          if (res.data) {
            res.data.handleDate = new Date(res.data.handleDate).getTime()
            res.data.sheduleImage = res.data.sheduleImage ? res.data.sheduleImage.split(',') : []
            this.formData = res.data
            this.getScheduleReportDetail()
          } else {
            this.initProjectFormData()
          }
        })
      },
      getScheduleReportDetail() {
        if(!this.$refs.addPlan) return
        const params = Object.assign(this.$refs.addPlan.modelSearchFilter, {masterId: this.formData.id})
        getScheduleReportDetail(params).then(res => {
          this.total = res.data.total
          res.data.rows = res.data.rows.map(item => {
            item.scheduleImage = item.scheduleImage ? item.scheduleImage.split(',') : []
            return item
          })
          this.linkData = res.data.rows
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
        this.linkData = []
        switch (this.type) {
          case 'project':
            this.$set(this.formData, 'proName', row.name)
            this.$set(this.formData, 'proId', row.id)
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
          this.linkData = []
          this.$router.replace({
            path: `/bpmaManager/schedule/duration/report/id/0/detail`,
            query: proData
          })
        } else {
          this.$router.replace({
            path: `/bpmaManager/schedule/duration/report/id/0/${this.formData.id}`,
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
            deleteScheduleReportMaster(this.formData.id).then(res => {
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
          this.formData.sheduleImage = this.formData.sheduleImage.join(',')
          this.formData.detailList = this.linkData.map(item => {
            item.scheduleImage = item.scheduleImage ? item.scheduleImage.join(',') : ''
            return item
          })
          reviewScheduleReportMaster(this.formData).then(res => {
            if (res.rel) {
              this.isUpdate = true
              this.formData = res.data
              this.formData.handleDate = this.formData.handleDate ? new Date(this.formData.handleDate).getTime() : ''
              this.formData.sheduleImage = this.formData.sheduleImage ? this.formData.sheduleImage.split(',') : []
              this.linkData = res.data.detailList.map(item => {
                item.scheduleImage = item.scheduleImage ? item.scheduleImage.split(',') : []
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
            valid = await this.$refs.addPlan.validate()
            if (!valid) {
              this.$message.warning('亲，请先完善和修正错误数据！')
              return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
            }
            let sheduleImage = this.formData.sheduleImage
            let detailList = this.linkData
            this.formData.sheduleImage = this.formData.sheduleImage.join(',')
            this.formData.detailList = this.linkData.map(item => {
              item.scheduleImage = item.scheduleImage ? item.scheduleImage.join(',') : ''
              return item
            })
            res = await saveScheduleReportMaster(this.formData).catch(err => {
              this.formData.sheduleImage = sheduleImage
              this.linkData = detailList
            })
            if (!res.rel) return
            this.formData = res.data
            this.formData.handleDate = this.formData.handleDate ? new Date(this.formData.handleDate).getTime() : ''
            this.formData.sheduleImage = this.formData.sheduleImage ? this.formData.sheduleImage.split(',') : []
            this.linkData = res.data.detailList.map(item => {
              item.scheduleImage = item.scheduleImage ? item.scheduleImage.split(',') : []
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
      validatePass(rule, value, callback) {
        value = Number(value)
        if (value < 0 || value > 1) {
          callback(new Error())
        }
        callback()
      },
      planChange(data) {
        let planBeginDate = data.map(item => item.planBeginDate).sort((a, b) => b - a).filter(item => item)
        let planExpiryDate = data.map(item => item.planExpiryDate).sort((a, b) => a - b).filter(item => item)
        this.$set(this.formData, 'planBeginDate', planBeginDate[planBeginDate.length - 1])
        this.$set(this.formData, 'planExpiryDate', planExpiryDate[planExpiryDate.length - 1])
        this.$set(this.formData, 'planDays', ((this.formData.planExpiryDate - this.formData.planBeginDate) / 86400000 + 1) || 0)
      },
      async uploadSuccess({data}) {
        this.$set(this.formData, 'sheduleImage', data.map(item => item.mainPath))
        await this.save(true)
        this.isUpdate = false
      },
      handlClose({url, index, formData}) {
        this.formData.sheduleImage.splice(index, 1)
        this.save(true)
      },
      beforeClick() {
        if(!this.formData.id) {
          this.$message.warning('请先保存当前表单再进行图片上传')
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped>
</style>
