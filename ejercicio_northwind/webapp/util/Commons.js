sap.ui.define([
    "com/proy/ejerciciosapui5/util/Constants"
], function (Constants){
    'use strict';
    const Commons = {
        setDark: function () {
            const currentTheme = sap.ui.getCore().getConfiguration().getTheme();
            const newTheme = currentTheme === Constants.model.sapFioriDark ? Constants.model.sapFioriLight : Constants.model.sapFioriDark;
            sap.ui.getCore().applyTheme(newTheme);
            const button = this.byId(Constants.model.themeButton);
            if (currentTheme === Constants.model.sapFioriDark) {
                button.setIcon(Constants.model.iconDark);
            } else {
                button.setIcon(Constants.model.sapIconLight);
            }
        },
        onChangeLanguage: function () {
            var sCurrentLanguage = sap.ui.getCore().getConfiguration().getLanguage();
            var sNewLanguage = sCurrentLanguage === Constants.model.languageEn ? Constants.model.languageEs : Constants.model.languageEn;
            sap.ui.getCore().getConfiguration().setLanguage(sNewLanguage);
            var oResourceModel = this.getOwnerComponent().getModel(Constants.model.i18n);
            oResourceModel.refresh();
        },
    }
    return Commons
}, true)