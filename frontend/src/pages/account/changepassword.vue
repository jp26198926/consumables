
	
<template>
	<div class="container">
		<div class="row justify-center">
			<div class="col-md-7 col-12">
				<div class="text-h5 text-bold q-my-md">Change Password</div>
				<ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="startSaveRecord()">
					<ValidationProvider :rules="{required:true}" name="Current Password" v-slot="{ errors, invalid, validated }">
						<q-input 
							outlined dense 
							label="Current Password" 
							placeholder="Current Password" 
							v-model="formData.oldpassword" 
							type="password" 
							:error="invalid && validated" 
							:error-message="errors[0]" />
					</ValidationProvider>
					<ValidationProvider :rules="{required:true}" name="New Password" v-slot="{ errors, invalid, validated }">
						<q-input 
							outlined dense 
							label="New Password" 
							placeholder="New Password" 
							v-model="formData.newpassword"
							type="password" 
							:error="invalid && validated" 
							:error-message="errors[0]" />
					</ValidationProvider>
					<ValidationProvider :rules="{required:true, is: formData.newpassword}" name="Confirm new password" v-slot="{ errors, invalid, validated }">
						<q-input 
							outlined dense 
							label="Confirm new password" 
							placeholder="Confirm new password"
							v-model="formData.confirmpassword" 
							type="password" 
							:error="invalid && validated" 
							:error-message="errors[0]" />
					</ValidationProvider>
					<div class="q-mt-md text-center">
						<q-btn :disabled="invalid" unelevated type="submit" icon="send" color="primary" large :loading="saving">
							<q-spinner-oval slot="loading" /> Change Password
						</q-btn>
					</div>
				</ValidationObserver>
			</div>
		</div>
	</div>
</template>
<script>
import { PageMixin } from "../../mixins/page.js";
export default {
	props:{
		apiUrl: {
			type: String,
			default: 'account/changepassword'
		},
	},
	mixins: [PageMixin],
	data() {
		return {
			saving: false,
			formData: {
				oldpassword: '', 
				newpassword: '', 
				confirmpassword: '', 
			},
		}
	},
	methods: {
		async startSaveRecord(){
			const isFormValid = await this.$refs.observer.validate();
			if(isFormValid){
				this.saving = true;
				let payload = this.formData;
				let url = this.apiUrl;
				this.$api.post(url, payload).then((response) => {
					this.saving = false;
					this.resetForm();
					this.flashMsg("Password change completed");
				},(response) => {
					this.saving = false;
					this.showPageRequestError(response);
				});
			}
		},
		resetForm (){
			this.formData = {oldpassword: "", newpassword: "", confirmpassword: "", };
			requestAnimationFrame(() => {
				this.$refs.observer.reset();
			});
		},
	},
}
</script>
