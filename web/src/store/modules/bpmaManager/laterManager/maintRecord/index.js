// 暴露接口
import {
  getLastMaintenanceDataList,
  getLastMaintenance,
  addLastMaintenance,
  amendLastMaintenance,
  deleteLastMaintenance,
  auditLastMaintenance,
} from '@/api/bpmaManager/laterManager/maintRecord'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取维保记录
  GetLastMaintenanceDataList({
                        state
                      }, search) {
    return new Promise((resolve, reject) => {
      getLastMaintenanceDataList(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
//获取维保记录
  GetLastMaintenance({
                 state
               }, id) {
    return new Promise((resolve, reject) => {
      getLastMaintenance(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 新增施工
  AddLastMaintenance({
                 state
               }, data) {
    return new Promise((resolve, reject) => {
      addLastMaintenance(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //修改维保记录
  AmendLastMaintenance({
                   state
                 }, data) {
    return new Promise((resolve, reject) => {
      amendLastMaintenance(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //删除维保记录
  DeleteLastMaintenance({
                    state
                  }, id) {
    return new Promise((resolve, reject) => {
      deleteLastMaintenance(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //提交审核维保记录
  AuditLastMaintenance({
                   state
                 }, data) {
    return new Promise((resolve, reject) => {
      auditLastMaintenance(data).then(response => {
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
