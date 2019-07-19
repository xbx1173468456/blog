<!--引入采购入库单（多选）-->
<template>
  <div class="dialog-container">
    <basic-handler>
        <basic-goods-search @clickQuery="clickQuery" @clickReset="clickReset" :isShowInType="isShowInType" inMasterCodeName="单据编码">
          <template slot="button">
            <el-button type="primary" size="small" icon="el-icon-refresh" @click="getPurchaseWarehousingData()" plain>刷新
            </el-button>
          </template>
        </basic-goods-search>
    </basic-handler>
    <basic-table ref="refPurchaseWarehousingTableData"
                 :dataTable="purchaseWarehousing.dataTable" :columns="purchaseWarehousing.tableColumns"
                 :height="400" @selection-change="selectionChangePurchaseWarehousing" :pagination="modelSearchFilter" @pagination="getPurchaseWarehousingData">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" type="selection" align="center" width="40"
                         :selectable="selectablePurchaseWarehousing"/>
      </template>
      <template slot-scope="obj" slot="buySum">
        {{formatToThousandsFour(obj.scope.row.buySum)}}
      </template>
      <template slot-scope="obj" slot="buyUnitPrice">
        {{formatToThousandsFour(obj.scope.row.buyUnitPrice)}}
      </template>
      <template slot-scope="obj" slot="buyTotalPrice">
        {{formatToThousands(obj.scope.row.buyTotalPrice)}}
      </template>
      <template slot-scope="obj" slot="stockSum">
        {{formatToThousandsFour(obj.scope.row.stockSum)}}
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
    getPurchaseWarehousingData
  } from '@/api/common/dialog/dialogPurchaseWarehousing'

  export default {
    name: "dialogPurchaseWarehousing",
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
        purchaseWarehousing: {
          dataTable: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              "text": "单据编码",
              "value": "masterCode",
              "width": "130"
            },
            {
              "text": "物资编码",
              "value": "code",
              "width": "100"
            },
            {
              "text": "物资名称",
              "value": "name",
              "width": "200",
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "规格型号",
              "value": "model",
              "width": "100"
            },
            {
              "text": "计量单位",
              "value": "unit",
              "width": "80"
            },
            {
              "text": "原采购数量",
              "value": "buySum",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "原采购单价",
              "value": "buyUnitPrice",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "原采购总价",
              "value": "buyTotalPrice",
              "width": "150",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "当前库存数",
              "value": "stockSum",
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
            },
            {
              "text": "备注",
              "value": "remark",
              "minWidth": 140,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            }
          ],
          selectedRows: [],
          selectedIdArray: []
        },
        isShowInType:true,
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetStockTypeData',
      ]);
      this.getPurchaseWarehousingData();
    },
    methods: {
      clickQuery(result) {
        Object.assign(this.modelSearchFilter, result);
        this.getPurchaseWarehousingData();
      },
      clickReset(result) {
        Object.assign(this.modelSearchFilter, result);
        this.getPurchaseWarehousingData();
      },
      clickRefresh() {
        this.modelSearchFilter.fuzzy='';
        this.getPurchaseWarehousingData();
      },
      /**
       * 获得数据
       */
      getPurchaseWarehousingData() {
        //业务报销
        if (this.type=='businessReimbursement') {
          let model={
            proId: this.params.proId,
            payPersonId: this.params.payPersonId,
          }
          Object.assign(this.modelSearchFilter, model)
        }
        //采购退货
        if (this.type=='purchaseReturn') {
          let model={
            proId: this.params.proId,
            validateStatus: 1,
            contractId: this.params.contractId,
            offerEnterpriseId: this.params.offerEnterpriseId,
          }
          Object.assign(this.modelSearchFilter, model);
          this.isShowInType = false;
        }
        //领用退货
        if (this.type=='useReturn') {
          let model = {
            proId: this.params.proId,
            validateStatus: 1,
            contractId: this.params.contractId,
            offerEnterpriseId: this.params.offerEnterpriseId,
          }
          Object.assign(this.modelSearchFilter, model);
          this.isShowInType = false;
        }
        getPurchaseWarehousingData(this.modelSearchFilter).then((response) => {
          if (response.data && response.data) {
            this.purchaseWarehousing.dataTable.data = response.data.rows;
            this.purchaseWarehousing.dataTable.total = response.data.total;
            //得到已选择ID
            if (this.data && this.data.length > 0) {
              let data = this.data;
              this.purchaseWarehousing.selectedIdArray = data.map(row => {
                return row.inDetailId;
              });
            }else{
              this.purchaseWarehousing.selectedIdArray =[];
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangePurchaseWarehousing(selection) {
        this.purchaseWarehousing.selectedRows = selection;
        this.$emit('selectionChange', this.purchaseWarehousing);
      },
      /**
       * 当前选择框，未加入可勾选，其他不能勾选
       */
      selectablePurchaseWarehousing(row, index) {
        if (this.purchaseWarehousing.selectedIdArray.includes(row.detailId))
          return 0;//不可勾选
        else
          return 1;//可勾选
      }
    }
  }
</script>
