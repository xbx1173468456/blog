import request from '@/utils/request'

/**
 * 竣工报告
 * @param obj
* */


/**
 * 竣工报告列表
* */
export function getLastFinishDataList(params) {
  return request({
    url: '/api/bpma/bpmaLastFinish/page',
    method: 'get',
    params
  })
}
/**
 * 竣工报告详情
 * */
export function getLastFinish(id) {
  return request({
    url: '/api/bpma/bpmaLastFinish/'+id,
    method: 'get',
  })
}
/**
 * 新增竣工报告
 * */
export function addLastFinish(data) {
  return request({
    url: '/api/bpma/bpmaLastFinish/',
    method: 'post',
    data: data
  })
}
/**
 * 修改竣工报告
 * */
export function amendLastFinish(data) {
  return request({
    url: '/api/bpma/bpmaLastFinish/'+data.id,
    method: 'put',
    data: data
  })
}
/**
 * 删除竣工报告
 * */
export function deleteLastFinish(id) {
  return request({
    url: '/api/bpma/bpmaLastFinish/'+id,
    method: 'delete'
  })
}
/**
 * 审核竣工报告
 * */
export function auditLastFinish(data) {
  return request({
    url: '/api/bpma/bpmaLastFinish/audit',
    method: 'put',
    data:data
  })
}


