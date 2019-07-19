import request from '@/utils/request'

/**
 * 产值单据
 * @param obj
* */


/**
 * 产值单据列表
* */
export function getAllOutputBill(params) {
  return request({
    url: '/api/bpma/bpmaProjectIncome/page',
    method: 'get',
    params
  })
}


