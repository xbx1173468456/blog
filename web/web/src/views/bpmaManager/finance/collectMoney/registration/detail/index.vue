<template>
  <div :style="windowHeight" class="detail-container-list">
    <basic-handler>
      <el-button @click="initFormData" icon="el-icon-plus" plain size="small" type="primary">新增应收</el-button>
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
          <basic-form-item label="款项名称" prop="name">
            <basic-input :disabled="disabled" placeholder="请输入款项名称" v-model="formData.name"></basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="项目名称">
            <el-input :disabled="disabled" readOnly placeholder="请选择项目名称" v-model="formData.proName" size="small">
              <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini"
                :disabled="disabled" slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="单位名称" prop="enterpriseName">
            <el-input :disabled="disabled" readOnly placeholder="请选择单位" v-model="formData.enterpriseName" size="small">
              <el-button @click="toipClick('unit')" class="el-button-append" icon="el-icon-plus" size="mini"
                :disabled="disabled" slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="合同名称">
            <el-input :disabled="disabled" readOnly placeholder="请选择合同名称" v-model="formData.contractName" size="small">
              <el-button @click="toipClick('contract')" class="el-button-append" icon="el-icon-plus" size="mini"
                :disabled="disabled" slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="应收日期">
            <el-date-picker :disabled="disabled" placeholder="请选择日期" size="small" type="date" v-model="formData.payDate"
              value-format="timestamp">
            </el-date-picker>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="应收金额">
            <basic-input :disabled="disabled" :format="formatToThousands" :formatValue="formatToMoney"
              placeholder="请输入应收金额" v-model="formData.payPrice" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item></basic-form-item>
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
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择" >
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
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncContract" title="合同-选择" >
      <dialog-my-contract :oppositeEnterpriseId="formData.enterpriseId" :proId="formData.proId"
        @selectionChange="selectionChange" filterValid v-if="visibleSyncContract"></dialog-my-contract>
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
  import popDialog from '@/views/components/dialog/popDialog'
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogMyContract from '@/views/components/dialog/dialogMyContract'
  import dialogTransitUnit from '@/views/components/dialog/dialogTransitUnit'
  import {
    deleteFinanceShouldIncomes,
    reviewFinanceShouldIncomes,
    saveFinanceShouldIncomes,
    postFinanceShouldIncomes,
    getFinanceShouldIncomeDetail
  } from '@/api/bpmaManager/finance/collectMoney/registration.js'
  import formatBasic from '@/utils/mixins/formatBasic.js'

  export default {
    name: 'detail',
    mixins: [computed, methods, formatBasic],
    components: {
      dialogProject,
      dialogMyContract,
      dialogTransitUnit
    },
    data() {
      let that = this
      return {
        formData: {},
        isUpdate: true,
        rules: {
          handlePerson: [{ required: true, trigger: 'change', min: 2 }],
          name: [{ required: true, trigger: 'change', min: 2 }],
          contractName: [{ required: true, trigger: 'change', min: 2 }],
          enterpriseName: [{ required: true, trigger: 'change', min: 2 }],
          proName: [{ required: true, trigger: 'change', min: 2 }],
          validateStatus: [{ required: true, trigger: 'change' }]
        },
        type: null,
        invoiceTypeSelectData: [],
        computeModeSelectData: [],
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
          this.isUpdate = false
        },
        deep: true
      }
    },
    async created() {
      this.$store.dispatch("cacheId", '0')
      this.getEnumData(['GetValidateStatusData', 'GetIsOrNotData', 'GetGenderData'])
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
          await this.getFinanceShouldIncomeDetail(this.$route.params.detail)
        } else {
          this.initProjectFormData()
        }
        if (!this.formData.payDate) {
          this.$set(this.formData, 'payDate', new Date().getTime())
        } else {
          this.formData.payDate = new Date(this.formData.payDate).getTime()
        }
      })
      this.$store.dispatch("cacheId", undefined);
    },
    methods: {
      initProjectFormData() {
        const { id, code, name } = this.$route.query
        this.formData = {
          validateStatus: 2,
          payPrice: '0.00',
          proName: name,
          proId: id,
          proCode: code,
          payDate: new Date().getTime()
        }
      },
      getFinanceShouldIncomeDetail(id) {
        return getFinanceShouldIncomeDetail(id).then(res => {
          if (res.data) {
            this.formData = res.data
          } else {
            this.initProjectFormData()
          }
        })
      },
      toipClick(type) {
        if (this.disabled) return
        if (type == 'unit' && !this.formData.proId) return this.$message.warning('请先选择项目')
        if (type == 'contract' && !this.formData.enterpriseId) return this.$message.warning('请先选择单位')
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
            this.$set(this.formData, 'enterpriseName', '')
            this.$set(this.formData, 'enterpriseId', '')
            this.$set(this.formData, 'contractName', '')
            this.$set(this.formData, 'contractId', '')
            break
          case 'unit':
            this.$set(this.formData, 'enterpriseName', row.name)
            this.$set(this.formData, 'enterpriseId', row.id)
            this.$set(this.formData, 'contractName', '')
            this.$set(this.formData, 'contractId', '')
            break
          case 'contract':
            this.$set(this.formData, 'contractName', row.name)
            this.$set(this.formData, 'contractId', row.id)
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
            path: `/bpmaManager/finance/collectMoney/registration/id/0/detail`,
            query: proData
          })
        } else {
          this.$router.replace({
            path: `/bpmaManager/finance/collectMoney/registration/id/0/${this.formData.id}`,
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
            deleteFinanceShouldIncomes(this.formData.id).then(res => {
              if (res.rel) {
                this.$message.success(res.message)
                this.initFormData(true)
              }
            })
          }).catch(err => console.warn(err))
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
          reviewFinanceShouldIncomes(this.formData).then(res => {
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
              res = await postFinanceShouldIncomes(this.formData)
            } else {
              res = await saveFinanceShouldIncomes(this.formData)
            }
            if (!res.rel) return
            this.formData = res.data
            if(!this.$refs.refBasicUpload.submitUpload(this.formData.id)) return false;
            this.formData.payDate = new Date(this.formData.payDate).getTime()
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
      moeryCard(cardNo) {
        if (!cardNo) return cardNo
        cardNo = cardNo.replace(/ /g, '')
        return cardNo.replace(/([\d\D]{4})/g, '$1 ')
      }
    }
  }
</script>

<style scoped>
</style>
