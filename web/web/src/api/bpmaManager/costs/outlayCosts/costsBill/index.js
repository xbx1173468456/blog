import request from '@/utils/request'

/**
 * 成本单据
 * @param obj
* */


/**
 * 成本单据列表
* */
export function getAllCostsBill(params) {
  return request({
    url: '/api/bpma/bpmaProjectCost/page',
    method: 'get',
    params
  })
}


