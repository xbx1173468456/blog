import request from '@/utils/request'

/**
 *获取资证档案列表
 * @param obj
 */
export function getQualificationInfo(search) {
  return request({
    url: '/api/brp/brpQualificationInfo/page',
    method: 'get',
    params:search
  })
}
/**
 * 新增资证信息
 * @param obj
 */
export function addQualificationInfo(data) {
  return request({
    url: '/api/brp/brpQualificationInfo',
    method: 'post',
   data: data
  })
}
/**
 * 获取资证详情
 * @param obj
 */
export function getQualificationInfoDetails(id) {
  return request({
    url: '/api/brp/brpQualificationInfo/'+id,
    method: 'get'
  })
}
/**
 * 修改资证信息
 * @param obj
 */
export function amendQualificationInfo(data) {
  return request({
    url: '/api/brp/brpQualificationInfo/'+data.id,
    method: 'put',
    data: data
  })
}
/**
 * 删除资证信息
 * @param obj
 */
export function deleteQualificationInfo(id) {
  return request({
    url: '/api/brp/brpQualificationInfo/'+id,
    method: 'delete'
  })
}
/**
 * 上传审核资证信息
 * @param obj
 */
export function auditQualificationInfo(data) {
  return request({
    url: '/api/brp/brpQualificationInfo/audit',
    method: 'put',
    data:data
  })
}
/**
 * 启用/禁用资证信息
 * @param obj
 */
export function enableQualificationInfo(data) {
  let enable;
   data.enable==2 ? enable=1 : enable=2;
  return request({
    url: '/api/brp/brpQualificationInfo/enable',
    method: 'put',
    data:{
      code:data.code,
      enable:enable
    }
  })
}

