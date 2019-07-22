import request from '@/utils/request'

/**
 * 签证单
 * @param obj
* */


/**
 * 签证单列表
* */
export function getAllVisa(params) {
  return request({
    url: '/api/bpma/bpmaSubVisaMaster/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllVisaItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 签证单内容
 * */
export function getVisa(id) {
  return request({
    url: '/api/bpma/bpmaSubVisaMaster/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveVisa(obj) {
  return request({
    url: '/api/bpma/bpmaSubVisaMaster',
    method: 'post',
    data: obj
  })
}
export function updateVisa(obj) {
  return request({
    url: '/api/bpma/bpmaSubVisaMaster/'+obj.id,
    method: 'put',
    data: obj
  })
}


/**
 * delete form
* */
export function deleteVisa(id) {
  return request({
    url: '/api/bpma/bpmaSubVisaMaster/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditVisa(data) {
  return request({
    url: '/api/bpma/bpmaSubVisaMaster/audit',
    method: 'put',
    data
  })
}


