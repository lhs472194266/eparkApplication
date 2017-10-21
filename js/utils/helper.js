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
		str = window.encodeURI(str);
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
		return window.decodeURI(str);
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

helper.account = {
	accountID : {
		teyiting  : {usrName : "admin",   usrPwd : ["2014bitcom0404!"]},
		taizhou   : {usrName : "admin",   usrPwd : ["lesbithtc-29092"]},
		rizhao    : {usrName : "admin",   usrPwd : ["rzhtc20l7"]},
		changshu  : {usrName : "admin",	  usrPwd : ["2016cs20l6"]},
		zhengzhou : {usrName : "admin",   usrPwd : ["hnybc"]},
		liantong  : {usrName : "admin",   usrPwd : ["123"]},
		local 	  : {usrName : "admin",   usrPwd : ["2014bitcom0404!","123"]}
	},
	absolutePath : {
		teyiting  : "http://www.teyiting.com/",
		taizhou   : "http://htc.taizhou.gov.cn/",
		rizhao    : "http://jtss.rzbus.cn:980/",
		changshu  : "http://www.cszhtc.com/",
		zhengzhou : "http://101.201.57.38/",
		liantong  : "http://www.topeasypark.com/",
		local 	  : "http://localhost:8080/epark/"
	},
	projectName : {
		teyiting  : "特易停",
		taizhou   : "泰州",
		rizhao    : "日照",
		changshu  : "常熟",
		zhengzhou : "郑州",
		liantong  : "联通机房",
		local     : "本地"
	}
};

helper.storage = {
	set : function(key, value) {
		var obj = {};
		obj[key] = value;
		chrome.storage.sync.set(obj);
		console.log(obj);
	},
	log : function(key) {
		var returnValue = null;
		chrome.storage.sync.get(key, function(result) {
			console.log(result);
		});
	}
};