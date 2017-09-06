document.writeln("<div class=\"modal fade\"id=\"mod\"tabindex=\"-1\"role=\"dialog\"aria-labelledby=\"myModalLabel\"><div class=\"modal-dialog\"role=\"document\" style=\"width: 96%;\"></style><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\"class=\"close\"data-dismiss=\"modal\"aria-label=\"关闭\"><span aria-hidden=\"true\">&times;</span></button><h4 class=\"modal-title\"id=\"mod_title\">菜单</h4></div><div class=\"modal-body\"id=\"mod_body\"style=\"text-align: center;\"></div><div class=\"modal-footer\"><button type=\"button\"class=\"btn btn-default\"data-dismiss=\"modal\">关闭</button></div></div></div></div>");
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}
function showMod(mod_title,mod_body){
    $("#mod_title").text(mod_title);
    $("#mod_body").html(mod_body);
    $("#mod_body").css({"min-height": 400});

}

function showList() {
    var html = "<div id='nav_div'>";
    $(".navbar-nav").eq(0).find("a").each(function () {
        if ($(this).attr("href") == "#") {

            if (html.endsWith("/li>")) {
                html += "</ul>"
            }
            html += "<div  style='clear:both;margin-bottom:10px'></div><ul><li><span>" + $(this).text() + "</span></li>";
        } else {
            if ($(this).text() == "菜单" || $(this).text() == "首页" || $(this).text() == "工具菜单") {
                return true;
            }
            html += "<li style=''>";
            var redattr = '';
            if (typeof($(this).attr("red")) != "undefined") {
                redattr = 'style="color:red"';
            }
            html += "<a href='" + $(this).attr("href") + "' " + redattr + ">" + $(this).text() + "</a></li>";
        }

    });
    if (html.endsWith("/li>")) {
        html += "</ul></div>";
    }
    showMod('菜单', html);
}

; (function () {
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

    if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
})();
/*  内容溢出省略替代，num最大长度  */
; (function ($) {
    $.fn.wordLimit = function (num) {
        this.each(function () {
            if (!num) {
                var copyThis = $(this.cloneNode(true)).hide().css({
                    'position': 'absolute',
                    'width': 'auto',
                    'overflow': 'visible'
                });
                $(this).after(copyThis);
                if (copyThis.width() > $(this).width()) {
                    $(this).text($(this).text().substring(0, $(this).text().length - 4));
                    $(this).html($(this).html() + '...');
                    copyThis.remove();
                    $(this).wordLimit();
                } else {
                    copyThis.remove();
                    return;
                }
            } else {
                var maxwidth = num;
                if ($(this).text().length > maxwidth) {
                    $(this).text($(this).text().substring(0, maxwidth));
                    $(this).html($(this).html() + '...');
                }
            }
        });
    }
})(jQuery);

function loadScript(options) {
    var url = options.url, elms = options.elms, callback = options.callback;
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                if (callback) callback();
            }
        };
    } else {
        script.onload = function () {
            if (callback) callback();
        };
    }
    script.src = url;
    elms.appendChild(script)
}

//过滤HTML标签
String.prototype.removeHtmlTab = function () {
    return this.replace(/<[^<>]+?>/g, '');
}
//HTML标签字符转换成转意符
String.prototype.html2Escape = function () {
    return this.replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; });
}
//转意符换成HTML标签
String.prototype.escape2Html = function () {
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    return this.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
}
//&nbsp;转成空格
String.prototype.nbsp2Space = function () {
    var arrEntities = { 'nbsp': ' ' };
    return this.replace(/&(nbsp);/ig, function (all, t) { return arrEntities[t] })
}
//回车转为br标签
String.prototype.return2Br = function () {
    return this.replace(/\r?\n/g, "<br />");
};
/**
* 格式化时间函数
* @param {format} 时间显示格式
*/
Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};
String.prototype.format = function (args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    result = result.replace(reg, arguments[i]);
                }
                else {
                    var reg = new RegExp('\\{' + i + '\\}', 'gm');;
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    }
    else {
        return this;
    }
}
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '')
};
function StringBuilder() {
    this.__values = new Array();
};
StringBuilder.prototype.appendLine = function (v) {
    this.__values.push(v);
}
StringBuilder.prototype.toString = function () {
    return this.__values.join('');
}
Number.prototype.toFixed = function (d) {
    var s = this + "";
    if (!d) d = 0;
    if (s.indexOf(".") == -1) s += ".";
    s += new Array(d + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
        if (a == d + 2) {
            a = s.match(/\d/g);
            if (parseInt(a[a.length - 1]) > 4) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] == 10) {
                        a[i] = 0;
                        b = i != 1;
                    }
                    else break;
                }
            }
            s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
        }
        if (b) s = s.substr(1);
        return (pm + s).replace(/\.$/, "");
    }
    return this + "";
}
//限制只能键入数字,flage:是否验证‘.’传入则不可以输入‘.’
function entNumber(e, flage) {
    e = e || window.event;
    var keyCode = e.keyCode || e.which;
    if (!(keyCode == 46) && !(keyCode == 8) && !(keyCode == 37) && !(keyCode == 39) && !(keyCode == 17) && !(keyCode == 13) && ctrlKey()) {
        if (!((keyCode >= 48 && keyCode <= 57) || (keyCode == 110 || keyCode == 190) || keyCode == 9 || (keyCode >= 96 && keyCode <= 105))) stopDefault(e);
        if (flage) if (!((keyCode >= 48 && keyCode <= 57) || keyCode == 9 || (keyCode >= 96 && keyCode <= 105))) stopDefault(e);
    }
    //ctrl+c/v/a/x/z
    function ctrlKey() {
        return !(e.ctrlKey && keyCode == 67) && !(e.ctrlKey && keyCode == 86) && !(e.ctrlKey && keyCode == 65) && !(e.ctrlKey && keyCode == 88) && !(e.ctrlKey && keyCode == 90)
    }
}
function getKeyCode(e) {
    e = e || window.event;
    return e.keyCode || e.which;
}
//阻止浏览器的默认行为
function stopDefault(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault(); //其他浏览器
    else e.returnValue = false; //IE浏览器
}
/**
* 阻止事件(包括冒泡和默认行为)
* */
function stopEvent(e) {
    e = e || window.event;
    if (e.preventDefault) { //其他浏览器
        e.preventDefault();
        e.stopPropagation();
    } else { //IE浏览器
        e.returnValue = false;
        e.cancelBubble = true;
    }
};
function getid(id) {
    return (typeof id == 'string') ? document.getElementById(id) : id
};
function getcookie(name) {
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}
function setcookie(cookieName, cookieValue) {
    var expires = new Date();
    var now = parseInt(expires.getTime());
    var et = (86400 - expires.getHours() * 3600 - expires.getMinutes() * 60 - expires.getSeconds());
    expires.setTime(now + 1000000 * (et - expires.getTimezoneOffset() * 60));
    document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";expires=" + expires.toGMTString() + "; path=/";
}
function IsURL(strUrl) {
    //var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|red|aero|xyz|top|ren|club|wang|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.([a-z0-9]+)(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    }
    else {
        return false;
    }
}

//url参数分解
String.prototype.queryString = function () {
    var raw = this.toString();
    if (raw.length == 0)
        return null;
    var arr = [];
    var collection = raw.split('&');
    for (var i = 0; i < collection.length; i++) {
        var o = {};
        var tmp = collection[i].split('=');
        o.k = tmp[0];
        o.v = tmp[1];
        arr.push(o);
    }
    return arr;
}
//获取url参数值
String.prototype.queryStringValue = function (keyName) {
    var url = this.toString();
    if (url.length == 0)
        return null;
    var collection = url.split('&');
    for (var i = 0; i < collection.length; i++) {
        var tmp = collection[i].split('=');
        if (tmp.length < 2)
            continue;
        if (tmp[0].toUpperCase() == keyName.toUpperCase())
            return tmp[1];
    }
    return null;
}
/**
* 移除数组中的空元素
* @param {array} 数组
* @returns {narray} 新数组
* */
Array.prototype.trimArray = function () {
    var array = this;
    var narray = [];
    for (var i = 0; i < array.length; i++)

        if (array[i]) {
            if (typeof array[i] == "string") {
                if (array[i].trim())
                    narray.push(array[i]);
            } else {
                narray.push(array[i]);
            }
        }
    return narray;
};
/**
* 移除数组中的指定元素
* @param {elm} 指定元素值
* @returns {narray} 新数组
* */
Array.prototype.remove = function (elm) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == elm) {
            this[i] = '';
            break;
        }
    }
    return this.trimArray(); //清除空元素
};
/**
* 去除数组中重复的元素
* @param {isStrict} 是否严格模式
* ['1',1] isStric=true 返回1，否则，返回1,1
* @returns {Array}
* */
Array.prototype.unique = function (isStrict) {
    if (!this.length) return [];
    if (this.length < 2) return [this[0]] || [];
    var tempObj = {},
			newArr = [];
    for (var i = 0; i < this.length; i++) {
        var v = this[i];
        var condition = isStrict ? (typeof tempObj[v] != typeof v) : false;
        if ((typeof tempObj[v] == "undefined") || condition) {
            tempObj[v] = v;
            newArr.push(v);
        }
    }
    return newArr;
};
/**
* 统计元素在数组中出现的次数
* @param {array} 数组
* ['1',1] isStric=true 返回1，否则，返回1,1
* @returns {Array} 返回一个二维数组::["元素名","出现的次数"]
* */
Array.prototype.sameCount = function () {
    var res = [];
    var ary = this;
    ary.sort();
    for (var i = 0; i < ary.length;) {
        var count = 0;
        for (var j = i; j < ary.length; j++) {
            if (ary[i] == ary[j]) {
                count++;
            }
        }
        res.push([ary[i], count]);
        i += count;
    }
    return res;
}