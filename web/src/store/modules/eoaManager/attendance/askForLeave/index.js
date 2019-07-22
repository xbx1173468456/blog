// 暴露接口
import {
  getHolidayList,
  addHoliday,
  getHolidayDetails,
  amendHoliday,
  deleteHoliday,
  auditHoliday,
  isActiviti,
  addLeave,
  readResource
} from '@/api/eoaManager/attendance/askForLeave'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取请假列表
  GetHolidayList({
            state
          },search) {
    return new Promise((resolve, reject) => {
      getHolidayList(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 新增请假
  AddHolidayList({
            state
          },data) {
    return new Promise((resolve, reject) => {
      addHoliday(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 获取请假类型
  GetHolidayType({
            state
          }) {
    return new Promise((resolve, reject) => {
      getHolidayType().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //获取请假详情
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
                },data) {
    return new Promise((resolve, reject) => {
      auditHoliday(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //获取是否有请假审批流
  IsActiviti({
                  state
                },category) {
    return new Promise((resolve, reject) => {
      isActiviti(category).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //挂载请假审批流
  AddLeave({
                  state
                },data) {
    return new Promise((resolve, reject) => {
      addLeave(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //读取审批流
  ReadResource({
                  state
                },id) {
    return new Promise((resolve, reject) => {
      readResource(id).then(response => {
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
