/**
 * login
 * autohr linghaisen 2017年8月13日
 */
$(function() {

	/****************************暂时作为初始化*******************/

	/************************************************************/
	var baseURL = "http://localhost:8080/Haisen/";

	var initfn = function() {
		var obj = new Object();
		obj.bindClick = function() {
			// 01.绑定LogIn按钮点击事件
			$("#LogIn").click(function() {
				var userName = $("#userName").val();
				var password = $("#password").val();

				if(helper.verify.isEmptyOrBlank(userName)) {
					$("#myModalLabel").text("用户名不能为空.")
					$('#myModal').modal('show');
					return;
				};
				if(helper.verify.isEmptyOrBlank(password)) {
					$("#myModalLabel").text("密码不能为空");
					$('#myModal').modal('show');
					return;
				}
				obj.postLogin(userName, password);
			});

			// 02. 为Login按钮绑定 enter 热键
			document.onkeyup = function(event) {
				var e = event || window.event;
				var keyCode = e.keyCode || e.which;
				switch(keyCode) {
					case 13:
						var modalStuts = $('#myModal').css("display");
						if(modalStuts == "block") {
							$('#myModal').modal('hide');
						} else {
							$("#LogIn").click();
						}
						break;
					case 27:
						var main_window = chrome.app.window.get('main');
						main_window.minimize();
						break;
				}
			};

			// 03.为窗口添加关闭监听事件，暂时不知道调用哪个方法.
			return obj;
		};
		obj.initComponent = function() {
			return obj;
		};
		obj.loginSuccess = function(userName, password) {
			$("#shade").css("opacity", 0.6);
			$("#shade").css("z-index", 2);
			var timer = setTimeout(function(num) {
				// 01. 隐藏登陆窗口
				window.top.$("#mainlogIn").hide();
				// 02. 将成功登陆的帐号密码及是否记住我等信息，存入 storage
				var data = {
					"userInfo": {
						"userName": helper.safe.encrypt(userName),
						"password": helper.safe.encrypt(password),
						"rememberMe": helper.safe.encrypt($("#RememberMe").prop("checked") + "")
					}
				};
				chrome.storage.sync.set(data);
				// 03. 为 mainWindow.html 部分页面初始化
				window.top.$("#userName").html("&nbsp;" + userName);
				// 04. 初始化菜单，待办
				
			}, 2000);
		};
		obj.postLogin = function(userName, password) {
			$.post(baseURL + "/LoginController/signIn", {
				"userName": userName,
				"password": helper.safe.encrypt(password)
			}, function(result) {
				if(result.result.code == 0) {
					obj.loginSuccess(userName, password);
				} else {
					$("#myModalLabel").text(result.result.message);
					$('#myModal').modal('show');
				}
			});
		};
		obj.autologin = function() {
			var userName = helper.url.getURLQueryString("userName");
			var password = helper.url.getURLQueryString("password");
			if(userName != null && userName.length > 0) {
				$("#userName").val(userName);
			}
			if(password != null && password.length > 0) {
				$("#password").val(password);
				$("#RememberMe").attr("checked", "checked");
			}

			if($("#userName").val() == "" && $("#password").val() == "") {
				chrome.storage.sync.get("userInfo", function(result) {
					if(result.userInfo != undefined) {
						var rememberMe = helper.safe.decrypt(result.userInfo.rememberMe);
						if(rememberMe == "true") {
							userName = helper.safe.decrypt(result.userInfo.userName);
							password = helper.safe.decrypt(result.userInfo.password);
							$("#userName").val(userName);
							$("#password").val(password);
							$("#RememberMe").attr("checked", "checked");

							// obj.postLogin(userName, password);
						}
					}
				});
			}

			return obj;
		};
		return obj;
	};

	var initObj = initfn();
	initObj.autologin().bindClick();

});