<template>
  <el-button
    type="primary"
    v-if="id"
    plain
    @click="lookData"
    icon="el-icon-if-auth"
    size="small"
  >审批进度</el-button>
</template>

<script>
export default {
  props: {
    id: null
  },
  methods: {
    //查看详情
    lookData() {
      this.$pageProcessStep.open({
        id: this.id
      })
    }
  }
};
</script>

<style>
</style>
