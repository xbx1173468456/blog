// 暴露接口
import {
  getShowAm,
  deleteModel,
  goModel,
  openModel,
  amType,
  addShowAm
} from '@/api/eoaManager/workFlowManager/modelList'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取模型列表
  GetShowAm({
            state
          },search) {
    return new Promise((resolve, reject) => {
      getShowAm(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 删除模型列表
  DeleteModel({
            state
          },id) {
    return new Promise((resolve, reject) => {
      deleteModel(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //跳转流程模型
  GoModel({
            state
          },id) {
    return new Promise((resolve, reject) => {
      goModel(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 发布模型流程
  OpenModel({
            state
          },id) {
    return new Promise((resolve, reject) => {
      openModel(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 新建模型流程
  AddShowAm({
            state
          },category) {
    return new Promise((resolve, reject) => {
      addShowAm(category).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 获取模型类型
  AmType({
            state
          }) {
    return new Promise((resolve, reject) => {
      amType().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /*//获取请假详情
  GetHolidayDetails({
            state
          },id) {
    return new Promise((resolve, reject) => {
      getHolidayDetails(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //修改请假详情
  AmendHoliday({
            state
          },data) {
    return new Promise((resolve, reject) => {
      amendHoliday(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //删除请假详情
  DeleteHoliday({
                  state
                },id) {
    return new Promise((resolve, reject) => {
      deleteHoliday(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //提交审核请假详情
  AuditHoliday({
                  state
                },id) {
    return new Promise((resolve, reject) => {
      auditHoliday(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  }*/

}

export default {
  state,
  getters,
  actions,
  mutations
}
