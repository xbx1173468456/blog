import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getFinanceIncome(params) {
  return request({
    url: `/api/bpma/bpmaFinanceIncome/getBpmaFinanceIncomes/${params.proId}`,
    method: 'get',
    params
  })
}

export function getFinanceIncomeDetail(id) {
  return request({
    url: `/api/bpma/bpmaFinanceIncome/${id}`,
    method: 'get'
  })
}

export function deleteFinanceIncome(params) {
  return request({
    url: `/api/bpma/bpmaFinanceIncome/${params}`,
    method: 'delete'
  })
}

export function reviewFinanceIncome(data) {
  return request({
    url: `/api/bpma/bpmaFinanceIncome/audit`,
    method: 'put',
    data
  })
}

export function saveFinanceIncome(data) {
  return request({
    url: `/api/bpma/bpmaFinanceIncome`,
    method: 'post',
    data
  })
}

export function postFinanceIncome(data) {
  return request({
    url: `/api/bpma/bpmaFinanceIncome/${data.id}`,
    method: 'put',
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
