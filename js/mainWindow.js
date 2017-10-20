/**
 * mainWindow autohr linghaisen 2017年8月16日
 */
$(function() {
	var baseURL = "http://localhost:8080/Haisen/";

	var initfn = function() {
		var obj = new Object();
		obj.bindClick = function() {
			$("#menu ul").find("li").click(function() {
				var aDom = $(this).find("a");
				chrome.storage.sync.set({
					"projectName" : aDom.attr("name")
				});
				$("#menu_project").text(aDom.text());
				chrome.storage.sync.get(null, function(result) {
					helper.storage.set("projectUrl",helper.account.absolutePath[result.projectName] + "MHp5TU1Pak1vRHhBTm9DajAzeVNPTUFBPVM9dw==/ZEpHMjF2cFk=");
				});
			});
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