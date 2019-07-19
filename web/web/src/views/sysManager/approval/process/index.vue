<template>
  <div class="process-container-list flex-layout">
    <div ref="refSplitPane" class="splitPane-container">
      <basic-split-pane class="bpmaManager-container-list" :default-percent='25' :min-percent='25'>
        <div slot="leftContainer" class="left-container">
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option v-for="item in menuData" :key="item.id" :label="item.label" :value="item.id">
            </el-option>
          </el-select>
          <el-row>
            <el-tree :data="treeData.children || []" :props="defaultProps" @current-change="nodeClick" highlight-current></el-tree>
          </el-row>
        </div>
        <div slot="rightContainer" class="right-container">
          <basic-handler>
            <el-button :disabled="selectMenuRowData.children.length != 0" @click="addClick" icon="el-icon-plus" plain
              size="small" type="primary">新增</el-button>
            <!-- <el-button :disabled="Object.keys(selectedRow).length == 0" @click="deleteModel(selectedRow.id)" icon="el-icon-delete" plain size="small" type="danger">删除
            </el-button> -->
            <el-button :disabled="Object.keys(selectedRow).length == 0" @click="openModel(selectedRow.id)" icon="el-icon-if-auth" plain size="small" type="primary">发布
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-circle-close-outline"
              :disabled="Object.keys(selectedRow).length == 0 || selectedRow.status == 2 || selectedRow.status == 0"
              @click="updateModelStatus(2)"
              plain>禁用
            </el-button>
            <el-button
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              :disabled="Object.keys(selectedRow).length == 0 || selectedRow.status == 1 || selectedRow.status == 0"
              @click="updateModelStatus(1)"
              plain>启用
            </el-button>
          </basic-handler>
          <el-table :data="data" ref="refUserManager" height="heightUserManager" highlight-current-row border stripe @row-click="rowClick">
            <el-table-column show-overflow-tooltip header-align="center" align="center" label="序号" type="index" width="60"></el-table-column>
            <el-table-column show-overflow-tooltip header-align="center" align="center" label="状态" width="80" prop="status">
              <template slot-scope="scope">
                {{dataEnum.activitiModelData.filter(item => item.code == scope.row.status)[0] ? dataEnum.activitiModelData.filter(item => item.code == scope.row.status)[0].name : ''}}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip header-align="center" align="center" label="编号" width="120" prop="id"></el-table-column>
            <el-table-column show-overflow-tooltip header-align="center" label="名称" width="160" prop="name"></el-table-column>
            <el-table-column show-overflow-tooltip header-align="center" align="center" label="key" width="120" prop="key"></el-table-column>
            <el-table-column show-overflow-tooltip header-align="center" align="center" label="部署ID" width="100" prop="deploymentId"></el-table-column>
            <el-table-column show-overflow-tooltip header-align="center" align="center" label="版本" width="80" prop="rev"></el-table-column>
            <el-table-column show-overflow-tooltip header-align="center" align="center" label="创建时间" width="160" prop="createTime"></el-table-column>
            <!-- <el-table-column header-align="center" label="创建人员"></el-table-column> -->
            <el-table-column show-overflow-tooltip header-align="center" align="center" label="是否发布">
              <template slot-scope="scope">{{scope.row.deploymentId ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column show-overflow-tooltip header-align="center" align="center" label="最后修改时间" width="160" prop="lastUpdateTime"></el-table-column>
            <el-table-column show-overflow-tooltip header-align="center" align="center" label="操作" width="110" fixed="right">
              <template slot-scope="scope">
                <el-button @click="updateModel(scope.row.id)" icon="el-icon-if-edit" plain size="small" type="primary" title="编辑"></el-button>
                <el-button @click="openModel(scope.row.id)" icon="el-icon-if-auth" plain size="small" type="primary" title="发布"></el-button>
                <!-- <el-button @click="deleteModel(scope.row.id)" icon="el-icon-delete" plain size="small" type="danger"></el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <pagination :limit.sync="modelSearchFilter.limit" :page.sync="modelSearchFilter.page" :total="total"
                      @pagination="getGoodslist"/>
        </div>
      </basic-split-pane>
    </div>
    <basic-dialog v-el-drag-dialog title="流程模型"
      :visible.sync="visibelState"
      :close-on-click-modal="false"
      :show-close="false"
      width="100%"
      class="el-dialog1"
      @close="getGoodslist"
      top="0">
      <iframe ref="iframe" :src="area" style="width:100%;min-width: 800px;height:99.6%;"></iframe>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="status = false">取 消</el-button>-->
        <el-button type="primary" @click="visibelState = false">关闭</el-button>
      </span>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncUserManager" title="人员-选择" >
      <dialog-preson @change="changepreson" :checkbox="selectedType"></dialog-preson>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncUserManager = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMeMechanism" title="我方机构-选择" >
      <dialog-my-unit @selectionChange="selectionChange" filterValid isShowChecked
                      v-if="visibleSyncMeMechanism"></dialog-my-unit>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncMeMechanism = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  import pagination from '@/components/Pagination'
  import dialogUserManager from '@/views/components/dialog/dialogUserManager'
  import dialogMyUnit from '@/views/components/dialog/dialogMyUnit'
  import dialogPreson from '@/views/components/dialog/dialogPreson/index.vue'
  import {
    getMenu,
    addShowAm,
    getShowAm,
    deleteModel,
    openModel,
    updateModel,
    updateModelStatus
  } from '@/api/sysManager/approval/process'
  export default {
    name: 'process',
    mixins: [computed, methods],
    components: {
      pagination,
      dialogUserManager,
      dialogMyUnit,
      dialogPreson
    },
    data() {
      return {
        menuData: [],
        value: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        data: [],
        heightUserManager: 0,
        selectMenuRowDataId: [],
        selectMenuRowData: { children: [1, 2] },
        selectedRow: {},
        visibelState: false,
        visibleSyncUserManager: false,
        visibleSyncMeMechanism: false,
        area: "",
        modelSearchFilter: {
          page: 1,
          limit: 10,
          ids: ''
        },
        total: 0,
        type: '',
        iframeRow: {},
        selectedType: false
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.user.login
      },
      treeData() {
        return this.menuData.filter(item => item.id == this.value)[0] || {}
      }
    },
    watch: {
      screenHeight(innerHeight) {
        this.heightInit(innerHeight);
      }
    },
    created() {
      this.getMenu()
      this.getEnumData(['GetAuditStatusEnum', 'GetActivitiModelData'])
    },
    mounted() {
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
      getMenu() {
        getMenu().then(res => {
          this.computedIfCanOverflow(res.data)
          this.menuData = res.data
          this.value = this.menuData[0] ? this.menuData[0].id : ''
        })
      },
      computedIfCanOverflow(data) {
        return data.filter(item => {
          if(item.children && item.children.length > 0) {
            item.children = this.computedIfCanOverflow(item.children)
            return item.children.length > 0
          }
          return item.ifCanOverflow == 1
        })
      },
      nodeClick(data) {
        this.selectMenuRowData = data
        if (data.children && data.children.length == 0) {
          this.selectMenuRowDataId = [data.code]
        } else {
          this.selectMenuRowDataId = this.computedChildrenId(data)
        }
        this.modelSearchFilter.ids = this.selectMenuRowDataId.join(',')
        this.selectedRow = {}
        this.getGoodslist()
      },
      computedChildrenId(data) {
        let arr = []
        data.children.forEach(item => {
          if (item.children && item.children.length == 0) {
            arr.push(item.code)
          } else {
            arr = arr.concat(this.computedChildrenId(item))
          }
        })
        return arr
      },
      addClick() {
        if(this.data.length > 0) return this.$message.error('该组织机构已有此类型的模型')
        this.addData()
      },
      /*新增流程模型*/
      addData() {
        addShowAm(this.selectMenuRowDataId[0]).then(res => {
          if(res.status != 200) return this.visibelState = false
          this.visibelState = true
          // this.area = `http://${location.hostname}:8766/${res.data}&authCode=${this.userInfo.authCode}&category=${this.selectMenuRowDataId[0]}`
          // this.area = `http://${location.hostname}:5500/${res.data}&authCode=${this.userInfo.authCode}&category=${this.selectMenuRowDataId[0]}`
          this.area = `http://192.168.0.107:8766/${res.data}&authCode=${this.userInfo.authCode}&category=${this.selectMenuRowDataId[0]}`
          this.addEvent()
        }).catch(err => this.visibelState = false)
      },
      getGoodslist() {
        if(!this.modelSearchFilter.ids) return
        getShowAm(this.modelSearchFilter).then(res => {
          this.total = res.data.total
          this.data = res.data.rows
        })
      },
      rowClick(row) {
        this.selectedRow = row
      },
      deleteModel(id) {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          deleteModel(id).then(res => {
            this.data = this.data.filter(item => item.id != id)
            this.selectedRow = {}
            this.$message({
              type: 'success',
              message: res.msg
            })
          })
        })
      },
      openModel(id) {
        this.$confirm('亲，您是否确定发布当前流程，发布后该表单提交审核的数据将立即使用新流程！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          openModel(id).then(res => {
            if(res.flag) {
              this.getGoodslist()
              this.$message.success(res.msg)
            } else {
              this.$message.warning(res.msg)
            }
          })
        })
      },
      updateModel(id) {
        updateModel(id).then(res => {
          this.visibelState = true
          // this.area = `http://${location.hostname}:8766${res.data}`  // 线上环境
          // this.area = `http://${location.hostname}:5500${res.data}` // 本地环境
          this.area = `http://192.168.0.107:8766${res.data}` // 开发环境
          this.addEvent()
        })
      },
      addEvent() {
        window.addEventListener('message', (e) => {
          switch(e.data) {
            case 'assignee':
              this.selectedType = false
              this.visibleSyncUserManager = true
              this.type = 'assignee'
              break
            case 'assignees':
              this.selectedType = true
              this.visibleSyncUserManager = true
              this.type = 'assignees'
              break
            case 'openMyUnit':
              this.selectedType = true
              this.visibleSyncMeMechanism = true
              this.type = 'openMyUnit'
              break
          }
        })
      },
      selectionChange(row) {
        this.iframeRow = row.selectedRows
      },
      changepreson(data) {
        this.iframeRow = data
      },
      handleChange() {
        window.frames[0].postMessage({
          type: this.type,
          data: this.iframeRow
        }, this.area)
        this.visibleSyncUserManager = false
        this.visibleSyncMeMechanism = false
      },
      updateModelStatus(type) {
        updateModelStatus({id: this.selectedRow.id, status: type}).then(res => {
          this.selectedRow.status = type
          this.$message.success(res.message)
        })
      }
    }
  }
</script>

<style scope lang="scss">
  .left-container {
    display: flex;
    flex-direction: column;
  }
  .left-container .el-row {
    flex: 1;
  }
  .left-container .el-row .el-tree {
    height: 98%;
  }
  .process-container-list {
    overflow: hidden;
  }
  .el-dialog1 {
    width: 100%;
  }
  .el-dialog1 /deep/ .el-dialog {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .el-dialog1 /deep/ .el-dialog__body {
    width: 100%;
    overflow: auto;
    flex: 1;
  }
</style>
