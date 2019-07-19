import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getSchedulePlanMaster(params) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanMaster/page`,
    method: 'get',
    params
  })
}

export function getSchedulePlanMasterDetail(id) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanMaster/${id}`,
    method: 'get'
  })
}

export function getSchedulePlanDetail(params) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanDetail/listByMasterId/${params.masterId}`,
    method: 'get',
    params
  })
}

export function deleteSchedulePlanMaster(params) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanMaster/${params}`,
    method: 'delete'
  })
}

export function deleteSchedulePlanDetail(params) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanDetail/deleteByCode`,
    method: 'delete',
    params
  })
}

export function reviewSchedulePlanMaster(data) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanMaster/audit`,
    method: 'put',
    data
  })
}

export function saveSchedulePlanMaster(data) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanMaster/saveOrUpdate`,
    method: 'post',
    data
  })
}

export function postSchedulePlanMaster(data) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanMaster/saveOrUpdate`,
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
