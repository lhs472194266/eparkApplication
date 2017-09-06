$(function(){
	var configSwitch = function(){
		var obj = new Object();
		obj.init = function(){
			$("#config_switch").find("button").click(function(){
				console.log(2222);
			});
		};
		return obj;
	}
	
	configSwitch().init();
})