// 暴露接口
import {
  getQualificationType,
  getQualificationTypeDetails,
  amendQualificationType,
  addQualificationType,
  auditQualificationType,
  deleteQualificationType,
  enableQualificationType
} from '@/api/brpManager/brpqualificationtypeManager'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取资政类型列表
  GetQualificationType({
                         state
                       }, search) {
    return new Promise((resolve, reject) => {
      getQualificationType(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //获取资政类型详情
  GetQualificationTypeDetails({
                                state
                              }, id) {
    return new Promise((resolve, reject) => {
      getQualificationTypeDetails(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //修改资政类型详情
  AmendQualificationType({
                           state
                         }, data) {
    return new Promise((resolve, reject) => {
      amendQualificationType(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //添加资证类型
  AddQualificationType({
                         state
                       }, data) {
    return new Promise((resolve, reject) => {
      addQualificationType(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //提交审核资政类型详情
  AuditQualificationType({
                           state
                         }, data) {
    return new Promise((resolve, reject) => {
      auditQualificationType(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //删除资政类型详情
  DeleteQualificationType({
                            state
                          }, id) {
    return new Promise((resolve, reject) => {
      deleteQualificationType(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 获取资政类型类型
  EnableQualificationType({
                   state
                 },data) {
    return new Promise((resolve, reject) => {
      enableQualificationType(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
