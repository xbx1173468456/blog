<template>
  <div :style="windowHeight" class="detail-container-list">
    <basic-handler>
      <el-button v-if="isUpdateAuthWorkFlow" @click="initProjectFormData(), costTypeList = []" icon="el-icon-plus" plain size="small" type="primary">新增报销</el-button>
      <el-button :disabled="disabled" @click="save" icon="el-icon-if-save" plain size="small"
                 type="primary">保存
      </el-button>
      <el-button v-if="isUpdateAuthWorkFlow" :disabled="disabled || !formData.id" @click="deleteData" icon="el-icon-delete" plain size="small"
                 type="danger">删除
      </el-button>
      <el-button v-if="isUpdateAuthWorkFlow" :disabled="disabled" @click="review" icon="el-icon-if-auth" plain size="small" type="primary">审核
      </el-button>
      <basic-see-process v-if="isUpdateAuthWorkFlow" :id="formData.processInstanceId"></basic-see-process>
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
                <basic-input disabled placeholder="系统自动生成单据编码" v-model="formData.code"></basic-input>
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
                <el-input :disabled="disabled" readOnly placeholder="请选择项目名称" v-model="formData.proName" size="small">
                  <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                             slot="append"></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="报销人员" prop="handlePerson">
                <el-input :disabled="disabled" readOnly placeholder="请选择报销人员" v-model="formData.handlePerson" size="small">
                  <el-button @click="toipClick('userManager')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                             slot="append"></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="报销金额">
                <basic-input :format="formatToThousands" disabled :formatValue="formatToMoney" placeholder="请输入报销金额"
                           v-model="applyPrice" price></basic-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="未还借款金额">
                <basic-input :format="formatToThousands" disabled :formatValue="formatToMoney" placeholder="请输入报销金额"
                           v-model="formData.borrowPrice" price></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="本次核销金额">
                <basic-input :disabled="disabled" :format="formatToThousands" :formatValue="formatToMoney" placeholder="请输入报销金额"
                           v-model="formData.cancelPrice" price></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="退还金额" prop="returnPrice">
                <basic-input :format="formatToThousands" disabled :formatValue="formatToMoney" placeholder="请输入报销金额"
                           v-model="returnPrice" price></basic-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <basic-form-item label="补充说明">
            <el-input :disabled="disabled" :maxlength="5000" :rows="2" placeholder="请输入补充说明" type="textarea"
                      v-model="formData.remark"></el-input>
          </basic-form-item>
          <basic-form-item label="文档附件" class="add-border file">
            <basic-upload ref="refBasicUpload" :formId="formData.id" :disabled="disabled">
            </basic-upload>
          </basic-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-row>
      <cost-type :disabled="disabled" :parentDatas="formData" ref="costType"
                 v-model="costTypeList"></cost-type>
    </el-row>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择" >
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncUserManager" title="选择借款人员" >
      <dialog-user-manager @selectionChange="selectionChange" filterValid
                           v-if="visibleSyncUserManager"></dialog-user-manager>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncUserManager = false">取 消</el-button>
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
  import dialogUserManager from '@/views/components/dialog/dialogUserManager'
  import {
    deleteFinanceDailyExpenseMaster,
    reviewFinanceDailyExpenseMaster,
    saveFinanceDailyExpenseMaster,
    getMasterAndDetail,
    getNoPaymentAmount,
    getFinanceDailyExpenseMasterDetail
  } from '@/api/bpmaManager/finance/cost/dailyReimbursement.js'
  import costType from './costType.vue'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'detail',
    mixins: [computed, methods, formatBasic],
    components: {
      dialogProject,
      dialogUserManager,
      costType
    },
    data() {
      let that = this
      return {
        formData: (this.$route.query.formData && JSON.parse(this.$route.query.formData)) || {
          validateStatus: 2
        },
        activeNames: ['1'],
        rules: {
          contractName: [{ required: true, trigger: 'change', min: 2 }],
          name: [{ required: true, trigger: 'change', min: 2 }],
          handlePerson: [{ required: true, trigger: 'change', min: 2 }],
          proName: [{ required: true, trigger: 'change', min: 2 }],
          validateStatus: [{ required: true, trigger: 'change' }]
        },
        costTypeList: [],
        handleRow: {},
        type: null,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < that.formData.beginDate
          }
        },
        costTypeList: [],
        handleData: [],
        visibleSyncProject: false,
        visibleSyncUserManager: false,
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
      windowHeight() {
        return {
          height: this.$store.state.app.screenHeight - 120 + 'px'
        }
      },
      textareaHeight() {
        return parseInt(((this.$store.state.app.screenHeight - 133) - 45 * 9) / 25)
      },
      applyPrice: {
        get() {
          let sum = 0
          this.costTypeList.forEach(item => {
            if(item.persistStatus != 'fdel') {
              sum += Number(item.price)
            }
          })
          this.formData.applyPrice = sum
          return sum
        },
        set() {
        }
      },
      returnPrice: {
        get() {
          const cancelPrice = String(this.formData.cancelPrice).replace(',', '')
          const applyPrice = String(this.applyPrice).replace(',', '')
          this.formData.returnPrice = cancelPrice - applyPrice
          return cancelPrice - applyPrice
        },
        set() {
        }
      }
    },
    async created() {
      this.$store.dispatch("cacheId", '0')
      this.getEnumData(['GetAuditStatusEnum', 'GetIsOrNotData', 'GetGenderData'])
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.initProjectFormData()
        this.costTypeList = []
      }, async id => {
        if (this.$route.params.detail != 'detail') {
          await this.getFinanceDailyExpenseMasterDetail(this.$route.params.detail)
        } else {
          this.initProjectFormData()
          this.costTypeList = []
        }
      })
      this.$store.dispatch("cacheId", undefined);
    },
    methods: {
      initProjectFormData() {
        const { id, code, name } = this.$route.query
        this.formData = {
          validateStatus: 2,
          name: '日常费用报销单',
          applyPrice: '0.00',
          borrowPrice: '0.00',
          cancelPrice: '0.00',
          returnPrice: '0.00',
          proName: name,
          proId: id,
          proCode: code
        }
      },
      getFinanceDailyExpenseMasterDetail(id) {
        return getFinanceDailyExpenseMasterDetail(id).then(res => {
          if (res.data) {
            this.formData = res.data
            getMasterAndDetail(this.$route.params.detail).then(res => {
              this.costTypeList = res.data.bpmaFinanceDailyExpenseDetails || []
            })
          } else {
            this.initProjectFormData()
          }
        })
      },
      toipClick(type) {
        if (this.disabled) return
        if (type == 'userManager' && !this.formData.proId) return this.$message.warning('请先选择项目')
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
            this.$set(this.formData, 'handlePerson', '')
            this.$set(this.formData, 'handlePersonId', '')
            this.$set(this.formData, 'borrowPrice', '0.00')
            break
          case 'userManager':
            this.$set(this.formData, 'handlePerson', row.username)
            this.$set(this.formData, 'handlePersonId', row.id)
            getNoPaymentAmount({
              handlePersonId: row.id,
              proId: this.formData.proId
            }).then(res => {
              if (res.rel) {
                this.formData.borrowPrice = res.data
              } else {
                this.$message.warning(res.message)
              }
            })
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
        this.initProjectFormData()
        this.costTypeList = []
        if (lock) {
          this.initProjectFormData()
          this.$router.replace({
            path: `/bpmaManager/finance/cost/dailyReimbursement/id/0/detail`,
            query: proData
          })
        } else {
          this.$router.replace({
            path: `/bpmaManager/finance/cost/dailyReimbursement/id/0/${this.formData.id}`,
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
            deleteFinanceDailyExpenseMaster(this.formData.id).then(res => {
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
          this.formData.applyPrice = parseInt(String(this.applyPrice).replace(',', ''))
          this.formData.returnPrice = parseInt(String(this.returnPrice).replace(',', ''))
          this.formData.borrowPrice = parseInt(String(this.formData.borrowPrice).replace(',', ''))
          let data = {
            bpmaFinanceDailyExpenseMaster: this.formData,
            bpmaFinanceDailyExpenseDetails: this.costTypeList
          }
          reviewFinanceDailyExpenseMaster(data).then(res => {
            this.formData = res.data.bpmaFinanceDailyExpenseMaster
            this.costTypeList = res.data.bpmaFinanceDailyExpenseDetails
            if(res.data.bpmaFinanceDailyExpenseMaster.processInstanceId) {
              return this.$store.dispatch('OpenSelectUserAndHandleAudit', {
                processId: res.data.bpmaFinanceDailyExpenseMaster.processInstanceId,
                formData: res.data.bpmaFinanceDailyExpenseMaster
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
          // if (this.returnPrice > 0) return reject(this.$message.warning('报销金额不能大于核销金额'))
          let res
          this.$refs.form.validate(async valid => {
            if (!valid) {
              this.$message.warning('亲，请先完善和修正错误数据！')
              return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
            }
            if (this.costTypeList.length > 0) {
              const lock = await this.$refs.costType.validate()
              if (!lock) {
                this.$message.warning('亲，请先完善和修正错误数据！')
                return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
              }
            }
            this.formData.applyPrice = parseInt(String(this.applyPrice).replace(',', ''))
            this.formData.returnPrice = parseInt(String(this.returnPrice).replace(',', ''))
            this.formData.borrowPrice = parseInt(String(this.formData.borrowPrice).replace(',', ''))
            let data = {
              bpmaFinanceDailyExpenseMaster: this.formData,
              bpmaFinanceDailyExpenseDetails: this.costTypeList
            }
            res = await saveFinanceDailyExpenseMaster(data)
            if (!res.rel) return this.$message.warning(res.message)
            this.formData = res.data.bpmaFinanceDailyExpenseMaster
            this.costTypeList = res.data.bpmaFinanceDailyExpenseDetails
            if(!this.$refs.refBasicUpload.submitUpload(this.formData.id)) return false;
            if (lock !== true) {
              this.$message.success(res.message)
            }
            reslove()
          })
        })
      },
      formatDate(date) {
        return new Date(date).getTime()
      }
    }
  }
</script>

<style scoped>
</style>
