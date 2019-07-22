import request from '@/utils/request';

//引入直进直出单-业务报销
export function getBusinessReimbursementData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialInInoutMaster/page',
    method: 'get',
    params: data
  })
}
//引入直进直出单-采购退货
export function getPurchaseReturnData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialInInoutMaster/getInInoutOrder/outBuyReturn/page',
    method: 'get',
    params: data
  })
}
//引入直进直出单-领用退货
export function getUseReturnData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialInInoutMaster/getInInoutOrder/page',
    method: 'get',
    params: data
  })
}
