$(function() {
	// 01. 安装初始化（初始化数据）
	chrome.runtime.onInstalled.addListener(function() {
		chrome.storage.sync.set({
			"test": "test"
		}, function() {
			chrome.storage.sync.get("test", function(result) {
				//console.log(result);
			});

		});
	});

	// 02. 创建窗口
	chrome.app.runtime.onLaunched.addListener(function() {
		var main_window = chrome.app.window.get('main');
		if(main_window) {
			main_window.show();
		} else {
			chrome.app.window.create('html/mainWindow.html', {
				id: 'main',
				bounds: {
					width: 800,
					height: 600,
					left: 100,
					top: 100
				},
				/*frame : 'none',*/
				minWidth: 800,
				minHeight: 600,
				resizable: true,
				// state: 'fullscreen',
				alwaysOnTop: false,
				hidden: false
			}, function(appWindow) {
				//console.log(appWindow); // 输出到 html/background.html 面板
			});
		}
	});

	/*$.post("http://www.teyiting.com/checklogin.do", {
		usrName: "admin",
		usrPwd: "2014bitcom0404!",
		captcha: 0
	}, function(data) {
		console.log(data);
	});
	
	$.post("http://htc.taizhou.gov.cn/checklogin.do", {
		usrName: "admin",
		usrPwd: "2014bitcom0404!",
		captcha: 0
	}, function(data) {
		console.log(data);
	});*/


});