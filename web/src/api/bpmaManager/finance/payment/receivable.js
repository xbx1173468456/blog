import request from '@/utils/request'

export function getFinanceShouldPayQuery(params) {
  return request({
    url: `/api/bpma/bpmaFinanceShouldPayQuery/page`,
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
