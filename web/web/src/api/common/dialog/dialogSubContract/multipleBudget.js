import request from '@/utils/request';

export function getSubContractTreeData(params) {
  return request({
    url: '/api/bpma/bpmaSubContractBudget/listTree',
    method: 'get',
    params
  })
}
