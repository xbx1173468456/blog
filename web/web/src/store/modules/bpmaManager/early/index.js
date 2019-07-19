
import biddingAnnouncement from './biddingManagement/biddingAnnouncement'
import biddingDocument from './biddingManagement/biddingDocument'
import biddingStrategy from './biddingManagement/biddingStrategy'
import tenderDocument from './biddingManagement/tenderDocument'
import tenderFee from './biddingManagement/tenderFee'
import tenderQuestion from './biddingManagement/tenderQuestion'
import tenderResult from './biddingManagement/tenderResult'
import workPlan from './setProject/workPlan'

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
    biddingAnnouncement,
    biddingDocument,
    biddingStrategy,
    tenderDocument,
    tenderFee,
    tenderQuestion,
    tenderResult,
    workPlan
  }
}
