import request from '@/utils/request'

/**
 *获取请假列表
 * @param obj
 */
export function getHolidayList(search) {
  return request({
    url: '/api/eoa/eoaAttendanceHoliday/page',
    method: 'get',
    params:search
  })
}
/**
 * 新增请假信息
 * @param obj
 */
export function addHoliday(data) {
  return request({
    url: '/api/eoa/eoaAttendanceHoliday',
    method: 'post',
   data: data
  })
}
/**
 * 获取请假详情
 * @param obj
 */
export function getHolidayDetails(id) {
  console.log(id)
  return request({
    url: '/api/eoa/eoaAttendanceHoliday/'+id,
    method: 'get'
  })
}
/**
 * 修改请假信息
 * @param obj
 */
export function amendHoliday(data) {
  return request({
    url: '/api/eoa/eoaAttendanceHoliday/'+data.id,
    method: 'put',
    data: data
  })
}
/**
 * 删除请假信息
 * @param obj
 */
export function deleteHoliday(id) {
  return request({
    url: '/api/eoa/eoaAttendanceHoliday/'+id,
    method: 'delete'
  })
}
/**
 * 上传审核请假信息
 * @param obj
 */
export function auditHoliday(data) {
  return request({
    url: '/api/eoa/eoaAttendanceHoliday/audit',
    method: 'put',
   data:data
  })
}
/**
 * 判断当前机构是否有审批流
 * @param obj
 */
export function isActiviti(category) {
  return request({
    url: '/api/activiti/leave/isActiviti',
    method: 'get',
    params: {
      category:category
    }
  })
}
/**
 * 挂载审批流
 * @param obj
 */
export function addLeave(data) {
  return request({
    url: '/api/activiti/leave/addLeave',
    method: 'post',
    data:data
  })
}
/**
 * 读取审批流
 * @param obj
 */
export function readResource(id) {
  return request({
    url: '/api/activiti/leave/readResource',
    method: 'get',
    params:{
      processInstanceId:id
    }
  })
}
