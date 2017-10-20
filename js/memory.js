/**
 * 记忆功能.
 */
$(function() {
	var initfn = function() {
		var obj = new Object();
		obj.bindClick = function() {
			$("#menu li").click(function() {
				chrome.storage.sync.set({
					"currentPage" : $(this).find("a").attr("href")
				});
			});
			return obj;
		};
		obj.initComponent = function() {
			return obj;
		};
		obj.selectPage = function(result) {
			$("a[href='" + result.currentPage + "']").parent().addClass("active");
			$("#" + result.currentPage.substring(1)).addClass("active");
			return obj;
		};
		obj.cancelOtherPage = function() {
			$("#menu > li:gt(0)").each(function(index, domEle) {
				$(domEle).removeClass("active");
				$("#" +$(domEle).find("a").attr("href").substring(1)).removeClass("active");
			});
			return obj;
		};
		obj.initData = function() {
			chrome.storage.sync.get("currentPage", function(result) {
				if (result.currentPage != undefined) {
					obj.cancelOtherPage();
					obj.selectPage(result);
				}
			});
			return obj;
		};
		return obj;
	};

	var initObj = initfn();
	initObj.initComponent().bindClick().initData();
});