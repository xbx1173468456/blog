<template>
  <basic-split-pane class="contractRegistration-container-index" :default-percent='75' :min-percent='25'>
    <template slot="leftContainer">
      <div class="left-container">
        <basic-handler>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="clickAdd()" plain>新增</el-button>
          <el-button type="primary" size="small" icon="el-icon-if-see" @click="clickView" plain>查看</el-button>
          <template slot="search">
            <basic-search ref="refBasicSearch" :isAdvancedQuery="true" :modelSearchFilter="modelSearchFilter"
                          @clickSearchFilter="clickSearchFilter"></basic-search>
          </template>
        </basic-handler>
        <basic-table ref="refOutTheFrontTable"
                     :dataTable="tableData" :columns="columnsData.indexTitle"
                     @current-change="currentChangeRow" :pagination="modelSearchFilter"
                     @pagination="getSelectedProjectData">
          <template slot-scope="obj" slot="validateStatus">
            {{formatValidateStatus(obj.scope.row)}}
          </template>
          <template slot-scope="obj" slot="useEnterpriseType">
            {{formatUseEnterpriseType(obj.scope.row)}}
          </template>
          <template slot-scope="obj" slot="handleDate">
            {{formatDate(obj.scope.row.handleDate)}}
          </template>
          <template slot-scope="obj" slot="useTotalPrice">
            {{formatToThousands(obj.scope.row.useTotalPrice)}}
          </template>
        </basic-table>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container">
        <page-select-filter :selectData="selectData" :data="itemData" @change="changeProject" :syncSearch='0'
                            v-model="selectValue" @refreshData="selectItems"></page-select-filter>
      </div>
    </template>
  </basic-split-pane>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatBasic from "@/utils/mixins/formatBasic";
  import formatEnum from "@/utils/mixins/formatEnum";
  import {
    getDictionaryDataByTypeFilter
  } from '@/api/common/dataDictionary'
  import {columnsData} from './tableTitle.js'
  import {
    selectListOwn
  } from '@/api/bpmaManager/early/itemInfo/itemRegister/index.js'

  import {
    getList
  } from '@/api/bpmaManager/goods/putStorage/outTheFront/index.js'

  export default {
    name: 'outTheFrontIndex',
    mixins: [computed, methods, formatBasic, formatEnum],
    activated() {
      this.getSelectedProjectData();
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetOutTypeData'
      ]);
      this.selectItems();
      this.getDic();
    },
    data() {
      const that = this
      return {
        selectData: {
          data: [],
          key: 'id'
        },
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: '',
          fuzzyKeys: '',
          proId: '',
        },
        stage: [],
        selectValue: [],
        proObj: '',
        itemData: {
          name: 'name',
          key: 'stageId',
          data: []
        },
        columnsData,
        tableData: {
          data: [],
          total: 0
        },
        proData: {},
      }
    },
    methods: {
      selectItems(fuzzy) {
        let data = {
          page: 1,
          limit: 1000,
          fuzzy: fuzzy,
        }
        selectListOwn(data).then(res => {
          if (res.status == 200) {
            this.itemData.data = res.data.rows
          }
        }).catch(err => {
          this.$message.warning(err.$message)
        })
      },
      changeProject(obj) {
        if (!obj) return
        this.proObj = obj
        this.modelSearchFilter.proId = this.proObj ? this.proObj.id : ''
        this.modelSearchFilter.page = 1
        this.getSelectedProjectData()
      },
      //查询左边
      getSelectedProjectData() {
        getList(this.modelSearchFilter).then(response => {
          if (response.status == 200) {
            this.tableData.data = response.data.rows
            this.tableData.total = response.data.total
            this.$nextTick(function () {
              if (this.$refs.refOutTheFrontTable) {
                this.$refs.refOutTheFrontTable.setCurrentRow(this.tableData.data[0]);
              }
            });
          }
        })
      },
      getDic() {
        getDictionaryDataByTypeFilter('SYS_PRO_STAGE').then(response => {
          if (response.status == 200) {
            this.selectData.data = response.data
            this.selectValue = response.data.map(item => item.id)
          }
        }).catch(err => {
          console.log(err.message)
        })
      },
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refOutTheFrontTable, this.modelSearchFilter, () => {
          this.getSelectedProjectData();
        });
      },
      //添加
      clickAdd() {
        if (!this.modelSearchFilter.proId) {
          return this.$message.warning('当前无项目，无法新增！')
        }
        this.$store.dispatch("cacheId", '0');
        this.$router.push({
          name: 'contractRegistrationDetail',
          params: {
            id: 0,
          },
          query: {
            proObj: this.proObj
          }
        })
      },
      //查看详情
      clickView() {
        if (!this.rowId) {
          return this.$message.warning('请选中一行查看')
        }
        this.$router.push({
          name: 'contractRegistrationDetail',
          params: {
            id: this.rowId
          }
        })
      },
      currentChangeRow(row) {
        if (row) {
          this.rowId = row.id
        }
      },
    }
  }
</script>
