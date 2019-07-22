import request from 'utils/request'

/**
 *获取已待办列表
 * @param obj
 */
export function getCompleteList(search) {
  return request({
    url: '/api/activiti/leave/showCompleteTaskPage',
    method: 'get',
    params:search
  })
}

/**
 *获取待办列表
 * @param obj
 */
export function getTaskData(search) {
  return request({
    url: '/api/activiti/leave/showTaskList',
    method: 'get',
    params:search
  })
}
/**
 *处理待办事项
 * @param obj
 */
export function completeShowTask(data) {
  return request({
    url: '/api/activiti/leave/agent/complete',
    method: 'post',
    data:data
  })
}
/**
 *待阅消息
 * @param obj
 */
export function getActivitiMessageList(params) {
  return request({
    url: '/api/activiti/activitiMessage/getActivitiMessageList',
    method: 'get',
    params
  })
}
/**
 *查看详情
 * @param obj
 */
export function lookShowTask(id) {
  return request({
    url: '/api/activiti/leave/leaveDetail',
    method: 'get',
    params:{
      processId:id
    }
  })
}
/**
 * 根据Task查询业务id
 * @param obj
 */
export function getFormId(id) {
  return request({
    url: '/api/activiti/leave/queryBusinessIdByLeaveOpinion',
    method: 'get',
    params:{
      taskId:id
    }
  })
}

export function readTask(params) {
  return request({
    url: `/api/activiti/activitiMessage/updateById`,
    method: 'post',
    params
  })
}

export function getNextTask(params) {
  console.log(params)
  return request({
    url: `/api/activiti/leave/getNextTask`,
    method: 'get',
    params
  })
}
