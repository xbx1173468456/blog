import request from '@/utils/request'

export function getMenu() {
  return request({
    url: `/api/admin/menu/user/getFunctionMenu`,
    method: 'get'
  })
}

export function addShowAm(category) {
  return request({
    url: '/api/activiti/act/goModel',
    method: 'get',
    params:{
      category:category
    }
  })
}

/**
 *获取模型列表
 * @param obj
 */
export function getShowAm(params) {
  return request({
    url: '/api/activiti/act/showAm',
    method: 'get',
    params
  })
}

/**
 * 删除流程模型
 * @param obj
 */
export function deleteModel(id) {
  return request({
    url: '/api/activiti/act/delModel',
    method: 'post',
    params:{
      id:id
    }
  })
}

/**
 * 发布流程模型
 * @param obj
 */
export function openModel(id) {
  return request({
    url: '/api/activiti/act/open',
    method: 'post',
    params:{
      id:id
    }
  })
}

/**
 * 编辑流程模型
 * @param obj
 */
export function updateModel(id) {
  return request({
    url: '/api/activiti/act/actUpdate/'+id,
    //url: '/api/activiti/act/goModel',
    method: 'get',
  })
}

/**
 * 禁用启用流程模型
 * @param obj
 */
export function updateModelStatus(params) {
  return request({
    url: '/api/activiti/act/updateModelStatus',
    //url: '/api/activiti/act/goModel',
    method: 'post',
    params
  })
}