import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getSchedulePlanDetail(id) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanDetail/listByProId/${id}`,
    method: 'get'
  })
}

export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}
