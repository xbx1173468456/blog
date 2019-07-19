// 暴露接口
import {
  getWorkPlanDataList,
  getBuildPlan,
  addBuildPlan,
  amendBuildPlan,
  deleteBuildPlan,
  auditBuildPlan,
  getPropjectDataList
} from '@/api/bpmaManager/early/setProject/workPlan'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取施工列表
  GetWorkPlanDataList({
                        state
                      }, search) {
    return new Promise((resolve, reject) => {
      getWorkPlanDataList(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 获取项目列表
  GetPropjectDataList({
                        state
                      }) {
    return new Promise((resolve, reject) => {
      getPropjectDataList().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
//获取施工详情
  GetBuildPlan({
                 state
               }, id) {
    return new Promise((resolve, reject) => {
      getBuildPlan(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 新增施工
  AddBuildPlan({
                 state
               }, data) {
    return new Promise((resolve, reject) => {
      addBuildPlan(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //修改施工详情
  AmendBuildPlan({
                   state
                 }, data) {
    return new Promise((resolve, reject) => {
      amendBuildPlan(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //删除施工详情
  DeleteBuildPlan({
                    state
                  }, id) {
    return new Promise((resolve, reject) => {
      deleteBuildPlan(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //提交审核施工详情
  AuditBuildPlan({
                   state
                 }, data) {
    return new Promise((resolve, reject) => {
      auditBuildPlan(data).then(response => {
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
