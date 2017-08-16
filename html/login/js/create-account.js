/**
 * Create Account
 * autohr linghaisen 2017年8月12日
 */
$(function() {
	var baseURL = "http://localhost:8080/Haisen/";
	var initfn = function() {
		var obj = new Object();
		obj.bindClick = function() {
			$("#submit").click(function() {
				var email = $.trim($("#email").val());
				var userName = $.trim($("#userName").val());
				var password = $.trim($("#password").val());
				var passwordConfirm = $.trim($("#password_confirm").val());

				var validateResult = obj.validateFormContent(email, userName, password, passwordConfirm);

				if(validateResult.code == 1) {
					$("#myModalLabel").text(validateResult.meassge);
					$('#myModal').modal('show');
				}

				if(password.length > 0 && password == passwordConfirm) {
					$.post(baseURL + "UserController/register", {
							email: email,
							userName: userName,
							password: helper.safe.encrypt(password)
						},
						function(data) {
							if(data.result.code == 0) {
								$("#myModalLabel").text("注册成功，返回登陆页面...");
								$('#myModal').modal('show');
								setTimeout(function(num) {
									$('#myModal').modal('hide');
									window.location.href = window.location.origin + "/html/login/login.html?userName=" + userName + "&password=" + password
								}, 1000);
							} else {
								$("#myModalLabel").text("注册失败，" + data.result.message + "...");
								$('#myModal').modal('show');
								setTimeout(function(num) {
									$('#myModal').modal('hide');
								}, 1500);
							}
						});
				}
			});
			return obj;
		};
		obj.initComponent = function() {
			return obj;
		};
		obj.validateFormContent = function(email, userName, password, passwordConfirm) {
			var result = {
				code: 0
			};
			if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g.test(email)) {
				result.code = 1;
				result.meassge = "不是合法的邮箱地址.";
				return result;
			}
			if($.trim(userName).length == 0 || /.*?(\s+).*?/g.test($.trim(userName))) {
				result.code = 1;
				result.meassge = "用户名设置错误.";
				return result;
			}
			if($.trim(password).length == 0 || /.*?(\s+).*?/g.test($.trim(password))) {
				result.code = 1;
				result.meassge = "密码设置错误.";
				return result;
			}
			if($.trim(password).length > 12) {
				result.code = 1;
				result.meassge = "密码长度不能超过12位.";
				return result;
			}
			if(passwordConfirm != password) {
				result.code = 1;
				result.meassge = "确认密码不等于密码.";
				return result;
			}
			return result;
		};
		return obj;
	};

	var initObj = initfn();
	initObj.initComponent().bindClick();
});