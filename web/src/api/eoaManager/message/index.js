import request from 'utils/request'

//消息列表
export function getMessageData(data) {
  console.log(data,'data')
  return request({
    url: '/api/eoa/eoaMessageMaster/page',
    method: 'get',
    params: data
  })
}

//查阅消息
export function changeMessage(data) {
  return request({
    url: '/api/eoa/eoaMessageMaster/'+data.id,
    method: 'put',
    data: data
  })
}
