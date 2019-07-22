// 暴露接口
import {
  getAllTenderResult,
  getAllTenderResultItem,
  getTenderResult,
  saveTenderResult,
  updateTenderResult,
  deleteTenderResult,
  auditTenderResult,
}
  from '@/api/bpmaManager/early/biddingManagement/tenderResult'
import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取投标结果列表所有数据
  GetAllTenderResult({
                state
              },params) {
    return new Promise((resolve, reject) => {
      getAllTenderResult(params).then(response => {
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
  GetAllTenderResultItem({
               state
             },params) {
    return new Promise((resolve, reject) => {
      getAllTenderResultItem(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 投标结果内容
   * */
  GetTenderResult({
                    state
                  },id) {
    return new Promise((resolve, reject) => {
      getTenderResult(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 保存投标结果内容
   * */
  SaveTenderResult({state},obj) {
    return new Promise((resolve, reject) =>{
      saveTenderResult(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  UpdateTenderResult({state},obj) {
    return new Promise((resolve, reject) =>{
      updateTenderResult(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 删除投标结果内容
   * */
  DeleteTenderResult({state},id) {
    return new Promise((resolve, reject) =>{
      deleteTenderResult(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
/**
 * 审核投标结果内容
 * */
  AuditTenderResult({state},data) {
    return new Promise((resolve, reject) => {
      auditTenderResult(data).then(response => {
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
  GetDictionaryDataByTypeFilterTenderResult({state},type) {
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
