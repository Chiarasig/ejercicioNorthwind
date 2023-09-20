sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
    "com/proy/ejercicionorthwind/util/Constants",
    "com/proy/ejercicionorthwind/util/Commons",
    "sap/ui/model/json/JSONModel"
    ],
    function(BaseController, History, Constants, Commons, JSONModel) {
      "use strict";
  
      return BaseController.extend("com.proy.ejercicionorthwind.controller.Detail", {
        onInit: function () {
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
        navBack: function(){
          const oHistory = History.getInstance();
          const sPreviousHash = oHistory.getPreviousHash();
          if (sPreviousHash!==undefined){
              window.history.go(-1);
          }else{
              this.getRouter().navTo(Constants.model.app, {}, true)
          }
      },
      onChangeLanguage: function(){
        Commons.onChangeLanguage()
    },
    setDark: function(){
        Commons.setDark()
    }
      });
    }
  );