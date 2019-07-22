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
      "width": "110",
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
      "text": "入库类型",
      "value": "inType",
      "width": "120"
    },
    {
      "text": "入库总价",
      "value": "totalPrice",
      "width": "150",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true
    },
    {
      "text": "备注",
      "value": "remark",
      align: "left",
      headerAlign: "center",
      showOverflowTooltip: true
    }],
  itemColumns: [
    {
      "text": "物资编码",
      "value": "code",
      "width": "130"
    },
    {
      "text": "物资名称",
      "value": "name",
      "minWidth":"200",
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
      "width": "80"
    },
    {
      "text": "数量(*)",
      "value": "sum",
      "width": "120",
      className:"spacing-set"
    },
    {
      "text": "单价(*)",
      "value": "unitPrice",
      "width": "120",
      className:"spacing-set"
    },
    {
      "text": "总金额",
      "value": "totalPrice",
      "width": "150",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true
    },
    {
      "text": "备注",
      "value": "remark",
      "align": "left",
      className:"spacing-set",
      "minWidth": 140,
      "headerAlign": "center",
      "showOverflowTooltip": true
    }
  ],
  materialTypeColumns: [
    {
      "expand": true,
      "text": '编码',
      "value": 'code',
      "width": 130,
      "align": "left",
      "headerAlign": "center",
      "showOverflowTooltip": true
    },
    {
      "text": '名称',
      "value": 'name',
      "minWidth": 140,
      "align": "left",
      "headerAlign": "center",
      "showOverflowTooltip": true
    }
  ],
  materialColumns: [
    {
      text: '审核状态',
      value: 'validateStatus',
      width: '80'
    },
    {
      text: '启用状态',
      value: 'code',
      width: '80'
    }, {
      text: '系统编码',
      value: 'code',
      width: '130'
    }, {
      text: '名称',
      value: 'name',
      width: '160'
    }, {
      text: '规格型号',
      value: 'model',
      width: '80'
    }, {
      text: '计量单位',
      value: 'units',
      width: '80'
    }, {
      text: '参考单价',
      value: 'price',
      width: '120'
    },
    {
      text: '补充说明',
      value: 'remark',
      width: '160'
    }]
}
