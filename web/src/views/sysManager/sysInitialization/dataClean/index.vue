<template>
  <basic-container class="handler-table">
    <page-form-auth-info></page-form-auth-info>
    <basic-handler>
      <el-button type="danger" size="small" icon="el-icon-if-clean" @click="clickClean()" plain>清理
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="getDataCleanData()" plain>刷新</el-button>
      <template slot="search">
        <!--<basic-search ref="refBasicSearch" :isAdvancedQuery="true" :modelSearchFilter="modelSearchFilter"-->
                      <!--@clickSearchFilter="clickSearchFilter"></basic-search>-->
      </template>
    </basic-handler>
    <basic-table ref="refDataCleanTable"
                 :dataTable="dataDataClean" :columns="columns"
                 @current-change="currentChangeRow" :isPagination="false" :pagination="modelSearchFilter">
      <template slot-scope="obj" slot="isClean">
        {{formatIsOrNot(obj.scope.row.isClean)}}
      </template>
    </basic-table>
  </basic-container>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import {staticDataBasic} from "@/assets/data/basic";
  import {getDataCleanData, deleteDataClean} from '@/api/sysManager/sysInitialization/dataClean'

  export default {
    name: "dataClean",
    mixins: [computed, methods, formatEnum],
    data() {
      return {
        form: {},
        dataDataClean: {
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
            text: '编码',
            value: 'code',
            width: '80',
            align: "center"
          },
          {
            text: '名称',
            value: 'name',
            width: '140',
            align: "center",
            showOverflowTooltip: true
          },
          {
            text: '简称',
            value: 'alias',
            width: '80',
            align: "center"
          },
          {
            text: '版本',
            value: 'version',
            width: '80',
            align: "center"
          },
          {
            text: '标识',
            value: 'mark',
            width: '80',
            align: "center"
          },
          {
            text: '补充说明',
            value: 'explains',
            minWidth: 140,
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          },
          {
            text: '是否清理',
            value: 'isClean',
            width: '80',
            align: "center"
          },
          {
            text: '清理时间',
            value: 'cleanTime',
            width: '160',
            align: "center"
          },
          {
            text: '清理人员',
            value: 'cleanName',
            minWidth: 200,
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          },
        ],
        currentRow: null
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetIsOrNotData',
      ]);
      this.getDataCleanData();
    },
    methods: {
      //获取数据
      getDataCleanData() {
        getDataCleanData(this.modelSearchFilter).then((response) => {
          if (!this.$utils.isEmpty(response.data)) {
            this.dataDataClean.data = response.data;
           // this.dataDataClean.total = response.data.total;
            this.$nextTick(() => {
              this.$refs ? this.$refs.refDataCleanTable.setCurrentRow(this.dataDataClean.data[0]) : '';
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
        this.$refs.refBasicSearch.searchFilter(this.$refs.refDataCleanTable, this.modelSearchFilter, () => {
          this.getDataCleanData();
        });
      },
      currentChangeRow(row) {
        if (row) {
          this.currentRow = row;
        }
      },
      clickClean() {
        if (this.isSelectedRow(this.currentRow)) {
          this.$confirm(staticDataBasic.info.dataCleanError, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              deleteDataClean(this.currentRow).then((res) => {
                this.getDataCleanData();
                this.$message({message: res.message, type: 'success'})
              }).catch((err) => {
                if (err.response.status&&err.response.status === 404) {
                  this.$message.error('开发中，敬请期待...')
                }
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
