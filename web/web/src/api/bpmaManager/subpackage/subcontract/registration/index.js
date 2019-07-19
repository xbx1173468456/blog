import request from '@/utils/request'

/**
 * 分包分包合同登记 合同信息
 * @param obj
* */


/**
 * 分包分包合同登记 合同信息列表
* */
export function getAllSubContractRegistration(params) {
  return request({
    url: '/api/bpma/bpmaPayContractInfoMaster/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllSubContractRegistrationItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 分包分包合同登记 合同信息内容
 * */
export function getSubContractRegistration(id) {
  return request({
    url: '/api/bpma/bpmaPayContractInfoMaster/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveSubContractRegistration(obj) {
  return request({
    url: '/api/bpma/bpmaPayContractInfoMaster',
    method: 'post',
    data: obj
  })
}
/**
 * update form
* */
export function updateSubContractRegistration(obj) {
  return request({
    url: '/api/bpma/bpmaPayContractInfoMaster/'+obj.id,
    method: 'put',
    data: obj
  })
}/**
 * delete form
* */
export function deleteSubContractRegistration(id) {
  return request({
    url: '/api/bpma/bpmaPayContractInfoMaster/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditSubContractRegistration(data) {
  return request({
    url: '/api/bpma/bpmaPayContractInfoMaster/audit',
    method: 'put',
    data
  })
}

/*
* 签 约
* */
export function signSubContractRegistration(data) {
  return request({
    url: '/api/bpma/bpmaPayContractInfoMaster/sign',
    method: 'put',
    data
  })
}


/**
 * 往来单位  三方单位
 * */
export function getEnterprise(params) {
  return request({
    url: '/api/admin/sysEnterpriseInfo/page',
    method: 'get',
    params: params
  })
}

/**
* 我方机构
* */
export function getOurEnterprise(params) {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get',
    params
  })
}



/***
 * 预算
 * */

export function getSubContractBudget(params) {
  return request({
    url: '/api/bpma/bpmaSubContractBudget/listTree',
    method: 'get',
    params
  })
}

export function deleteSubContractBudget(id) {
  return request({
    url: '/api/bpma/bpmaSubContractBudget/'+ id,
    method: 'delete',
  })
}

export function putSubContractBudget(data) {
  return request({
    url: '/api/bpma/bpmaSubContractBudget/addTreeList',
    method: 'put',
    data
  })
}
