import request from 'utils/request'

//查看当前能看的项目
export function getAllTrackRecordItem(data) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params: data
  })
}

//获取跟踪列表
export function getAllTrackRecord(data) {
  return request({
    url: '/api/bpma/bpmaProTrack/page',
    method: 'get',
    params: data
  })
}


//保存
export function saveTrackRecord(data) {
  return request({
    url: '/api/bpma/bpmaProTrack',
    method: 'post',
    data: data
  })
}

//查看详情
export function getTrackRecord(id) {
  return request({
    url: '/api/bpma/bpmaProTrack/'+id,
    method: 'get'
  })
}

//删除
export function deleteTrackRecord(id) {
  return request({
    url: '/api/bpma/bpmaProTrack/'+id,
    method: 'delete'
  })
}





//审核
export function auditTrackRecord(data) {
  return request({
    url: '/api/bpma/bpmaProTrack/audit',
    method: 'put',
    data: data
  })
}



//修改
export function updateTrackRecord(data) {
  return request({
    url: '/api/bpma/bpmaProTrack/'+data.id,
    method: 'put',
    data:data
  })
}
