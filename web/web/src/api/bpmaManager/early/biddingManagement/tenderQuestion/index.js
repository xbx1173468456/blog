import request from '@/utils/request'

/**
 * 投标答疑
 * @param obj
* */


/**
 * 投标答疑列表
* */
export function getAllTenderQuestion(params) {
  return request({
    url: '/api/bpma/bpmaBidAnswer/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllTenderQuestionItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 投标答疑内容
 * */
export function getTenderQuestion(id) {
  return request({
    url: '/api/bpma/bpmaBidAnswer/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveTenderQuestion(obj) {
  return request({
    url: '/api/bpma/bpmaBidAnswer',
    method: 'post',
    data: obj
  })
}
/**
 * update form
* */
export function updateTenderQuestion(obj) {
  return request({
    url: '/api/bpma/bpmaBidAnswer/'+obj.id,
    method: 'put',
    data: obj
  })
}/**
 * delete form
* */
export function deleteTenderQuestion(id) {
  return request({
    url: '/api/bpma/bpmaBidAnswer/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditTenderQuestion(data) {
  return request({
    url: '/api/bpma/bpmaBidAnswer/audit',
    method: 'put',
    data
  })
}



