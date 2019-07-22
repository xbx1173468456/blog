import Mock from 'mockjs'

export default {
  allItemData: { //项目列表
    'message': '项目列表获取成功',
    'rel': true,
    'status': 200,
    'data|1-5': [{
      'id|+1': 0,
      'key|+1': 0,
      'name|1':['龙湖.时代天骄 ',"万科.魅力之城","成德南高速公路57标段"]
    }]
  },
  dataDictionary:{

    'message': '数据字典获取成功',
    'rel': true,
    'status': 200,
    'modeList|5':[ //招标方式
      {
        'id|+1': 0,
        'label|+1': 0,
        "mode|1": ["公开招标","邀请招标", "竞争性谈判", "比选","单一来源"],
      }
    ],
  },
  announcementList:{ //公告列表
    'message': '公告列表获取成功',
    'rel': true,
    'status': 200,
    'total': 13,
    'rows|13':[{
      "code|+1": "20190101-0001",
      'name|1':['龙湖.时代天骄 ',"万科.魅力之城","成德南高速公路57标段"],
      "mode|1": ["公开招标","邀请招标", "竞争性谈判", "比选","单一来源"],
      "date":Mock.Random.date('yyyy-MM-dd'),
      "id|+1": 0,
      "itemId|1":[1,2,3,4],
      "person|1": ['张三','李四','王五'],
      "telephone": /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/,
      "address": Mock.Random.region(),
      "content": Mock.Random.cword(2),
      "remark": Mock.Random.cword(3),

      "inputPerson": Mock.Random.cname(),

      "inputPersonId": 0,

      "inputTime": Mock.Random.datetime(),
      "userId": 0,
      "validateStatus|1":[1,2],
    }]
  },
  announcementFormData:{
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
  saveAnnouncementFormData:{
    'message': '保存成功',
    'rel': true,
    'status': 200,
    'data':null
  },
  deleteAnnouncementFormData:{
    'message': '删除成功',
    'rel': true,
    'status': 200,
    'data':null
  },
  auditAnnouncementFormData:{
    'message': '审核成功',
    'rel': true,
    'status': 200,
    'data':null
  }
}
