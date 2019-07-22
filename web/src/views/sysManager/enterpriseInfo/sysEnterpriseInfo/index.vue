<template>
  <div class="sysEnterpriseInfo-container">
      <basic-handler>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addUnit('add')" plain>新增单位</el-button>
       <!-- <el-button type="primary" size="small" icon="el-icon-if-save" plain>保存</el-button>-->
        <el-button type="primary" size="small" icon="el-icon-if-see" @click="addUnit('detail')" plain>查看</el-button>
       <!-- <el-button type="primary" size="small" icon="el-icon-star-off"  plain>批量审核</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" plain>批量禁用</el-button>
        <el-button type="primary" size="small" icon="el-icon-if-auth" plain>批量启用</el-button>
        <el-button type="primary" size="small" icon="el-icon-download" plain>导出</el-button>-->
        <el-button type="primary" size="small" icon="el-icon-refresh" @click="getInfo()" plain>刷新</el-button>
        <template slot="search">
          <basic-search ref="refBasicSearch" :isAdvancedQuery="true" :modelSearchFilter="modelSearchFilter"
                        @clickSearchFilter="clickSearchFilter"></basic-search>
        </template>
      </basic-handler>
      <div class="grid-content bg-purple">
        <el-table
          :height="heightSysEnterpriseInfoList"
          ref="refSysEnterpriseTable"
          :data="dataSysEnterpriseTable"
          border fit highlight-current-row stripe
          @current-change="handleCurrentRow"
          >
          <el-table-column
            label="序号"
            type="index"
            width="60" align="center">
          </el-table-column>
          <el-table-column
          align="center"
            prop="validateStatus"
            label="审核状态"
          :formatter="formatValidateStatus"
            width="80">
          </el-table-column>
          <el-table-column
            prop="enable"
            label="启用状态"
            align="center"
            width="80"
            :formatter="formatEnable"
          >
          </el-table-column>
          <el-table-column
            prop="code"
            label="单位编码"
            align="center"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位名称"
            min-width="100"
            align="left" header-align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="creditCode"
            label="信用代码"
            align="center"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="单位类型"
            align="center"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="legalPerson"
            label="法人代表"
            align="center"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="foundTime"
            label="成立日期"
            align="center"
            width="100"
            :formatter="formatDate"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="website"
            align="left" header-align="center"
            label="官方网站"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="remark"
            align="left" header-align="center"
            label="补充说明"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
      </el-table>
          <pagination
            :total="total"
            :page.sync="modelSearchFilter.page"
            :limit.sync="modelSearchFilter.limit"
            @pagination="getInfo"/>
  </div>
 </div>
</template>

<script>
import pagination from '@/components/Pagination'
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatBasic from "@/utils/mixins/formatBasic";
import formatEnum from "@/utils/mixins/formatEnum";
import {getUnitInfoList} from '@/api/sysManager/unit'
export default {
   name: 'hello',
  components: {
    pagination},
  mixins: [computed, methods, formatEnum,formatBasic],
  data() {
    return {
      dataSysEnterpriseTable: [],
      total: 0,
      heightSysEnterpriseInfoList:'0',
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: '',
        fuzzyKeys:''
      },
      currentRow: null
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      const offsetTopSysEnterpriseInfoList = this.$refs.refSysEnterpriseTable.$el.getBoundingClientRect().top;
      this.heightSysEnterpriseInfoList = this.getInnerHeight() - offsetTopSysEnterpriseInfoList - 55;
    });
  },
  watch: {
    screenHeight(innerHeight) {
      const offsetTopSysEnterpriseInfoList = this.$refs.refSysEnterpriseTable.$el.getBoundingClientRect().top;
      this.heightSysEnterpriseInfoList = innerHeight - offsetTopSysEnterpriseInfoList - 55;
    }
  },
  activated(){
    this.getInfo();
  },
  created() {
    //初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData',
    ]);
  },
  methods:{
    getInfo(){
        getUnitInfoList(this.modelSearchFilter).then((res)=>{
          if (!this.$utils.isEmpty(res.data)) {
            this.dataSysEnterpriseTable = res.data.rows;
            this.total = res.data.total;
            this.$nextTick(function () {
              if (this.$refs.refSysEnterpriseTable) {
                this.$refs.refSysEnterpriseTable.setCurrentRow(this.dataSysEnterpriseTable[0]);
              }
            });
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    /**
     * 关键字搜索
     */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refSysEnterpriseTable, this.modelSearchFilter, () => {
        this.getInfo();
      });
    },
    addUnit(param) {
      this.$store.dispatch("cacheId",'0');
      if (param === 'add') {
        this.$router.push({name: 'SysEnterpriseDetail',params: {id: 0}})
      } else {
        if (this.isSelectedRow(this.currentRow)) {
          this.$router.push({name: 'SysEnterpriseDetail', params: {id: this.currentRow.id}})
        }
      }
    },
    handleCurrentRow(row) {
      this.currentRow = row
    }
  }

}
</script>


