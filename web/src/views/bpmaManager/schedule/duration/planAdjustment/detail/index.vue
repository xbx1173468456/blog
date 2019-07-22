<template>
  <div :style="windowHeight" class="addFrom">
    <basic-handler>
      <el-button @click="initProjectFormData(), getSchedulePlanMaster()" icon="el-icon-plus" plain size="small" type="primary">新增计划调整</el-button>
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
              <basic-form-item label="项目名称" prop="proName">
                <el-input :disabled="disabled" readOnly placeholder="请选择项目名称" v-model="formData.proName" size="small">
                  <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini"
                    :disabled="disabled" slot="append"></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="调整人员" prop="handlePerson">
                <basic-input :disabled="disabled" placeholder="请输入调整人员" v-model="formData.handlePerson"></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="调整日期">
                <el-date-picker :disabled="disabled" placeholder="请选择日期" size="small" type="date"
                  v-model="formData.handleDate" value-format="timestamp">
                </el-date-picker>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="调整后开工日期">
                <el-date-picker disabled v-model="formData.changedBeginDate" value-format="timestamp" align="center"
                  size="small" type="date" placeholder="选择日期">
                </el-date-picker>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="调整后完工日期">
                <el-date-picker disabled v-model="formData.changedExpiryDate" value-format="timestamp" align="center"
                  size="small" type="date" placeholder="选择日期">
                </el-date-picker>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="调整后日历天">
                <basic-input disabled v-model="formData.changedDays" price></basic-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="调整后任务产值">
                <basic-input disabled :format="formatToThousands"
                  :formatValue="formatToMoney" type="number" placeholder="任务产值"
                  v-model="formData.changedValue" price>
                </basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="调整后累计日历天">
                <basic-input disabled placeholder="请输入调整后累计日历天"
                  v-model="formData.changedTotalDays" price>
                </basic-input>
              </basic-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <basic-form-item label="调整后累计工时天">
                <basic-input disabled placeholder="请输入调整后累计工时天"
                  v-model="formData.changedTotalWorkDays">
                </basic-input>
              </basic-form-item>
            </el-col> -->
          </el-row>
          <el-row :gutter="10" style="display: none;">
              <!-- <el-col :span="8">
                <basic-form-item label="计划单号">
                  <basic-input disabled v-model="formData.planCode" placeholder="自动生成计划单号"></basic-input>
                </basic-form-item>
              </el-col> -->
              <el-col :span="8">
                <basic-form-item label="计划单名">
                    <basic-input disabled v-model="formData.planName"></basic-input>
                  </basic-form-item>
              </el-col>
          </el-row>
          <basic-form-item label="调整原因" prop="changeReson">
            <el-input :disabled="disabled" :rows="2" placeholder="请输入调整原因" type="textarea"
              v-model="formData.changeReson"></el-input>
          </basic-form-item>
          <basic-form-item label="补充说明" prop="remark">
            <el-input :disabled="disabled" :rows="2" placeholder="请输入补充说明" type="textarea"
              v-model="formData.remark"></el-input>
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
      <update-plan
        :formData="formData"
        :disabled="disabled"
        v-model="linkData"
        @planChange="planChange"
        ref="addPlan"
        @handleValueChange="handleValueChange"
        :getSchedulePlanChangeDetail="getSchedulePlanChangeDetail"
        :getSchedulePlanDetail="getSchedulePlanMaster">
      </update-plan>
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
  import updatePlan from './updatePlan'
  import {
    deleteSchedulePlanChangeMaster,
    reviewSchedulePlanChangeMaster,
    saveSchedulePlanChangeMaster,
    postSchedulePlanMaster,
    getSchedulePlanChangeMasterDetail,
    getSchedulePlanChangeDetail,
    getSchedulePlanMaster
  } from '@/api/bpmaManager/schedule/duration/planAdjustment'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  import {
    deepCloneByObject
  } from '@/utils'
  export default {
    name: 'detail',
    mixins: [computed, methods, formatBasic],
    components: {
      dialogProject,
      updatePlan
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
          changeReson: [{ max: 200, trigger: 'change' }],
          remark: [{ max: 5000, trigger: 'change' }]
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < that.selectRow.changedBeginDate
          }
        },
        type: null,
        invoiceTypeSelectData: [],
        computeModeSelectData: [],
        visibleSyncProject: false,
        selectedRow: {},
        linkData: [],
        contractDate: null,
        planListData: []
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
      contractDate(val) {
        this.formData.contractBeginDate = new Date(val[0]).getTime()
        this.formData.contractExpiryDate = new Date(val[1]).getTime()
        this.formData.contractDays = ((this.formData.contractExpiryDate - this.formData.contractBeginDate) / 86400000 + 1) || 0
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
      }, async id => {
        if (this.$route.params.detail != 'detail') {
          await this.getSchedulePlanChangeMasterDetail(this.$route.params.detail)
        } else {
          this.initProjectFormData()
          this.getSchedulePlanMaster()
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
          name: '进度计划调整单',
          payPrice: '0.00',
          payScale: '1.00',
          totalPrice: '0.00',
          changedDays: 0,
          contractDays: 0,
          handlePerson: this.userInfo.username,
          handleDate: new Date().getTime(),
          proName: lock ? '' : name,
          proId: lock ? '' : id,
          proCode: lock ? '' : code,
          payDate: new Date().getTime()
        }
      },
      handleValueChange() {
        let sum = 0
        this.linkData.forEach(item => {
          if(item.type == 1 || item.type == 2 || item.type == 5 && item.persistStatus != 'fdel') {
            sum += Number(item.changedValue)
          }
        })
        this.formData.changedValue = this.formatToMoney(sum)
      },
      getSchedulePlanChangeMasterDetail(id) {
        return getSchedulePlanChangeMasterDetail(id).then(res => {
          if (res.data) {
            res.data.handleDate = new Date(res.data.handleDate).getTime()
            res.data.changedBeginDate = new Date(res.data.changedBeginDate).getTime()
            res.data.changedExpiryDate = new Date(res.data.changedExpiryDate).getTime()
            this.contractDate = [new Date(res.data.contractBeginDate), new Date(res.data.contractExpiryDate)]
            this.formData = res.data
            this.getSchedulePlanChangeDetail()
          } else {
            this.initProjectFormData()
          }
        })
      },
      getSchedulePlanChangeDetail() {
        getSchedulePlanChangeDetail({ page: 1, limit: 10000000, masterId: this.formData.id }).then(res => {
          res.data.rows.map(item => {
            item.beforeChangeBeginDate = new Date(item.beforeChangeBeginDate).getTime()
            item.changedBeginDate = new Date(item.changedBeginDate).getTime()
            item.beforeChangeExpiryDate = new Date(item.beforeChangeExpiryDate).getTime()
            item.changedExpiryDate = new Date(item.changedExpiryDate).getTime()
            return item
          })
          res.data.rows = this.computedTreeData(res.data.rows)
          this.linkData = res.data.rows
        })
      },
      getSchedulePlanMaster() {
        console.log(this.formData)
        getSchedulePlanMaster(this.formData.proId).then(res => {
          this.formData.planId = res.data.id
          this.formData.planName = res.data.name
          res.data.detailList = res.data.detailList.map(item => {
            const {
              changedBeginDate,
              changedExpiryDate,
              changedDays,
              changedPerson,
              changedPreTask,
              changedPreTaskId,
              changedRemark,
              changedValue,
              changedWorkDays,
              code,
              id,
              parentId,
              parentCode,
              treeId,
              level,
              name,
              type,
              ifLastLevel
            } = item
            const detail = {
              beforeChangeBeginDate: changedBeginDate ? new Date(changedBeginDate).getTime() : '',
              changedBeginDate: changedBeginDate ? new Date(changedBeginDate).getTime() : '',
              beforeChangeExpiryDate: changedExpiryDate ? new Date(changedExpiryDate).getTime() : '',
              changedExpiryDate: changedExpiryDate ? new Date(changedExpiryDate).getTime() : '',
              beforeChangePerson: changedPerson,
              changedPerson: changedPerson,
              beforeChangePreTask: changedPreTask,
              changedPreTask: changedPreTask,
              beforeChangePreTaskId: changedPreTaskId,
              changedPreTaskId: changedPreTaskId,
              beforeChangeValue: changedValue,
              changedValue: changedValue,
              beforeDays: changedDays,
              changedDays: changedDays,
              beforeRemark: changedRemark,
              changedRemark: changedRemark,
              beforeWorkDays: changedWorkDays,
              changedWorkDays: changedWorkDays,
              code,
              planDetailId: id,
              parentId,
              parentCode,
              treeId,
              level,
              name,
              type,
              ifLastLevel
            }
            return detail
          })
          this.linkData = this.computedTreeData(res.data.detailList)
          this.planChange(this.linkData)
          this.$nextTick(() => {
            this.handleValueChange()
          })
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
            this.getSchedulePlanMaster()
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
            path: `/bpmaManager/schedule/duration/planAdjustment/id/0/detail`,
            query: proData
          })
        } else {
          this.getSchedulePlanMaster()
          this.$router.replace({
            path: `/bpmaManager/schedule/duration/planAdjustment/id/0${this.formData.id}`,
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
            deleteSchedulePlanChangeMaster(this.formData.id).then(res => {
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
          let data = this.computedSaveData(this.linkData)
          data = deepCloneByObject(data)
          this.$set(this.formData, 'detailList', data)
          reviewSchedulePlanChangeMaster(this.formData).then(res => {
            if (res.rel) {
              this.isUpdate = true
              this.formData = res.data
              this.formData.handleDate = new Date(this.formData.handleDate).getTime()
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
            res = await saveSchedulePlanChangeMaster(this.formData)
            if (!res.rel) return
            this.formData = res.data
            this.formData.handleDate = new Date(this.formData.handleDate).getTime()
            this.linkData = this.computedTreeData(res.data.detailList)
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
      validatePass(rule, value, callback) {
        value = Number(value)
        if (value < 0 || value > 1) {
          callback(new Error())
        }
        callback()
      },
      planChange(data) {
        let ifLastLevelData = data.filter(item => item.type == 1 || item.type == 2 || item.type == 5)
        let changedBeginDate = ifLastLevelData.map(item => {
          if(item.persistStatus != 'fdel') {
            return item.changedBeginDate
          }
        }).sort((a, b) => b - a).filter(item => item)
        let changedExpiryDate = ifLastLevelData.map(item => {
          if(item.persistStatus != 'fdel') {
            return item.changedExpiryDate
          }
        }).sort((a, b) => a - b).filter(item => item)
        this.$set(this.formData, 'changedBeginDate', changedBeginDate[changedBeginDate.length - 1])
        this.$set(this.formData, 'changedExpiryDate', changedExpiryDate[changedExpiryDate.length - 1])
        this.$set(this.formData, 'changedDays', ((this.formData.changedExpiryDate - this.formData.changedBeginDate) / 86400000 + 1) || 0)
        let sum = 0
        let sums = 0
        let arr = this.computedSaveData(this.linkData)
        arr.forEach(item => {
          if(item.ifLastLevel == 1 && (item.type == 1 || item.type == 2 || item.type == 5) && item.persistStatus != 'fdel') {
            sum += item.changedDays
            sums += item.changedWorkDays
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
