import request from '@/utils/request'

/**
 * 招标公告
 * @param obj
* */


/**
 * 招标公告列表
* */
export function getAllbiddingAnnouncement(params) {
  return request({
    url: '/api/bpma/bpmaBidNotice/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
* */
export function getAllItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/** 详情页
 *
 * 招标公告内容
 * */
export function getAnnouncement(id) {
  return request({
    url: '/api/bpma/bpmaBidNotice/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveAnnouncement(obj) {
  return request({
    url: '/api/bpma/bpmaBidNotice',
    method: 'post',
    data: obj
  })
}
/**
 * 修改 form
* */
export function updateAnnouncement(obj) {
  return request({
    url: '/api/bpma/bpmaBidNotice/'+obj.id,
    method: 'put',
    data: obj
  })
}/**
 * delete form
* */
export function deleteAnnouncement(id) {
  return request({
    url: '/api/bpma/bpmaBidNotice/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditAnnouncement(data) {
  return request({
    url: '/api/bpma/bpmaBidNotice/audit',
    method: 'put',
    data
  })
}



