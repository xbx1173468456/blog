<template>
    <el-collapse v-model="financeActiveNames"
                v-if="'finance' === activeName">
      <el-collapse-item title="图表区" name="financeChart"  >
        <transition name="slide-fade">
          <div class="splitPane-container"
               v-if="financeActiveNames.includes('financeChart')">
            <div class="left-container">
              <basic-chart ref="refFinanceChart"
                           :id="'financeChart'"
                           :option="financeOpt"
              ></basic-chart>
            </div>
          </div>
        </transition>
      </el-collapse-item>
      <el-collapse-item  title="表格区" name="financeTable" >
        <transition name="slide-fade">
          <basic-table ref="refFinanceTableData" :showSummary="true"
                     :dataTable="financeTableData"
                     :columns="columns"
                     @current-change="handleCurrentChange"
                     :pagination="modelSearchFilter"
                     @pagination="getFinanceTableData">
          <template slot-scope="obj" slot="budgetPrice">
            {{formatToThousands(obj.scope.row.budgetPrice)}}
          </template>
          <template slot-scope="obj" slot="expensePrice">
            {{formatToThousands(obj.scope.row.expensePrice)}}
          </template>
          <template slot-scope="obj" slot="diffPrice">
            {{formatToThousands(obj.scope.row.diffPrice)}}
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
    getFinanceChart,
    getFinanceTable
  } from '@/api/bpmaManager/decisionAnalysis/overview/projectOverview'
    export default {
        name: 'tabFinance',
      mixins: [formatBasic],
      props:{
        initIdsData:String,
        activeNameData:String,
      },
      data(){
       return {
         filterIds: undefined,
         financeActiveNames: ['financeChart', 'financeTable'],
         financeOpt: null,
         financeBarData: null,
         financeTableData:{
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
             text: '预算总额',
             value: 'budgetPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '报销总额',
             value: 'expensePrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           },{
             text: '预实差额',
             value: 'diffPrice',
             width: '200',
             align: "right",
             headerAlign: "center",
             showOverflowTooltip: true
           }
         ]
       }
      },
      mounted(){
        let _this = this
        this.bus.$on('change',function (ids) {
          _this.filterIds = ids
          console.log('bus on  finance _this.filterIds', _this.filterIds)
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
          this.getFinanceTableData()
          this.getFinanceBarData(newVal)
        },
        filterIds(newVal) {
          this.$set(this.modelSearchFilter,'proId',newVal)
          this.getFinanceTableData()
          this.getFinanceBarData(newVal)
        },
        financeBarData:{
          handler(newVal){
            this.financeOption(newVal)
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
        financeOption(dataObj){
          this.financeOpt = {
            title: {
              text: '费用',
              x: '5%',
            },
            grid: { // 图表位置
              left: '15%',
              bottom:'10%'
            },
            legend: {
              data: ['报销总额', '预算总额'],
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
                name: '报销总额',
                type: 'bar',
                data: dataObj.expensePriceList,
                /*label:{
                  show:true,
                  position:'top'
                }*/
              },
              {
                name: "预算总额",
                type: 'bar',
                data: dataObj.budgetPriceList,
                /*label:{
                  show:true,
                  position:'top'
                }*/
              }
            ]
          }
        },
        getFinanceTableData(){
          return getFinanceTable(this.modelSearchFilter).then((res) =>{
            if(res && res.status===200){
              console.log('FinanceTable res',res)
              this.financeTableData.data = res.data.data.rows
              this.financeTableData.total = res.data.data.total
            }else{
              this.$message({message:res.message,type:'warning'})
            }


          }).catch(err =>console.log(err))
        },
        getFinanceBarData(ids){
         return getFinanceChart(ids).then((res) =>{
           if(res && res.status===200){
            console.log('FinanceChart res',res)
           this.financeBarData = res.data
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
