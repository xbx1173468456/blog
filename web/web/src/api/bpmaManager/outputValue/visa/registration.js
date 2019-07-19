import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getValueVisaMasters(params) {
  return request({
    url: `/api/bpma/bpmaValueVisaMaster/getValueVisaMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getValueVisaMastersDetail(id) {
  return request({
    url: `/api/bpma/bpmaValueVisaMaster/${id}`,
    method: 'get'
  })
}

export function getValueVisafileMasters(params) {
  return request({
    url: `/api/bpma/bpmaValueVisafileMaster/getValueVisafileMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function deleteVisaRegistration(params) {
  return request({
    url: `/api/bpma/bpmaValueVisaMaster/${params}`,
    method: 'delete'
  })
}

export function reviewVisaRegistration(data) {
  return request({
    url: `/api/bpma/bpmaValueVisaMaster/audit`,
    method: 'put',
    data
  })
}

export function saveVisaRegistration(data) {
  return request({
    url: `/api/bpma/bpmaValueVisaMaster`,
    method: 'post',
    data
  })
}

export function postVisaRegistration(data) {
  return request({
    url: `/api/bpma/bpmaValueVisaMaster/${data.id}`,
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

export function getRegistrationList(params) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/getContractInfoMasters/${params}`,
    method: 'get'
  })
}
