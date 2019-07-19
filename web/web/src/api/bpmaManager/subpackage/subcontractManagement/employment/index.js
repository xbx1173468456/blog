import request from '@/utils/request'

/**
 * 用工申请
 * @param obj
* */


/**
 * 用工申请列表
* */
export function getAllEmployment(params) {
  return request({
    url: '/api/bpma/bpmaSubLaborApplyMaster/page',
    method: 'get',
    params
  })
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllEmploymentItem(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}

/**
 * 用工申请内容
 * */
export function getEmployment(id) {
  return request({
    url: '/api/bpma/bpmaSubLaborApplyMaster/' +id ,
    method: 'get',
  })
}

/**
 * save form
* */
export function saveEmployment(obj) {
  return request({
    url: '/api/bpma/bpmaSubLaborApplyMaster/saveOrUpdate',
    method: 'post',
    data: obj
  })
}
/**
 * update form
* */
/*export function updateEmployment(obj) {
  return request({
    url: '/api/bpma/bpmaSubLaborApplyMaster/'+obj.id,
    method: 'put',
    data: obj
  })
}*/

/**
 * delete form
* */
export function deleteEmployment(id) {
  return request({
    url: '/api/bpma/bpmaSubLaborApplyMaster/' +id ,
    method: 'delete',
  })
}

/**
 * audit form
 * */
export function auditEmployment(data) {
  return request({
    url: '/api/bpma/bpmaSubLaborApplyMaster/audit',
    method: 'put',
    data
  })
}

/*********
 * 引入人员
 * ***********/


/**
 * 新增人员类型
* */
export function postEmploymentPersonType(params) {
  return request({
    url: '/api/admin/sysPersonType/listTree',
    method: 'get',
    params
  })
}

export function getEmploymentPerson(params) {
  return request({
    url: '/api/bpma/bpmaSubLaborApplyDetail/page',
    method: 'get',
    params
  })
}

export function deleteEmploymentPerson(id) {
  return request({
    url: '/api/bpma/bpmaSubLaborApplyDetail/'+id,
    method: 'delete',
  })
}


