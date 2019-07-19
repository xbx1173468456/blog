import request from "utils/request";
//获取分页数据
export function getList(data) {
  return request({
    url: "/api/bpma/bpmaReuseMaterialRequireMaster/page",
    method: "get",
    params: data
  });
}
//新增
export function postGroupMechanismAddOrUpdate(data) {
  return request({
    url: "/api/bpma/bpmaReuseMaterialRequireMaster/addOrUpdateEnterprise",
    method: "post",
    data: data
  });
}
// /bpmaReuseMaterialRequireDetail/addEntityList
//根据主键ID查看详情
export function getDetail(id) {
  return request({
    url: `/api/bpma/bpmaReuseMaterialRequireMaster/getMasterAndDetail/${id}`,
    method: "get"
  });
}
//批量保存或者修改
// export function postGroupMechanismAddOrUpdate(data) {
//   return request({
//     url: "/api/bpma/bpmaReuseMaterialRequireMaster/addOrUpdateEnterprise",
//     method: "post",
//     data: data
//   });
// }

//审核
export function postGroupMechanismValidateStatus(data) {
  return request({
    url: "/api/bpma/bpmaReuseMaterialRequireMaster/audit",
    method: "put",
    data: data
  });
}
// /bpmaReuseMaterialRequireMaster/audit
// /bpmaReuseMaterialRequireDetail/auditTree
//删除
export function deleteGroupMechanism(id) {
  return request({
    url: `/api/bpma/bpmaReuseMaterialRequireMaster/${id}`,
    method: "delete"
  });
}
//获取物资列表
export function getDiction(params) {
  return request({
    url: "/api/admin/sysMaterialDictionary/page",
    method: "get",
    params: params
  });
}
//删除详表
export function delDetail(id) {
  return request({
    url: `/api/bpma/bpmaReuseMaterialRequireMaster/deleteMasterAndDetail/${id}`,
    method: "delete"
  });
}
