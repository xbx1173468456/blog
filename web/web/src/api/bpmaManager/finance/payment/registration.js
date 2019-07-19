import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getFinanceShouldPay(params) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldPay/page`,
    method: 'get',
    params
  })
}

export function getFinanceShouldPayDetail(id) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldPay/${id}`,
    method: 'get'
  })
}

export function deleteFinanceShouldPay(params) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldPay/${params}`,
    method: 'delete'
  })
}

export function reviewFinanceShouldPay(data) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldPay/audit`,
    method: 'put',
    data
  })
}

export function saveFinanceShouldPay(data) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldPay`,
    method: 'post',
    data
  })
}

export function postFinanceShouldPay(data) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldPay/${data.id}`,
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
