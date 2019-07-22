import request from '@/utils/request'

/**
 * 投标文件
 * @param obj
* */


/**
 * 投标文件列表
* */
export function getAllTenderDocument(params) {
  return request({
    url: '/api/bpma/bpmaBidSubmitFile/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllTenderDocumentItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 投标文件内容
 * */
export function getTenderDocument(id) {
  return request({
    url: '/api/bpma/bpmaBidSubmitFile/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveTenderDocument(obj) {
  return request({
    url: '/api/bpma/bpmaBidSubmitFile',
    method: 'post',
    data: obj
  })
}
/**
 * update form
* */
export function updateTenderDocument(obj) {
  return request({
    url: '/api/bpma/bpmaBidSubmitFile/'+obj.id,
    method: 'put',
    data: obj
  })
}/**
 * delete form
* */
export function deleteTenderDocument(id) {
  return request({
    url: '/api/bpma/bpmaBidSubmitFile/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditTenderDocument(data) {
  return request({
    url: '/api/bpma/bpmaBidSubmitFile/audit',
    method: 'put',
    data
  })
}



