<template>
  <div :style="windowHeight" class="addFrom">
    <basic-handler>
      <el-button @click="initProjectFormData(), linkData = []" icon="el-icon-plus" plain size="small" type="primary">新增完工结算单</el-button>
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
              <basic-form-item label="款项名称" prop="name">
                <basic-input :disabled="disabled" placeholder="请输入款项名称" v-model="formData.name"></basic-input>
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
              <basic-form-item label="合同名称" prop="contractName">
                <el-input :disabled="disabled" readOnly placeholder="请选择合同名称" v-model="formData.contractName"
                  size="small">
                  <el-button @click="toipClick('contract')" class="el-button-append" icon="el-icon-plus" size="mini"
                    :disabled="disabled" slot="append"></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="经办人员" prop="handlePerson">
                <basic-input :disabled="disabled" placeholder="请输入经办人员" v-model="formData.handlePerson"></basic-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="未收总额">
                <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney"
                  v-model="formData.unincomePrice" price></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="应收总额">
                <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney"
                  v-model="formData.shouldIncomePriced" price></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="应收日期">
                <el-date-picker :disabled="disabled" placeholder="请选择日期" size="small" type="date"
                  v-model="formData.shouldIncomeDate" value-format="timestamp">
                </el-date-picker>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="质保金比例" prop="payScale">
                <basic-input :disabled="disabled" :formatValue="formatToMoney" :max="1" :min="0"
                  placeholder="请输入大于0小于1的质保金比例" type="number" v-model="formData.qualityAssuranceScale" price></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="质保金总额">
                <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney"
                  v-model="formData.qualityAssurancePrice" price></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="质保到期日期">
                <el-date-picker :disabled="disabled" placeholder="请选择日期" size="small" type="date"
                  v-model="formData.qualityAssuranceDate" value-format="timestamp" :picker-options="pickerOptions">
                </el-date-picker>
              </basic-form-item>
            </el-col>
          </el-row>
          <basic-form-item label="补充说明" prop="remark">
            <el-input :disabled="disabled" :rows="2" placeholder="请输入补充说明"
              type="textarea" v-model="formData.remark"></el-input>
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
      <stage-link :formData="formData" :disabled="disabled" v-model="linkData" ref="stageLink"></stage-link>
    </el-row>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncContract" title="合同-选择">
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
  import stageLink from './stageLink'
  import {
    deleteValueFinishPayMaster,
    reviewValueFinishPayMaster,
    saveValueFinishPayMaster,
    postValueFinishPayMaster,
    getValueFinishPayMasterDetail,
    getValueFinishPayDetail
  } from '@/api/bpmaManager/outputValue/settlement/completion.js'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'detail',
    mixins: [computed, methods, formatBasic],
    components: {
      dialogProject,
      dialogMyContract,
      stageLink
    },
    data() {
      let that = this
      return {
        formData: {},
        isUpdate: true,
        activeNames: ['1'],
        rules: {
          contractName: [{ required: true, trigger: 'change' }],
          name: [{ required: true, trigger: 'change', max: 50 }],
          proName: [{ required: true, trigger: 'change' }],
          validateStatus: [{ required: true, trigger: 'change' }],
          payScale: [{ validator: that.validatePass, trigger: 'change' }],
          handlePerson: [{ max: 50, trigger: 'change' }],
          remark: [{ max: 5000, trigger: 'change' }],
        },
        type: null,
        invoiceTypeSelectData: [],
        computeModeSelectData: [],
        visibleSyncProject: false,
        visibleSyncContract: false,
        selectedRow: {},
        linkData: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < new Date().getTime()
          }
        }
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
      windowHeight() {
        return {
          height: this.$store.state.app.screenHeight - 120 + 'px'
        }
      },
      textareaHeight() {
        return parseInt(((this.$store.state.app.screenHeight - 133) - 45 * 6) / 25)
      }
    },
    watch: {
      formData: {
        handler() {
          this.$set(this.formData, 'qualityAssurancePrice', this.formData.shouldIncomePriced * this.formData.qualityAssuranceScale)
          this.isUpdate = false
        },
        deep: true
      },
      linkData: {
        handler() {
          let sum = 0
          let unincomePrice = 0
          this.linkData.forEach(item => {
            if(item.persistStatus != 'fdel') {
              sum += Number(item.shouldIncomePrice)
              unincomePrice += Number(item.unincomePrice)
            }
          })
          this.$set(this.formData, 'qualityAssurancePrice', sum * this.formData.qualityAssuranceScale)
          this.$set(this.formData, 'shouldIncomePriced', sum)
          this.$set(this.formData, 'unincomePrice', unincomePrice)
          return sum
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
          await this.getValueFinishPayMasterDetail(this.$route.params.detail)
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
          name: '项目完工结算单',
          unincomePrice: '0.00',
          shouldIncomePriced: '0.00',
          qualityAssuranceScale: '1.00',
          qualityAssurancePrice: '0.00',
          proName: name,
          proId: id,
          proCode: code,
          payDate: new Date().getTime()
        }
      },
      getValueFinishPayMasterDetail(id) {
        return getValueFinishPayMasterDetail(id).then(res => {
          if (res.data) {
            res.data.qualityAssuranceDate = res.data.qualityAssuranceDate ? new Date(res.data.qualityAssuranceDate).getTime() : ''
            res.data.shouldIncomeDate = res.data.shouldIncomeDate ? new Date(res.data.shouldIncomeDate).getTime() : ''
            this.formData = res.data
            this.getValueFinishPayDetail()
          } else {
            this.initProjectFormData()
          }
        })
      },
      getValueFinishPayDetail() {
        const params = Object.assign(this.$refs.stageLink.modelSearchFilter, {masterId: this.formData.id})
        getValueFinishPayDetail(params).then(res => {
          this.linkData = res.data.bpmaValueFinishPayDetails
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
            this.$set(this.formData, 'qualityAssuranceScale', row.qualityAssurancePriceScale)
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
            path: `/bpmaManager/outputValue/settlement/completion/id/0/detail`,
            query: proData
          })
        } else {
          this.$router.replace({
            path: `/bpmaManager/outputValue/settlement/completion/id/0/${this.formData.id}`,
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
            deleteValueFinishPayMaster(this.formData.id).then(res => {
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
          const data = {
            bpmaValueFinishPayMaster: this.formData,
            bpmaValueFinishPayDetails: this.linkData
          }
          reviewValueFinishPayMaster(data).then(res => {
            if (res.rel) {
              this.isUpdate = true
              this.formData = res.data.bpmaValueFinishPayMaster
              this.linkData = res.data.bpmaValueFinishPayDetails
              this.formData.qualityAssuranceDate = this.formData.qualityAssuranceDate ? new Date(this.formData.qualityAssuranceDate).getTime() : ''
              this.formData.shouldIncomeDate = this.formData.shouldIncomeDate ? new Date(this.formData.shouldIncomeDate).getTime() : ''
              this.$message.success(res.message)
            }
          })
        }).catch(err => '')
      },
      save(lock) {
        return new Promise((reslove, reject) => {
          let res
          this.$refs.form.validate(async valid => {
            console.log(valid)
            if (!valid) {
              this.$message.warning('亲，请先完善和修正错误数据！')
              return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
            }
            valid = await this.$refs.stageLink.validate()
            if (!valid) {
              this.$message.warning('亲，请先完善和修正错误数据！')
              return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
            }
            const data = {
              bpmaValueFinishPayMaster: this.formData,
              bpmaValueFinishPayDetails: this.linkData
            }
            res = await saveValueFinishPayMaster(data)
            if (!res.rel) return
            this.formData = res.data.bpmaValueFinishPayMaster
            this.linkData = res.data.bpmaValueFinishPayDetails
            this.formData.qualityAssuranceDate = this.formData.qualityAssuranceDate ? new Date(this.formData.qualityAssuranceDate).getTime() : ''
            this.formData.shouldIncomeDate = this.formData.shouldIncomeDate ? new Date(this.formData.shouldIncomeDate).getTime() : ''
            if(!this.$refs.refBasicUpload.submitUpload(this.formData.id)) return false
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
      planChange() {

      }
    }
  }
</script>

<style scoped>
</style>
