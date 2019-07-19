
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
      align: "left",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "调出项目",
      "value": "outProName",
      "width": "160",
      align: "left",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "调入项目",
      "value": "inProName",
      "width": "160",
      align: "left",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "调拨日期",
      "value": "handleDate",
      "width": "120",
      "showOverflowTooltip":true
    },
    {
      "text": "调拨金额",
      "value": "totalPrice",
      "width": "120"
    },
    {
      "text": "库存总价",
      "value": "stockTotalPrice",
      "width": "150"
    },
    {
      "text": "经办人员",
      "value": "handlePerson",
      "width": "120"
    },
    {
      "text": "备注",
      "value": "remark",
      "align": "left",
      "width": "90",
      "showOverflowTooltip":true
    }],
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
      "value": "stockSum",
      "width": "120",
      "showTable": true,
      "types": true
    },
    {
      "text": "库存单价",
      "value": "stockUnitPrice",
      "width": "120",
      "showTable": true,
      "types": true
    }
  ],
  itemColumns2: [
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
      "width": "100",
    },
    {
      "text": "库存数量",
      "value": "stockSum",
      "width": "120",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true
    },
    {
      "text": "库存单价",
      "value": "stockUnitPrice",
      "width": "120",
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
    },
    {
      "text": "调拨数量(*)",
      "value": "outSum",
      "width": "120",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "调拨单价(*)",
      "value": "outUnitPrice",
      "width": "120",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "调拨总价(*)",
      "value": "outTotalPrice",
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
      showOverflowTooltip: true,
      "className": "spacing-set"
    }
  ]
}
