<template>
  <div :style="windowHeight" class="detail-container-list">
    <basic-handler>
      <el-button @click="initFormData(true)" icon="el-icon-plus" plain size="small" type="primary">新增预算</el-button>
      <el-button :disabled="disabled" @click="save" icon="el-icon-if-save" plain size="small" type="primary">保存
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
              <basic-form-item label="单据名称" prop="name">
                <basic-input :disabled="disabled" placeholder="请输入单据名称" v-model="formData.name"></basic-input>
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
              <basic-form-item label="编制人员">
                <basic-input :disabled="disabled" v-model="formData.handlePerson" placeholder="请输入编制人员"></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="预算金额">
                <basic-input :format="formatToThousands" disabled :formatValue="formatToMoney" placeholder="请输入预算金额"
                  v-model="formData.budgetPrice" price></basic-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="是否变更" class="add-border">
                <el-radio-group v-model="formData.ifChange" border :disabled="disabled" @change="handleRadioChange">
                  <el-radio v-for="item in dataEnum.isOrNot" :label="Number(item.code)" :key="item.code"> {{item.name}}</el-radio>
                </el-radio-group>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="变更类型" prop="changeType">
                <el-select v-model="formData.changeType" placeholder="请选择" size="small" :disabled="disabled || formData.ifChange == 2" @change="handleSelectChange">
                  <el-option
                    v-for="item in dataEnum.ifchange"
                    :key="item.code"
                    :label="item.name"
                    :value="Number(item.code)">
                  </el-option>
                </el-select>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="原始单据号" prop="formCode">
                <el-input :disabled="disabled || formData.ifChange == 2 || (formData.changeType != 1 && formData.changeType != 2)" readOnly placeholder="请选择单据号" v-model="formData.formCode" size="small">
                  <el-button @click="toipClick(formData.changeType == 1 ? 'contractChange' : 'visaRegistration')" class="el-button-append" icon="el-icon-plus" size="mini"
                  :disabled="disabled || formData.ifChange == 2 || (formData.changeType != 1 && formData.changeType != 2)" slot="append"></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <basic-form-item label="预算说明">
            <el-input :disabled="disabled" :rows="2" placeholder="请输入预算说明" type="textarea"
              v-model="formData.budgetExplain"></el-input>
          </basic-form-item>
          <basic-form-item label="变更说明">
            <el-input :disabled="disabled" :rows="2" placeholder="请输入变更说明" type="textarea"
              v-model="formData.changeExplain"></el-input>
          </basic-form-item>
          <basic-form-item label="文档附件" class="add-border file">
            <basic-upload ref="refBasicUpload" :formId="formData.id" :disabled="disabled">
            </basic-upload>
          </basic-form-item>
          <el-row :gutter="10">
            <el-col :span="16">
              <basic-form-item label="登记人员">
                <basic-input disabled placeholder="自动生成登记人员" v-model="formData.inputPerson"></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="登记时间">
                <basic-input disabled placeholder="自动生成登记时间" v-model="formData.inputTime"></basic-input>
              </basic-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-row>
      <cost-type :disabled="disabled" :parentDatas="formData" ref="costType" v-model="costTypeList" @change="costTypeInput"></cost-type>
    </el-row>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncContractChange" title="合同变更-选择">
      <dialog-contract-change @selectionChange="selectionChange" filterValid v-if="visibleSyncContractChange" :proId="formData.proId"></dialog-contract-change>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncContractChange = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncVisaRegistration" title="签证资料-选择">
      <dialog-visa-registration @selectionChange="selectionChange" filterValid v-if="visibleSyncVisaRegistration" :proId="formData.proId"></dialog-visa-registration>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncVisaRegistration = false">取 消</el-button>
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
  import dialogContractChange from '@/views/components/dialog/dialogContractChange'
  import dialogVisaRegistration from '@/views/components/dialog/dialogVisaRegistration'
  import {
    deleteMaterialBudgetMaster,
    reviewMaterialBudgetMaster,
    saveMaterialBudgetMaster,
    getMasterAndDetail,
    getMaterialBudgetMasterDetail
  } from '@/api/bpmaManager/goods/goodsBudget/budgetRegister'
  import costType from './costType.vue'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'detail',
    mixins: [computed, methods, formatBasic],
    components: {
      dialogProject,
      dialogContractChange,
      dialogVisaRegistration,
      costType
    },
    data() {
      let that = this
      return {
        formData: (this.$route.query.formData && JSON.parse(this.$route.query.formData)) || {
          validateStatus: 2
        },
        isUpdate: true,
        activeNames: ['1'],
        rules: {
          contractName: [{ required: true, trigger: 'change', min: 2 }],
          name: [{ required: true, trigger: 'change', min: 2 }],
          handlePerson: [{ required: true, trigger: 'change', min: 2 }],
          proName: [{ required: true, trigger: 'change', min: 2 }],
          validateStatus: [{ required: true, trigger: 'change' }],
          changeType: [{ validator: that.validatePass, trigger: 'change' }],
          formCode: [{ validator: that.validatePass1, trigger: 'change' }]
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
        visibleSyncContractChange: false,
        visibleSyncVisaRegistration: false,
        selectedRow: {},
        selectChangeType: [
          {
            id: 1,
            name: ''
          }
        ]
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
        return parseInt(((this.$store.state.app.screenHeight - 133) - 45 * 9) / 25)
      },
      applyPrice: {
        get() {
          let sum = 0
          this.costTypeList.forEach(item => {
            sum += Number(item.price)
          })
          this.formData.applyPrice = sum
          return sum
        },
        set() {
        }
      },
      returnPrice: {
        get() {
          // const cancelPrice = String(this.formData.cancelPrice).replace(',', '')
          // const applyPrice = String(this.applyPrice).replace(',', '')
          // this.formData.returnPrice = cancelPrice - applyPrice
          // return cancelPrice - applyPrice
        },
        set() {
        }
      }
    },
    watch: {
      formData: {
        handler() {
          this.isUpdate = false
        },
        deep: true
      },
      costTypeList: {
        handler() {
          this.isUpdate = false
        },
        deep: true
      }
    },
    async created() {
      this.$store.dispatch("cacheId", '0')
      this.getEnumData(['GetValidateStatusData', 'GetIsOrNotData', 'GetIfChange'])
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.initProjectFormData()
        this.$store.dispatch("cacheId", false);
      }, async id => {
        if (this.$route.params.detail != 'detail') {
          await this.getMaterialBudgetMasterDetail(this.$route.params.detail)
        } else {
          this.initProjectFormData()
        }
      })
    },
    methods: {
      initProjectFormData() {
        const { id, code, name } = this.$route.query
        this.formData = {
          validateStatus: 2,
          name: '物资预算表',
          budgetPrice: '0.00',
          ifChange: 2,
          handlePerson: this.$store.state.user.login.username,
          proName: name,
          proId: id,
          proCode: code,
          persistStatus: 'nrm'
        }
      },
      getMaterialBudgetMasterDetail(id) {
        return getMaterialBudgetMasterDetail(id).then(res => {
          if (res.data) {
            this.formData = res.data
            this.$nextTick(() => {
              this.isUpdate = true
            })
            getMasterAndDetail(this.$route.params.detail).then(res => {
              this.costTypeList = res.data.bpmaMaterialBudgetDetails || []
              this.$nextTick(() => {
                this.isUpdate = true
              })
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
            this.$set(this.formData, 'formCode', '')
            this.$set(this.formData, 'formId', '')
            break
          case 'contractChange':
            this.$set(this.formData, 'formCode', row.code)
            this.$set(this.formData, 'formId', row.id)
            break
          case 'visaRegistration':
            this.$set(this.formData, 'formCode', row.code)
            this.$set(this.formData, 'formId', row.id)
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
        this.initProjectFormData()
        this.costTypeList = []
        if (lock) {
          this.initProjectFormData()
          this.$router.replace({
            path: `/bpmaManager/goods/goodsBudget/BudgetRegister/id/0/detail`,
            query: proData
          })
        } else {
          this.$router.replace({
            path: `/bpmaManager/goods/goodsBudget/BudgetRegister/id/0/${this.formData.id}`,
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
            deleteMaterialBudgetMaster(this.formData.id).then(res => {
              if (res.rel) {
                this.$message.success(res.message)
                this.initProjectFormData()
                this.costTypeList = []
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
          reviewMaterialBudgetMaster(this.formData).then(res => {
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
          // if (this.returnPrice > 0) return reject(this.$message.warning('报销金额不能大于核销金额'))
          let res
          this.$refs.form.validate(async valid => {
            if (!valid) {
              this.$message.warning('亲，请先完善和修正错误数据！')
              return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
            }
            if (this.costTypeList.length > 0) {
              const lock = await this.$refs.costType.validate()
              if(!lock) {
                this.$message.warning('亲，请先完善和修正错误数据！')
                return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
              }
            }
            let data = {
              bpmaMaterialBudgetMaster: this.formData,
              bpmaMaterialBudgetDetails: this.costTypeList
            }
            res = await saveMaterialBudgetMaster(data)
            if (!res.rel) return this.$message.warning(res.message)
            this.formData = res.data.bpmaMaterialBudgetMaster
            this.costTypeList = res.data.bpmaMaterialBudgetDetails
            if (!this.$refs.refBasicUpload.submitUpload(this.formData.id)) return false;
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
      formatDate(date) {
        return new Date(date).getTime()
      },
      costTypeInput(val) {
        let sum = 0
        val.forEach(item => {
          sum += Number(item.totalPrice)
        })
        this.formData.budgetPrice = sum
      },
      validatePass(rule, value, callback) {
        if(this.formData.ifChange == 1 && !value) {
          callback(new Error())
        }
        callback()
      },
      validatePass1(rule, value, callback) {
        if(this.formData.changeType == 1 || this.formData.changeType == 2) {
          if(!value) {
            callback(new Error())
          }
        }
        callback()
      },
      handleRadioChange() {
        this.$set(this.formData, 'changeType', '')
        this.$set(this.formData, 'formCode', '')
        this.$set(this.formData, 'formId', '')
        this.costTypeList = this.costTypeList.map(item => {
          if(item.sum < 0) item.sum = 0
          return item
        })
      },
      handleSelectChange() {
        this.$set(this.formData, 'formCode', '')
        this.$set(this.formData, 'formId', '')
      }
    }
  }
</script>

<style scoped>
</style>
