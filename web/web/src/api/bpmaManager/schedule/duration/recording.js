import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getScheduleTrackMaster(params) {
  return request({
    url: `/api/eoa/eoaScheduleTrackMaster/page`,
    method: 'get',
    params
  })
}

export function getScheduleTrackMasterDetail(id) {
  return request({
    url: `/api/eoa/eoaScheduleTrackMaster/${id}`,
    method: 'get'
  })
}

export function getScheduleTrackDetail(id) {
  return request({
    url: `/api/eoa/eoaScheduleTrackDetail/listByMasterId/${id}`,
    method: 'get'
  })
}

export function getScheduleTrackDetailItem(id) {
  return request({
    url: `/api/eoa/eoaScheduleTrackDetail/${id}`,
    method: 'get'
  })
}

export function deleteScheduleTrackMaster(params) {
  return request({
    url: `/api/eoa/eoaScheduleTrackMaster/${params}`,
    method: 'delete'
  })
}

export function deleteScheduleTrackDetail(params) {
  return request({
    url: `/api/eoa/eoaScheduleTrackDetail/${params}`,
    method: 'delete'
  })
}

export function reviewScheduleTrackMaster(data) {
  return request({
    url: `/api/eoa/eoaScheduleTrackMaster/audit`,
    method: 'put',
    data
  })
}

// export function reviewScheduleTrackMaster(data) {
//   return request({
//     url: `/api/eoa/eoaScheduleTrackMaster/audit`,
//     method: 'put',
//     data
//   })
// }

export function saveScheduleTrackMaster(data) {
  return request({
    url: `/api/eoa/eoaScheduleTrackMaster`,
    method: 'post',
    data
  })
}

export function postScheduleTrackMaster(data) {
  return request({
    url: `/api/eoa/eoaScheduleTrackMaster/${data.id}`,
    method: 'put',
    data
  })
}

export function saveScheduleTrackDetail(data) {
  return request({
    url: `/api/eoa/eoaScheduleTrackDetail`,
    method: 'post',
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

export function getRegistrationList(params) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/getContractInfoMasters/${params}`,
    method: 'get'
  })
}
