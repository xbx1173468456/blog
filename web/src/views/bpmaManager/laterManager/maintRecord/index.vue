<template>
  <basic-split-pane class="maintRecord-container"
                    :default-percent='75'
                    :min-percent='25'>
    <template  slot="leftContainer">
      <div class="left-container">
        <basic-handler>
          <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                     @click="addClick('add')">新增维保</el-button>
          <el-button  v-if="viewBtnShowFlag"  type="primary" plain icon="el-icon-if-see" size="small"
                      :disabled="viewBtnDisabledFlag"
                      @click="addClick">查看</el-button>

          <template slot="search">
            <basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilter"
                          @clickSearchFilter="clickSearchFilter"></basic-search>
          </template>
        </basic-handler>

        <basic-table ref="refMaintRecordTableData"
                     :dataTable="maintRecordTableData"
                     :columns="columns"
                     @current-change="handleCurrentChange"
                     :pagination="modelSearchFilter"
                     @pagination="getAllMaintRecordData"

        >
          <template slot-scope="obj" slot="validateStatus">
            {{formatValidateStatus(obj.scope.row)}}
          </template>
          <template slot-scope="obj" slot="totalPrice">
            {{formatToThousands(obj.scope.row.totalPrice)}}
          </template>
          <template slot-scope="obj" slot="labourPrice">
            {{formatToThousands(obj.scope.row.labourPrice)}}
          </template>
          <template slot-scope="obj" slot="devicePrice">
            {{formatToThousands(obj.scope.row.devicePrice)}}
          </template>
          <template slot-scope="obj" slot="otherPrice">
            {{formatToThousands(obj.scope.row.otherPrice)}}
          </template>

          <template slot-scope="obj" slot="ifFinish">
            {{formatIsOrNot(obj.scope.row.ifFinish)}}
          </template>
          <template slot-scope="obj" slot="handleDate">
            {{formatDate(obj.scope.row.handleDate)}}
          </template>


        </basic-table>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container" >
        <page-select-filter :selectData="selectData" :data="maintRecordData" v-model="selectValue" @change="contractChange" @refreshData="getAllItem"></page-select-filter>
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
    getLastMaintenanceDataList
  } from "@/api/bpmaManager/laterManager/maintRecord"
  import {getDictionaryDataByTypeFilter,getProjectList} from '@/api/common/dataDictionary'
    export default {
        name: 'maintRecord',
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
              maintRecordTableData:{
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
                  text: '单据名称',
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
                  text: '维保费用',
                  value: 'totalPrice',
                  width: '150',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '人工费',
                  value: 'labourPrice',
                  width: '150',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }, {
                  text: '设备费',
                  value: 'devicePrice',
                  width: '150',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '其他费用',
                  value: 'otherPrice',
                  width: '150',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }, {
                  text: '费用说明',
                  value: 'priceExplain',
                  width: '130',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }, {
                  text: '维保人员',
                  value: 'handlePerson',
                  width: '130',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '是否完成',
                  value: 'ifFinish',
                  width: '80',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '完成日期',
                  value: 'handleDate',
                  width: '130',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '维保部位/设备',
                  value: 'device',
                  width: '140',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '维保内容',
                  value: 'content',
                  width: '140',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '补充说明',
                  value: 'remark',
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
              maintRecordData: {
                name: 'name',
                key: 'stageId',
                data: []
              },
              selectValue: [],
            }
      },
      activated(){
        this.getAllMaintRecordData()
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

            return this.maintRecordTableData.data = []
          }
          this.modelSearchFilter = Object.assign({},this.modelSearchFilter,{
            proId : data.id,
            proName : data.name,
            proCode: data.code
          })
          this.getAllMaintRecordData();
        },

        addClick(param) {
          this.$store.dispatch("cacheId",'0');
          if (param === 'add') {
            if(!this.$utils.isEmpty(this.proData)){
              this.$router.push({
                name: 'maintRecordDetail',
                params: {id: 0},
                query: {name: this.modelSearchFilter.proName,proId:this.modelSearchFilter.proId,proCode:this.modelSearchFilter.proCode}
              })
            }else{
              this.$message({message:'当前无项目，无法新增维保记录!',type:'warning'})
            }
          } else {
            this.$router.push({name: 'maintRecordDetail', params: {id: this.currentRow.id}})
          }
        },
        /**
         * 获取列表所有数据
         * */
        getAllMaintRecordData () {
          // console.log('this.modelSearchFilter',this.modelSearchFilter)
          getLastMaintenanceDataList(this.modelSearchFilter).then( (res) => {
            if(res.status && res.status === 200){

              this.maintRecordTableData.data = res.data.rows;
              this.maintRecordTableData.total = res.data.total;
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
              this.$set(this.maintRecordData,'data',res.data.rows)
              console.log('maintRecordData',this.maintRecordData.data)
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
          this.$refs.refBasicSearch.searchFilter(this.$refs.refMaintRecordTableData, this.modelSearchFilter, () => {
            this.getAllMaintRecordData();
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
