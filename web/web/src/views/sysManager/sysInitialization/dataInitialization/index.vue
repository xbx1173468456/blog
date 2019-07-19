<template>
  <basic-container class="authInfo-container-list">
    <page-form-auth-info></page-form-auth-info>
    <div ref="refSplitPane" class="splitPane-container" v-bind:style="{height:heightSplitPane + 'px'}">
    <split-pane split="vertical" :min-percent='20' :default-percent='20'>
      <template slot="paneL">
        <div class="left-container">
          <basic-handler>
            <el-button type="primary" size="small" icon="el-icon-if-initialization"  @click="clickInit()" plain>初始化</el-button>
            <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh()" plain>刷新</el-button>
          </basic-handler>
          <basic-table ref="refDataInitialization"
                       :dataTable="dataDataInitialization" :columns="columns"
                       @current-change="currentChangeRow" :isPagination="false" :pagination="modelSearchFilter">
          </basic-table>
        </div>
      </template>
      <template slot="paneR">
        <div class="right-container">
          <div class="handler-container">
            <el-button type="primary" size="small" icon="el-icon-if-initialization" @click="clickInitItem()" plain>初始化
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefreshItem" plain>刷新</el-button>
          </div>
          <basic-table ref="refDataInitializationItem"
                       :dataTable="dataDataInitializationItem" :columns="columnsItem"
                       @current-change="currentChangeRowItem" :isPagination="false" :pagination="modelSearchFilterItem">
            <template slot-scope="obj" slot="ifClean">
              {{formatIsOrNot(obj.scope.row.ifClean)}}
            </template>
          </basic-table>
        </div>
      </template>
    </split-pane>
  </div>
  </basic-container>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import splitPane from 'vue-splitpane'
  import basicSearch from "@/views/components/basic/basicSearch/index";
  import formatEnum from "@/utils/mixins/formatEnum";
  import {staticDataBasic} from "@/assets/data/basic";
  import {getDataInitialization,putDataInitializationAll, putDataInitialization,getDataInitializationItem} from '@/api/sysManager/sysInitialization/dataInitialization'
  export default {
    mixins: [computed, methods, formatEnum],
    components: {
      splitPane,basicSearch},
    data() {
      return {
        currentRow: null,
        dataDataInitialization: {
          data: [],
          total: 0
        },
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: '',
          fuzzyKeys: ''
        },
        columns: [
          {
            text: '名称',
            value: 'name',
            minWidth: 100,
            align: 'center',
            showOverflowTooltip: true
          }
        ],
        modelSearchFilterItem: {
          page: 1,
          limit: 10,
          fuzzy: ''
        },
        dataDataInitializationItem: {
          data: [],
          total: 0
        },
        productId: '',
        currentPage: 1,
        columnsItem: [
          {
            text: '名称',
            value: 'name',
            width: '140',
            align: 'left',
            headerAlign: "center",
            showOverflowTooltip: true
          },
          {
            text: '是否初始化',
            value: 'ifClean',
            width: 100,
            align: "center",
          },
          {
            text: '初始化时间',
            value: 'inputTime',
            width: 160,
            align: "center"
          },
          {
            text: '初始化人员',
            value: 'inputPerson',
            minWidth: 200,
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          }
        ],
        heightSplitPane: 0,
        defaultExpandAll: false,
        currentRowItem: null,
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetIsOrNotData'
      ]);
      this.getDataInitialization();
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
        const offsetTopSplitPane = this.$refs.refSplitPane.getBoundingClientRect().top;
        this.heightSplitPane = innerHeight - offsetTopSplitPane - 14;
      },
      clickRefresh() {
        this.getDataInitialization()
      },
      getDataInitialization() {
        getDataInitialization()
          .then(response => {
            this.dataDataInitialization.data = response.data;
            this.$nextTick(function () {
              if (this.dataDataInitialization && this.dataDataInitialization.data.length > 0) {
                this.$refs.refDataInitialization.setCurrentRow(this.dataDataInitialization.data[0]);
              } else {
                this.dataDataInitializationItem.data = [];
              }
            });
          });
      },
      clickInit() {
        if (this.currentRow) {
          this.$confirm(staticDataBasic.info.dataInitError, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              putDataInitializationAll(this.currentRow).then((res) => {
                this.getDataInitializationItem(this.currentRow);
                this.$message({message: res.message, type: 'success'})
              }).catch((err) => {
                console.log(err);
              })
            }, (cancel) => {
              console.log(cancel);
            })
        }
      },
      currentChangeRow(row) {
        if (row) {
          this.currentRow = row;
          this.getDataInitializationItem(this.currentRow);
        }
      },
      getDataInitializationItem(currentRow) {
        getDataInitializationItem(currentRow)
          .then(response => {
            if (!this.$utils.isEmpty(response.data)) {
              this.dataDataInitializationItem.data = response.data;
            } else {
              this.dataDataInitializationItem.data = [];
            }
          });
      },
      currentChangeRowItem(row) {
        if (row) {
          this.currentRowItem = row;
        }
      },
      clickRefreshItem() {
        this.getDataInitializationItem(this.currentRow)
      },
      clickInitItem() {
        if (this.isSelectedRow(this.currentRowItem)) {
          this.$confirm(staticDataBasic.info.dataInitError, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              putDataInitialization(this.currentRowItem).then((res) => {
                this.getDataInitializationItem(this.currentRow)
                this.$message({message: res.message, type: 'success'})
              }).catch((err) => {
                console.log(err);
              })
            }, (cancel) => {
              console.log(cancel);
            })
        }
      }
    }
  }
</script>
