<template>
  <basic-split-pane class="completedReport-container"
                    :default-percent='75'
                    :min-percent='25'>
    <template  slot="leftContainer">
      <div class="left-container">
        <basic-handler>
          <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                     @click="addClick('add')">新增报告</el-button>
          <el-button  v-if="viewBtnShowFlag"  type="primary" plain icon="el-icon-if-see" size="small"
                      :disabled="viewBtnDisabledFlag"
                      @click="addClick">查看</el-button>

          <template slot="search">
            <basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilter"
                          @clickSearchFilter="clickSearchFilter"></basic-search>
          </template>
        </basic-handler>

        <basic-table ref="refCompletedReportTableData"
                     :dataTable="completedReportTableData"
                     :columns="columns"
                     @current-change="handleCurrentChange"
                     :pagination="modelSearchFilter"
                     @pagination="getAllCompletedReportData"

        >
          <template slot-scope="obj" slot="validateStatus">
            {{formatValidateStatus(obj.scope.row)}}
          </template>
          <template slot-scope="obj" slot="planBeginDate">
            {{formatDate(obj.scope.row.planBeginDate)}}
          </template>
         <template slot-scope="obj" slot="planFinishDate">
            {{formatDate(obj.scope.row.planFinishDate)}}
          </template>
         <template slot-scope="obj" slot="beginDate">
            {{formatDate(obj.scope.row.beginDate)}}
          </template>
         <template slot-scope="obj" slot="finishDate">
            {{formatDate(obj.scope.row.finishDate)}}
          </template>


        </basic-table>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container" >
        <page-select-filter :selectData="selectData" :data="completedReportData" v-model="selectValue" @change="contractChange" @refreshData="getAllItem"></page-select-filter>
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
    getLastFinishDataList
  } from "@/api/bpmaManager/laterManager/completedManager/completedReport"
  import {getDictionaryDataByTypeFilter,getProjectList} from '@/api/common/dataDictionary'
    export default {
        name: 'completedReport',
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
              completedReportTableData:{
                data: [],
                total:0
              },
              currentRow:null, //表格当前行
              columns: [ //表格列
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
                  showOverflowTooltip: true
                },
                {
                  text: '报告名称',
                  value: 'name',
                  minWidth: 200,
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '项目名称',
                  value: 'proName',
                  width: '200',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '合同名称',
                  value: 'contractName',
                  width: '200',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '项目经理',
                  value: 'projectManager',
                  width: '100',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '计划开工日期',
                  value: 'planBeginDate',
                  width: '130',
                  align: "center",
                  showOverflowTooltip: true
                }, {
                  text: '计划完工日期',
                  value: 'planFinishDate',
                  width: '130',
                  align: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '计划日历天',
                  value: 'planDays',
                  width: '100',
                  align: "center",
                  showOverflowTooltip: true
                }, {
                  text: '实际开工日期',
                  value: 'beginDate',
                  width: '130',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }, {
                  text: '实际完工日期',
                  value: 'finishDate',
                  width: '130',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '实际日历天',
                  value: 'days',
                  width: '100',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '报告说明',
                  value: 'incomeAccount',
                  width: '140',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }, {
                  text: '登记人员',
                  value: 'inputPerson',
                  width: '100',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }, {
                  text: '登记时间',
                  value: 'inputTime',
                  width: '160',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
              ],

              proData:{},
              selectData: {
                data: [],
                key: 'id',
                name: 'name'
              },
              completedReportData: {
                name: 'name',
                key: 'stageId',
                data: []
              },
              selectValue: [],
            }
      },
      activated(){
        this.getAllCompletedReportData()
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

            return this.completedReportTableData.data = []
          }
          this.modelSearchFilter = Object.assign({},this.modelSearchFilter,{
            proId : data.id,
            proName : data.name,
            proCode: data.code
          })
          this.getAllCompletedReportData();
        },

        addClick(param) {
          this.$store.dispatch("cacheId",'0');
          if (param === 'add') {
            if(!this.$utils.isEmpty(this.proData)){
              this.$router.push({
                name: 'completedReportDetail',
                params: {id: 0},
                query: {name: this.modelSearchFilter.proName,proId:this.modelSearchFilter.proId,proCode:this.modelSearchFilter.proCode}
              })
            }else{
              this.$message({message:'当前无项目，无法新增报告!',type:'warning'})
            }
          } else {
            this.$router.push({name: 'completedReportDetail', params: {id: this.currentRow.id}})
          }
        },
        /**
         * 获取列表所有数据
         * */
        getAllCompletedReportData () {
          // console.log('this.modelSearchFilter',this.modelSearchFilter)
          getLastFinishDataList(this.modelSearchFilter).then( (res) => {
            if(res.status && res.status === 200){

              this.completedReportTableData.data = res.data.rows;
              this.completedReportTableData.total = res.data.total;
              console.log('获取列表所有数据',res)
            }else{
              this.$message({message: res.message,type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
        },
        /**
         * 获取项目所有数据
         * */
        getAllItem () {
          getProjectList({page: 1, limit: 10000}).then((res) =>{

            if(res.status && res.status === 200){
              console.log('获取项目所有数据',res)

              //this.subContractChangeData.data = res.data.rows;
              this.$set(this.completedReportData,'data',res.data.rows)
              console.log('completedReportData',this.completedReportData.data)
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
          this.$refs.refBasicSearch.searchFilter(this.$refs.refCompletedReportTableData, this.modelSearchFilter, () => {
            this.getAllCompletedReportData();
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
