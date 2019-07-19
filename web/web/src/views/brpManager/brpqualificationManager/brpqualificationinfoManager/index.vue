<template>
  <div class="app-container brpqualificationinfoManager-container">
    <basic-handler>
      <el-button type="primary" icon="el-icon-plus" plain @click="addTetails" size="small">
        新增资证
      </el-button>
      <el-button type="primary" icon="el-icon-if-see" plain @click="lookTetails" size="small" :disabled="status">
        查看
      </el-button>
      <!--<el-button type="primary" size="small" icon="el-icon-refresh" @click="getDataList()" plain>
        刷新
      </el-button>-->
      <template slot="search">
        <basic-search ref="refBasicSearch"  :modelSearchFilter="search"
                      @clickSearchFilter="clickSearchFilter"></basic-search>
      </template>
    </basic-handler>


    <el-table
      ref="singleTable"

      :data="dataList"
      border
      fit
      stripe
      :height="heightGateLog"
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
        prop="enable"
        label="启用状态"
        width="80" align="center" :formatter="formatEnable">
      </el-table-column>
      <el-table-column
        prop="borrowStatus"
        label="外借状态"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="code"
        label="系统编码"
        width="130" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="name"
        label="资证名称"
        min-width="200"
        align="left"
        header-align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="originalCode"
        width="130"
        label="原始编码"
        align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="authorizeOrg"
        label="发证机构"
        width="140"
      align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="obtainDate"
        label="获取日期"
        width="130" align="center" :formatter="formatDate">
      </el-table-column>
      <el-table-column
        prop="expiryDate"
        label="截止日期"
        width="130" align="center" :formatter="formatDate">
      </el-table-column>
      <el-table-column
        prop="borrowPerson"
        label="外借人员"
        width="100"
        align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="borrowDate"
        label="外借日期"
        width="130" align="center" :formatter="formatDate">
      </el-table-column>
      <el-table-column
        prop="returnDate"
        label="归还日期"
        width="130" align="center" :formatter="formatDate">
      </el-table-column>
      <el-table-column
        prop="borrowReason"
        label="外借事由"
        width="130"
        align="left"
        header-align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="补充说明"
        width="130"
        align="left"
        header-align="center"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
      <pagination
        :total="total"
        :page.sync="search.page"
        :limit.sync="search.limit"
        @pagination="getDataList"/>
  </div>
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
          dataList:[],
          heightGateLog: '0',

          currentPage: 10,
          row: null,
          status: true,
          total: 0,
          search: {
            page: 1,
            limit: 10,
            fuzzy: '',
            fuzzyKeys: ''
          }
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
        let _self = this;
        this.$nextTick(() => {
          _self.heightInit(_self.getInnerHeight());
        });
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
          const offsetTopGateLog = this.$refs.singleTable.$el.getBoundingClientRect().top;
          this.heightGateLog = innerHeight - offsetTopGateLog - 55;
        },
        /*获取资证列表*/
        getDataList() {

          this.$store.dispatch('GetQualificationInfo', this.search).then((response) => {
            this.dataList = response.data.rows;
            this.total = response.data.total;
            if(response.data.rows){
              this.$refs.singleTable.setCurrentRow(response.data.rows[0]);
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        /*获取当前行对象*/
        currentRow(row){
          this.row = row;
          if (this.row && this.row.id) {
            this.status = false;
          }
        },
        /*切换至详情*/
        addTetails() {
          this.$store.dispatch("cacheId",'0');
          this.$router.push({name: 'brpqualificationinfoDetails',params: {id: 0}})
        },
        lookTetails() {
          this.$store.dispatch("cacheId",'0');
          this.$router.push({name: 'brpqualificationinfoDetails', params: {id: this.row.id}})
        },

        /**
         * 关键字搜索
         */
        clickSearchFilter() {
          this.$refs.refBasicSearch.searchFilter(this.$refs.singleTable, this.search, () => {
            this.getDataList();
          });
        },

      }
    }
</script>

<style scoped>

</style>
