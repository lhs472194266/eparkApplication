/**
 * login
 * autohr linghaisen 2017年8月13日
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
		obj.autologon = function() {
			var userName = helper.url.getURLQueryString("userName");
			var password = helper.url.getURLQueryString("password");
			if(userName != null && userName.length > 0) {
				$("#userName").val(userName);
			}
			if(password != null && password.length > 0) {
				$("#password").val(password);
			}

			if($("#userName").val() == "" && $("#password").val() == "") {
				// 读取 local 数据
				chrome.storage.sync.get("userInfo", function(result){
					
				});

				if(userName != null && userName.length > 0 && password != null && password.length > 0) {
					$("#userName").val(userName);
					$("#password").val(password);
				}
			}

			$("#RememberMe").attr("checked", "checked");
			return obj;
		};
		return obj;
	};

	var initObj = initfn();
	initObj.autologon().bindClick();

});