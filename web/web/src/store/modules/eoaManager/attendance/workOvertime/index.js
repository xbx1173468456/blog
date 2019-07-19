// 暴露接口
import {
  getOvertimeList,
  addOvertime,
  getOvertimeDetails,
  amendOvertime,
  deleteOvertime,
  auditOvertime,
  flowOvertime
} from '@/api/eoaManager/attendance/workOvertime'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取加班列表
  GetOvertimeList({
            state
          },search) {
    return new Promise((resolve, reject) => {
      getOvertimeList(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 新增加班
  AddOvertimeList({
            state
          },data) {
    return new Promise((resolve, reject) => {
      addOvertime(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 获取加班类型
  GetOvertimeType({
            state
          }) {
    return new Promise((resolve, reject) => {
      getOvertimeType().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //获取加班详情
  GetOvertimeDetails({
            state
          },id) {
    return new Promise((resolve, reject) => {
      getOvertimeDetails(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //修改加班详情
  AmendOvertime({
            state
          },data) {
    return new Promise((resolve, reject) => {
      amendOvertime(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //删除加班详情
  DeleteOvertime({
                  state
                },id) {
    return new Promise((resolve, reject) => {
      deleteOvertime(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //提交审核加班详情
  AuditOvertime({
                  state
                },data) {
    return new Promise((resolve, reject) => {
      auditOvertime(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //挂载加班审批流
  FlowOvertime({
                  state
                },data) {
    return new Promise((resolve, reject) => {
      flowOvertime(data).then(response => {
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
