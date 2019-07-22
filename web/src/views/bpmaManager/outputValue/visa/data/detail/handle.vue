<template>
  <div class="content-container">
    <basic-handler>
      <el-button :disabled="Object.keys(linkRow).length === 0 || !disabled || linkRowDis" @click="addClick"
                 icon="el-icon-plus" plain size="small" type="primary">新增办理
      </el-button>
      <el-button :disabled="isUpdate || disabled1" @click="save" icon="el-icon-if-save" plain size="small"
                 type="primary">保存
      </el-button>
      <el-button :disabled="Object.keys(row).length == 0 || disabled1" @click="deleteClick" icon="el-icon-delete" plain
                 size="small"
                 type="danger">删除
      </el-button>
      <el-button :disabled="Object.keys(row).length == 0 || disabled1" @click="review" icon="el-icon-if-auth" plain
                 size="small" type="primary">审核
      </el-button>
    </basic-handler>
    <el-table :height="286" :data="showData" @row-click="rowChange" border highlight-current-row>
      <el-table-column header-align="center" align="center" label="序号" type="index" width="60"></el-table-column>
      <el-table-column header-align="center" align="center" label="审核状态" show-overflow-tooltip width="80">
        <template slot-scope="props">
          <span>{{validateStatus.filter(item => item.code == props.row.validateStatus)[0] && validateStatus.filter(item => item.code == props.row.validateStatus)[0].name}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="环节编码" show-overflow-tooltip>
        <template slot-scope="props">
          <span class="span-text">{{props.row.stageCode}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="环节名称" show-overflow-tooltip width="150">
        <template slot-scope="props">
          <span class="span-text">{{props.row.stageName}}</span>
          <!-- <basic-input :disabled="false" v-model="props.row.visafileStageName"></basic-input> -->
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="办理人员" show-overflow-tooltip className="spacing-set" width="100">
        <template slot-scope="props">
          <basic-input :disabled="props.row.validateStatus == validateStatus1.code"
                     v-model="props.row.handlePerson" :maxlength="50"></basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="办理日期" width="140" className="spacing-set">
        <template slot-scope="props">
          <el-date-picker :disabled="props.row.validateStatus == validateStatus1.code" :picker-options="pickerOptions"
                          placeholder="请选择日期"
                          :prefix-icon="props.row.validateStatus == validateStatus1.code ? 'a' : ''"
                          size="small" type="date" v-model="props.row.handleDate"
                          value-format="timestamp">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="办理说明" show-overflow-tooltip className="spacing-set" width="120">
        <template slot-scope="props">
          <basic-input :disabled="props.row.validateStatus == validateStatus1.code"
                     v-model="props.row.recordExplain" :maxlength="1024"></basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="成果文件" show-overflow-tooltip className="spacing-set">
        <template slot-scope="props">
          <basic-input :disabled="props.row.validateStatus == validateStatus1.code" type="number"
                     v-model="props.row.sum"></basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="是否完成" show-overflow-tooltip className="spacing-set">
        <template slot-scope="props">
          <el-checkbox
            :disabled="props.row.validateStatus == validateStatus1.code"
            :false-label="Number(unIfFinish.code)"
            :true-label="Number(ifFinish.code)"
            @change="checkChange(props.row)"
            v-model="props.row.ifFinish"
          >
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="摘要" show-overflow-tooltip className="spacing-set" width="140">
        <template slot-scope="props">
          <basic-input :disabled="props.row.validateStatus == validateStatus1.code"
                     v-model="props.row.summary" :maxlength="2048"></basic-input>
        </template>
      </el-table-column>
    </el-table>
    <pagination :limit.sync="modelSearchFilter.limit" :page.sync="modelSearchFilter.page" :total="total"
                @pagination="getGoodslist"/>
  </div>
</template>

<script>
  import {
    deleteFileRecord,
    saveVisafileRecord,
    postVisafileRecord,
    reviewVisafileRecord
  } from '@/api/bpmaManager/outputValue/visa/data.js'
  import pagination from '@/components/Pagination'
  export default {
    name: 'handle',
    components: {
      pagination
    },
    data() {
      const that = this
      return {
        data: [],
        showData: [],
        row: {},
        pickerOptions: {
          disabledDate(time) {
            return (time.getTime() < that.linkRow.beginDate) || (time.getTime() > that.linkRow.finishDate)
          }
        },
        isUpdate: true,
        modelSearchFilter: {
          page: 1,
          limit: 10
        }
      }
    },
    props: {
      disabled: Boolean,
      value: Array,
      parentDatas: Object,
      linkRow: Object,
      validateStatus: Array,
      isOrNot: Array,
      linkRowDis: Boolean
    },
    watch: {
      data: {
        handler(val, oldVal) {
          val.map(item => {
            if (!item.handleDate) return item
            item.handleDate = new Date(item.handleDate).getTime()
            return item
          })
          if (val != oldVal) this.row = {}
          this.isUpdate = true
          if (Object.keys(this.row).length > 0) {
            this.isUpdate = false
          }
          this.$emit('input', val)
        },
        deep: true
      },
      value: {
        handler(val) {
          this.modelSearchFilter = {
            page: 1,
            limit: 10
          }
          this.data = val
          this.getGoodslist()
        },
        deep: true
      }
    },
    computed: {
      disabled1() {
        if (this.validateStatus1) {
          return this.row.validateStatus == this.validateStatus1.code
        }
      },
      ifFinish() {
        if (!Array.isArray(this.isOrNot)) return {}
        return this.isOrNot.filter(item => item.name === '是')[0]
      },
      unIfFinish() {
        if (!Array.isArray(this.isOrNot)) return {}
        return this.isOrNot.filter(item => item.name === '否')[0]
      },
      validateStatus1() {
        if (!Array.isArray(this.validateStatus)) return {}
        return this.validateStatus.filter(item => item.name === '已审核')[0]
      },
      total() {
        return this.data.length
      }
    },
    methods: {
      addClick() {
        const lock = this.data.every(item => item.validateStatus == this.validateStatus1.code)
        if (!lock && this.data.length != 0) return this.$message.warning('请先审核当前数据在新增')
        const { id } = this.parentDatas
        const { code, name } = this.linkRow
        this.data.unshift({
          ifFinish: 2,
          masterId: id,
          validateStatus: 2,
          stageId: this.linkRow.id,
          stageCode: code,
          stageName: name
        })
      },
      deleteClick() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.row.id) {
            deleteFileRecord(this.row.id).then(res => {
              if (res.rel) {
                this.data = this.data.filter(item => item != this.row)
                this.$message.success(res.message)
                this.row = {}
              } else {
                this.$message.warning(res.message)
              }
            })
          } else {
            this.data = this.data.filter(item => item != this.row)
          }
        }).catch(err => console.warn(err))
      },
      rowChange(row) {
        this.row = row
      },
      review() {
        this.$confirm(' 亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async res => {
          let rowData = this.row
          let keyData = await saveVisafileRecord(this.data).catch(err => console.warn(err))
          if (!rowData.id) {
            rowData = keyData.data.filter((item, idx) => {
              return !(this.data.some(result => {
                return item.id == result.id
              }))
            })[0]
          }
          this.data = keyData.data
          reviewVisafileRecord(rowData).then(res => {
            if (res.rel) {
              this.isUpdate = true
              this.data = this.data.map(item => {
                if (item.id == rowData.id) {
                  item = res.data
                }
                return item
              })
              this.updateLinkFinish(rowData)
              this.$message.success(res.message)
            }
          })
        }).catch(err => console.warn(err))
      },
      async save(lock) {
        return new Promise(async(reslove, reject) => {
          let data = await saveVisafileRecord(this.data)
          this.data = data.data
          this.$message.success(data.message)
          reslove(data)
        })
      },
      updateLinkFinish(row) {
        if (row.ifFinish == this.ifFinish.code) {
          this.$emit('updateFinish')
        }
        // let keyData = this.data[this.data.length - 1]
        // // let some = this.data.every(item => item.validateStatus == this.validateStatus1.code && item.ifFinish == this.ifFinish.code)
        // if (!this.data.every(item => item.validateStatus == this.validateStatus1.code)) return
        // if (keyData.validateStatus == this.validateStatus1.code && keyData.ifFinish == this.ifFinish.code) {
        //   this.$emit('updateFinish')
        // }
      },
      async checkChange(row) {
        if (row.ifFinish == this.ifFinish.code && row.validateStatus == this.validateStatus1.code) {
          await this.save(true)
          this.updateLinkFinish()
        }
      },
      getGoodslist() {
        const start = (this.modelSearchFilter.page - 1) * this.modelSearchFilter.limit
        const end = start + this.modelSearchFilter.limit
        this.showData = this.data.slice(start, end)
      }
    }
  }
</script>

<style scoped>
</style>
