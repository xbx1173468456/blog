<template>
  <el-collapse v-model="moneyActiveNames"
               v-if="'money' === activeName"
  >
    <el-collapse-item title="图表区" name="moneyChart">
      <transition name="slide-fade">
        <div class="splitPane-container"
             v-if="moneyActiveNames.includes('moneyChart')">
          <div class="left-container">
            <basic-chart ref="refIncomeChart"
                         :id="'payChart'"
                         :option="moneyIncomeOpt"
            ></basic-chart>
            <basic-chart ref="refPayChart"
                         :id="'incomeChart'"
                         :option="moneyPayOpt"
                         class="margin-top10"
            ></basic-chart>
          </div>
        </div>
      </transition>
    </el-collapse-item>
    <el-collapse-item title="表格区" name="moneyTable">
      <transition name="slide-fade">
        <div>
          <basic-table ref="refMoneyIncomeTableData" :showSummary="true"
                       :dataTable="moneyIncomeTableData"
                       :columns="columnsIncome"
                       @current-change="handleCurrentChange"
                       :pagination="modelSearchFilter"
                       @pagination="getMoneyIncomeTableData">
            <template slot-scope="obj" slot="price">
              {{formatToThousands(obj.scope.row.price)}}
            </template>
            <template slot-scope="obj" slot="beforeTaxPrice">
              {{formatToThousands(obj.scope.row.beforeTaxPrice)}}
            </template>
            <template slot-scope="obj" slot="payPrice">
              {{formatToThousands(obj.scope.row.payPrice)}}
            </template>
            <template slot-scope="obj" slot="norePrice">
              {{formatToThousands(obj.scope.row.norePrice)}}
            </template>
            <template slot-scope="obj" slot="diffPrice">
              {{formatToThousands(obj.scope.row.diffPrice)}}
            </template>
          </basic-table>
          <basic-table ref="refMoneyPayTableData"
                       class="margin-top10"
                       :showSummary="true"
                       :dataTable="moneyPayTableData"
                       :columns="columnsPay"
                       @current-change="handleCurrentChangeMoneyPay"
                       :pagination="modelSearchFilter"
                       @pagination="getMoneyPayTableData">
            <template slot-scope="obj" slot="price">
              {{formatToThousands(obj.scope.row.price)}}
            </template>
            <template slot-scope="obj" slot="beforeTaxPrice">
              {{formatToThousands(obj.scope.row.beforeTaxPrice)}}
            </template>
            <template slot-scope="obj" slot="payPrice">
              {{formatToThousands(obj.scope.row.payPrice)}}
            </template>
            <template slot-scope="obj" slot="norePrice">
              {{formatToThousands(obj.scope.row.norePrice)}}
            </template>
            <template slot-scope="obj" slot="diffPrice">
              {{formatToThousands(obj.scope.row.diffPrice)}}
            </template>
          </basic-table>
        </div>
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
    getIncomeTable,
    getPayTable,
    getIncomeBarChart,
    getPayBarChart } from '@/api/bpmaManager/decisionAnalysis/overview/projectOverview'

    export default {
        name: 'tabMoney',
      mixins: [formatBasic],
      props:{
        initIdsData:String,
        activeNameData:String,
      },
      data() {
        return {
          filterIds: undefined,
          moneyActiveNames: ['moneyChart', 'moneyTable'],
          moneyIncomeBarData: null,
          moneyPayBarData: null,
          moneyIncomeTableData:{
            data: [],
            total:0
          },
          moneyPayTableData:{
            data: [],
            total:0
          },
          modelSearchFilter:{
            page:1,
            limit:10,
          },

          moneyIncomeOpt:null,
          moneyPayOpt:null,

          columnsIncome:[
            {
              text: '项目名称',
              value: 'proName',
              minWidth: '200',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: '合同名称',
              value: 'contractName',
              width: '200',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: ' 应收总额',
              value: 'price',
              minWidth: '200',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: ' 开票总额',
              value: 'beforeTaxPrice',
              minWidth: '200',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: ' 实收总额',
              value: 'payPrice',
              minWidth: '200',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: ' 未收总额',
              value: 'norePrice',
              minWidth: '200',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: ' 票款差异',
              value: 'diffPrice',
              minWidth: '200',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            }],
          columnsPay:[
            {
              text: '项目名称',
              value: 'proName',
              minWidth: '200',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: '单位名称',
              value: 'subEnterpriseName',
              width: '200',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: ' 应付总额',
              value: 'price',
              minWidth: '200',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: ' 收票总额',
              value: 'beforeTaxPrice',
              minWidth: '200',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: ' 实付总额',
              value: 'payPrice',
              minWidth: '200',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: ' 未付总额',
              value: 'norePrice',
              minWidth: '200',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: ' 票款差异',
              value: 'diffPrice',
              minWidth: '200',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            }]
        }
      },
      mounted(){
        let _this = this
        this.bus.$on('change',function (ids) {
          _this.filterIds = ids
          console.log('bus on money _this.filterIds', _this.filterIds)
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
          this.getMoneyIncomeTableData()
          this.getMoneyPayTableData()
          this.getIncomeBarData(newVal)
          this.getPayBarData(newVal)
        },

        filterIds(newVal){
          this.$set(this.modelSearchFilter,'proId',newVal)
          this.getMoneyIncomeTableData()
          this.getMoneyPayTableData()
          this.getIncomeBarData(newVal)
          this.getPayBarData(newVal)
        },

        moneyIncomeBarData:{
          handler(newVal){
            this.incomeOption(newVal)
          },
          deep:true

        },
        moneyPayBarData:{
          handler(newVal){
            this.payOption(newVal)
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
        handleCurrentChangeMoneyPay(row){
          console.log(row)
        },
        getMoneyIncomeTableData(){
          return getIncomeTable(this.modelSearchFilter).then((res) =>{
            if(res && res.status===200){
              console.log('moneyIncomeTableData res',res)
              this.moneyIncomeTableData.data = res.data.rows
              this.moneyIncomeTableData.total = res.data.total
            }else{
              this.$message({message:res.message,type:'warning'})
            }


          }).catch(err =>console.log(err))
        },

        getMoneyPayTableData(){
          return getPayTable(this.modelSearchFilter).then((res) =>{
            if(res && res.status===200){
              console.log('moneyPayTableData res',res)
              this.moneyPayTableData.data = res.data.rows
              this.moneyPayTableData.total = res.data.total
            }else{
              this.$message({message:res.message,type:'warning'})
            }


          }).catch(err =>console.log(err))
        },

        /**
         * 资金-获取(收入)柱状图
         * */
        getIncomeBarData(ids){
          return getIncomeBarChart(ids).then((res)=>{
            if(res && res.status===200){
              // console.log('资金-获取(收入)',res)
              this.moneyIncomeBarData = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err=>console.log(err))
        },
        /**
         *  资金-获取(支出)柱状图
         * */
        getPayBarData(ids){
          return getPayBarChart(ids).then((res)=>{
            if(res && res.status===200){
              // console.log('资金-获取(支出)',res)
              this.moneyPayBarData = res.data
            }else{
              this.$message({message:res.message,type:'warning'})
            }
          }).catch(err=>console.log(err))
        },

        /**
         * 收款
         * */
        incomeOption(data){
          this.moneyIncomeOpt={
            title: {
              text: '收款',
              x: '12%',
            },
            tooltip: {},
            legend: {
              data: ['实收总额', '开票总额','应收总额'],
            },
            xAxis: {

              type: 'category',
              axisLabel:{
                rotate: 15, //名称15度倾斜
                interval:0, //显示所有标签
                formatter: function(value) {
                  if (value.length >6) {
                    return value.substring(0, 6) + "...";
                  } else {
                    return value;
                  }
                },
              },
              data:data.proNameList
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                name: '实收总额',
                type: 'bar',
                data:data.payPriceList,
               /* label:{
                  show:true,
                  position:'right'
                }*/
              },
              {
                name: "开票总额",
                type: 'bar',
                data:data.beforeTaxPriceList,
               /* label:{
                  show:true,
                  position:'right'
                }*/
              },
              {
                name: "应收总额",
                type: 'bar',
                data:data.priceList,
               /* label:{
                  show:true,
                  position:'right'
                }*/
              }
            ]
          }
        },


        /**
         * 付款
         * */
        payOption(data){
          this.moneyPayOpt ={
            title: {
              text: '付款',
              x: '12%',
            },
            tooltip: {},
            legend: {
              data: ['实付总额', '收票总额','应付总额'],
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
              data:data.proNameList
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                name: '实付总额',
                type: 'bar',
                data:data.payPriceList,
               /* label:{
                  show:true,
                  position:'right'
                }*/
              },
              {
                name: "收票总额",
                type: 'bar',
                data:data.beforeTaxPriceList,
               /* label:{
                  show:true,
                  position:'right'
                }*/
              },
              {
                name: "应付总额",
                type: 'bar',
                data:data.priceList,
                /*label:{
                  show:true,
                  position:'right'
                }*/
              }
            ]
          }
        },

      }
    }
</script>

<style scoped>
  .splitPane-container{
    height: 100%;
    min-height:500px
  }
</style>
