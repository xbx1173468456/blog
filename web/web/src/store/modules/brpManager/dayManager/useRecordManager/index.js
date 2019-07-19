// 暴露接口
import {
  getQualificationUseMaster,
  getQualificationUseMasterDetails,
  getQualificationUseDetail,
  getQualificationUseDetaillistByMasterId,
  saveQualificationUseMaster,
  deleteQualificationUseMaster,
  auditQualificationUseMaster,
  deleteQualificationUseDetail
} from '@/api/brpManager/dayManager/useRecordManager'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取记录列表
  GetQualificationUseMaster({
                              state
                            }, search) {
    return new Promise((resolve, reject) => {
      getQualificationUseMaster(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 获取已引入的资证列表
  GetQualificationUseDetaillistByMasterId({
                              state
                            },id) {
    return new Promise((resolve, reject) => {
      getQualificationUseDetaillistByMasterId(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 获取可引入的资证列表
  GetQualificationUseDetail({
                              state
                            }) {
    return new Promise((resolve, reject) => {
      getQualificationUseDetail().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //获取记录详情
  GetQualificationUseMasterDetails({
                      state
                    }, id) {
    return new Promise((resolve, reject) => {
      getQualificationUseMasterDetails(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
//新增/修改记录详情
  SaveQualificationUseMaster({
  state
},data) {
  return new Promise((resolve, reject) => {
    saveQualificationUseMaster(data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }).catch(error => {
    reject(error)
  })
},
  //删除记录详情
  DeleteQualificationUseMaster({
                                 state
                               },id) {
    return new Promise((resolve, reject) => {
      deleteQualificationUseMaster(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //删除记录详情
  DeleteQualificationUseDetail({
                                 state
                               },id) {
    return new Promise((resolve, reject) => {
      deleteQualificationUseDetail(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //提交审核记录详情
  AuditQualificationUseMaster({
                                state
                              },data) {
    return new Promise((resolve, reject) => {
      auditQualificationUseMaster(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
