import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getFinanceFeeBudgetMasters(params) {
  return request({
    url: `/api/bpma/bpmaFinanceFeeBudgetMaster/getFinanceFeeBudgetMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getMasterAndDetail(params) {
  return request({
    url: `/api/bpma/bpmaFinanceFeeBudgetMaster/getMasterAndDetail/${params}`,
    method: 'get',
    params
  })
}

export function getFinanceFeeBudgetMasterDetail(id) {
  return request({
    url: `/api/bpma/bpmaFinanceFeeBudgetMaster/${id}`,
    method: 'get'
  })
}

export function deleteFinanceFeeBudgetMasters(params) {
  return request({
    url: `/api/bpma/bpmaFinanceFeeBudgetMaster/${params}`,
    method: 'delete'
  })
}

export function deleteFinanceFeeBudgetDetail(params) {
  return request({
    url: `/api/bpma/bpmaFinanceFeeBudgetDetail/removeNoAudit/${params}`,
    method: 'delete'
  })
}

export function reviewFinanceFeeBudgetMasters(data) {
  return request({
    url: `/api/bpma/bpmaFinanceFeeBudgetMaster/audit`,
    method: 'put',
    data
  })
}

export function saveFinanceFeeBudgetMasters(data) {
  return request({
    url: `/api/bpma/bpmaFinanceFeeBudgetMaster/addOrUpdateEnterprise`,
    method: 'post',
    data
  })
}

export function getRegistrationList(params) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/getContractInfoMasters/${params}`,
    method: 'get'
  })
}

export function getBidSubmitFile(params) {
  return request({
    url: `/api/bpma/bpmaBidSubmitFile/page`,
    method: 'get'
  })
}

export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}
