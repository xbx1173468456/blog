<template>
  <div class="contractBudget-container-list">
    <div :style="windowHeight">
      <div class="handler-container">
        <el-col :span="18">
          <el-button icon="el-icon-plus" plain size="small" type="primary">引入物资</el-button>
          <el-button icon="el-icon-if-introduce" plain size="small" type="primary">引入人员</el-button>
          <el-button icon="el-icon-circle-plus-outline" plain size="small" type="primary">引入费用</el-button>
          <el-button icon="el-icon-if-save" plain size="small" type="primary">保存</el-button>
          <el-button icon="el-icon-delete" plain size="small" type="danger">删除</el-button>
        </el-col>
        <el-col :span="6">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-input clearable placeholder="请输入关键字">
                <i class="el-icon-search el-input__icon" slot="suffix">
                </i>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
      <pop-table :titleData="titleTable"></pop-table>
    </div>
  </div>
</template>

<script>
  import popTable from '@/views/components/dialog/popDialog/popDialogTable'
  import bubgetTable from './resourceBudgetTable.json'

  export default {
    name: 'resourceBudget',
    data() {
      return {
        titleTable: bubgetTable
      }
    },
    props: {
      formData: {
        type: Object,
        default: () => {
        }
      }
    },
    components: {
      popTable
    },
    computed: {
      windowHeight() {
        return {
          minheight: this.$store.state.app.screenHeight - 120 + 'px'
        }
      }
    }
  }
</script>

<style scoped>
  .search {
    text-align: right;
    display: inline-block;
  }
</style>
