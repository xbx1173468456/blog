import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getValueStagePayMasters(params) {
  return request({
    url: `/api/bpma/bpmaValueStagePayMaster/getValueStagePayMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getValueStagePayMastersDetail(id) {
  return request({
    url: `/api/bpma/bpmaValueStagePayMaster/${id}`,
    method: 'get'
  })
}

export function deleteStage(params) {
  return request({
    url: `/api/bpma/bpmaValueStagePayMaster/${params}`,
    method: 'delete'
  })
}

export function reviewStage(data) {
  return request({
    url: `/api/bpma/bpmaValueStagePayMaster/audit`,
    method: 'put',
    data
  })
}

export function saveStage(data) {
  return request({
    url: `/api/bpma/bpmaValueStagePayMaster`,
    method: 'post',
    data
  })
}

export function postStage(data) {
  return request({
    url: `/api/bpma/bpmaValueStagePayMaster/${data.id}`,
    method: 'put',
    data
  })
}

export function getAllContract(params) {
  return request({
    url: `/api/admin/sysProAuth/ownPage`,
    method: 'get',
    params
  })
}

export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}
