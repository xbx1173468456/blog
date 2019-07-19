
import completedReport from './completedManager/completedReport'
import projectHandOver from './completedManager/projectHandOver'
import maintRecord from './maintRecord'

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
    completedReport,
    projectHandOver,
    maintRecord
  }
}
