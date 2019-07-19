import request from '@/utils/request';

//查询采购入库单
export function getPurchaseWarehousingData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialInBuyMaster/getPurchaseInOrder/page',
    method: 'get',
    params: data
  })
}
