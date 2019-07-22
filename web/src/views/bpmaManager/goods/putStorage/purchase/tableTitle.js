export const columnsData = {
  indexTable: [
    {
      "text": "审核状态",
      "value": "validateStatus",
      "width": "80",
      "showOverflowTooltip": true
    },
    {
      "text": "单据编码",
      "value": "code",
      "width": "130",
      "showOverflowTooltip": true
    },
    {
      "text": "单据名称",
      "value": "name",
      "minWidth": "150",
      align: "left",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "项目名称",
      "value": "proName",
      "minWidth":"200",
      align: "left",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "供方单位名称",
      "value": "offerEnterpriseName",
      "width": "120",
      align: "left",
      headerAlign: "center",
      showOverflowTooltip: true,
    },
    {
      "text": "是否垫付",
      "value": "ifSubstitutePay",
      "width": "80",
      "showOverflowTooltip": true
    },
    {
      "text": "垫付人员",
      "value": "payPerson",
      "width": "80",
      "showOverflowTooltip": true
    },
    {
      "text": "采购总价",
      "value": "buyTotalPrice",
      "width": "150",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true
    },
    {
      "text": "送货人员",
      "value": "deliverPerson",
      "width": "120",
      "showOverflowTooltip": true
    },
    {
      "text": "收货人员",
      "value": "receivePerson",
      "width": "120",
      "showOverflowTooltip": true
    },
    {
      "text": "收货日期",
      "value": "handleDate",
      "width": "100",
      "showOverflowTooltip": true
    }, {
      "text": "备注",
      "value": "remark",
      "width": "120",
      align: "left",
      headerAlign: "center",
      showOverflowTooltip: true,
    }],
  contractColums: [{
    "value": "validateStatus",
    "text": "审核状态",
    "align": "center",
    "width": 80,
    "showOverflowTooltip": true
  }, {
    "value": "code",
    "text": "评审单号",
    "align": "center",
    "width": 120,
    "showOverflowTooltip": true
  }, {
    "value": "name",
    "text": "合同名称",
    "minWidth":"200",
    "showOverflowTooltip": true
  }, {
    "value": "beforeTaxPrice",
    "text": "价税合计金额",
    "width": 110,
    "showOverflowTooltip": true
  }, {
    "value": "afterTaxPrice",
    "text": "税后合计金额",
    "width": 110,
    "showOverflowTooltip": true
  }, {
    "value": "invoiceType",
    "text": "发票类型",
    "width": 120,
    "showOverflowTooltip": true
  }, {
    "value": "invoiceTaxRate",
    "text": "发票税率",
    "align": "center",
    "showOverflowTooltip": true
  }, {
    "value": "tax",
    "text": "应交税额",
    "width": 110,
    "showOverflowTooltip": true
  }, {
    "value": "inputPerson",
    "text": "登记人员",
    "width": 110,
    "showOverflowTooltip": true
  }, {
    "value": "inputTime",
    "text": "登记时间",
    "width": 160,
    "showOverflowTooltip": true
  }],
  itemColumns: [
    {
      "text": "物资编码",
      "value": "code",
      "width": "130",
      align: "center",
      showOverflowTooltip: true
    },
    {
      "text": "物资名称",
      "value": "name",
      "minWidth": "200",
      align: "left",
      headerAlign: "center",
      showOverflowTooltip: true
    },
    {
      "text": "规格型号",
      "value": "model",
      "width": "100",
      "showOverflowTooltip": true
    },
    {
      "text": "计量单位",
      "value": "unit",
      "width": "100",
      "showOverflowTooltip": true
    },
    {
      "text": "采购数量(*)",
      "value": "buySum",
      "width": "120",
      className:"spacing-set",
      "showOverflowTooltip": true
    },
    {
      "text": "采购单价(*)",
      "value": "buyUnitPrice",
      "width": "120",
      className:"spacing-set",
      "showOverflowTooltip": true
    },
    {
      "text": "采购总价",
      "value": "buyTotalPrice",
      "width": "150",
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true
    },
    {
      "text": "备注",
      "value": "remark",
      "align": "left",
      "showTable": true,
      "minWidth": 140,
      "headerAlign": "center",
      className:"spacing-set",
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
      width: '80',
      "showOverflowTooltip": true
    },
    {
      text: '启用状态',
      value: 'code',
      width: '80',
      "showOverflowTooltip": true
    }, {
      text: '系统编码',
      value: 'code',
      width: '130',
      "showOverflowTooltip": true
    }, {
      text: '名称',
      value: 'name',
      width: '160',
      "showOverflowTooltip": true
    }, {
      text: '规格型号',
      value: 'model',
      width: '80',
      "showOverflowTooltip": true
    }, {
      text: '计量单位',
      value: 'units',
      width: '80',
      "showOverflowTooltip": true
    }, {
      text: '参考单价',
      value: 'price',
      width: '120',
      align: "right",
      headerAlign: "center",
      showOverflowTooltip: true
    },
    {
      text: '补充说明',
      value: 'remark',
      width: '160',
      "showOverflowTooltip": true
    }]
}
