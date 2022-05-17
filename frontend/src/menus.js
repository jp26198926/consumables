
export const AppMenus = {
    
	navbarTopRightItems: [],
	navbarTopLeftItems: [],
	navbarSideLeftItems: [
  {
    "path": "/home",
    "label": "Home",
    "icon": "extension",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/adjustments",
    "label": "Adjustments",
    "icon": "extension",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/items",
    "label": "Items",
    "icon": "extension",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/measurements",
    "label": "Measurements",
    "icon": "extension",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/stocks",
    "label": "Stocks",
    "icon": "extension",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/types",
    "label": "Types",
    "icon": "extension",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/action_types",
    "label": "Action Types",
    "icon": "extension",
    "iconcolor": "",
    "target": "",
    "submenu": []
  }
],
	Action_TypesTableHeaderItems: [
  {
    "label": "Id",
    "align": "left",
    "sortable": false,
    "name": "id",
    "field": "id"
  },
  {
    "label": "Action Type",
    "align": "left",
    "sortable": false,
    "name": "action_type",
    "field": "action_type"
  },
  {
    "label": "Action",
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],
	AdjustmentsTableHeaderItems: [
  {
    "label": "Id",
    "align": "left",
    "sortable": false,
    "name": "id",
    "field": "id"
  },
  {
    "label": "Date",
    "align": "left",
    "sortable": false,
    "name": "date",
    "field": "date"
  },
  {
    "label": "Item Id",
    "align": "left",
    "sortable": false,
    "name": "item_id",
    "field": "item_id"
  },
  {
    "label": "Old Qty",
    "align": "left",
    "sortable": false,
    "name": "old_qty",
    "field": "old_qty"
  },
  {
    "label": "New Qty",
    "align": "left",
    "sortable": false,
    "name": "new_qty",
    "field": "new_qty"
  },
  {
    "label": "Action",
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],
	ItemsTableHeaderItems: [
  {
    "label": "Barcode",
    "align": "left",
    "sortable": false,
    "name": "barcode",
    "field": "barcode"
  },
  {
    "label": "Name",
    "align": "left",
    "sortable": false,
    "name": "name",
    "field": "name"
  },
  {
    "label": "Type",
    "align": "left",
    "sortable": false,
    "name": "types_type",
    "field": "types_type"
  },
  {
    "label": "Measurement",
    "align": "left",
    "sortable": false,
    "name": "measurements_name",
    "field": "measurements_name"
  },
  {
    "label": "Action",
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],
	MeasurementsTableHeaderItems: [
  {
    "label": "Id",
    "align": "left",
    "sortable": false,
    "name": "id",
    "field": "id"
  },
  {
    "label": "Code",
    "align": "left",
    "sortable": false,
    "name": "code",
    "field": "code"
  },
  {
    "label": "Name",
    "align": "left",
    "sortable": false,
    "name": "name",
    "field": "name"
  },
  {
    "label": "Action",
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],
	StocksTableHeaderItems: [
  {
    "label": "Action",
    "align": "left",
    "sortable": false,
    "name": "action_types_action_type",
    "field": "action_types_action_type"
  },
  {
    "label": "Date",
    "align": "left",
    "sortable": false,
    "name": "date",
    "field": "date"
  },
  {
    "label": "Qty",
    "align": "left",
    "sortable": false,
    "name": "qty",
    "field": "qty"
  },
  {
    "label": "Barcode",
    "align": "left",
    "sortable": false,
    "name": "items_barcode",
    "field": "items_barcode"
  },
  {
    "label": "Item",
    "align": "left",
    "sortable": false,
    "name": "items_name",
    "field": "items_name"
  },
  {
    "label": "Remarks",
    "align": "left",
    "sortable": false,
    "name": "remarks",
    "field": "remarks"
  },
  {
    "label": "Action",
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],
	TypesTableHeaderItems: [
  {
    "label": "Id",
    "align": "left",
    "sortable": false,
    "name": "id",
    "field": "id"
  },
  {
    "label": "Type",
    "align": "left",
    "sortable": false,
    "name": "type",
    "field": "type"
  },
  {
    "label": "Action",
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],

    exportFormats: {
        print: {
			label: 'Print',
			color: 'blue',
            icon: 'print',
            id: 'print',
            ext: '',
        },
        pdf: {
			label: 'Pdf',
			color: 'red',
            icon: 'picture_as_pdf',
            id: 'pdf',
            ext: 'pdf',
        },
        excel: {
			label: 'Excel',
			color: 'green',
            icon: 'grid_on',
            id: 'excel',
            ext: 'xlsx',
        },
        csv: {
			label: 'Csv',
			color: 'teal',
            icon: 'grid_on',
            id: 'csv',
            ext: 'csv',
        },
    },
    
}