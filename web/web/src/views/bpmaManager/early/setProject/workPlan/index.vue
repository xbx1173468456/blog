<template>
  <basic-split-pane class="workPlan-container"
                    :default-percent='75'
                    :min-percent='25'>
        <template slot="leftContainer" >
          <div class="left-container">

            <div class="handler-container">
              <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                         @click="addClick('add')">新增方案</el-button>
              <el-button  v-if="viewBtnShowFlag"  type="primary" plain icon="el-icon-if-see" size="small"
                          :disabled="viewBtnDisabledFlag"
                          @click="addClick">查看</el-button>
              <basic-search ref="refBasicSearch"  :modelSearchFilter="search"
                            @clickSearchFilter="clickSearchFilter"></basic-search>

            </div>
            <template>
              <el-table

                ref="tableData"
                :data="tableData"
                border
                fit
                stripe
                :height="heightTableLeft"
                highlight-current-row
                @current-change="handleCurrentChange"
              >
                <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
                <el-table-column
                  prop="validateStatus"
                  label="审核状态"
                  width="80"
                  align="center"
                  :formatter="formatValidateStatus">
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="单据编码"
                  width="130"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="方案名称"
                  width="200"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="person"
                  label="编制人员"
                  width="100"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="完成日期"
                  width="120"
                  align="center"
                  :formatter="format"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="content"
                  label="方案内容"
                  min-width="200"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="补充说明"
                  width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="inputPerson"
                  label="登记人员"
                  width="140"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="inputTime"
                  label="登记时间"
                  width="160"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
               <!-- <el-table-column
                  v-for="item in tableTitle"
                  :key="item.id"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width"
                  :align="item.align"
                  show-overflow-tooltip
                ></el-table-column>-->
              </el-table>
            </template>
            <pagination
              :total="total"
              :page.sync="search.page"
              :limit.sync="search.limit"
              @pagination="getDataList"/>
          </div>
        </template>
        <template slot="rightContainer">
          <div class="right-container">
            <page-select-filter :selectData="selectData" :data="contractData" @change="contractChange"
                           v-model="selectValue" @refreshData="getProjectDataList"></page-select-filter>
          </div>
        </template>

  </basic-split-pane>
</template>

<script>
  import pagination from '@/components/Pagination'
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import {dateFormat} from "@/utils";
  import splitPane from 'vue-splitpane'
  import {getDictionaryDataByTypeFilter} from '@/api/common/dataDictionary'
  import {getProjectList, getContractReviews} from '@/api/bpmaManager/early/undertakeContract/change.js'
  export default {
    components: {
      pagination,
      splitPane
    },
    mixins: [computed, methods, formatEnum],
    data() {
      return {
        addBtnShowFlag:true, //待系统菜单配置
        viewBtnShowFlag:true,

      //  heightSplitPane:0, //左右拖动，需设高
        heightTableLeft:0,
        total: 0,
        search: {
          page:1,
          limit:10,
          proId:'',//切换项目
          fuzzy: '',
          fuzzyKeys:'',
        },

        tableData: [],
        selectValue: [],
        currentRow:null, //表格当前行
        selectData: {
          data: [],
          key: 'id',
          name: 'name'
        },//下拉框数据字典
        contractData: {
          name: 'name',
          key: 'stageId',
          data: []
        },//项目列表
        projectData: {
          data: []
        },

      }
    },
    activated(){
      this.getDataList()
    },
    async created() {

      //初始化数据字典
      this.getEnumData([ 'GetValidateStatusData']);
      const contractData = await getProjectList({page: 1, limit: 10000});
      const selectData = await getDictionaryDataByTypeFilter('SYS_PRO_STAGE');
      this.contractData.data = contractData.data.rows;
      this.selectData.data = selectData.data
      this.selectValue = selectData.data.map(item => item.id)
      let _self = this;
      this.$nextTick(() => {
        _self.heightInit(_self.getInnerHeight());
      });
    },

    computed: {

      viewBtnDisabledFlag () {
        return !(this.currentRow && this.currentRow.id);

      }

    },
    watch: {
      screenHeight(innerHeight) {
        this.heightInit(innerHeight);
      }
    },
    methods: {
      /**
       * 高度初始化
       * @param innerHeight
       */
      heightInit(innerHeight) {
        const offsetTopLeft = this.$refs.tableData.$el.getBoundingClientRect().top;

        this.heightTableLeft = innerHeight - offsetTopLeft - 55;

      },
      /*搜索切换项目列表*/
      contractChange(data) {
        this.proData = data
        if (!data) return this.tableData = []
        console.log(data)
        this.search = Object.assign({},this.search,{
          proId : data.id,
          proName : data.name,
          proCode: data.code
        })
        this.getDataList();
      },
      addClick(param) {
        this.$store.dispatch("cacheId",'0');
        if (param === 'add') {
          if(!this.$utils.isEmpty(this.proData)){
            this.$router.push({
              name: 'WorkPlanDetail',
              params: {id: 0},
              query: {proId: this.search.proId,proName:this.search.proName,proCode:this.search.proCode }
            })
          }else{
            this.$message({message:'当前无项目，无法新增方案!',type:'warning'})
          }
        } else {
          this.$router.push({name: 'WorkPlanDetail', params: {id: this.currentRow.id}})
        }

      },
      /**
       * 获取列表所有数据
       * */
      getDataList() {

            this.$store.dispatch('GetWorkPlanDataList',this.search).then((response) => {
              this.tableData = response.data.rows;
              this.total = response.data.total;

            }).catch(() => {
              console.log(23)
            })
      },
      /*获取可选项目列表*/
      getProjectDataList() {
        this.$store.dispatch('GetPropjectDataList',{page: 1, limit: 10000}).then((response) => {
          this.contractData.data = response.data.rows;
          console.log(response)
        }).catch(() => {
          console.log(23)
        })
      },
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.tableData, this.search, () => {
          this.getDataList();
        });
      },
      /*当前行*/
      handleCurrentChange(row) {
        this.currentRow = row;

        console.log(this.currentRow);
      },
      /**
       *  日期 格式化
       * */
      format(row, column, cellValue, index) {
        switch(column.property) {
          case'date':
            return dateFormat(row.date)
          default:
            return cellValue
        }
      },
    }
  }
</script>

<style scoped>
  /*  .table-row {
      padding: 10px 0;
    }
    .left-container {
      display: flex;
      flex-direction: column;
    }
    .table-row {
      flex: 1;
      overflow: hidden;
    }
    .el-table {
      height: 100%;
      overflow: auto;
    }*/
</style>
