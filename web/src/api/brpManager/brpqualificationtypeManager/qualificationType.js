import request from '@/utils/request'

export function getQualificationTypeData() {
  return request({
    url: '/api/brp/brpQualificationType/listTree',
    method: 'get'
  })
}

export function validateStatusQualificationType(data) {
  return request({
    url: '/api/brp/brpQualificationType/auditTree',
    method: 'put',
    data: data
  })
}

export function deleteQualificationType(data) {
  return request({
    url: '/api/brp/brpQualificationType/' + data.id,
    method: 'delete'
  })
}

export function enableQualificationType(data) {
  return request({
    url: '/api/brp/brpQualificationType/enable',
    method: 'put',
    data: data
  })
}

export function addOrUpdateQualificationType(data) {
  return request({
    url: '/api/brp/brpQualificationType/addOrUpdateEnterprise',
    method: 'post',
    data: data
  })
}


