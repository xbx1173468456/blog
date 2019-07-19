import request from '@/utils/request'

/**
 * 分包合同评审
 * @param obj
* */


/**
 * 分包合同评审列表
* */
export function getAllSubContractReview(params) {
  return request({
    url: '/api/bpma/bpmaSubContractReview/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllSubContractReviewItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 分包合同评审内容
 * */
export function getSubContractReview(id) {
  return request({
    url: '/api/bpma/bpmaSubContractReview/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveSubContractReview(obj) {
  return request({
    url: '/api/bpma/bpmaSubContractReview',
    method: 'post',
    data: obj
  })
}
/**
 * update form
* */
export function updateSubContractReview(obj) {
  return request({
    url: '/api/bpma/bpmaSubContractReview/'+obj.id,
    method: 'put',
    data: obj
  })
}/**
 * delete form
* */
export function deleteSubContractReview(id) {
  return request({
    url: '/api/bpma/bpmaSubContractReview/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditSubContractReview(data) {
  return request({
    url: '/api/bpma/bpmaSubContractReview/audit',
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

