import request from '@/utils/request'

/**
 *获取资证类型列表
 * @param obj
 */

export function getVisafileMaster(params) {
  return request({
    url: `/api/bpma/bpmaValueVisafileMaster/getValueVisafileMasters/${params.proId}`,
    method: 'get',
    params
  })
}

export function getVisafileMasterDetail(id) {
  return request({
    url: `/api/bpma/bpmaValueVisafileMaster/${id}`,
    method: 'get'
  })
}

export function getVisaFilrStage(params) {
  return request({
    url: `/api/bpma/bpmaValueVisafileMaster/getValueVisafileMasterDetail/${params}`,
    method: 'get'
  })
}

export function getVisaAndLinkList(params) {
  return request({
    url: '/api/bpma/bpmaValueVisafileRecord/getValueVisafileRecordById',
    method: 'get',
    params
  })
}

export function deleteVisafileMaster(params) {
  return request({
    url: `/api/bpma/bpmaValueVisafileMaster/${params}`,
    method: 'delete'
  })
}

export function deleteFileStage(params) {
  return request({
    url: `/api/bpma/bpmaValueVisafileStage/${params}`,
    method: 'delete'
  })
}

export function deleteFileRecord(params) {
  return request({
    url: `/api/bpma/bpmaValueVisafileRecord/${params}`,
    method: 'delete'
  })
}

export function reviewVisafileMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueVisafileMaster/audit`,
    method: 'put',
    data
  })
}

export function reviewVisafileRecord(data) {
  return request({
    url: `/api/bpma/bpmaValueVisafileRecord/audit`,
    method: 'put',
    data
  })
}

export function saveVisafileMaster(data) {
  return request({
    url: `/api/bpma/bpmaValueVisafileMaster/addOrUpdateEnterprise`,
    method: 'post',
    data
  })
}

export function saveVisafileRecord(data) {
  return request({
    url: `/api/bpma/bpmaValueVisafileRecord/batchAddOrUpdate`,
    method: 'put',
    data
  })
}

export function postVisafileMaster(data, id) {
  return request({
    url: `/api/bpma/bpmaValueVisafileMaster/addOrUpdateEnterprise/${id}`,
    method: 'put',
    data
  })
}

export function postVisafileRecord(data) {
  return request({
    url: `/api/bpma/bpmaValueVisafileRecord/${data.id}`,
    method: 'put',
    data
  })
}

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
