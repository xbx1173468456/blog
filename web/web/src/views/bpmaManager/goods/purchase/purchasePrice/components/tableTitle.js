export const columnsData2 = {
  indexTable: [
    {
      "text": "审核状态",
      "value": "validateStatus",
      "width": "80"
    },
    {
      "text": "单据编码",
      "value": "code",
      "width": "160"
    },
    {
      "text": "单据名称",
      "value": "name",
      "width": "110"
    },
    {
      "text": "项目名称",
      "value": "proName",
      "width": "160"
    },
    {
      "text": "出库类型",
      "value": "outType",
      "width": "120"
    }, {
      "text": "出库总价",
      "value": "totalPrice",
      "width": "120"
    }, {
      "text": "备注",
      "value": "remark"
    }
  ],
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
    "width": 200
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
  itemColumns: [
    {
      "text": "物资编码",
      "value": "code",
      "className": "spacing-set"
    },
    {
      "text": "物资名称",
      "value": "name",
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
      "width": "150",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "库存单价",
      "value": "inUnitPrice",
      "width": "150",
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
      "width": "160"
    },
    {
      "text": "物资名称",
      "value": "name",
      "width": "120"
    },
    {
      "text": "规格型号",
      "value": "model",
      "width": "100"
    },
    {
      "text": "计量单位",
      "value": "unit",
      "width": "100"
    },
    {
      "text": "数量",
      "value": "sum",
      "width": "150"
    },
    {
      "text": "单价",
      "value": "unitPrice",
      "width": "150"
    },
    {
      "text": "金额",
      "value": "totalPrice",
      "width": "150",
      "className": "spacing-set"
    },
    {
      "text": "配送方式",
      "value": "transportMode",
      "width": "200",
      "select": true
    },
    {
      "text": "摘要",
      "value": "summary"
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
      width: '160'
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
      width: '160'
    },
    {
      text: '补充说明',
      value: 'remark',
      width: '160'
    }]
}
