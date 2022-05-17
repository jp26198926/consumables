<template>
    <q-page class="main-page">
        <section class="page-section q-mb-md" >
            <div class="container-fluid">
                <div class="row justify-center q-col-gutter-md">
                    <div class="col-12 col-sm-6 col-md-3 comp-grid" >
                        <q-card  :flat="isSubPage" class="q-mt-lg text-center bg-grey-2 q-pa-md nice-shadow-6">
                            <div>
                                <div class="text-h5 text-bold text-primary q-pb-md">User Login</div>
                                <q-avatar><q-img src="images/logo.png" /></q-avatar>
                            </div>
                        </q-card>
                        <q-card  :flat="isSubPage" class="nice-shadow-6">
                            <div >
                                <q-card-section class="q-px-lg">
                                    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="startLogin()" @reset="resetForm">
                                        <q-input class="q-mb-md" label="Username Or Email" outlined dense placeholder="Username Or Email" v-model.trim="formData.username"  required="required" type="text" >
                                        <template v-slot:prepend>
                                            <q-icon name="account_circle"></q-icon>
                                        </template>
                                        </q-input>
                                        <q-input label="Password"  class="q-mb-md" outlined dense placeholder="Password" required="required" v-model="formData.password" type="password">
                                        <template v-slot:prepend>
                                            <q-icon name="lock"></q-icon>
                                        </template>
                                        </q-input>
                                        <div class="row q-mb-md">
                                            <div class="col-6">
                                                <q-checkbox v-model="rememberUser"> Remember Me</q-checkbox>
                                            </div>
                                            <div class="col-6">
                                                <q-btn to="/index/forgotpassword" class="text-danger" flat no-caps color="negative"> Reset Password?</q-btn>
                                            </div>
                                        </div>
                                        <transition appear enter-active-class="animated bounceIn" leave-active-class="animated fadeOut">
                                            <q-banner dense  inline-actions rounded  class="bg-red-2 q-my-md" v-if="errorMsg">
                                                <template v-slot:avatar>
                                                    <q-icon color="red" name="error"></q-icon>
                                                </template>
                                                {{ errorMsg.toString() }}
                                                <template v-slot:action>
                                                    <q-btn @click="errorMsg = ''" dense flat icon="close" />
                                                    </template>
                                                </q-banner>
                                            </transition>
                                            <div class="text-center">
                                                <q-btn unelevated :loading="loading" color="primary" no-caps :disabled="invalid" icon="lock_open" class="full-width"  type="submit"> 
                                                    Login 
                                                </q-btn>
                                            </div>
                                        </ValidationObserver>
                                    </q-card-section>
                                </div>
                            </q-card>
                            <q-card  :flat="isSubPage" class="q-pa-md  nice-shadow-6">
                                <div class="row">
                                    <div class="col text-body1">
                                        Don't Have an Account?
                                    </div>
                                    <div class="col-auto text-right">
                                        <q-btn unelevated icon="account_box" no-caps color="positive" class="full-width" to="/index/register">Register
                                        </q-btn>
                                    </div>
                                </div>
                            </q-card>
                        </div>
                    </div>
                </div>
            </section>
        </q-page>
</template>
<script>
	import { mapActions } from "vuex";
	import { PageMixin } from "../../mixins/page.js";
	export default {
		name: 'IndexComponent',
		components: {
		},
		mixins: [ PageMixin ],
		data: function() {
			return {
				formData: {
					username: '',
					password:'',
				},
				rememberUser: false,
				loading: false,
				ready: false,
				errorMsg : '',
			}
		},
		computed: {
		},
		methods: {
			...mapActions('auth', ['login']),
			startLogin (){
				this.loading = true;
				this.errorMsg = '';
				let formData = this.formData;
				let rememberUser = this.rememberUser;
				let url = "/auth/login";
				let payload = {
					formData,
					rememberUser,
					url
				};
				this.login(payload).then((response) => {
					this.loading = false;
					let loginData = response.data;
					if (loginData.token) {
						let nextUrl = this.$route.query.nexturl || '/home'
						this.$router.replace(nextUrl);
						location.reload();
					}
					else{
						this.$router.push(loginData.nextpage);
					}
				},
					(request) => {
					this.loading = false;
					this.errorMsg = request.response?.data || "Unable to establish connection...";
				});
			},
			resetForm (){
				this.formData = {
					username: '',
					password:''
				};
				requestAnimationFrame(() => {
					this.$refs.observer.reset();
				});
			},
		},
		async mounted() {
			this.ready = true;
		},
		async created() {
		},
	};
</script>
<style></style>
