import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getRegistrationList(params) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/getContractInfoMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getContractInfoMasterDetail(id) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/${id}`,
    method: 'get'
  })
}

export function deleteContract(params) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/${params}`,
    method: 'delete'
  })
}

export function reviewDoc(data) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/audit`,
    method: 'put',
    data
  })
}

export function saveContract(data) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster`,
    method: 'post',
    data
  })
}

export function postContract(data) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/${data.id}`,
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

export function signContract(params) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/sign?id=${params}`,
    method: 'put'
  })
}

