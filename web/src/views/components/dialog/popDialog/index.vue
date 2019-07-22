<template>
  <basic-dialog v-el-drag-dialog :visible.sync="visible">
    <pop-dialog-table :data="showData" :titleData="titleData" @rowChange="rowChange" :filterVal="filterVal" :validateStatus="validateStatus"></pop-dialog-table>
    <pagination :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit" @pagination="getGoodslist" />
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="handleClick">确认</el-button>
      <el-button @click="visible = false">取消</el-button>
    </el-row>
  </basic-dialog>
</template>

<script>
  import popDialogTable from './popDialogTable.vue'
  import pagination from '@/components/Pagination'
  export default {
    name: 'popDialog',
    components: {
      popDialogTable,
      pagination
    },
    data() {
      return {
        visible: this.value,
        row: {},
        showData: [],
        modelSearchFilter: {
          page: 1,
          limit: 10
        },
        total: 0
      }
    },
    watch: {
      value(val) {
        this.visible = val
      },
      visible(val) {
        this.$emit('input', val)
      },
      data(val) {
        this.total = this.data.length
        this.getGoodslist()
      }
    },
    props: {
      value: {
        type: Boolean,
        default: () => false
      },
      data: {
        type: Array,
        default: () => []
      },
      titleData: {
        type: Array,
        default: () => []
      },
      filterVal: Boolean,
      validateStatus: Object
    },
    methods: {
      rowChange(row) {
        this.row = row
      },
      handleClick() {
        this.$emit('rowChange', this.row)
        this.visible = false
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
.el-row {
  margin-top: 10px;
}
.basic-dialog__wrapper >>> .basic-dialog__header {
  border-bottom: none;
  margin-bottom: 20px;
}
</style>
