// 暴露接口
import {
  getAllTenderQuestion,
  getAllTenderQuestionItem,
  getTenderQuestion,
  saveTenderQuestion,
  updateTenderQuestion,
  deleteTenderQuestion,
  auditTenderQuestion,
}
  from '@/api/bpmaManager/early/biddingManagement/tenderQuestion'
import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取投标答疑列表所有数据
  GetAllTenderQuestion({
                state
              },params) {
    return new Promise((resolve, reject) => {
      getAllTenderQuestion(params).then(response => {
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
  GetAllTenderQuestionItem({
               state
             },params) {
    return new Promise((resolve, reject) => {
      getAllTenderQuestionItem(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 投标答疑内容
   * */
  GetTenderQuestion({
                    state
                  },id) {
    return new Promise((resolve, reject) => {
      getTenderQuestion(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 保存投标答疑内容
   * */
  SaveTenderQuestion({state},obj) {
    return new Promise((resolve, reject) =>{
      saveTenderQuestion(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  UpdateTenderQuestion({state},obj) {
    return new Promise((resolve, reject) =>{
      updateTenderQuestion(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 删除投标答疑内容
   * */
  DeleteTenderQuestion({state},id) {
    return new Promise((resolve, reject) =>{
      deleteTenderQuestion(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
/**
 * 审核投标答疑内容
 * */
  AuditTenderQuestion({state},data) {
    return new Promise((resolve, reject) => {
      auditTenderQuestion(data).then(response => {
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
  GetDictionaryDataByTypeFilterTenderQuestion({state},type) {
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
