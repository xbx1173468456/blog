import request from '@/utils/request'

/**
 * 用工单
 * @param obj
* */


/**
 * 用工单列表
* */
export function getAllLabour(params) {
  return request({
    url: '/api/bpma/bpmaSubLaborPayMaster/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllLabourItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 用工申请内容
 * */
export function getLabour(id) {
  return request({
    url: '/api/bpma/bpmaSubLaborPayMaster/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveLabour(obj) {
  return request({
    url: '/api/bpma/bpmaSubLaborPayMaster/saveOrUpdate',
    method: 'post',
    data: obj
  })
}


/**
 * delete form
* */
export function deleteLabour(id) {
  return request({
    url: '/api/bpma/bpmaSubLaborPayMaster/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditLabour(data) {
  return request({
    url: '/api/bpma/bpmaSubLaborPayMaster/audit',
    method: 'put',
    data
  })
}

/**************
 * 新增人员
* *************/

export function getLabourPerson(params) {
  return request({
    url: '/api/bpma/bpmaSubLaborPayDetail/page',
    method: 'get',
    params
  })
}

export function deleteLabourPerson(id) {
  return request({
    url: '/api/bpma/bpmaSubLaborPayDetail/removeNoAudit/'+id,
    method: 'delete',
  })
}


