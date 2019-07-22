<template>
  <basic-container class="handler-table">
    <div class="handler-container">
      <el-button type="primary" icon="el-icon-plus" plain @click="addTetails" size="small">
        新增记录
      </el-button>
      <el-button type="primary" icon="el-icon-if-see" plain @click="lookTetails" :disabled="status" size="small">
        查看
      </el-button>
      <basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilter"
                    @clickSearchFilter="clickSearchFilter"></basic-search>
    </div>
    <div class="table-container">
      <el-table
        :key="tableKey"
        ref="singleTable"
        :data="dataList"
        border
        fit
        stripe
        :height="500"
        highlight-current-row stripe
        @current-change="currentRow">
        <el-table-column
          label="序号"
          type="index"
          width="60" align="center">
        </el-table-column>
        <el-table-column
          prop="validateStatus"
          label="审核状态"
          width="80" align="center" :formatter="formatValidateStatus">
        </el-table-column>
        <el-table-column
          prop="code"
          label="单位编码"
          width="130" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="单位名称"
          min-width="200"
          header-align="center"
          align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="usePerson"
          label="使用人员"
          width="120"
          align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="useTime"
          label="使用日期"
          :formatter="formatDate"
          align="center"
          width="130">
        </el-table-column>
        <el-table-column
          prop="useReason"
          width="160"
          label="使用事由"
          header-align="center"
          align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="补充说明"
          width="200"
          header-align="center"
          align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="inputPerson"
          label="登记人员"
          width="250"
          align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="inputTime"
          label="登记日期"
          align="center"
          width="160">
        </el-table-column>
      </el-table>
      <div class="pagebox">
        <pagination

          :total="total"
          :page.sync="modelSearchFilter.page"
          :limit.sync="modelSearchFilter.limit"
          @pagination="getDataList"/>
      </div>
    </div>

  </basic-container>
</template>

<script>
  import pagination from '@/components/Pagination'
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";

  import formatBasic from "@/utils/mixins/formatBasic";

  export default {
    components: {pagination},
    mixins: [computed, methods, formatEnum,formatBasic],
    data() {
      return {
        dataList: [],
        row: null,
        status: true,
        total: 0,
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: '',
          fuzzyKeys: ''
        },
        tableKey: 0,
      }
    },
    activated(){
      this.getDataList()
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetEnabledData'
      ]);
    },
    mounted() {
      this.getDataList();
    },
    methods: {
      /*获取资证列表*/
      getDataList() {
        this.$store.dispatch('GetQualificationUseMaster', this.modelSearchFilter).then((response) => {
          this.dataList = response.data.rows;
          this.total = response.data.total;
          if(response.data.rows){
            this.$refs.singleTable.setCurrentRow(response.data.rows[0]);
          }
        }).catch(() => {
          console.log(23)
        })
      },
      /*获取当前行对象*/
      currentRow(row) {
        this.row = row;
        if (this.row && this.row.id) {
          this.status = false;
        }
      },
      /*切换至详情*/
      addTetails() {
        this.$store.dispatch("cacheId",'0');
        this.$router.push({name: 'useRecordManagerDetails',params: {id: 0}})
      },
      lookTetails() {
        this.$store.dispatch("cacheId",'0');
        this.$router.push({name: 'useRecordManagerDetails', params: {id: this.row.id}})
      },

      /**
       * 搜索按钮
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.singleTable, this.modelSearchFilter, () => {
          this.getDataList();
        });
      },

    }
  }
</script>

<style scoped>

</style>
