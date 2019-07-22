import request from 'utils/request'

export function getUnitTypeData() {
  return request({
    url: '/api/admin/sysEnterpriseType/sysEnterpriseTypeTree',
    method: 'get',
    params: {type: "all"}//查询所有数据，空就是已审核
  })
}

export function validateStatusUnitType(data) {
  return request({
    url: '/api/admin/sysEnterpriseType/auditTree',
    method: 'put',
    data: data
  })
}

export function enableUnitType(data) {
  return request({
    url: '/api/admin/sysEnterpriseType/enable',
    method: 'put',
    data: data
  })
}

export function deleteUnitType(data) {
  return request({
    url: '/api/admin/sysEnterpriseType/' + data.id,
    method: 'delete'
  })
}

export function addOrUpdateUnitType(data) {
  return request({
    url: '/api/admin/sysEnterpriseType/addOrUpdateEnterpriseTypes',
    method: 'post',
    data: data
  })
}


export function updateUnitType(data) {
  return request({
    url: '/api/admin/sysEnterpriseType/sysEnterpriseType/update',
    method: 'post',
    data: data
  })
}

//单位信息
export function getUnitInfoList(params) {
  return request({
    url: '/api/admin/sysEnterpriseInfo/page',
    method: 'get',
    params: params
  })
}

export function addUnitType(data) {
  return request({
    url: '/api/admin/sysEnterpriseType/sysEnterpriseType/add',
    method: 'post',
    data: data
  })
}
