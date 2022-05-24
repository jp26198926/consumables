import Vue from 'vue'
import Vuex from 'vuex'
import { pageComponents } from "./page_components.js"
import store from "./app_store.js"
import { auth } from "./auth.js"
import { action_types } from "./action_types.js"
import { audits } from "./audits.js"
import { departments } from "./departments.js"
import { dv_created } from "./dv_created.js"
import { dv_updated } from "./dv_updated.js"
import { items } from "./items.js"
import { measurements } from "./measurements.js"
import { permissions } from "./permissions.js"
import { roles } from "./roles.js"
import { stocks } from "./stocks.js"
import { types } from "./types.js"
import { users } from "./users.js"
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
			auth,
		action_types,
		audits,
		departments,
		dv_created,
		dv_updated,
		items,
		measurements,
		permissions,
		roles,
		stocks,
		types,
		users
		},
		// enable strict mode (adds overhead!)
		// for dev mode only
		strict: process.env.DEV
	})
	return Store
}