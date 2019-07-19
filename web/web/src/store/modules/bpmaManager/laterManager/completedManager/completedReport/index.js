// 暴露接口
import {
  getLastFinishDataList,
  getLastFinish,
  addLastFinish,
  amendLastFinish,
  deleteLastFinish,
  auditLastFinish,
} from '@/api/bpmaManager/laterManager/completedManager/completedReport'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取施工列表
  GetLastFinishDataList({
                        state
                      }, search) {
    return new Promise((resolve, reject) => {
      getLastFinishDataList(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
//获取竣工报告
  GetLastFinish({
                 state
               }, id) {
    return new Promise((resolve, reject) => {
      getLastFinish(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 新增施工
  AddLastFinish({
                 state
               }, data) {
    return new Promise((resolve, reject) => {
      addLastFinish(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //修改竣工报告
  AmendLastFinish({
                   state
                 }, data) {
    return new Promise((resolve, reject) => {
      amendLastFinish(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //删除竣工报告
  DeleteLastFinish({
                    state
                  }, id) {
    return new Promise((resolve, reject) => {
      deleteLastFinish(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //提交审核竣工报告
  AuditLastFinish({
                   state
                 }, data) {
    return new Promise((resolve, reject) => {
      auditLastFinish(data).then(response => {
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
