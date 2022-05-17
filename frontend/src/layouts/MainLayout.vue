<template>
    <q-layout view="hHh LpR lfr">
        <!-- App header -->
        <q-header elevated >
            <q-toolbar class="  glossy">
                <q-btn flat @click="toggleLeftDrawer" round dense icon="menu"></q-btn>
                <!-- App logo and name -->
                <q-btn no-caps flat stretch to="/home" class="q-mr-lg">
                    <q-avatar size="36">
                        <img src="images/logo.png" alt="logo" class="my-5" />
                    </q-avatar>
                    <q-toolbar-title>{{ $appName }}</q-toolbar-title>
                </q-btn>
                <q-separator inset dark vertical></q-separator>
                <!-- Top menu left -->
                <template v-for="(menu, index) in navbarTopLeftItems">
                    <q-btn no-caps :icon="menu.icon" stretch flat :label="menu.label" :to="menu.path" v-if="!menu.submenu.length" :key="`topleftmenubtn-${index}`"></q-btn>
                    <q-btn-dropdown  no-caps :icon="menu.icon" stretch flat :label="menu.label" v-else  :key="`topleftmenudrop-${index}`" >
                        <q-list dense>
                            <q-item v-for="(submenu, subindex) in menu.submenu" :key="`topleftsubmenu-${subindex}`" clickable v-ripple :to="submenu.path">
                                <q-item-section avatar v-if="submenu.icon">
                                    <q-avatar :icon="submenu.icon"></q-avatar>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{ submenu.label }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </template>
                <q-space></q-space>
                <!-- Top menu right -->
                <template v-for="(menu, index) in navbarTopRightItems">
                    <q-btn  no-caps :icon="menu.icon" stretch flat :label="menu.label" :to="menu.path" v-if="!menu.submenu.length" :key="`toprightmenu-${index}`"></q-btn>
                    <q-btn-dropdown no-caps :icon="menu.icon" stretch flat :label="menu.label" v-else  :key="`toprightmenudrop-${index}`" >
                        <q-list dense>
                            <q-item v-for="(submenu, subindex) in menu.submenu" :key="`toprightsubmenu-${subindex}`" clickable v-ripple :to="submenu.path">
                                <q-item-section avatar v-if="submenu.icon">
                                    <q-avatar :icon="submenu.icon"></q-avatar>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{ submenu.label }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </template>
            </q-toolbar>
        </q-header>
        <!-- App left drawer -->
        <q-drawer v-model="leftDrawer" show-if-above  :width="250" :breakpoint="500"    :mini="leftDrawerMini">
            <q-scroll-area class="fit   ">
                <q-separator></q-separator>
                <q-list >
                    <template v-for="(menu, index) in navbarSideLeftItems">
                        <q-item clickable q-ripple :to="menu.path" v-if="!menu.submenu.length" :key="`sideleftmenu-${index}`">
                            <q-item-section avatar v-if="menu.icon">
                                <q-icon :color="menu.iconcolor || 'primary'" :name="menu.icon"></q-icon>
                                <q-tooltip v-if="leftDrawerMini" transition-show="scale" transition-hide="scale" content-class="bg-accent" anchor="center right" self="center left" :offset="[10, 10]">
                                {{ menu.label }}
                                </q-tooltip>
                            </q-item-section>
                            <q-item-section>
                                {{ menu.label }}
                            </q-item-section>
                        </q-item>
                        <q-expansion-item  expand-separator :content-inset-level="0.5" group="leftmenu" v-else :key="`sideleftmenudrop-${index}`">
                            <template v-slot:header>
                                <q-item-section avatar v-if="menu.icon">
                                    <q-icon :color="menu.iconcolor || 'primary'" :name="menu.icon"></q-icon>
                                    <q-tooltip v-if="leftDrawerMini" transition-show="scale" transition-hide="scale" content-class="bg-accent" anchor="center right" self="center left" :offset="[10, 10]">
                                    {{ menu.label }}
                                    </q-tooltip>
                                </q-item-section>
                                <q-item-section>
                                    {{ menu.label }}
                                </q-item-section>
                            </template>
                            <q-list dense>  
                                <q-item :to="submenu.path" clickable q-ripple v-for="(submenu, subindex) in menu.submenu" :key="`sideleftsubmenubtn-${subindex}`">
                                    <q-item-section avatar v-if="submenu.icon">
                                        <q-icon :color="submenu.iconcolor || 'primary'" :name="submenu.icon"></q-icon>
                                    </q-item-section>
                                    <q-item-section>
                                        {{ submenu.label }}
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-expansion-item>
                    </template>
                </q-list>
            </q-scroll-area>
        </q-drawer>
        <!-- App right drawer -->
        <q-drawer :no-swipe-open="!componentFile" side="right" v-model="rightDrawer" :width="rightDrawerWidth" :breakpoint="500" overlay  elevated>
            <component v-if="rightDrawer" is-sub-page :is="componentFile" :api-path="pageUrl" :model-bind="modelBind" :page-data="pageData"></component>
            <q-btn style="position:absolute;top:2px;right:2px" unelevated dense round color="red-1" text-color="negative" icon="close" v-show="rightDrawer" @click="rightDrawer = !rightDrawer"></q-btn>
        </q-drawer>
        <!-- App layout container -->
        <q-page-container>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </q-page-container>
        <!-- Page display dialog -->
        <q-dialog :seamless="dialogProps.seamless" :maximized="dialogProps.maximized" :persistent="dialogProps.persistent" :position="dialogProps.position" v-model="pageDialog">
            <q-card :style="{width: dialogProps.width, maxWidth: dialogProps.maxWidth}">
                <component v-if="pageDialog" is-sub-page :is="componentFile" :api-path="pageUrl" :model-bind="modelBind" :page-data="pageData"></component>
                <q-btn style="position:absolute;top:2px;right:2px" v-if="dialogProps.closeBtn" icon="close" flat round dense v-close-popup />
                </q-card>
            </q-dialog>
            <!-- image preview dialog-->
            <q-dialog v-model="imageViewerDialog">
                <q-carousel
                transition-prev="scale"
                transition-next="scale"
                swipeable
                animated
                control-type="unelevated"
                control-color="primary"
                v-model="imageViewerCurrentSlide"
                :navigation="false"
                :arrows="imageViewerImages.length > 1"
                infinite
                :padding="false"
                height="auto"
                class="bg-dark rounded-borders"
                >
                <q-carousel-slide class="no-padding" v-for="(img, index) in imageViewerImages" :key="index" :name="index">
                <img style="max-width:100%;max-height:100%;" :src="img" />
                </q-carousel-slide>
                </q-carousel>
            </q-dialog>
            <!-- request error dialog -->
            <q-dialog v-model="errorDialog" position="top">
                <q-card style="min-width: 200px; max-width: 95vw;">
                    <q-card-section class="row items-center">
                        <q-avatar text-color="negative" size="40px" font-size="36px" icon="error"></q-avatar>
                        <div class="q-ml-sm text-negative"> 
                            <div class="text-weight-bold">Unable to complete request.</div>
                            <div class="text-grey" v-for="(msg, index) in pageErrors" :key="index">
                                {{msg}}
                            </div>
                        </div>
                        <q-space />
                        <q-btn icon="close" flat round dense v-close-popup />
                        </q-card-section>
                    </q-card>
                </q-dialog>
            </q-layout>
</template>
<script>
	import { mapMutations, mapState, mapActions } from "vuex";
	export default {
		name: 'MainLayout',
		components: {
		},
		data: () => ({
		}),
		computed: {
			...mapState("pageComponents", ["pageComponent", "pageUrl", "pageData", "modelBind", "imageViewerImages", "dialogProps"]),
			leftDrawer: {
				get: function () {
					return this.$store.state.pageComponents.leftDrawer;
				},
				set: function (value) {
					this.$store.commit("pageComponents/setLeftDrawer", value);
				},
			},
			leftDrawerMini: {
				get: function () {
					return this.$store.state.pageComponents.leftDrawerMini;
				},
				set: function (value) {
					this.$store.commit("pageComponents/setLeftDrawerMini", value);
				},
			},
			pageDialog: {
				get: function () {
					return  this.$store.state.pageComponents.pageDialog
				},
				set: function (value) {
					this.$store.commit("pageComponents/setPageDialog", value);
				},
			},
			errorDialog: {
				get: function () {
					return this.pageErrors.length > 0;
				},
				set: function (newValue) {
					this.pageErrors = [];
				}
			},
			imageViewerCurrentSlide: {
				get: function () {
					return  this.$store.state.pageComponents.imageViewerCurrentSlide
				},
				set: function (value) {
					this.$store.commit("pageComponents/setImageViewerCurrentSlide", value);
				},
			},
			imageViewerDialog: {
				get: function () {
					return  this.$store.state.pageComponents.imageViewerDialog
				},
				set: function (value) {
					this.$store.commit("pageComponents/setImageViewerDialog", value);
				},
			},
			rightDrawer: {
				get: function () {
					return this.$store.state.pageComponents.rightDrawer;
				},
				set: function (value) {
					this.$store.commit("pageComponents/setRightDrawer", value);
				},
			},
			rightDrawerWidth: function(){
				if(this.$q.platform.is.desktop){
					return this.$store.state.pageComponents.rightDrawerWidth
				}
				return 320;
			},
			pageErrors: {
				get: function () {
					return this.$store.state.pageComponents.pageErrors;
				},
				set: function (value) {
					this.$store.commit("pageComponents/setPageErrors", value);
				},
			},
			componentFile() {
				if(this.pageComponent){
					return () => import(`pages/${this.pageComponent}.vue`);
				}
				return null;
			},
			navbarSideLeftItems(){
				return this.$menus.navbarSideLeftItems;
			},
			navbarTopLeftItems(){
				return this.$menus.navbarTopLeftItems;
			},
			navbarTopRightItems(){
				return this.$menus.navbarTopRightItems;
			},
		},
		created: function() {
			let showLeftDrawer = this.$q.platform.is.desktop;
			this.$store.commit("pageComponents/setLeftDrawer", showLeftDrawer);
			// Add a request interceptor
			this.$api.axios().interceptors.request.use(
				(config) => {
					this.$store.commit("pageComponents/setPageErrors", []);
					return config;
				},
				(error) => {
				// Do something with request error
				return Promise.reject(error);
			});

			this.$api.axios().interceptors.response.use(
				(response) => {
					return response
				},
				(error) => {
					if (error.request.status == 401) {
						if(this.$route.name != 'index'){
							this.logout();
							this.$router.go("/");
							return;
						}
					}
					else if (error.request.status == 403) {
						this.$router.push("/error/forbidden");
						return;
					}
					// reject error. Error will be handle by calling page.
					throw error
				}
			);
		},
		watch: {
			$route (to, from){
				this.$store.commit("pageComponents/setPageErrors", []);

				//close right drawer
				this.rightDrawer = false;
				this.$store.commit("pageComponents/setPageComponent", null);
			}
		},
		methods: {
			...mapActions('auth', ['logout']),
			toggleLeftDrawer() {
				if(this.leftDrawer && this.leftDrawerMini){
					this.leftDrawer = false;
				}
				else if(this.leftDrawer && !this.leftDrawerMini){
					this.leftDrawerMini = true;
				}
				else{
					this.leftDrawer = true;
					this.leftDrawerMini = false;
				}
			},

			startLogout (){
				this.logout();
				this.$router.go("/"); //force reload of the page
			}
		},
	}
</script>

<style>
</style>
<style lang="scss">
	body.body--light {
		background: #fafafa
	}
	.q-item.q-router-link--active, .q-item--active {
		background-color: $grey-1
	}
	.q-item.q-router-link--active .q-icon, .q-item--active .q-icon {
	}

</style>