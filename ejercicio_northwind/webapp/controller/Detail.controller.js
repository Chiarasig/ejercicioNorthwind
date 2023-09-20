sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
    "com/proy/ejercicionorthwind/util/Constants"
    ],
    function(BaseController, History, Constants) {
      "use strict";
  
      return BaseController.extend("com.proy.ejercicionorthwind.controller.Detail", {
        onInit: function () {
        },
        navBack: function(){
          const oHistory = History.getInstance();
          const sPreviousHash = oHistory.getPreviousHash();
          if (sPreviousHash!==undefined){
              window.history.go(-1);
          }else{
              this.getRouter().navTo(Constants.model.app, {}, true)
          }
      }   
      });
    }
  );