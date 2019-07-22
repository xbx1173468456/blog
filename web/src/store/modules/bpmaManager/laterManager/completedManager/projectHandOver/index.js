// 暴露接口
import {
  getLastDeliverDataList,
  getLastDeliver,
  addLastDeliver,
  amendLastDeliver,
  deleteLastDeliver,
  auditLastDeliver,
  getContractInfoMasterDataList
} from '@/api/bpmaManager/laterManager/completedManager/projectHandOver'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取项目移交
  GetLastDeliverDataList({
                        state
                      }, search) {
    return new Promise((resolve, reject) => {
      getLastDeliverDataList(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
//获取项目移交
  GetLastDeliver({
                 state
               }, id) {
    return new Promise((resolve, reject) => {
      getLastDeliver(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 新增项目移交
  AddLastDeliver({
                 state
               }, data) {
    return new Promise((resolve, reject) => {
      addLastDeliver(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //修改项目移交
  AmendLastDeliver({
                   state
                 }, data) {
    return new Promise((resolve, reject) => {
      amendLastDeliver(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //删除项目移交
  DeleteLastDeliver({
                    state
                  }, id) {
    return new Promise((resolve, reject) => {
      deleteLastDeliver(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //提交审核项目移交
  AuditLastDeliver({
                   state
                 }, data) {
    return new Promise((resolve, reject) => {
      auditLastDeliver(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //提交审核项目移交
  GetContractInfoMasterDataList({
                   state
                 },id) {
    return new Promise((resolve, reject) => {
      getContractInfoMasterDataList(id).then(response => {
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
