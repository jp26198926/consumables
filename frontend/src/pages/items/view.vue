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
                                        <div class="text-h6 text-primary">Items Details</div>
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
                                                        <q-item-label caption>Barcode: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.barcode }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>Name: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.name }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>Types Type: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.types_type }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>Measurements Name: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.measurements_name }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>Date Created: </q-item-label>
                                                        <q-item-label class="text-bold">
                                                            <q-chip v-if="item.date_created" dense size="13px" :label="item.date_created | relativeDate">
                                                            <q-tooltip
                                                            content-class="bg-accent"
                                                            transition-show="scale"
                                                            transition-hide="scale"
                                                            >
                                                            {{ item.date_created | humanDatetime}}
                                                            </q-tooltip>
                                                            </q-chip>
                                                        </q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>Date Updated: </q-item-label>
                                                        <q-item-label class="text-bold">
                                                            <q-chip v-if="item.date_updated" dense size="13px" :label="item.date_updated | relativeDate">
                                                            <q-tooltip
                                                            content-class="bg-accent"
                                                            transition-show="scale"
                                                            transition-hide="scale"
                                                            >
                                                            {{ item.date_updated | humanDatetime}}
                                                            </q-tooltip>
                                                            </q-chip>
                                                        </q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-card-actions class="row q-col-gutter-xs justify-end">
                                                    <q-btn icon="menu" padding="xs" round flat color="grey">
                                                        <q-menu auto-close transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                            <q-list dense rounded nav>
                                                                <template v-if="$can.view('items/edit')">
                                                                    <q-item link clickable v-ripple :to="`/items/edit/${item.id}`">
                                                                        <q-item-section>
                                                                            <q-icon color="positive"  size="sm" name="edit"></q-icon>
                                                                        </q-item-section>
                                                                        <q-item-section>Edit</q-item-section>
                                                                    </q-item>
                                                                </template>
                                                                <template v-if="$can.view('items/delete')">
                                                                    <q-item link clickable v-ripple @click="deleteItem(item.id)">
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
		name: 'viewItemsPage',
		components: {
		},
		mixins: [PageMixin, ViewPageMixin ],
		props: {
			pageName: {
				type : String,
				default : 'items',
			},
			idName: {
				type: String,
				default: 'id',
			},
			routeName : {
				type : String,
				default : 'itemsview',
			},
			pagePath: {
				type : String,
				default : 'items/view',
			},
			apiPath: {
				type : String,
				default : 'items/view',
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
					return "Items Details"
				}
			},
			currentRecord: {
				get: function () {
					return this.$store.getters["items/currentRecord"];
				},
				set: function (value) {
					this.$store.commit("items/setCurrentRecord", value);
				},
			},
		},
		meta() {
			return {
				title: this.pageTitle
			}
		},
		methods: {
			...mapActions("items", [ "fetchRecord", "deleteRecord"]),
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
