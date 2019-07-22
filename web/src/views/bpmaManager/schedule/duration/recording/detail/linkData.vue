<template>
  <div class="content-container">
    <el-table
      :data="data"
      @row-click="rowClick"
      highlight-current-row
      border
      stripe>
      <el-table-column header-align="center" align="center" label="序号" type="index" width="60"></el-table-column>
      <el-table-column header-align="center" label="回复人员" class-name="spacing-set">
        <template slot-scope="scope">
          <basic-input disabled v-model="scope.row.answerPerson"></basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="回复时间" class-name="spacing-set">
        <template slot-scope="scope">
          <basic-input disabled v-model="scope.row.inputTime" align="center"></basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="回复内容" class-name="spacing-set">
        <template slot-scope="scope">
          <basic-input disabled v-model="scope.row.answerContent"></basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="文档附件" class-name="spacing-set" align="center">
        <template slot-scope="scope">
          <el-button @click="viewFiles(scope.row.id)" icon="el-icon-if-see" plain size="small"
                      type="primary">查看
          </el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column header-align="center" label="备注" class-name="spacing-set">
        <template slot-scope="scope">
          <basic-input disabled v-model="scope.row.remark"></basic-input>
        </template>
      </el-table-column> -->
    </el-table>
    <el-dialog title="回复" :visible.sync="dialogFormVisible">
      <el-form :model="dialogFormData" class="form-container" ref="dialogFrom">
        <el-row>
          <basic-form-item label="回复内容" prop="answerContent">
            <basic-input disabled placeholder="请输入回复内容" v-model="dialogFormData.answerContent" type="textarea" :rows="6"></basic-input>
          </basic-form-item>
        </el-row>
        <el-row>
          <basic-form-item label="文档附件" class="add-border file">
            <basic-upload ref="refBasicUpload" :formId="dialogFormData.id" disabled>
            </basic-upload>
          </basic-form-item>
        </el-row>
        <el-row>
          <basic-form-item label="回复人员">
            <basic-input disabled v-model="dialogFormData.inputPerson"></basic-input>
          </basic-form-item>
        </el-row>
        <el-row>
          <basic-form-item label="回复时间">
            <basic-input disabled v-model="dialogFormData.inputTime"></basic-input>
          </basic-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getScheduleTrackDetailItem
} from '@/api/bpmaManager/schedule/duration/recording.js'
export default {
  name: 'linkData',
  data() {
    return {
      data: [],
      selectedRow: {},
      dialogFormVisible: false,
      dialogFormData: {}
    }
  },
  props: {
    disabled: Boolean,
    formData: Object,
    value: Array,
    userInfo: Object
  },
  watch: {
    value(val) {
        this.data = val
    },
    data: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  methods: {
    rowClick(row) {
      this.selectedRow = row
    },
    viewFiles(id) {
      getScheduleTrackDetailItem(id).then(res => {
        this.dialogFormData = res.data
        this.dialogFormVisible = true
      })
    }
  }
}
</script>

<style>
</style>
