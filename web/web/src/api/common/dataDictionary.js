import request from '@/utils/request'
/**
 * 数据字典
 */
export function getDictionaryDataByType(type) {
  return request({
    url: 'api/admin/sysConfigDataDictionary/listByTypeLabel',
    method: 'get',
    params: {
      dataTypeLabel: type
    }
  })
}

export function getDictionaryDataByTypeFilter(type) {
  return request({
    url: 'api/admin/sysConfigDataDictionary/listByTypeLabel',
    method: 'get',
    params: {
      dataTypeLabel: type
    }
  }).then(res => {
    res.data = res.data.filter(item => item.enable === 1)
    return res
  })
}



export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  })
}
