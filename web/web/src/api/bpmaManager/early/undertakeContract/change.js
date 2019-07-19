import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getContractReviews(params) {
  return request({
    url: `/api/bpma/bpmaContractChange/getContractReviews/${params.proId}`,
    method: 'get',
    params
  })
}

export function getContractReviewsDetail(id) {
  return request({
    url: `/api/bpma/bpmaContractChange/${id}`,
    method: 'get'
  })
}

export function deleteChange(params) {
  return request({
    url: `/api/bpma/bpmaContractChange/${params}`,
    method: 'delete'
  })
}

export function reviewDoc(data) {
  return request({
    url: `/api/bpma/bpmaContractChange/audit`,
    method: 'put',
    data
  })
}

export function saveChange(data) {
  return request({
    url: `/api/bpma/bpmaContractChange`,
    method: 'post',
    data
  })
}

export function postChange(data) {
  return request({
    url: `/api/bpma/bpmaContractChange/${data.id}`,
    method: 'put',
    data
  })
}

export function getAllContract(params) {
  return request({
    url: `/api/admin/sysProAuth/ownPage`,
    method: 'get',
    params
  })
}

export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}
