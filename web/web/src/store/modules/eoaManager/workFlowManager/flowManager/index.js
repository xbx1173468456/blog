// 暴露接口
import {
  getShowAct,
  deleteShowAct
} from '@/api/eoaManager/workFlowManager/flowManager'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取部署列表
  GetShowAct({
            state
          },search) {
    return new Promise((resolve, reject) => {
      getShowAct(search).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  //删除请假详情
  DeleteShowAct({
                  state
                },id) {
    return new Promise((resolve, reject) => {
      deleteShowAct(id).then(response => {
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
