<template>
  <div class="addFrom">
    <basic-handler>
      <el-button @click="initProjectFormData" icon="el-icon-plus" plain size="small" type="primary">新增变更单</el-button>
      <el-button :disabled="disabled" @click="save" icon="el-icon-if-save" plain size="small" type="primary">保存
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
          <basic-form-item label="单据编号">
            <basic-input disabled placeholder="自动生成单据编号" v-model="formData.code"></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="变更名称" prop="name">
            <basic-input :disabled="disabled" placeholder="请输入变更名称" v-model="formData.name"></basic-input>
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
          <basic-form-item label="原变更单号" prop="orignalCode">
            <basic-input :disabled="disabled" placeholder="请输入原变更单号" v-model="formData.orignalCode"></basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="变更日期">
            <el-date-picker size="small" :disabled="disabled" placeholder="请选择日期" type="date" v-model="formData.handleDate"
                            value-format="timestamp">
            </el-date-picker>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="经办人员" prop="handlePerson">
            <basic-input :disabled="disabled" placeholder="请输入经办人员" v-model="formData.handlePerson"></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="变更金额">
            <basic-input :disabled="disabled" :format="formatToThousands" :formatValue="formatToMoney" placeholder="请输入变更金额"
                       v-model="formData.price" price></basic-input>
          </basic-form-item>
        </el-col>
      </el-row>
      <basic-form-item label="变更原因" prop="reason">
        <el-input :rows="2" :disabled="disabled" :maxlength="5000" placeholder="请输入变更原因" type="textarea"
                  v-model="formData.reason"></el-input>
      </basic-form-item>
      <basic-form-item label="变更内容" prop="content">
        <el-input :rows="textareaHeight" :disabled="disabled" :maxlength="5000" placeholder="请输入变更内容" type="textarea"
                  v-model="formData.content"></el-input>
      </basic-form-item>
      <basic-form-item label="变更影响" prop="effect">
        <el-input :rows="2" :disabled="disabled" :maxlength="5000" placeholder="请输入变更影响" type="textarea"
                  v-model="formData.effect"></el-input>
      </basic-form-item>
      <basic-form-item label="补充说明" prop="remark">
        <el-input :rows="2" :disabled="disabled" :maxlength="5000" placeholder="请输入补充说明" type="textarea"
                  v-model="formData.remark"></el-input>
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
      </basic-form-item>
    </el-form>
    <basic-dialog v-el-drag-dialog title="项目名称-选择" :visible.sync="visibleSyncProject" >
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog title="合同-选择" :visible.sync="visibleSyncContract" >
      <dialog-my-contract @selectionChange="selectionChange" filterValid v-if="visibleSyncContract"
                          :proId="formData.proId"></dialog-my-contract>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogMyContract from '@/views/components/dialog/dialogMyContract'
  import {
    deleteChange,
    reviewDoc,
    saveChange,
    postChange,
    getContractReviewsDetail
  } from '@/api/bpmaManager/early/undertakeContract/change.js'
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'contractDetails',
    mixins: [computed, methods, formatBasic],
    components: {
      dialogProject,
      dialogMyContract
    },
    data() {
      return {
        formData: (this.$route.query.formData && JSON.parse(window.decodeURI(this.$route.query.formData))) || {
          validateStatus: 2,
          handleDate: new Date().getTime()
        },
        isUpdate: true,
        rules: {
          name: [{ required: true, trigger: 'change', max: 100 }],
          proName: [{ required: true, trigger: 'change' }],
          validateStatus: [{ required: true, trigger: 'change' }],
          contractName: [{ required: true, trigger: 'change' }],
          content: [{ required: true, trigger: 'change', max: 1024 }],
          orignalCode: [{ max: 50, trigger: 'change' }],
          handlePerson: [{ max: 50, trigger: 'change' }],
          reason: [{ max: 1024, trigger: 'change' }],
          effect: [{ max: 1024, trigger: 'change' }],
          remark: [{ max: 5000, trigger: 'change' }]
        },
        type: null,
        error: {
          name: '',
          proName: '',
          contractName: '',
          content: ''
        },
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
      afterTaxAmount() {
        let money = Number(this.formData.beforeTaxPrice)
        let invrate = Number(this.formData.invoiceTaxRate)
        return isNaN(money / ((1 + invrate) * invrate)) ? '0.00' : (money / ((1 + invrate) * invrate)).toFixed(2)
      },
      taxMoney() {
        let money = Number(this.formData.beforeTaxPrice)
        return isNaN(money * this.afterTaxAmount) ? '0.00' : (money - this.afterTaxAmount).toFixed(2)
      },
      textareaHeight() {
        return parseInt(((this.$store.state.app.screenHeight - 133) - 45 * 12) / 25)
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
      this.getEnumData(['GetValidateStatusData'])
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.initProjectFormData()
      }, async id => {
        if (this.$route.params.detail != 'detail') {
          await this.getContractReviewsDetail(this.$route.params.detail)
        } else {
          this.initProjectFormData()
        }
        this.format(this.formData.handleDate || new Date())
      })
      this.$store.dispatch("cacheId", undefined);
    },
    methods: {
      initProjectFormData(lock) {
        const { id, code, name } = this.$route.query
        this.formData = {
          validateStatus: 2,
          handleDate: new Date().getTime(),
          price: '0.00',
          proName: lock ? '' : name,
          proId: lock ? '' : id,
          proCode: lock ? '' : code
        }
      },
      getContractReviewsDetail(id) {
        return getContractReviewsDetail(id).then(res => {
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
          this.$router.replace({
            path: `/bpmaManager/early/undertakeContract/change/detail`,
            query: proData
          })
        } else {
          this.$router.replace({
            path: `/bpmaManager/early/undertakeContract/change/${this.formData.id}`,
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
            deleteChange(this.formData.id).then(res => {
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
          reviewDoc(this.formData).then(res => {
            if (res.rel) {
              this.isUpdate = true
              this.formData = res.data
              this.formData.handleDate = new Date(this.formData.handleDate).getTime()
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
              res = await postChange(this.formData)
            } else {
              res = await saveChange(this.formData)
            }
            if (!res.rel) return
            this.handleSave(res, lock)
            reslove(res)
          })
        })
      },
      handleSave(res, lock) {
        this.formData = res.data
        if(!this.$refs.refBasicUpload.submitUpload(this.formData.id)) return false;
        this.format(this.formData.handleDate)
        if (lock !== true) {
          this.$message.success(res.message)
        }
        this.$nextTick(() => {
          this.isUpdate = true
        })
      },
      format(date) {
        this.formData.handleDate = new Date(date).getTime()
      },
      formatData(val) {
        return this.dataEnum.validateStatus.filter(item => {
          item.code == val
        })[0].name
      }
    }
  }
</script>

<style scoped>
</style>
