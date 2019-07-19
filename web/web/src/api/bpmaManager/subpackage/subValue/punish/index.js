import request from '@/utils/request'

/**
 * 扣罚单
 * @param obj
* */


/**
 * 扣罚单列表
* */
export function getAllPunish(params) {
  return request({
    url: '/api/bpma/bpmaSubPunishMaster/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllPunishItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 扣罚单内容
 * */
export function getPunish(id) {
  return request({
    url: '/api/bpma/bpmaSubPunishMaster/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function savePunish(obj) {
  return request({
    url: '/api/bpma/bpmaSubPunishMaster',
    method: 'post',
    data: obj
  })
}
export function updatePunish(obj) {
  return request({
    url: '/api/bpma/bpmaSubPunishMaster/'+obj.id,
    method: 'put',
    data: obj
  })
}


/**
 * delete form
* */
export function deletePunish(id) {
  return request({
    url: '/api/bpma/bpmaSubPunishMaster/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditPunish(data) {
  return request({
    url: '/api/bpma/bpmaSubPunishMaster/audit',
    method: 'put',
    data
  })
}


