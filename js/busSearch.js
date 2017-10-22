$(function() {
	var leaguer = leaguer || {
		info : {}, // leaguer 信息
		queryType : "",
		clipboardArr : []
	};

	// 查询类型 switch 切换控件初始化
	$('#leaguer_search_type_switch').bootstrapSwitch({
		onText :"手机号",
		offText:"车牌号",
		onInit:function(){
			chrome.storage.sync.get(null, function(result) {
				if (result.leaguer_search_type != undefined) {
					if (result.leaguer_search_type == "0101") { // 根据手机号
						// 01.切换手机号
						$('#leaguer_search_type_switch').bootstrapSwitch('state', true);
						// 02.隐藏车牌类型选择下拉框
						$('#leaguer_search_plateType').selectpicker('hide');
					} else {
						// 01.切换车牌号
						$('#leaguer_search_type_switch').bootstrapSwitch('state', false);
						// 02.若车牌类型记忆存在则赋值
						if (result.leaguer_search_plateType != undefined) {
							$('#leaguer_search_plateType').selectpicker('val', result.leaguer_search_plateType)
						}
					}
				}
			});
		},
		onSwitchChange:function(event, state){	//  console.log(this); // DOM element
			if(state){
				helper.storage.set("leaguer_search_type", "0101");	// 手机号
				$('#leaguer_search_plateType').selectpicker('hide');
			}else{
				helper.storage.set("leaguer_search_type", "0102");	// 车牌号
				$('#leaguer_search_plateType').selectpicker('show');
			}
		}
	});
	
	// select 绑定选择监听
	$('#leaguer_search_plateType').on('changed.bs.select', function() {
		helper.storage.set("leaguer_search_plateType", $('#leaguer_search_plateType').val());
	});

	// 初始化控件
	chrome.storage.sync.get(null, function(result) {
		// 暂时未用.
	});

	// 查询按钮绑定事件
	$("#leaguer_search_btn").click(function() {
		chrome.storage.sync.get(null, function(result) {
			// 1. 必要的清空操作
			leaguer.clipboardArr = [];
			// 2. 开始查询
			var searchValue = $.trim($("#leaguer_search_value").val());
			$("#leaguer_search_value").val(searchValue)	// 格式掉空白字符串，以备复制使用.
			switch (result.leaguer_search_type) {
				case "0101":
					// 01.校验查询内容的合法性
					if (leaguer.validateSearchValue.validatePhone(searchValue)) {
						return;
					}
					leaguer.queryData.queryByPhone(searchValue, leaguer.dealLeaguerData);
					break;
				case "0102":
					// 01.校验查询内容的合法性
					if (leaguer.validateSearchValue.validatePlateNo(searchValue)) {
						return;
					}
					leaguer.queryData.queryByPlateNo(searchValue, leaguer.dealLeaguerData);
					break;
			}
		});
	});

	// 校验查询内容合法性
	leaguer.validateSearchValue = {
		validatePhone : function(searchValue) {
			if (!helper.validate.phone(searchValue)) {
				$("#myModalLabel").text("手机号不合法");
				$('#myModal').modal('show');
				return true;
			}
		},
		validatePlateNo : function(searchValue) {
			if (!helper.validate.plateNo(searchValue)) {
				$("#myModalLabel").text("车牌号不合法");
				$('#myModal').modal('show');
				return true;
			}
		},
		customMessage : function(message){
			$("#myModalLabel").text(message);
			$('#myModal').modal('show');
		}
	};

	// 封装 根据 手机号 或 根据车牌 查询会员信息
	leaguer.queryData = {
		queryByPhone : function(searchValue, fn) {
			var where = " and t.leaguer_id = '" + searchValue + "' or t.phone_no = '" + searchValue + "'";
			helper.sql.select("select * from info_leaguer t where 1 = 1 " + where , fn);
		},
		queryByPlateNo : function(searchValue, fn) {
			var where = " and t.leaguer_id like '%" + searchValue + "%' or t.phone_no   like '%" + searchValue + "%'";
			helper.sql.select("select * from info_leaguer t where 1 = 1 " + where , fn);
		},
	};
	
	// 处理查询到的leaguer 查询结果
	leaguer.dealLeaguerData = function(result){
		// 提示信息
		if(result.rows.length == 0){
			leaguer.validateSearchValue.customMessage("查询到0条leaguer记录!");
			return;
		}else if(result.rows.length >= 2){
			leaguer.validateSearchValue.customMessage("查询到 大于1条 leaguer记录!");
		}
		leaguer.info = result.rows;
		var keyArr   = ["leaguer_id","phone_no","open_id","leaguer_regtime","curr_sum","reward_sum","pay_ratio"];
		leaguer.displayDataToTable("#leaguer_info" ,"会员信息（info_leaguer）：" + result.rows.length + "条", leaguer.info , keyArr);
		// 只处理查询到一个会员时，多个结果，处理无意义
		if(result.rows.length == 1){
			// 查询绑定车牌信息
			helper.sql.select("select * from info_leaguer_plate t where t.leaguer_id = '" + result.rows[0].leaguer_id + "' order by t.insert_time", function(result) {
				var keyArr   = ["plate_no","plate_type","bind_state","insert_time","update_time"];
				leaguer.displayDataToTable("#leaguer_plate" ,"会员车牌（info_leaguer_bindingplate）：" + result.rows.length + "条", result.rows, keyArr);
			});
			// 查询停车卡信息
			helper.sql.select("select * from info_park_card c where c.leaguer_id = '" + result.rows[0].leaguer_id + "' order by c.bind_time", function(result) {
				var keyArr   = ["nid","remain_money","begin_time","end_time","bind_time","amount","valid_scope","third_valid_scope"];
				leaguer.displayDataToTable("#leaguer_card" ,"会员停车卡（info_leaguer_bindingplate）：" + result.rows.length + "条", result.rows, keyArr);
			});
		}
	};
	
	/**
	 * domId: dom id
	 * tableTitle: table 的 标题
	 * data ：数据
	 * keyArr ：要显示的字段，数组类型
	 */
	leaguer.displayDataToTable = function(domId, tableTitle , data, keyArr){
		$(domId).html("");	// 清空数据
		var divId = Math.random().toString(11).substr(2); 
		var html = "<div id="+ divId +" class=\"table-responsive\"><table class=\"table table-bordered\"><caption align=\"top\">" + tableTitle + "</caption>";
		// 01. 准备 title
		html += leaguer.getTableTrDataByArr(keyArr);
		for (var int = 0; int < data.length; int++) {
			var c = data[int];
			var prepareData = [];
			for (var j = 0; j < keyArr.length; j++) {
				prepareData.push(c[keyArr[j]] != undefined ? c[keyArr[j]] : "");
			}
			html += leaguer.getTableTrDataByArr(prepareData);
		}
		html += "</table></div>";
		$(html).prependTo($(domId));

		// 为新添加的td 绑定复制功能.
		$("#" + divId + " .clipboard").each(function(index, elem) {
			new Clipboard(elem);
		});
	};
	
	// 根据参数组装成<tr><td>...</td></tr> 字符串
	leaguer.getTableTrDataByArr = function(arr){
		var result = "<tr>";
		for (var i = 0; i < arr.length; i++) {
			result += "<td class='clipboard' data-clipboard-text='" + arr[i] + "'>" + arr[i] + "</td>";
		}
		result += "</tr>";
		return result;
	}
	
});

/*
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