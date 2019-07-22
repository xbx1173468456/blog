<template>
  <basic-split-pane class="trackRecord-container"
                    :default-percent='75'
                    :min-percent='25'>
    <template  slot="leftContainer">
      <div class="left-container">
        <basic-handler>
          <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                     @click="addClick('add')">新增跟踪记录</el-button>
          <el-button  v-if="viewBtnShowFlag"  type="primary" plain icon="el-icon-if-see" size="small"
                      :disabled="viewBtnDisabledFlag"
                      @click="addClick">查看</el-button>

          <template slot="search">
            <basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilter"
                          @clickSearchFilter="clickSearchFilter"></basic-search>
          </template>
        </basic-handler>

        <basic-table ref="refTrackRecordTableData"
                     :dataTable="trackRecordTableData"
                     :columns="columns"
                     @current-change="handleCurrentChange"
                     :pagination="modelSearchFilter"
                     @pagination="getAllTrackRecordData"

        >
          <template slot-scope="obj" slot="validateStatus">
            {{formatValidateStatus(obj.scope.row)}}
          </template>
          <template slot-scope="obj" slot="date">
            {{formatDate(obj.scope.row.date)}}
          </template>
        </basic-table>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container" >
        <page-select-filter :selectData="selectData" :data="trackRecordData" v-model="selectValue" @change="contractChange" @refreshData="getAllItem"></page-select-filter>
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
    getAllTrackRecord,
    getAllTrackRecordItem
  } from "@/api/bpmaManager/early/itemInfo/trackRecord/index.js"
  import { getDictionaryDataByTypeFilter }from '@/api/common/dataDictionary.js'
    export default {
        name: 'trackRecord',
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
              trackRecordTableData:{
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
                  text: '项目名称',
                  value: 'proName',
                  minWidth: '200',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },{
                  text: '跟踪方式',
                  value: 'way',
                  width: '100',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },{
                  text: '跟踪日期',
                  value: 'date',
                  width: '100',
                  align: "center",
                  showOverflowTooltip:true
                },{
                  text: '跟踪主题',
                  value: 'topic',
                  width: '100',
                  align: "center",
                  showOverflowTooltip:true
                },
                {
                  text: '我方人员',
                  value: 'ourPerson',
                  width: '100',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },{
                  text: '对方人员',
                  value: 'theirPerson',
                  width: '100',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },
                {
                  text: '跟踪内容',
                  value: 'content',
                  width: '140',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },{
                  text: '取得成果',
                  value: 'result',
                  width: '140',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },{
                  text: '补充说明',
                  value: 'remark',
                  width: '140',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },{
                  text: '登记人员',
                  value: 'inputPerson',
                  width: '100',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip:true
                },{
                  text: '登记时间',
                  value: 'inputTime',
                  width: '160',
                  align: "center",
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
              trackRecordData: {
                name: 'name',
                key: 'stageId',
                data: []
              },
              selectValue: [],
            }
      },
      activated(){
        this.getAllTrackRecordData();
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

            return this.trackRecordTableData.data = []
          }
          this.modelSearchFilter = Object.assign({},this.modelSearchFilter,{
            proId : data.id,
            proName : data.name,
            proCode: data.code
          })
          this.getAllTrackRecordData();
        },

        addClick(param) {
          this.$store.dispatch("cacheId",'0');
          if (param === 'add') {
            if(!this.$utils.isEmpty(this.proData)){
              this.$router.push({
                name: 'trackRecordDetail',
                params: {id: 0},
                query: {name: this.modelSearchFilter.proName,proId:this.modelSearchFilter.proId,proCode:this.modelSearchFilter.proCode}
              })
            }else{
              this.$message({message:'当前无项目，无法新增记录!',type:'warning'})
            }
          } else {
            this.$router.push({name: 'trackRecordDetail', params: {id: this.currentRow.id}})
          }
        },
        /**
         * 获取列表所有数据
         * */
        getAllTrackRecordData () {
          // console.log('this.modelSearchFilter',this.modelSearchFilter)
          getAllTrackRecord(this.modelSearchFilter).then( (res) => {
            if(res.status && res.status === 200){

              this.trackRecordTableData.data = res.data.rows;
              this.trackRecordTableData.total = res.data.total;
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
          getAllTrackRecordItem({page: 1, limit: 10000}).then((res) =>{

            if(res.status && res.status === 200){
              console.log('获取项目所有数据',res)

              //this.subContractChangeData.data = res.data.rows;
              this.$set(this.trackRecordData,'data',res.data.rows)
              console.log('trackRecordData',this.trackRecordData.data)
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
          this.$refs.refBasicSearch.searchFilter(this.$refs.refTrackRecordTableData, this.modelSearchFilter, () => {
            this.getAllTrackRecordData();
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
