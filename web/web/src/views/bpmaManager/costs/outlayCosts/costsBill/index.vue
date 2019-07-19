<template>
  <basic-container class="costsBill-container">
    <basic-handler>
      <costs-search @handle-search="handleSearch" @handle-reset="handleReset"
                    :costTypeShowFlag="true"
                    :billTypeShowFlag="false"
      ></costs-search>
    </basic-handler>
      <basic-table ref="refCostsBillTableData"
                   :height="costsBillTableHeight"
                   :dataTable="costsBillTableData"
                   :columns="columns"
                   @current-change="handleCurrentChange"
                   :pagination="modelSearchFilter"
                   @pagination="getAllCostsBillData"

      >

        <template slot-scope="obj" slot="billType">
          {{formatProCostBillType(obj.scope.row)}}
        </template>
        <template slot-scope="obj" slot="costType">
          {{formatProCostType(obj.scope.row)}}
        </template>
        <template slot-scope="obj" slot="billDate">
          {{formatDate(obj.scope.row.billDate)}}
        </template>
        <template slot-scope="obj" slot="costSum">
          {{formatToThousandsFour(obj.scope.row.costSum)}}
        </template>
        <template slot-scope="obj" slot="costUnitPrice">
          {{formatToThousandsFour(obj.scope.row.costUnitPrice)}}
        </template>
        <template slot-scope="obj" slot="costPrice">
          {{formatToThousands(obj.scope.row.costPrice)}}
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
  import {getAllCostsBill} from '@/api/bpmaManager/costs/outlayCosts/costsBill'
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
            costsBillTableHeight:100,
            costsBillTableData:{
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
                text: '成本类型',
                value: 'costType',
                width: 80,
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '单据类型',
                value: 'billType',
                width: 100,
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              }/*,{
                text: '单据主键',
                value: 'billId',
                width: 120,
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              }*/,{
                text: '单据编码',
                value: 'billCode',
                width: 130,
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '单据名称',
                value: 'billName',
                width: 150,
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
              },/*{
                text: '单据明细主键',
                value: 'billDetailId',
                width: 160,
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '资源主键',
                value: 'resourceId',
                width: 160,
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },*/{
                text: '资源编码',
                value: 'resourceCode',
                width: 130,
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '资源名称',
                value: 'resourceName',
                width: 200,
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '规格型号',
                value: 'resourceModel',
                width: 100,
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '计量单位',
                value: 'resourceUnit',
                width: 100,
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '成本数量',
                value: 'costSum',
                width: 120,
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '成本单价',
                value: 'costUnitPrice',
                width: 120,
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '成本金额',
                value: 'costPrice',
                width: 150,
                align: "right",
                headerAlign: "center",
                showOverflowTooltip: true
              }
            ],


          }
      },
      created(){
        //初始化数据字典
        this.getEnumData([
          'GetProCostTypeEnum',
          'GetProCostBillTypeEnum'
        ]);
        let _self = this;
        this.$nextTick(() => {
          _self.heightInit(_self.getInnerHeight());
        });
      },
      mounted(){
        this.getAllCostsBillData()
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
          const offsetTopGateLog = this.$refs.refCostsBillTableData.$el.getBoundingClientRect().top;
          this.costsBillTableHeight = innerHeight - offsetTopGateLog - 55;
        },
        /**
         * 当前行
         * */
        handleCurrentChange(row) {
          console.log(row)
        },
        getAllCostsBillData(){
          return getAllCostsBill(this.modelSearchFilter).then((res) =>{
            if(res && res.status ===200){
              console.log("costsBill res",res)
              this.costsBillTableData.data = res.data.rows
              this.costsBillTableData.total = res.data.total
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
          this.getAllCostsBillData()
        },
        handleReset(filter){
          this.modelSearchFilter = Object.assign({},this.modelSearchFilter,filter)
          console.log('handleReset filter',this.modelSearchFilter)
          this.getAllCostsBillData()
        }
      }

    }
</script>

<style scoped>

</style>
