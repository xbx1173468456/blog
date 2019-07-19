import {
  getDictionaryDataByType
} from '@/api/common/dataDictionary'
import {staticDataDictionary} from "@/assets/data/dictionary";
const state = {
  validateStatus: [],
  type: staticDataDictionary.type,
  static: staticDataDictionary
}
const getters = {}
const mutations = {
  VALIDATE_STATUS: (state, validateStatus) => {
    state.validateStatus = validateStatus
  }
}

const actions = {
  /**
   * 未审核/已审核
   */
  GetValidateStatusData1({
                          commit, state
                        }) {
    return new Promise((resolve, reject) => {
      if (!(state.validateStatus && state.validateStatus.length > 0)) {
        getDictionaryDataByType('VALIDATE_STATUS').then(response => {
          commit('VALIDATE_STATUS', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
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
