<template>
<basic-split-pane class="bpmaManager-container-list" :default-percent='75' :min-percent='25'>
    <template slot="leftContainer">
        <div class="left-container">
            <basic-handler>
                <el-button type="primary" size="small" icon="el-icon-plus" @click="addClick()" plain>新增</el-button>
                <el-button type="primary" size="small" icon="el-icon-if-see" @click="showDetail" plain>查看</el-button>

                <template slot="search">
                    <basic-search ref="refBasicSearch" :isAdvancedQuery="true" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
                </template>
            </basic-handler>
            <basic-table ref="refTeturnGoodsTable"
                 :dataTable="tableData" :columns="columnsData.indexTable"
                 @current-change="handleCurrentChange" :pagination="modelSearchFilter" @pagination="getSelectedProjectData">
                 <template slot-scope="obj" slot="validateStatus">
                    {{formatValidateStatus(obj.scope.row)}}
                </template>
                <template slot-scope="obj" slot="handleDate">
                    {{formatDate(obj.scope.row.handleDate)}}
                </template>
            </basic-table>
        </div>
    </template>
    <template slot="rightContainer">
        <div class="right-container">
            <page-select-filter :selectData="selectData" :data="itemData" @change="changeProject" :syncSearch='0' v-model="selectValue" @refreshData="selectItems"></page-select-filter>
        </div>
    </template>
</basic-split-pane>
</template>

<script>
import {
    getDictionaryDataByTypeFilter
} from '@/api/common/dataDictionary'
import {columnsData} from './tableTitle.js'
import {
    selectListOwn
} from '@/api/bpmaManager/early/itemInfo/itemRegister/index.js'
import {
    getList
} from '@/api/bpmaManager/goods/putStorage/returnGoods/index.js'
import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatBasic from "@/utils/mixins/formatBasic";
  import formatEnum from "@/utils/mixins/formatEnum";
  import { getEnumData} from "@/utils";
export default {
    name: 'change',
    mixins: [computed, methods, formatBasic,formatEnum],
  activated(){
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
                proId:'',
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
            tableShow: false,
            tableData: {
                data:[],
                total:0
            },
            formData: {},
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
            if(!obj) return
            this.proObj = obj
            this.modelSearchFilter.proId=this.proObj ? this.proObj.id : ''
            this.modelSearchFilter.page=1
            this.getSelectedProjectData()
        },
        //查询左边
        getSelectedProjectData() {
            getList(this.modelSearchFilter).then(res => {
                if (res.status == 200) {
                    this.tableData.data = res.data.rows
                    this.tableData.total = res.data.total
                  this.$nextTick(function () {
                    if(this.$refs.refTeturnGoodsTable){
                      this.$refs.refTeturnGoodsTable.setCurrentRow( this.tableData.data[0]);
                    }
                  });
                }
            }).catch(err => {
                this.$message.warning(err.$message)
            })
        },
        getDic() {
            getDictionaryDataByTypeFilter('SYS_PRO_STAGE').then(res => {
                if (res.status == 200) {
                    this.selectData.data = res.data
                    this.selectValue = res.data.map(item => item.id)
                }
            }).catch(err => {
                this.$message.warning(err.message)
            })
        },
        /**
         * 关键字搜索
         */
        clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refPutStorageTable, this.modelSearchFilter, () => {
            this.getSelectedProjectData();
        });
        },
        //添加
        addClick() {
          if(!this.modelSearchFilter.proId){
            return this.$message.warning('当前无项目，无法新增！')
          }
            this.$store.dispatch('setTrackId', '')
            this.$store.dispatch("setSelectP",[]);
           this.$store.dispatch("cacheId", '0');
            this.$router.push({
                name: 'returnGoodsDetail',
              params: {
                id: 0,
              },
              query: {
                proObj: this.proObj
              }
            })
        },
        //查看详情
        showDetail() {
            if (!this.rowId) {
               return this.$message.warning('请选中一行查看')
            }
            this.$router.push({
                name: 'returnGoodsDetail',
                params: {
                    id: this.rowId
                }
            })
        },
        handleCurrentChange(obj) {
            if(obj){
                this.rowId = obj.id
            }
        },
    }
}
</script>

<style scoped>

</style>
