import request from 'utils/request'

export function getDataCleanData(obj) {
  return request({
    url: '/api/admin/sysCrmProductInfo/getProductInfo',
    method: 'get'
  })
}

export function deleteDataClean(obj) {
  return request({
    url: '/api/' + obj.mark + '/cleanData/clean/' + obj.id,
    method: 'post'
  })
}
