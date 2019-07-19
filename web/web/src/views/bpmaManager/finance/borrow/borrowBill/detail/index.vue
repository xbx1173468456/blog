<template>
  <div :style="windowHeight" class="detail-container-list">
    <basic-handler>
      <el-button v-if="isUpdateAuthWorkFlow" @click="initProjectFormData" icon="el-icon-plus" plain size="small" type="primary">新增借款</el-button>
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
            <el-input :disabled="disabled" readonly placeholder="请选择项目名称" v-model="formData.proName" size="small">
              <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                         slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="借款人员" prop="handlePerson">
            <el-input :disabled="disabled" readonly placeholder="请选择借款人员" v-model="formData.handlePerson" size="small">
              <el-button @click="toipClick('userManager')" class="el-button-append" icon="el-icon-plus" size="mini" :disabled="disabled"
                         slot="append"></el-button>
            </el-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="借款日期">
            <el-date-picker :disabled="disabled" placeholder="请选择日期" size="small" type="date"
                            v-model="formData.handleDate"
                            value-format="timestamp">
            </el-date-picker>
          </basic-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="本次申请金额">
            <basic-input :disabled="disabled" :format="formatToThousands" :formatValue="formatToMoney" placeholder="请输入本次申请金额"
                       v-model="formData.applyPrice" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <basic-form-item label="本次实付金额">
            <basic-input :disabled="disabled" :format="formatToThousands" :formatValue="formatToMoney" placeholder="请输入本次实付金额"
                       v-model="formData.payPrice" price></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="支付方式" prop="payMode">
            <el-select :disabled="disabled"
                       @change="val => formData.payMode = payModeSelectData.filter(res => res.id == val)[0].name"
                       placeholder="无"
                       size="small" v-model="formData.payModeId">
              <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in payModeSelectData">
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
      <basic-form-item label="借款事由" prop="reason">
        <el-input :disabled="disabled" :maxlength="5000" :rows="textareaHeight" placeholder="请输入借款事由" type="textarea"
                  v-model="formData.reason"></el-input>
      </basic-form-item>
      <basic-form-item label="补充说明">
        <el-input :disabled="disabled" :maxlength="5000" :rows="2" placeholder="请输入补充说明" type="textarea"
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
    deleteFinanceBorrows,
    reviewFinanceBorrows,
    saveFinanceBorrows,
    postFinanaceBorrows,
    getFinanceBorrowsDetail
  } from '@/api/bpmaManager/finance/borrow/borrowBill.js'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'detail',
    mixins: [computed, methods, formatBasic],
    components: {

      dialogProject,
      dialogUserManager
    },
    data() {
      let that = this
      return {
        formData: {},
        rules: {
          handlePerson: [{ required: true, trigger: 'change' }],
          name: [{ required: true, trigger: 'change' }],
          proName: [{ required: true, trigger: 'change' }],
          validateStatus: [{ required: true, trigger: 'change' }],
          reason: [{ required: true, trigger: 'change' }],
          payMode: [{ required: true, trigger: 'change' }]
        },
        type: null,
        payModeSelectData: [],
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
        return parseInt(((this.$store.state.app.screenHeight - 133) - 45 * 8) / 25)
      },
      userInfo() {
        return this.$store.state.user.login
      }
    },
    async created() {
      this.$store.dispatch("cacheId", '0')
      this.getEnumData(['GetAuditStatusEnum', 'GetIsOrNotData', 'GetGenderData'])
      const payModeSelectData = await getDictionaryDataByTypeFilter('BPMA_PAY_MODE')
      this.payModeSelectData = payModeSelectData.data
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.initProjectFormData()
      }, async id => {
        if (this.$route.params.detail != 'detail') {
          await this.getFinanceBorrowsDetail(this.$route.params.detail)
        } else {
          this.initProjectFormData()
        }
        if (!this.formData.handleDate) {
          this.$set(this.formData, 'handleDate', new Date().getTime())
        } else {
          this.formData.handleDate = new Date(this.formData.handleDate).getTime()
        }
      })
      this.$store.dispatch("cacheId", undefined);
    },
    methods: {
      initProjectFormData(lock) {
        const { id, code, name } = this.$route.query
        this.formData = {
          validateStatus: 2,
          payPrice: '0.00',
          applyPrice: '0.00',
          name: '借款单',
          proName: name,
          handlePerson: this.userInfo.username,
          handlePersonId: this.userInfo.id,
          proId: id,
          proCode: code,
          payDate: new Date().getTime()
        }
      },
      getFinanceBorrowsDetail(id) {
        return getFinanceBorrowsDetail(id).then(res => {
          if (res.data) {
            this.formData = res.data
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
            break
          case 'userManager':
            this.$set(this.formData, 'handlePerson', row.username)
            this.$set(this.formData, 'handlePersonId', row.id)
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
          this.initProjectFormData()
          this.$router.replace({
            path: `/bpmaManager/finance/borrow/borrowBill/id/0/detail`,
            query: proData
          })
        } else {
          this.$router.replace({
            path: `/bpmaManager/finance/borrow/borrowBill/id/0/${this.formData.id}`,
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
            deleteFinanceBorrows(this.formData.id).then(res => {
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
          reviewFinanceBorrows(this.formData).then(res => {
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
              res = await postFinanaceBorrows(this.formData)
            } else {
              res = await saveFinanceBorrows(this.formData)
            }
            if (!res.rel) return
            this.formData = res.data
            if(!this.$refs.refBasicUpload.submitUpload(this.formData.id)) return false;
            this.formData.handleDate = new Date(this.formData.handleDate).getTime()
            this
            this.formData = res.data
            if (lock !== true) {
              this.$message.success(res.message)
            }
            this.$nextTick(() => {
              reslove()
            })
          })
        })
      }
    }
  }
</script>

<style scoped>
</style>
