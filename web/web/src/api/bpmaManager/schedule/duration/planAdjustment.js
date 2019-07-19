import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getSchedulePlanChangeMaster(params) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanChangeMaster/page`,
    method: 'get',
    params
  })
}

export function getSchedulePlanChangeMasterDetail(id) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanChangeMaster/${id}`,
    method: 'get'
  })
}

export function getSchedulePlanMaster(id) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanMaster/proId/${id}`,
    method: 'get',
    params: {
      proId: id
    }
  })
}

export function deleteSchedulePlanChangeDetail(params) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanChangeDetail/${params}`,
    method: 'delete'
  })
}

export function getSchedulePlanChangeDetail(params) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanChangeDetail/page`,
    method: 'get',
    params
  })
}

export function deleteSchedulePlanChangeMaster(params) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanChangeMaster/${params}`,
    method: 'delete'
  })
}

export function reviewSchedulePlanChangeMaster(data) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanChangeMaster/audit`,
    method: 'put',
    data
  })
}

export function saveSchedulePlanChangeMaster(data) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanChangeMaster/saveOrUpdate`,
    method: 'put',
    data
  })
}

export function postSchedulePlanChangeDetail(data) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanChangeDetail/updateBatch`,
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
