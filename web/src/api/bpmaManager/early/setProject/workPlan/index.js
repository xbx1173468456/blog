import request from '@/utils/request'

/**
 * 施工计划
 * @param obj
* */


/**
 * 施工计划列表
* */
export function getWorkPlanDataList(search) {
  return request({
    url: '/api/bpma/bpmaBuildPlan/page',
    method: 'get',
    params:search
  })
}
/**
 * 施工计划详情
 * */
export function getBuildPlan(id) {
  return request({
    url: '/api/bpma/bpmaBuildPlan/'+id,
    method: 'get',
  })
}
/**
 * 新增施工计划
 * */
export function addBuildPlan(data) {
  return request({
    url: '/api/bpma/bpmaBuildPlan/',
    method: 'post',
    data: data
  })
}
/**
 * 修改施工计划
 * */
export function amendBuildPlan(data) {
  return request({
    url: '/api/bpma/bpmaBuildPlan/'+data.id,
    method: 'put',
    data: data
  })
}
/**
 * 删除施工计划
 * */
export function deleteBuildPlan(id) {
  return request({
    url: '/api/bpma/bpmaBuildPlan/'+id,
    method: 'delete'
  })
}
/**
 * 审核施工计划
 * */
export function auditBuildPlan(data) {
  return request({
    url: '/api/bpma/bpmaBuildPlan/audit',
    method: 'put',
    data:data
  })
}
/**
 * 获取用户能访问的项目
 * @param obj
 */
export function getPropjectDataList() {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params:{}
  })
}



