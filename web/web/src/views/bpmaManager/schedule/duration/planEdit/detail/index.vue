<template>
  <div :style="windowHeight" class="addFrom">
    <basic-handler>
      <el-button @click="initProjectFormData" icon="el-icon-plus" plain size="small" type="primary">新增计划编审</el-button>
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
              <basic-form-item label="编制人员" prop="handlePerson">
                <basic-input :disabled="disabled" placeholder="请输入编制人员" v-model="formData.handlePerson"></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="编制日期">
                <el-date-picker :disabled="disabled" placeholder="请选择日期" size="small" type="date"
                  v-model="formData.handleDate" value-format="timestamp">
                </el-date-picker>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="合同开工日期">
                <el-date-picker :disabled="disabled" placeholder="请选择日期" size="small" type="date"
                  v-model="formData.contractBeginDate" value-format="timestamp" @change="handleContractDateChange">
                </el-date-picker>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="合同完工日期">
                <el-date-picker :disabled="disabled || !formData.contractBeginDate" :picker-options="pickerOptions"
                  placeholder="请选择日期" size="small" type="date" v-model="formData.contractExpiryDate"
                  value-format="timestamp" @change="handleContractDateChange">
                </el-date-picker>
              </basic-form-item>
            </el-col>
            <!-- <el-col :span="16">
              <basic-form-item label="合同日期">
                <el-date-picker
                  v-model="contractDate"
                  :disabled="disabled"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </basic-form-item>
            </el-col> -->
            <el-col :span="8">
              <basic-form-item label="合同日历天">
                <basic-input disabled v-model="formData.contractDays" price></basic-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="计划开始日期">
                <el-date-picker disabled v-model="formData.planBeginDate" value-format="timestamp" align="center"
                  size="small" type="date" placeholder="选择日期">
                </el-date-picker>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="计划结束日期">
                <el-date-picker disabled v-model="formData.planExpiryDate" value-format="timestamp" align="center"
                  size="small" type="date" placeholder="选择日期">
                </el-date-picker>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="计划日历天">
                <basic-input disabled v-model="formData.planDays" price></basic-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="任务产值">
                <basic-input disabled :format="formatToThousands"
                  :formatValue="formatToMoney" type="number" placeholder="任务产值"
                  v-model="formData.changedValue" price>
                </basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="累计日历天">
                <basic-input disabled placeholder="请输入累计日历天"
                  v-model="formData.changedTotalDays" price>
                </basic-input>
              </basic-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <basic-form-item label="累计工时天">
                <basic-input disabled placeholder="请输入累计工时天"
                  v-model="formData.changedTotalWorkDays">
                </basic-input>
              </basic-form-item>
            </el-col> -->
          </el-row>
          <basic-form-item label="补充说明" prop="remark">
            <el-input :disabled="disabled" :rows="2" placeholder="请输入补充说明" type="textarea" v-model="formData.remark">
            </el-input>
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
      <add-plan :formData="formData" :disabled="disabled" v-model="linkData" @planChange="planChange" ref="addPlan"
        @handleValueChange="handleValueChange" :getSchedulePlanDetail="getSchedulePlanDetail" :save="save">
      </add-plan>
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
  import addPlan from './addPlan'
  import {
    deleteSchedulePlanMaster,
    reviewSchedulePlanMaster,
    saveSchedulePlanMaster,
    postSchedulePlanMaster,
    getSchedulePlanMasterDetail,
    getSchedulePlanDetail
  } from '@/api/bpmaManager/schedule/duration/planEdit'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  import {
    deepCloneByObject
  } from '@/utils'
  export default {
    name: 'detail',
    mixins: [computed, methods, formatBasic],
    components: {
      dialogProject,
      addPlan
    },
    data() {
      let that = this
      return {
        formData: {},
        isUpdate: true,
        activeNames: ['1'],
        rules: {
          contractName: [{ required: true, trigger: 'change', min: 2 }],
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
        selectedRow: {},
        linkData: [],
        contractDate: null,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < that.formData.contractBeginDate
          }
        },
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
      linkData: {
        handler() {
          this.isUpdate = false
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
        this.linkData = []
      }, async id => {
        if (this.$route.params.detail != 'detail') {
          await this.getSchedulePlanMasterDetail(this.$route.params.detail)
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
          name: '进度计划编审单',
          payPrice: '0.00',
          payScale: '1.00',
          totalPrice: '0.00',
          changedValue: '0.00',
          planDays: 0,
          contractDays: 0,
          proName: name,
          proId: id,
          proCode: code,
          payDate: new Date().getTime(),
          handlePerson: this.userInfo.username,
          handleDate: new Date().getTime(),
        }
        this.linkData = []
      },
      handleValueChange() {
        let sum = 0
        this.linkData.forEach(item => {
          if(item.persistStatus != 'fdel') {
            sum += Number(item.planValue)
          }
        })
        this.formData.changedValue = this.formatToMoney(sum)
      },
      getSchedulePlanMasterDetail(id) {
        return getSchedulePlanMasterDetail(id).then(res => {
          if (res.data) {
            res.data.handleDate = res.data.handleDate ? new Date(res.data.handleDate).getTime() : ''
            res.data.planBeginDate = res.data.planBeginDate ? new Date(res.data.planBeginDate).getTime() : ''
            res.data.planExpiryDate = res.data.planExpiryDate ? new Date(res.data.planExpiryDate).getTime() : ''
            res.data.contractBeginDate = res.data.contractBeginDate ? new Date(res.data.contractBeginDate).getTime() : ''
            res.data.contractExpiryDate = res.data.contractExpiryDate ? new Date(res.data.contractExpiryDate).getTime() : ''
            this.formData = res.data
            this.getSchedulePlanDetail()
          } else {
            this.initProjectFormData()
          }
        })
      },
      getSchedulePlanDetail() {
        getSchedulePlanDetail({ masterId: this.formData.id }).then(res => {
          res.data = this.computedTreeData(res.data)
          this.linkData = res.data
        })
      },
      computedTreeData(data) {
        let arr = []
        data.forEach(item => {
          if (item.parentId == '-1') arr.push(item)
          else {
            data.some(res => {
              if (res.code == item.parentCode) {
                Array.isArray(res.children) ? res.children.push(item) : this.$set(res, 'children', [item])
                return res.children = res.children.sort((a, b) => a.code - b.code)
              }
            })
          }
        })
        arr = arr.sort((a, b) => a.code - b.code)
        return arr
      },
      handleContractDateChange() {
        if (!this.formData.contractExpiryDate || !this.formData.contractBeginDate) return this.formData.contractDays = 0
        this.formData.contractDays = ((this.formData.contractExpiryDate - this.formData.contractBeginDate) / 86400000 + 1) || 0
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
            this.$set(this.formData, 'proId', row.id)
            this.$set(this.formData, 'proName', row.name)
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
          this.$router.replace({
            path: `/bpmaManager/schedule/duration/planEdit/id/0/detail`,
            query: proData
          })
        } else {
          this.initProjectFormData()
          this.$router.replace({
            path: `/bpmaManager/schedule/duration/planEdit/id/0/${this.formData.id}`,
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
            deleteSchedulePlanMaster(this.formData.id).then(res => {
              if (res.rel) {
                this.$message.success(res.message)
                this.linkData = []
                this.initProjectFormData()
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
          let data = this.computedSaveData(this.linkData)
          data = deepCloneByObject(data)
          this.$set(this.formData, 'detailList', data)
          reviewSchedulePlanMaster(this.formData).then(res => {
            if (res.rel) {
              this.isUpdate = true
              this.formData = res.data
              this.formData.date = this.formData.date ? new Date(this.formData.date).getTime() : ''
              this.formData.handleDate = this.formData.handleDate ? new Date(this.formData.handleDate).getTime() : ''
              this.formData.planBeginDate = this.formData.planBeginDate ? new Date(this.formData.planBeginDate).getTime() : ''
              this.formData.planExpiryDate = this.formData.planExpiryDate ? new Date(this.formData.planExpiryDate).getTime() : ''
              this.formData.contractBeginDate = this.formData.contractBeginDate ? new Date(this.formData.contractBeginDate).getTime() : ''
              this.formData.contractExpiryDate = this.formData.contractExpiryDate ? new Date(this.formData.contractExpiryDate).getTime() : ''
              this.linkData = this.computedTreeData(res.data.detailList)
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
            let data = this.computedSaveData(this.linkData)
            data = deepCloneByObject(data)
            this.$set(this.formData, 'detailList', data)
            res = await postSchedulePlanMaster(this.formData)
            if (!res.rel) return
            this.formData = res.data
            this.formData.date = this.formData.date ? new Date(this.formData.date).getTime() : ''
            this.formData.handleDate = this.formData.handleDate ? new Date(this.formData.handleDate).getTime() : ''
            this.formData.planBeginDate = this.formData.planBeginDate ? new Date(this.formData.planBeginDate).getTime() : ''
            this.formData.planExpiryDate = this.formData.planExpiryDate ? new Date(this.formData.planExpiryDate).getTime() : ''
            this.formData.contractBeginDate = this.formData.contractBeginDate ? new Date(this.formData.contractBeginDate).getTime() : ''
            this.formData.contractExpiryDate = this.formData.contractExpiryDate ? new Date(this.formData.contractExpiryDate).getTime() : ''
            this.linkData = this.computedTreeData(res.data.detailList)
            if (!this.$refs.refBasicUpload.submitUpload(this.formData.id)) return false;
            delete this.formData.detailList
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
        let planBeginDate = data.map(item => {
          if(item.persistStatus != 'fdel') {
            return item.planBeginDate
          }
        }).sort((a, b) => b - a).filter(item => item)
        let planExpiryDate = data.map(item => {
          if(item.persistStatus != 'fdel') {
            return item.planExpiryDate
          }
        }).sort((a, b) => a - b).filter(item => item)
        this.$set(this.formData, 'planBeginDate', planBeginDate[planBeginDate.length - 1])
        this.$set(this.formData, 'planExpiryDate', planExpiryDate[planExpiryDate.length - 1])
        this.$set(this.formData, 'planDays', ((this.formData.planExpiryDate - this.formData.planBeginDate) / 86400000 + 1) || 0)
        let sum = 0
        let sums = 0
        let arr = this.computedSaveData(data)
        arr.forEach(item => {
          if (item.ifLastLevel == 1 && item.persistStatus != 'fdel') {
            sum += item.planDays
            sums += item.playWorkDays
          }
        })
        this.$set(this.formData, 'changedTotalDays', sum)
        this.$set(this.formData, 'changedTotalWorkDays', sums)
      },
      computedSaveData(data) {
        let arr = []
        data.forEach(item => {
          if (item.children && item.children.length > 0) {
            arr = arr.concat(this.computedSaveData((item.children)))
          }
          if (item.tree_parent) {
            this.$set(item, 'parentId', item.tree_parent.id)
            this.$set(item, 'parentCode', item.tree_parent.code)
          }
          arr.push(item)
        })
        return arr
      }
    }
  }
</script>

<style scoped>
</style>
