<!--表格布局-->
<!--参考页面：src\views\sysManager\sysBaseSet\monthYearManager\month.vue-->
<template>
  <div class="table-container">
    <el-table
      ref="refElTable"
      :data="tableData"
      stripe
      highlight-current-row
      :border="border"
      v-bind="$attrs"
      v-on="$listeners"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      :height=height
      :min-height=minHeight
      :max-height=maxHeight
      :span-method=spanMethodCellMerge
    >
      <slot name="selection"/>
      <el-table-column
        label="序号"
        type="index"
        width="60" align="center">
      </el-table-column>
      <slot name="slot-column"/>
      <el-table-column
        v-for="item in columns"
        :fixed="item.fixed"
        :prop="item.value"
        :label="item.text"
        :key="item.value"
        :min-width="item.minWidth"
        :width="item.width"
        :align="item.align||'center'"
        :header-align="item.headerAlign"
        :show-overflow-tooltip="item.showOverflowTooltip"
        :class-name="item.className"
      >
        <template slot-scope="scope">
          <slot :scope="scope" :name="item.value">
            <template>{{ scope.row[item.value] }}</template>
          </slot>
        </template>
      </el-table-column>
      <slot name="slot-many-column"/>
    </el-table>
    <pagination v-if="isPagination" :total="dataTable.total" :page.sync="pagination.page" :limit.sync="pagination.limit"
                @pagination="paginationData"/>
  </div>
</template>

<script>
  import {addAttrs} from "./eval.js";
  import pagination from '@/components/Pagination'

  export default {
    name: "basicTable",
    components: {
      pagination
    },
    props: {
      dataTable: {
        type: Object,
        required: true,
        default: () => {
        }
      },
      columns: {
        type: Array,
        default: () => []
      },
      showSummary:{
        type:Boolean,
        default:false
      },
      height: {
        type: Number,
        default: 500
      },
      minHeight: {
        type: Number,
        default: 500
      },
      maxHeight: {
        type: Number
      },
      // 是否有边框
      border: {
        type: Boolean,
        default: true
      },
      // 是否分页
      isPagination: {
        type: Boolean,
        default: true
      },
      // 分页
      pagination: {
        type: Object,
        required: false,
        default: () => {
          return {page: 1, limit: 10}
        }
      },
      // 合并单元格索引  eg:{index:[0,1,2],name:'masterCode'}
      mergeColumn: {
        type: Object,
        required: false,
        default: () => {
          return {indexs: [], name: 'code'}
        }
      },
    },
    data() {
      return {
        rowArray: [],
        position: 0,
      };
    },
    computed: {
      tableData: {
        get: function () {
          const data = this.dataTable.data;
          //合并单元格
          if (this.$utils.length(this.mergeColumn) && this.mergeColumn.indexs.length > 0) {
            this.getRowArray(data,this.mergeColumn.name);
          }
          if (data.length === 0) {
            return [];
          }
          addAttrs(data);
          return data;
        }
      }
    },
    methods: {
      addRow(row) {
        this.data.push(row);
      },
      delete(row) {
        const {tableId} = row;
        this.data.splice(tableId, 1);
      },
      getData() {
        return this.tableData;
      },
      toggleSelection(array) {
        if (array&&array.length>0) {
          this.$refs.refElTable.clearSelection();
          this.tableData.forEach(row => {
            for (let arrayRow of array) {
              if (arrayRow.id == row.id) {
                this.$refs.refElTable.toggleRowSelection(row, true);
                break;
              }
            }
          });
        } else {
          this.$refs.refElTable.clearSelection();
        }
      },
      // toggleRowSelection(row, selected) {
      //   this.$refs.refElTable.toggleRowSelection(row.id, selected)
      // },
      setCurrentRow(currentRow, isId = false) {
        if (currentRow) {
          for (let row of this.tableData) {
            if (isId) {
              if (currentRow.id == row.id) {
                this.$refs.refElTable.setCurrentRow();
                this.$refs.refElTable.setCurrentRow(row);
                break;
              }
            } else {
              if (currentRow.tableId == row.tableId) {
                this.$refs.refElTable.setCurrentRow();
                this.$refs.refElTable.setCurrentRow(row);
                break;
              }
            }
          }
        } else {
          this.$refs.refElTable.setCurrentRow();
        }
      },
      /**
       * 执行常规更新表操作
       * @param changedData 已更改的数据
       * @param tableData 原数据表数据
       */
      updateTableData(changedData, callback) {
        const changedIds = changedData.map(row => row.tableId);
        this.tableData.forEach((row, index, array) => {
          if (changedIds.includes(row.tableId)) {
            for (let changedDataRow of changedData) {
              if (row.tableId == changedDataRow.tableId) {
                Object.assign(row, changedDataRow);
                break;
              }
            }
          }
        })
        if (typeof callback === "function") {
          callback();
        }
      },
      /**
       *  //通过listId获得当前行
       * @param changedData 已更改的数据
       * @param tableData 原数据表数据
       */
      getCurrentRowByListId(getData, currentRow, callback) {
        this.$utilsBasic.getCurrentRowByListId(getData, currentRow, callback);
      },
      paginationData(page) {
        this.$emit('pagination', page);
      },
      /**
       * data就是我们从后台拿到的数据，通常是一个数组；rowArray是一个空的数组，用于存放每一行记录的合并数；position是rowArray的索引。
       * 如果是第一条记录（索引为０），向数组中加入１，并设置索引位置；如果不是第一条记录，则判断它与前一条记录是否相等，
       * 如果相等，则向rowArray中添入元素０，并将前一位元素＋１，表示合并行数＋１，以此往复，得到所有行的合并数，０即表示该行不显示。
       * @param data
       * @param column
       */
      getRowArray(data, column = 'code') {
        const _tableData = data;
        for (let i = 0; i < _tableData.length; i++) {
          if (i === 0) {
            this.rowArray=[];
            this.rowArray.push(1);
            this.position = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (_tableData[i][column] === _tableData[i - 1][column]) {
              this.rowArray[this.position] += 1;
              this.rowArray.push(0);
            } else {
              this.rowArray.push(1);
              this.position = i;
            }
          }
        }
      },
      spanMethodCellMerge({row, column, rowIndex, columnIndex}) {
        if (this.$utils.length(this.mergeColumn) && this.mergeColumn.indexs.includes(columnIndex)) {
          const _row = this.rowArray[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {rowspan: _row, colspan: _col}
        }
      },

      /**
       * 表格尾部加总
       * */
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '汇总';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] =this.$utilsBasic.toThousands(sums[index]) ;
          } else {
            sums[index] = '';
          }
        });

        return sums;
      }
    },
  };
</script>

<style>
  @keyframes tableTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes tableTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .table-ctrl {
    position: relative;
    cursor: pointer;
    color: #2196f3;
  }
  .el-table .el-table__footer td.is-center:not(:first-child), .el-table .el-table__footer th.is-center:not(:first-child) {
    text-align: right!important;
  }

</style>
