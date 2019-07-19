import request from '@/utils/request'

/**
 * 阶段结算
 * @param obj
* */


/**
 * 阶段结算列表
* */
export function getAllSubPay(params) {
  return request({
    url: '/api/bpma/bpmaSubStagePayMaster/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllSubPayItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 阶段结算内容
 * */
export function getSubPay(id) {
  return request({
    url: '/api/bpma/bpmaSubStagePayMaster/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveSubPay(obj) {
  return request({
    url: '/api/bpma/bpmaSubStagePayMaster/saveOrUpdate',
    method: 'post',
    data: obj
  })
}


/**
 * delete form
* */
export function deleteSubPay(id) {
  return request({
    url: '/api/bpma/bpmaSubStagePayMaster/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditSubPay(data) {
  return request({
    url: '/api/bpma/bpmaSubStagePayMaster/audit',
    method: 'put',
    data
  })
}

/**
 * 子表
 * */
export function getSubPayDetail(params) {
  return request({
    url: '/api/bpma/bpmaSubStagePayDetail/page',
    method: 'get',
    params
  })
}

export function deleteSubPayDetail(id) {
  return request({
    url: '/api/bpma/bpmaSubStagePayDetail/removeNoAudit/'+id,
    method: 'delete',
  })
}
