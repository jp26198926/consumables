import Vue from 'vue'
import Vuex from 'vuex'
import { pageComponents } from "./page_components.js"
import store from "./app_store.js"
import { action_types } from "./action_types.js"
import { adjustments } from "./adjustments.js"
import { items } from "./items.js"
import { measurements } from "./measurements.js"
import { stocks } from "./stocks.js"
import { types } from "./types.js"
Vue.use(Vuex);

const { state, getters, mutations, actions } = store;
export default function (/* { ssrContext } */) {
	const Store = new Vuex.Store({
		state,
		getters,
		mutations,
		actions,
		modules: {
			pageComponents,
			action_types,
		adjustments,
		items,
		measurements,
		stocks,
		types
		},
		// enable strict mode (adds overhead!)
		// for dev mode only
		strict: process.env.DEV
	})
	return Store
}