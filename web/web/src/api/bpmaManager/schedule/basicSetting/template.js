import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getScheduleTempleteMaster(params) {
  return request({
    url: `/api/bpma/bpmaScheduleTempleteMaster/page`,
    method: 'get',
    params
  })
}

export function getScheduleTempleteDetail(params) {
  return request({
    url: `/api/bpma/bpmaScheduleTempleteDetail/page`,
    method: 'get',
    params
  })
}

export function saveScheduleTempleteMaster(data) {
  return request({
    url: `/api/bpma/bpmaScheduleTempleteMaster/addEntityList`,
    method: 'put',
    data
  })
}

export function saveScheduleTempleteDetail(data) {
  return request({
    url: `/api/bpma/bpmaScheduleTempleteDetail/addEntityList`,
    method: 'put',
    data
  })
}

export function deleteScheduleTempleteMaster(id) {
  return request({
    url: `/api/bpma/bpmaScheduleTempleteMaster/${id}`,
    method: 'delete'
  })
}

export function deleteScheduleTempleteDetail(params) {
  return request({
    url: `api/bpma/bpmaScheduleTempleteDetail/deleteByCode`,
    method: 'delete',
    params
  })
}
