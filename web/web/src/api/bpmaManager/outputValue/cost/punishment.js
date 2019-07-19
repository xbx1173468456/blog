import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getValuePunishMaster(params) {
  return request({
    url: `/api/bpma/bpmaValuePunishMaster/getValueAwardMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getValuePunishMasterDetail(id) {
  return request({
    url: `/api/bpma/bpmaValuePunishMaster/${id}`,
    method: 'get'
  })
}

export function deleteValuePunishMaster(params) {
  return request({
    url: `/api/bpma/bpmaValuePunishMaster/${params}`,
    method: 'delete'
  })
}

export function reviewValuePunishMaster(data) {
  return request({
    url: `/api/bpma/bpmaValuePunishMaster/audit`,
    method: 'put',
    data
  })
}

export function saveValuePunishMaster(data) {
  return request({
    url: `/api/bpma/bpmaValuePunishMaster`,
    method: 'post',
    data
  })
}

export function poatValuePunishMaster(data) {
  return request({
    url: `/api/bpma/bpmaValuePunishMaster/${data.id}`,
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
