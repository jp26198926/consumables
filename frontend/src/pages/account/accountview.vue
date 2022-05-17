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
                                        <div class="text-h6 text-primary">My Account</div>
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
                        <div class="">
                            <div >
                                <div class="relative-position" style="min-height:100px">
                                    <div class="row q-col-gutter-x-md">
                                        <div class="col">
                                            <template v-if="!loading && item">
                                                <div v-if="!loading">
                                                    <q-card class="q-pa-lg q-mb-md nice-shadow-18">
                                                        <div class="row q-col-gutter-lg">
                                                            <div class="col-auto">
                                                                <image-viewer :ratio="1/1" image-size="medium" :src="$UserPhoto"></image-viewer>
                                                            </div>
                                                            <div class="col">
                                                                <div class="text-h4 text-primary"> {{ $UserName }} </div>
                                                                <div class="text-caption"> {{ $UserEmail }} </div>
                                                            </div>
                                                        </div>
                                                    </q-card>
                                                    <div class="row q-col-gutter-md">
                                                        <div class="col-md-2 col-sm-3 col-12">
                                                            <q-card   :flat="isSubPage" class="nice-shadow-18">
                                                                <q-tabs vertical class="text-primary" dense v-model="tab" no-caps inline-label>
                                                                    <q-tab name="accountview" icon="account_box" label="Account Detail" style="justify-content:initial" />
                                                                    <q-tab name="accountedit" icon="edit" label="Edit Account" style="justify-content:initial" />
                                                                    <q-tab name="changepassword" icon="lock" label="Change Password" style="justify-content:initial" />
                                                                </q-tabs>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-md-10 col-sm-9 col-12">
                                                            <q-card   :flat="isSubPage" class="nice-shadow-18 q-pa-sm">
                                                                <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
                                                                    <q-tab-panel name="accountview">
                                                                        <div v-if="!loading && ready">
                                                                            <q-item>
                                                                                <q-item-section>
                                                                                    <q-item-label caption>Id: </q-item-label>
                                                                                    <q-item-label class="text-bold">{{ item.id }}</q-item-label>
                                                                                </q-item-section>
                                                                            </q-item>
                                                                            <q-separator></q-separator>
                                                                            <q-item>
                                                                                <q-item-section>
                                                                                    <q-item-label caption>Username: </q-item-label>
                                                                                    <q-item-label class="text-bold">{{ item.username }}</q-item-label>
                                                                                </q-item-section>
                                                                            </q-item>
                                                                            <q-separator></q-separator>
                                                                            <q-item>
                                                                                <q-item-section>
                                                                                    <q-item-label caption>Email: </q-item-label>
                                                                                    <q-item-label class="text-bold">{{ item.email }}</q-item-label>
                                                                                </q-item-section>
                                                                            </q-item>
                                                                            <q-separator></q-separator>
                                                                            <q-item>
                                                                                <q-item-section>
                                                                                    <q-item-label caption>Telelphone: </q-item-label>
                                                                                    <q-item-label class="text-bold">{{ item.telelphone }}</q-item-label>
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
                                                                        </div>
                                                                        <div v-if="loading" class="q-pa-sm text-center">
                                                                            <q-spinner :size="40" color="accent" indeterminate></q-spinner>
                                                                            Loading...
                                                                        </div>
                                                                    </q-tab-panel>
                                                                    <q-tab-panel name="accountedit">
                                                                        <div class="reset-grid">
                                                                            <account-edit-page></account-edit-page>
                                                                            </div>
                                                                        </q-tab-panel>
                                                                        <q-tab-panel name="changepassword">
                                                                            <change-password-page></change-password-page>
                                                                        </q-tab-panel>
                                                                    </q-tab-panels>
                                                                </q-card>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div  class="q-pa-lg text-center">
                                                        <q-spinner :size="50" color="accent" indeterminate></q-spinner>
                                                        Loading...
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
	import { ViewPageMixin } from "../../mixins/viewpage.js";
	import  AccountEditPage  from "./accountedit.vue";
	import  ChangePasswordPage  from "./changepassword.vue";
	export default {
		name: 'accountviewUsersPage',
		components: {
			AccountEditPage,
			ChangePasswordPage,
		},
		mixins: [PageMixin, ViewPageMixin ],
		props: {
			pageName: {
				type : String,
				default : 'users',
			},
			routeName : {
				type : String,
				default : 'usersaccountview',
			},
			pagePath: {
				type : String,
				default : 'account',
			},
			apiPath: {
				type : String,
				default : 'account',
			},
		},
		data() {
            return {
				item: {
					default :{
					},
				},
				tab: 'accountview',
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					return "My Account"
				}
			},
			currentRecord: {
				get: function () {
					return this.$store.getters["users/currentRecord"];
				},
				set: function (value) {
					this.$store.commit("users/setCurrentRecord", value);
				},
			},
		},
		meta () {
			return {
				title: this.pageTitle,
			}
		},
		methods: {
		},
		watch: {
			$route (to, from){
				//only fetch data when navigated to this page
				if(to.name == this.routeName){
					this.load();
				}
			},
		},
		mounted() {
		},
	};
</script>
<style scoped>
</style>
