$(document).ready(()=>{
	$("#svgScrollDown").click(()=>{
		$('html, body').animate(
			{
				scrollTop: $("#touchEventsTests").offset().top
			},
			{
				duration: 400, 
				easing: "linear"
			}
		);
	});
	const header = $("header");
	const firstTitle = $("#touchEventsTests .sectionTitle h2");
	let deviceHeight = $(window).height();
	$(document).scroll(function(e){
		if($(document).scrollTop() < deviceHeight){
			header.css(
				{
					"opacity": 1-($(document).scrollTop()/700),
					"transform": "translateY("+$(document).scrollTop()/2+"px)"
				}
			);
		}
		if($(document).scrollTop() > deviceHeight/2){
			firstTitle.attr("class", "show");
		}
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
	// // Swipe Up / Down / Left / Right
	// var initialX = null;
	// var initialY = null;
	
	// function startTouch(e) {
	// 	initialX = e.touches[0].clientX;
	// 	initialY = e.touches[0].clientY;
	// };
	
	// function moveTouch(e) {
		
	// 	e.preventDefault();

	// 	if (initialX === null) {
	// 		return;
	// 	}
		
	// 	if (initialY === null) {
	// 		return;
	// 	}
		
	// 	var currentX = e.touches[0].clientX;
	// 	var currentY = e.touches[0].clientY;
		
	// 	var diffX = initialX - currentX;
	// 	var diffY = initialY - currentY;
		
	// 	if (Math.abs(diffX) > Math.abs(diffY)) {
	// 		// sliding horizontally
	// 		if (diffX > 0) {
	// 		// swiped left
	// 		console.log("swiped left");
	// 		} else {
	// 		// swiped right
	// 		console.log("swiped right");
	// 		}  
	// 	} else {
	// 		// sliding vertically
	// 		if (diffY > 0) {
	// 		// swiped up
	// 		console.log("swiped up");
	// 		} else {
	// 		// swiped down
	// 		console.log("swiped down");
	// 		}  
	// 	}

	// 	initialX = null;
	// 	initialY = null;
	// };
});