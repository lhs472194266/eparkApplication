var helper = {} || helper;

helper.url = {
	getURLQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return unescape(r[2]);
		} else {
			return null;
		}
	}
}

helper.safe = {
	encrypt: function(str) {
		var week = XDate().getDay();	// 周日 = 0
		int factor = 3;
		var original = $.base64.btoa(str);
		var result = original.replace("a", "h");
		return result;
	},
	decrypt: function(str) {
		int factor = 3;
		var secure = $.base64.atob(str);
		var result = secure.replace("h", "a");
		return result;
	}
}