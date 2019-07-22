import request from 'utils/request'


//获取踏勘列表
export function selectTrack(data) {
  return request({
    url: '/api/bpma/bpmaProSurvey/page',
    method: 'get',
    params: data
  })
}
/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllrecRecordItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

//保存
export function saveRecRecord(data) {
  return request({
    url: '/api/bpma/bpmaProSurvey',
    method: 'post',
    data: data
  })
}

//查看详情
export function getRecRecord(id) {
  return request({
    url: '/api/bpma/bpmaProSurvey/'+id,
    method: 'get'
  })
}

//删除
export function deleteRecRecord(id) {
  return request({
    url: '/api/bpma/bpmaProSurvey/'+id,
    method: 'delete'
  })
}





//审核
export function auditRecRecord(data) {
  return request({
    url: '/api/bpma/bpmaProSurvey/audit',
    method: 'put',
    data: data
  })
}



//修改
export function updateRecRecord(data) {
  return request({
    url: '/api/bpma/bpmaProSurvey/'+data.id,
    method: 'put',
    data:data
  })
}
