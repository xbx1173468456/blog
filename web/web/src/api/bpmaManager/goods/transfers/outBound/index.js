import request from 'utils/request'

//查看列表
export function getList(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOutAllocateMaster/page',
    method: 'get',
    params: data
  })
}
//查看详情
export function getDetail(id) {
  return request({
    url: `/api/bpma/bpmaMaterialOutAllocateMaster/getMasterAndDetail/${id}`,
    method: 'get'
  })
}
//查看比选列表详情
// export function getOfferPriceDetailList(data) {
//   return request({
//     url: '/api/bpma/bpmaMaterialOfferMaster/getOfferPriceDetail/page',
//     method: 'get',
//     params: data
//   })
// }
//批量保存或者修改
export function add(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOutAllocateMaster/addOrUpdateEnterprise',
    method: 'post',
    data: data
  })
}

//审核
export function audit(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOutAllocateMaster/audit',
    method: 'put',
    data: data
  })
}
//删除
export function del(id) {
  return request({
    url: `/api/bpma/bpmaMaterialOutAllocateMaster/deleteMasterAndDetail/${id}`,
    method: 'delete'
  })
}
//删除
export function delDetail(id) {
  return request({
    url: `/api/bpma/bpmaMaterialOutAllocateDetail/${id}`,
    method: 'delete'
  })
}
//报价单位信息
export function getUnitInfoList(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOfferMaster/page',
    method: 'get',
    params: data
  })
}

//根据项目、询价id查询报价列表
export function getOfferPriceDetail(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOfferMaster/getOfferPriceDetail/page',
    method: 'get',
    params: data
  })
}
//获取物资类型
export function getMaterial(params) {
    return request({
      url: '/api/admin/sysMaterialType/listTree',
      method: 'get',
      params: params
    })
  }
  //获取物资列表
  export function getDiction(params) {
    return request({
      url: '/api/admin/sysMaterialDictionary/page',
      method: 'get',
      params: params
    })
  }
//查询
export function getPurchaseList(data) {
  return request({
    url: '/api/bpma/bpmaMaterialInStock/getStockList/page',
    method: 'get',
    params: data
  })
}

