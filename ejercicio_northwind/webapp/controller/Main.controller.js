sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/proy/ejercicionorthwind/util/Constants",
    "com/proy/ejercicionorthwind/util/Commons",
    "com/proy/ejercicionorthwind/util/Formatter",
], function (Controller, JSONModel, Filter, FilterOperator, Constants, Commons, Formatter) {
    "use strict";

    return Controller.extend("com.proy.ejercicionorthwind.controller.Main", {
        Formatter: Formatter,

        onInit: function () {
            const url = sap.ui.require.toUrl(Constants.model.moduleURL) + Constants.model.northwind;
            this._model = new sap.ui.model.odata.v2.ODataModel(url, {
                json: true,
                headers: {
                    "DataServiceVersion": "2.0",
                    "Cache-Control": "no-cache, no-store",
                    "Pragma": "no-cache"
                },
                useBatch: true
            });
            this._model.read(Constants.model.orderRead, {
                async: true,
                success: jQuery.proxy(this.success, this),
                error: jQuery.proxy(this.error, this)
            });

            // Cargar datos JSON en un modelo para ComboBox
            const sPath = jQuery.sap.getModulePath(Constants.model.module) + Constants.model.ordersDetailsExtends;
            var oModel = new JSONModel();
            oModel.loadData(sPath);
            this.getView().setModel(oModel, Constants.model.mock);
            var oFilters = new JSONModel({ ProductId: "", ProductName: "" });
            this.getView().setModel(oFilters, "filters");


            // Dark Mode
            var oDarkModel = new JSONModel({
                icon: Constants.dark.iconDark
            });
            this.getView().setModel(oDarkModel, Constants.dark.iconModel);

            // Language
            var oResourceModel = this.getOwnerComponent().getModel(Constants.language.i18n);
            oResourceModel.enhance({ bundleName: Constants.language.bundleName });
            sap.ui.getCore().getConfiguration().setLanguage(Constants.language.languageEn);
        },

        onChangeLanguage: function () {
            Commons.onChangeLanguage();
        },

        setDark: function () {
            Commons.setDark();
        },
        onSearchButtonPress: function () {
            var aFilters = [];
            var aFilters2 = []
            const productId = this.getView().getModel("filters").getProperty("/ProductId");
            const productName = this.getView().getModel("filters").getProperty("/ProductName");
            console.log("productId", productId)
            console.log("productName", productName)
        
            if (productId && productId.length > 0) {
                var filter1 = new Filter("ProductID", FilterOperator.EQ, productId);
                aFilters.push(filter1);
            }
            if (productName && productName.length > 0) {
                var filter2 = new Filter("ProductName", FilterOperator.Contains, productName);
                aFilters.push(filter2);
            }
            aFilters2 = new Filter(aFilters, false)
            var oList = this.byId("idProductsTable");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilters2, "Application");
        },
        onClear: function () {
            const oFilters = new JSONModel({ ProductId: "", ProductName: "" });
            this.getView().setModel(oFilters, "filters");
            var aFilters=[]
            var oList = this.byId("idProductsTable");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilters, "Application");
        },
        success: function (oData) {
            const oModel = new JSONModel(oData.results);
            this.getView().setModel(oModel, Constants.succes.orderMock);
            console.log(oModel);
        },
        error: function () {
            alert(Constants.error.error);
        },
        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource().getBindingContext(Constants.succes.orderMock);
            const sPath = oItem.getPath();
            const oItemSelect = this.getView().getModel(Constants.succes.orderMock).getProperty(sPath);
            console.log(oItemSelect);
            const oModel = new JSONModel(oItemSelect);
            this.getOwnerComponent().setModel(oModel, Constants.succes.selectedOrderMock);
            this.getOwnerComponent().getRouter().navTo(Constants.model.routeDetail);
        }
    });
});



