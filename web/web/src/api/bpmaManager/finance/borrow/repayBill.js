import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getFinanceReturns(params) {
  return request({
    url: `/api/bpma/bpmaFinanceReturn/getBpmaFinanceReturns/${params.proId}`,
    method: 'get',
    params
  })
}

export function getFinanceReturnsDetail(id) {
  return request({
    url: `/api/bpma/bpmaFinanceReturn/${id}`,
    method: 'get'
  })
}

export function deleteFinanceReturns(params) {
  return request({
    url: `/api/bpma/bpmaFinanceReturn/${params}`,
    method: 'delete'
  })
}

export function reviewFinanceReturns(data) {
  return request({
    url: `/api/bpma/bpmaFinanceReturn/audit`,
    method: 'put',
    data
  })
}

export function saveFinanceReturns(data) {
  return request({
    url: `/api/bpma/bpmaFinanceReturn`,
    method: 'post',
    data
  })
}

export function postFinanceReturns(data) {
  return request({
    url: `/api/bpma/bpmaFinanceReturn/${data.id}`,
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

export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}
