<template>
  <basic-split-pane class="bpmaManager-container-list count-container"
                    :default-percent='75'
                    :min-percent='25'>
    <template  slot="leftContainer">
      <div class="left-container">
        <basic-handler>
          <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                     @click="addClick('add')">新增计量</el-button>
          <el-button  v-if="viewBtnShowFlag"  type="primary" plain icon="el-icon-if-see" size="small"
                      :disabled="viewBtnDisabledFlag"
                      @click="addClick">查看</el-button>

          <template slot="search">
            <basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilter"
                          @clickSearchFilter="clickSearchFilter"></basic-search>
          </template>
        </basic-handler>

        <basic-table ref="refCountTableData"
                     :dataTable="countTableData"
                     :columns="columns"
                     @current-change="handleCurrentChange"
                     :pagination="modelSearchFilter"
                     @pagination="getAllCountData"

        >
          <template slot-scope="obj" slot="validateStatus">
            {{formatValidateStatus(obj.scope.row)}}
          </template>
          <template slot-scope="obj" slot="beginDate">
            {{formatDate(obj.scope.row.beginDate)}}
          </template>
          <template slot-scope="obj" slot="expiryDate">
            {{formatDate(obj.scope.row.expiryDate)}}
          </template>
          <template slot-scope="obj" slot="totalPrice">
            {{formatToThousands(obj.scope.row.totalPrice)}}
          </template>
          <template slot-scope="obj" slot="ifPay">
            {{formatIfPay(obj.scope.row)}}
          </template>
          <template slot-scope="obj" slot="payedPrice">
            {{formatToThousands(obj.scope.row.payedPrice)}}
          </template>

        </basic-table>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container" >
        <page-select-filter :selectData="selectData" :data="countData" v-model="selectValue" @change="contractChange" @refreshData="getAllItem"></page-select-filter>
      </div>
    </template>

  </basic-split-pane>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";

  /**
   * api
   * */

  import {
    getAllCount,
    getAllCountItem
  } from "@/api/bpmaManager/subpackage/subValue/count/index.js"
  import { getDictionaryDataByTypeFilter }from '@/api/common/dataDictionary.js'
    export default {
        name: 'Count',
      // components: {
      //   pagination
      // },
      mixins: [computed, methods, formatEnum,formatBasic],
        data() {
            return {
              addBtnShowFlag:true, //待系统菜单配置
              viewBtnShowFlag:true,

              modelSearchFilter: {
                page:1,
                limit:10,
                fuzzy: '',
                fuzzyKeys:'',
                proId:undefined,
              },
              countTableData:{
                data: [],
                total:0
              },
              currentRow:null, //表格当前行
              columns:[ //表格列
                {
                  text: '审核状态',
                  value: 'validateStatus',
                  width: '80',
                  align: "center",
                },
                {
                  text: '单据编码',
                  value: 'code',
                  width: '130',
                  align: "center",
                  showOverflowTooltip:true
                },
                {
                  text: '单据名称',
                  value: 'name',
                  minWidth: 200,
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },
                {
                  text: '项目名称',
                  value: 'proName',
                  width: '200',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },
                {
                  text: '分包单位',
                  value: 'enterpriseName',
                  width: '100',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },
                {
                  text: '合同名称',
                  value: 'contractName',
                  width: '200',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },
                {
                  text: '开始日期',
                  value: 'beginDate',
                  width: '100',
                  align: "center",
                  showOverflowTooltip:true
                },
                {
                  text: '截止日期',
                  value: 'expiryDate',
                  width: '100',
                  align: "center",
                  showOverflowTooltip:true
                },
                {
                  text: '计量总额',
                  value: 'totalPrice',
                  width: '150',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },{
                  text: '是否结算',
                  value: 'ifPay',
                  width: '100',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },{
                  text: '结算金额',
                  value: 'payedPrice',
                  width: '150',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },
                {
                  text: '结算单号',
                  value: 'payedCode',
                  width: '130',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },
                {
                  text: '补充说明',
                  value: 'remark',
                  width: '140',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },
              ],

              proData:{},
              selectData: {
                data: [],
                key: 'id',
                name: 'name'
              },
              countData: {
                name: 'name',
                key: 'stageId',
                data: []
              },
              selectValue: [],
            }
      },
      activated(){
        this.getAllCountData()
      },
      created() {

        //初始化数据字典
        this.getEnumData([
          'GetValidateStatusData',
          'GetIsOrNotData'
        ]);

        this.getAllItem();
        this.getStage();

      },
      computed:{
        viewBtnDisabledFlag () {
          return !(this.currentRow && this.currentRow.id);
        }
      },
      methods:{
        contractChange(data) {

          this.proData = data;
          console.log('data',data)
          if (!data) {

            return this.countTableData.data = []
          }
          this.modelSearchFilter = Object.assign({},this.modelSearchFilter,{
            proId : data.id,
            proName : data.name,
            proCode : data.code
          })
          this.getAllCountData();
        },

        addClick(param) {
          this.$store.dispatch("cacheId",'0');
          if (param === 'add') {
            if(!this.$utils.isEmpty(this.proData)){
              this.$router.push({
                name: 'CountDetail',
                params: {id: 0},
                query: {name: this.modelSearchFilter.proName,proId:this.modelSearchFilter.proId,proCode:this.modelSearchFilter.proCode}
              })
            }else{
              this.$message({message:'当前无项目，无法新增计量单!',type:'warning'})
            }
          } else {
            this.$router.push({name: 'CountDetail', params: {id: this.currentRow.id}})
          }
        },
        /**
         * 获取计量列表所有数据
         * */
        getAllCountData () {
          // console.log('this.modelSearchFilter',this.modelSearchFilter)
          getAllCount(this.modelSearchFilter).then( (res) => {
            if(res.status && res.status === 200){

              this.countTableData.data = res.data.rows;
              this.countTableData.total = res.data.total;
              console.log('获取计量列表所有数据',res)
            }else{
              this.$message({message: res.message,type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
        },
        /**
         * 获取计量项目所有数据
         * */
        getAllItem () {
          getAllCountItem({page: 1, limit: 10000}).then((res) =>{

            if(res.status && res.status === 200){
              console.log('获取计量项目所有数据',res)

              //this.subContractChangeData.data = res.data.rows;
              this.$set(this.countData,'data',res.data.rows)
              console.log('countData',this.countData.data)
            }else{
              this.$message({message: res.message,type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
        },
        /**
         * 当前行
         * */
        handleCurrentChange(row) {
          console.log(row)
          this.currentRow = row
        },
        /**
         * 关键字搜索
         */
        clickSearchFilter() {
          this.$refs.refBasicSearch.searchFilter(this.$refs.refCountTableData, this.modelSearchFilter, () => {
            this.getAllCountData();
          });
        },
        /**
         * 前 中 后期
         * */
        getStage () {
          getDictionaryDataByTypeFilter('SYS_PRO_STAGE')
            .then( (res) => {
              if(res.status && res.status === 200){
                this.selectData.data = res.data;
                console.log('this.selectData.data',this.selectData.data)
                this.selectValue = this.selectData.data.map(item => item.id)
                console.log(this.selectValue)


              }else{
                this.$message({message: res.message,type: 'warning'})
              }
            })
        },
      }
    }
</script>

<style scoped>

</style>
