export const columnsData = {
  indexTable: [
    {
     "text": "审核状态",
     "value": "validateStatus",
     "width":"80"
   },
   {
     "text": "单据编码",
     "value": "code",
     "width":"130"
   },
   {
     "text": "单据名称",
     "value": "name",
     "minWidth":"200",
     align: "left",
     headerAlign: "center",
     showOverflowTooltip: true
   },
   {
     "text": "项目名称",
     "value": "proName",
     "minWidth":"200",
     align: "left",
     headerAlign: "center",
     showOverflowTooltip: true
   },
   {
    "text": "盘点人员",
    "value": "handlePerson",
    "width":"80",
     showOverflowTooltip: true
  },
   {
     "text": "盘点日期",
     "value": "handleDate",
     "width":"120"
   },
   {
    "text": "库存金额",
    "value": "stockPrice",
    "width":"120",
     align: "right",
     headerAlign: "center",
     showOverflowTooltip: true
  },{
    "text": "盘点金额",
    "value": "checkPrice",
    "width":"120",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true
  },{
    "text": "盈亏金额",
    "value": "profitLossPrice",
      "width":"120",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true
  },{
    "text": "备注",
    "value": "remark",
    "width":"120",
      align: "left",
      headerAlign: "center",
      showOverflowTooltip: true
  }
  ],
  itemColumns: [
    {
      "text": "物资编码","width":"130",
      "value": "code",
      "className": "spacing-set"
    },
    {
      "text": "物资名称",
      "value": "name","minWidth":"200",
      "className": "spacing-set"
    },
    {
      "text": "规格型号",
      "value": "model",
      "width": "100",
      "className": "spacing-set"
    },
    {
      "text": "计量单位",
      "value": "unit",
      "width": "100",
      "className": "spacing-set"
    },
    {
      "text": "库存数量",
      "value": "inSum",
      "width": "120",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "库存单价",
      "value": "inUnitPrice",
      "width": "120",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "库存总价",
      "value": "inTotalPrice",
      "width": "150",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    }
  ],
  itemColumns2: [
    {
      "text": "物资编码",
      "value": "code",
      "width": "130",
    },
    {
      "text": "物资名称",
      "value": "name",
      "minWidth":"200",
      "align": "left",
      "headerAlign": "center",
      "showOverflowTooltip": true
    },
    {
      "text": "规格型号",
      "value": "model",
      "width": "100",
      "align": "left",
      "headerAlign": "center",
      "showOverflowTooltip": true
    },
    {
      "text": "计量单位",
      "value": "unit",
      "width": "100",
      "className": "spacing-set"
    },
    {
      "text": "库存数量",
      "value": "stockSum",
      "width": "120",
      "showTable": true,
      "types": true,
    },
    {
      "text": "库存单价",
      "value": "stockUnitPrice",
      "width": "120",
      "showTable": true,
      "types": true,
    },
    {
      "text": "库存总价",
      "value": "stockTotalPrice",
      "width": "150",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "盘点数量(*)",
      "value": "checkSum",
      "width": "120",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "盘点总价(*)",
      "value": "checkTotalPrice",
      "width": "150",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "盈亏数量(*)",
      "value": "profitLossSum",
      "width": "120",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "盈亏总价(*)",
      "value": "profitLossTotalPrice",
      "width": "150",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "备注",
      "value": "remark",
      "align": "left",
      "showTable": true,
      "minWidth": 140,
      "headerAlign": "center",
      "className": "spacing-set"
    }
  ]
}
