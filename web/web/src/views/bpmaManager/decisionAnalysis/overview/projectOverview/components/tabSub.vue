<template>
    <el-collapse v-model=" subActiveNames"
                v-if="'sub' === activeName">
      <el-collapse-item title="图表区" name="subChart"  >
        <transition name="slide-fade">
          <div class="splitPane-container"
               v-if="subActiveNames.includes('subChart')">
            <div class="left-container">
              <basic-chart ref="refSubChart"
                           :id="'subChart'"
                           :option="subOpt"
              ></basic-chart>
            </div>
          </div>
        </transition>
      </el-collapse-item>
      <el-collapse-item  title="表格区" name="subTable" >
        <transition name="slide-fade">
          <basic-table ref="refSubTableData" :showSummary="true"
                     :dataTable="subTableData"
                     :columns="columns"
                     @current-change="handleCurrentChange"
                     :pagination="modelSearchFilter"
                     @pagination="getSubTableData">
          <template slot-scope="obj" slot="contractPrice">
            {{formatToThousands(obj.scope.row.contractPrice)}}
          </template>
          <template slot-scope="obj" slot="laborPrice">
            {{formatToThousands(obj.scope.row.laborPrice)}}
          </template>
          <template slot-scope="obj" slot="countPrice">
            {{formatToThousands(obj.scope.row.countPrice)}}
          </template>
          <template slot-scope="obj" slot="visaPrice">
            {{formatToThousands(obj.scope.row.visaPrice)}}
          </template>
          <template slot-scope="obj" slot="claimPrice">
            {{formatToThousands(obj.scope.row.claimPrice)}}
          </template>
          <template slot-scope="obj" slot="awardPrice">
            {{formatToThousands(obj.scope.row.awardPrice)}}
          </template>
          <template slot-scope="obj" slot="punishPrice">
            {{formatToThousands(obj.scope.row.punishPrice)}}
          </template>
          <template slot-scope="obj" slot="totalCostPrice">
            {{formatToThousands(obj.scope.row.totalCostPrice)}}
          </template>
        </basic-table>
        </transition>
      </el-collapse-item>
    </el-collapse>
</template>

<script>
  import formatBasic from "@/utils/mixins/formatBasic";
  /**
   * api
   * */
  import {
    getSubChart,
    getSubTable
  } from '@/api/bpmaManager/decisionAnalysis/overview/projectOverview'
    export default {
        name: 'tabSub',
      mixins: [formatBasic],
      props:{
        initIdsData:String,
        activeNameData:String,
      },
      data(){
       return {
         filterIds: undefined,
         subActiveNames: ['subChart', 'subTable'],
         subOpt: null,
         subBarData: null,
         subTableData:{
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
             text: '签约总额',
             value: 'contractPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '用工总额',
             value: 'laborPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '计量总额',
             value: 'countPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '签证总额',
             value: 'visaPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '索赔总额',
             value: 'claimPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '奖励总额',
             value: 'awardPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '扣罚总额',
             value: 'punishPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '成本合计',
             value: 'totalCostPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },
         ]
       }
      },
      mounted(){
        let _this = this
        this.bus.$on('change',function (ids) {
          _this.filterIds = ids
          console.log('bus on  sub _this.filterIds', _this.filterIds)
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
          this.getSubTableData()
          this.getSubBarData(newVal)
        },
        filterIds(newVal) {
          this.$set(this.modelSearchFilter,'proId',newVal)
          this.getSubTableData()
          this.getSubBarData(newVal)
        },
        subBarData:{
          handler(newVal){
            this.subOption(newVal)
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
        subOption(dataObj){
          this.subOpt = {
            title: {
              text: '分包',
              x: '5%',
            },
            grid: { // 图表位置
              left: '15%',
              bottom:'10%'
            },
            legend: {
              data: ['签约金额', '收入合计'],
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
              /*  splitNumber:15 //坐标轴的分割段数*/
            },
            series: [
              {
                name: '签约金额',
                type: 'bar',
                data: dataObj.contractPriceList,
                /*label:{
                  show:true,
                  position:'top'
                }*/
              },
              {
                name: "收入合计",
                type: 'bar',
                data: dataObj.totalCostPriceList,
                /*label:{
                  show:true,
                  position:'top'
                }*/
              }
            ]
          }
        },
        getSubTableData(){
          return getSubTable(this.modelSearchFilter).then((res) =>{
            if(res && res.status===200){
              console.log('SubTable res',res)
              this.subTableData.data = res.data.data.rows
              this.subTableData.total = res.data.data.total
            }else{
              this.$message({message:res.message,type:'warning'})
            }


          }).catch(err =>console.log(err))
        },
        getSubBarData(ids){
         return getSubChart(ids).then((res) =>{
           if(res && res.status===200){
            console.log('SubChart res',res)
           this.subBarData = res.data
           }else{
             this.$message({message:res.message,type:'warning'})
           }
          }).catch(err =>console.log(err))
        },
      }
    }
</script>

<style scoped>
  .splitPane-container{
    height: auto;
  }
</style>
