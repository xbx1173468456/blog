<template>
    <basic-container class=" projectOverview-container">
      <basic-handler>
        <overview-search ref="refSearch"></overview-search>
      </basic-handler>

        <el-tabs type="border-card"
                 class="projectOverview-tabs margin-top10"
                 v-model="activeName"
                 @tab-click="handleTabClick"
        >
           <el-tab-pane label="项目">项目</el-tab-pane>
          <el-tab-pane label="进度" name="progress">
            <tab-progress :initIdsData ="initIds" :activeNameData="activeName"></tab-progress>
          </el-tab-pane>
            <el-tab-pane label="产值" name="outputValue">
              <tab-output-value :initIdsData ="initIds" :activeNameData="activeName"></tab-output-value>
            </el-tab-pane>
            <el-tab-pane label="成本" name="cost">
              <tab-cost :initIdsData ="initIds" :activeNameData="activeName"></tab-cost>
            </el-tab-pane>
            <el-tab-pane label="物资" name="goods">
              <tab-goods :initIdsData ="initIds" :activeNameData="activeName"></tab-goods>
            </el-tab-pane>
            <el-tab-pane label="分包" name="sub">
              <tab-sub :initIdsData ="initIds" :activeNameData="activeName"></tab-sub>
            </el-tab-pane>
            <el-tab-pane label="费用" name="finance">
              <tab-finance :initIdsData ="initIds" :activeNameData="activeName"></tab-finance>
            </el-tab-pane>
          <el-tab-pane label="资金" name="money">
            <tab-money :initIdsData ="initIds" :activeNameData="activeName"></tab-money>

          </el-tab-pane>
        </el-tabs>


    </basic-container>
</template>

<script>
import overviewSearch from "@/views/bpmaManager/decisionAnalysis/overview/projectOverview/components/overviewSearch"
  import tabOutputValue from "@/views/bpmaManager/decisionAnalysis/overview/projectOverview/components/tabOutputValue"
  import tabProgress from "@/views/bpmaManager/decisionAnalysis/overview/projectOverview/components/tabProgress"
import tabMoney from "@/views/bpmaManager/decisionAnalysis/overview/projectOverview/components/tabMoney"
  import tabCost from "@/views/bpmaManager/decisionAnalysis/overview/projectOverview/components/tabCost"
  import tabGoods from "@/views/bpmaManager/decisionAnalysis/overview/projectOverview/components/tabGoods"
import tabSub from "@/views/bpmaManager/decisionAnalysis/overview/projectOverview/components/tabSub"
import tabFinance from "@/views/bpmaManager/decisionAnalysis/overview/projectOverview/components/tabFinance"


/**
 * api
 * */
import {
  getProject
} from '@/api/bpmaManager/decisionAnalysis/overview/projectOverview'
export default {
  name: 'projectOverview',
  components: {
    overviewSearch,
    tabProgress,
    tabOutputValue,
    tabMoney,
    tabCost,
    tabGoods,
    tabSub,
    tabFinance
  },
  data() {
    return {
      initIds:undefined,
     activeName:'progress',
    //  activeName:'money',
    }
  },
  mounted() {
    this.getProIdsData()
  },
  methods: {
    /**
     * 获取项目初始ids
     * **/
    getProIdsData(){
      return getProject().then((res) =>{
        if(res.status === 200){
          this.initIds = res.data.map(item =>item.id).join(',')
        }else{
          this.$message({ message:res.message,type:'warning' })
        }
      }).catch(err=>console.log(err))
    },



    handleTabClick(tab, event) {
      switch (tab.name) {
        case 'progress':
         // this.getProgressData()
          break;
        case 'money':
        //  this.getIncomeData()
         // this.getPayData()
          break;

      }
    }
  }
}
</script>

<style scoped>
.el-tabs--border-card{
  min-height: calc(100vh - 160px)
}
</style>
