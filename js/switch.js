$(function() {
	var configSwitch = function() {
		var obj = new Object();
		obj.baseUrl = "http://127.0.0.1:13370/";
		// ############################################ 【绑定client 发送请求】  ############################################
		obj.init = function() {
			// 1. 查询当前配置文件的状态（待完成）
			// 2. 绑定事件
			$("#config_switch").find("button").click(function() {
				var proejectName = $(this).val();
				obj.switchConfigFile(proejectName).switchDbFile(proejectName);
				if (proejectName == "Test") {
					obj.switchLog4jFile("true");
				} else {
					obj.switchLog4jFile("false");
				}
			});

			$("#db_switch").find("button").click(function() {
				var proejectName = $(this).val();
				if (proejectName == "Ali") {
					obj.switchAliOutUrlDbFile().switchConfigFile("Test").switchLog4jFile("true");
				} else {
					obj.switchDbFile(proejectName).switchConfigFile("Test").switchLog4jFile("true");
				}
			});

			$("#log4j").find("button").click(function() {
				obj.switchLog4jFile($(this).val());
			});
		};
		// ############################################ 【START 页面切换】  ############################################
		obj.switchButton = function(elementId) {
			$(elementId).find("button").each(function() {
				$(this).css("background", "");
			});
			return obj;
		};
		obj.showSwitchStatus = function(data, elementId) {
			var result = JSON.parse(data);
			$(elementId).text(result.message);
			if (result.code = "0") {
				$(elementId).css("color", "green");
			} else {
				$(elementId).css("color", "red");
			}
			return obj;
		};
	    // ############################################ 【START 页面切换】  ############################################
		// ############################################ 【START 切换文件】  ############################################
		obj.switchConfigFile = function(projectName) {
			$.post(obj.baseUrl + "switchConfigFile?projectName=" + projectName, function(data) {
				obj.showSwitchStatus(data, "#config_status");
				obj.switchButton("#config_switch");
				$("#" + projectName + "_config").css("background", "#ccc");
			});
			return obj;
		};
		obj.switchDbFile = function(projectName) {
			$.post(obj.baseUrl + "switchDbFile?projectName=" + projectName, function(data) {
				obj.showSwitchStatus(data, "#db_status");
				obj.switchButton("#db_switch");
				$("#" + projectName + "_db").css("background", "#ccc");
			});
			return obj;
		};
		obj.switchAliOutUrlDbFile = function() {
			$.post(obj.baseUrl + "switchAliOutUrlDbFile", function(data) {
				obj.showSwitchStatus(data, "#db_status");
				obj.switchButton("#db_switch");
				$("#Ali_db").css("background", "#ccc");
			});
			return obj;
		};
		obj.switchLog4jFile = function(showConsole) {
			$.post(obj.baseUrl + "switchLog4jFile?showConsole=" + showConsole, function(data) {
				obj.showSwitchStatus(data, "#log4j_status");
				obj.switchButton("#log4j");
				if (showConsole == "true") {
					$("#log4j_show").css("background", "#ccc");
				} else {
					$("#log4j_hide").css("background", "#ccc");
				}
			});
			return obj;
		};
		// ############################################ 【END 切换文件】  ############################################
		return obj;
	}
	configSwitch().init();
})
