sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageToast",
    "sap/f/library",
    "sap/ui/core/Fragment" 
], (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageToast, fioriLibrary, Fragment) => {
    "use strict"; 

    return Controller.extend("sap.ui.demo.fiori2.controller.Master", {
        onInit: function () {
            this.oView = this.getView(); 
            this.oProductsTable =this.oView.byId("productsTable"); 
            this.oRouter = this.getOwnerComponent().getRouter(); 
        },

        onSearch: function (oEvent) {
            var oTableSearchState = []; 
            var sQuery = oEvent.getParameter("query"); 

            if(sQuery && sQuery.length > 0) {
                oTableSearchState = [new Filter({
                    path: "ProductName", 
                    operator: FilterOperator.Contains,
                    value1: sQuery,
                    caseSensitive: false 
                })]; 

            }
            this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application"); 
        },
        onOpenDialog: function () {
            var oView = this.getView(); 

            if(!this.byId("AddProductDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.fiori2.view.AddProductDialog",
                    controller: this
                }).then(oDialog => {
                    oView.addDependent(oDialog);
                    oDialog.open(); 
                });
            }
            else{
                this.byId("AddProductDialog").open(); 
            }
        },
        onAddProduct: function () {
            var oNewProduct = {
                ProductID: "",
                ProductName : this.getView().getModel().getProperty("/newProduct/ProductName"),
                Category : this.getView().getModel().getProperty("/newProduct/Category"), 
                Price : this.getView().getModel().getProperty("/newProduct/Price"),
                Supplier : this.getView().getModel().getProperty("/newProduct/Supplier"),
                InStock : this.getView().getModel().getProperty("/newProduct/InStock"),
                Discontinued : false,
                SalesFigures : {
                    "2019Q3": {
                        Sales: "",
                        PercentageLeased: ""
                    },
                    "2019Q4": {
                        Sales: "",
                        PercentageLeased: ""
                    },
                    "2020Q1": {
                        Sales: "",
                        PercentageLeased: ""
                    },
                    "2020Q2": {
                        Sales: "",
                        PercentageLeased: ""
                    }
                }
            };

            console.log(oNewProduct);
        },
        onCancelDialog: function () {
            this.byId("AddProductDialog").close();
        },
        onSort: function() {
            var oSortDescending = this.getView().getModel().getProperty("/sortDescending");

            this.getView().getModel().setProperty("/sortDescending", !oSortDescending);

            this.onSelectChange();
        },
        onGroup: function () {
            var oSortGroup = this.getView().getModel().getProperty("/sortGroup");

            this.getView().getModel().setProperty("/sortGroup", !oSortGroup); 

            this.onSelectChange(); 
        },
        onListItemPress: function (oEvent) {
            var productPath = oEvent.getSource().getBindingContext("productModel").getPath();
            var product = productPath.split("/").slice(-1).pop();
            this.getView().getModel().setProperty("/currentProduct", product);
            var oController = sap.ui.getCore().byId("__xmlview1").getController();
            oController.helper(); 
            
            this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, product: product});
        },
        onSelectChange: function () {
            var oAttribute = this.getView().getModel().getProperty("/sortPath");
            var oDescending = this.getView().getModel().getProperty("/sortDescending"); 
            var oGroup = this.getView().getModel().getProperty("/sortGroup"); 
            
            var oSorter = new Sorter({
                path: oAttribute,
                descending: oDescending,
                group: oGroup
            });
            var oList = this.byId("productsTable");
            oList.getBinding("items").sort(oSorter);
        }
    });
});