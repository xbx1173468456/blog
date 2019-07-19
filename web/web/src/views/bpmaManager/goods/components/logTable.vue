<template>
  <div>
    <el-table :key="tableKey" ref="singleTable" :data="tableData" tooltip-effect="dark" border fit stripe
      :highlight-current-row='highlight' @row-dblclick="dblclick" @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange" class="mt10" style="width: 100%" height="300">
      <el-table-column :type="type" label="序号" width="60" align="center">
      </el-table-column>
      <el-table-column :show-overflow-tooltip='true' align="center" v-for="(col,i) in columns" :label="col.text"
        :key="i" :width="col.width" :class-name='col.align'>
        <template slot-scope="scope">
          <div v-if="!col.showTable">
            {{formatter(scope,col)}}
          </div>
          <div v-else>
            <el-input clearable size="small" v-model="scope.row[col.value]" maxlength="100"
              @blur="calculate(scope.row,col,$event)" :ref="col.value" :disabled="col.disable || disabled"
              @keyup.native="proving1(scope.row,col,$event)" :min="col.isBig?0:-10" @change="handlChange"></el-input>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination mt10">
      <pagination v-show="page.total>0" :total="page.total" :page.sync="page.currentPage" :limit.sync="page.pageSize"
        @pagination="currentPage" />
    </div>
  </div>
</template>
<script>
  import pagination from '@/components/Pagination'
  import { getEnumData } from 'utils'
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary.js'
  import { getArea } from '@/api/sysManager/sysBaseSet/areaManager'
  import { getAccountancyYear } from '@/api/sysManager/sysBaseSet/monthYearManager'
  export default {
    name: "logTable",
    data() {
      return {
        tableKey: 0,
        heightUserManager: '0',
        dictionary: [],
        stage: [],
        constructionType: [],
        area: [],
        year: [],
        showTable: ['sum', 'unitPrice', 'position', 'summary']
      }
    },
    props: {
      columns: {
        type: Array,
        default: []
      },
      tableData: {
        type: Array,
        default: []
      },
      page: {
        type: Object,
        default: {}
      },
      type: {
        type: String,
        default: () => 'index'
      },
      highlight: {
        type: Boolean,
        default: true
      },
      typeTable: {
        type: Boolean,
        default: false
      },
      ifChange: {
        type: Number,
        default: 2
      },
      disabled: Boolean
    },
    components: {
      pagination
    },
    methods: {
      proving1(scope, col, $event) {
        if (col.noLess) {
          $event.target.value = $event.target.value.replace(/[^\.\d]/g, '');
          $event.target.value = $event.target.value.replace('.', '');
        }

      },
      handlChange(val) {
        this.$emit('change', val)
      },
      calculate(scope, col, $event) {
        if (col.len) {
          this.tableKey++
          if (col.len == 4) {
            $event.target.value = Number($event.target.value).toFixed(4)
          }
          if (this.ifChange == 1) {
            if ($event.target.value == 0 && !col.isBig) {
              this.$message.warning('不能为0')
              scope.sum = 1
              $event.target.value = 1
            }
          } else {
            if ($event.target.value < 0) {
              this.$message.warning('不能小于0')
              scope.sum = 0
              $event.target.value = 0
            }
          }
          if ($event.target.value < 0 && col.isBig) {
            $event.target.value = 0
            scope.unitPrice = 0
          }
          scope.sum = Number(scope.sum).toFixed(4)
          scope.unitPrice = Number(scope.unitPrice).toFixed(4)
          scope.totalPrice = Number(scope.sum * scope.unitPrice).toFixed(2)
        }
        if (col.noLess) {
          $event.target.value = $event.target.value.replace(/[^\.\d]/g, '');
          $event.target.value = 0;
        }
      },
      currentPage(pages) {
        this.$emit('currentPage', pages.page)
      },
      handleCurrentChange(o) {
        if (o) {
          this.$emit('handleCurrentChange', o)
        }
      },
      handleSelectionChange(v) {
        this.$emit('handleSelectionChange', v)
      },
      dblclick(row) {
        this.$emit('dblclick', row)
      },
      //獲取字典
      getDiction() {
        //階段
        getDictionaryDataByTypeFilter('SYS_PRO_STAGE').then(res => {
          if (res.status == 200) {
            this.stage = res.data
          }
        }).catch(err => {
          this.$message.warning(err.message)
        })
        //建設性質
        getDictionaryDataByTypeFilter('SYS_PRO_NATURE').then(res => {
          if (res.status == 200) {
            this.constructionType = res.data
          }
        }).catch(err => {
          this.$message.warning(err.message)
        })
      },
      //獲取業務區域
      getAreas(page, fuzzy) {
        let data = {
          page: page,
          limit: 100,
          fuzzy: fuzzy
        }
        getArea(data).then(res => {
          if (res.status == 200) {
            this.area = res.data.rows
          }
        }).catch(err => {
          this.$message.warning(err.message)
        })
      },
      //獲取會計年度
      getYear(page, fuzzy) {
        let data = {
          page: page,
          limit: 100,
          fuzzy: fuzzy
        }
        getAccountancyYear(data).then(res => {
          if (res.status == 200) {
            this.year = res.data.rows
          }
        }).catch(err => {
          this.$message.warning(err.message)
        })
      },
      formatter(scope, col) {
        if (col.value == 'stageId') {
          for (let obj of this.stage) {
            if (scope.row[col.value] == obj.id) {
              return obj.name
            }
          }
        } else if (col.value == 'natureId') {
          for (let obj of this.constructionType) {
            if (scope.row[col.value] == obj.id) {
              return obj.name
            }
          }
        } else if (col.value == 'ifGovInvest') {
          for (let obj of this.dictionary.isOrNot) {
            if (scope.row[col.value] == obj.code) {
              return obj.name
            }
          }
        } else if (col.value == 'operationWay') {
          for (let obj of this.dictionary.operate) {
            if (scope.row[col.value] == obj.code) {
              return obj.name
            }
          }
        } else if (col.value == 'areaId') {
          for (let obj of this.area) {
            if (scope.row[col.value] == obj.id) {
              return obj.name
            }
          }
        } else if (col.value == 'year') {
          for (let obj of this.year) {
            if (scope.row[col.value] == obj.id) {
              return obj.year
            }
          }
        } else if (col.value == 'validateStatus') {
          for (let obj of this.dictionary.validateStatus) {
            if (scope.row[col.value] == obj.code) {
              return obj.name
            }
          }
        } else {
          return scope.row[col.value]
        }
      }
    },
    created() {
      console.log(this.ifChange, 'ifChange')
      this.getDiction()
      this.getAreas()
      this.getYear()
      //初始化数据字典
      getEnumData(this, ['GetValidateStatusData', 'GetIsOrNotData', 'GetOperate']);
      this.dictionary = this.$store.state.common.dataEnum
      console.log(this.dictionary)
    }
  }
</script>
<style>
  .mt10 {
    margin-top: 15PX;
  }

  .pagination {
    text-align: right
  }

  .el-table td.is-center.left {
    text-align: left !important
  }
</style>