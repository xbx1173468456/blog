import request from '@/utils/request'

/**
 * 奖励单
 * @param obj
* */


/**
 * 奖励单列表
* */
export function getAllAward(params) {
  return request({
    url: '/api/bpma/bpmaSubAwardMaster/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllAwardItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 奖励单内容
 * */
export function getAward(id) {
  return request({
    url: '/api/bpma/bpmaSubAwardMaster/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveAward(obj) {
  return request({
    url: '/api/bpma/bpmaSubAwardMaster',
    method: 'post',
    data: obj
  })
}
export function updateAward(obj) {
  return request({
    url: '/api/bpma/bpmaSubAwardMaster/'+obj.id,
    method: 'put',
    data: obj
  })
}


/**
 * delete form
* */
export function deleteAward(id) {
  return request({
    url: '/api/bpma/bpmaSubAwardMaster/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditAward(data) {
  return request({
    url: '/api/bpma/bpmaSubAwardMaster/audit',
    method: 'put',
    data
  })
}


