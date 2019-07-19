<template>
  <div class="flowManager-container-list">
    <div class="handler-container">
    </div>
    <el-table
      ref="refUserManager"
      :data="dataList"
      highlight-current-row
      border
      fit
      stripe
      :height="heightUserManager">
      <el-table-column
        type="index"
        align="center"
        width="80"
        label="序号"/>
      <el-table-column
        property="id"
        align="center"
        width="140"
        show-overflow-tooltip
        label="编号"/>
      <el-table-column
        property="name"
        align="center"
        width="140"
        show-overflow-tooltip
        label="流程名称"
        show-overflow-tooltip/>
      <el-table-column
        property="category"
        align="center"
        width="140"
        show-overflow-tooltip
        label="类型"/>
      <el-table-column
        property="key"
        align="center"
        width="160"
        show-overflow-tooltip
        label="key"/>
      <el-table-column
        property="deploymentId"
        align="center"
        width="160"
        show-overflow-tooltip
        label="部署ID"/>
      <el-table-column
        property="version"
        align="center"
        label="版本"
        show-overflow-tooltip
        show-overflow-tooltip/>
      <el-table-column
        property="resourceName"
        align="center"
        label="资源名称"
        show-overflow-tooltip/>
      <el-table-column
        property="description"
        align="center"
        label="说明"
        show-overflow-tooltip/>
      <!-- <el-table-column
        property="explains"
        align="center"
        label="操作"
        fixed="right"
        width="120">
      <template slot-scope="scope">
        <el-button type="danger" @click="deleteDataList(scope.row.deploymentId)" icon="el-icon-delete" plain size="small">
          删除
        </el-button>
      </template>
      </el-table-column> -->
    </el-table>
    <div class="pagebox">
      <pagination
        :total="total"
        :page.sync="search.page"
        :limit.sync="search.limit"
        @pagination="getDataList"/>
    </div>
  </div>
</template>

<script>
  import pagination from '@/components/Pagination'
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  export default {
    name: 'flowManager',
    components: {pagination},
    mixins: [computed, methods],
    data() {
      return {
        dataList: [],
        currentPage: 10,
        row: null,
        status: true,
        total: 0,
        limit: 10,
        search: {
          page: 1,
          limit:10
        },
        heightUserManager: 0,
      }
    },
    watch: {
      screenHeight(innerHeight) {
        this.heightInit(innerHeight);
      }
    },
    mounted() {
      this.getDataList();
      this.$nextTick(() => {
        this.heightInit(this.getInnerHeight());
      })
    },
    methods: {
      heightInit(innerHeight) {
        if (!this.$refs.refUserManager) return
        const offsetTopUserManager = this.$refs.refUserManager.$el.getBoundingClientRect().top;
        this.heightUserManager = innerHeight - offsetTopUserManager - 55;
      },
      /*获取请假列表*/
      getDataList() {
        this.$store.dispatch('GetShowAct', this.search).then((response) => {
          this.dataList = response.data;
          this.total = response.count
        }).catch(() => {
        })
      },
      deleteDataList(id){
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('DeleteShowAct',id).then((response) => {
            this.$message.success(response.msg);
            this.getDataList();
          }).catch((err) => {
            console.log(err)
          })
        }).catch((err) => {
          console.log(err)
        })
      },
      /*分页查询*/
      searchDatalist(fuzzy) {
        this.search.fuzzy = fuzzy;
        this.getDataList()
      }
    }
  }
</script>

<style scoped>

</style>
