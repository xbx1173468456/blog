<template>
  <div :style="windowHeight" class="contractId-container-list">
    <basic-handler>
      <el-button v-if="isUpdateAuthWorkFlow" @click="initProjectFormData" icon="el-icon-plus" plain size="small" type="primary">新增评审单</el-button>
      <el-button :disabled="disabled" @click="save" icon="el-icon-if-save" plain size="small" type="primary">保存
      </el-button>
      <el-button v-if="isUpdateAuthWorkFlow" :disabled="disabled || !formData.id" @click="deleteData" icon="el-icon-delete" plain size="small"
                 type="danger">删除
      </el-button>
      <el-button v-if="isUpdateAuthWorkFlow" :disabled="disabled" @click="review" icon="el-icon-if-auth" plain size="small" type="primary">审核
      </el-button>
      <basic-see-process v-if="isUpdateAuthWorkFlow" :id="formData.processInstanceId"></basic-see-process>
    </basic-handler>
    <el-form :model="formData" :rules="rules" class="form-container" ref="form">
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-validate-status :model="formData"></basic-validate-status>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="评审单号">
            <basic-input disabled placeholder="自动生成评审单号" v-model="formData.code"></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="项目名称" prop="proName">
            <el-input :disabled="disabled" readOnly placeholder="请选择项目名称" v-model="formData.proName" size="small">
              <el-button @click="toipClick('project')" class="form-btn" icon="el-icon-plus" size="mini" :disabled="disabled"
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
            <basic-input :disabled="disabled" :format="formatToThousands" :formatValue="formatToMoney" placeholder="请输入价税合计金额"
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
            <el-select :disabled="disabled"
                       @change="handleInvoiceTypeChange"
                       placeholder="无"
                       size="small" v-model="formData.invoiceTypeId">
              <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in invoiceTypeSelectData">
              </el-option>
            </el-select>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="发票税率" prop="invoiceTaxRate">
            <basic-input :disabled="disabled || !formData.invoiceType || formData.invoiceType == '无'" :formatValue="formatToMoney" placeholder="请输入大于0小于1的发票税率"
                       type="number" v-model="formData.invoiceTaxRate" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="应交税额">
            <basic-input disabled v-model="taxMoney" price></basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="我方机构" prop="ourEnterpriseName">
            <el-input :disabled="disabled" readOnly placeholder="请选择我方机构" v-model="formData.ourEnterpriseName" size="small">
              <el-button @click="toipClick('meMechanism')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                         slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="对方单位" prop="oppositeEnterpriseName">
            <el-input :disabled="disabled" readOnly placeholder="请选择对方单位" v-model="formData.oppositeEnterpriseName" size="small">
              <el-button @click="toipClick('counterpart')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                         slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="三方单位">
            <el-input :disabled="disabled" readOnly placeholder="请选择第三方单位" v-model="formData.thirdEnterpriseName" size="small">
              <el-button @click="toipClick('tripartiteUnit')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                         slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="计价方式">
            <el-select :disabled="disabled"
                       @change="val => formData.computeMode = computeModeSelectData.filter(res => res.id == val)[0].name"
                       placeholder="无"
                       size="small" v-model="formData.computeModeId">
              <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in computeModeSelectData">
              </el-option>
            </el-select>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="进度款支付比例" prop="progressPricePayScale">
            <basic-input :disabled="disabled" :formatValue="formatToMoney" placeholder="请输入大于0小于1的进度款支付比列"
                       type="number" v-model="formData.progressPricePayScale" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="质保金比例" prop="qualityAssurancePriceScale">
            <basic-input :disabled="disabled" :formatValue="formatToMoney" placeholder="请输入大于0小于1的质保金比列"
                       type="number" v-model="formData.qualityAssurancePriceScale" price></basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="起草人员" prop="draftPerson">
            <basic-input :disabled="disabled" placeholder="请输入起草人员" v-model="formData.draftPerson"></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="承办人员" prop="handlePerson">
            <basic-input :disabled="disabled" placeholder="请输入承办人员" v-model="formData.handlePerson"></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item class="add-border disabled " label="是否生成合同">
            <span>
              {{formatIsOrNot(formData.ifContract)}}
            </span>
          </basic-form-item>
        </el-col>
      </el-row>
      <basic-form-item label="合同正文">
        <el-input :disabled="disabled" :rows="textareaHeight" placeholder="请输入合同正文" type="textarea"
                  v-model="formData.contractContent" show-word-limit></el-input>
      </basic-form-item>
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
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择" >
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMeMechanism" title="我方机构-选择" >
      <dialog-my-unit @selectionChange="selectionChange" filterUnit filterValid
                      v-if="visibleSyncMeMechanism"></dialog-my-unit>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncMeMechanism = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncCounterpart" title="三方单位-选择" >
      <dialog-transit-unit @selectionChange="selectionChange" filterValid
                           v-if="visibleSyncCounterpart"></dialog-transit-unit>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncCounterpart = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncTripartiteUnit" title="三方单位-选择" >
      <dialog-transit-unit @selectionChange="selectionChange" filterValid
                           v-if="visibleSyncTripartiteUnit"></dialog-transit-unit>
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
  import formatBasic from '@/utils/mixins/formatBasic.js'
  import formatEnum from '@/utils/mixins/formatEnum.js'
  import {
    deleteReview,
    reviewDoc,
    saveReview,
    postReview,
    getContractReview
  } from '@/api/bpmaManager/early/undertakeContract/review.js'

  export default {
    name: 'detail',
    mixins: [computed, methods, formatBasic, formatEnum],
    components: {
      dialogProject,
      dialogMyUnit,
      dialogTransitUnit
    },
    data() {
      let that = this
      return {
        formData: {},
        rules: {
          name: [{ required: true, trigger: 'change' }, {max: 100, trigger: 'change' }],
          proName: [{ required: true, trigger: 'change' }],
          validateStatus: [{ required: true, trigger: 'change' }],
          invoiceTaxRate: [{ validator: that.validatePass, trigger: 'change' }],
          progressPricePayScale: [{ validator: that.validatePass, trigger: 'change' }],
          qualityAssurancePriceScale: [{ validator: that.validatePass, trigger: 'change' }],
          draftPerson: [{ max: 50, trigger: 'change' }],
          handlePerson: [{ max: 50, trigger: 'change' }],
          remark: [{ max: 5000, trigger: 'change' }],
          ourEnterpriseName: [{ required: true, trigger: 'change' }],
          oppositeEnterpriseName: [{ required: true, trigger: 'change' }]
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
    props: {
      isUpdateAuthWorkFlow: {
        type: Boolean,
        default: () => true
      },
      reserve: null
    },
    computed: {
      disabled() {
        if (this.validateStatus) {
          if(this.formData.validateStatus == 5 && this.reserve == 1) return false
          return this.validateStatus.map(item => Number(item.code)).includes(this.formData.validateStatus)
        }
      },
      validateStatus() {
        if (!Array.isArray(this.dataEnum.auditStatusEnum)) return {}
        return this.dataEnum.auditStatusEnum.filter(item => (item.code == 1 || item.code == 3 || item.code == 4 || item.code == 5))
      },
      afterTaxAmount: {
        get() {
          let money = Number(this.formData.beforeTaxPrice)
          let invrate = Number(this.formData.invoiceTaxRate)
          let afterTaxPrice = isNaN(money / (1 + invrate)) ? '0.00' : (money / (1 + invrate)).toFixed(2)
          this.formData.afterTaxPrice = afterTaxPrice
          return this.$utilsBasic.toThousands(afterTaxPrice)
        },
        set() {
        }
      },
      taxMoney: {
        get() {
          let money = Number(this.formData.beforeTaxPrice)
          let invrate = Number(this.formData.invoiceTaxRate)
          let tax = isNaN(money / (1 + invrate) * invrate) ? '0.00' : (money / (1 + invrate) * invrate).toFixed(2)
          this.formData.tax = tax
          return this.$utilsBasic.toThousands(tax)
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
        return parseInt(((this.$store.state.app.screenHeight - 133) - 45 * 11) / 25)
      },
      userInfo() {
        return this.$store.state
      }
    },
    async created() {
      this.$store.dispatch("cacheId", '0')
      this.getEnumData(['GetAuditStatusEnum', 'GetSiginStatusData', 'GetIsOrNotData'])
      const invoiceTypeSelectData = await getDictionaryDataByTypeFilter('SYS_INVOICE_TYPE')
      const computeModeSelectData = await getDictionaryDataByTypeFilter('BPMA_COMPUTE_MODE')
      this.invoiceTypeSelectData = invoiceTypeSelectData.data
      this.computeModeSelectData = computeModeSelectData.data
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.initProjectFormData()
        this.$store.dispatch("cacheId", undefined);
      }, id => {
        if (this.$route.params.detail != 'detail') {
          this.getContractReview(this.$route.params.detail)
        } else {
          this.initProjectFormData()
        }
        this.$store.dispatch("cacheId", undefined);
      })
    },
    methods: {
      initProjectFormData(lock) {
        const { id, code, name } = this.$route.query
        this.formData = {
          validateStatus: 2,
          beforeTaxPrice: '0.00',
          invoiceTaxRate: '0.00',
          progressPricePayScale: '1.00',
          qualityAssurancePriceScale: '0.00',
          signStatus: 2,
          ifContract: 2,
          proName: lock ? '' : name,
          proId: lock ? '' : id,
          proCode: lock ? '' : code
        }
      },
      getContractReview(id) {
        return getContractReview(id).then(res => {
          if (res.data) {
            this.formData = res.data
            this.$nextTick(() => {
            })
          } else {
            this.initProjectFormData()
          }
        })
      },
      toipClick(type) {
        if (this.disabled) return
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
            this.$set(this.formData, 'proName', row.name)
            this.$set(this.formData, 'proId', row.id)
            this.$set(this.formData, 'proCode', row.code)
            break
          case 'meMechanism':
            this.$set(this.formData, 'ourEnterpriseId', row.id)
            this.$set(this.formData, 'ourEnterpriseCode', row.code)
            this.$set(this.formData, 'ourEnterpriseName', row.name)
            break
          case 'counterpart':
            this.$set(this.formData, 'oppositeEnterpriseId', row.id)
            this.$set(this.formData, 'oppositeEnterpriseCode', row.code)
            this.$set(this.formData, 'oppositeEnterpriseName', row.name)
            break
          case 'tripartiteUnit':
            this.$set(this.formData, 'thirdEnterpriseId', row.id)
            this.$set(this.formData, 'thirdEnterpriseCode', row.code)
            this.$set(this.formData, 'thirdEnterpriseName', row.name)
            break
        }
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
          this.initProjectFormData(true)
          this.$router.replace({
            path: `/bpmaManager/early/undertakeContract/review/id/0/detail`,
            query: proData
          })
        } else {
          this.$router.replace({
            path: `/bpmaManager/early/undertakeContract/review/id/0/${this.formData.id}`,
            query: proData
          })
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
            deleteReview(this.formData.id).then(res => {
              if (res.rel) {
                this.$message.success(res.message)
                this.initFormData(true)
              }
            })
          }).catch(err => '');
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
          reviewDoc(this.formData).then(res => {
            this.formData = res.data
            if(res.data.processInstanceId) {
              return this.$store.dispatch('OpenSelectUserAndHandleAudit', {
                processId: res.data.processInstanceId,
                formData: res.data
              }).then(() => {
                this.$message.success(res.message);
              })
            } else {
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
              res = await postReview(this.formData)
            } else {
              res = await saveReview(this.formData)
            }
            if (!res.rel) return
            this.formData = res.data
            if(!this.$refs.refBasicUpload.submitUpload(this.formData.id)) return false;
            // this.initFormData()
            if (lock !== true) {
              this.$message.success(res.message)
            }
            this.$nextTick(() => {
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
      }
    }
  }
</script>

<style scoped>
</style>
