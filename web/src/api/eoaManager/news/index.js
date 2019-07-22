import request from 'utils/request'

//查看新闻
export function selectNews(data) {
  return request({
    url: '/api/eoa/eoaInfoNews/page',
    method: 'get',
    params: data
  })
}

//保存
export function addNews(data) {
  return request({
    url: '/api/eoa/eoaInfoNews',
    method: 'post',
    data: data
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
    data: data
  })
}

//删除
export function deleteNews(id) {
  return request({
    url: '/api/eoa/eoaInfoNews/'+id,
    method: 'delete'
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

export function getGroupMechanismData() {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get',
    params: {type: ""}//查询所有数据，空就是已审核
  })
}