import request from '@/utils/request'

/**
 *获取部署列表
 * @param obj
 */
export function getShowAct(search) {
  return request({
    url: '/api/activiti/act/showAct',
    method: 'get',
    params:search
  })
}
/**
 * 删除部署信息
 * @param obj
 */
export function deleteShowAct(id) {
  return request({
    url: '/api/activiti/act/delDeploy',
    method: 'post',
    params:{
      id:id
    }
  })
}
