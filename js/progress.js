$(function() {
	var flag = true,
		width = 0,
		step = 2,
		i = 0;
	var timer = setInterval(function() {
		$("#progress_value").parent().css("width", width + "%");
		/*$("#img_xiaoxin").css("marginLeft", (width - 7) + "%");*/
		width = width + step;
		if(width > 100) {
			clearInterval(timer);
			/*$("#img_xiaoxin").parent().parent().hide();*/
		}
		console.log(i++);
	}, 20);
});