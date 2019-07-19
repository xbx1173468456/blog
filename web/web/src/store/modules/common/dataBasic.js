import {
  getMeasureUnitData,
  completeShowTask
} from '@/api/common/dataBasic'
import {staticDataBasic} from "@/assets/data/basic";
import Vue from 'vue'

const state = {
  measureUnit: [],
  static: staticDataBasic
}
const getters = {}
const mutations = {
  MEASURE_UNIT: (state, measureUnit) => {
    state.measureUnit = measureUnit
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
      if (!(state.measureUnit && state.measureUnit.length > 0)) {
        getMeasureUnitData().then(response => {
          commit('MEASURE_UNIT', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  OpenSelectUserAndHandleAudit({ commit, state }, config) {
    // this.handleContainer = this.$pagePPSelect.open({
    //   // processId: '750052'
    //   processId: this.formData.processInstanceId,
    //   formData: this.formData
    // }).then(res => {
    //   this.msg.nextCandidateId = res.nextCandidateId
    //   this.msg.nextGroupId = res.nextGroupId
    //   this.msg.sendUserId = res.sendUserId
    //   this.formData.opinion = res.handleText
    //   this.completeData('1')
    // }).catch(err => {
    //   this.dialogStatus = true
    // })
    return new Promise((reslove, reject) => {
      const { formData, processId } = config
      Vue.prototype.$pagePPSelect.open(config).then(res => {
        completeShowTask({
          flag: "1",
          inputPersonId: formData.inputPersonId,
          nextCandidateId: res.nextCandidateId,
          nextGroupId: res.nextGroupId,
          opId: formData.inputPersonId,
          opName: formData.inputPerson,
          opinion: res.handleText,
          processInstanceId: processId,
        }).then(res => {
          reslove()
        })
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
