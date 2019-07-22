// 暴露接口
import {
  getAllTenderDocument,
  getAllTenderDocumentItem,
  getTenderDocument,
  saveTenderDocument,
  updateTenderDocument,
  deleteTenderDocument,
  auditTenderDocument,
}
  from '@/api/bpmaManager/early/biddingManagement/tenderDocument'
import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取投标文件列表所有数据
  GetAllTenderDocument({
                state
              },params) {
    return new Promise((resolve, reject) => {
      getAllTenderDocument(params).then(response => {
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
  GetAllTenderDocumentItem({
               state
             },params) {
    return new Promise((resolve, reject) => {
      getAllTenderDocumentItem(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 投标文件内容
   * */
  GetTenderDocument({
                    state
                  },id) {
    return new Promise((resolve, reject) => {
      getTenderDocument(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 保存投标文件内容
   * */
  SaveTenderDocument({state},obj) {
    return new Promise((resolve, reject) =>{
      saveTenderDocument(obj).then(response => {
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
  UpdateTenderDocument({state},obj) {
    return new Promise((resolve, reject) =>{
      updateTenderDocument(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 删除投标文件内容
   * */
  DeleteTenderDocument({state},id) {
    return new Promise((resolve, reject) =>{
      deleteTenderDocument(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
/**
 * 审核投标文件内容
 * */
  AuditTenderDocument({state},data) {
    return new Promise((resolve, reject) => {
      auditTenderDocument(data).then(response => {
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
  GetDictionaryDataByTypeFilterTenderDocument({state},type) {
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
