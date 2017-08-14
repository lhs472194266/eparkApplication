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
	factor: 5,
	encrypt: function(str) {
		for(var x = 0; x < helper.safe.factor; x++) {
			str = helper.safe.encrypt_fn(str);
		}
		return str;
	},
	encrypt_fn: function(str) {
		var length = str.length;
		var arr = str.split("");
		for(var i = 0; i < length - 1; i++) {
			var ele = arr.shift();
			arr.splice(i + 1, 0, ele);
		}
		return $.base64.btoa(arr.join(""));
	},
	decrypt: function(str) {
		for(var x = 0; x < helper.safe.factor; x++) {
			str = helper.safe.decrypt_fn(str);
		}
		return str;
	},
	decrypt_fn: function(str) {
		str = $.base64.atob(str);
		var length = str.length;
		var arr = str.split("");
		for(var i = 1; i < length; i++) {
			var ele = arr.splice(length - i, 1);
			arr.unshift(ele);
		}
		return arr.join("");
	}
}