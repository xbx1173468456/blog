/* jshint esversion: 6 */
import workLogInfo from './workLog'
import askForLeave from './attendance/askForLeave'
import workOvertime from './attendance/workOvertime'
import flowManager from './workFlowManager/flowManager'
import modelList from './workFlowManager/modelList'
import taskCenterManager from './taskCenterManager'

const state = {}
const getters = {}
const actions = {}
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations,
  modules: {
    workLogInfo,
    askForLeave,
    workOvertime,
    flowManager,
    modelList,
    taskCenterManager
  }
}
