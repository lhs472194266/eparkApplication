$(function() {
	$("#operator").val("linghaisen");
	$("#type").val("0201");
	$("#content").val("insert test VALUES (1,'linghaisen')");

	$("#button1").click(function() {
		var dateStr = new XDate().addSeconds(-2).toString("yyyy-MM-dd HH:mm:ss.fff");
		$("#verify").val(dateStr);

		$.post("http://localhost:8080/epark/MHp5TU1Pak1vRHhBTm9DajAzeVNPTUFBPVM9dw==/ZEpHMjF2cFk=", {
			operator: helper.safe.encrypt($("#operator").val()),
			verify: helper.safe.encrypt($("#verify").val()),
			type: helper.safe.encrypt($("#type").val()),
			content: helper.safe.encrypt($("#content").val())
		}, function(result) {
			console.log(result);
		});
	});

	$("#button2").click(function() {
		var dateStr = new XDate().toString("yyyy-MM-dd HH:mm:ss.fff");
		$("#verify").val(dateStr);

		$.post("http://localhost:8080/epark/MHp5TU1Pak1vRHhBTm9DajAzeVNPTUFBPVM9dw==/ZEpHMjF2cFk=", {
			operator: helper.safe.encrypt($("#operator").val()),
			verify: helper.safe.encrypt($("#verify").val()),
			type: helper.safe.encrypt($("#type").val()),
			content: helper.safe.encrypt($("#content").val())
		}, function(result) {
			console.log(result);
		});
	});
});