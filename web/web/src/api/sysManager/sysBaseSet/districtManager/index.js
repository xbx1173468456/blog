import request from '@/utils/request'

/**
 * 范例
 * @param obj
 * @returns {Promise<Response>}
 */
export function getDistrictPage() {
  return request({
    url: '/api/admin/sysConfigDistrict/getSysConfigDistrictTree',
    method: 'get',
    params: {}
  })
}
/**
 * 范例
 * @param obj
 * @returns {Promise<Response>}
 */
export function getSysConfigDistrictList(params) {
  return request({
    url: '/api/admin//sysConfigDistrict/getSysConfigDistrictList',
    method: 'get',
    params: params
  })
}
export function addOrgInfo(data) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/add',
    method: 'post',
    data: data
  })
}
export function audits(data) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/checkStatus',
    method: 'post',
    data: data
  })
}
export function delOrg(data) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/delete',
    method: 'delete',
    params: data
  })
}
export function disableOrg(data) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/changeEnable',
    method: 'post',
    params: data
  })
}
export function update(data) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/update',
    method: 'post',
    data: data
  })
}
export function getOrgInfo2(params) {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get',
    params: params
  })
}
export function addOrUpdateOrgInfos(data) {
  return request({
    url: '/api/admin/sysOrgInfo/addOrUpdateOrgInfos',
    method: 'post',
    data: data
  })
}
