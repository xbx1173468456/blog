import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getValueClaimEvidenceMasters(params) {
  return request({
    url: `/api/bpma/bpmaValueClaimEvidenceMaster/getValueClaimEvidenceMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getValueClaimEvidenceMastersDetail(id) {
  return request({
    url: `/api/bpma/bpmaValueClaimEvidenceMaster/${id}`,
    method: 'get'
  })
}

export function deleteValueClaimEvidenceMaster(params) {
  return request({
    url: `/api/bpma/bpmaValueClaimEvidenceMaster/${params}`,
    method: 'delete'
  })
}

export function reviewValueClaimEvidenceMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueClaimEvidenceMaster/audit`,
    method: 'put',
    data
  })
}

export function saveValueClaimEvidenceMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueClaimEvidenceMaster`,
    method: 'post',
    data
  })
}

export function poatValueClaimEvidenceMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueClaimEvidenceMaster/${data.id}`,
    method: 'put',
    data
  })
}

export function getRegistrationList(params) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/getContractInfoMasters/${params}`,
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
