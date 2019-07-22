import request from 'utils/request'
//查看列表
export function selectBudget(data) {
  return request({
    url: '/api/bpma/bpmaMaterialApplyMaster/page',
    method: 'get',
    params: data
  })
}
//查看详情
export function getBudgetDetail(proId) {
  return request({
    url: `/api/bpma/bpmaMaterialApplyMaster/getMasterAndDetail/${proId}`,
    method: 'get'
  })
}

//批量保存
export function add(data) {
  return request({
    url: '/api/bpma/bpmaMaterialApplyMaster/addOrUpdateEnterprise',
    method: 'post',
    data: data
  })
}

//审核
export function auditTrack(data) {
  return request({
    url: '/api/bpma/bpmaMaterialApplyMaster/audit',
    method: 'put',
    data: data
  })
}

//删除
export function deleteTrack(id) {
  return request({
    url: `/api/bpma/bpmaMaterialApplyMaster/deleteMasterAndDetail/${id}`,
    method: 'delete'
  })
}

//查看物资使用量情况
export function getMaterialUseInfo(data) {
  return request({
    url: '/api/bpma/bpmaMaterialApplyDetail/getMaterialUseInfo',
    method: 'post',
    data: data
  })
}
//删除详表
export function delDetail(id) {
  return request({
    url: `/api/bpma/bpmaMaterialApplyDetail/${id}`,
    method: 'delete'
  })
}
