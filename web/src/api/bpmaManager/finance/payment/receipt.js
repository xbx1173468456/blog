import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getFinancePayBill(params) {
  return request({
    url: `/api/bpma/bpmaFinancePayBill/page`,
    method: 'get',
    params
  })
}

export function getFinancePayBillDetail(id) {
  return request({
    url: `/api/bpma/bpmaFinancePayBill/${id}`,
    method: 'get'
  })
}

export function deleteFinancePayBill(params) {
  return request({
    url: `/api/bpma/bpmaFinancePayBill/${params}`,
    method: 'delete'
  })
}

export function reviewFinancePayBill(data) {
  return request({
    url: `/api/bpma/bpmaFinancePayBill/audit`,
    method: 'put',
    data
  })
}

export function saveFinancePayBill(data) {
  return request({
    url: `/api/bpma/bpmaFinancePayBill`,
    method: 'post',
    data
  })
}

export function postFinancePayBill(data) {
  return request({
    url: `/api/bpma/bpmaFinancePayBill/${data.id}`,
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
