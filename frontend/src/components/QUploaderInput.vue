<template>
	<q-uploader ref="uploader" 
	:flat="flat"
	:max-files="fileLimit"
	:max-file-size="maxFileSizeInKB"
	:bordered="bordered" 
	:accept="accept" 
	:factory="factoryFn" 
	:label="getLabel" 
	auto-upload hide-upload-btn  
	:multiple="multiple"
    :filter="checkFileLimit"
	@uploaded="uploadComplete" 
	@removed="removeFile"
	@rejected="onRejected"
	>
    <template v-slot:list="scope">
        <q-list separator>
          <q-item v-for="file in scope.files" :key="file.__key">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label caption>
                Status: {{ file.__status }}
              </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }} / {{ file.__progressLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                color="red"
                flat
                dense
                round
                :icon="deleteIcon"
                @click="scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-uploader>
</template>
<script>
import { StorageService } from '../services/storage'
export default {
    props: {
        accept: {
            type:String,
            default:'.png,.gif,.jpg,.jpg'
        },
        extensions: {
            type:String, 
            default:''
        },
        maxFiles: {
            type:Number, 
            default: 5
        },
        maxFileSize: {
            type:Number, 
            default: 10
        },
        multiple:{
            type: Boolean, 
            default: true
        },
        flat:{
            type: Boolean, 
            default: true
        },
        bordered:{
            type: Boolean, 
            default: true
        },
        uploadPath: {
            type:String, 
            default:'fileuploader/upload/photo'
        },
        fieldName: {
            type:String, 
            default:'photo'
        },
        fileName:{
            type:String, 
            default:'file'
        },
        label:{
            type:String, 
            default:'Choose files or Drop files here'
        },
        deleteIcon:{
            type:String, 
            default:'deleteIcon'
        },
        value: null
    },
    data: function() {
        return {
            files: [],
            uploadedFilePaths:[],
        }
    },
    methods: {
        factoryFn (file) {
             return new Promise((resolve, reject) => {
                // Retrieve JWT token from the localstore.
                const token = StorageService.getToken();
                //additional fields that is submited with file upload
                //let formFields = [{name: 'fieldname', value: 'fieldvalue'}];
				let uploadUrl = this.$utils.setApiPath(this.uploadPath)
                resolve({
                    fieldName: this.fileName,
                    url: uploadUrl,
                    method: 'POST',
                    //formFields: formFields,
                    headers: [
                        {name: 'Authorization', value: `Bearer ${token}`}
                    ]
                })
            })
        },
        uploadComplete: function(file) {
            let responseText = file.xhr.responseText;
            try{
                let response = JSON.parse(responseText);
                if(Array.isArray(response)){
                    this.uploadedFilePaths.push(...response);
                }
                else{
                    this.uploadedFilePaths.push(response);
                }
            }
            catch(e){
                console.error(e);
            }
            this.$emit('uploadComplete', responseText);
        },
        removeFile: function(files) {
            files.forEach(file => {
				let fileUrl = JSON.parse(file.xhr.response);
				if(Array.isArray(fileUrl)){
					this.uploadedFilePaths = this.uploadedFilePaths.filter(item => !fileUrl.includes(item))
				}
				else{
					let index =  this.uploadedFilePaths.indexOf(fileUrl);
                    if(index !== -1){
                        this.uploadedFilePaths.splice(index, 1);
                    }
				}

                let url = "fileuploader/remove_temp_file";
                let formData = {
                    temp_file: fileUrl.toString()
                }
                this.$api.post(url, formData).then( (response) => {
                        
                },
                (response) => {
                    this.loading = false;
                });
            });
		},
		onRejected: function(rejectedEntries) {
			let failedProp = rejectedEntries[0].failedPropValidation
			if(failedProp == "max-file-size"){
				this.$q.notify({
					type: 'negative',
					message: `Max file size of ${this.maxFileSize}MB is allowed`
				});
			}
			else if(failedProp == "max-files" || failedProp == "filter"){
				this.$q.notify({
					type: 'negative',
					message: `Max of ${this.maxFiles} files is allowed`
				});
			}
		},
    },
    computed: {
        maxFileSizeInKB:function () {
            return this.maxFileSize * 1024 * 1024;
        },
        fileLimit:function () {
            let numUpload = this.uploadedFilePaths.length;
            let limit = this.maxFiles;
            return (limit - numUpload) || 0;
        },
        getLabel(){
            if(this.fileLimit){
                return this.label;
            }
            else{
                return "..."; //cannot upload more files
            }
        }
    },
    watch: {
        uploadedFilePaths: function(){
            this.$emit('input', this.uploadedFilePaths.toString());
        },
        value: function(){
            if(this.value){
                this.uploadedFilePaths = this.$utils.toArray(this.value);
            }
            else{
                this.uploadedFilePaths = []
            }
        },
    },
    mounted:function(){
        if(this.value){
            this.uploadedFilePaths = this.$utils.toArray(this.value);
        }
        else{
            this.uploadedFilePaths = []
        }
    },
    created: function(){
       	this.$EventBus.$on('resetForm', ()=> {
			if(this.$refs.uploader){
                this.$refs.uploader.reset()
            }
		});
    },
};
</script>
