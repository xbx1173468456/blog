<template>
  <!-- <el-tabs type="border-card" :style="windowHeight">
    <el-tab-pane label="合同信息">
      <contract-info @formData="changeForm"></contract-info>
    </el-tab-pane>
    <el-tab-pane label="项目预算">
      <contract-budget :formData="formData"></contract-budget>
    </el-tab-pane>
    <el-tab-pane label="角色管理">
      <resource-budget :formData="formData"></resource-budget>
    </el-tab-pane>
  </el-tabs> -->
  <contract-info :style="windowHeight" @formData="changeForm"></contract-info>
</template>

<script>
import contractInfo from './components/contractInfo'
import contractBudget from './components/contractBudget'
import resourceBudget from './components/resourceBudget'
export default {
  name: 'contractDetail',
  data() {
    return {
      formData: {}
    }
  },
  components: {
    contractInfo,
    contractBudget,
    resourceBudget
  },
  computed: {
    windowHeight() {
      return {
        height: this.$store.state.app.screenHeight - 120 + 'px'
      }
    }
  },
  methods: {
    changeForm(value) {
      this.formData = value
    }
  }
}
</script>

<style scoped>
</style>
