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
                                        <div class="text-h6 text-primary">Add New Stocks</div>
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
                    <div class="col-md-9 col-12 comp-grid" >
                        <q-card  :flat="isSubPage" class="q-pa-md nice-shadow-18">
                            <div >
                                <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="startSaveRecord()" @reset="resetForm">
                                    <div class="row q-col-gutter-x-md">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Action 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <api-data-source @loaded="response => mapOptionField(response, 'action_id')"  api-path="components_data/action_id_option_list"  :query-params="filters" v-slot="req">
                                                        <ValidationProvider :rules="{}" name="Action" v-slot="{ errors, invalid, validated }">
                                                            <q-select   :loading="req.loading"  outlined dense  ref="ctrlaction_id" emit-value map-options  v-model="formData.action_id" :options="req.response" label="Action"  :error="invalid && validated" :error-message="errors[0]" >
                                                            </q-select> 
                                                        </ValidationProvider>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Date *
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <ValidationProvider :rules="{required:true}" name="Date" v-slot="{ errors, invalid, validated }">
                                                        <q-input outlined dense  v-model.trim="formData.date" label="Date" :error="invalid && validated" :error-message="errors[0]"    >
                                                        <template v-slot:append>
                                                            <q-icon name="date_range" class="cursor-pointer">
                                                            <q-popup-proxy ref="ctrldate" transition-show="scale" transition-hide="scale">
                                                            <q-date   mask="YYYY-MM-DD" v-model="formData.date" @input="$refs.ctrldate.hide()" />
                                                            </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                        </q-input>      
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Item *
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <api-data-source @loaded="response => mapOptionField(response, 'item_id')"  api-path="components_data/item_id_option_list"  :query-params="filters" v-slot="req">
                                                        <ValidationProvider :rules="{required:true}" name="Item" v-slot="{ errors, invalid, validated }">
                                                            <q-select   :loading="req.loading"  outlined dense  ref="ctrlitem_id" emit-value map-options  v-model="formData.item_id" :options="req.response" label="Item"  :error="invalid && validated" :error-message="errors[0]" >
                                                            <template v-slot:option="scope">
                                                                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                                                                    <q-item-section v-if="scope.opt.image" avatar>
                                                                        <image-viewer :src="scope.opt.image" image-size="small"></image-viewer>
                                                                    </q-item-section>
                                                                    <q-item-section>
                                                                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                                                                        <q-item-label v-if="scope.opt.caption" caption>{{ scope.opt.caption }}</q-item-label>
                                                                    </q-item-section>
                                                                </q-item>
                                                            </template>
                                                            <template v-slot:selected-item="scope">
                                                                <q-item  v-if="scope.opt">
                                                                    <q-item-section v-if="scope.opt.image" avatar>
                                                                        <image-viewer :src="scope.opt.image" image-size="small"></image-viewer>
                                                                    </q-item-section>
                                                                    <q-item-section>
                                                                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                                                                        <q-item-label v-if="scope.opt.caption" caption>{{ scope.opt.caption }}</q-item-label>
                                                                    </q-item-section>
                                                                </q-item>
                                                            </template>
                                                            </q-select> 
                                                        </ValidationProvider>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Qty *
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <ValidationProvider :rules="{required:true}" name="Qty" v-slot="{ errors, invalid, validated }">
                                                        <q-input outlined dense  ref="ctrlqty" v-model.trim="formData.qty"  label="Qty" type="number" placeholder="Enter Qty" hint="[ + ] Add qty to Stocks | [ - ] Subtract qty to Stocks"  step="0.1"    
                                                        class="" :error="invalid && validated" :error-message="errors[0]">
                                                        </q-input>
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Expiry 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <ValidationProvider :rules="{}" name="Expiry" v-slot="{ errors, invalid, validated }">
                                                        <q-input outlined dense  v-model.trim="formData.expiry" label="Expiry" :error="invalid && validated" :error-message="errors[0]"    >
                                                        <template v-slot:append>
                                                            <q-icon name="date_range" class="cursor-pointer">
                                                            <q-popup-proxy ref="ctrlexpiry" transition-show="scale" transition-hide="scale">
                                                            <q-date   mask="YYYY-MM-DD" v-model="formData.expiry" @input="$refs.ctrlexpiry.hide()" />
                                                            </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                        </q-input>      
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Department *
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <api-data-source @loaded="response => mapOptionField(response, 'department_id')"  api-path="components_data/department_id_option_list"  :query-params="filters" v-slot="req">
                                                        <ValidationProvider :rules="{required:true}" name="Department" v-slot="{ errors, invalid, validated }">
                                                            <q-select   :loading="req.loading"  outlined dense  ref="ctrldepartment_id" emit-value map-options  v-model="formData.department_id" :options="req.response" label="Department"  :error="invalid && validated" :error-message="errors[0]" hint="Received From or Release To Department">
                                                            </q-select> 
                                                        </ValidationProvider>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Remarks 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <ValidationProvider :rules="{}" name="Remarks" v-slot="{ errors, invalid, validated }">
                                                        <q-input outlined dense  ref="ctrlremarks" rows="5"  v-model="formData.remarks" placeholder="Enter Remarks"    type="textarea"  :error="invalid && validated" :error-message="errors[0]">
                                                        </q-input>
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="showSubmitButton" class="text-center q-my-md">
                                        <q-btn type="submit"    :rounded="false"  color="primary"  no-caps  unelevated   :disabled="invalid" icon-right="send" :loading="saving">
                                            <q-spinner-oval slot="loading" /> Submit
                                        </q-btn>
                                    </div>
                                </ValidationObserver>
                                <slot :submit="submit" :saving="saving"></slot>
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
	import { AddPageMixin } from "../../mixins/addpage.js";
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: 'addStocksPage',
		components: {
		},
		mixins: [PageMixin, AddPageMixin ],
		props:{
			pageName : {
				type : String,
				default : 'stocks',
			},
			routeName : {
				type : String,
				default : 'stocksadd',
			},
			apiPath : {
				type : String,
				default : 'stocks/add',
			},
		},
		data() {
            return {
				formData: {
					action_id: "", date: "", item_id: "", qty: "", expiry: "", department_id: "", remarks: "", 
				},
				datePicker:false,expiryPicker:false,
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					return "Add New Stocks"
				}
			},
		},
		meta () {
			return {
				title: this.pageTitle
			}
		},
		methods: {
			...mapActions('stocks', ['saveRecord']),
			async startSaveRecord(){
				const isFormValid = await this.$refs.observer.validate();
				if(isFormValid){
					this.saving = true;
					let payload = this.normalizedFormData();
					let url = this.apiUrl;
					let data = { url, payload  }
					this.saveRecord(data).then((response) => {
						this.record = response.data ?? {};
						this.id = this.record['id'] ?? null;
						this.saving = false;
						this.resetForm();
						this.closeDialogs();// close page dialog that if opened
						this.flashMsg(this.msgAfterSave);
						this.$emit("submitted", this.record);
						if(this.redirect) this.navigateTo(`/stocks`);
					},
					 (response) => {
						this.saving = false;
						this.showPageRequestError(response);
					});
				}
			},
			resetForm (){
				this.formData = {action_id: "", date: "", item_id: "", qty: "", expiry: "", department_id: "", remarks: "", };
				requestAnimationFrame(() => {
					this.$refs.observer.reset();
				});
				this.updateFormData();
				this.$EventBus.$emit("resetForm");
			},
		},
		watch: {
		},
		async mounted() {
		},
		async created() {
		},
	};
</script>
<style scoped>
</style>
