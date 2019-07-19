import request from '@/utils/request'

/**
 * 投标结果
 * @param obj
* */


/**
 * 投标结果列表
* */
export function getAllTenderResult(params) {
  return request({
    url: '/api/bpma/bpmaBidResult/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllTenderResultItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 投标结果内容
 * */
export function getTenderResult(id) {
  return request({
    url: '/api/bpma/bpmaBidResult/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveTenderResult(obj) {
  return request({
    url: '/api/bpma/bpmaBidResult',
    method: 'post',
    data: obj
  })
}
/**
 * update form
* */
export function updateTenderResult(obj) {
  return request({
    url: '/api/bpma/bpmaBidResult/'+obj.id,
    method: 'put',
    data: obj
  })
}/**
 * delete form
* */
export function deleteTenderResult(id) {
  return request({
    url: '/api/bpma/bpmaBidResult/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditTenderResult(data) {
  return request({
    url: '/api/bpma/bpmaBidResult/audit',
    method: 'put',
    data
  })
}



