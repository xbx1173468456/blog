// 暴露接口
import {
  getAllBiddingStrategy,
  getAllBiddingStrategyItem,
  getBiddingStrategy,
  saveBiddingStrategy,
  updateBiddingStrategy,
  deleteBiddingStrategy,
  auditBiddingStrategy,
}
  from '@/api/bpmaManager/early/biddingManagement/biddingStrategy'
import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取投标策略列表所有数据
  GetAllBiddingStrategy({
                state
              },params) {
    return new Promise((resolve, reject) => {
      getAllBiddingStrategy(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 所有项目
   * */
  GetAllBiddingStrategyItem({
               state
             },params) {
    return new Promise((resolve, reject) => {
      getAllBiddingStrategyItem(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 投标策略内容
   * */
  GetBiddingStrategy({
                    state
                  },id) {
    return new Promise((resolve, reject) => {
      getBiddingStrategy(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 保存投标策略内容
   * */
  SaveBiddingStrategy({state},obj) {
    return new Promise((resolve, reject) =>{
      saveBiddingStrategy(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 修改
   * */
  UpdateBiddingStrategy({state},obj) {
    return new Promise((resolve, reject) =>{
      updateBiddingStrategy(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 删除投标策略内容
   * */
  DeleteBiddingStrategy({state},id) {
    return new Promise((resolve, reject) =>{
      deleteBiddingStrategy(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
/**
 * 审核投标策略内容
 * */
  AuditBiddingStrategy({state},data) {
    return new Promise((resolve, reject) => {
      auditBiddingStrategy(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
},
  /**
   * 数据字典维护（前 中 期）
   * */
  GetDictionaryDataByTypeFilterBiddingStrategy({state},type) {
    return new Promise((resolve, reject) => {
      getDictionaryDataByTypeFilter(type).then(response => {
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
