import request from '@/utils/request'

/**
 * 招标文件
 * @param obj
* */


/**
 * 招标文件列表
* */
export function getAllbiddingDocument(params) {
  return request({
    url: '/api/bpma/bpmaBidInviteFile/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllDocumentItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 招标文件内容
 * */
export function getDocument(id) {
  return request({
    url: '/api/bpma/bpmaBidInviteFile/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveDocument(obj) {
  return request({
    url: '/api/bpma/bpmaBidInviteFile',
    method: 'post',
    data: obj
  })
}
/**
 * update form
* */
export function updateDocument(obj) {
  return request({
    url: '/api/bpma/bpmaBidInviteFile/'+obj.id,
    method: 'put',
    data: obj
  })
}/**
 * delete form
* */
export function deleteDocument(id) {
  return request({
    url: '/api/bpma/bpmaBidInviteFile/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditDocument(data) {
  return request({
    url: '/api/bpma/bpmaBidInviteFile/audit',
    method: 'put',
    data
  })
}



