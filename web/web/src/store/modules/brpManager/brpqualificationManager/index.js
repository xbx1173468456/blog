// 暴露接口
import {
  getQualificationInfo,
  addQualificationInfo,
  getQualificationInfoDetails,
  amendQualificationInfo,
  deleteQualificationInfo,
  auditQualificationInfo,
  enableQualificationInfo
} from '@/api/brpManager/brpqualificationManager'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取资证列表
  GetQualificationInfo({
                         state
                       }, search) {
    return new Promise((resolve, reject) => {
      getQualificationInfo(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 新增资证
  AddQualificationInfo({
                         state
                       }, data) {
    return new Promise((resolve, reject) => {
      addQualificationInfo(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //获取资证详情
  GetQualificationInfoDetails({
                                state
                              }, id) {
    return new Promise((resolve, reject) => {
      getQualificationInfoDetails(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //修改资证详情
  AmendQualificationInfo({
                           state
                         }, data) {
    return new Promise((resolve, reject) => {
      amendQualificationInfo(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //删除资证详情
  DeleteQualificationInfo({
                            state
                          }, id) {
    return new Promise((resolve, reject) => {
      deleteQualificationInfo(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
      //提交审核资证详情
      AuditQualificationInfo({
        state
      }, data)
    {
      return new Promise((resolve, reject) => {
        auditQualificationInfo(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }).catch(error => {
        reject(error)
      })
    },
      //提交审核资证详情
  EnableQualificationInfo({
        state
      }, data)
    {
      return new Promise((resolve, reject) => {
        enableQualificationInfo(data).then(response => {
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
