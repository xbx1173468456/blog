import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getValueAwardMasters(params) {
  return request({
    url: `/api/bpma/bpmaValueAwardMaster/getValueAwardMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getValueAwardMastersDetail(id) {
  return request({
    url: `/api/bpma/bpmaValueAwardMaster/${id}`,
    method: 'get'
  })
}

export function deleteValueAwardMaster(params) {
  return request({
    url: `/api/bpma/bpmaValueAwardMaster/${params}`,
    method: 'delete'
  })
}

export function reviewValueAwardMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueAwardMaster/audit`,
    method: 'put',
    data
  })
}

export function saveValueAwardMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueAwardMaster`,
    method: 'post',
    data
  })
}

export function poatValueAwardMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueAwardMaster/${data.id}`,
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
