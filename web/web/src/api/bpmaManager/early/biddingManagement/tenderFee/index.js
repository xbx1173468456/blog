import request from '@/utils/request'

/**
 * 投标费用
 * @param obj
* */


/**
 * 投标费用列表
* */
export function getAllTenderFee(params) {
  return request({
    url: '/api/bpma/bpmaBidCost/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllTenderFeeItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 投标费用内容
 * */
export function getTenderFee(id) {
  return request({
    url: '/api/bpma/bpmaBidCost/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveTenderFee(obj) {
  return request({
    url: '/api/bpma/bpmaBidCost',
    method: 'post',
    data: obj
  })
}
/**
 * update form
* */
export function updateTenderFee(obj) {
  return request({
    url: '/api/bpma/bpmaBidCost/'+obj.id,
    method: 'put',
    data: obj
  })
}/**
 * delete form
* */
export function deleteTenderFee(id) {
  return request({
    url: '/api/bpma/bpmaBidCost/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditTenderFee(data) {
  return request({
    url: '/api/bpma/bpmaBidCost/audit',
    method: 'put',
    data
  })
}



