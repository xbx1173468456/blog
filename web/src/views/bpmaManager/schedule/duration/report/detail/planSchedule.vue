<template>
  <div class="content-container">
    <basic-handler>
      <el-button :disabled="disabled" @click="visibleSync = true, rowList = []" icon="el-icon-plus" plain size="small" type="primary">引入进度报告</el-button>
      <el-button :disabled="disabled || Object.keys(selectedRow).length == 0" @click="deleteData" icon="el-icon-delete" plain size="small"
        type="danger">删除</el-button>
    </basic-handler>
    <el-table :data="showData" highlight-current-row border stripe :height="286" ref="refBudgetDataTableTree" @row-click="rowClick">
      <el-table-column label="序号" type="index" width="60"></el-table-column>
      <el-table-column header-align="center" label="任务编码" prop="code" width="140" show-overflow-tooltip></el-table-column>
      <el-table-column header-align="center" label="任务名称" prop="name" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column header-align="center" align="right" label="应完成比例" prop="shouldFinishScale" :formatter="formatToMoney" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column header-align="center" align="right" label="应完成产值" prop="shouldFinishValue" :formatter="formatToThousands" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column header-align="center" align="right" label="累计完成比例" width="110" class-name="spacing-set">
        <template slot-scope="scope">
          <el-form :model="data[scope.$index]" :rules="rules" :show-message="false" :ref="'formTotalFinishScale' + scope.$index">
            <el-form-item prop="totalFinishScale">
              <basic-input :disabled="disabled" v-model="scope.row.totalFinishScale" :formatValue="formatToMoney" type="number" price></basic-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="累计完成产值" width="130" class-name="spacing-set">
        <template slot-scope="scope">
          <basic-input :disabled="disabled" v-model="scope.row.totalFinishValue" :format="formatToThousands" :formatValue="formatToMoney" type="number" price></basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="形象进度说明" width="220" class-name="spacing-set">
        <template slot-scope="scope">
          <basic-input :disabled="disabled" v-model="scope.row.scheduleSummary" :maxlength="500"></basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="形象进度图片" width="110" class-name="spacing-set">
        <template slot-scope="scope">
          <basic-upload-files
            :id="scope.row.id"
            :disabled="disabled"
            :beforeClick="beforeClick"
            @uploadSuccess="uploadSuccess"
            @close="handlClose"
            :size="22"
            :formData="scope.row"
            :data="scope.row.scheduleImage">
          </basic-upload-files>
          <!-- <basic-input :disabled="disabled" v-model="scope.row.scheduleImage"></basic-input> -->
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="备注" class-name="spacing-set">
        <template slot-scope="scope">
          <basic-input :disabled="disabled" v-model="scope.row.remark"></basic-input>
        </template>
      </el-table-column>
    </el-table>
    <pagination :limit.sync="modelSearchFilter.limit" :page.sync="modelSearchFilter.page" :total="total"
      @pagination="getGoodslist" />
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSync" title="项目计划-选择" >
      <dialog-plan-schedule
        @selectionChange="selectionChange"
        filterValid
        isShowChecked
        :formData="data"
        :proId="formData.proId"
        v-if="visibleSync">
      </dialog-plan-schedule>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSync = false">取 消</el-button>
        <el-button @click="clickOk" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
import formatBasic from '@/utils/mixins/formatBasic.js'
import dialogPlanSchedule from '@/views/components/dialog/dialogPlanSchedule'
import {deleteScheduleReportDetail} from '@/api/bpmaManager/schedule/duration/report'
import pagination from '@/components/Pagination'
export default {
  name: 'planSchedule',
  mixins: [formatBasic],
  components: {
    dialogPlanSchedule,
    pagination
  },
  data() {
    const that = this
    return {
      data: [],
      modelSearchFilter: {
        page: 1,
        limit: 100000000
      },
      visibleSync: false,
      isShowChecked: false,
      rowList: [],
      rules: {
        totalFinishScale: [{ validator: that.validatePass, trigger: 'change' }]
      },
      selectedRow: {}
    }
  },
  props: {
    disabled: Boolean,
    formData: Object,
    value: Array,
    total: Number,
    getScheduleReportDetail: Function
  },
  watch: {
    data: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    },
    value: {
      handler(val) {
        this.data = val
      },
      deep: true
    }
  },
  computed: {
    showData() {
      return this.data.filter(item => item.persistStatus != 'fdel')
    }
  },
  methods: {
    selectionChange(rowList) {
      this.rowList = rowList.selectedRows
    },
    rowClick(row) {
      this.selectedRow = row
    },
    getGoodslist() {
      if (!this.formData.id) return this.data = []
      this.getScheduleReportDetail()
    },
    clickOk() {
      const scroll = this.$refs.refBudgetDataTableTree.$el.querySelector('.el-table__body-wrapper')
      const {scrollLeft, scrollTop} = scroll
      this.rowList.forEach(item => {
        const { code, name, id, changedBeginDate, changedDays, changedValue, changedExpiryDate } = item
        const nowDate = new Date()
        nowDate.setHours(23)
        nowDate.setMinutes(59)
        nowDate.setSeconds(59)
        nowDate.setMilliseconds(999)
        let dateDiff
        let shouldFinishScale
        if (nowDate - new Date(changedExpiryDate).getTime() > 0) dateDiff = changedDays
        else dateDiff = (nowDate.getTime() - new Date(changedBeginDate).getTime()) / 86400000
        if (changedDays == 0) shouldFinishScale = 1
        else shouldFinishScale = dateDiff / changedDays
        shouldFinishScale = shouldFinishScale < 0 ? 0 : shouldFinishScale
        shouldFinishScale = shouldFinishScale > 1 ? 1 : shouldFinishScale
        this.data.unshift({
          code,
          name,
          planDetailId: id,
          shouldFinishScale,
          shouldFinishValue: changedDays == 0 ? 0 : shouldFinishScale * changedValue,
          totalFinishScale: '0.00',
          totalFinishValue: '0.00',
          masterId: this.formData.id
        })
      })
      this.visibleSync = false
      this.$nextTick(() => {
        scroll.scrollTo(scrollLeft, scrollTop)
      })
    },
    deleteData() {
      this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async res => {
        if (this.selectedRow.id) {
          // await deleteScheduleReportDetail(this.selectedRow.id)
          this.selectedRow.persistStatus = 'fdel'
        } else {
          this.data = this.data.filter(item => item != this.selectedRow)
        }
        this.selectedRow = []
      })
    },
    validatePass(rule, value, callback) {
      value = Number(value)
      if (value < 0 || value > 1) {
        callback(new Error())
      }
      callback()
    },
    validate() {
      return new Promise((reslove, reject) => {
        if (this.showData.length == 0) reslove(true)
        this.showData.forEach((item, idx) => {
          this.$refs[`formTotalFinishScale${idx}`].validate(valid => {
            if (!valid) reslove(false)
          })
          reslove(true)
        })
      })
    },
    handlClose({url, index, formData}) {
      formData.scheduleImage.splice(index, 1)
      this.$emit('save')
    },
    uploadSuccess({data, formData}) {
      this.$set(formData, 'scheduleImage', data.map(item => item.mainPath))
      this.$emit('save')
    },
    beforeClick(data) {
      if(!data.id) {
        this.$message.warning('请先保存当前表单再进行图片上传')
        return false
      }
      return true
    }
  }
}
</script>

<style>
</style>
