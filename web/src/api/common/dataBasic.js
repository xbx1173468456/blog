import request from '@/utils/request'
/**
 * 除开枚举，数据字典，系统管理在内的其他数据
 */

/**
 * 计量单位
 */
export function getMeasureUnitData() {
  return request({
    url: '/api/admin/sysConfigUnits/all',
    method: 'get',
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
