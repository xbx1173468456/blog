export const columnsData = {
    itemColumns:[
        {
           expand: true,
           text: '编码',
           value: 'code',
           width:'130',
          align:'left'
        },
        {
           text: '名称',
           value: 'name',
           align:'left'
        },
        {
            text: '是否末级',
            value: 'ifLastLevel',
            width:'80'
        },
        {
            text: '审核状态',
            value: 'validateStatus',
            width:'80'
        },
        {
            text: '启用状态',
            value: 'enable',
            width:'80'
        },
     ],
     districtColumns:[
        {
           text: '行政编码',
           value: 'districtId',
           width:'130'
        },
        {
           text: '行政名称',
           value: 'district',
           align:'left'
        }
     ],
     enterpriseColumns:[
      {
         text: '审核状态',
         value: 'validateStatus',
         width:'80'
      },
      {
         text: '单位编码',
         value: 'code',
         width:'130'
      },
      {
         text: '单位名称',
         value: 'name',
         width:'200'
      },
      {
         text: '法人代表',
         value: 'legalPerson',
         width:'160'
      },
        {
           text: '成立日期',
           value: 'foundTime',
           align:'left'
        }
     ],
  }
