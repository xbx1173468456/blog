// 暴露接口
import {
  getAllTenderFee,
  getAllTenderFeeItem,
  getTenderFee,
  saveTenderFee,
  updateTenderFee,
  deleteTenderFee,
  auditTenderFee,
}
  from '@/api/bpmaManager/early/biddingManagement/tenderFee'
import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取投标费用列表所有数据
  GetAllTenderFee({
                state
              },params) {
    return new Promise((resolve, reject) => {
      getAllTenderFee(params).then(response => {
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
  GetAllTenderFeeItem({
               state
             },params) {
    return new Promise((resolve, reject) => {
      getAllTenderFeeItem(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 投标费用内容
   * */
  GetTenderFee({
                    state
                  },id) {
    return new Promise((resolve, reject) => {
      getTenderFee(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 保存投标费用内容
   * */
  SaveTenderFee({state},obj) {
    return new Promise((resolve, reject) =>{
      saveTenderFee(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  UpdateTenderFee({state},obj) {
    return new Promise((resolve, reject) =>{
      updateTenderFee(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 删除投标费用内容
   * */
  DeleteTenderFee({state},id) {
    return new Promise((resolve, reject) =>{
      deleteTenderFee(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
/**
 * 审核投标费用内容
 * */
  AuditTenderFee({state},data) {
    return new Promise((resolve, reject) => {
      auditTenderFee(data).then(response => {
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
  GetDictionaryDataByTypeFilterTenderFee({state},type) {
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
