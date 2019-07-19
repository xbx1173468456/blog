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
     "minWidth":"110",
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
    "text": "领用单位类型",
    "value": "useEnterpriseType",
    "width":"120"
  },
   {
     "text": "领用单位名称",
     "value": "useEnterpriseName",
     "width":"120",
     align: "left",
     headerAlign: "center",
     showOverflowTooltip: true
   },
   {
    "text": "领用人员",
    "value": "usePerson",
    "width":"120"
  },{
    "text": "领用日期",
    "value": "handleDate",
    "width":"120"
  },{
    "text": "领用总价",
    "value": "useTotalPrice",
    "width":"150",
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
  itemColumns: [
    {
      "text": "物资编码","width":"130",
      "value": "code",
      "className": "spacing-set"
    },
    {
      "text": "物资名称",
      "value": "name",     "minWidth":"200",
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
      "width": "80",
      "className": "spacing-set"
    },
    {
      "text": "库存数量",
      "value": "stockSum",
      "width": "120",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "库存单价",
      "value": "stockUnitPrice",
      "width": "120",
      "showTable": true,
      "types": true,
      "className": "spacing-set"
    },
    {
      "text": "库存总价",
      "value": "stockTotalPrice",
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
      "width": "80",
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
      "text": "领用数量(*)",
      "value": "useSum",
      "width": "120",
      "className": "spacing-set"
    },
    {
      "text": "领用单价(*)",
      "value": "useUnitPrice",
      "width": "120",
      "className": "spacing-set"
    },
    {
      "text": "领用总价(*)",
      "value": "useTotalPrice",
      "width": "150",
      "className": "spacing-set"
    },
    {
      "text": "用料部位",
      "value": "postion",
      "align": "left",
      "showTable": true,
      "minWidth": 140,
      "headerAlign": "center",
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
