<template>
    <q-page  class="main-page">
        <section class="page-section q-pa-md" >
            <div class="container-fluid">
                <div class="row q-col-gutter-x-md">
                    <div class="col comp-grid" >
                        <div class="" >
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-bold">Home</div>
                                </div>
                            </div>
                        </div>
                        <q-separator class="q-my-sm"></q-separator>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section q-pa-md" >
            <div class="container-fluid">
                <div class="row q-col-gutter-x-md">
                    <div class="col-sm-12 col-md-3 comp-grid" >
                        <record-count api-path="components_data/getcount_received" max="" v-slot="record">
                        <q-btn align="left"  unelevated    :rounded="false"  block no-caps text-color="blue" color="blue-1" :to="`stocks`" padding="md" class="full-width animated zoomIn" >
                            <q-icon class=" q-mr-md" color="blue" style="opacity:1" size="40px" name="file_download"></q-icon>
                            <div class="flex-column text-left">
                                <div class="text-bold">Received</div>
                                <div class="text-caption">This Month</div>
                            </div>
                            <div class="text-h5 absolute-top-right q-ma-md q-mt-lg">
                                <span v-if="!record.loading">{{ record.num }}</span>
                                <q-spinner v-else size="14px" />
                            </div>
                        </q-btn>
                        </record-count>
                    </div>
                    <div class="col-sm-12 col-md-3 comp-grid" >
                        <record-count api-path="components_data/getcount_released" max="" v-slot="record">
                        <q-btn align="left"  unelevated    :rounded="false"  block no-caps text-color="orange" color="orange-1" :to="`stocks`" padding="md" class="full-width animated zoomIn" >
                            <q-icon class=" q-mr-md" color="orange" style="opacity:1" size="40px" name="file_upload"></q-icon>
                            <div class="flex-column text-left">
                                <div class="text-bold">Released</div>
                                <div class="text-caption">This Month</div>
                            </div>
                            <div class="text-h5 absolute-top-right q-ma-md q-mt-lg">
                                <span v-if="!record.loading">{{ record.num }}</span>
                                <q-spinner v-else size="14px" />
                            </div>
                        </q-btn>
                        </record-count>
                    </div>
                    <div class="col-sm-12 col-md-3 comp-grid" >
                        <record-count api-path="components_data/getcount_loweststocks" max="" v-slot="record">
                        <q-btn align="left"  unelevated    :rounded="false"  block no-caps text-color="red" color="red-1" :to="`stocks`" padding="md" class="full-width animated zoomIn" >
                            <q-icon class=" q-mr-md" color="red" style="opacity:1" size="40px" name="filter_1"></q-icon>
                            <div class="flex-column text-left">
                                <div class="text-bold">Lowest Stocks</div>
                                <div class="text-caption">Remaining</div>
                            </div>
                            <div class="text-h5 absolute-top-right q-ma-md q-mt-lg">
                                <span v-if="!record.loading">{{ record.num }}</span>
                                <q-spinner v-else size="14px" />
                            </div>
                        </q-btn>
                        </record-count>
                    </div>
                    <div class="col-sm-12 col-md-3 comp-grid" >
                        <record-count api-path="components_data/getcount_items" max="" v-slot="record">
                        <q-btn align="left"  unelevated    :rounded="false"  block no-caps text-color="green" color="green-1" :to="`items`" padding="md" class="full-width animated zoomIn" >
                            <q-icon class=" q-mr-md" color="green" style="opacity:1" size="40px" name="bookmark_border"></q-icon>
                            <div class="flex-column text-left">
                                <div class="text-bold">Items</div>
                                <div class="text-caption">Total Items</div>
                            </div>
                            <div class="text-h5 absolute-top-right q-ma-md q-mt-lg">
                                <span v-if="!record.loading">{{ record.num }}</span>
                                <q-spinner v-else size="14px" />
                            </div>
                        </q-btn>
                        </record-count>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section q-pa-md" >
            <div class="container-fluid">
                <div class="row q-col-gutter-x-md">
                    <div class="col comp-grid" >
                        <div class="">
                            <api-data-source   api-path="components_data/home_data_repeater"  :query-params="filters" v-slot="req">
                                <div >
                                    <div class="" >
                                        <div class="row  items-center q-col-gutter-sm q-px-sm">
                                            <div class="col-auto">
                                                <q-avatar class="q-mr-sm" font-size="18px" size="32px" color="grey-2" text-color="primary" icon="filter_none" />
                                                </div>
                                                <div class="col">
                                                    <div class="text-bold">Inventory Report</div>
                                                    <div class="text-caption text-grey"> Current Stocks Balance </div>
                                                </div>
                                            </div>
                                        </div>
                                        <q-separator class="q-my-sm"></q-separator>
                                        <div>
                                            <template v-if="!req.loading">
                                                <!-- Template to display each record 
                                                <q-card class="nice-shadow-5 q-mb-sm" v-for="(data, i) in req.response" :key="i">
                                                    <q-card-section>{{ data }}</q-card-section>
                                                </q-card>
                                                -->
                                                <q-markup-table :separator="separator" flat bordered>
                                                <thead>
                                                    <tr>
                                                        <th class="text-left">Barcode</th>
                                                        <th class="text-left">Item Name</th>
                                                        <th class="text-center">Remaining</th>
                                                        <th class="text-center">UOM</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(data, i) in req.response" :key="i">
                                                        <td class="text-left">{{data.barcode}}</td>
                                                        <td class="text-left">{{data.name}}</td>
                                                        <td class="text-center">{{data.remaining}}</td>
                                                        <td class="text-center">{{data.UOM}}</td>
                                                    </tr>
                                                </tbody>
                                                </q-markup-table>
                                                <!-- Optional reload button -->
                                                <div class="q-pa-md text-center">
                                                    <q-btn flat color="accent" @click="req.load" icon="refresh"></q-btn>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <!-- Loading -->
                                                <div class="text-center">
                                                    <q-spinner size="30px" />
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </api-data-source>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="page-section q-pa-md" >
                <div class="container-fluid">
                    <div class="row q-col-gutter-x-md">
                        <div class="col comp-grid" >
                            <div class="">
                                <api-data-source   api-path="components_data/home_data_repeater2"  :query-params="filters" v-slot="req">
                                    <div >
                                        <div class="" >
                                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                                <div class="col-auto">
                                                    <q-avatar class="q-mr-sm" font-size="18px" size="32px" color="grey-2" text-color="primary" icon="filter_none" />
                                                    </div>
                                                    <div class="col">
                                                        <div class="text-bold">Near Expiration</div>
                                                        <div class="text-caption text-grey"> Current Stocks Balance </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <q-separator class="q-my-sm"></q-separator>
                                            <div>
                                                <template v-if="!req.loading">
                                                    <!-- Template to display each record 
                                                    <q-card class="nice-shadow-5 q-mb-sm" v-for="(data, i) in req.response" :key="i">
                                                        <q-card-section>{{ data }}</q-card-section>
                                                    </q-card>
                                                    -->
                                                    <q-markup-table :separator="separator" flat bordered>
                                                    <thead>
                                                        <tr>
                                                            <th class="text-left">Barcode</th>
                                                            <th class="text-left">Item Name</th>
                                                            <th class="text-center">Remaining</th>
                                                            <th class="text-center">UOM</th>
                                                            <th class="text-center">Expiry</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(data, i) in req.response" :key="i">
                                                            <td class="text-left">{{data.barcode}}</td>
                                                            <td class="text-left">{{data.name}}</td>
                                                            <td class="text-center">{{data.remaining}}</td>
                                                            <td class="text-center">{{data.UOM}}</td>
                                                            <td class="text-center">{{data.expiry}}</td>
                                                        </tr>
                                                    </tbody>
                                                    </q-markup-table>
                                                    <!-- Optional reload button -->
                                                    <div class="q-pa-md text-center">
                                                        <q-btn flat color="accent" @click="req.load" icon="refresh"></q-btn>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <!-- Loading -->
                                                    <div class="text-center">
                                                        <q-spinner size="30px" />
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </api-data-source>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="page-section q-pa-md" >
                    <div class="container-fluid">
                        <div class="row q-col-gutter-x-md">
                            <div class="col comp-grid" >
                            </div>
                        </div>
                    </div>
                </section>
            </q-page>
</template>
<script>
	import { PageMixin } from "../../mixins/page.js";
	export default {
		name: '',
		components: {
		},
		mixins: [PageMixin ],
		props: {
		},
		data: function() {
			return {
				ready: false,
			}
		},
		computed: {
		},
		methods: {
		},
		watch: {
		},
		mounted: function(){
			this.ready = true;
		},
		created: function(){
		}
	};
</script>
