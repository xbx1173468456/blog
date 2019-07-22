// 暴露接口
import {
  getAllbiddingDocument,
  getAllDocumentItem,
  getDocument,
  saveDocument,
  updateDocument,
  deleteDocument,
  auditDocument,
}
  from '@/api/bpmaManager/early/biddingManagement/biddingDocument'
import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取招标文件列表所有数据
  GetAllbiddingDocument({
                state
              },params) {
    return new Promise((resolve, reject) => {
      getAllbiddingDocument(params).then(response => {
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
  GetAllDocumentItem({
               state
             },params) {
    return new Promise((resolve, reject) => {
      getAllDocumentItem(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 招标文件内容
   * */
  GetDocument({
                    state
                  },id) {
    return new Promise((resolve, reject) => {
      getDocument(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 保存文件内容
   * */
  SaveDocument({state},obj) {
    return new Promise((resolve, reject) =>{
      saveDocument(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },/**
   * 修改文件内容
   * */
  UpdateDocument({state},obj) {
    return new Promise((resolve, reject) =>{
      updateDocument(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 删除文件内容
   * */
  DeleteDocument({state},id) {
    return new Promise((resolve, reject) =>{
      deleteDocument(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
/**
 * 审核文件内容
 * */
  AuditDocument({state},data) {
    return new Promise((resolve, reject) => {
      auditDocument(data).then(response => {
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
  GetDictionaryDataByTypeFilterDocument({state},type) {
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
