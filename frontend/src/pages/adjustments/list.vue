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
                                        <div class="text-h6 text-primary">Adjustments</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-auto col-12 " >
                            <q-btn       :rounded="false"  size=""  color="primary" no-caps  unelevated   :to="`/adjustments/add`" class="full-width" >
                                <q-icon name="add"></q-icon>                                
                                Add New Adjustments 
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
                                        <q-breadcrumbs-el icon="arrow_back" class="text-capitalize" :label="$route.query.tag" to="/adjustments"></q-breadcrumbs-el>
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
                                                :columns="$menus.AdjustmentsTableHeaderItems" 
                                                :data="records"
                                                binary-state-sort
                                                separator="horizontal"
                                                :dense="true"
                                                :selected.sync="selectedItems"
                                                selection="multiple"
                                                row-key="id" 
                                                :pagination.sync="pagination"
                                                hide-bottom
                                                @request="setPagination"
                                                :loading="loading">
                                                <!-- Start of Table Layout -->
                                                <template v-slot:body="props">
                                                    <q-tr :class="{selected: isCurrentRecord(props.row)}" :props="props">
                                                        <q-td auto-width>
                                                            <q-checkbox dense v-model="props.selected"></q-checkbox>
                                                        </q-td>
                                                        <q-td  key="date" :props="props">
                                                            <span class="table-inlined-edit">{{ props.row.date }}</span>
                                                            <inline-edit v-model="props.row.date" save-icon="check_circle" cancel-icon="close" :url="`adjustments/edit/${ props.row.id }`" field-name="date" field-label="Date" title="Enter Date">
                                                            <api-data-source   api-path="components_data/action_type_option_list"  :query-params="filters" v-slot="req">
                                                                <q-input outlined dense  v-model.trim="props.row.date"    >
                                                                <template v-slot:prepend>
                                                                    <q-icon name="date_range" class="cursor-pointer">
                                                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                                    <q-date     mask="YYYY-MM-DD HH:mm" v-model="props.row.date" />
                                                                    </q-popup-proxy>
                                                                    </q-icon>
                                                                </template>
                                                                <template v-slot:append>
                                                                    <q-icon name="access_time" class="cursor-pointer">
                                                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                                    <q-time v-model="props.row.date" mask="YYYY-MM-DD HH:mm" />
                                                                    </q-popup-proxy>
                                                                    </q-icon>
                                                                </template>
                                                                </q-input>
                                                            </api-data-source>
                                                            </inline-edit>
                                                        </q-td>
                                                        <q-td  key="item_id" :props="props">
                                                            <span class="table-inlined-edit">{{ props.row.item_id }}</span>
                                                            <inline-edit v-model="props.row.item_id" save-icon="check_circle" cancel-icon="close" :url="`adjustments/edit/${ props.row.id }`" field-name="item_id" field-label="Item Id" title="Enter Item Id">
                                                            <api-data-source   api-path="components_data/action_type_option_list"  :query-params="filters" v-slot="req">
                                                                <q-input outlined dense  ref="listctrlitem_id" v-model.trim="props.row.item_id"  label=""  placeholder=""      
                                                                class="" >
                                                                </q-input>
                                                            </api-data-source>
                                                            </inline-edit>
                                                        </q-td>
                                                        <q-td  key="old_qty" :props="props">
                                                            <span class="table-inlined-edit">{{ props.row.old_qty }}</span>
                                                            <inline-edit v-model="props.row.old_qty" save-icon="check_circle" cancel-icon="close" :url="`adjustments/edit/${ props.row.id }`" field-name="old_qty" field-label="Old Qty" title="Enter Old Qty">
                                                            <api-data-source   api-path="components_data/action_type_option_list"  :query-params="filters" v-slot="req">
                                                                <q-input outlined dense  ref="listctrlold_qty" v-model.trim="props.row.old_qty"  label=""  placeholder=""      
                                                                class="" >
                                                                </q-input>
                                                            </api-data-source>
                                                            </inline-edit>
                                                        </q-td>
                                                        <q-td  key="new_qty" :props="props">
                                                            <span class="table-inlined-edit">{{ props.row.new_qty }}</span>
                                                            <inline-edit v-model="props.row.new_qty" save-icon="check_circle" cancel-icon="close" :url="`adjustments/edit/${ props.row.id }`" field-name="new_qty" field-label="New Qty" title="Enter New Qty">
                                                            <api-data-source   api-path="components_data/action_type_option_list"  :query-params="filters" v-slot="req">
                                                                <q-input outlined dense  ref="listctrlnew_qty" v-model.trim="props.row.new_qty"  label=""  placeholder=""      
                                                                class="" >
                                                                </q-input>
                                                            </api-data-source>
                                                            </inline-edit>
                                                        </q-td>
                                                        <q-td key="btnactions" :props="props">
                                                            <div class="row q-col-gutter-xs justify-end">
                                                                <q-btn icon="menu" padding="xs" round flat color="grey">
                                                                    <q-menu auto-close transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                                        <q-list dense rounded nav>
                                                                            <q-item link clickable v-ripple :to="`/adjustments/view/${props.row.id}`">
                                                                                <q-item-section>
                                                                                    <q-icon color="primary"  size="sm" name="visibility"></q-icon>
                                                                                </q-item-section>
                                                                                <q-item-section>View</q-item-section>
                                                                            </q-item>
                                                                            <q-item link clickable v-ripple :to="`/adjustments/edit/${props.row.id}`">
                                                                                <q-item-section>
                                                                                    <q-icon color="positive"  size="sm" name="edit"></q-icon>
                                                                                </q-item-section>
                                                                                <q-item-section>Edit</q-item-section>
                                                                            </q-item>
                                                                            <q-item link clickable v-ripple @click="deleteItem(props.row.id)">
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
                                                                <div>
                                                                    <q-btn    :rounded="false"  no-caps  unelevated   color="negative" padding="xs" @click="deleteItem(selectedItems)" v-if="selectedItems.length" icon="delete_sweep" class="q-my-xs" title="Delete Selected"></q-btn>
                                                                </div>
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
		name: 'listAdjustmentsPage',
		components: {
        },
		mixins: [PageMixin, ListPageMixin ],
		props: {
			primaryKey : {
				type : String,
				default : 'id',
			},
			pageName : {
				type : String,
				default : 'adjustments',
			},
			routeName : {
				type : String,
				default : 'adjustmentslist',
			},
			apiPath : {
				type : String,
				default : 'adjustments/index',
			},
			multiCheckbox: {
				type: Boolean,
				default: true,
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
					return "Adjustments"
				}
			},
			records: {
				get: function () {
					return this.$store.getters["adjustments/records"];
				},
				set: function (value) {
					this.$store.commit("adjustments/setRecords", value);
				},
			},
			currentRecord: {
				get: function () {
					return this.$store.getters["adjustments/currentRecord"];
				},
				set: function (value) {
					this.$store.commit("adjustments/setCurrentRecord", value);
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
			...mapActions("adjustments", ["fetchRecords", "deleteRecord"]),
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
