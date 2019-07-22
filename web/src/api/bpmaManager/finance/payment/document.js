import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getFinancePay(params) {
  return request({
    url: `/api/bpma/bpmaFinancePay/page`,
    method: 'get',
    params
  })
}

export function getFinancePayDetail(id) {
  return request({
    url: `/api/bpma/bpmaFinancePay/${id}`,
    method: 'get'
  })
}

export function getFinancePayMoney(params) {
  return request({
    url: `/api/bpma/bpmaFinancePay/getBpmaFinancePay`,
    method: 'get',
    params
  })
}

export function deleteFinancePay(params) {
  return request({
    url: `/api/bpma/bpmaFinancePay/${params}`,
    method: 'delete'
  })
}

export function reviewFinancePay(data) {
  return request({
    url: `/api/bpma/bpmaFinancePay/audit`,
    method: 'put',
    data
  })
}

export function saveFinancePay(data) {
  return request({
    url: `/api/bpma/bpmaFinancePay`,
    method: 'post',
    data
  })
}

export function postFinancePay(data) {
  return request({
    url: `/api/bpma/bpmaFinancePay/${data.id}`,
    method: 'put',
    data
  })
}

export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}
