<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card  :flat="isSubPage" class="page-section q-py-sm q-px-md q-mb-md nice-shadow-18" >
                <div class="container-fluid">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto " >
                            <div class="" >
                                <div class="row  items-center q-col-gutter-sm q-px-sm">
                                    <div class="col">
                                        <div class="text-h6 text-primary">Audits</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-auto col-12 " >
                            <q-btn       :rounded="false"  size=""  color="primary" no-caps  unelevated   :to="`/audits/add`" class="full-width" >
                                <q-icon name="add"></q-icon>                                
                                Add New Audits 
                            </q-btn>
                        </div>
                        <div class="col-md-auto col-12 " >
                            <q-input debounce="1000" outlined dense  placeholder="Search" v-model="searchText" >
                            <template v-slot:append>
                                <q-icon name="search"></q-icon>
                            </template>
                            </q-input>
                        </div>
                    </div>
                </div>
            </q-card>
        </template>
        <section class="page-section " >
            <div class="container-fluid">
                <div class="row q-col-gutter-x-md">
                    <div class="col comp-grid" >
                        <div>
                            <q-chip v-if="searchText" icon="search" removable @remove="searchText='';$route.query.search=''">
                            Search: <strong class="q-ml-sm"> {{ searchText }} </strong>
                            </q-chip>
                        </div>
                        <div class="">
                            <div >
                                <template v-if="showBreadcrumbs && $route.query.tag">
                                    <q-breadcrumbs class="q-pa-md">
                                        <q-breadcrumbs-el icon="arrow_back" class="text-capitalize" :label="$route.query.tag" to="/audits"></q-breadcrumbs-el>
                                        <q-breadcrumbs-el :label="$route.query.label"></q-breadcrumbs-el>
                                    </q-breadcrumbs>
                                </template>
                                <div class="relative-position">
                                    <div class="row q-col-gutter-x-md">
                                        <!-- Master Page Start -->
                                        <div class="col">
                                            <!-- page records template -->
                                            <template >
                                                <q-table 
                                                :flat="true"
                                                table-header-class="text-h4 "
                                                :bordered="false"
                                                :columns="$menus.AuditsTableHeaderItems" 
                                                :data="records"
                                                binary-state-sort
                                                separator="horizontal"
                                                :dense="true"
                                                row-key="log_id" 
                                                :pagination.sync="pagination"
                                                hide-bottom
                                                @request="setPagination"
                                                :loading="loading">
                                                <!-- Start of Table Layout -->
                                                <template v-slot:body="props">
                                                    <q-tr :class="{selected: isCurrentRecord(props.row)}" :props="props">
                                                        <q-td  key="log_id" :props="props">
                                                            <q-btn padding="xs"   :rounded="false"  color="primary"  no-caps  unelevated   flat :to="`/audits/view/${props.row.log_id}`">{{ props.row.log_id }}</q-btn>
                                                        </q-td>
                                                        <q-td  key="action" :props="props">
                                                            {{ props.row.action }}
                                                        </q-td>
                                                        <q-td  key="page" :props="props">
                                                            {{ props.row.page }}
                                                        </q-td>
                                                        <q-td  key="record_id" :props="props">
                                                            {{ props.row.record_id }}
                                                        </q-td>
                                                        <q-td  key="user_ip" :props="props">
                                                            {{ props.row.user_ip }}
                                                        </q-td>
                                                        <q-td  key="request_url" :props="props">
                                                            {{ props.row.request_url }}
                                                        </q-td>
                                                        <q-td  key="timestamp" :props="props">
                                                            <q-chip v-if="props.row.timestamp" dense size="13px" :label="props.row.timestamp | relativeDate">
                                                            <q-tooltip
                                                            content-class="bg-accent"
                                                            transition-show="scale"
                                                            transition-hide="scale"
                                                            >
                                                            {{ props.row.timestamp | humanDatetime}}
                                                            </q-tooltip>
                                                            </q-chip>
                                                        </q-td>
                                                        <q-td  key="users_name" :props="props">
                                                            {{ props.row.users_name }}
                                                        </q-td>
                                                        <q-td key="btnactions" :props="props">
                                                            <div class="row q-col-gutter-xs justify-end">
                                                                <q-btn icon="menu" padding="xs" round flat color="grey">
                                                                    <q-menu auto-close transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                                        <q-list dense rounded nav>
                                                                            <template v-if="$can.view('audits/view')">
                                                                                <q-item link clickable v-ripple :to="`/audits/view/${props.row.log_id}`">
                                                                                    <q-item-section>
                                                                                        <q-icon color="primary"  size="sm" name="visibility"></q-icon>
                                                                                    </q-item-section>
                                                                                    <q-item-section>View</q-item-section>
                                                                                </q-item>
                                                                            </template>
                                                                            <q-item link clickable v-ripple :to="`/audits/edit`">
                                                                                <q-item-section>
                                                                                    <q-icon color="positive"  size="sm" name="edit"></q-icon>
                                                                                </q-item-section>
                                                                                <q-item-section>Edit</q-item-section>
                                                                            </q-item>
                                                                            <q-item link clickable v-ripple :to="`/audits/delete`">
                                                                                <q-item-section>
                                                                                    <q-icon color="negative"  size="sm" name="clear"></q-icon>
                                                                                </q-item-section>
                                                                                <q-item-section>Delete</q-item-section>
                                                                            </q-item>
                                                                        </q-list>
                                                                    </q-menu>
                                                                </q-btn>
                                                            </div>
                                                        </q-td>
                                                    </q-tr>
                                                </template>
                                                <!-- End of Table Layout-->
                                                </q-table>
                                            </template>
                                            <!-- page loading indicator template -->
                                            <template v-if="loading">
                                                <q-inner-loading :showing="loading">
                                                    <q-spinner color="primary" size="30px"> 
                                                    </q-spinner>
                                                </q-inner-loading>
                                            </template>
                                            <!-- page empty record template -->
                                            <template v-if="!loading && !records.length">
                                                <q-card :flat="$q.screen.gt.md">
                                                    <q-card-section>
                                                        <div class="text-grey text-h6 text-center">
                                                            No record found
                                                        </div>
                                                    </q-card-section>
                                                </q-card>
                                            </template>
                                            <!-- page footer template-->
                                            <template v-if="showFooter">
                                                <div class="">
                                                    <div class="q-pa-sm" v-show="!loading">
                                                        <div class="row justify-between">
                                                            <div class="row q-col-gutter-md">
                                                            </div>
                                                            <div v-if="paginate && totalRecords > 0" class="row q-col-gutter-md justify-center">
                                                                <div class="col-auto">
                                                                    <q-chip>Records {{recordsPosition}} of {{totalRecords}}</q-chip>
                                                                </div>
                                                                <div v-if="totalPages > 1">
                                                                    <q-pagination  color="primary" flat glossy  input v-model="pagination.page" :direction-links="true" :boundary-links="true" :max-pages="5" :boundary-numbers="true" :max="totalPages"></q-pagination>
                                                                </div>
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
	import { PageMixin } from "../../mixins/page.js";
	import { ListPageMixin } from "../../mixins/listpage.js";
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: 'listAuditsPage',
		components: {
        },
		mixins: [PageMixin, ListPageMixin ],
		props: {
			primaryKey : {
				type : String,
				default : 'log_id',
			},
			pageName : {
				type : String,
				default : 'audits',
			},
			routeName : {
				type : String,
				default : 'auditslist',
			},
			apiPath : {
				type : String,
				default : 'audits/index',
			},
			multiCheckbox: {
				type: Boolean,
				default: false,
			},
			msgBeforeDelete: {
				type: String,
				default: "Are you sure you want to delete this record?",
			},
		},
		data() {
            return {
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					//set browser page title
					return "Audits"
				}
			},
			records: {
				get: function () {
					return this.$store.getters["audits/records"];
				},
				set: function (value) {
					this.$store.commit("audits/setRecords", value);
				},
			},
			currentRecord: {
				get: function () {
					return this.$store.getters["audits/currentRecord"];
				},
				set: function (value) {
					this.$store.commit("audits/setCurrentRecord", value);
				},
			},
		},
		meta () {
			return {
				title: this.pageTitle
			}
		},
		watch: {
			apiUrl: function () {
				this.load();
			},
			$route (to, from){
				//only fetch data when navigated to this page
				if(to.name == this.routeName){
					this.load();
				}
			},
		},
		methods: {
			...mapActions("audits", ["fetchRecords", "deleteRecord"]),
			load: function() {
				if (!this.loading) {
					this.loading = true;
					this.currentRecord = null;
					let url = this.apiUrl;
					let payload = {
						url,
						merge: false
					}
					this.fetchRecords(payload).then(
						(response) => {
							this.loading = false;
							this.ready = true;
							this.totalRecords = response.total_records;
							this.recordCount = response.record_count;
							this.pagination.rowsNumber = this.totalRecords;
							window.scrollTo(0, 0);
						},
						(response) => {
							this.loading = false;
							this.showPageRequestError(response);
						}
					);
				}
			},	
		},
		async mounted() {
		},
		async created() {
		}
	};
</script>
<style scoped>
</style>
