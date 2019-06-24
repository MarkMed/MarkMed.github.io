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
	
	$(document).scroll(function(e){		
		$("header").css(
			{
				"opacity": 1-($(document).scrollTop()/700),
				"transform": "translateY("+$(document).scrollTop()/2+"px)"
			}
		);
	});
	let touchStartDiv = $("#touchStart");
	touchStartDiv.on("touchstart", ()=>{
		touchStartDiv.html("Touched!")
	});
});
// function functionTest(){
// 	$("#touchStart").html("Touched1!")
// }