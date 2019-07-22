import request from '@/utils/request';

export function getPersonTypeTreeData(params) {
  return request({
    url: '/api/admin/sysPersonType/listTree',
    method: 'get',
    params: params
  })
}
