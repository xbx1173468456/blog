<template>
  <basic-container class="outputBill-container">
    <basic-handler>
      <costs-search @handle-search="handleSearch" @handle-reset="handleReset"></costs-search>
    </basic-handler>
      <basic-table ref="refOutputBillTableData"
                   :height="outputBillTableHeight"
                   :dataTable="outputBillTableData"
                   :columns="columns"
                   @current-change="handleCurrentChange"
                   :pagination="modelSearchFilter"
                   @pagination="getAllOutputBillData"

      >
        <template slot-scope="obj" slot="billPrice">
          {{formatToThousands(obj.scope.row.billPrice)}}
        </template>
        <template slot-scope="obj" slot="billType">
          {{formatProIncomeType(obj.scope.row)}}
        </template>
        <template slot-scope="obj" slot="billDate">
          {{formatDate(obj.scope.row.billDate)}}
        </template>
      </basic-table>
  </basic-container>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";
  import costsSearch from '@/views/bpmaManager/costs/components/costsSearch.vue'

  /**
  * api
  * */
  import {getAllOutputBill} from '@/api/bpmaManager/costs/income/outputBill'
    export default {
        name: 'index',
      mixins: [computed, methods, formatEnum,formatBasic],
      components:{
        costsSearch
      },
      data(){
          return {
            modelSearchFilter: {
              page:1,
              limit:10,
              fuzzy: '',
              fuzzyKeys:'',
            },
            outputBillTableHeight:100,
            outputBillTableData:{
              data: [],
              total:0
            },
            columns: [ //表格列
              /*{
                text: '数据主键',
                value: 'id',
                width: '120',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '用户主键',
                value: 'userId',
                width: 120,
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '单位授权码',
                value: 'authCode',
                width: 100,
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '单据主键',
                value: 'billId',
                width: 130,
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },*/{
                text: '单据编码',
                value: 'billCode',
                width: 130,
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '单据名称',
                value: 'billName',
                width: 200,
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },/*{
                text: '项目主键',
                value: 'proId',
                width: 120,
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },*/{
                text: '项目名称',
                value: 'proName',
                minWidth: 200,
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '单据金额',
                value: 'billPrice',
                width: 150,
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '业务类型',
                value: 'billType',
                width: 120,
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '业务日期',
                value: 'billDate',
                width: 110,
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '登记人员',
                value: 'inputPerson',
                width: 160,
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '登记时间',
                value: 'inputTime',
                width: 160,
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },
            ],


          }
      },
      created(){
        //初始化数据字典
        this.getEnumData([
          'GetProIncomeTypeEnum',
        ]);
        let _self = this;
        this.$nextTick(() => {
          _self.heightInit(_self.getInnerHeight());
        });
      },
      mounted(){
        this.getAllOutputBillData()
      },
      watch: {
        screenHeight(innerHeight) {
          this.heightInit(innerHeight);
        }
      },
      methods:{
        /**
         * 高度初始化
         * @param innerHeight
         */
        heightInit(innerHeight) {
          const offsetTopGateLog = this.$refs.refOutputBillTableData.$el.getBoundingClientRect().top;
          this.outputBillTableHeight = innerHeight - offsetTopGateLog - 55;
        },
        /**
         * 当前行
         * */
        handleCurrentChange(row) {
          console.log(row)
        },
        getAllOutputBillData(){
          return getAllOutputBill(this.modelSearchFilter).then((res) =>{
            if(res && res.status ===200){
              console.log("outputBill res",res)
              this.outputBillTableData.data = res.data.rows
              this.outputBillTableData.total = res.data.total
            }else{
              this.$message({
                message:res.message,
                type:"warning"
              })
            }
          }).catch(err => console.log(err))
        },
        handleSearch(filter){
          this.modelSearchFilter = Object.assign({},this.modelSearchFilter,filter)
          console.log('handleSearch filter',this.modelSearchFilter)
          this.getAllOutputBillData()
        },
        handleReset(filter){
          this.modelSearchFilter = Object.assign({},this.modelSearchFilter,filter)
          console.log('handleReset filter',this.modelSearchFilter)
          this.getAllOutputBillData()
        }
      }

    }
</script>

<style scoped>

</style>
