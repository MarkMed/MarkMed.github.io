$(document).ready(()=>{
	$(document).scroll(function(event){
		$("header").css(
			{
				"opacity": 1-($(document).scrollTop()/800),
				"transform": "translateY(-"+$(document).scrollTop()/4+"px)"
			}
		);
	});
	$("#openMenu").change(()=>{
		($("#openMenu").prop('checked'))?($("body").css("overflow", "hidden")):($("body").css("overflow", ""));
	});
});