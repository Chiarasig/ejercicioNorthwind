sap.ui.define([
	"com/proy/ejercicionorthwind/util/Constants",
],	
	function(Constants) {
	"use strict";


	var Formatter = {

		extendedPriceState  :  function (sExtendedPrice) {
			var fMaxExtendedPriceSuccess = Constants.formatter.maxPrice;
			var fAdjustedExtendedPrice = parseFloat(sExtendedPrice);

			if (isNaN(fAdjustedExtendedPrice)) {
				return Constants.formatter.None;
			} else {
				if (fAdjustedExtendedPrice < Constants.formatter.minPrice) {
					return Constants.formatter.None;
				} else if (fAdjustedExtendedPrice < fMaxExtendedPriceSuccess) {
					return Constants.formatter.Success;
				} else {
					return Constants.error.error;
				}
			}
		},
	};

	return Formatter;

}, true);