var helper = {} || helper;

helper.url = {
	getURLQueryString : function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		} else {
			return null;
		}
	}
}

helper.safe = {
	factor : 2,
	encrypt : function(str) {
		str = window.encodeURI(str);
		for (var x = 0; x < helper.safe.factor; x++) {
			str = helper.safe.encrypt_fn(str);
		}
		return str;
	},
	encrypt_fn : function(str) {
		var length = str.length;
		var arr = str.split("");
		for (var i = 0; i < length - 1; i++) {
			var ele = arr.shift();
			arr.splice(i + 1, 0, ele);
		}
		return window.btoa(arr.join(""));
	},
	decrypt : function(str) {
		for (var x = 0; x < helper.safe.factor; x++) {
			str = helper.safe.decrypt_fn(str);
		}
		return window.decodeURI(str);
	},
	decrypt_fn : function(str) {
		str = window.atob(str);
		var length = str.length;
		var arr = str.split("");
		for (var i = 1; i < length; i++) {
			var ele = arr.splice(length - i, 1);
			arr.unshift(ele);
		}
		return arr.join("");
	}
}

helper.verify = {
	/**
	 * str==null 或 str.length == 0
	 * 
	 * @param {Object}
	 *            str
	 */
	isEmpty : function(str) {
		if (str == null || str.length == 0) {
			return true;
		}
		return false;
	},
	/**
	 * 判断某字符串是否为空 或 长度为0 或 由空白符(whitespace) 构成
	 * 
	 * @param {Object}
	 *            str
	 */
	isBlank : function(str) {
		if ($.trim(str) == "") {
			return true;
		}
		return false;
	},
	/**
	 * helper.verify.isEmpty(str) || helper.verify.isBlank(str)
	 * 
	 * @param {Object}
	 *            str
	 */
	isEmptyOrBlank : function(str) {
		if (helper.verify.isEmpty(str)) {
			return true;
		}
		if (helper.verify.isBlank(str)) {
			return true;
		}
		return false;
	}
}

helper.account = {
	accountID : {
		teyiting : {
			usrName : "admin",
			usrPwd : [ "2014bitcom0404!" ]
		},
		taizhou : {
			usrName : "admin",
			usrPwd : [ "lesbithtc-29092" ]
		},
		rizhao : {
			usrName : "admin",
			usrPwd : [ "rzhtc20l7" ]
		},
		changshu : {
			usrName : "admin",
			usrPwd : [ "2016cs20l6" ]
		},
		zhengzhou : {
			usrName : "admin",
			usrPwd : [ "hnybc" ]
		},
		liantong : {
			usrName : "admin",
			usrPwd : [ "123" ]
		},
		local : {
			usrName : "admin",
			usrPwd : [ "2014bitcom0404!", "123" ]
		}
	},
	absolutePath : {
		teyiting : "http://www.teyiting.com/",
		taizhou : "http://htc.taizhou.gov.cn/",
		rizhao : "http://jtss.rzbus.cn:980/",
		changshu : "http://www.cszhtc.com/",
		zhengzhou : "http://101.201.57.38/",
		liantong : "http://www.topeasypark.com/",
		local : "http://localhost:8080/epark/"
	},
	projectName : {
		teyiting : "特易停",
		taizhou : "泰州",
		rizhao : "日照",
		changshu : "常熟",
		zhengzhou : "郑州",
		liantong : "联通机房",
		local : "本地"
	}
};

helper.storage = {
	set : function(key, value) {
		var obj = {};
		obj[key] = value;
		chrome.storage.sync.set(obj);
	},
	log : function(key) {
		var returnValue = null;
		chrome.storage.sync.get(key, function(result) {
			console.log(result);
		});
	}
};

/**
 * 封装sql请求 1. sql : select sql 2. fn : 回调函数
 */
helper.sql = {
	select : function(sql, fn) {
		chrome.storage.sync.get(null, function(result) {
			$.ajax({
				type : "POST",
				cache: false,
				url : result.projectUrl,
				data : {
					operator : result.userInfo.userName,
					verify : helper.safe.encrypt(new XDate().addSeconds(-2).toString("yyyy-MM-dd HH:mm:ss.fff")),
					type : helper.safe.encrypt("0204"),
					content : helper.safe.encrypt(sql)
				},
				success : function(result) {
					if (fn != undefined && fn != null) {
						fn(result); // 执行回调函数，并将系统数据对象传进去.
					}
				},
				error:function(result){
					$("#myModalLabel").text("【" + result.status + "】请求失败,请检查...");
					$('#myModal').modal('show');
				}
			});
		});
	}
};

/**
 * 校验数据
 */
helper.validate = {
	// 校验手机号合法性
	phone : function(value) {
		if (value.length != 11) {
			return false;
		}
		var re = /\d{11}/g;
		return re.test(value);
	},
	// 校验车牌
	plateNo : function(value) {
		var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/g;
		return re.test(value);
	}
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
*  使用方法
*  	生成3-32位随机串：randomWord(true, 3, 32)
*  	生成43位随机串    ：randomWord(false, 43)
*/
helper.random = {
	randomWord : function(randomFlag, min, max) {
		var str = "", range = min, arr = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

		// 随机产生
		if (randomFlag) {
			range = Math.round(Math.random() * (max - min)) + min;
		}
		for (var i = 0; i < range; i++) {
			pos = Math.round(Math.random() * (arr.length - 1));
			str += arr[pos];
		}
		return str;
	}
};

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

