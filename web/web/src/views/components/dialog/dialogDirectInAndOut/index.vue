<!--引入直进直出（多选）-->
<template>
  <div class="dialog-container">
    <basic-handler>
        <basic-goods-search @clickQuery="clickQuery" @clickReset="clickReset" :isShowInType="isShowInType" inMasterCodeName="单据编码">
          <template slot="button">
            <el-button type="primary" size="small" icon="el-icon-refresh" @click="getDirectInAndOutData()" plain>刷新
            </el-button>
          </template>
        </basic-goods-search>
    </basic-handler>
    <basic-table ref="refDirectInAndOutTableData"
                 :dataTable="directInAndOut.dataTable" :columns="columns"
                 :height="400" @selection-change="selectionChangeDirectInAndOut" :pagination="modelSearchFilter" @pagination="getDirectInAndOutData">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" type="selection" align="center" width="40"
                         :selectable="selectableDirectInAndOut"/>
      </template>
      <template slot-scope="obj" slot="buySum" v-if="type=='purchaseReturn'">
        {{formatToThousandsFour(obj.scope.row.buySum)}}
      </template>
      <template slot-scope="obj" slot="buyUnitPrice" v-if="type=='purchaseReturn'">
        {{formatToThousandsFour(obj.scope.row.buyUnitPrice)}}
      </template>
      <template slot-scope="obj" slot="buyTotalPrice" v-if="type=='purchaseReturn'">
        {{formatToThousandsFour(obj.scope.row.buyTotalPrice)}}
      </template>
      <template slot-scope="obj" slot="stockSum" v-if="type=='purchaseReturn'">
        {{formatToThousandsFour(obj.scope.row.stockSum)}}
      </template>

      <template slot-scope="obj" slot="useSum" v-if="type=='useReturn'">
        {{formatToThousandsFour(obj.scope.row.useSum)}}
      </template>
      <template slot-scope="obj" slot="useUnitPrice" v-if="type=='useReturn'">
        {{formatToThousandsFour(obj.scope.row.useUnitPrice)}}
      </template>
      <template slot-scope="obj" slot="useTotalPrice" v-if="type=='useReturn'">
        {{formatToThousands(obj.scope.row.useTotalPrice)}}
      </template>

      <template slot-scope="obj" slot="returnedSum">
        {{formatToThousandsFour(obj.scope.row.returnedSum)}}
      </template>
      <template slot-scope="obj" slot="canReturnSum">
        {{formatToThousandsFour(obj.scope.row.canReturnSum)}}
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
    getBusinessReimbursementData,
    getPurchaseReturnData,
    getUseReturnData
  } from '@/api/common/dialog/dialogDirectInAndOut'

  export default {
    name: "dialogDirectInAndOut",
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
        directInAndOut: {
          dataTable: {
            data: [],
            total: 0
          },
          //业务报销
          tableColumnsBusinessReimbursement:[],
          //采购退货
          tableColumnsPurchaseReturn: [
            {
              "text": "单据编码",
              "value": "masterCode",
              "width": "130"
            },
            {
              "text": "物资编码",
              "value": "code",
              "width": "130"
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
              "width": "120",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "原采购单价",
              "value": "buyUnitPrice",
              "width": "120",
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
              "width": "120",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "已退货数量",
              "value": "returnedSum",
              "width": "120",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              "text": "可退货数量",
              "value": "canReturnSum",
              "width": "120",
              align: "right",
              headerAlign: "center",
              showOverflowTooltip: true
            }
          ],
          //领用退货
          tableColumnsUseReturn: [
            {
              "text": "单据编码",
              "value": "masterCode",
              "width": "130"
            },
            {
              "text": "物资编码",
              "value": "code",
              "width": "100",
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
        columns:[],
        isShowInType:true,
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetStockTypeData',
      ]);
    },
    mounted(){
      this.getDirectInAndOutData();
    },
    methods: {
      clickQuery(result) {
        Object.assign(this.modelSearchFilter, result);
        this.getDirectInAndOutData();
      },
      clickReset(result) {
        Object.assign(this.modelSearchFilter, result);
        this.getDirectInAndOutData();
      },
      clickRefresh() {
        this.modelSearchFilter.fuzzy='';
        this.getDirectInAndOutData();
      },
      /**
       * 获得数据
       */
        getDirectInAndOutData() {
        //业务报销
        if (this.type=='businessReimbursement') {
          let model={
            proId: this.params.proId,
            payPersonId: this.params.payPersonId,
          }
          Object.assign(this.modelSearchFilter, model);
          this.excuteAPI = getBusinessReimbursementData;
          this.$nextTick(()=>{
            this.columns=this.directInAndOut.tableColumnsBusinessReimbursement;
          });
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
          console.log(typeof getPurchaseReturnData)
          this.excuteAPI = getPurchaseReturnData;
          this.$nextTick(()=>{
            this.columns=this.directInAndOut.tableColumnsPurchaseReturn;
          });
          this.isShowInType = false;
        }
        //领用退货
        if (this.type=='useReturn') {
          let model={
            proId: this.params.proId,
            validateStatus: 1,
            contractId: this.params.contractId,
            useEnterpriseId: this.params.useEnterpriseId,
          }
          Object.assign(this.modelSearchFilter, model);
          this.excuteAPI = getUseReturnData;
          this.$nextTick(()=>{
            this.columns=this.directInAndOut.tableColumnsUseReturn;
          });
          this.isShowInType = false;
        }
        this.excuteAPI(this.modelSearchFilter).then((response) => {
          if (response.data && response.data) {
            this.directInAndOut.dataTable.data = response.data.rows;
            this.directInAndOut.dataTable.total = response.data.total;
            //得到已选择ID
            if (this.data && this.data.length > 0) {
              let data = this.data;
              this.directInAndOut.selectedIdArray = data.map(row => {
                return row.inDetailId;
              });
            }else{
              this.directInAndOut.selectedIdArray =[];
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangeDirectInAndOut(selection) {
        this.directInAndOut.selectedRows = selection;
        this.$emit('selectionChange', this.directInAndOut);
      },
      /**
       * 当前选择框，未加入可勾选，其他不能勾选
       */
      selectableDirectInAndOut(row, index) {
        if (this.directInAndOut.selectedIdArray.includes(row.detailId))
          return 0;//不可勾选
        else
          return 1;//可勾选
      }
    }
  }
</script>
