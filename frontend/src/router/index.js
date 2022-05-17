
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
let routes = [
	{
		name: 'main',
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			
			{ 
				path: '/(home)?', 
				name: 'home' , 
				component: () => import('pages/home/home.vue'),
				props: true
			},
			//Dashboard routes


//action_types routes
			{ 
				path: '/action_types/', 
				name: 'action_typeslist', 
				component: () => import('pages/action_types/list.vue'), 
				props: true
			},
			{ 
				path: '/action_types/(list|index)/:fieldName?/:fieldValue?', 
				name: 'action_typeslistfilter', 
				component: () => import('pages/action_types/list.vue'), 
				props: true
			},
	
			{ 
				path: '/action_types/view/:id', 
				name: 'action_typesview', 
				component: () => import('pages/action_types/view.vue'), 
				props: true
			},
	
			{ 
				path: '/action_types/add', 
				name: 'action_typesadd', 
				component: () => import('pages/action_types/add.vue'), 
				props: true
			},
	
			{ 
				path: '/action_types/edit/:id', 
				name: 'action_typesedit', 
				component: () => import('pages/action_types/edit.vue'), 
				props: true
			},
		

//adjustments routes
			{ 
				path: '/adjustments/', 
				name: 'adjustmentslist', 
				component: () => import('pages/adjustments/list.vue'), 
				props: true
			},
			{ 
				path: '/adjustments/(list|index)/:fieldName?/:fieldValue?', 
				name: 'adjustmentslistfilter', 
				component: () => import('pages/adjustments/list.vue'), 
				props: true
			},
	
			{ 
				path: '/adjustments/view/:id', 
				name: 'adjustmentsview', 
				component: () => import('pages/adjustments/view.vue'), 
				props: true
			},
	
			{ 
				path: '/adjustments/add', 
				name: 'adjustmentsadd', 
				component: () => import('pages/adjustments/add.vue'), 
				props: true
			},
	
			{ 
				path: '/adjustments/edit/:id', 
				name: 'adjustmentsedit', 
				component: () => import('pages/adjustments/edit.vue'), 
				props: true
			},
		

//items routes
			{ 
				path: '/items/', 
				name: 'itemslist', 
				component: () => import('pages/items/list.vue'), 
				props: true
			},
			{ 
				path: '/items/(list|index)/:fieldName?/:fieldValue?', 
				name: 'itemslistfilter', 
				component: () => import('pages/items/list.vue'), 
				props: true
			},
	
			{ 
				path: '/items/view/:id', 
				name: 'itemsview', 
				component: () => import('pages/items/view.vue'), 
				props: true
			},
	
			{ 
				path: '/items/add', 
				name: 'itemsadd', 
				component: () => import('pages/items/add.vue'), 
				props: true
			},
	
			{ 
				path: '/items/edit/:id', 
				name: 'itemsedit', 
				component: () => import('pages/items/edit.vue'), 
				props: true
			},
		

//measurements routes
			{ 
				path: '/measurements/', 
				name: 'measurementslist', 
				component: () => import('pages/measurements/list.vue'), 
				props: true
			},
			{ 
				path: '/measurements/(list|index)/:fieldName?/:fieldValue?', 
				name: 'measurementslistfilter', 
				component: () => import('pages/measurements/list.vue'), 
				props: true
			},
	
			{ 
				path: '/measurements/view/:id', 
				name: 'measurementsview', 
				component: () => import('pages/measurements/view.vue'), 
				props: true
			},
	
			{ 
				path: '/measurements/add', 
				name: 'measurementsadd', 
				component: () => import('pages/measurements/add.vue'), 
				props: true
			},
	
			{ 
				path: '/measurements/edit/:id', 
				name: 'measurementsedit', 
				component: () => import('pages/measurements/edit.vue'), 
				props: true
			},
		

//stocks routes
			{ 
				path: '/stocks/', 
				name: 'stockslist', 
				component: () => import('pages/stocks/list.vue'), 
				props: true
			},
			{ 
				path: '/stocks/(list|index)/:fieldName?/:fieldValue?', 
				name: 'stockslistfilter', 
				component: () => import('pages/stocks/list.vue'), 
				props: true
			},
	
			{ 
				path: '/stocks/view/:id', 
				name: 'stocksview', 
				component: () => import('pages/stocks/view.vue'), 
				props: true
			},
	
			{ 
				path: '/stocks/add', 
				name: 'stocksadd', 
				component: () => import('pages/stocks/add.vue'), 
				props: true
			},
	
			{ 
				path: '/stocks/edit/:id', 
				name: 'stocksedit', 
				component: () => import('pages/stocks/edit.vue'), 
				props: true
			},
		

//types routes
			{ 
				path: '/types/', 
				name: 'typeslist', 
				component: () => import('pages/types/list.vue'), 
				props: true
			},
			{ 
				path: '/types/(list|index)/:fieldName?/:fieldValue?', 
				name: 'typeslistfilter', 
				component: () => import('pages/types/list.vue'), 
				props: true
			},
	
			{ 
				path: '/types/view/:id', 
				name: 'typesview', 
				component: () => import('pages/types/view.vue'), 
				props: true
			},
	
			{ 
				path: '/types/add', 
				name: 'typesadd', 
				component: () => import('pages/types/add.vue'), 
				props: true
			},
	
			{ 
				path: '/types/edit/:id', 
				name: 'typesedit', 
				component: () => import('pages/types/edit.vue'), 
				props: true
			},
		

			
			
			
			
			{ 
				path:  '/error/forbidden', 
				name: 'forbidden', 
				component: () => import('pages/errors/forbidden.vue'),
				props: true
			},
			{ 
				path: '/error/notfound', 
				name: 'notfound',
				component: () => import('pages/errors/pagenotfound.vue'),
				props: true
			}
		]
	},
];


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default async function ({ store, ssrContext }) {
	let mainRoute = routes.find(x => x.name = "main");

	

	// Always leave this as last one
	if (process.env.MODE !== 'ssr') {
		mainRoute.children.push({path: '*', component: () => import('pages/errors/pagenotfound.vue')});
	}

	const Router = new VueRouter({
		scrollBehavior: () => ({ x: 0, y: 0 }),
		routes,
		// Leave these as they are and change in quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		mode: process.env.VUE_ROUTER_MODE,
		base: process.env.VUE_ROUTER_BASE
	});
	return Router
}
