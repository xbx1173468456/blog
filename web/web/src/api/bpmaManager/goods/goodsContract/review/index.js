import request from 'utils/request'

/**
 * 根据项目ID分页获取物资合同评审列表
 * @param data 分页参数
 */
export function getBpmaMaterialContractReviews(data) {
  return request({
    url: '/api/bpma/bpmaMaterialContractReview/getBpmaMaterialContractReviews/' + Number(data.proId),
    method: 'get',
    params: data
  })
}

/**
 * 获取自己的项目列表
 * @param params
 */
export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

export function getMaterialContractReview(id) {
  return request({
    url: `/api/bpma/bpmaMaterialContractReview/${id}`,
    method: 'get'
  })
}

/**
 * 获取组织机构树
 * @param params
 */
export function getOrgInfo2(params) {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get',
    params
  })
}

/**
 * 删除物资合同评审单
 * @param params
 */
export function deleteReview(params) {
  return request({
    url: `/api/bpma/bpmaMaterialContractReview/${params}`,
    method: 'delete'
  })
}

/**
 * 审核物资合同评审单
 * @param data
 */
export function reviewDoc(data) {
  return request({
    url: `/api/bpma/bpmaMaterialContractReview/audit`,
    method: 'put',
    data
  })
}

/**
 * 保存物资合同评审单
 * @param data
 */
export function saveReview(data) {
  return request({
    url: `/api/bpma/bpmaMaterialContractReview`,
    method: 'post',
    data
  })
}

/**
 * 修改物资合同评审单
 * @param data
 */
export function postReview(data) {
  return request({
    url: `/api/bpma/bpmaMaterialContractReview/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 获取往来单位信息列表
 * @param params
 */
export function getUnitInfoList(params) {
  return request({
    url: '/api/admin/sysEnterpriseInfo/page',
    method: 'get',
    params: params
  })
}
