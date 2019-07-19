import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getFinanceIncomeBills(params) {
  return request({
    url: `/api/bpma/bpmaFinanceIncomeBill/getBpmaFinanceIncomeBills/${params.proId}`,
    method: 'get',
    params
  })
}

export function getFinanceIncomeBillDetail(id) {
  return request({
    url: `/api/bpma/bpmaFinanceIncomeBill/${id}`,
    method: 'get'
  })
}

export function deleteFinanceIncomeBills(params) {
  return request({
    url: `/api/bpma/bpmaFinanceIncomeBill/${params}`,
    method: 'delete'
  })
}

export function reviewFinanceIncomeBills(data) {
  return request({
    url: `/api/bpma/bpmaFinanceIncomeBill/audit`,
    method: 'put',
    data
  })
}

export function saveFinanceIncomeBills(data) {
  return request({
    url: `/api/bpma/bpmaFinanceIncomeBill`,
    method: 'post',
    data
  })
}

export function postFinanceIncomeBills(data) {
  return request({
    url: `/api/bpma/bpmaFinanceIncomeBill/${data.id}`,
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
