import request from '@/utils/request'

/**
 * 计量单
 * @param obj
* */


/**
 * 计量单列表
* */
export function getAllCount(params) {
  return request({
    url: '/api/bpma/bpmaSubCountMaster/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllCountItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 计量单内容
 * */
export function getCount(id) {
  return request({
    url: '/api/bpma/bpmaSubCountMaster/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveCount(obj) {
  return request({
    url: '/api/bpma/bpmaSubCountMaster/saveOrUpdate',
    method: 'post',
    data: obj
  })
}


/**
 * delete form
* */
export function deleteCount(id) {
  return request({
    url: '/api/bpma/bpmaSubCountMaster/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditCount(data) {
  return request({
    url: '/api/bpma/bpmaSubCountMaster/audit',
    method: 'put',
    data
  })
}

/**************
 * 新增预算
* *************/

export function getCountBudget(params) {
  return request({
    url: '/api/bpma/bpmaSubCountDetail/page',
    method: 'get',
    params
  })
}

export function deleteCountBudget(id) {
  return request({
    url: '/api/bpma/bpmaSubCountDetail/removeNoAudit/'+id,
    method: 'delete',
  })
}


