import request from 'utils/request'

//查看日志
export function selectLogs(data) {
  return request({
    url: '/api/eoa/eoaWorkDaily/page',
    method: 'get',
    params: data
  })
}

//查看他人日志
export function selectOtherLogs(data) {
  return request({
    url: '/api/eoa/eoaWorkDaily/otherPage',
    method: 'get',
    params: data
  })
}


//保存
export function addLog(data) {
  return request({
    url: '/api/eoa/eoaWorkDaily',
    method: 'post',
    data: data
  })
}

//修改
export function modifyLog(data) {
  return request({
    url: '/api/eoa/eoaWorkDaily/'+data.id,
    method: 'put',
    data:data
  })
}

//审核
export function auditLog(data) {
  return request({
    url: '/api/eoa/eoaWorkDaily/audit',
    method: 'put',
    data: data
  })
}

//删除
export function deleteLog(id) {
  return request({
    url: '/api/eoa/eoaWorkDaily/'+id,
    method: 'delete'
  })
}
 
//查看详情
export function showDetail(id) {
  return request({
    url: '/api/eoa/eoaWorkDaily/'+id,
    method: 'get'
  })
}

//获取人员信息
export function selectPerson(data) {
    let data1={
      page:data.page,
      limit:data.limit
  }
  return request({
    url: '/api/admin/sysOrgInfo/orgTree/page/'+data.id,
    method: 'get',
    params:data1
  })
}
//获取已审核的树结构
export function getGroupMechanismData() {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get',
    params: {type: ""}//查询所有数据，空就是已审核
  })
}
