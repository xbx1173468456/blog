<!--库存物资（多选）-->
<template>
  <div class="dialog-container">
    <basic-handler>
      <basic-goods-search @clickQuery="clickQuery" @clickReset="clickReset">
        <template slot="button">
          <el-button type="primary" size="small" icon="el-icon-refresh" @click="getStockGoodsData()" plain>刷新
          </el-button>
        </template>
      </basic-goods-search>
    </basic-handler>
    <basic-table ref="refStockGoodsTableData"
                 :dataTable="stockGoods.dataGoods" :columns="stockGoods.tableColumns"
                 :height="400" @selection-change="selectionChangeStockGoods" :pagination="modelSearchFilter" @pagination="getStockGoodsData">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" type="selection" align="center" width="55"
                         :selectable="selectableStockGoods"/>
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

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "src/utils/mixins/formatBasic";
  import {
    getStockGoodsData
  } from '@/api/common/dialog/dialogStockGoods'

  export default {
    name: "dialogStockGoods",
    mixins: [computed, methods, formatEnum,formatBasic],
    props: {
      stockGoodsData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
      params: {
        type: Object,
        default:()=>{}
      },
    },
    data() {
      return {
        defaultExpandAll: false,
        modelSearchFilter: {
          page: 1,
          limit: 10,
        },
        stockGoods: {
          dataGoods: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              "text": "入库单号",
              "value": "inMasterCode",
              "width": "130"
            },
            {
              "text": "入库类型",
              "value": "inType",
              "width": "80"
            },
            {
              "text": "物资编码",
              "value": "code",
              width: 120,
            },
            {
              "text": "物资名称",
              "value": "name",
              minWidth: 160,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "规格型号",
              "value": "model",
              "width": "100",
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "计量单位",
              "value": "unit",
              "width": "80",
            },
            {
              "text": "库存数量",
              "value": "stockSum",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "库存单价",
              "value": "stockUnitPrice",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "库存总价",
              "value": "stockTotalPrice",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            }
          ],
          selectedRows: [],
          selectedIdArray: []
        },
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetStockTypeData',
      ]);
      this.getStockGoodsData();
    },
    methods: {
      clickQuery(result) {
        Object.assign(this.modelSearchFilter, result);
        this.getStockGoodsData();
      },
      clickReset(result) {
        Object.assign(this.modelSearchFilter, result);
        this.getStockGoodsData();
      },
      clickRefresh() {
        this.modelSearchFilter.fuzzy='';
        this.getStockGoodsData();
      },
      /**
       * 获得数据
       */
      getStockGoodsData() {
        //基本
        if (!this.$utils.isEmpty(this.params.proId)) {
          this.modelSearchFilter.proId = this.params.proId;
        }
        //调拨出库引入
        if (!this.$utils.isEmpty(this.params.outProId)) {
          this.modelSearchFilter.proId = this.params.outProId;
        }
        getStockGoodsData(this.modelSearchFilter).then((response) => {
          if (response.data && response.data) {
            this.stockGoods.dataGoods.data = response.data.rows;
            this.stockGoods.dataGoods.total = response.data.total;
            //得到已选择ID
            if (this.stockGoodsData && this.stockGoodsData.length > 0) {
              let stockGoodsData = this.stockGoodsData;
              this.stockGoods.selectedIdArray = stockGoodsData.map(row => {
                return row.inDetailId;
              });
            }else{
              this.stockGoods.selectedIdArray=[];
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangeStockGoods(selection) {
        this.stockGoods.selectedRows = selection;
        this.$emit('selectionChange', this.stockGoods);
      },
      /**
       * 当前选择框，未加入可勾选，其他不能勾选
       */
      selectableStockGoods(row, index) {
        if (this.stockGoods.selectedIdArray.includes(row.inDetailId))
          return 0;//不可勾选
        else
          return 1;//可勾选
      }
    }
  }
</script>
