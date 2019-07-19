import request from '@/utils/request'

/**
 *获取使用记录列表
 * @param obj
 */
export function getQualificationUseMaster(search) {
  return request({
    url: '/api/brp/brpQualificationUseMaster/page',
    method: 'get',
    params:search
  })
}
/**
 * 新增/修改使用记录信息
 * @param obj
 */
export function saveQualificationUseMaster(data) {
  return request({
    url: '/api/brp/brpQualificationUseMaster/saveOrUpdate',
    method: 'post',
   data: data
  })
}
/**
 * 获取使用记录详情
 * @param obj
 */
export function getQualificationUseMasterDetails(id) {
  return request({
    url: '/api/brp/brpQualificationUseMaster/'+id,
    method: 'get'
  })
}
/**
 *获取已引入资证列表
 * @param obj
 */
export function getQualificationUseDetaillistByMasterId(id) {
  return request({
    url: '/api/brp/brpQualificationUseDetail/page',
    method: 'get',
    params:{masterId:id}
  })
}
/**
 *获取可引入资证列表
 * @param obj
 */
export function getQualificationUseDetail() {
  return request({
    url: '/api/brp/brpQualificationUseDetail/page',
    method: 'get',
    params:{}
  })
}

/**
 * 删除使用记录信息
 * @param obj
 */
export function deleteQualificationUseMaster(id) {
  return request({
    url: '/api/brp/brpQualificationUseMaster/'+id,
    method: 'delete'
  })
}
/**
 * 删除资证信息
 * @param obj
 */
export function deleteQualificationUseDetail(id) {
  return request({
    url: '/api/brp/brpQualificationUseDetail/removeNoAudit/'+id,
    method: 'delete'
  })
}
/**
 * 上传审核使用记录信息
 * @param obj
 */
export function auditQualificationUseMaster(data) {
  return request({
    url: '/api/brp/brpQualificationUseMaster/audit',
    method: 'put',
    data:data
  })
}
/**
 * 启用/禁用使用记录信息
 * @param obj
 */
export function enableQualificationUseMaster(data) {
  let enable;
   data.enable==2 ? enable=1 : enable=2;
  return request({
    url: '/api/brp/brpQualificationUseMaster/enable',
    method: 'put',
    data:{
      code:data.code,
      enable:enable
    }
  })
}

