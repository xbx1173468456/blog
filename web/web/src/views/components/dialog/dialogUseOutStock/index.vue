<!--引入领用出库单（多选）-->
<template>
  <div class="dialog-container">
    <basic-handler>
      <basic-goods-search @clickQuery="clickQuery" @clickReset="clickReset" :isShowInType="isShowInType">
        <template slot="button">
          <el-button type="primary" size="small" icon="el-icon-refresh" @click="getUseOutStockData()" plain>刷新
          </el-button>
        </template>
      </basic-goods-search>
    </basic-handler>
    <basic-table ref="refUseOutStockTableData"
                 :dataTable="useOutStock.dataTable" :columns="useOutStock.tableColumns"
                 :height="400" @selection-change="selectionChangeUseOutStock" :pagination="modelSearchFilter" @pagination="getUseOutStockData">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" type="selection" align="center" width="40"
                         :selectable="selectableUseOutStock"/>
      </template>
      <template slot-scope="obj" slot="useSum">
        {{formatToThousandsFour(obj.scope.row.useSum)}}
      </template>
      <template slot-scope="obj" slot="useUnitPrice">
        {{formatToThousandsFour(obj.scope.row.useUnitPrice)}}
      </template>
      <template slot-scope="obj" slot="useTotalPrice">
        {{formatToThousands(obj.scope.row.useTotalPrice)}}
      </template>

      <template slot-scope="obj" slot="returnedSum">
        {{formatToThousandsFour(obj.scope.row.returnedSum)}}
      </template>
      <template slot-scope="obj" slot="canReturnSum">
        {{formatToThousandsFour(obj.scope.row.canReturnSum)}}
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
    getUseOutStockData
  } from '@/api/common/dialog/dialogUseOutStock'

  export default {
    name: "dialogUseOutStock",
    mixins: [computed, methods, formatEnum,formatBasic],
    props: {
      data: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
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
        useOutStock: {
          dataTable: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              "text": "入库单号",
              "value": "inMasterCode",
              "width": "130",
              showOverflowTooltip: true
            },
            {
              "text": "物资编码",
              "value": "code",
              "width": "130",
              showOverflowTooltip: true
            },
            {
              "text": "物资名称",
              "value": "name",
              "width": "160",
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
              "text": "原领用数量",
              "value": "useSum",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "原领用单价",
              "value": "useUnitPrice",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "原领用总价",
              "value": "useTotalPrice",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "已退货数量",
              "value": "returnedSum",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "可退货数量",
              "value": "canReturnSum",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            }
          ],
          selectedRows: [],
          selectedIdArray: []
        },
        excuteAPI:()=>{},
        isShowInType:false
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetStockTypeData',
      ]);
      this.getUseOutStockData();
    },
    methods: {
      clickQuery(result) {
        Object.assign(this.modelSearchFilter, result);
        this.getUseOutStockData();
      },
      clickReset(result) {
        Object.assign(this.modelSearchFilter, result);
        this.getUseOutStockData();
      },
      clickRefresh() {
        this.getUseOutStockData();
      },
      /**
       * 获得数据
       */
      getUseOutStockData() {
        //领用退货
        if (this.type=='useReturn') {
          let model={
            proId: this.params.proId,
            validateStatus: 1,
            contractId: this.params.contractId,
            useEnterpriseId: this.params.useEnterpriseId,
          }
          Object.assign(this.modelSearchFilter, model);
          this.excuteAPI = getUseOutStockData;
        }
        this.excuteAPI(this.modelSearchFilter).then((response) => {
          if (response.data && response.data) {
            this.useOutStock.dataTable.data = response.data.rows;
            this.useOutStock.dataTable.total = response.data.total;
            //得到已选择ID
            if (this.data && this.data.length > 0) {
              let data = this.data;
              this.useOutStock.selectedIdArray = data.map(row => {
                return row.outDetailId;
              });
            }else{
              this.useOutStock.selectedIdArray =[];
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangeUseOutStock(selection) {
        this.useOutStock.selectedRows = selection;
        this.$emit('selectionChange', this.useOutStock);
      },
      /**
       * 当前选择框，未加入可勾选，其他不能勾选
       */
      selectableUseOutStock(row, index) {
        if (this.useOutStock.selectedIdArray.includes(row.detailId))
          return 0;//不可勾选
        else
          return 1;//可勾选
      }
    }
  }
</script>
