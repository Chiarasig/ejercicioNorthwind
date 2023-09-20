sap.ui.define([
    "com/proy/ejercicionorthwind/util/Constants"
], function (Constants){
    'use strict';
    const Commons = {
        setDark: function () {
            const currentTheme = sap.ui.getCore().getConfiguration().getTheme();
            const newTheme = currentTheme === Constants.dark.sapFioriDark ? Constants.dark.sapFioriLight : Constants.dark.sapFioriDark;
            sap.ui.getCore().applyTheme(newTheme);
            const button = this.byId(Constants.dark.themeButton);
            if (currentTheme === Constants.dark.sapFioriDark) {
                button.setIcon(Constants.dark.iconDark);
            } else {
                button.setIcon(Constants.dark.sapIconLight);
            }
        },
        onChangeLanguage: function () {
            var sCurrentLanguage = sap.ui.getCore().getConfiguration().getLanguage();
            var sNewLanguage = sCurrentLanguage === Constants.language.languageEn ? Constants.language.languageEs : Constants.language.languageEn;
            sap.ui.getCore().getConfiguration().setLanguage(sNewLanguage);
            var oResourceModel = this.getOwnerComponent().getModel(Constants.language.i18n);
            oResourceModel.refresh();
        },
    }
    return Commons
}, true)