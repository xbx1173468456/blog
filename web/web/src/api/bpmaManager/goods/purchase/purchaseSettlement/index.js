import request from '@/utils/request'

/**
 * 采购结算
 * @param obj
* */


/**
 * 采购结算列表
* */
export function getAllMaterialBuyPay(params) {
  return request({
    url: '/api/bpma/bpmaMaterialBuyPayMaster/getBpmaMaterialBuyPayMasters/'+params.proId,
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllMaterialBuyPayItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 采购结算内容
 * */
export function getMaterialBuyPay(id) {
  return request({
    url: '/api/bpma/bpmaMaterialBuyPayMaster/getMasterAndDetail/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveMaterialBuyPay(obj) {
  return request({
    url: '/api/bpma/bpmaMaterialBuyPayMaster/addOrUpdateEnterprise',
    method: 'post',
    data: obj
  })
}


/**
 * delete form
* */
export function deleteMaterialBuyPay(id) {
  return request({
    url: '/api/bpma/bpmaMaterialBuyPayMaster/deleteMasterAndDetail/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditMaterialBuyPay(data) {
  return request({
    url: '/api/bpma/bpmaMaterialBuyPayMaster/audit',
    method: 'put',
    data
  })
}

/**
 * 子表
 * */

export function getMaterialBuyPayDetail(params) {
  return request({
    url: '/api/bpma/bpmaMaterialBuyPayDetail/page',
    method: 'get',
    params
  })
}

export function deleteMaterialBuyPayDetail(id) {
  return request({
    url: '/api/bpma/bpmaMaterialBuyPayDetail/removeNoAudit/'+id,
    method: 'delete',
  })
}
