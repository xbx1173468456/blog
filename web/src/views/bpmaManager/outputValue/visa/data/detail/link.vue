<template>
  <div class="content-container">
    <basic-handler>
      <el-button :disabled="disabled" @click="addClick" icon="el-icon-plus" plain size="small" type="primary">新增环节
      </el-button>
      <el-button :disabled="disabled || Object.keys(row).length == 0" @click="deleteClick" icon="el-icon-delete" plain
                 size="small" type="danger">删除
      </el-button>
    </basic-handler>
    <el-table :height="286" :data="showDatas" @row-click="rowChange" border highlight-current-row>
      <el-table-column header-align="center" align="center" label="序号" type="index" width="60"></el-table-column>
      <el-table-column header-align="center" align="center" label="环节编码" show-overflow-tooltip>
        <template slot-scope="props">
          <span class="span-text">{{props.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" width="150" label="环节名称" show-overflow-tooltip className="spacing-set">
        <template slot-scope="scope">
          <el-form :model="scope.row" :rules="rules" :ref="'refFormValid' + scope.$index">
            <el-form-item prop="name" :showMessage="false">
              <basic-input :disabled="disabled" v-model="scope.row.name"></basic-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="责任人员" show-overflow-tooltip className="spacing-set" width="160">
        <template slot-scope="props">
          <basic-input :disabled="disabled" v-model="props.row.handlePerson" :maxlength="50">
          </basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" width="100" label="所需资料" show-overflow-tooltip className="spacing-set">
        <template slot-scope="props">
          <basic-input :disabled="disabled" v-model="props.row.file" :maxlength="100"></basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" width="100" label="资料介质" show-overflow-tooltip className="spacing-set">
        <template slot-scope="props">
          <!-- <basic-input :disabled="disabled" v-model="props.row.medium"></basic-input> -->
          <el-select :disabled="disabled" @change="setMedium(props.row.mediumId, props.$index)" placeholder="请选择"
                     v-model="props.row.mediumId" size="small">
            <el-option
              :key="item.id"
              :label="item.name"
              :value="item.id"
              v-for="item in medium"
              size="small"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="所需份数" show-overflow-tooltip className="spacing-set">
        <template slot-scope="props">
          <basic-input :disabled="disabled" type="number" v-model="props.row.sum" price></basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="计划开始" width="140" className="spacing-set">
        <template slot-scope="props">
          <el-date-picker
            :disabled="disabled"
            :picker-options="pickerOptionsBeginDate"
            :prefix-icon="disabled ? 'a' : ''"
            @click.native="handleClick(props)"
            @change="sumDays(props.$index)"
            placeholder="请选择日期"
            align="right"
            size="small"
            type="date"
            v-model="props.row.beginDate"
            value-format="timestamp">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="计划完成" width="140" className="spacing-set">
        <template slot-scope="props">
          <el-date-picker
            :disabled="disabled || !props.row.beginDate"
            :picker-options="pickerOptions"
            :prefix-icon="disabled ? 'a' : ''"
            @change="sumDays(props.$index)"
            @click.native="handleClick(props)"
            placeholder="请选择日期"
            align="center"
            size="small"
            type="date"
            v-model="props.row.finishDate"
            value-format="timestamp">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="计划日历天" show-overflow-tooltip className="spacing-set">
        <template slot-scope="props">
          <span class="span-text">{{props.row.days}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="主办单位" width="150" show-overflow-tooltip className="spacing-set">
        <template slot-scope="props">
          <basic-input :disabled="disabled" v-model="props.row.enterprise" :maxlength="100"></basic-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="是否完成" show-overflow-tooltip>
        <template slot-scope="props">
          <span class="span-text">{{isOrNot.filter(item => item.code == props.row.ifFinish)[0] && isOrNot.filter(item => item.code == props.row.ifFinish)[0].name}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="完成日期" show-overflow-tooltip className="spacing-set" width="100">
        <template slot-scope="props">
          <span class="span-text">{{props.row.handleDate && props.row.handleDate.split(' ')[0]}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" width="140" label="摘要" show-overflow-tooltip className="spacing-set">
        <template slot-scope="props">
          <basic-input :disabled="disabled" v-model="props.row.summary" :maxlength="2048"></basic-input>
        </template>
      </el-table-column>
    </el-table>
    <pagination :limit.sync="modelSearchFilter.limit" :page.sync="modelSearchFilter.page" :total="total"
                @pagination="getGoodslist"/>
  </div>
</template>

<script>
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import {
    deleteFileStage
  } from '@/api/bpmaManager/outputValue/visa/data.js'
  import pagination from '@/components/Pagination'
  export default {
    name: 'links',
    components: {
      pagination
    },
    data() {
      const that = this
      return {
        data: [],
        showData: [],
        index: null,
        tableShow: false,
        medium: [],
        row: {},
        pickerOptions: {
          disabledDate(time) {
            if (!that.data[that.index]) return false
            return time.getTime() < that.data[that.index].beginDate
          }
        },
        pickerOptionsBeginDate: {
          disabledDate(time) {
            if(that.index && that.data[that.index].finishDate) {
              return time.getTime() > that.data[that.index].finishDate
            }
          }
        },
        modelSearchFilter: {
          page: 1,
          limit: 10
        },
        rules: {
          name: [{ max: 100, required: true, trigger: 'change' }]
        }
      }
    },
    props: {
      disabled: Boolean,
      parentDatas: Object,
      isOrNot: Array,
      value: Array
    },
    watch: {
      parentData: {
        handler(val) {
          this.data = val
        },
        deep: true
      },
      data: {
        handler(val) {
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
      total() {
        return this.showDatas.length
      },
      showDatas() {
        return this.showData.filter(item => item.persistStatus != 'fdel')
      }
    },
    async created() {
      getDictionaryDataByTypeFilter('BPMA_EMDIUM').then(res => {
        this.medium = res.data
      })
    },
    methods: {
      addClick() {
        let code
        if (this.data.length === 0) {
          code = '01'
        } else {
          code = this.createdCode(this.data)
        }
        const { id } = this.parentDatas
        this.data.push({
          ifFinish: 2,
          code,
          masterId: id
        })
      },
      deleteClick() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.row.id) {
            // deleteFileStage(this.row.id).then(res => {
            //   if (res.rel) {
            //     this.$message.success(res.message)
            //   } else {
            //     this.$message.warning(res.message)
            //   }
            // })
            this.data = this.data.map(item => {
              if(item == this.row) {
                this.$set(item, 'persistStatus', 'fdel')
              }
              return item
            })
          } else {
            this.data = this.data.filter(item => item != this.row)
          }
          this.row = {}
          this.index = 0
          this.$nextTick(() => {
            this.$emit('changeDate', this.showDatas)
          })
        }).catch(err => this.$message.warning(err))
      },
      handleClick(props) {
        this.index = props.$index
      },
      sumDays(idx) {
        const { finishDate, beginDate } = this.data[idx]
        this.$set(this.data[idx], 'days', ((finishDate - beginDate) / 86400000 + 1) || 0)
        this.$emit('changeDate')
      },
      setMedium(val, idx) {
        this.data[idx].medium = this.medium.filter(item => item.id == val)[0].name
      },
      rowChange(row) {
        this.row = row
        this.$emit('rowChange', row)
      },
      formatDate(date) {
        return new Date(date).getTime()
      },
      createdCode(data) {
        data = data.map(item => parseInt(item.code))
        return this.prefixInteger(data.sort((a, b) => a - b)[data.length - 1] + 1, 2)
      },
      prefixInteger(number, n) {
        let len = String(number).length
        while (len < n) {
          number = '0' + number
          len++
        }
        return number
      },
      getGoodslist() {
        const start = (this.modelSearchFilter.page - 1) * this.modelSearchFilter.limit
        const end = start + this.modelSearchFilter.limit
        this.showData = this.data.slice(start, end)
      },
      validData() {
        return new Promise((reslove, reject) => {
          if(this.showDatas.length == 0) reslove(true)
          this.showDatas.forEach((item, idx) => {
            this.$refs[`refFormValid${idx}`].validate(valid => {
              if(valid) {
                if(idx == this.showDatas.length - 1) reslove(true)
              } else {
                reslove(false)
              }
            })
          })
        })
      }
    }
  }
</script>

<style scoped>
  /* .container {
    background: #F5F5F5;
    padding: 10px;
    margin-bottom: 5px;
  }

  .container .handler-container {
    background: #F5F5F5;
  }

  .el-table >>> .el-input__inner {
    border: none;
  }

  .el-date-editor {
    width: 100%;
  }

  .el-date-editor >>> .el-input__inner {
    padding-left: 5px;
    padding-right: 5px;
    width: 110px;
    text-align: center;
  }

  .span-text {
    color: #c0c4cc;
  } */
</style>
