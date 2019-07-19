import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getFinanceBorrows(params) {
  return request({
    url: `/api/bpma/bpmaFinanceBorrow/getBpmaFinanceBorrows/${params.proId}`,
    method: 'get',
    params
  })
}

export function getFinanceBorrowsDetail(id) {
  return request({
    url: `/api/bpma/bpmaFinanceBorrow/${id}`,
    method: 'get'
  })
}

export function deleteFinanceBorrows(params) {
  return request({
    url: `/api/bpma/bpmaFinanceBorrow/${params}`,
    method: 'delete'
  })
}

export function reviewFinanceBorrows(data) {
  return request({
    url: `/api/bpma/bpmaFinanceBorrow/audit`,
    method: 'put',
    data
  })
}

export function saveFinanceBorrows(data) {
  return request({
    url: `/api/bpma/bpmaFinanceBorrow`,
    method: 'post',
    data
  })
}

export function postFinanaceBorrows(data) {
  return request({
    url: `/api/bpma/bpmaFinanceBorrow/${data.id}`,
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
