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
	factor: 2,
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
		return window.btoa(arr.join(""));
	},
	decrypt: function(str) {
		for(var x = 0; x < helper.safe.factor; x++) {
			str = helper.safe.decrypt_fn(str);
		}
		return str;
	},
	decrypt_fn: function(str) {
		str = window.atob(str);
		var length = str.length;
		var arr = str.split("");
		for(var i = 1; i < length; i++) {
			var ele = arr.splice(length - i, 1);
			arr.unshift(ele);
		}
		return arr.join("");
	}
}

helper.verify = {
	/**
	 * str==null 或 str.length == 0  
	 * @param {Object} str
	 */
	isEmpty: function(str) {
		if(str == null || str.length == 0) {
			return true;
		}
		return false;
	},
	/**
	 * 判断某字符串是否为空 或 长度为0 或 由空白符(whitespace) 构成  
	 * @param {Object} str
	 */
	isBlank: function(str) {
		if($.trim(str) == "") {
			return true;
		}
		return false;
	},
	/**
	 * helper.verify.isEmpty(str) || helper.verify.isBlank(str)
	 * @param {Object} str
	 */
	isEmptyOrBlank: function(str) {
		if(helper.verify.isEmpty(str)) {
			return true;
		}
		if(helper.verify.isBlank(str)) {
			return true;
		}
		return false;
	}
}