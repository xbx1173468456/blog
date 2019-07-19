<template>
  <basic-container class="handler-table">
    <basic-handler>
      <el-button v-if="userManager_btn_add" type="primary" size="small" icon="el-icon-plus" plain
                 @click="clickUserManagerAdd('add')">新增人员
      </el-button>
      <el-button v-if="userManager_btn_detail" type="primary" size="small" icon="el-icon-if-see" plain
                 @click="clickUserManagerAdd('detail')">查看
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="getUserManagerData()" plain>刷新</el-button>
      <template slot="search">
        <basic-search ref="refBasicSearch" :isAdvancedQuery="true" :modelSearchFilter="modelSearchFilter"
                      @clickSearchFilter="clickSearchFilter"></basic-search>
      </template>
    </basic-handler>
    <div class="table-container">
      <el-table ref="refUserManagerTable" :key="tableKey" :data="dataUserManager" :height="500"
                border fit highlight-current-row stripe
                @current-change="clickUserManagerCurrentRow">
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
          prop="code"
          label="系统编码"
          width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="username"
          label="中文姓名"
          width="80" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="englishName"
          label="英文姓名"
          width="100" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="jobNumber"
          label="员工ID号"
          width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="ifOperate"
          label="是否操作员"
          width="100" align="center" :formatter="formatIfOperate">
        </el-table-column>
        <el-table-column
          prop="mobilePhone"
          label="登录手机号"
          width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="isAdmin"
          label="是否系统管理员"
          width="120" align="center" :formatter="formatIsAdmin" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="60" align="center" :formatter="formatSex">
        </el-table-column>
        <el-table-column label="名族" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.nation }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主岗岗位" align="left" header-align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.mainName }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit"
                  @pagination="getUserManagerData"/>
    </div>
  </basic-container>
</template>

<script>
import pagination from '@/components/Pagination'
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";
import {
  getUserManagerData
} from '@/api/sysManager/groupAuth/userManager/index'

export default {
  name: 'UserManager',
  components: {
    pagination},
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      dataUserManager: [],
      total: 0,
      modelSearchFilter: {
        page: 1,
        limit: 10,
        // selectOwn: '1',//查询是否自己添加操作人员
        fuzzy: '',
        fuzzyKeys: ''
      },
      userManager_btn_add: false,
      userManager_btn_detail: false,
      tableKey: 0,
      currentRowUserManager: null
    }
  },
  activated(){
    this.getUserManagerData();
  },
  created() {
    //初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData',
      'GetIsOrNotData',
      'GetGenderData'
    ]);
    this.userManager_btn_add = this.elements['userManager:btn_add'];
    this.userManager_btn_detail = this.elements['userManager:view'];
  },
  methods: {
    getUserManagerData() {
      getUserManagerData(this.modelSearchFilter)
        .then(response => {
          this.dataUserManager = response.data.rows;
          this.total = response.data.total;
          this.$nextTick(function () {
            if(this.$refs.refUserManagerTable){
              this.$refs.refUserManagerTable.setCurrentRow(this.dataUserManager[0]);
            }
          });
        })
    },
    /**
     * 关键字搜索
     */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refUserManagerTable, this.modelSearchFilter, () => {
        this.getUserManagerData();
      });
    },
    clickUserManagerCurrentRow(row) {
      if(row){
        this.currentRowUserManager = row
      }
    },
    isSelectedRow() {
      if (this.currentRowUserManager === null) {
        this.$message({
          message: '请先选中一行',
          type: 'warning'
        })
        return false
      }
      return true
    },
    clickUserManagerAdd(param) {
      this.$store.dispatch("cacheId",'0');
      if (param === 'add') {
        this.$router.push({name: 'UserManagerDetail',params: {id: 0, sign: 'add'}})
      } else {
        if (this.isSelectedRow()) {
          this.$router.push({name: 'UserManagerDetail', params: {id: this.currentRowUserManager.id}})
        }
      }
    }
  }
}
</script>
