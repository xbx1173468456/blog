<template>
  <basic-split-pane :default-percent='50' :min-percent='3'>
    <template  slot="leftContainer">
      <div class="left-container">
        <page-box-card title="待办事宜" type="task"></page-box-card>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container" >
        <page-box-card title="待阅消息" type="message"></page-box-card>
      </div>
    </template>
  </basic-split-pane>
  <!--<div class="eoaManager-container-index">-->
    <!--<el-row :gutter="10">-->
      <!--<el-col :span="12">-->
        <!--<page-box-card title="待办事宜" type="task"></page-box-card>-->
      <!--</el-col>-->
      <!--<el-col :span="12">-->
        <!--<page-box-card title="待阅消息" type="message"></page-box-card>-->
      <!--</el-col>-->
    <!--</el-row>-->
  <!--</div>-->
</template>

<script>
  import pageBoxCard from '@/views/components/page/pageBoxCard'

  export default {
    name: "eoaManagerIndex",
    components: {pageBoxCard}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .eoaManager-container-index1 {
    height: 100%;
    background: url('../../assets/img/home/eoa.jpg') no-repeat;
    background-size: 100% 100%;
  }
</style>
