/**
 * 使用该文件条件：后端自定义枚举数据，通过API能获取数据Enum
 * 就使用该文件定义对应静态数据
 */
export const staticDataEnum = {
  validateStatus: [{
    code: 1,
    name: '已审核'
  },
    {
      code: 2,
      name: '未审核'
    }, {
      code: 3,
      name: '审核中'
    }],
  type: [{
    code: 1,
    name: '机构'
  },
    {
      code: 2,
      name: '部门'
    },
    {
      code: 3,
      name: '岗位'
    }],
  enable: [{
    code: 1,
    name: '启用'
  },
    {
      code: 2,
      name: '禁用'
    }],
  isOrNot: [{
    code: 1,
    name: '是'
  },
    {
      code: 2,
      name: '否'
    }],
  gender: [{
    code: "1",
    name: '男'
  },
    {
      code: "2",
      name: '女'
    }],
  readStatus: [{
    code: 1,
    name: '已阅读'
  },
    {
      code: 2,
      name: '未阅读'
    }],
  operate: [{
    code: 1,
    name: '自营'
  },
    {
      code: 2,
      name: '联营'
    }],
    itemStage: [{
      code: 1,
      name: '前期'
    },
      {
        code: 2,
        name: '中期'
      }, {
        code: 3,
        name: '后期'
      }, {
        code: 4,
        name: '结束'
      }],
  siginStatus: [{
    code: 1,
    name: '已签约'
  },
    {
      code: 2,
      name: '未签约'
    }],
  useEnterpriseType:[
    {
      code: 1,
      name: "内部机构"
    },
    {
      code: 2,
      name: "外部单位"
    }
  ],
  inPutType:[
    {
      code: 1,
      name: "直进直出"
    },
    {
      code: 2,
      name: "采购入库"
    },
    {
      code: 3,
      name: "其他入库"
    },
    {
      code: 8,
      name: "调拨入库"
    }
  ]
}
