<template>
  <basic-dialog v-el-drag-dialog :visible.sync="visible" >
    <pop-dialog-table :popData="popData" :titleData="titleData" @rowChange="rowChange"></pop-dialog-table>
    <el-row justify="center" type="flex">
      <el-button @click="handleClick" type="primary">确认</el-button>
      <el-button @click="visible = false">取消</el-button>
    </el-row>
  </basic-dialog>
</template>

<script>
  import popDialogTable from './popDialogTable.vue'
  export default {
    name: 'popDialog',
    components: {
      popDialogTable
    },
    data() {
      return {
        visible: this.value,
        row: {}
      }
    },
    watch: {
      value(val) {
        this.visible = val
      },
      visible(val) {
        this.$emit('input', val)
      }
    },
    props: {
      value: {
        type: Boolean,
        default: () => false
      },
      popData: {
        type: Object,
        default: () => {}
      },
      titleData: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      rowChange(row) {
        this.row = row
      },
      handleClick() {
        this.$emit('rowChange', this.row)
        this.visible = false
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
