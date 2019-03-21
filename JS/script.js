$(document).ready(()=>{
	$("#openMenu").change(()=>{
		($("#openMenu").prop('checked'))?($("body").css("overflow", "hidden")):($("body").css("overflow", ""));
	});
});