

const state = {
	typeId:0,
	messageTypeId:0,
	logId:0,
	selectP:[]
}
const getters = {
	getTypeId: state => state.typeId,
	getMessageTypeId: state => state.messageTypeId,
	getLogId: state => state.logId,
	getselectP: state => state.selectP,
	
}
const mutations = {
	SET_TYPEID: (state, id) => {
    state.typeId = id
	},
	SET_MESSAGETYPEID: (state, id) => {
    state.messageTypeId = id
	},
	SET_LOGID: (state, id) => {
    state.logId = id
	},
	SET_SELECTP: (state, id) => {
    state.selectP = id
  }
}
const actions = {
	setTypeId({ commit }, id) {
    commit('SET_TYPEID', id)
	},
	setMessageTypeId({ commit }, id) {
    commit('SET_MESSAGETYPEID', id)
	},
	setLogId({ commit }, id) {
    commit('SET_LOGID', id)
	},
	setSelectP({ commit }, id) {
    commit('SET_SELECTP', id)
  }
}
// 异步调接口方法

export default {
  state,
	getters,
	mutations,
	actions
}
