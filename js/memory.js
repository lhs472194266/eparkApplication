/**
 * 记忆功能.
 */
$(function() {
	var initfn = function() {
		var obj = new Object();
		obj.bindClick = function() {
			// 菜单<li>列表绑定事件
			$("#menu li").click(function() {
				chrome.storage.sync.set({
					"currentPage" : $(this).find("a").attr("href")
				});
			});
			
			// 项目<li>列表绑定事件
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
		/**
		 * 记忆赋值,启动时自动执行.
		 */
		obj.initData = function() {
			chrome.storage.sync.get(null, function(result) {
				if (result.currentPage != undefined) {
					obj.cancelOtherPage();
					obj.selectPage(result);
				}
				if (result.projectName != undefined) {
					$("#menu_project").text(helper.account.projectName[result.projectName]);
					helper.storage.set("projectUrl",helper.account.absolutePath[result.projectName] + "MHp5TU1Pak1vRHhBTm9DajAzeVNPTUFBPVM9dw==/ZEpHMjF2cFk=");
				}
			});
			return obj;
		};
		return obj;
	};

	var initObj = initfn();
	initObj.initComponent().bindClick().initData();
});