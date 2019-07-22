import request from '@/utils/request'

/**
 *获取加班列表
 * @param obj
 */
export function getOvertimeList(search) {
  return request({
    url: '/api/eoa/eoaAttendanceOvertime/page',
    method: 'get',
    params:search
  })
}
/**
 * 新增加班信息
 * @param obj
 */
export function addOvertime(data) {
  return request({
    url: '/api/eoa/eoaAttendanceOvertime',
    method: 'post',
   data: data
  })
}
/**
 * 获取加班详情
 * @param obj
 */
export function getOvertimeDetails(id) {
  return request({
    url: '/api/eoa/eoaAttendanceOvertime/'+id,
    method: 'get'
  })
}
/**
 * 修改加班信息
 * @param obj
 */
export function amendOvertime(data) {
  return request({
    url: '/api/eoa/eoaAttendanceOvertime/'+data.id,
    method: 'put',
    data: data
  })
}
/**
 * 删除加班信息
 * @param obj
 */
export function deleteOvertime(id) {
  return request({
    url: '/api/eoa/eoaAttendanceOvertime/'+id,
    method: 'delete'
  })
}
/**
 * 上传审核加班信息
 * @param obj
 */
export function auditOvertime(data) {
  return request({
    url: '/api/eoa/eoaAttendanceOvertime/audit',
    method: 'put',
   data:data
  })
}
/**
 * 挂载加班审批流
 * @param obj
 */
export function flowOvertime(data) {
  return request({
    url: '/api/activiti/overtime/addOvertime',
    method: 'post',
    data:data
  })
}
