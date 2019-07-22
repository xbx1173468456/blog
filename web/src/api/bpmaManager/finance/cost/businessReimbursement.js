import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getFinanceBusinessExpenseMaster(params) {
  return request({
    url: `/api/bpma/bpmaFinanceBusinessExpenseMaster/getFinanceFeeBudgetMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getFinanceBusinessExpenseMasterDetail(id) {
  return request({
    url: `/api/bpma/bpmaFinanceBusinessExpenseMaster/${id}`,
    method: 'get'
  })
}

export function getMasterAndDetail(params) {
  return request({
    url: `/api/bpma/bpmaFinanceBusinessExpenseMaster/getMasterAndDetail/${params}`,
    method: 'get',
    params
  })
}

export function getNoPaymentAmount(params) {
  return request({
    url: `/api/bpma/bpmaFinanceDailyExpenseMaster/getNoPaymentAmount`,
    method: 'get',
    params
  })
}

export function deleteFinanceBusinessExpenseMaster(params) {
  return request({
    url: `/api/bpma/bpmaFinanceBusinessExpenseMaster/${params}`,
    method: 'delete'
  })
}

export function deleteFinanceBusinessExpenseDetail(params) {
  return request({
    url: `/api/bpma/bpmaFinanceBusinessExpenseDetail/removeNoAudit/${params}`,
    method: 'delete'
  })
}

export function reviewFinanceBusinessExpenseMaster(data) {
  return request({
    url: `/api/bpma/bpmaFinanceBusinessExpenseMaster/audit`,
    method: 'put',
    data
  })
}

export function saveFinanceBusinessExpenseMaster(data) {
  return request({
    url: `/api/bpma/bpmaFinanceBusinessExpenseMaster/addOrUpdateEnterprise`,
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
