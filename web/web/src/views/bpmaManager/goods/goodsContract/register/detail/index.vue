<template>
  <el-tabs type="border-card" :style="windowHeight">
    <el-tab-pane label="合同信息">
      <contract-info @formData="changeForm"></contract-info>
    </el-tab-pane>
    <el-tab-pane label="合同清单" :disabled="!formData.id">
      <contract-tood-list :formData="formData"></contract-tood-list>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import contractInfo from './contractInfo'
import contractToodList from './contractToodList'
export default {
  name: 'contractDetail',
  data() {
    return {
      formData: {}
    }
  },
  components: {
    contractInfo,
    contractToodList
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
