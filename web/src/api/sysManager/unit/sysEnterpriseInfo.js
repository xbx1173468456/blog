import request from 'utils/request'

/**
* 单位信息详情
 * @param query
* */


/**
 * 单位信息 SysEnterpriseInfo
 * 单位人员 sysEnterprisePerson
 * 单位资质 sysEnterpriseCert
 *
 * */
export function postSysEnterpriseAllAdd(obj) { /*保存 启用 禁用*/
  return request({
    url: '/api/admin/sysEnterpriseInfo/sysEnterpriseInfo/addOrUpdateEnterprise',
    method: 'post',
    data: obj
  });
}
export function putSysEnterpriseEnable(obj) { /*启用 禁用*/
  return request({
    url: '/api/admin/sysEnterpriseInfo/changeEnable',
    method: 'put',
    data: obj
  });
}
export function getSysEnterpriseAllDetail(id) {
  return request({
    url: '/api/admin/sysEnterpriseInfo/getSysEnterpriseInfos/' + id,
    method: 'get'
  })
}
export function deleteSysEnterpriseInfoData(id) {
  return request({
    url: '/api/admin/sysEnterpriseInfo/' + id,
    method: 'delete',
  })
}

/**
*审核
 * */
export function postChangeStatus(data) {
  return request({
    url: '/api/admin/sysEnterpriseInfo/audit',
    method: 'put',
    data: data
  })
}

/**
*单位人员删除
* */
export function deleteSysEnterprisePersonData(id) {
  return request({
    url: '/api/admin/sysEnterprisePerson/' + id,
    method: 'delete',
  })
}

/**
 * 单位人员审核
 * */
export function postSysEnterprisePersonChangeJobState(data) {
  return request({
    url: '/api/admin/sysEnterprisePerson/audit',
    method: 'put',
    data: data
  })
}
/**
 * 单位联系人在职 离职
 * */
export function postSysEnterprisePersonJobSta(Parameters) {
  return request({
    url: '/api/admin/sysEnterprisePerson/sysEnterprisePerson/changeJobSta',
    method: 'post',
    params: Parameters
  })
}

/**
* 单位联系人查询
* */
export function postSysEnterprisePersonQuery(Parameters) {
  return request({
    url: '/api/admin/sysEnterprisePerson/sysEnterprisePerson/query',
    method: 'post',
    params: Parameters
  })
}

/**
 *单位资质删除
 * */
export function deleteSysEnterpriseCert(id) {
  return request({
    url: '/api/admin/sysEnterpriseCertificatation/' + id,
    method: 'delete',
  })
}

/**
 * 单位资质审核
 * */
export function postSysEnterpriseCertCheckStatus(data) {
  return request({
    url: '/api/admin/sysEnterpriseCertificatation/audit',
    method: 'put',
    data: data
  })
}
/**
 * 单位资质查询
 * */
export function postSysEnterpriseCertQuery(Parameters) {
  return request({
    url: '/api/admin/sysEnterpriseCertificatation/sysEnterprisePerson/query',
    method: 'post',
    params: Parameters
  })
}
