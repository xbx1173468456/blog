import request from '@/utils/request'

/**
 * 完工结算
 * @param obj
* */


/**
 * 完工结算列表
* */
export function getAllCompletionPay(params) {
  return request({
    url: '/api/bpma/bpmaSubFinishPayMaster/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllCompletionPayItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 完工结算内容
 * */
export function getCompletionPay(id) {
  return request({
    url: '/api/bpma/bpmaSubFinishPayMaster/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveCompletionPay(obj) {
  return request({
    url: '/api/bpma/bpmaSubFinishPayMaster/saveOrUpdate',
    method: 'post',
    data: obj
  })
}


/**
 * delete form
* */
export function deleteCompletionPay(id) {
  return request({
    url: '/api/bpma/bpmaSubFinishPayMaster/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditCompletionPay(data) {
  return request({
    url: '/api/bpma/bpmaSubFinishPayMaster/audit',
    method: 'put',
    data
  })
}

/**
 * 子表
 * */
export function getCompletionPayDetail(params) {
  return request({
    url: '/api/bpma/bpmaSubFinishPayDetail/page',
    method: 'get',
    params
  })
}

export function deleteCompletionPayDetail(id) {
  return request({
    url: '/api/bpma/bpmaSubFinishPayDetail/removeNoAudit/'+id,
    method: 'delete',
  })
}
