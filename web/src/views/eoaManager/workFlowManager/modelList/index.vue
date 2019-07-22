<template>
  <div class="app-container listManager-container">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="left-container">
          <div class="handler-container">
           <el-button type="primary" icon="el-icon-plus" plain @click="addModel" size="small" :disabled="!category">新增流程模型</el-button>
            <el-select v-model="category" placeholder="请选择新增类型" size="small">
              <el-option
                v-for="item in type"
                :key="parseInt(item.code)"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>

          </div>
          <el-table

            ref="singleTable"
            :data="dataList"
            highlight-current-row
            border
            fit
            stripe
            height="560"
            @current-change="currentRow">
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
              label="流程名称"
              show-overflow-tooltip/>
            <el-table-column
              property="category"
              align="center"
              width="100"
              label="类型">
              <template slot-scope="scope">
                <span v-if="scope.row.category==1">请假</span>
                <span v-else="scope.row.category==2">加班</span>
              </template>
            </el-table-column>
            <el-table-column
              property="key"
              align="center"
              width="120"
              label="key"/>
            <el-table-column
              property="deploymentId"
              align="center"
              width="100"
              label="部署ID"/>
            <el-table-column
              property="version"
              align="center"
              label="版本"
              width="80"
              show-overflow-tooltip/>
            <el-table-column
              property="createTime"
              align="center"
              label="创建时间"
              width="160"
              show-overflow-tooltip/>
            <el-table-column
              property="lastUpdateTime"
              align="center"
              width="160"
              label="最后修改时间"
              show-overflow-tooltip/>
            <el-table-column
              property="explains"
              align="center"
              label="操作"
              width="260">
              <template slot-scope="scope">
                <el-button type="primary" @click="openModel(scope.row.id)" icon="el-icon-if-query" plain size="small">
                  编辑
                </el-button>
                <el-button type="primary" @click="OpenDataList(scope.row.id)" icon="el-icon-if-release" plain size="small">
                  发布
                </el-button>
                <el-button type="danger" @click="deleteDataList(scope.row.id)" icon="el-icon-delete" plain size="small">
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
    <!--<iframe :src="area" width="1400" height="700" v-if="status">
    </iframe>-->
    <basic-dialog
      title="流程模型"
      :visible.sync="status"
      :close-on-click-modal="false"
      :show-close="false"
      width="1430px"
      top="80px">
      <iframe :src="area" width="1400" height="700">
      </iframe>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="status = false">取 消</el-button>-->
        <el-button type="primary" @click="closeModel()">关闭</el-button>
      </span>
    </basic-dialog>
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
        status: false,
        total: 0,
        limit: 10,
        area: "",
        search: {
          page: 1,
          limit: 30
        },
        type:[],
        category:""
      }
    },
    mounted() {
      this.getDataList();
      this.dataType();
    },
    methods: {
      /*获取模型列表*/
      getDataList() {

        this.$store.dispatch('GetShowAm', this.search).then((response) => {
          this.dataList = response.data;
          //  this.total = response.data.total;
          console.log(response)

        }).catch(() => {
          console.log(23)
        })
      },
      /*打开弹窗*/
      openModel(id){
        this.status=true;
        this.goDataList(id);
      },
      /*编辑打开流程模型*/
      goDataList(id) {
        this.$store.dispatch('GoModel',id).then((response) => {
          console.log(response)
          this.area="http://192.168.0.102:8766/" +response.data;
        }).catch(() => {
          console.log(23)
        })
      },
      /*新建打开流程弹窗*/
      addModel(){
        this.status=true;
        this.addData();
      },
      /*关闭流程弹窗*/
      closeModel(){
        this.status=false;
        this.getDataList();
      },
      /*新增流程模型*/
      addData() {
        this.$store.dispatch('AddShowAm',this.category).then((response) => {
          console.log(response)
          this.area="http://192.168.0.102:8766/"
            +response.data+"&authCode="
            +this.$store.state.user.login.authCode
            +"&category="+this.category;
        }).catch(() => {
          console.log(23)
        })
      },
      /*发布流程模型*/
      OpenDataList(id) {
        this.$store.dispatch('OpenModel', id).then((response) => {
          //this.$message.success(response.msg);
          this.getDataList();
          console.log(response)
        }).catch(() => {
          console.log(23)
        })
      },
      /*流程模型类型*/
      dataType() {
        this.$store.dispatch('AmType').then((response) => {
          console.log(response);
          this.type=response;
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
          this.$store.dispatch('DeleteModel',id).then((response) => {
            this.$message.success(response.msg);
            this.getDataList();
          }).catch((err) => {
            console.log(err)
          })
        }).catch((err) => {
            console.log(err)
        })
      },
      /*获取当前行对象*/
      currentRow(row) {
        this.row = row;
        /*if (this.row.id) {
          this.status = false;
        }*/
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
