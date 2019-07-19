import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getFinanceDailyExpenseMaster(params) {
  return request({
    url: `/api/bpma/bpmaFinanceDailyExpenseMaster/getFinanceDailyExpenseMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getMasterAndDetail(params) {
  return request({
    url: `/api/bpma/bpmaFinanceDailyExpenseMaster/getMasterAndDetail/${params}`,
    method: 'get',
    params
  })
}

export function getFinanceDailyExpenseMasterDetail(id) {
  return request({
    url: `/api/bpma/bpmaFinanceDailyExpenseMaster/${id}`,
    method: 'get'
  })
}

export function getNoPaymentAmount(params) {
  return request({
    url: `/api/bpma/bpmaFinanceDailyExpenseMaster/getNoPaymentAmount`,
    method: 'get',
    params
  })
}

export function deleteFinanceDailyExpenseMaster(params) {
  return request({
    url: `/api/bpma/bpmaFinanceDailyExpenseMaster/${params}`,
    method: 'delete'
  })
}

export function deleteFinanceDailyExpenseMasterDetail(params) {
  return request({
    url: `/api/bpma/bpmaFinanceDailyExpenseDetail/removeNoAudit/${params}`,
    method: 'delete'
  })
}

export function reviewFinanceDailyExpenseMaster(data) {
  return request({
    url: `/api/bpma/bpmaFinanceDailyExpenseMaster/audit`,
    method: 'put',
    data
  })
}

export function saveFinanceDailyExpenseMaster(data) {
  return request({
    url: `/api/bpma/bpmaFinanceDailyExpenseMaster/addOrUpdateEnterprise`,
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
