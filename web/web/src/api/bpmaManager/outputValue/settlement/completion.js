import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getValueFinishPayMaster(params) {
  return request({
    url: `/api/bpma/bpmaValueFinishPayMaster/getBpmaValueFinishPayMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getValueFinishPayDetail(params) {
  return request({
    url: `/api/bpma/bpmaValueFinishPayMaster/getMasterAndDetail/${params.masterId}`,
    method: 'get',
    params
  })
}

export function getValueFinishPayMasterDetail(id) {
  return request({
    url: `/api/bpma/bpmaValueFinishPayMaster/${id}`,
    method: 'get'
  })
}

export function deleteValueFinishPayMaster(params) {
  return request({
    url: `/api/bpma/bpmaValueFinishPayMaster/deleteMasterAndDetail/${params}`,
    method: 'delete'
  })
}

export function deleteValueFinishPayDetail(id) {
  return request({
    url: `/api/bpma/bpmaValueFinishPayDetail/${id}`,
    method: 'delete'
  })
}

export function reviewValueFinishPayMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueFinishPayMaster/audit`,
    method: 'put',
    data
  })
}

export function saveValueFinishPayMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueFinishPayMaster/addOrUpdateEnterprise`,
    method: 'post',
    data
  })
}

// export function postValueFinishPayMaster(data) {
//   return request({
//     url: `/api/bpma/bpmaValueFinishPayMaster/${data.id}`,
//     method: 'put',
//     data
//   })
// }

export function getAllContract(params) {
  return request({
    url: `/api/admin/sysProAuth/ownPage`,
    method: 'get',
    params
  })
}

export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}
