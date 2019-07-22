import request from '@/utils/request'

/**
 * 分包合同变更
 * @param obj
* */


/**
 * 分包合同变更列表
* */
export function getAllSubContractChange(params) {
  return request({
    url: '/api/bpma/bpmaSubContractChange/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllSubContractChangeItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 分包合同变更内容
 * */
export function getSubContractChange(id) {
  return request({
    url: '/api/bpma/bpmaSubContractChange/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveSubContractChange(obj) {
  return request({
    url: '/api/bpma/bpmaSubContractChange',
    method: 'post',
    data: obj
  })
}
/**
 * update form
* */
export function updateSubContractChange(obj) {
  return request({
    url: '/api/bpma/bpmaSubContractChange/'+obj.id,
    method: 'put',
    data: obj
  })
}/**
 * delete form
* */
export function deleteSubContractChange(id) {
  return request({
    url: '/api/bpma/bpmaSubContractChange/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditSubContractChange(data) {
  return request({
    url: '/api/bpma/bpmaSubContractChange/audit',
    method: 'put',
    data
  })
}

/*
* 合同
* */
export function getSubContract(params) {
  return request({
    url: '/api/bpma/bpmaPayContractInfoMaster/page',
    method: 'get',
    params
  })
}

