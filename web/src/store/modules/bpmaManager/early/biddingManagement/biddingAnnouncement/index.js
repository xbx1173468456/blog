// 暴露接口
import {
  getAllbiddingAnnouncement,
  getAllItem,
  getAnnouncement,
  saveAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  auditAnnouncement,

}
  from '@/api/bpmaManager/early/biddingManagement/biddingAnnouncement'

import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'

const state = {}
const getters = {}
const mutations = {}
// 异步调接口方法
const actions = {
  // 获取招标公告列表所有数据
  GetAllbiddingAnnouncement({
                state
              },params) {
    return new Promise((resolve, reject) => {
      getAllbiddingAnnouncement(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 列表页所有项目
   * */
  GetAllItem({
               state
             },params) {
    return new Promise((resolve, reject) => {
      getAllItem(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },

  /**
   * 招标公告内容
   * */
  GetAnnouncement({
                    state
                  },id) {
    return new Promise((resolve, reject) => {
      getAnnouncement(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 保存公告内容
   * */
  SaveAnnouncement({state},obj) {
    return new Promise((resolve, reject) =>{
      saveAnnouncement(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 修改内容
   * */
  UpdateAnnouncement({state},obj) {
    return new Promise((resolve, reject) =>{
      updateAnnouncement(obj).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 删除公告内容
   * */
  DeleteAnnouncement({state},id) {
    return new Promise((resolve, reject) =>{
      deleteAnnouncement(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  },
/**
 * 审核公告内容
 * */
  AuditAnnouncement({state},data) {
    return new Promise((resolve, reject) => {
      auditAnnouncement(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
},
  /**
  * 数据字典维护（前 中 期   招标方式）
  * */
  GetDictionaryDataByTypeFilter({state},type) {
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
