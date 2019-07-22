// 暴露接口
import {
  getAllSubcontractApplication,
  getAllSubcontractApplicationItem,
  getSubcontractApplication,
  saveSubcontractApplication,
  updateSubcontractApplication,
  deleteSubcontractApplication,
  auditSubcontractApplication,
}
  from '@/api/bpmaManager/subpackage/subcontractManagement/subcontractApplication'
import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取分包申请列表所有数据
  GetAllSubcontractApplication({
                state
              },params) {
    return new Promise((resolve, reject) => {
      getAllSubcontractApplication(params).then(response => {
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
  GetAllSubcontractApplicationItem({
               state
             },params) {
    return new Promise((resolve, reject) => {
      getAllSubcontractApplicationItem(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 分包申请内容
   * */
  GetSubcontractApplication({
                    state
                  },id) {
    return new Promise((resolve, reject) => {
      getSubcontractApplication(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 保存分包申请内容
   * */
  SaveSubcontractApplication({state},obj) {
    return new Promise((resolve, reject) =>{
      saveSubcontractApplication(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  UpdateSubcontractApplication({state},obj) {
    return new Promise((resolve, reject) =>{
      updateSubcontractApplication(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  
  /**
   * 删除分包申请内容
   * */
  DeleteSubcontractApplication({state},id) {
    return new Promise((resolve, reject) =>{
      deleteSubcontractApplication(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
/**
 * 审核分包申请内容
 * */
  AuditSubcontractApplication({state},data) {
    return new Promise((resolve, reject) => {
      auditSubcontractApplication(data).then(response => {
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
  GetDictionaryDataByTypeFilterSubcontractApplication({state},type) {
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
