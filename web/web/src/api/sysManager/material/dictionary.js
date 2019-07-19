import request from 'utils/request'

export function getMaterial(params) {
  return request({
    url: '/api/admin/sysMaterialType/listTree',
    method: 'get',
    params: params
  })
}


export function getDiction(params) {
  return request({
    url: '/api/admin/sysMaterialDictionary/page',
    method: 'get',
    params: params
  })
}

export function addDictionary(data) {
  return request({
    url: '/api/admin/sysMaterialDictionary/addEntityList',
    method: 'put',
    data: data
  })
}




export function auditDic(data) {
  return request({
    url: '/api/admin/sysMaterialDictionary/audit',
    method: 'put',
    data: data
  })
}

export function deleteDic(id) {
  return request({
    url: '/api/admin/sysMaterialDictionary/'+id,
    method: 'delete'
  })
}

export function enableDic(data) {
  return request({
    url: '/api/admin/sysMaterialDictionary/changeEnable',
    method: 'put',
    data:data
  })
}

export function getUnit() {
  return request({
    url: '/api/admin/sysConfigUnits/all',
    method: 'get',
  })
}
