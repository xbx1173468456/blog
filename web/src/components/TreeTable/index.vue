<template>
  <el-table
    :data="formatData"
    :row-key="rowKey"
    :row-style="showRow"
    @current-change="handleCurrentChange"
    @row-click="rowClick"
    border
    highlight-current-row
    ref="singleTable"
    v-bind="$attrs">
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span :key="space" class="ms-tree-space" v-for="space in scope.row._level"/>
        <span @click="toggleExpanded(scope.$index)" class="tree-ctrl" v-if="iconShow(0,scope.row)">
          <i class="el-icon-plus" v-if="!scope.row._expanded"/>
          <i class="el-icon-minus" v-else/>
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
    <template v-else>
      <el-table-column
        align="center"
        label="序号"
        type="index" width="50">
      </el-table-column>
      <el-table-column
        :align="column.align || 'center'"
        :key="column.value"
        :label="column.text"
        :width="column.width"
        reserve-selection
        show-overflow-tooltip
        v-for="(column, index) in columns">
        <template slot-scope="scope">
          <!-- Todo -->
          <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
          <span class="ms-tree-space" v-if="index === 0"/>
          <span @click="toggleExpanded(scope.$index)" class="tree-ctrl" v-if="iconShow(index,scope.row)">
            <i class="el-icon-plus" v-if="!scope.row._expanded"/>
            <i class="el-icon-minus" v-else/>
          </span>
          <!-- {{ scope.row[column.value] }} -->
          {{ formatter(scope,column) }}
        </template>
      </el-table-column>
    </template>

  </el-table>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import treeToArray from './eval'
import { jsonString } from 'utils'
export default {
  name: 'TreeTable',
  data(){
    return {
      currentRow:null
    }
  },
  props: {
    /* eslint-disable */
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    },
    hasselection:{
        type: Boolean,
        default: true
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  watch: {
    data() {
      if (this.currentRow && this.currentRow.parent) {
        this.formatData.some(item => {
          if (item.id === this.currentRow.parentId) {
            this.formatData.some(res => {
              if (res.id === this.currentRow.id) {
                this.$refs.singleTable.setCurrentRow(res)
                this.rowClick(res)
              }
            })
            return item._expanded = true
          }
        })
      }
    }
  },
  methods: {
    rowKey(row) {
      return row.id
    },
    rowClick(e,l,v){
        this.$emit('rowClick',e)
      },
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    setCurrent(row) {
        // this.$refs.singleTable.setCurrentNode(2)
        this.$refs.singleTable.setCurrentRow(this.formatData[row]);
    },
    handleCurrentChange(val) {
        this.currentRow = val;
        console.log(val)
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    formatter(scope,column){
        if(column.value == 'type'){
            switch (scope.row[column.value]) {
              case 1:
                return jsonString.type[0].name
                break;
              case 2:
                return jsonString.type[1].name
                break;
              default:
               return jsonString.type[2].name
                break;
            }
        }else if(column.value  == 'validateStatus'){
            switch (scope.row[column.value]) {
              case 1:
                return jsonString.validateStatus[0].name
                break;
              default:
               return jsonString.validateStatus[1].name
                break;
            }
        }else if(column.value  == 'enable'){
            switch (scope.row[column.value]) {
              case 1:
                return jsonString.enable[0].name
                break;
              default:
               return jsonString.enable[1].name
                break;
            }
        }else{
          return scope.row[column.value]
        }
      }
  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>
