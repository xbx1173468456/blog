import request from 'utils/request'

//查看项目类型
export function selectItemType(data) {
  return request({
    url: '/api/admin/sysProType/listTree',
    method: 'get',
    params: data
  })
}

//保存
export function addOrUpdateItemType(data) {
  return request({
    url: '/api/admin/sysProType/addOrUpdateMaterialTypes',
    method: 'post',
    data: data
  })
}
//审核
export function validateStatusItemType(data) {
  return request({
    url: '/api/admin/sysProType/auditTree',
    method: 'put',
    data: data
  })
}

//删除
export function deleteItemType(data) {
  return request({
    url: '/api/admin/sysProType/' + data.id,
    method: 'delete'
  })
}
//启用
export function enableItemType(data) {
  return request({
    url: '/api/admin/sysProType/enable',
    method: 'put',
    data: data
  })
}
