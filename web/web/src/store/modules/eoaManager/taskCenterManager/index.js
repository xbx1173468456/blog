// 暴露接口
import {
  getTaskData,
  completeShowTask,
  lookShowTask,
  getCompleteList,
  getFormId
} from '@/api/eoaManager/taskCenterManager'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取待办列表
  GetTaskData({
            state
          },search) {
    return new Promise((resolve, reject) => {
      getTaskData(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  // 获取已办列表
  GetCompleteList({
            state
          },search) {
    return new Promise((resolve, reject) => {
      getCompleteList(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //处理待办任务
  CompleteShowTask({
            state
          },data) {
    return new Promise((resolve, reject) => {
      completeShowTask(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //查看详情
  LookShowTask({
            state
          },id) {
    return new Promise((resolve, reject) => {
      console.log(id)
      lookShowTask(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //根据Task查询业务id
  GetFormId({
            state
          },id) {
    return new Promise((resolve, reject) => {
      getFormId(id).then(response => {
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
