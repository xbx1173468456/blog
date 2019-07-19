<template>
    <el-collapse v-model=" outputValueActiveNames"
                v-if="'outputValue' === activeName">
      <el-collapse-item title="图表区" name="outputValueChart"  >
        <transition name="slide-fade">
          <div class="splitPane-container"
               v-if="outputValueActiveNames.includes('outputValueChart')">
            <div class="left-container">
              <basic-chart ref="refOutputValueChart"
                           :id="'outputValueChart'"
                           :option="outputValueOpt"
              ></basic-chart>
            </div>
          </div>
        </transition>
      </el-collapse-item>
      <el-collapse-item  title="表格区" name="outputValueTable" >
        <transition name="slide-fade">
          <basic-table ref="refOutputValueTableData" :showSummary="true"
                     :dataTable="outputValueTableData"
                     :columns="columns"
                     @current-change="handleCurrentChange"
                     :pagination="modelSearchFilter"
                     @pagination="getOutputValueTableData">
          <template slot-scope="obj" slot="contractPrice">
            {{formatToThousands(obj.scope.row.contractPrice)}}
          </template>
          <template slot-scope="obj" slot="outPutPrice">
            {{formatToThousands(obj.scope.row.outPutPrice)}}
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
          <template slot-scope="obj" slot="totalPrice">
            {{formatToThousands(obj.scope.row.totalPrice)}}
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
    getOutputValueChart,
    getOutputValueTable
  } from '@/api/bpmaManager/decisionAnalysis/overview/projectOverview'
    export default {
        name: 'tabOutputValue',
      mixins: [formatBasic],
      props:{
        initIdsData:String,
        activeNameData:String,
      },
      data(){
       return {
         filterIds: undefined,
         outputValueActiveNames: ['outputValueChart', 'outputValueTable'],
         outputValueOpt: null,
         outputValueBarData: null,
         outputValueTableData:{
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
             text: '签约金额',
             value: 'contractPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '产值结算',
             value: 'outPutPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '工程签证',
             value: 'visaPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '工程索赔',
             value: 'claimPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '奖  励',
             value: 'awardPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '扣  罚',
             value: 'punishPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '收入 合计',
             value: 'totalPrice',
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
          console.log('bus on  outputValue _this.filterIds', _this.filterIds)
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
          this.getOutputValueTableData()
          this.getOutputValueBarData(newVal)
        },
        filterIds(newVal) {
          this.$set(this.modelSearchFilter,'proId',newVal)
          this.getOutputValueTableData()
          this.getOutputValueBarData(newVal)
        },
        outputValueBarData:{
          handler(newVal){
            this.outputValueOption(newVal)
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
        outputValueOption(dataObj){
          this.outputValueOpt = {
            title: {
              text: '产值',
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
              type: 'category',
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
                data: dataObj.totalPriceList,
                /*label:{
                  show:true,
                  position:'top'
                }*/
              }
            ]
          }
        },
        getOutputValueTableData(){
          return getOutputValueTable(this.modelSearchFilter).then((res) =>{
            if(res && res.status===200){
              console.log('OutputValueTable res',res)
              this.outputValueTableData.data = res.data.data.rows
              this.outputValueTableData.total = res.data.data.total
            }else{
              this.$message({message:res.message,type:'warning'})
            }


          }).catch(err =>console.log(err))
        },
        getOutputValueBarData(ids){
         return getOutputValueChart(ids).then((res) =>{
           if(res && res.status===200){
            console.log('OutputValueChart res',res)
           this.outputValueBarData = res.data
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
