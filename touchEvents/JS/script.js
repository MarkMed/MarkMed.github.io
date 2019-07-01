$(document).ready(()=>{
	//////////////////////////////////////////////////////////////////////////////////
	const header = $("header");
	const firstTitle = $("#touchEventsTests .sectionTitle h2");
	const secondTitle = $("#swipeEvents .sectionTitle h2");
	let deviceHeight = $(window).height();
	let documentHeight = $(document).height();
	//////////////////////////////////////////////////////////////////////////////////
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
	//////////////////////////////////////////////////////////////////////////////////
	$(document).scroll(function(e){
		if($(document).scrollTop() < deviceHeight){
			header.css(
				{
					"opacity": 1-($(document).scrollTop()/700),
					"transform": "translateY("+$(document).scrollTop()/2+"px)"
				}
			);
		}
		if($(document).scrollTop() > firstTitle.offset().top/1.1){
			firstTitle.attr("class", "show");
		}
		if($(document).scrollTop() > secondTitle.offset().top/1.1){
			secondTitle.attr("class", "show");
		}
	});
	//////////////////////////////////////////////////////////////////////////////////
	let touchStartDiv = $("#touchStart");
	let touchEndDiv = $("#touchEnd");
	let touchEventsDiv = $("#touchEvents");
	let touchMoveDiv = $("#touchMove")
	//////////////////////////////////////////////////////////////////////////////////
	///// Double Tap Event /////
	function doubleTap(elem){
		const bool= (elem.attr("db-tap")==="true")?(true):(false);
		elem.attr("db-tap", true);
		setTimeout( function() { elem.attr("db-tap", false) }, 500 );
		if(bool) {
			let cEvent= new CustomEvent("dblTap");
			elem.get(0).dispatchEvent(cEvent);
			console.log("suppose to trigger the ev");
			return false;
		}
		event.preventDefault();
	}
	//////////////////////////////////////////////////////////////////////////////////
	///// Swipe Event /////
	function swipe(ev){
		
	}
	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	///// Swipe Up Event /////
	function swipeUp(ev){
		
	}
	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	///// Swipe Down Event /////
	function swipeDown(ev){
		
	}
	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	///// Swipe Rigth Event /////
	function swipeRight(ev){
		
	}
	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	///// Swipe Left Event /////
	function swipeLeft(ev){
		//
	}
	//////////////////////////////////////////////////////////////////////////////////
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
	touchEventsDiv.on("touchmove", (ev)=>{
		ev.preventDefault();
		touchEventsDiv.html(`Moving in: <br/> x: ${ev.touches[0].clientX} y:  ${ev.touches[0].clientY}`)
	});
	touchEventsDiv.on("touchend", (ev)=>{
		ev.preventDefault();
		touchEventsDiv.html(`Touch End!`)
	});
	/////////////////////////////////////////
	$("#doubleTap").on("touchstart", (ev)=>{
		ev.preventDefault();
		let elem = $(ev.target)
		elem.attr("db-tap", (!!elem.attr("db-tap"))?((elem.attr("db-tap")==="true")?(true):(false)):(false));
		doubleTap(elem);
	});
	$("#doubleTap").on('dblTap', () => {
		$("#doubleTap").html(`Double Tap!`)
	});
	/////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
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