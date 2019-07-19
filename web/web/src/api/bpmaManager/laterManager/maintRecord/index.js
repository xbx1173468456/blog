import request from '@/utils/request'

/**
 * 维保记录
 * @param obj
* */


/**
 * 维保记录列表
* */
export function getLastMaintenanceDataList(search) {
  return request({
    url: '/api/bpma/bpmaLastMaintenance/page',
    method: 'get',
    params:search
  })
}
/**
 * 维保记录详情
 * */
export function getLastMaintenance(id) {
  return request({
    url: '/api/bpma/bpmaLastMaintenance/'+id,
    method: 'get',
  })
}
/**
 * 新增维保记录
 * */
export function addLastMaintenance(data) {
  return request({
    url: '/api/bpma/bpmaLastMaintenance/',
    method: 'post',
    data: data
  })
}
/**
 * 修改维保记录
 * */
export function amendLastMaintenance(data) {
  return request({
    url: '/api/bpma/bpmaLastMaintenance/'+data.id,
    method: 'put',
    data: data
  })
}
/**
 * 删除维保记录
 * */
export function deleteLastMaintenance(id) {
  return request({
    url: '/api/bpma/bpmaLastMaintenance/'+id,
    method: 'delete'
  })
}
/**
 * 审核维保记录
 * */
export function auditLastMaintenance(data) {
  return request({
    url: '/api/bpma/bpmaLastMaintenance/audit',
    method: 'put',
    data:data
  })
}


