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
	let header = $("header");
	const firstSeparator = $("div.lineSeparator:first");
	$(document).scroll(function(e){		
		header.css(
			{
				"opacity": 1-($(document).scrollTop()/700),
				"transform": "translateY("+$(document).scrollTop()/2+"px)"
			}
		);
		firstSeparator.css(
			{
				"transform": "translateY("+$(document).scrollTop()/8+"px)"
			}
		);
	});
	let touchStartDiv = $("#touchStart");
	let touchEndDiv = $("#touchEnd");
	let touchEventsDiv = $("#touchEvents");
	let touchMoveDiv = $("#touchMove")
	/////////////////////////////////////////
	touchStartDiv.on("touchstart", (ev)=>{
		ev.preventDefault();
		touchStartDiv.html(`Touch Start!`)
	});
	/////////////////////////////////////////
	touchEndDiv.on("touchend", (ev)=>{
		ev.preventDefault();
		touchEndDiv.html(`Touch End!`)
	});
	/////////////////////////////////////////
	touchMoveDiv.on("touchmove", (ev)=>{
		ev.preventDefault();
		touchMoveDiv.html(`Moving in: <br/> x: ${ev.touches[0].clientX} y:  ${ev.touches[0].clientY}`)
	});
	/////////////////////////////////////////
	touchEventsDiv.on("touchstart", (ev)=>{
		ev.preventDefault();
		touchEventsDiv.html(`Touch Start!`)
	});
	touchEventsDiv.on("touchend", (ev)=>{
		ev.preventDefault();
		touchEventsDiv.html(`Touch End!`)
	});
	touchEventsDiv.on("touchmove", (ev)=>{
		ev.preventDefault();
		touchEventsDiv.html(`Moving in: <br/> x: ${ev.touches[0].clientX} y:  ${ev.touches[0].clientY}`)
	});
	/////////////////////////////////////////
});