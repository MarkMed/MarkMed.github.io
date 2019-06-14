$(document).ready(()=>{
	$("#svgScrollDown").click(()=>{
		$('html, body').animate(
			{
				scrollTop: $("main").offset().top
			},
			{
				duration: 400, 
				easing: "linear"
			}
		);
	});
});