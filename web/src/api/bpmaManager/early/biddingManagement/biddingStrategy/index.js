import request from '@/utils/request'

/**
 * 投标策略
 * @param obj
* */


/**
 * 投标策略列表
* */
export function getAllBiddingStrategy(params) {
  return request({
    url: '/api/bpma/bpmaBidStrategy/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllBiddingStrategyItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 投标策略内容
 * */
export function getBiddingStrategy(id) {
  return request({
    url: '/api/bpma/bpmaBidStrategy/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveBiddingStrategy(obj) {
  return request({
    url: '/api/bpma/bpmaBidStrategy',
    method: 'post',
    data: obj
  })
}
/**
 * update form
* */
export function updateBiddingStrategy(obj) {
  return request({
    url: '/api/bpma/bpmaBidStrategy/'+obj.id,
    method: 'put',
    data: obj
  })
}/**
 * delete form
* */
export function deleteBiddingStrategy(id) {
  return request({
    url: '/api/bpma/bpmaBidStrategy/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditBiddingStrategy(data) {
  return request({
    url: '/api/bpma/bpmaBidStrategy/audit',
    method: 'put',
    data
  })
}



