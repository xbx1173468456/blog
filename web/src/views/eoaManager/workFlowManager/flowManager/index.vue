<template>
  <div class="app-container listManager-container">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="left-container">
          <div class="handler-container">
           <!-- <el-button type="primary" icon="el-icon-plus" plain @click="addTetails">新增请假</el-button>
            <el-button type="primary" plain @click="lookTetails" :disabled="status">查看</el-button>
            <el-form :inline="true" class="right">
              <el-form-item>
                <el-input placeholder="请输入关键字" v-model="search.fuzzy"
                          @keyup.enter.native.prevent="searchDatalist(search.fuzzy)">
                  <i class="el-icon-search el-input__icon"
                     slot="suffix">
                  </i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-if-query" plain="">高级查询</el-button>
              </el-form-item>
            </el-form>-->
          </div>
          <el-table

            ref="singleTable"
            :data="dataList"
            highlight-current-row
            border
            fit
            stripe
            height="560">
            <el-table-column
              type="index"
              align="center"
              width="80"
              label="序号"/>
            <el-table-column
              property="id"
              align="center"
              width="140"
              label="编号"/>
            <el-table-column
              property="name"
              align="center"
              width="140"
              label="流程名称"
              show-overflow-tooltip/>
            <el-table-column
              property="category"
              align="center"
              width="140"
              label="类型"/>
            <el-table-column
              property="key"
              align="center"
              width="160"
              label="key"/>
            <el-table-column
              property="deploymentId"
              align="center"
              width="160"
              label="部署ID"/>
            <el-table-column
              property="version"
              align="center"
              label="版本"
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
            <el-table-column
              property="explains"
              align="center"
              label="操作"
              width="120">
            <template slot-scope="scope">
              <el-button type="danger" @click="deleteDataList(scope.row.deploymentId)" icon="el-icon-delete" plain size="small">
                删除
              </el-button>
            </template>
            </el-table-column>
          </el-table>
          <div class="pagebox">
            <pagination
              :total="total"
              :page.sync="search.page"
              :limit.sync="limit"
              @pagination="getDataList"/>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import pagination from '@/components/Pagination'

  export default {
    components: {pagination},
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
          limit:30
        }
      }
    },
    mounted() {
      this.getDataList();
    },
    methods: {
      /*获取请假列表*/
      getDataList() {

        this.$store.dispatch('GetShowAct', this.search).then((response) => {
          this.dataList = response.data;
         //  this.total = response.data.total;
         console.log(response)

        }).catch(() => {
          console.log(23)
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
        this.getDataList();
      }
    }
  }
</script>

<style scoped>

</style>
