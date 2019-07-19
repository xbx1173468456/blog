import request from '@/utils/request'

/**
 * 范例
 * @param obj
 * @returns {Promise<Response>}
 */
export function addProdInfo(obj) {
  return request({
    url: '/api/admin/user',
    method: 'post',
    data: obj
  })
}
/* 翻译状态码*/
export function statuMode() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.AuditStatusEnum'
    }
  })
}
export function enabledMode() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.common.enums.EnabledEnum'
    }
  })
}
export function authMode() {
  return request({
    url: 'api/admin/enum-service/data/',
    method: 'get',
    params: {
      enumClassName: 'com.epmsoft.security.admin.enums.AuthModeEnum'
    }
  })
}
/* 获取用户公司信息*/
export function getCompanyMsg(id) {
  return request({
    url: '/api/admin/sysCrmUserInfo/' + id,
    method: 'get'
  })
}
/* 修改用户公司信息*/
export function changeCompanyMsg(data) {
  return request({
    url: '/api/admin/sysCrmUserInfo/' + data.id,
    method: 'put',
    data: data
  })
}
