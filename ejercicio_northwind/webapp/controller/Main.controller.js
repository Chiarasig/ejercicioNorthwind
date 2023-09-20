sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/proy/ejercicionorthwind/util/Formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Formatter, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.proy.ejercicionorthwind.controller.Main", {
        Formatter: Formatter,
        onInit: function () {
            const url = sap.ui.require.toUrl("com/proy/ejercicionorthwind") + "/northwind/northwind.svc/";
            this._model = new sap.ui.model.odata.v2.ODataModel(url, {
                json: true,
                headers: {
                    "DataServiceVersion": "2.0",
                    "Cache-Control": "no-cache, no-store",
                    "Pragma": "no-cache"
                },
                useBatch: true
            });
            this._model.read("/Order_Details_Extendeds", {
                async: true,
                success: jQuery.proxy(this.success, this),
                error: jQuery.proxy(this.error, this)
            });

            const sPath = jQuery.sap.getModulePath("com.proy.ejercicionorthwind") + "/localService/OrdersDetailsExtends.json";
            var oModel = new JSONModel();
            oModel.loadData(sPath);
            this.getView().setModel(oModel, "mock");
            this._oTable = this.getView().byId("idProductsTable");

        },  
        onProductIdChange: function (oEvent) {
            const selectedProductId = oEvent.getSource().getSelectedItem().getKey();
            this.filterTable(selectedProductId, "ProductID");
        },
        
        onProductNameChange: function (oEvent) {
            const selectedProductName = oEvent.getSource().getSelectedItem().getKey();
            this.filterTable(selectedProductName, "ProductName");
        },
        filterTable: function (selectedValue, propertyName) {
            const oTable = this.getView().byId("idProductsTable");
            const aFilters = [];
            if (selectedValue) {
                const oFilter = new Filter(propertyName, FilterOperator.EQ, selectedValue);
                aFilters.push(oFilter);
            }
            oTable.getBinding("items").filter(aFilters);
        },        
        success: function (oData) {
            const oModel = new JSONModel(oData.results);
            this.getView().setModel(oModel, "orderMock");
            console.log(oModel)
        },
        error: function () {
            alert("Error");
        },
        onItemPress: function(oEvent){
            var oItem = oEvent.getSource().getBindingContext("orderMock");
            const sPath = oItem.getPath();
            const oItemSelect = this.getView().getModel("orderMock").getProperty(sPath);
            console.log(oItemSelect);
            const oModel = new JSONModel(oItemSelect);
            this.getOwnerComponent().setModel(oModel, "selectedOrderMock");
            this.getOwnerComponent().getRouter().navTo("RouteDetail");
        },
    });
});


    
