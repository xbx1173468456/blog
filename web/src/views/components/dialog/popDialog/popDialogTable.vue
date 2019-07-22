<template>
  <div class="popTable">
    <pop-table :data="tableData" border :row-key="rowKey || 'id'" highlight-current-row @row-click="handleClick" @selection-change="selectionChange" reserve-selection>
      <el-table-column v-if="selection" type="selection"> </el-table-column>
      <pop-table-column type="index" label="序号" width="50"></pop-table-column>
      <pop-table-column v-for="item in titleData" :key="item.id" :prop="item.prop" :label="item.name" show-overflow-tooltip :width="item.width" :align="item.align">
        <template slot-scope="props">
          <el-checkbox v-model="props.row[item.prop]" v-if="item.input === 'checkbox'"></el-checkbox>
          <el-input v-else-if="item.input" v-model="props.row[item.prop]" @input="clicka(props)"></el-input>
          <span v-else>{{props.row[item.prop]}}</span>
        </template>
      </pop-table-column>
    </pop-table>
  </div>
</template>

<script>
  import popTable from './table/table/index.js';
  import popTableColumn from './table/table-column/index.js';
  export default {
    name: 'popDialogTable',
    data() {
      return {
        tableData: []
      }
    },
    props: {
      data: Array,
      titleData: Array,
      selection: {
        type: Boolean,
        default: () => false
      },
      rowKey: String,
      input: String,
      validateStatus: Object,
      filterVal: Boolean
    },
    components: {
      popTable,
      popTableColumn
    },
    watch: {
      data: {
        handler(val) {
          if (this.filterVal) {
            this.tableData = this.filtervalidateStatus(val)
          } else {
            this.tableData = val
          }
        },
        deep: true
      }
    },
    created() {
      if (this.filterVal) {
        this.tableData = this.filtervalidateStatus(this.data)
      } else {
        this.tableData = this.data
      }
    },
    methods: {
      handleClick(row) {
        this.$emit('rowChange', row)
      },
      selectionChange(selection) {
        console.log(selection)
      },
      clicka(a) {
        console.log(a)
      },
      filtervalidateStatus(data) {
        data = JSON.parse(JSON.stringify(data))
        return data.filter(item => {
          if (item.validateStatus == this.validateStatus.code) {
            if (item.children && item.children.length > 0) {
              item.children = this.filtervalidateStatus(item.children)
            }
            return true
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import url('./table/table/table.css');
  @import url('./table/table/table-column.css');
</style>