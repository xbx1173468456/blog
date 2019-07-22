

const state = {
	itemInfoId:0,
	trackId:0
}
const getters = {
	getItemInfoId: state => state.itemInfoId,
	getTrackId: state => state.trackId,
	
}
const mutations = {
	SET_ITEMINFOID: (state, id) => {
    	state.itemInfoId = id
	},
	SET_TRACKID: (state, id) => {
		state.trackId = id
	}
}
const actions = {
	setItemInfoId({ commit }, id) {
		commit('SET_ITEMINFOID', id)
	},
	setTrackId({ commit }, id) {
		commit('SET_TRACKID', id)
	}
}
// 异步调接口方法

export default {
  	state,
	getters,
	mutations,
	actions
}