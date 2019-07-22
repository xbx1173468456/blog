import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */
export function getQualificationType(search) {
  return request({
    url: '/api/brp/brpQualificationType/listTree',
    method: 'get',
    params:search
  })
}
/**
 * 获取资证类型详情
 * @param obj
 */
export function getQualificationTypeDetails(id) {
  return request({
    url: '/api/brp/brpQualificationType/'+id,
    method: 'get'
  })
}
/**
 * 批量新增修改资证类型
 * @param obj
 */
export function addQualificationType(data) {
  return request({
    url: '/api/brp/brpQualificationType/addEntityList',
    method: 'put',
   data: data
  })
}
/**
 * 修改资证类型
 * @param obj
 */
export function amendQualificationType(data) {
  return request({
    url: '/api/brp/brpQualificationType/'+data.id,
    method: 'put',
    data: data
  })
}
/**
 * 删除资证类型
 * @param obj
 */
export function deleteQualificationType(id) {
  return request({
    url: '/api/brp/brpQualificationType/'+id,
    method: 'delete'
  })
}
/**
 * 上传审核资证类型
 * @param obj
 */
export function auditQualificationType(data) {
  return request({
    url: '/api/brp/brpQualificationType/auditTree',
    method: 'put',
    data:data
  })
}
/**
 * 启用/禁用资证类型
 * @param obj
 */
export function enableQualificationType(data) {
  let enable;
  data.enable==2 ? enable=1 : enable=2;
  return request({
    url: '/api/brp/brpQualificationType/enable',
    method: 'put',
    data:{
      code: data.code,
      enable: enable
    }
  })
}

