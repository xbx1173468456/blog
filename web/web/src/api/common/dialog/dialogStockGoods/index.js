import request from '@/utils/request';

export function getStockGoodsData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialInStock/getStockList/page',
    method: 'get',
    params: data
  })
}
