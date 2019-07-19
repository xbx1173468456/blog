import request from '@/utils/request'

/**
 * 项目移交
 * @param obj
* */


/**
 * 项目移交列表
* */
export function getLastDeliverDataList(search) {
  return request({
    url: '/api/bpma/bpmaLastDeliver/page',
    method: 'get',
    params:search
  })
}
/**
 * 项目移交详情
 * */
export function getLastDeliver(id) {
  return request({
    url: '/api/bpma/bpmaLastDeliver/'+id,
    method: 'get',
  })
}
/**
 * 新增项目移交
 * */
export function addLastDeliver(data) {
  return request({
    url: '/api/bpma/bpmaLastDeliver/',
    method: 'post',
    data: data
  })
}
/**
 * 修改项目移交
 * */
export function amendLastDeliver(data) {
  return request({
    url: '/api/bpma/bpmaLastDeliver/'+data.id,
    method: 'put',
    data: data
  })
}
/**
 * 删除项目移交
 * */
export function deleteLastDeliver(id) {
  return request({
    url: '/api/bpma/bpmaLastDeliver/'+id,
    method: 'delete'
  })
}
/**
 * 审核项目移交
 * */
export function auditLastDeliver(data) {
  return request({
    url: '/api/bpma/bpmaLastDeliver/audit',
    method: 'put',
    data:data
  })
}
/**
 * 获取合同
 * @param obj
 */
export function getContractInfoMasterDataList(id) {
  return request({
    url: '/api/bpma/bpmaContractInfoMaster/getContractInfoMasters/'+id,
    method: 'get',
  })
}
