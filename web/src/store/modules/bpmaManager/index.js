/* jshint esversion: 6 */
import item from './itemInfo'
import subcontractApplication from './subpackage/subcontractManagement/subcontractApplication'
import employment from './subpackage/subcontractManagement/employment'

/*import change from './subpackage/subcontract/change'
import registration from './subpackage/subcontract/registration'
import review from './subpackage/subcontract/review'*/


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
    item,
    employment,
    subcontractApplication
  }
}
