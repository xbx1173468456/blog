import request from 'utils/request'

//查看所有项目信息
export function selectInfo(data) {
  return request({
    url: '/api/admin/sysProInfo/page',
    method: 'get',
    params: data
  })
}

//查看当前用户项目信息
export function selectListOwn(data) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params: data
  })
}


//新增
export function addItemInfo(data) {
  return request({
    url: '/api/admin/sysProInfo',
    method: 'post',
    data: data
  })
}

//修改
export function modifyItemInfo(data) {
  return request({
    url: '/api/admin/sysProInfo/'+data.id,
    method: 'put',
    data:data
  })
}

//查看详情
export function showDetail(id) {
  return request({
    url: '/api/admin/sysProInfo/'+id,
    method: 'get'
  })
}



//审核
export function auditItemInfo(data) {
  return request({
    url: '/api/admin/sysProInfo/audit',
    method: 'put',
    data: data
  })
}

//删除
export function deleteItemInfo(id) {
  return request({
    url: '/api/admin/sysProInfo/'+id,
    method: 'delete'
  })
}