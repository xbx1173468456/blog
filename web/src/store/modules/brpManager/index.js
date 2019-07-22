/* jshint esversion: 6 */
import brpqualificationManager from './brpqualificationManager'
import brpqualificationtypeManager from './brpqualificationtypeManager'
import dayManager from './dayManager/useRecordManager'

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
    brpqualificationManager,
    brpqualificationtypeManager,
    dayManager
  }
}
