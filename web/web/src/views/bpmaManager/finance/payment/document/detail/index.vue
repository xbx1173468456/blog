<template>
  <div :style="windowHeight" class="contractId-container-list">
    <basic-handler>
      <el-button @click="initProjectFormData" icon="el-icon-plus" plain size="small" type="primary">新增付款</el-button>
      <el-button :disabled="disabled" @click="save" icon="el-icon-if-save" plain size="small"
        type="primary">保存
      </el-button>
      <el-button :disabled="disabled || !formData.id" @click="deleteData" icon="el-icon-delete" plain size="small"
        type="danger">删除
      </el-button>
      <el-button :disabled="disabled" @click="review" icon="el-icon-if-auth" plain size="small" type="primary">审核
      </el-button>
    </basic-handler>
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
          <basic-form-item label="项目名称">
            <el-input :disabled="disabled" readOy placeholder="请选择项目名称" v-model="formData.proName" size="small">
              <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini"
                :disabled="disabled" slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="单位名称" prop="subEnterpriseName">
            <el-input :disabled="disabled" readOy placeholder="请选择单位" v-model="formData.subEnterpriseName" size="small">
              <el-button @click="toipClick('unit')" class="el-button-append" icon="el-icon-plus" size="mini"
                :disabled="disabled" slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="合同名称">
            <el-input :disabled="disabled" readOy placeholder="请选择合同名称" v-model="formData.contractName" size="small">
              <el-button @click="toipClick('contract')" class="el-button-append" icon="el-icon-plus" size="mini"
                :disabled="disabled" slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="累计应付总额">
            <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney"
              placeholder="请输入累计应付总额" v-model="formData.totalShouldPayPrice" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="累计收票总额">
            <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney"
              placeholder="请输入累计收票总额" v-model="formData.totalBillPrice" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="累计付款总额">
            <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney"
              placeholder="请输入累计付款总额" v-model="formData.totalPayPrice" price></basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="累计未付总额">
            <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney"
              placeholder="请输入累计未付总额" v-model="formData.totalUnpayPrice" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="本次申请总额" prop="applyPrice">
            <basic-input :disabled="disabled" :format="formatToThousands" :formatValue="formatToMoney"
              placeholder="请输入本次申请总额" v-model="formData.applyPrice" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="本次实付总额" prop="payPrice">
            <basic-input :disabled="disabled" :format="formatToThousands" :formatValue="formatToMoney"
              placeholder="请输入本次实付总额" v-model="formData.payPrice" price></basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="付款方式" prop="payModeId">
            <el-select :disabled="disabled"
              @change="val => $set(formData, 'payMode', invoiceTypeSelectData.filter(res => res.id == val)[0].name)"
              placeholder="无" size="small" v-model="formData.payModeId">
              <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in invoiceTypeSelectData">
              </el-option>
            </el-select>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="付款账号">
            <basic-input :disabled="disabled" :format="formatMoeryCard" :maxlength="19" placeholder="请输入付款账号"
                       v-model="formData.payAccount"></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="收款账号">
            <basic-input :disabled="disabled" :format="formatMoeryCard" :maxlength="19" placeholder="请输入收款账号"
                       v-model="formData.incomeAccount"></basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <basic-form-item label="补充说明">
        <el-input :disabled="disabled" :maxlength="5000" :rows="textareaHeight" placeholder="请输入补充说明" type="textarea"
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
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncUnit" title="往来单位-选择" >
      <dialog-transit-unit @selectionChange="selectionChange" filterValid v-if="visibleSyncUnit"></dialog-transit-unit>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncUnit = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncContract" title="合同-选择">
      <dialog-sub-contract :oppositeEnterpriseId="formData.subEnterpriseId" :proId="formData.proId"
        @selectionChange="selectionChange" filterValid v-if="visibleSyncContract"></dialog-sub-contract>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
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
  import basicInput from '@/components/basicInput'
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogSubContract from '@/views/components/dialog/dialogSubContract'
  import dialogTransitUnit from '@/views/components/dialog/dialogTransitUnit'
  import {
    deleteFinancePay,
    reviewFinancePay,
    saveFinancePay,
    postFinancePay,
    getFinancePayDetail,
    getFinancePayMoney
  } from '@/api/bpmaManager/finance/payment/document.js'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'contractId',
    mixins: [computed, methods, formatBasic],
    components: {
      dialogTransitUnit,
      dialogProject,
      dialogSubContract
    },
    data() {
      let that = this
      return {
        formData: {},
        isUpdate: true,
        rules: {
          name: [{ required: true, trigger: 'change', min: 2 }],
          proName: [{ required: true, trigger: 'change', min: 2 }],
          payModeId: [{ required: true, trigger: 'change' }],
          subEnterpriseName: [{ required: true, trigger: 'change' }],
          validateStatus: [{ required: true, trigger: 'change' }],
          // applyPrice: [{ required: true, trigger: 'change' }, { validator: that.validate, trigger: 'change' }],
          // payPrice: [{ required: true, trigger: 'change' }, { validator: that.validate, trigger: 'change' }]
        },
        type: null,
        invoiceTypeSelectData: [],
        visibleSyncProject: false,
        visibleSyncContract: false,
        visibleSyncUnit: false,
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
      afterTaxAmount: {
        get() {
          let money = Number(this.formData.beforeTaxPrice)
          let invrate = Number(this.formData.invoiceTaxRate)
          if (this.formData.invoiceType != '增值税专用发票') return this.$utilsBasic.toThousands(money)
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
      },
      windowHeight() {
        return {
          height: this.$store.state.app.screenHeight - 120 + 'px'
        }
      },
      textareaHeight() {
        return parseInt(((this.$store.state.app.screenHeight - 133) - 45 * 8) / 25)
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
      this.getEnumData(['GetValidateStatusData', 'GetSiginStatusData'])
      const invoiceTypeSelectData = await getDictionaryDataByTypeFilter('BPMA_PAY_MODE')
      this.invoiceTypeSelectData = invoiceTypeSelectData.data
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.initProjectFormData()
      }, async id => {
        if (this.$route.params.detail != 'detail') {
          await this.getFinancePayDetail(this.$route.params.detail)
        } else {
          this.initProjectFormData()
        }
      })
      this.$store.dispatch("cacheId", undefined);
    },
    methods: {
      initProjectFormData() {
        const { id, code, name } = this.$route.query
        this.formData = {
          validateStatus: 2,
          totalShouldPayPrice: '0.00',
          totalBillPrice: '0.00',
          totalPayPrice: '0.00',
          totalUnpayPrice: '0.00',
          applyPrice: '0.00',
          payPrice: '0.00',
          name: '项目付款单',
          proName: name,
          proId: id,
          proCode: code
        }
      },
      getFinancePayDetail(id) {
        return getFinancePayDetail(id).then(res => {
          if (res.data) {
            this.formData = res.data
            this.$nextTick(() => {
              this.isUpdate = true
            })
          } else {
            this.initProjectFormData()
          }
        })
      },
      toipClick(type) {
        if (this.disabled) return
        if (type == 'unit' && !this.formData.proId) return this.$message.warning('请先选择项目')
        if (type == 'contract' && !this.formData.subEnterpriseId) return this.$message.warning('请先选择单位')
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
            this.$set(this.formData, 'subEnterpriseId', '')
            this.$set(this.formData, 'subEnterpriseName', '')
            this.$set(this.formData, 'contractId', '')
            this.$set(this.formData, 'contractName', '')
            break
          case 'unit':
            this.$set(this.formData, 'subEnterpriseId', row.id)
            this.$set(this.formData, 'subEnterpriseName', row.name)
            this.$set(this.formData, 'contractId', '')
            this.$set(this.formData, 'contractName', '')
            break
          case 'contract':
            this.$set(this.formData, 'contractId', row.id)
            this.$set(this.formData, 'contractName', row.name)
            break
        }
        const { subEnterpriseId, proId, contractId } = this.formData
        getFinancePayMoney({ subEnterpriseId, proId, contractId }).then(res => {
          const { totalShouldPayPrice, totalBillPrice, totalPayPrice, totalUnpayPrice } = res.data
          this.$set(this.formData, 'totalShouldPayPrice', totalShouldPayPrice)
          this.$set(this.formData, 'totalBillPrice', totalBillPrice)
          this.$set(this.formData, 'totalPayPrice', totalPayPrice)
          this.$set(this.formData, 'totalUnpayPrice', totalUnpayPrice)
        })
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
            path: `/bpmaManager/finance/payment/document/id/0/detail`,
            query: proData
          })
        } else {
          this.$router.replace({
            path: `/bpmaManager/finance/payment/document/id/0/${this.formData.id}`,
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
            deleteFinancePay(this.formData.id).then(res => {
              if (res.rel) {
                this.$message.success(res.message)
                this.initFormData(true)
                this.$store.dispatch('updateVisitedView', '/bpmaManager/finance/collectMoney/registration/2257326683324416')
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
          reviewFinancePay(this.formData).then(res => {
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
            // if(this.formData.payPrice > this.formData.totalUnpayPrice) {
            //   return this.$message.warning('亲，付款总额不能大于未付总额！')
            // }
            if (this.formData.id) {
              res = await postFinancePay(this.formData)
            } else {
              res = await saveFinancePay(this.formData)
            }
            if (!res.rel) return
            this.formData = res.data
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
      validate(rule, value, callback) {
        if (value > this.formData.totalUnpayPrice) {
          callback(new Error())
        }
        callback()
      },
      validatePayPrice(rule, value, callback) {
        if (value > this.formData.applyPrice) {
          callback(new Error())
        }
        callback()
      }
    }
  }
</script>

<style scoped>
</style>
