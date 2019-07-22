import request from 'utils/request'
//查看列表
export function selectBudget(data) {
  return request({
    url: '/api/bpma/bpmaMaterialContractChange/page',
    method: 'get',
    params: data
  })
}
//查看详情
export function getBudgetDetail(proId) {
  return request({
    url: `/api/bpma/bpmaMaterialContractChange/${proId}`,
    method: 'get'
  })
}

//保存
export function add(data) {
  return request({
    url: '/api/bpma/bpmaMaterialContractChange',
    method: 'post',
    data: data
  })
}

//修改
export function edit(data) {
  return request({
    url: `/api/bpma/bpmaMaterialContractChange/${data.id}`,
    method: 'put',
    data: data
  })
}

//审核
export function auditTrack(data) {
  return request({
    url: '/api/bpma/bpmaMaterialContractChange/audit',
    method: 'put',
    data: data
  })
}

//删除
export function deleteTrack(id) {
  return request({
    url: `/api/bpma/bpmaMaterialContractChange/${id}`,
    method: 'delete'
  })
}

//查看物资合同
export function selectGoodsContract(data) {
  return request({
    url: '/api/bpma/bpmaPayContractInfoMaster/page',
    method: 'get',
    params: data
  })
}



