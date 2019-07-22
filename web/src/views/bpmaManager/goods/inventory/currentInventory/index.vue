<template>
  <basic-split-pane class="bpmaManager-container-list" :default-percent='75' :min-percent='25'>
    <template slot="leftContainer">
      <div class="left-container">
        <basic-handler>
           <basic-goods-search @clickQuery="clickQuery" @clickReset="clickReset"></basic-goods-search>
        </basic-handler>
        <basic-table ref="refCurrentInventoryTable"
                     :dataTable="tableData" :columns="columnsData.indexTable"
                     @current-change="handleCurrentChange" :pagination="modelSearchFilter" @pagination="getSelectedProjectData">
          <template slot-scope="treeObj" slot="inMasterCode">
            <el-button type="text" size="small"
                       @click="clickView(treeObj.scope.row)">{{ treeObj.scope.row.inMasterCode}}
            </el-button>
          </template>
          <template slot-scope="obj" slot="stockSum">
            {{formatToThousandsFour(obj.scope.row.stockSum)}}
          </template>
          <template slot-scope="obj" slot="stockUnitPrice">
            {{formatToThousandsFour(obj.scope.row.stockUnitPrice)}}
          </template>
          <template slot-scope="obj" slot="stockTotalPrice">
            {{formatToThousands(obj.scope.row.stockTotalPrice)}}
          </template>
          <template slot-scope="obj" slot="inType">
            {{formatStockTypeEnum(obj.scope.row)}}
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
  import {
    getDictionaryDataByTypeFilter
  } from '@/api/common/dataDictionary'
  import { columnsData } from './tableTitle.js'
  import {
    selectListOwn
  } from '@/api/bpmaManager/early/itemInfo/itemRegister/index.js'
  import {
    getPurchaseList
  } from "@/api/bpmaManager/goods/inventory/currentInventory/index.js";
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import {staticDataBasic} from "@/assets/data/basic";
  import {staticDataEnum} from "@/assets/data/enum";
  import {validateLength} from "@/utils/validate";
  import formatBasic from '@/utils/mixins/formatBasic.js'
  import BasicGoodsSearch from "../../../../components/basic/basicGoodsSearch/index";
  export default {
    name: 'change',
    mixins: [computed, methods, formatEnum,formatBasic],
    data() {
      const that = this
      return {
        selectData: {
          data: [],
          key: 'id'
        },
        selectedData: [],
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
          data: [],
          total: 0
        },
        formData: {},
        proData: {},
        modelSearchFilter: {
          proId: '',
        },
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetStockTypeData',
        'GetIsOrNotData',
      ]);
      this.selectItems()
      this.getDic()
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
        this.proObj = obj
        this.modelSearchFilter.proId = this.proObj ? this.proObj.id : ''
        this.modelSearchFilter.page = 1
        if (typeof (obj) !== 'undefined') {
          this.getSelectedProjectData()
        }
      },
      //查询左边
      getSelectedProjectData() {
        getPurchaseList(this.modelSearchFilter).then(res => {
          if (res.status == 200) {
            this.tableData.data = res.data.rows
            this.tableData.total = res.data.total
            this.$nextTick(function () {
              if (this.$refs.refCurrentInventoryTable) {
                this.$refs.refCurrentInventoryTable.setCurrentRow(this.tableData.data[0]);
              }
            });
          }
        }).catch(err => {
          this.$message.warning(err.$message)
        })
      },
      clickQuery(result) {
        Object.assign(this.modelSearchFilter,result);
        this.getSelectedProjectData();
      },
      clickReset(result) {
        Object.assign(this.modelSearchFilter,result);
        this.getSelectedProjectData();
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
      handleCurrentChange(obj) {
        if (obj) {
          this.rowId = obj.id
        }
      },
      clickView(row) {
        switch (row.inType) {
          case this.dataEnum.static.inPutType[0].code://直进直出详情
            this.$router.push({name: 'outTheFrontDetail', params: {id: row.inMasterId}});
            break;
          case this.dataEnum.static.inPutType[1].code://采购入库详情
            this.$router.push({name: 'purchaseDetail', params: {id: row.inMasterId}});
            break;
          case this.dataEnum.static.inPutType[2].code://其他入库详情
            this.$router.push({name: 'otherDetail', params: {id: row.inMasterId}});
            break;
          case this.dataEnum.static.inPutType[3].code://调拨入库详情
            this.$router.push({name: 'putStorageDetail', params: {id: row.inMasterId}});
            break;
        }
      }
    }
  }
</script>
