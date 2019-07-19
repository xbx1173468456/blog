import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getValueClaimMasters(params) {
  return request({
    url: `/api/bpma/bpmaValueClaimMaster/getValueClaimMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getValueClaimMastersDetail(id) {
  return request({
    url: `/api/bpma/bpmaValueClaimMaster/${id}`,
    method: 'get'
  })
}

export function deleteValueClaimMaster(params) {
  return request({
    url: `/api/bpma/bpmaValueClaimMaster/${params}`,
    method: 'delete'
  })
}

export function reviewValueClaimMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueClaimMaster/audit`,
    method: 'put',
    data
  })
}

export function saveValueClaimMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueClaimMaster`,
    method: 'post',
    data
  })
}

export function poatValueClaimMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueClaimMaster/${data.id}`,
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
