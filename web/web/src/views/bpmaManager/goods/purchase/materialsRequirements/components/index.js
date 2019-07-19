export const columnsData = {
    itemColumns:[
      {
         text: '审核状态',
         value: 'validateStatus',
         width:'80'
       },
       {
         text: '系统编码',
         value: 'code',
         width:'160'
       },
       {
         text: '年度批次',
         value: 'year',
         align:'left',
         align:'left'
       },
       {
         text: '项目名称',
         value: 'name',
         align:'left'
       },
       {
         text: '原始编码',
         value: 'orignalCode',
         width:'160'
       },
       {
         text: '项目类型',
         value: 'typeId',
         width:'160'
       },
       {
         text: '建设性质',
         value: 'natureId',
         width:'160'
       },
       {
         text: '项目阶段',
         value: 'stageId',
         width:'160'
       },
       {
         text: '政府投资',
         value: 'ifGovInvest',
         width:'80'
       },
       {
         text: '业务区域',
         value: 'area',
         width:'160'
       },
       {
         text: '行政区划',
         value: 'district',
         width:'160'
       },
       {
         text: '详细地址',
         value: 'address',
         width:'160'
       },
       {
         text: '经营方式',
         value: 'operationWay',
         width:'80'
       },
       {
         text: '联营单位',
         value: 'enterpriseId',
         width:'160'
       },
       {
         text: '联营说明',
         value: 'operationExplain',
         width:'160'
       },
       {
         text: '建设单位',
         value: 'buildEnterprise',
         width:'160'
       },
       {
         text: '设计单位',
         value: 'designEnterprise',
         width:'160'
       },
       {
         text: '监理单位',
         value: 'superviseEnterprise',
         width:'160'
       },
       {
         text: '单位说明',
         value: 'enterpriseExplain',
         width:'160'
       },
       {
         text: '项目概况',
         value: 'designEnterprise',
         width:'160'
       },
       {
         text: '登记人员',
         value: 'inputPerson',
         width:'160'
       },
       {
         text: '登记时间',
         value: 'inputPerson',
         width:'80'
       }
     ],
     districtColumns:[
        {
           text: '行政编码',
           value: 'districtId',
           width:'160'
        },
        {
           text: '行政名称',
           value: 'district',
           align:'left'
        }
     ],
     formCodeColumns:[
         {
               "value": "validateStatus",
               "text": "审核状态"
         }, {
               "value": "code",
               "text": "单据编号"
         }, {
               "value": "contractName",
               "text": "合同名称",
               "width":'160'
         }, {
               "value": "name",
               "text": "变更名称",
               "width":'160'
         }, {
               "value": "orignalCode",
               "text": "原变更单号",
               "width":'160'
         }, {
               "value": "handlePerson",
               "text": "变更人员"
         }, {
               "value": "date",
               "text": "变更日期"
         }, {
               "value": "reason",
               "text": "变更原因"
         }, {
               "value": "content",
               "text": "变更内容"
         }, {
               "value": "effect",
               "text": "变更影响"
         }, {
               "value": "inputPerson",
               "text": "登记人员"
         }, {
               "value": "inputTime",
               "text": "登记时间"
         }],
         visaData:[{
            "value": "validateStatus",
            "text": "审核状态"
          },{
            "value": "code",
            "text": "单据编码"
          },{
            "value": "name",
            "text": "签证名称"
          },{
            "value": "proName",
            "text": "项目名称"
          },{
            "value": "contractName",
            "text": "合同名称"
          },{
            "value": "orignalCode",
            "text": "原签证单号",
            "width": 100
          },{
            "value": "innerPrice",
            "text": "内部核定金额",
            "width": 110
          },{
            "value": "reportPrice",
            "text": "签证上报金额",
            "width": 110
          },{
            "value": "agreePrice",
            "text": "签证批复金额",
            "width": 110
          },{
            "value": "visafileMasterCode",
            "text": "签证资料单号",
            "width": 110
          },{
            "value": "handlePerson",
            "text": "签证人员"
          },{
            "value": "handleDate",
            "text": "签证日期"
          },{
            "value": "inputPerson",
            "text": "登记人员"
          },{
            "value": "inputTime",
            "text": "登记时间"
          }],
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
          materialColumns:[
            {
               text: '审核状态',
               value: 'validateStatus',
               width:'80'
             },
             {
               text: '启用状态',
               value: 'code',
               width:'80'
             },{
              text: '系统编码',
              value: 'code',
              width:'160'
            },{
              text: '名称',
              value: 'name',
              width:'160'
            },{
              text: '规格型号',
              value: 'model',
              width:'80'
            },{
              text: '计量单位',
              value: 'units',
              width:'80'
            },{
              text: '参考单价',
              value: 'price',
              width:'160'
            },
            {
              text: '补充说明',
              value: 'remark',
              width:'160'
            }]
  }