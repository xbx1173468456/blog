import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getScheduleReportMaster(params) {
  return request({
    url: `/api/bpma/bpmaScheduleReportMaster/page`,
    method: 'get',
    params
  })
}

export function getScheduleReportMasterDetail(id) {
  return request({
    url: `/api/bpma/bpmaScheduleReportMaster/${id}`,
    method: 'get'
  })
}

export function getScheduleReportDetail(params) {
  return request({
    url: `/api/bpma/bpmaScheduleReportDetail/page`,
    method: 'get',
    params
  })
}

export function deleteScheduleReportMaster(params) {
  return request({
    url: `/api/bpma/bpmaScheduleReportMaster/${params}`,
    method: 'delete'
  })
}

export function deleteScheduleReportDetail(id) {
  return request({
    url: `/api/bpma/bpmaScheduleReportDetail/removeNoAudit/${id}`,
    method: 'delete'
  })
}

export function reviewScheduleReportMaster(data) {
  return request({
    url: `/api/bpma/bpmaScheduleReportMaster/audit`,
    method: 'put',
    data
  })
}

export function saveScheduleReportMaster(data) {
  return request({
    url: `/api/bpma/bpmaScheduleReportMaster/saveOrUpdate`,
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
