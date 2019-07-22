import request from '@/utils/request'

export function getPayContractInfoMaster(params) {
  return request({
    url: `/api/bpma/bpmaPayContractInfoMaster/page`,
    method: 'get',
    params
  })
}

export function getMaterialContractDetail(params) {
  return request({
    url: `/api/bpma/bpmaMaterialContractDetail/page`,
    method: 'get',
    params
  })
}

export function getPayContractInfoDetail(id) {
  return request({
    url: `/api/bpma/bpmaPayContractInfoMaster/${id}`,
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

export function savePayContractInfoMaster(data) {
  return request({
    url: `/api/bpma/bpmaPayContractInfoMaster`,
    method: 'post',
    data
  })
}

export function saveMaterialContractDetail(data) {
  return request({
    url: `/api/bpma/bpmaMaterialContractDetail/addOrUpdateEnterprise`,
    method: 'post',
    data
  })
}

export function postPayContractInfoMaster(data) {
  return request({
    url: `/api/bpma/bpmaPayContractInfoMaster/${data.id}`,
    method: 'put',
    data
  })
}

export function deletePayContractInfoMaster(id) {
  return request({
    url: `/api/bpma/bpmaPayContractInfoMaster/${id}`,
    method: 'delete'
  })
}

export function deleteMaterialContractDetail(data) {
  return request({
    url: `/api/bpma/bpmaMaterialContractDetail/removeNoAudit/${data.id}`,
    method: 'delete',
    data
  })
}

export function reviewPayContractInfoMaster(data) {
  return request({
    url: `/api/bpma/bpmaPayContractInfoMaster/audit`,
    method: 'put',
    data
  })
}

export function signPayContractInfoMaster(data) {
  return request({
    url: `/api/bpma/bpmaPayContractInfoMaster/sign`,
    method: 'put',
    data
  })
}
