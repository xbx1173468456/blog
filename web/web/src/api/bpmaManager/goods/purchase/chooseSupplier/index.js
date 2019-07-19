import request from 'utils/request'

//查看询价列表
export function selectBudget(data) {
  return request({
    url: '/api/bpma/bpmaMaterialCompareMaster/page',
    method: 'get',
    params: data
  })
}
//查看详情
export function getBudgetDetail(proId) {
  return request({
    url: `/api/bpma/bpmaMaterialCompareMaster/getMasterAndDetail/${proId}`,
    method: 'get'
  })
}

//查看比选列表详情
export function getOfferPriceDetailList(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOfferMaster/getOfferPriceDetail/page',
    method: 'get',
    params: data
  })
}
//批量保存
export function add(data) {
  return request({
    url: '/api/bpma/bpmaMaterialCompareMaster/addOrUpdateEnterprise',
    method: 'post',
    data: data
  })
}

//审核
export function auditTrack(data) {
  return request({
    url: '/api/bpma/bpmaMaterialCompareMaster/audit',
    method: 'put',
    data: data
  })
}

//删除
export function deleteTrack(id) {
  return request({
    url: `/api/bpma/bpmaMaterialCompareMaster/deleteMasterAndDetail/${id}`,
    method: 'delete'
  })
}
//报价单位信息
export function getUnitInfoList(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOfferMaster/page',
    method: 'get',
    params: data
  })
}

//根据项目、询价id查询报价列表
export function getOfferPriceDetail(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOfferMaster/getOfferPriceDetail/page',
    method: 'get',
    params: data
  })
}


