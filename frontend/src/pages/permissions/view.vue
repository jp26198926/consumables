<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card  :flat="isSubPage" class="page-section q-py-sm q-px-md q-mb-md nice-shadow-18" >
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto " >
                            <div class="" >
                                <div class="row  items-center q-col-gutter-sm q-px-sm">
                                    <div class="col">
                                        <div class="text-h6 text-primary">Permissions Details</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </q-card>
        </template>
        <section class="page-section " >
            <div class="container">
                <div class="row q-col-gutter-x-md">
                    <div class="col comp-grid" >
                        <q-card  :flat="isSubPage" class=" nice-shadow-18">
                            <div >
                                <div class="relative-position" style="min-height:100px">
                                    <template v-if="!loading && item">
                                        <div class="row q-col-gutter-x-md">
                                            <div class="col">
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>Permission ID: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.permission_id }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>Permission: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.permission }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>Role: </q-item-label>
                                                        <q-item-label class="text-bold">
                                                            <q-btn v-if="item.role_id" @click="openPageDialog({ page: 'roles/view', url: `/roles/view/${item.role_id}` }, { closeBtn: true })" padding="xs" flat color="primary" no-caps >
                                                                <q-icon name="visibility" size="xs"  class="q-mr-xs"></q-icon>  {{ item.roles_role_name }}
                                                            </q-btn>
                                                        </q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-card-actions class="row q-col-gutter-xs justify-end">
                                                    <q-btn icon="menu" padding="xs" round flat color="grey">
                                                        <q-menu auto-close transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                            <q-list dense rounded nav>
                                                                <template v-if="$can.view('permissions/edit')">
                                                                    <q-item link clickable v-ripple :to="`/permissions/edit/${item.permission_id}`">
                                                                        <q-item-section>
                                                                            <q-icon color="positive"  size="sm" name="edit"></q-icon>
                                                                        </q-item-section>
                                                                        <q-item-section>Edit</q-item-section>
                                                                    </q-item>
                                                                </template>
                                                                <template v-if="$can.view('permissions/delete')">
                                                                    <q-item link clickable v-ripple @click="deleteItem(item.permission_id)">
                                                                        <q-item-section>
                                                                            <q-icon color="negative"  size="sm" name="clear"></q-icon>
                                                                        </q-item-section>
                                                                        <q-item-section>Delete</q-item-section>
                                                                    </q-item>
                                                                </template>
                                                            </q-list>
                                                        </q-menu>
                                                    </q-btn>
                                                </q-card-actions>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="loading">
                                        <div class="q-pa-sm text-center">
                                            <q-inner-loading :showing="loading">
                                                <q-spinner :size="40" color="primary" indeterminate></q-spinner>
                                            </q-inner-loading>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </q-card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
	import { PageMixin } from "../../mixins/page.js";
	import { ViewPageMixin } from "../../mixins/viewpage.js";
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: 'viewPermissionsPage',
		components: {
		},
		mixins: [PageMixin, ViewPageMixin ],
		props: {
			pageName: {
				type : String,
				default : 'permissions',
			},
			idName: {
				type: String,
				default: 'permission_id',
			},
			routeName : {
				type : String,
				default : 'permissionsview',
			},
			pagePath: {
				type : String,
				default : 'permissions/view',
			},
			apiPath: {
				type : String,
				default : 'permissions/view',
			},
		},
		data() {
            return {
				item: {
					default :{
					},
				},
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					return "Permissions Details"
				}
			},
			currentRecord: {
				get: function () {
					return this.$store.getters["permissions/currentRecord"];
				},
				set: function (value) {
					this.$store.commit("permissions/setCurrentRecord", value);
				},
			},
		},
		meta() {
			return {
				title: this.pageTitle
			}
		},
		methods: {
			...mapActions("permissions", [ "fetchRecord", "deleteRecord"]),
		},
		watch: {
			$route (to, from){
				//only fetch data when navigated to this page
				if(to.name == this.routeName){
					this.load();
				}
			},
		},
		async mounted() {
		},
		async created() {
		},
	};
</script>
<style scoped>
</style>
