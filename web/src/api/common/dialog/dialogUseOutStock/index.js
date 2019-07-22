import request from '@/utils/request';

//引入领用出库单-领用退货
export function getUseOutStockData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOutUseMaster/getOutUseOrder/page',
    method: 'get',
    params: data
  })
}
