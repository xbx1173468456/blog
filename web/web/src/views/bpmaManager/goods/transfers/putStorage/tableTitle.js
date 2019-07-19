
export const columnsData = {
  indexTable: [
    {
      "text": "审核状态",
      "value": "validateStatus",
      "width": "80"
    },
    {
      "text": "单据编码",
      "value": "code",
      "width": "130"
    },
    {
      "text": "单据名称",
      "value": "name",
      "minWidth":"200",
      "showOverflowTooltip":true
    },
    {
      "text": "项目名称",
      "value": "proName",
      "minWidth":"200",
      "showOverflowTooltip":true
    },
    {
      "text": "收货日期",
      "value": "handleDate",
      "width": "120"
    },
    {
      "text": "调拨总价",
      "value": "totalPrice",
      "width": "150"
    },
    {
      "text": "备注",
      "value": "remark",
      "showOverflowTooltip":true
    }],
  // 已入库数量  未入库数量
  //调拨入库详情页面引入调拨出库弹窗需要显示的字段
  itemColumns: [
    {
      "text": "调拨出库单号",
      "value": "masterCode",
      "width": 120,
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
      "width": 120,
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
      "minWidth":"200",
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
      "width": "100",
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
  itemColumns2: [
    {
      "text": "调拨单号",
      "value": "allocateOutCode",
      "width": "130",
      showOverflowTooltip: true,
    },
    {
      "text": "物资编码",
      "value": "code",
      "width": "130",
      showOverflowTooltip: true,
    },
    {
      "text": "物资名称",
      "value": "name",
      "minWidth":"200",
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
    },
    {
      "text": "调拨数量",
      "value": "allocateSum",
      "width": "120",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "已收数量(*)",
      "value": "receivedSum",
      "width": "120",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "未收数量",
      "value": "unreceivedSum",
      "width": "120",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "实收数量",
      "value": "receiveSum",
      "width": "120",
      "className": "spacing-set"
    },
    {
      "text": "调拨单价",
      "value": "unitPrice",
      "width": "120",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "调拨总价",
      "value": "totalPrice",
      "width": "150",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true,
      "className": "spacing-set"
    },
    {
      "text": "备注",
      "value": "remark",
      "align": "left",
      "minWidth": 140,
      headerAlign: "center",
      "className": "spacing-set"
    }
  ]
}
