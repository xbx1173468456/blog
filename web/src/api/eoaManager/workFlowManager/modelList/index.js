import request from '@/utils/request'

/**
 *获取模型列表
 * @param obj
 */
export function getShowAm(search) {
  return request({
    url: '/api/activiti/act/showAm',
    method: 'get',
    params:search
  })
}
/**
 *新建模型列表
 * @param obj
 */
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
 *模型类别
 * @param obj
 */
export function amType(search) {
  return request({
    url: '/api/admin/enum-service/data',
    method: 'get',
    params:{
      enumClassName:"com.epmsoft.security.common.enums.ModelEnum"
    }
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
 * 跳转流程模型
 * @param obj
 */
export function goModel(id) {
  return request({
    url: '/api/activiti/act/actUpdate/'+id,
    //url: '/api/activiti/act/goModel',
    method: 'get',
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



