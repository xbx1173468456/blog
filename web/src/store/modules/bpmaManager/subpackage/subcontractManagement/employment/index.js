// 暴露接口
import {
  getAllEmployment,
  getAllEmploymentItem,
  getEmployment,
  saveEmployment,
  deleteEmployment,
  auditEmployment,

  getEmploymentPersonType,
  getEmploymentPerson,
  deleteEmploymentPerson
}
  from '@/api/bpmaManager/subpackage/subcontractManagement/employment'
import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取用工申请列表所有数据
  GetAllEmployment({
                state
              },params) {
    return new Promise((resolve, reject) => {
      getAllEmployment(params).then(response => {
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
  GetAllEmploymentItem({
               state
             },params) {
    return new Promise((resolve, reject) => {
      getAllEmploymentItem(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 用工申请内容
   * */
  GetEmployment({
                    state
                  },id) {
    return new Promise((resolve, reject) => {
      getEmployment(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 保存用工申请内容
   * */
  SaveEmployment({state},obj) {
    return new Promise((resolve, reject) =>{
      saveEmployment(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  
  /**
   * 删除用工申请内容
   * */
  DeleteEmployment({state},id) {
    return new Promise((resolve, reject) =>{
      deleteEmployment(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
/**
 * 审核用工申请内容
 * */
  AuditEmployment({state},data) {
    return new Promise((resolve, reject) => {
      auditEmployment(data).then(response => {
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
  GetDictionaryDataByTypeFilterEmployment({state},type) {
    return new Promise((resolve, reject) => {
      getDictionaryDataByTypeFilter(type).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },

/**
* 引入人员 人员类型
* */
/*GetEmploymentPersonType({state},params) {
  return new Promise((resolve, reject) => {
    getEmploymentPersonType(params).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  }).catch(error => {
    reject(error)
  })
},*/
  GetEmploymentPerson({
                  state
                },params) {
    return new Promise((resolve, reject) => {
      getEmploymentPerson(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  DeleteEmploymentPerson({state},id) {
    return new Promise((resolve, reject) =>{
      deleteEmploymentPerson(id).then(response => {
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
