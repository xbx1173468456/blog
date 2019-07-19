import request from '@/utils/request'

export function getFinanceShouldIncomeQuery(params) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldIncomeQuery/page`,
    method: 'get',
    params
  })
}

export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}
