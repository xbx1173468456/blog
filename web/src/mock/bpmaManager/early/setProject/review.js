import Mock from 'mockjs'

export default {
  item: { //项目列表
    'message': '项目列表获取成功',
    'rel': true,
    'status': 200,
    'data|1-5': [{
      'id|+1': 0,
      'key|+1': 0,
      'name|1':['龙湖.时代天骄 ',"万科.魅力之城","成德南高速公路57标段"]
    }]
  },
  list:{ //公告列表
    'message': '方案列表获取成功',
    'rel': true,
    'status': 200,
    'total': 18,
    'rows|10':[{
      "code|+1": "20190101-0001",
      'name|1':['龙湖.时代天骄 ',"万科.魅力之城","成德南高速公路57标段"],
      "mode|1": ["公开招标","邀请招标", "竞争性谈判", "比选","单一来源"],
      "id|+1": 0,
      "itemId|1":[1,2,3,4],
      "person|1": ['张三','李四','王五'],
      "planPerson|1": ['施工员1','施工员2','施工员33'],
      "code": Mock.Random.cword(2),
      "remark": Mock.Random.cword(8),
      "inputPerson": Mock.Random.cname(),
      "inputPersonId": 0,
      "inputTime": Mock.Random.datetime(),
      "overTime": Mock.Random.datetime(),
      "userId": 0,
      "content|1":["方案1","方案2","方案3"],
      "validateStatus|1":[1,2],
    }]
  },
  detail:{
    'message': '详情获取成功',
    'rel': true,
    'status': 200,
    'data':{
      "code": "20190101-0001",
      "proName|1":['龙湖.时代天骄 ',"万科.魅力之城","成德南高速公路57标段"],
      'name|1':['龙湖.时代天骄 ',"万科.魅力之城","成德南高速公路57标段"],
      "mode|1": ["公开招标","邀请招标", "竞争性谈判", "比选","单一来源"],
      "date":Mock.Random.date('yyyy-MM-dd'),
      "id": 0,
      "itemId|1":[1,2,3,4],
      "person": Mock.Random.cname(),
      "telephone": /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/,
      "address": Mock.Random.region(),
      "content": "公告内容",
      "remark":"补充说明",

      "inputPerson": Mock.Random.cname(),

      "inputPersonId": 0,

      "inputTime": Mock.Random.datetime(),
      "userId": 0,
      "validateStatus|1":[1,2],
    }
  },
  save:{
    'message': '保存成功',
    'rel': true,
    'status': 200,
    'data':null
  },
  add:{
    'message': '保存成功',
    'rel': true,
    'status': 200,
    'data':null
  },
  delete:{
    'message': '删除成功',
    'rel': true,
    'status': 200,
    'data':null
  },
  audit:{
    'message': '审核成功',
    'rel': true,
    'status': 200,
    'data':null
  }
}
