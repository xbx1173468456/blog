<template>
  <div class="work-container-list">
    <el-row>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addLog()" plain>新增通知</el-button>
          <el-button type="primary" size="small" icon="el-icon-if-see" @click="showDetail" plain>查看</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-refresh"
            @click="getLogs(1,10)"
            plain
          >刷新</el-button>
        </div>
      </el-col>
      <el-col :span="10" class="fr">
        <div class="handler-container">
          <el-form :inline="true" class="right">
            <el-form-item>
              <el-input
                clearable
                size="small"
                @keyup.enter.native.prevent="query"
                v-model="fuzzy"
                placeholder="请输入关键字"
              >
                <i class="el-icon-search el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item class="advanced-query">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-if-query"
                plain
                @click="query"
              >高级查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <logTable
      :tableData="tableData"
      :columns="columns"
      :page="page"
      @handleCurrentChange="handleCurrentChange"
      @currentPage="currentPage"
      ref="logTable"
    ></logTable>
  </div>
</template>

<script>
import logTable from "./components/logTable";
import { selectNews } from "@/api/eoaManager/notice/index.js";
export default {
  name: "Hello",
  data() {
    return {
      editableTabsValue: "",
      rowId: "",
      fuzzy: "",
      columns: [
        {
          text: "审核状态",
          value: "validateStatus",
          width: "80"
        },
        {
          text: "通知编码",
          value: "code",
          width: "160"
        },
        {
          text: "发布机构",
          value: "sendOrg",
          align: "left"
        },
        {
          text: "通知标题",
          value: "title",
          align: "left"
        },
        {
          text: "登记人员",
          value: "inputPerson",
          width: "160"
        },
        {
          text: "登记日期",
          value: "inputTime",
          width: "160"
        }
      ],
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      tableData: []
    };
  },
  methods: {
    //获取日志
    getLogs(page, limit, fuzzy) {
      this.page.currentPage = page;
      this.page.pageSize = limit;
      let data = {
        page: page,
        limit: limit,
        fuzzy: fuzzy
      };
      selectNews(data)
        .then(res => {
          if (res.status == 200) {
            this.tableData = res.data.rows;
            this.page.total = res.data.total;
          } else {
          }
        })
        .catch(err => {
          this.$message.warning(err.$message);
        });
    },
    //添加日志
    addLog() {
      this.$store.dispatch("cacheId", "0");
      this.$store.dispatch("setLogId", "");
      this.$router.push({
        path: "/eoaManager/information/noticeManager/id",
        name: "noticeDetail",
        params: { id: 0 }
      });
    },
    //搜索
    query() {
      this.getLogs(this.page.currentPage, this.page.limit, this.fuzzy);
    },
    //查看详情
    showDetail() {
      if (!this.rowId) {
        this.$message.warning("请选中一行查看");
        return;
      }
      this.$store.dispatch("cacheId", "0");
      this.$router.push({
        path: "/eoaManager/infomation/noticeManager/id",
        name: "noticeDetail",
        params: { id: this.rowId }
      });
    },
    //分页
    currentPage(pages) {
      this.page.currentPage = pages.page;
      this.page.pageSize = pages.limit;
      this.getLogs(this.page.currentPage, this.page.pageSize);
    },
    handleCurrentChange(id) {
      this.rowId = id;
    }
  },
  activated() {
    this.getLogs();
  },
  components: {
    logTable
  }
};
</script>


