
/**
    App Vuex Store
	Define store objects which can be accessed from any component

	examples:
    this.$store.state.propName
    this.store.getters.getProp 
    this.$store.commit("setProps")
    this.$store.dispatch("actionName")
*/
import { ApiService } from '../services/api';
const store =  {
   	state: {
		propName: "Store state value",
	},
   	getters: {
		getProp(state) {
			return state.propName
		},
	},
   	mutations: {
		setProp(state, records) {
			state.propName = records
		},
	},
   	actions: {
		fetchData: ({ commit }, arg) => {
			let apiPath = "/controller/action";
			return new Promise((resolve, reject) => {
				ApiService.get(apiPath).then(resp => {
					let data = resp.data;
					commit("setProp", data);
					resolve(resp)
				})
				.catch(err => {
					reject(err)
				})
			})
		},
	},
}
export default store;
