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
	let touchEndDiv = $("#touchEnd");
	let touchEventsDiv = $("#touchEvents");
	let touchMoveDiv = $("#touchMove")
	/////////////////////////////////////////
	touchStartDiv.on("touchstart", ()=>{
		touchStartDiv.html(`Touch Start!`)
	});
	/////////////////////////////////////////
	touchEndDiv.on("touchend", (ev)=>{
		touchEndDiv.html(`Touch End!`)
	});
	/////////////////////////////////////////
	touchMoveDiv.on("touchmove", (ev)=>{
		touchMoveDiv.html(`Moving in: <br/> x: ${ev.touches[0].clientX} y:  ${ev.touches[0].clientY}`)
	});
	/////////////////////////////////////////
	touchEventsDiv.on("touchstart", ()=>{
		touchEventsDiv.html(`Touch Start!`)
	});
	touchEventsDiv.on("touchend", ()=>{
		touchEventsDiv.html(`Touch End!`)
	});
	touchEventsDiv.on("touchmove", (ev)=>{
		touchEventsDiv.html(`Moving in: <br/> x: ${ev.touches[0].clientX} y:  ${ev.touches[0].clientY}`)
	});
});
// function functionTest(){
// 	$("#touchStart").html("Touched1!")
// }