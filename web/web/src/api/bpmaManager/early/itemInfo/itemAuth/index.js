import request from 'utils/request'

//查看
export function getPersonAuth(data) {
  return request({
    url: '/api/admin/sysProAuth/page',
    method: 'get',
    params: data
  })
}

//批量保存
export function addPersonAuth(data) {
  return request({
    url: '/api/admin/sysProAuth/addEntityList',
    method: 'post',
    data: data
  })
}

//删除
export function deleteAuth(ids) {
  return request({
    url: '/api/admin/sysProAuth/deleteBatchNoAuth/',
    method: 'delete',
    data:ids
  })
}



//查看所有项目信息
export function getAllItems(data) {
  return request({
    url: '/api/admin/sysProInfo/page',
    method: 'get',
    params: data
  })
}




//查看详情
export function showDetail(id) {
  return request({
    url: '/api/eoa/eoaInfoNews/'+id,
    method: 'get'
  })
}

//审核
export function auditNews(data) {
  return request({
    url: '/api/eoa/eoaInfoNews/audit',
    method: 'put',
    params: data
  })
}



//修改
export function modifyNews(data) {
  return request({
    url: '/api/eoa/eoaInfoNews/'+data.id,
    method: 'put',
    data:data
  })
}
