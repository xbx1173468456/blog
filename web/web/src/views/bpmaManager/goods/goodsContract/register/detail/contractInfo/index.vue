<template>
  <div class="addFrom">
    <basic-handler>
      <el-button @click="initFormData" icon="el-icon-plus" plain size="small" type="primary">新增合同</el-button>
      <el-button :disabled="isUpdate || disabled" @click="save" icon="el-icon-if-save" plain size="small" type="primary">保存
      </el-button>
      <el-button :disabled="disabled || !formData.id" @click="deleteData" icon="el-icon-delete" plain size="small"
        type="danger">删除
      </el-button>
      <el-button :disabled="disabled" @click="review" icon="el-icon-if-auth" plain size="small" type="primary">审核
      </el-button>
      <el-button :disabled="signDisabled || !disabled" @click="sign" icon="el-icon-if-signing" plain size="small"
        type="success">签约
      </el-button>
    </basic-handler>
    <el-form :model="formData" :rules="rules" class="form-container" ref="form">
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item class="add-border disabled" label="审核状态">
            <el-radio-group v-model="formData.validateStatus">
              <el-radio :key="row.code" :label="parseInt(row.code)" disabled
                v-for="(row, key, index) in dataEnum.validateStatus">
                {{ row.name }}
              </el-radio>
            </el-radio-group>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="合同单号">
            <basic-input disabled placeholder="自动生成合同单号" v-model="formData.code"></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="项目名称" porp="proName">
            <el-input :disabled="disabled" readOnly placeholder="请选择项目名称" v-model="formData.proName" size="small">
              <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="合同名称" prop="name">
            <basic-input :disabled="disabled" placeholder="请输入合同名称" v-model="formData.name"></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="价税合计金额">
            <basic-input :disabled="signDisabled && disabled" :format="formatToThousands" :formatValue="formatToMoney" placeholder="请输入价税合计金额"
              v-model="formData.beforeTaxPrice" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="税后合计金额">
            <basic-input disabled v-model="afterTaxAmount" price></basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="发票类型">
            <el-select :disabled="signDisabled && disabled"
              @change="handleInvoiceTypeChange"
              placeholder="无" size="small" v-model="formData.invoiceTypeId">
              <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in invoiceTypeSelectData">
              </el-option>
            </el-select>
            <!-- <el-input :disabled="disabled" v-model="formData.invoiceType"></el-input> -->
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="发票税率" prop="invoiceTaxRate">
            <basic-input :disabled="(signDisabled && disabled) || !formData.invoiceType || formData.invoiceType == '无'" :formatValue="formatToMoney" :max="1" :min="0"
              placeholder="请输入大于0小于1的发票税率" type="number" v-model="formData.invoiceTaxRate" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="进项税额">
            <basic-input disabled v-model="taxMoney" price></basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item class="btnItem" label="我方机构" prop="ourEnterpriseName">
            <el-input :disabled="disabled" readOnly placeholder="请选择我方机构" v-model="formData.ourEnterpriseName" size="small">
              <el-button @click="toipClick('meMechanism')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item class=" btnItem" label="对方单位" prop="oppositeEnterpriseName">
            <el-input :disabled="disabled" readOnly placeholder="请选择对方单位" v-model="formData.oppositeEnterpriseName" size="small">
              <el-button @click="toipClick('counterpart')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item class="  btnItem" label="三方单位">
            <el-input :disabled="disabled" readOnly placeholder="请选择第三方单位" v-model="formData.thirdEnterpriseName" size="small">
              <el-button @click="toipClick('tripartiteUnit')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item class="add-border disabled  " label="签约状态">
            <el-radio-group v-model="formData.signStatus">
              <el-radio :key="row.code" :label="parseInt(row.code)" disabled
                v-for="(row, key, index) in dataEnum.siginStatus">
                {{ row.name }}
              </el-radio>
            </el-radio-group>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item :error="error.signDate" label="签约日期">
            <el-date-picker :disabled="signDisabled && disabled" placeholder="请选择日期" size="small" type="date"
              v-model="formData.signDate" value-format="timestamp">
            </el-date-picker>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="原始合同号">
            <basic-input :disabled="signDisabled && disabled" placeholder="请输入原始合同号" v-model="formData.orignalCode">
            </basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="计价方式">
            <el-select :disabled="signDisabled && disabled"
              @change="val => formData.computeMode = computeModeSelectData.filter(res => res.id == val)[0].name"
              placeholder="无" size="small" v-model="formData.computeModeId">
              <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in computeModeSelectData">
              </el-option>
            </el-select>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="进度款支付比例" prop="progressPricePayScale">
            <basic-input :disabled="signDisabled && disabled" :formatValue="formatToMoney" :max="1" :min="0"
              placeholder="请输入大于0小于1的进度款支付比列" type="number" v-model="formData.progressPricePayScale" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="质保金比例" prop="qualityAssurancePriceScale">
            <basic-input :disabled="signDisabled && disabled" :formatValue="formatToMoney" :max="1" :min="0"
              placeholder="请输入大于0小于1的质保金比列" type="number" v-model="formData.qualityAssurancePriceScale" price></basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <basic-form-item label="合同内容">
        <el-input :disabled="signDisabled && disabled" :maxlength="5000" :rows="2" placeholder="请输入合同内容" type="textarea"
          v-model="formData.content"></el-input>
      </basic-form-item>
      <basic-form-item label="支付方式">
        <el-input :disabled="signDisabled && disabled" :maxlength="5000" :rows="2" placeholder="请输入支付方式" type="textarea"
          v-model="formData.payMode"></el-input>
      </basic-form-item>
      <basic-form-item label="合同交底">
        <el-input :disabled="signDisabled && disabled" :maxlength="5000" :rows="2" placeholder="请输入合同交底" type="textarea"
          v-model="formData.contractExplain"></el-input>
      </basic-form-item>
      <basic-form-item label="合同摘要">
        <el-input :disabled="signDisabled && disabled" :maxlength="5000" :rows="2" placeholder="请输入合同摘要" type="textarea"
          v-model="formData.summary"></el-input>
      </basic-form-item>
      <basic-form-item label="补充说明">
        <el-input :disabled="signDisabled && disabled" :maxlength="5000" :rows="2" placeholder="请输入补充说明" type="textarea"
          v-model="formData.remark"></el-input>
      </basic-form-item>
      <basic-form-item label="文档附件" class="add-border file">
        <basic-upload ref="refBasicUpload" :formId="formData.id" :disabled="signDisabled && disabled">
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
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择" >
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMeMechanism" title="我方机构-选择" >
      <dialog-my-unit @selectionChange="selectionChange" filterUnit filterValid v-if="visibleSyncMeMechanism">
      </dialog-my-unit>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncMeMechanism = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncCounterpart" title="三方单位-选择" >
      <dialog-transit-unit @selectionChange="selectionChange" filterValid v-if="visibleSyncCounterpart">
      </dialog-transit-unit>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncCounterpart = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncTripartiteUnit" title="三方单位-选择" >
      <dialog-transit-unit @selectionChange="selectionChange" filterValid v-if="visibleSyncTripartiteUnit">
      </dialog-transit-unit>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncTripartiteUnit = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import { getUserManagerDetailData } from '@/api/sysManager/groupAuth/userManager/detail'
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogMyUnit from '@/views/components/dialog/dialogMyUnit'
  import dialogTransitUnit from '@/views/components/dialog/dialogTransitUnit'
  import {
    deletePayContractInfoMaster,
    reviewPayContractInfoMaster,
    savePayContractInfoMaster,
    postPayContractInfoMaster,
    signPayContractInfoMaster,
    getPayContractInfoDetail
  } from '@/api/bpmaManager/goods/goodsContract/register'
  import formatBasic from '@/utils/mixins/formatBasic.js'

  export default {
    name: 'contractInfo',
    mixins: [computed, methods, formatBasic],
    components: {
      dialogProject,
      dialogMyUnit,
      dialogTransitUnit
    },
    data() {
      const that = this
      return {
        formData: (this.$route.query.formData && JSON.parse(this.$route.query.formData)) || {},
        isUpdate: true,
        rules: {
          name: [{ required: true, trigger: 'change', min: 2 }],
          proName: [{ required: true, trigger: 'change', min: 2 }],
          validateStatus: [{ required: true, trigger: 'change' }],
          invoiceTaxRate: [{ validator: that.validatePass, trigger: 'change' }],
          progressPricePayScale: [{ validator: that.validatePass, trigger: 'change' }],
          qualityAssurancePriceScale: [{ validator: that.validatePass, trigger: 'change' }],
          ourEnterpriseName: [{ required: true, trigger: 'change' }],
          oppositeEnterpriseName: [{ required: true, trigger: 'change' }]
        },
        error: {
          signDate: ''
        },
        type: null,
        invoiceTypeSelectData: [],
        computeModeSelectData: [],
        visibleSyncProject: false,
        visibleSyncMeMechanism: false,
        visibleSyncCounterpart: false,
        visibleSyncTripartiteUnit: false,
        selectedRow: {}
      }
    },
    computed: {
      disabled() {
        if (this.validateStatus) {
          return this.formData.validateStatus == this.validateStatus.code
        }
      },
      signDisabled() {
        if (this.siginStatus) {
          return this.formData.signStatus == this.siginStatus.code
        }
      },
      siginStatus() {
        if (!Array.isArray(this.dataEnum.siginStatus)) return {}
        return this.dataEnum.siginStatus.filter(item => item.name === '已签约')[0]
      },
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
      },
      afterTaxAmount: {
        get() {
          let money = Number(this.formData.beforeTaxPrice)
          let invrate = Number(this.formData.invoiceTaxRate)
          // if (this.formData.invoiceType != '增值税专用发票') return this.$utilsBasic.toThousands(money)
          let afterTaxPrice = isNaN(money / (1 + invrate)) ? '0.00' : (money / (1 + invrate)).toFixed(2)
          this.formData.afterTaxPrice = afterTaxPrice
          return this.$utilsBasic.toThousands(afterTaxPrice)
        },
        set() {
        }
      },
      taxMoney: {
        get() {
          if (this.formData.invoiceType != '增值税专用发票') return '0.00'
          let money = Number(this.formData.beforeTaxPrice)
          let invrate = Number(this.formData.invoiceTaxRate)
          let tax = isNaN(money / (1 + invrate) * invrate) ? '0.00' : (money / (1 + invrate) * invrate).toFixed(2)
          this.formData.tax = tax
          return this.$utilsBasic.toThousands(tax)
        },
        set() {
        }
      }
    },
    watch: {
      formData: {
        handler(val) {
          this.$emit('formData', val)
          this.isUpdate = false
        },
        deep: true
      }
    },
    async created() {
      this.$store.dispatch("cacheId", '0')
      this.getEnumData(['GetValidateStatusData', 'GetSiginStatusData'])
      const invoiceTypeSelectData = await getDictionaryDataByTypeFilter('SYS_INVOICE_TYPE')
      const computeModeSelectData = await getDictionaryDataByTypeFilter('BPMA_COMPUTE_MODE')
      this.invoiceTypeSelectData = invoiceTypeSelectData.data
      this.computeModeSelectData = computeModeSelectData.data
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.initFormData()
      }, async id => {
        await this.getPayContractInfoDetail(id)
        if (this.formData.signDate) {
          this.formData.signDate = this.format(this.formData.signDate)
        }
      })
      this.$store.dispatch("cacheId", undefined)
    },
    methods: {
      toipClick(type) {
        if (this.disabled) return
        this.type = type
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
      },
      selectionChange(row) {
        this.selectedRow = row.selectedRow
      },
      getPayContractInfoDetail(id) {
        return getPayContractInfoDetail(id).then(res => {
          this.formData = res.data
          this.$emit('formData', this.formData)
        })
      },
      handleChange() {
        const row = this.selectedRow
        if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return
        switch (this.type) {
          case 'project':
            this.$set(this.formData, 'proName', row.name)
            this.$set(this.formData, 'proId', row.id)
            this.$set(this.formData, 'proCode', row.code)
            break
          case 'meMechanism':
            this.$set(this.formData, 'ourEnterpriseName', row.name)
            this.$set(this.formData, 'ourEnterpriseId', row.id)
            this.$set(this.formData, 'ourEnterpriseCode', row.code)
            break
          case 'counterpart':
            this.$set(this.formData, 'oppositeEnterpriseName', row.name)
            this.$set(this.formData, 'oppositeEnterpriseId', row.id)
            this.$set(this.formData, 'oppositeEnterpriseCode', row.code)
            break
          case 'tripartiteUnit':
            this.$set(this.formData, 'thirdEnterpriseName', row.name)
            this.$set(this.formData, 'thirdEnterpriseId', row.id)
            this.$set(this.formData, 'thirdEnterpriseCode', row.code)
            break
        }
        this.isUpdate = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      initFormData(lock) {
        this.formData = {
          validateStatus: 2,
          beforeTaxPrice: '0.00',
          invoiceTaxRate: '0.00',
          progressPricePayScale: '1.00',
          qualityAssurancePriceScale: '0.00',
          type: 2,
          signStatus: 2,
          proName: this.formData.proName,
          proId: this.formData.proId,
          proCode: this.formData.proCode
        }
      },
      handleInvoiceTypeChange(val) {
        this.$set(this.formData, 'invoiceType', this.invoiceTypeSelectData.filter(res => res.id == val)[0].name)
        if(!this.formData.invoiceType || this.formData.invoiceType == '无') this.formData.invoiceTaxRate = '0.00'
      },
      deleteData() {
        if (this.formData.id) {
          this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(res => {
            deletePayContractInfoMaster(this.formData.id).then(res => {
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
          let result = await this.save(true)
          this.formData = result.data
          reviewPayContractInfoMaster(this.formData).then(res => {
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
              res = await postPayContractInfoMaster(this.formData)
            } else {
              res = await savePayContractInfoMaster(this.formData)
            }
            if (!res.rel) return
            this.formData = res.data
            this.formData.signDate = this.format(this.formData.signDate)
            this.formData = res.data
            if(!this.$refs.refBasicUpload.submitUpload(this.formData.id)) return false;
            if (lock !== true) {
              this.$message.success(res.message)
            }
            this.$nextTick(() => {
              this.isUpdate = true
              reslove(res)
            })
          })
        })
      },
      sign() {
        if (!this.formData.signDate) {
          return this.error.signDate = 'err'
        } else {
          this.error.signDate = ''
        }
        this.$confirm('亲，您是否确定当前合同已签约，确定后数据不能修改！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          signPayContractInfoMaster(this.formData).then(res => {
            if (res.rel) {
              this.formData.signStatus = 1
              this.$message.success(res.message)
            }
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
      format(date) {
        return new Date(date).getTime()
      }
    }
  }
</script>

<style scoped>
</style>
