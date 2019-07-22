import request from 'utils/request'

export function getGroupMechanismData() {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get',
    params: {type: "all"}//查询所有数据，空就是已审核
  })
}
export function validateStatusGroupMechanism(data) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/checkStatus',
    method: 'put',
    data
  })
}
export function deleteGroupMechanism(params) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/delete',
    method: 'delete',
    params
  })
}
export function enableGroupMechanism(params) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/changeEnable',
    method: 'post',
    params
  })
}
export function addOrUpdateGroupMechanism(data) {
  return request({
    url: '/api/admin/sysOrgInfo/addOrUpdateOrgInfos',
    method: 'post',
    data
  })
}

export function addOrgInfo(data) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/add',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/api/admin/sysOrgInfo/sysOrgInfo/update',
    method: 'post',
    data
  })
}
export function getOrgInfo2(params) {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get',
    params
  })
}

