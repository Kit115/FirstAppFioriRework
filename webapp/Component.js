sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel',
	'sap/f/library'
], function(UIComponent, JSONModel, fioriLibrary) {
	'use strict';

	return UIComponent.extend('sap.ui.demo.fiori2.Component', {

		metadata: {
			manifest: 'json'
		},

		init: function () {
			UIComponent.prototype.init.apply(this, arguments);
			
			var oModel = new JSONModel({
				standardCurrency: "EUR",
				productEditable: false,
				currentProduct: 0,
				layout: "",

				sortDescending: false,
				sortGroup: true,
				sortPath: "Supplier",
				
				customSupplier: false,
				
				newProduct : {
					ProductName: "",
					Category: "",
					Price: "",
					Supplier: "",
					InStock: true, 
					Discontinued: false,
					SalesFigures : {
						Q32019 : {
							Sales: "",
							PercentageLeased: ""
						},
						Q42019 : {
							Sales: "",
							PercentageLeased: ""
						},
						Q12020 : {
							Sales: "",
							PercentageLeased: ""
						},
						Q22020 : {
							Sales: "",
							PercentageLeased: ""
						}
					}
				}
			});

			this.setModel(oModel); 

			var oProductsModel = new JSONModel(sap.ui.require.toUrl('sap/ui/demo/mock') + '/products.json');
			oProductsModel.setSizeLimit(1000); 
			this.setModel(oProductsModel, "products");

			var oRouter = this.getRouter(); 
			oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this); 
			oRouter.initialize(); 
		},

		_onBeforeRouteMatched: function (oEvent) {
			var oModel = this.getModel(); 
			var sLayout = oEvent.getParameters().arguments.layout;
			if(!sLayout) {
				sLayout = fioriLibrary.LayoutType.OneColumn;
			}
			oModel.setProperty("/layout", sLayout); 
		}
	});
});
