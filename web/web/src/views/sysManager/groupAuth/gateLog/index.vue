<template>
  <div class="gateLog-container flex-layout">
    <div class="handler-container min-height36">
      <el-form :inline="true" class="right">
        <el-form-item>
          <el-input clearable  size="small" @keyup.enter.native.prevent="handleFilter" v-model="modelSearchFilter.name" placeholder="请输入操作人姓名">
            <i class="el-icon-search el-input__icon"
               slot="suffix">
            </i>
          </el-input>
        </el-form-item>
        <el-form-item class="advanced-query">
          <el-button type="primary" size="small" icon="el-icon-if-query" plain>高级查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table ref="refGateLog" :key='tableKey' :data="list"
              border fit highlight-current-row stripe
              :height="heightGateLog">
      <el-table-column
        label="序号"
        type="index"
        width="60" align="center">
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="菜单" show-overflow-tooltip>
        <template slot-scope="scope">
  <span>
    {{scope.row.menu}}</span>
        </template>

      </el-table-column>
      <el-table-column width="200px" align="center" label="操作">
        <template slot-scope="scope">
  <span>
    {{scope.row.opt}}</span>
        </template>

      </el-table-column>
      <el-table-column width="200px" align="left" label="资源路径" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
  <span>
    {{scope.row.uri}}</span>
        </template>

      </el-table-column>
      <el-table-column width="200px" align="center" label="操作时间">
        <template slot-scope="scope">
  <span>
    {{scope.row.crtTime}}</span>
        </template>

      </el-table-column>
      <el-table-column width="200px" align="center" label="操作人ID">
        <template slot-scope="scope">
  <span>
    {{scope.row.crtUser}}</span>
        </template>

      </el-table-column>
      <el-table-column width="200px" align="center" label="操作人">
        <template slot-scope="scope">
  <span>
    {{scope.row.crtName}}</span>
        </template>

      </el-table-column>
      <el-table-column width="200px" align="center" label="操作主机">
        <template slot-scope="scope">
  <span>
    {{scope.row.crtHost}}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit" @pagination="getList" />
  </div>
</template>

<script>
  import pagination from '@/components/Pagination'
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import {
    page
  } from '@/api/sysManager/groupAuth/gateLog/index';

  export default {
    name: 'gateLog',
    mixins: [computed, methods],
    components: {pagination},
    data() {
      return {
        list: [],
        total: 0,
        heightGateLog:'0',

        modelSearchFilter: {
          page: 1,
          limit: 10,
          crtName: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        gateLogManager_btn_edit: '1',
        gateLogManager_btn_del: '1',
        gateLogManager_btn_add: '1',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    created() {
      this.getList();
    },
    mounted: function () {
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
    methods: {
      /**
       * 高度初始化
       * @param innerHeight
       */
      heightInit(innerHeight) {
        const offsetTopGateLog = this.$refs.refGateLog.$el.getBoundingClientRect().top;
        this.heightGateLog = innerHeight - offsetTopGateLog - 55;
      },
      getList() {

        page(this.modelSearchFilter).then(response => {
          this.list = response.data.rows;
          this.total = response.data.total;

        })
      },
      handleFilter() {
        this.getList();
      },
    }
  }
</script>
