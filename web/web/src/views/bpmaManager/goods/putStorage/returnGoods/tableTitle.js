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
      "align": "left",
      "headerAlign": "center",
      "showOverflowTooltip": true
    },
    {
      "text": "项目名称",
      "value": "proName",
      "minWidth":"200",
      "align": "left",
      "headerAlign": "center",
      "showOverflowTooltip": true
    },
    {
      "text": "供方单位名称",
      "value": "offerEnterpriseName",
      "width": "120",
      "align": "left",
      "headerAlign": "center",
      "showOverflowTooltip": true
    },
    {
      "text": "合同名称",
      "value": "contractName",
      "minWidth":"200",
      "align": "left",
      "headerAlign": "center",
      "showOverflowTooltip": true
    },
    {
      "text": "退货人员",
      "value": "returnPerson",
      "width": "120"
    },
    {
      "text": "退货日期",
      "value": "handleDate",
      "width": "120"
    },
    {
      "text": "采购总价",
      "value": "buyTotalPrice",
      "width": "150",
      "align": "right",
      "headerAlign": "center",
      "showOverflowTooltip": true
    },
    {
      "text": "备注",
      "value": "remark",
      "width": "120",
      "showOverflowTooltip": true
    }],
  contractColums: [{
    "value": "validateStatus",
    "text": "审核状态",
    "align": "center",
    "width": 80
  }, {
    "value": "code",
    "text": "评审单号",
    "align": "center",
    "width": 120
  }, {
    "value": "name",
    "text": "合同名称",
    "minWidth":"200",
  }, {
    "value": "beforeTaxPrice",
    "text": "价税合计金额",
    "width": 110
  }, {
    "value": "afterTaxPrice",
    "text": "税后合计金额",
    "width": 110
  }, {
    "value": "invoiceType",
    "text": "发票类型",
    "width": 120
  }, {
    "value": "invoiceTaxRate",
    "text": "发票税率",
    "align": "center"
  }, {
    "value": "tax",
    "text": "应交税额",
    "width": 110
  }, {
    "value": "inputPerson",
    "text": "登记人员",
    "width": 110
  }, {
    "value": "inputTime",
    "text": "登记时间",
    "width": 160
  }],
  itemColumns2: [
    {
      "text": "入库单号",
      "value": "inCode",
      "width": "130"
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
      "width": "80"
    },
    {
      "text": "退货数量(*)",
      "value": "returnSum",
      "width": "120",
      className:"spacing-set"
    },
    {
      "text": "退货单价(*)",
      "value": "returnUnitPrice",
      "width": "120",
      className:"spacing-set"
    },
    {
      "text": "退货总价",
      "value": "returnTotalPrice",
      "width": "150",
      className:"spacing-set"
    },
    {
      "text": "原采购数量",
      "value": "buySum",
      "width": "120",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "原采购单价",
      "value": "buyUnitPrice",
      "width": "120",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "原采购总价",
      "value": "buyTotalPrice",
      "width": "150",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "当前库存数",
      "value": "stockSum",
      "width": "150",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "已退货数量",
      "value": "returnedSum",
      "width": "120",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "可退货数量",
      "value": "canReturnSum",
      "width": "120",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "摘要",
      "value": "remark",
      "align": "left",
      "showTable": true,
      "minWidth": 140,
      "headerAlign": "center",
      className:"spacing-set"
    }
  ],
  materialTypeColumns: [
    {
      "expand": true,
      "text": '编码',
      "value": 'code',
      "width": 120,
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
