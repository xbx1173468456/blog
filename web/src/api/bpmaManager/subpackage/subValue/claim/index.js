import request from '@/utils/request'

/**
 * 索赔单
 * @param obj
* */


/**
 * 索赔单列表
* */
export function getAllClaim(params) {
  return request({
    url: '/api/bpma/bpmaSubClaimMaster/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllClaimItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 索赔单内容
 * */
export function getClaim(id) {
  return request({
    url: '/api/bpma/bpmaSubClaimMaster/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveClaim(obj) {
  return request({
    url: '/api/bpma/bpmaSubClaimMaster',
    method: 'post',
    data: obj
  })
}
export function updateClaim(obj) {
  return request({
    url: '/api/bpma/bpmaSubClaimMaster/'+obj.id,
    method: 'put',
    data: obj
  })
}


/**
 * delete form
* */
export function deleteClaim(id) {
  return request({
    url: '/api/bpma/bpmaSubClaimMaster/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditClaim(data) {
  return request({
    url: '/api/bpma/bpmaSubClaimMaster/audit',
    method: 'put',
    data
  })
}


