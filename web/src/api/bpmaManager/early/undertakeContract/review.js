import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getReviewFormList(params) {
  return request({
    url: `/api/bpma/bpmaContractReview/getContractReviews/${params.proId}`,
    method: 'get',
    params
  })
}

export function getContractReview(id) {
  return request({
    url: `/api/bpma/bpmaContractReview/${id}`,
    method: 'get'
  })
}

export function getContractReviewDetail(params) {
  return request({
    url: `/api/bpma/bpmaContractReview/${params.proId}`,
    method: 'get',
    params
  })
}

export function deleteReview(params) {
  return request({
    url: `/api/bpma/bpmaContractReview/${params}`,
    method: 'delete'
  })
}

export function reviewDoc(data) {
  return request({
    url: `/api/bpma/bpmaContractReview/audit`,
    method: 'put',
    data
  })
}

export function saveReview(data) {
  return request({
    url: `/api/bpma/bpmaContractReview`,
    method: 'post',
    data
  })
}

export function postReview(data) {
  return request({
    url: `/api/bpma/bpmaContractReview/${data.id}`,
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
