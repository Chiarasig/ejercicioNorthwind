sap.ui.define(function() {
	"use strict";

	var Formatter = {

		extendedPriceState  :  function (sExtendedPrice) {
			var fMaxExtendedPriceSuccess = 100;
			var fAdjustedExtendedPrice = parseFloat(sExtendedPrice);

			if (isNaN(fAdjustedExtendedPrice)) {
				return "None";
			} else {
				if (fAdjustedExtendedPrice < 0) {
					return "None";
				} else if (fAdjustedExtendedPrice < fMaxExtendedPriceSuccess) {
					return "Success";
				} else {
					return "Error";
				}
			}
		},
	};

	return Formatter;

}, true);