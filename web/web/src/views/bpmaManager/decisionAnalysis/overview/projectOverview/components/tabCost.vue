<template>

    <basic-split-pane
      :min-percent='25'
      :default-percent='70'
      v-if="'cost' === activeName"
       v-on:resize="resize"
    >
      <template slot="leftContainer">
        <div class="left-container">
          <el-collapse v-model="costActiveNames">
            <el-collapse-item title="图表区" name="costChart">
              <transition name="slide-fade">
                <div
                  v-if="costActiveNames.includes('costChart')">
                  <div class="left-container">
                    <basic-chart ref="refCostChart"
                                 :id="'costChart'"
                                 :option="costOpt"
                    ></basic-chart>
                  </div>
                </div>
              </transition>
            </el-collapse-item>
            <el-collapse-item title="表格区" name="costTable">
              <transition name="slide-fade">
                <basic-table ref="refCostTableData" :showSummary="true"
                             :style="tableHeight"
                             :dataTable="costTableData"
                             :columns="columnsObj.columns"
                             @current-change="handleCurrentChange"
                             :pagination="modelSearchFilter"
                             @pagination="getCostTableData">
                   <template slot="slot-many-column">
                     <el-table-column label="收入" header-align="center" >
                       <el-table-column
                         v-for="item in columnsObj.income"
                         :prop="item.value"
                         :label="item.text"
                         :key="item.value"
                         :min-width="item.minWidth"
                         :width="item.width"
                         :align="item.align||'center'"
                         :header-align="item.headerAlign"
                         :show-overflow-tooltip="item.showOverflowTooltip"
                         :class-name="item.className"
                         :formatter="format"
                       >
                       </el-table-column>
                     </el-table-column>
                     <el-table-column label="成本" header-align="center">
                       <el-table-column
                         v-for="item in columnsObj.cost"
                         :prop="item.value"
                         :label="item.text"
                         :key="item.value"
                         :min-width="item.minWidth"
                         :width="item.width"
                         :align="item.align||'center'"
                         :header-align="item.headerAlign"
                         :show-overflow-tooltip="item.showOverflowTooltip"
                         :class-name="item.className"
                         :formatter="format"
                       >
                       </el-table-column>
                     </el-table-column>
                     <el-table-column label="利润" header-align="center">
                       <el-table-column
                         v-for="item in columnsObj.profit"
                         :prop="item.value"
                         :label="item.text"
                         :key="item.value"
                         :min-width="item.minWidth"
                         :width="item.width"
                         :align="item.align||'center'"
                         :header-align="item.headerAlign"
                         :show-overflow-tooltip="item.showOverflowTooltip"
                         :class-name="item.className"
                         :formatter="format"
                       >
                       </el-table-column>
                     </el-table-column>
                   </template>
                </basic-table>
              </transition>
            </el-collapse-item>

          </el-collapse>
        </div>
      </template>
      <template slot="rightContainer">
        <div class="right-container">
          <el-collapse v-model="costDetailActiveNames">
            <el-collapse-item title="图表区" name="costDetailChart">
              <transition name="slide-fade">
                <div  v-if="costDetailActiveNames.includes('costDetailChart')">
                  <div class="left-container">
                    <basic-chart ref="refCostDetailChart"
                                 :id="'costDetailChart'"
                                 :option="costDetailOpt"
                                 :chartTypeData="'pie'"
                    ></basic-chart>
                  </div>
                </div>

              </transition>
            </el-collapse-item>
            <el-collapse-item title="表格区" name="costDetailTable">
              <transition name="slide-fade">
                <basic-table ref="refCostDetailTableData"
                             :showSummary="true"
                             :isPagination="false"
                             :dataTable="costDetailTableData"
                             :columns="detailColumns"
                             :style="detailTableHeight"
                >
                  <template slot-scope="obj" slot="costPrice">
                    {{formatToThousands(obj.scope.row.costPrice)}}
                  </template>
                </basic-table>
              </transition>
            </el-collapse-item>

          </el-collapse>
        </div>
      </template>


    </basic-split-pane>

</template>

<script>
  import splitPane from 'vue-splitpane'
  import formatBasic from "@/utils/mixins/formatBasic";
  /**
   * api
   * */
  import {
    getCostChart,
    getCostTable,
    getCostDetail
  } from '@/api/bpmaManager/decisionAnalysis/overview/projectOverview'
    export default {
        name: 'tabCost',
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
            splitPaneHeight:{
              height:'1200px'
            },
            tableHeight:{
              height:'500px!important'
            },
            detailTableHeight:{
              height:'300px!important'
            },
            filterIds:undefined,
            costActiveNames:['costChart','costTable'],
            costDetailActiveNames:['costDetailChart','costDetailTable'],
            costOpt: null,
            costBarData: null,
            costTableData:{
              data: [],
              total:0
            },
            currentRow:null,
            modelSearchFilter:{
              page:1,
              limit:10,
            },
            columnsObj:{
              columns:[{
                text: '项目名称',
                value: 'proName',
                minWidth: '200',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              }],
              income:[
                {
                  text: '税前收入',
                  value: 'befIncomePrice',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '销项税',
                  value: 'incomeTax',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '税后收入',
                  value: 'afterIncomePrice',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }
              ],
              cost:[
                {
                  text: '税前成本',
                  value: 'befCostPrice',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '进项税',
                  value: 'costTax',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '税后成本',
                  value: 'afterCostPrice',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }
              ],
              profit:[
                {
                  text: '税前利润',
                  value: 'befProfits',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '税后利润',
                  value: 'afterProfits',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }
              ]
            },

            costDetailOpt: null,
            costDetailBarData: null,
            costDetailTableData:{
              data: [],
              total:0
            },
            detailColumns:[
              {
                text: '成本类型',
                value: 'name',
                width: '80',
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              }, {
                text: '税前成本',
                value: 'costPrice',
                minWidth: '150',
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              }, {
                text: '百分占比(%)',
                value: 'percentage',
                width: '120',
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              },
            ]
          }
      },
      mounted() {
          let _this = this
        this.bus.$on('change',function (ids) {
          _this.filterIds = ids
          console.log('bus on  cost _this.filterIds',_this.filterIds)
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
          this.getCostTableData()
          this.getCostBarData(newVal)
        },
        filterIds(newVal) {
          this.$set(this.modelSearchFilter,'proId',newVal)
          this.getCostTableData()
          this.getCostBarData(newVal)
        },
        costBarData:{
          handler(newVal){
            this.costOption(newVal)
          },
          deep:true
        },
        activeName(newVal){
          if(newVal === 'cost'){
              this.$nextTick( ()=>{
                if(this.costTableData.data && this.costTableData.data.length > 0){
                if(this.$refs.refCostTableData) {
                  this.$refs.refCostTableData.setCurrentRow(this.costTableData.data[0])
                }
                }
              })
          }
        },

        currentRow:{
          handler(newVal){
            if(newVal && newVal.proId){
              this.getCostDetailTableData(newVal.proId)
            }
          },
          deep: true
        }
      },
      methods:{
        resize() {
          this.$refs.refCostChart.chartResize()
          this.$refs.refCostDetailChart.chartResize()
        },
        /**
         * 当前行
         * */
        handleCurrentChange(row){
          this.currentRow = row
          console.log(row)
        },
        costOption(dataObj){
          this.costOpt = {
            title: {
              text: '产值',
              x: '5%',
            },
            grid: { // 图表位置
              left: '15%',
              bottom:'10%'
            },
            legend: {
              data: ['税前收入', '税后收入','税前成本','税后成本'],
            },
            xAxis: {
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
              /*  type: 'value',
                splitNumber:15 //坐标轴的分割段数*/
            },
            series: [
              {
                name: '税前收入',
                type: 'bar',
                data: dataObj.befIncomePriceList,
                /*label:{
                  show:true,
                  position:'top'
                }*/
              },
              {
                name: "税后收入",
                type: 'bar',
                data: dataObj.afterIncomePriceList,
                /*label:{
                  show:true,
                  position:'top'
                }*/
              },
              {
                name: "税前成本",
                type: 'bar',
                data: dataObj.befCostPriceList,
                /*label:{
                  show:true,
                  position:'top'
                }*/
              },
              {
                name: "税后成本",
                type: 'bar',
                data: dataObj.afterCostPriceList,
                /*label:{
                  show:true,
                  position:'top'
                }*/
              }
            ]
          }
        },
        getCostTableData(){
          return getCostTable(this.modelSearchFilter).then((res) =>{
            if(res && res.status===200){
            console.log('CostTable res',res)
            this.costTableData.data = res.data.data.rows
            this.costTableData.total = res.data.data.total
              this.$nextTick( ()=>{
                if(this.costTableData.data && this.costTableData.data.length > 0){
                  if(this.$refs.refCostTableData) {
                    this.$refs.refCostTableData.setCurrentRow(this.costTableData.data[0])
                  }
                }
              })
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err =>console.log(err))
        },
        getCostBarData(ids){
          return getCostChart(ids).then((res) =>{
            if(res && res.status===200){
            console.log('CostChart res',res)
            this.costBarData = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err =>console.log(err))
        },

        getCostDetailTableData(id){
          return getCostDetail(id).then((res) =>{
            if(res && res.status===200){
            console.log('CostDetailTable res',res)
            this.costDetailTableData.data = res.data
            this.costDetailOption(res.data)
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err =>console.log(err))
        },
        costDetailOption(dataObj){
          this.costDetailOpt = {
            title: {
              text: '成本',
              x: '5%',
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              data: ['物资', '机械','分包','费用'],
            },
            series: [
              {
                name: '成本',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:dataObj
              }
            ]
          }
        },

        format(row, column, cellValue, index){
          return this.$utilsBasic.toThousands(cellValue)
        }
      }
    }
</script>

<style scoped>

</style>
