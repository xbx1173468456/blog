import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getFinanceShouldIncomes(params) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldIncome/getBpmaFinanceShouldIncomes/${params.proId}`,
    method: 'get',
    params
  })
}

export function getFinanceShouldIncomeDetail(id) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldIncome/${id}`,
    method: 'get'
  })
}

export function deleteFinanceShouldIncomes(params) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldIncome/${params}`,
    method: 'delete'
  })
}

export function reviewFinanceShouldIncomes(data) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldIncome/audit`,
    method: 'put',
    data
  })
}

export function saveFinanceShouldIncomes(data) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldIncome`,
    method: 'post',
    data
  })
}

export function postFinanceShouldIncomes(data) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldIncome/${data.id}`,
    method: 'put',
    data
  })
}

export function getBidSubmitFile(params) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/getContractInfoMasters/${params}`,
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

export function getUnitInfoList(params) {
  return request({
    url: '/api/admin/sysEnterpriseInfo/page',
    method: 'get',
    params: params
  })
}
