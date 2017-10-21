/**
 * mainWindow autohr linghaisen 2017年8月16日
 */
$(function() {
	var baseURL = "http://localhost:8080/Haisen/";

	var initfn = function() {
		var obj = new Object();
		obj.bindClick = function() {
			return obj;
		};
		obj.initComponent = function() {
			return obj;
		};
		obj.initComponentByLoginJS = function() {
			return obj;
		};
		obj.validate = function() {

		};
		return obj;
	};

	var initObj = initfn();
	initObj.initComponent().bindClick();
});