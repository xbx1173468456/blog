import request from '@/utils/request'

/**
 * 预算查询
 * @param obj
 * */


/**
 * 预算查询列表
 * */
export function getAllGoodsBudget(params) {
  return request({
    url: '/api/bpma/bpmaMaterialBudgetMaster/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllGoodsBudgetItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}
