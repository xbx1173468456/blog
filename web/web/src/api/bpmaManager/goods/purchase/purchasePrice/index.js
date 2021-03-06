import request from 'utils/request'
//查看报价列表
export function selectBudget2(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOfferMaster/page',
    
    method: 'get',
    params: data
  })
}
//查看列表
export function selectBudget(data) {
  return request({
    url: `/api/bpma/bpmaMaterialInquiryMaster/getMaterialApplyMasters/${data.proId}`,
    method: 'get',
    params: data
  })
}
//查看详情
export function getBudgetDetail(proId) {
  return request({
    url: `/api/bpma/bpmaMaterialOfferMaster/getMasterAndDetail/${proId}`,
    method: 'get'
  })
}

//批量保存
export function add(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOfferMaster/addOrUpdateEnterprise',
    method: 'post',
    data: data
  })
}

//审核
export function auditTrack(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOfferMaster/audit',
    method: 'put',
    data: data
  })
}

//删除
export function deleteTrack(id) {
  return request({
    url: `/api/bpma/bpmaMaterialOfferMaster/deleteMasterAndDetail/${id}`,
    method: 'delete'
  })
}

//删除详表
export function delDetail(id) {
  return request({
    url: `/api/bpma/bpmaMaterialOfferDetail/${id}`,
    method: 'delete'
  })
}

