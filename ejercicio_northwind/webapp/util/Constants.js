sap.ui.define([], function (){
    'use strict';
    return{
        model: {
            mock: "mock",
            module: "com.proy.ejercicionorthwind",
            moduleURL: "com/proy/ejercicionorthwind",
            northwind: "/northwind/northwind.svc/",
            orderRead: "/Order_Details_Extendeds",
            ordersDetailsExtends: "/localService/OrdersDetailsExtends.json",
            idProductsTable: "idProductsTable",
            items: "items",
            filterApplication: "FilterApplication",
            propertyToFilter: "Name",
            routeDetail: "RouteDetail",
            app: "App",
        },
        comboBox:{
            idProductIdComboBox: "idProductIdComboBox",
            productID: "ProductID",
            idProductNameComboBox: "idProductNameComboBox",
            productName: "ProductName",
            items: "items"
        },
        language:{
            i18n: "i18n",
            bundleName: "com.proy.ejercicionorthwind.i18n.i18n",
            languageEn: "en",
            languageEs: "es",
        },
        dark:{
            iconDark: "sap-icon://dark-mode",
            iconModel: "iconModel",
            sapFioriDark: "sap_fiori_3_dark",
            sapFioriLight: "sap_fiori_3",
            themeButton: "themeButton",
            sapIconLight:"sap-icon://light-mode",
        },
        succes:{
            orderMock: "orderMock",
            selectedOrderMock: "selectedOrderMock"
        },
        error:{
          error: "Error"  
        },
        formatter:{
            None: "None",
            Success: "Success",
            maxPrice: 100,
            minPrice: 0
        }
    };
}, true)