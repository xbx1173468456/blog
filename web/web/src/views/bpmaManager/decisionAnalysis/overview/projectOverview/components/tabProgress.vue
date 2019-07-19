<template>
  <el-collapse v-model="progressActiveNames"
               v-if="'progress' === activeName"
  >
    <el-collapse-item title="图表区" name="progressChart"  >
      <transition name="slide-fade">

        <split-pane class="splitPane-container"
                    v-on:resize="resize"
                    :min-percent='40'
                    :default-percent='50'
                    split="vertical"
                    :style="splitPaneHeight"
                    v-if="progressActiveNames.includes('progressChart')"
        >
          <template slot="paneL">
            <div class="left-container">
              <basic-chart ref="refScaleBar"
                           :id="'scaleBar'"
                           :option="scaleOpt"></basic-chart>
            </div>
          </template>
          <template slot="paneR">
            <div class="right-container">
              <basic-chart ref="refValueBar"
                           :id="'valueBar'"
                           :option="valueOpt"></basic-chart>
            </div>
          </template>
        </split-pane>
      </transition>
    </el-collapse-item>
    <el-collapse-item title="表格区" name="progressTable">
      <transition name="slide-fade">
        <basic-table ref="refProgressTableData" :showSummary="true"
                     :dataTable="progressTableData"
                     :columns="columns"
                     @current-change="handleCurrentChange"
                     :pagination="modelSearchFilter"
                     @pagination="getProgressTableData">
        </basic-table>
      </transition>
    </el-collapse-item>
  </el-collapse>



</template>

<script>
  import splitPane from 'vue-splitpane'
  import formatBasic from "@/utils/mixins/formatBasic";
  /**
   * api
   * */
  import {
    getProgressTable,
    getProgressBarChart
  } from '@/api/bpmaManager/decisionAnalysis/overview/projectOverview'
    export default {
        name: 'tabProgress',
      mixins: [formatBasic],
      components:{
        splitPane
      },
      props:{
        initIdsData:String,
        activeNameData:String,
      },
      data(){
          return {
            filterIds:undefined,
            progressBarData:null,
            progressActiveNames:['progressChart','progressTable'],
            progressTableData:{
              data: [],
              total:0
            },
            modelSearchFilter:{
              page:1,
              limit:10,
            },
            columns:[
              {
                text: '项目名称',
                value: 'proName',
                minWidth: '200',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '应该完成比例',
                value: '3',
                width: '110',
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '实际完成比例',
                value: '4',
                width: '110',
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '应完成产值',
                value: '5',
                width: '200',
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '实际完成产值',
                value: '6',
                width: '200',
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '调整后产值',
                value: '7',
                width: '200',
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '调整后开始',
                value: '8',
                width: '110',
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '调整后结束',
                value: '9',
                width: '110',
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '调整后日历天',
                value: '10',
                width: '110',
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '调整后工时天',
                value: '11',
                width: '110',
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '原计划产值',
                value: '12',
                width: '200',
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '原计划开始',
                value: '13',
                width: '110',
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '原计划结束',
                value: '14',
                width: '110',
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '原计划日历天',
                value: '15',
                width: '110',
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '原计划工时天',
                value: '16',
                width: '110',
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              }
              ],

            /**
             * 图表
             * */
            scaleOpt:null,
            valueOpt:null,
            splitPaneHeight:{
              height:'380px'
            }
          }
      },
      mounted(){
          let _this = this
          this.bus.$on('change',function (ids) {
            _this.filterIds = ids
            console.log('bus on progress _this.filterIds', _this.filterIds)
          })
      },
      computed:{
        initIds(){
          return this.initIdsData
        },
        activeName(){
          return this.activeNameData
        }
      },
      watch:{
        initIds(newVal){
          this.$set(this.modelSearchFilter,'proId',newVal)
          this.getProgressTableData()
          this.getProgressBarData(newVal)
        },

        filterIds(newVal){
          this.$set(this.modelSearchFilter,'proId',newVal)
          this.getProgressTableData()
          this.getProgressBarData(newVal)
        },

        progressBarData:{
          handler(newVal){
            this.scaleOption(newVal);
            this.valueOption(newVal);
          },
          deep:true

        },
      },
      methods:{
        /**
         * 当前行
         * */
        handleCurrentChange(row){
          console.log(row)
        },
        getProgressTableData(){
          return getProgressTable(this.modelSearchFilter).then((res) =>{
            if(res && res.status===200){
              console.log('progressTableData res',res)
              this.progressTableData.data = res.data.rows
              this.progressTableData.total = res.data.total
            }else{
              this.$message({message:res.message,type:'warning'})
            }


          }).catch(err =>console.log(err))
        },
        /**
         * 进度-获取条形图数据
         * */
        getProgressBarData(ids){
          return getProgressBarChart(ids).then((res)=>{
            if(res && res.status===200){
              // console.log('进度-获取',res)
              this.progressBarData = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err=>console.log(err))
        },


        resize() {
          this.$refs.refScaleBar.chartResize()
          this.$refs.refValueBar.chartResize()
        },
        /**
         * 进度比例
         * */
        scaleOption (dataObj){
          this.scaleOpt ={
            title: {
              text: '进度比例',
              x: '5%',
            },
            tooltip:{
              formatter: '{a}<br />{b}: {c}%'
            },
            grid: { // 图表位置
              left: '15%',
              bottom:'10%'
            },
            legend: {
              data: ['应该完成比例', '实际完成比例'],
            },

            xAxis: {
              type:'category',
              axisLabel:{
                rotate: 15, //名称15度倾斜
                interval:0, //显示所有标签
                formatter: function(value) {
                  if (value.length > 6) {
                    return value.substring(0, 6) + "...";
                  } else {
                    return value;
                  }
                },
              },
              data: dataObj.proNameList,
              triggerEvent: true,

            },
            yAxis: {
              type: 'value',
              axisLabel:{
                formatter:'{value}%'
              }
            },
            series: [
              {
                name: '应该完成比例',
                type: 'bar',
                data: dataObj.shouldScaleList,
                /*label:{
                  show:true,
                  position:'top'
                }*/
              },
              {
                name: "实际完成比例",
                type: 'bar',
                data: dataObj.finishScaleList,
               /* label:{
                  show:true,
                  position:'top'
                }*/
              }
            ]
          }
        },
        /**
         * 进度产值
         * */
        valueOption (dataObj){
          this.valueOpt={
            title: {
              text: '进度产值',
              x: '5%',
            },
            grid: { // 图表位置
              left: '15%',
              bottom:'10%'
            },
            legend: {
              data: ['应该完成产值', '实际完成产值'],
            },
            xAxis: {
              type:'category',
              axisLabel:{
                rotate: 15, //名称15度倾斜
                interval:0, //显示所有标签
                formatter: function(value) {
                  if (value.length > 6) {
                    return value.substring(0, 6) + "...";
                  } else {
                    return value;
                  }
                },
              },
              data: dataObj.proNameList
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                name: '应该完成产值',
                type: 'bar',
                data: dataObj.shouldValueList,
                /*label:{
                  show:true,
                  position:'top'
                }*/
              },
              {
                name: "实际完成产值",
                type: 'bar',
                data: dataObj.finishValueList,
                /*label:{
                  show:true,
                   position:'top'
                }*/
              }
            ]
          }
        },

      }
    }
</script>

<style scoped>

</style>
