import request from "@/utils/request";

/**
 * 分包申请
 * @param obj
 * */

/**
 * 分包申请列表
 * */
export function getAllSubcontractApplication(params) {
  return request({
    url: "/api/bpma/bpmaSubApply/page",
    method: "get",
    params
  });
}

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllEnterTheArena(params) {
  return request({
    url: "/api/bpma/bpmaReuseMaterialInSiteMaster/page",
    method: "get",
    params
  });
}

/**
 * 分包申请内容
 * */
export function getSubcontractApplication(id) {
  return request({
    url: "/api/bpma/bpmaSubApply/" + id,
    method: "get"
  });
}

/**
 * save form
 * /api/bpma/bpmaReuseMaterialRequireMaster/addOrUpdateEnterprise
 * /bpmaReuseMaterialInSiteDetail
 * */
export function saveEnterTheArena(obj) {
  return request({
    // url: "/api/bpma//bpmaReuseMaterialInSiteMaster/page",
    url: "/api/bpma/bpmaReuseMaterialInSiteMaster/addOrUpdateEnterprise",
    method: "post",
    data: obj
  });
}
export function getAllCompletionPayItem(params) {
  return request({
    url: "/api/admin/sysProAuth/listOwnProByAuth",
    method: "get",
    params
  });
}
/**
 * update form
 * /bpmaReuseMaterialInSiteMaster/{id}
 * */
export function updateEnterTheArena(obj) {
  return request({
    url: "/api/bpma//bpmaReuseMaterialInSiteMaster/" + obj.id,
    method: "put",
    data: obj
  });
}
/**
 * delete form
 * */
export function deleteSubcontractApplication(id) {
  return request({
    url: "/api/bpma/bpmaSubApply/" + id,
    method: "delete"
  });
}

/**
 * audit form
 * */
export function auditSubcontractApplication(data) {
  return request({
    url: "/api/bpma/bpmaSubApply/audit",
    method: "put",
    data
  });
}
// import request from "@/utils/request";

/**
 * 分包申请
 * @param obj
 * */

/**
 * 分包申请列表
 * */
// export function getAllSubcontractApplication(params) {
//   return request({
//     url: '/api/bpma/bpmaSubApply/page',
//     method: 'get',
//     params
//   })
// }

/**
 * 列表页 详情页 能看到的所有项目
 * */
export function getAllSubcontractApplicationItem(params) {
  return request({
    url: "/api/admin/sysProAuth/listOwnProByAuth",
    method: "get",
    params
  });
}

/**
 * 分包申请内容
 * */
// export function getSubcontractApplication(id) {
//   return request({
//     url: '/api/bpma/bpmaSubApply/' +id ,
//     method: 'get',
//   })
// }

/**
 * save form
 * */
// export function saveSubcontractApplication(obj) {
//   return request({
//     url: '/api/bpma/bpmaSubApply',
//     method: 'post',
//     data: obj
//   })
// }
/**
 * update form
 * */
// export function updateSubcontractApplication(obj) {
//   return request({
//     url: '/api/bpma/bpmaSubApply/'+obj.id,
//     method: 'put',
//     data: obj
//   })
// }
/**
 * delete form
 * */
// export function deleteSubcontractApplication(id) {
//   return request({
//     url: '/api/bpma/bpmaSubApply/' +id ,
//     method: 'delete',
//   })
// }

/**
 * audit form
 * */
// export function auditSubcontractApplication(data) {
//   return request({
//     url: '/api/bpma/bpmaSubApply/audit',
//     method: 'put',
//     data
//   })
// }
