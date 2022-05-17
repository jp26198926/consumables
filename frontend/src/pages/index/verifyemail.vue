<template>
    <div class="container">
        <div class="row justify-center">
            <div class="col-md-6 col-12">
                <q-card  flat bordered class="q-my-lg text-center">
                    <q-card-section>
                        <div class="text-h5 text-bold text-positive"> 
							<q-icon size="lg" name="check_circle"></q-icon> 
							{{sentMsg}}
						</div>
						<div class="text-caption">
							Please verify your email address by following the link in your mailbox
						</div>
                       	<q-separator class="q-my-md" />
						   <div class="text-center">
                    	<q-btn @click="resend()" flat color="primary" no-caps :loading="loading">
							<q-icon name="email"></q-icon> Resend Email
							<q-spinner-oval slot="loading" />
						</q-btn>
						   </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
</template>
<script>
	import { PageMixin } from "../../mixins/page.js";
	export default {
		props: {},
		mixins: [PageMixin],
		data: function () {
			return {
				loading: false,
				sentMsg: "Email verification link sent to your mailbox"
			};
		},
		methods: {
			resend(){
				let url = "auth/resendverifyemail";
				this.loading = true;
				let formData = {
					token:  this.$route.query.token
				}
				this.$api.post(url, formData).then((response) => {
					this.loading = false;
					this.sentMsg = response.data;
				},
				(response) => {
					this.loading = false;
					this.showPageRequestError(response);
				});
			}
		},
	};
</script>
