sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/proy/ejercicionorthwind/util/Formatter",
    "com/proy/ejercicionorthwind/util/Constants",
    "com/proy/ejercicionorthwind/util/Commons",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Formatter, Constants, Commons, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.proy.ejercicionorthwind.controller.Main", {
        Formatter: Formatter,
        _productIdSelected: false,
        _productNameSelected: false,

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
            const sPath = jQuery.sap.getModulePath(Constants.model.module) + Constants.model.ordersDetailsExtends;
            var oModel = new JSONModel();
            oModel.loadData(sPath);
            this.getView().setModel(oModel, Constants.model.mock);
            this._oTable = this.getView().byId(Constants.model.idProductsTable);
            //dark
            var oModel = new JSONModel({
                icon: Constants.dark.iconDark
            });
            this.getView().setModel(oModel, Constants.dark.iconModel);
            //language
            var oResourceModel = this.getOwnerComponent().getModel(Constants.language.i18n);
                oResourceModel.enhance({ bundleName: Constants.language.bundleName });
                sap.ui.getCore().getConfiguration().setLanguage(Constants.language.languageEn);
        },
        onChangeLanguage: function(){
            Commons.onChangeLanguage()
        },
        setDark: function(){
            Commons.setDark()
        },
        onSearchButtonPress: function () {
            if (this._productIdSelected || this._productNameSelected) {
                this._applyFilters();
            }
        },
        onProductIdChange: function () {
            this._productIdSelected = true;
        },
        onProductNameChange: function () {
            this._productNameSelected = true;
        },
        _applyFilters: function () {
            const oTable = this.getView().byId(Constants.model.idProductsTable);
            const aFilters = [];

            if (this._productIdSelected) {
                const selectedProductId = this.getView().byId(Constants.comboBox.idProductIdComboBox).getSelectedItem().getKey();
                const productIdFilter = new Filter(Constants.comboBox.productID, FilterOperator.EQ, selectedProductId);
                aFilters.push(productIdFilter);
            }

            if (this._productNameSelected) {
                const selectedProductName = this.getView().byId(Constants.comboBox.idProductNameComboBox).getSelectedItem().getKey();
                const productNameFilter = new Filter(Constants.comboBox.productName, FilterOperator.EQ, selectedProductName);
                aFilters.push(productNameFilter);
            }
            oTable.getBinding(Constants.comboBox.items).filter(aFilters);
            this._productIdSelected = false;
            this._productNameSelected = false;
        },
        success: function (oData) {
            const oModel = new JSONModel(oData.results);
            this.getView().setModel(oModel, Constants.succes.orderMock);
            console.log(oModel)
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
        },
        onClearFiltersPress: function () {
            const oTable = this.getView().byId(Constants.model.idProductsTable);
            oTable.getBinding(Constants.comboBox.items).filter([]);
            this._productIdSelected = false;
            this._productNameSelected = false;
        }
    });
});



