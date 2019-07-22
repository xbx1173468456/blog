<!--引入调拨出库单（多选）-->
<template>
  <div class="dialog-container">
    <basic-handler>
      <basic-goods-search @clickQuery="clickQuery" @clickReset="clickReset" :isShowInType="isShowInType" inMasterCodeName="调拨出库单号">
        <template slot="button">
          <el-button type="primary" size="small" icon="el-icon-refresh" @click="getAllotOutData()" plain>刷新
          </el-button>
        </template>
      </basic-goods-search>
    </basic-handler>
    <basic-table ref="refAllotOutTableData"
                 :dataTable="allotOut.dataTable" :columns="allotOut.tableColumns"
                 :height="400" @selection-change="selectionChangeAllotOut" :pagination="modelSearchFilter" @pagination="getAllotOutData">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" type="selection" align="center" width="40"
                         :selectable="selectableAllotOut"/>
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
      <template slot-scope="treeObj" slot="inType">
        {{formatStockTypeEnum(treeObj.scope.row)}}
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
    getAllotInData
  } from '@/api/common/dialog/dialogAllotOut'

  export default {
    name: "dialogAllotOut",
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
        allotOut: {
          dataTable: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              "text": "调拨出库单号",
              "value": "masterCode",
              "width": 130,
              showOverflowTooltip: true,
            },
            {
              "text": "调出项目名称",
              "value": "outProName",
              "width": 200,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true,
            },
            {
              "text": "调入项目名称",
              "value": "inProName",
              "width": 200,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true,
            },
            {
              "text": "调拨出库数量",
              "value": "outSum",
              "width": 120,
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true,
            },
            {
              "text": "调拨出库单价",
              "value": "outUnitPrice",
              "width": 120,
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true,
            },
            {
              "text": "调拨出库总金额",
              "value": "outTotalPrice",
              "width": 150,
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true,
            },
            {
              "text": "已收数量",
              "value": "receivedSum",
              "width": 120,
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true,
            },
            {
              "text": "未收数量",
              "value": "unreceivedSum",
              "width": 120,
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true,
            },
            {
              "text": "物资编码",
              "value": "code",
              "width": 130,
            },
            {
              "text": "物资名称",
              "value": "name",
              "width": 160,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true,
            },
            {
              "text": "规格型号",
              "value": "model",
              "width": "100",
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true,
            },
            {
              "text": "计量单位",
              "value": "unit",
              "width": "80",
              showOverflowTooltip: true,
            },
            {
              "text": "库存数量",
              "value": "stockSum",
              "width": "120",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true,
            },
            {
              "text": "库存单价",
              "value": "stockUnitPrice",
              "width": "120",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true,
            },
            {
              "text": "库存总价",
              "value": "stockTotalPrice",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true,
            }
          ],
          selectedRows: [],
          selectedIdArray: []
        },
        excuteAPI:()=>{},
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetStockTypeData',
      ]);
      this.getAllotOutData();
    },
    methods: {
      clickQuery(result) {
        Object.assign(this.modelSearchFilter, result);
        this.getAllotOutData();
      },
      clickReset(result) {
        Object.assign(this.modelSearchFilter, result);
        this.getAllotOutData();
      },
      clickRefresh() {
        this.modelSearchFilter.fuzzy='';
        this.getAllotOutData();
      },
      /**
       * 获得数据
       */
      getAllotOutData() {
        //调拨入库
        if (this.type=='allotIn') {
          let model={
            proId: this.params.proId,
          }
          Object.assign(this.modelSearchFilter, model);
          this.excuteAPI = getAllotInData;
        }
        this.excuteAPI(this.modelSearchFilter).then((response) => {
          if (response.data && response.data) {
            this.allotOut.dataTable.data = response.data.rows;
            this.allotOut.dataTable.total = response.data.total;
            //得到已选择ID
            if (this.data && this.data.length > 0) {
              let data = this.data;
              this.allotOut.selectedIdArray = data.map(row => {
                return row.allocateOutDetailId;
              });
            }else{
              this.allotOut.selectedIdArray =[];
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangeAllotOut(selection) {
        this.allotOut.selectedRows = selection;
        this.$emit('selectionChange', this.allotOut);
      },
      /**
       * 当前选择框，未加入可勾选，其他不能勾选
       */
      selectableAllotOut(row, index) {
        if (this.allotOut.selectedIdArray.includes(row.detailId))
          return 0;//不可勾选
        else
          return 1;//可勾选
      }
    }
  }
</script>
