import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getMaterialBudgetMaster(params) {
  return request({
    url: `/api/bpma/bpmaMaterialBudgetMaster/getMaterialBudgetMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getMasterAndDetail(params) {
  return request({
    url: `/api/bpma/bpmaMaterialBudgetMaster/getMasterAndDetail/${params}`,
    method: 'get',
    params
  })
}

export function getMaterialBudgetMasterDetail(id) {
  return request({
    url: `/api/bpma/bpmaMaterialBudgetMaster/${id}`,
    method: 'get'
  })
}

export function deleteMaterialBudgetMaster(params) {
  return request({
    url: `/api/bpma/bpmaMaterialBudgetMaster/${params}`,
    method: 'delete'
  })
}

export function deleteMaterialBudgetDetail(params) {
  return request({
    url: `/api/bpma/bpmaMaterialBudgetDetail/${params}`,
    method: 'delete'
  })
}

export function reviewMaterialBudgetMaster(data) {
  return request({
    url: `/api/bpma/bpmaMaterialBudgetMaster/audit`,
    method: 'put',
    data
  })
}

export function saveMaterialBudgetMaster(data) {
  return request({
    url: `/api/bpma/bpmaMaterialBudgetMaster/addOrUpdateEnterprise`,
    method: 'post',
    data
  })
}

export function getRegistrationList(params) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/getContractInfoMasters/${params}`,
    method: 'get'
  })
}

export function getBidSubmitFile(params) {
  return request({
    url: `/api/bpma/bpmaBidSubmitFile/page`,
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
