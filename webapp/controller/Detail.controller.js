sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict"; 

    return Controller.extend("sap.ui.demo.fiori2.controller.Detail", {
        onInit: function() {

            var oOwnerComponent = this.getOwnerComponent();

            this.oRouter = oOwnerComponent.getRouter(); 

            this.oModel = oOwnerComponent.getModel(); 

            this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
        },
        _onProductMatched: function (oEvent) {
            this._product = oEvent.getParameter("arguments").product || this._product || "0"; 
            this.getView().bindElement({
                path: "/Products/" + this._product,
                model: "productModel"
            });
        },
        onDelete: function() {
            
        },
        onBarSelected: function(oEvent) {
            var oBarChart = this.byId("salesBarChart"); 
            var oSelectedBar = oEvent.getParameter("bar");
            var oBarId = oSelectedBar.getId().split("--")[1];
            var oLeasedSegment = this.byId("percentageLeased");
            var oBoughtSegment = this.byId("percentageBought");
            var oCurrentProduct = this.getView().getModel().getProperty("/currentProduct");
            var productModel = JSON.parse(this.getView().getModel("productModel").getJSON());
            var percentageLeased = productModel.Products[oCurrentProduct].SalesFigures[oBarId].PercentageLeased;
            //console.log(this.getView().getId());    
            console.log(percentageLeased);
            
            oLeasedSegment.setValue(percentageLeased);
            oBoughtSegment.setValue(100 - percentageLeased);
            oBarChart.setSelectedBars(oSelectedBar);  
          
        },
        helper: function () {
            var oBar = this.byId("2019Q3");
            var oBarChart = this.byId("salesBarChart"); 

            var oLeasedSegment = this.byId("percentageLeased");
            var oBoughtSegment = this.byId("percentageBought");
            var oCurrentProduct = this.getView().getModel().getProperty("/currentProduct");
            var productModel = JSON.parse(this.getView().getModel("productModel").getJSON());
            var percentageLeased = productModel.Products[oCurrentProduct].SalesFigures["2019Q3"].PercentageLeased;

            oLeasedSegment.setValue(percentageLeased);
            oBoughtSegment.setValue(100 - percentageLeased);
            oBarChart.setSelectedBars(oBar);
            
        },
        onExit: function () {
            this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this); 
            this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this); 
        }
    });
});
        